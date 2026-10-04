import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const logoPath = path.join(process.cwd(), 'public', 'assets', 'logo', 'logo.png');
const outputDirectory = path.dirname(logoPath);
const background = process.env.BRAND_ICON_BACKGROUND || '#FFFDF9';

try {
  await fs.access(logoPath);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.info(`[make-icons] No se encontró ${logoPath}; se omite la generación de iconos.`);
    process.exit(0);
  }
  throw error;
}

const logo = await sharp(logoPath).metadata();
if (!logo.width || !logo.height) {
  throw new Error(`[make-icons] No se pudieron leer las dimensiones de ${logoPath}.`);
}

for (const [filename, size, padding] of [
  ['favicon-32.png', 32, 2],
  ['apple-touch-icon.png', 180, 18],
]) {
  const innerSize = size - padding * 2;
  const icon = await sharp(logoPath)
    .resize(innerSize, innerSize, { fit: 'contain' })
    .png()
    .toBuffer();

  await sharp({
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
    .toFile(path.join(outputDirectory, filename));
}

console.info(`[make-icons] Iconos generados en ${outputDirectory}.`);
