import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { buildIcons } from './make-icons.mjs';

const root = process.cwd();
const logoDirectory = path.join(root, 'public', 'assets', 'logo');
const differentPixelLimit = 0.001;
const channelTolerance = 2;
const staleMessage = 'íconos desactualizados: ejecutá npm run icons:make';

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
}

if (stale) {
  console.error(staleMessage);
  process.exitCode = 1;
} else {
  console.info('[check-icons] Íconos actualizados y válidos.');
}
