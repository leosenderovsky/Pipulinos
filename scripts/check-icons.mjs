import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { buildIcons, BRAND_CONFIG } from './make-icons.mjs';

const root = process.cwd();
const logoDirectory = path.join(root, 'public', 'assets', 'logo');
const differentPixelLimit = 0.001;
const channelTolerance = 2;
const staleMessage = 'íconos desactualizados: ejecutá npm run icons:make';

function parseBackground(color) {
  const hex = color.replace(/^#/, '');
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

function checkIconBounds(pixels, bgColor, filename) {
  const { width, height, channels } = pixels.info;
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * channels;
      if (
        Math.abs(pixels.data[offset] - bgColor.r) > channelTolerance ||
        Math.abs(pixels.data[offset + 1] - bgColor.g) > channelTolerance ||
        Math.abs(pixels.data[offset + 2] - bgColor.b) > channelTolerance
      ) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX > maxX || minY > maxY) {
    console.error(`${filename}: no se encontró contenido en el ícono`);
    return false;
  }

  const contentWidth = maxX - minX + 1;
  const contentHeight = maxY - minY + 1;
  const fillRatio = Math.max(contentWidth / width, contentHeight / height);

  console.info(`${filename}: ocupación ${Math.round(fillRatio * 100)}% (${contentWidth}x${contentHeight} en ${width}x${height})`);

  if (fillRatio < 0.70) {
    console.error(`❌ ${filename}: el logo se ve demasiado chico en el ícono: ajustá logo.iconCrop`);
    return false;
  }
  if (fillRatio > 0.95) {
    console.error(`❌ ${filename}: el logo ocupa demasiado espacio en el ícono`);
    return false;
  }

  const borderMargin = Math.floor(width * 0.02);
  if (minX < borderMargin || maxX >= width - borderMargin || minY < borderMargin || maxY >= height - borderMargin) {
    console.error(`❌ ${filename}: el emblema toca el borde del ícono: recorte incorrecto`);
    return false;
  }

  return true;
}

async function readPixels(input) {
  return sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

function isCloseEnough(expected, actual) {
  if (
    expected.info.width !== actual.info.width ||
    expected.info.height !== actual.info.height ||
    expected.info.channels !== actual.info.channels
  ) {
    return false;
  }

  const pixelCount = expected.info.width * expected.info.height;
  let differentPixels = 0;
  for (let offset = 0; offset < expected.data.length; offset += expected.info.channels) {
    let differs = false;
    for (let channel = 0; channel < expected.info.channels; channel += 1) {
      if (Math.abs(expected.data[offset + channel] - actual.data[offset + channel]) > channelTolerance) {
        differs = true;
        break;
      }
    }
    if (differs) differentPixels += 1;
  }

  return differentPixels / pixelCount <= differentPixelLimit;
}

function blackPixelRatio(pixels) {
  let blackPixels = 0;
  const { channels } = pixels.info;
  for (let offset = 0; offset < pixels.data.length; offset += channels) {
    if (
      pixels.data[offset] === 0 &&
      pixels.data[offset + 1] === 0 &&
      pixels.data[offset + 2] === 0
    ) {
      blackPixels += 1;
    }
  }
  return blackPixels / (pixels.info.width * pixels.info.height);
}

let stale = false;
const bgColor = parseBackground(process.env.BRAND_ICON_BACKGROUND || BRAND_CONFIG.logo.iconBackground || '#FFFDF9');
let allBoundsValid = true;

for (const { filename, buffer } of await buildIcons()) {
  const imagePath = path.join(logoDirectory, filename);
  let actual;
  try {
    actual = await readPixels(imagePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      stale = true;
      continue;
    }
    throw error;
  }

  const expected = await readPixels(buffer);
  if (!isCloseEnough(expected, actual) || blackPixelRatio(actual) > 0.01) {
    stale = true;
  }

  if (filename === 'apple-touch-icon.png') {
    if (actual.info.width !== 180 || actual.info.height !== 180) {
      stale = true;
    }
    for (let offset = 3; offset < actual.data.length; offset += actual.info.channels) {
      if (actual.data[offset] !== 255) {
        stale = true;
        break;
      }
    }
  }

  if (!checkIconBounds(actual, bgColor, filename)) {
    allBoundsValid = false;
  }
}

if (stale) {
  console.error(staleMessage);
  process.exitCode = 1;
} else if (!allBoundsValid) {
  process.exitCode = 1;
} else {
  console.info('[check-icons] Íconos actualizados y válidos.');
}
