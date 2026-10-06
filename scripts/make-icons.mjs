import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { BRAND_CONFIG } from '../src/brand.config.ts';

const root = process.cwd();
const logoPath = path.join(root, 'public', 'assets', 'logo', 'logo.png');
const outputDirectory = path.dirname(logoPath);
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

export async function buildIcons({
  sourcePath = logoPath,
  iconCrop = BRAND_CONFIG.logo.iconCrop,
  background = process.env.BRAND_ICON_BACKGROUND || BRAND_CONFIG.logo.iconBackground || '#FFFDF9',
} = {}) {
  const metadata = await sharp(sourcePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`[make-icons] No se pudieron leer las dimensiones de ${sourcePath}.`);
  }

  let logo = sharp(sourcePath);
  if (iconCrop) {
    const { left, top, width, height } = iconCrop;
    if (
      ![left, top, width, height].every(Number.isFinite) ||
      left < 0 ||
      top < 0 ||
      width <= 0 ||
      height <= 0 ||
      left + width > 1 ||
      top + height > 1
    ) {
      throw new Error('[make-icons] iconCrop debe definir una región válida en fracciones de 0 a 1.');
    }

    const crop = {
      left: Math.floor(left * metadata.width),
      top: Math.floor(top * metadata.height),
      width: Math.min(metadata.width, Math.round(width * metadata.width)),
      height: Math.min(metadata.height, Math.round(height * metadata.height)),
    };
    crop.width = Math.min(crop.width, metadata.width - crop.left);
    crop.height = Math.min(crop.height, metadata.height - crop.top);
    if (!crop.width || !crop.height) {
      throw new Error('[make-icons] iconCrop no puede generar una región vacía.');
    }
    logo = logo.extract(crop).trim({ background: transparent });
  }

  const icons = [];
  for (const [filename, size, padding] of [
    ['favicon-32.png', 32, 2],
    ['apple-touch-icon.png', 180, 18],
  ]) {
    const innerSize = size - padding * 2;
    const icon = await logo
      .clone()
      .resize(innerSize, innerSize, { fit: 'contain', background: transparent })
      .png()
      .toBuffer();

    const buffer = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background,
      },
    })
      .composite([{ input: icon, gravity: 'centre' }])
      .flatten({ background })
      .png()
      .toBuffer();

    icons.push({ filename, buffer });
  }

  return icons;
}

async function main() {
  try {
    await fs.access(logoPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.info(`[make-icons] No se encontró ${logoPath}; se omite la generación de iconos.`);
      return;
    }
    throw error;
  }

  const icons = await buildIcons();
  await Promise.all(
    icons.map(({ filename, buffer }) => fs.writeFile(path.join(outputDirectory, filename), buffer)),
  );
  console.info(`[make-icons] Iconos generados en ${outputDirectory}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
