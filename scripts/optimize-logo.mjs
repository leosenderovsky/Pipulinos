import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const logoPath = path.join(root, 'public', 'assets', 'logo', 'logo.png');
const originalsDirectory = path.join(root, '.image-originals', 'public', 'assets', 'logo');
const maxWidth = 800;
const maxBytes = 120 * 1024;

const metadata = await sharp(logoPath).metadata();
if (!metadata.width || !metadata.height) {
  throw new Error(`[logo:optimize] No se pudieron leer las dimensiones de ${logoPath}.`);
}

const currentBytes = (await fs.stat(logoPath)).size;
if (currentBytes <= maxBytes && metadata.width <= maxWidth) {
  console.info('[logo:optimize] ya optimizado');
} else {
  const original = await fs.readFile(logoPath);
  const digest = createHash('sha256').update(original).digest('hex').slice(0, 12);
  const backupPath = path.join(
    originalsDirectory,
    `logo-${metadata.width}x${metadata.height}-${digest}.png`,
  );
  await fs.mkdir(originalsDirectory, { recursive: true });
  try {
    await fs.writeFile(backupPath, original, { flag: 'wx' });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }

  const optimized = await sharp(original)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .png({ palette: true, quality: 90, effort: 10 })
    .toBuffer();

  if (optimized.length > maxBytes) {
    throw new Error(
      `[logo:optimize] El logo optimizado pesa ${(optimized.length / 1024).toFixed(1)} KB; el máximo es 120 KB.`,
    );
  }

  await fs.writeFile(logoPath, optimized);
  const optimizedMetadata = await sharp(optimized).metadata();
  console.info(
    `[logo:optimize] Logo optimizado: ${optimizedMetadata.width}x${optimizedMetadata.height}, ${(optimized.length / 1024).toFixed(1)} KB.`,
  );
}
