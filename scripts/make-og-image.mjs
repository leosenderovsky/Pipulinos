import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourcePath = path.join(root, 'public', 'assets', 'hero', 'hero-1.jpg');
const outputPath = path.join(root, 'public', 'assets', 'misc', 'og-image.jpg');
const maxBytes = 200 * 1024;
const minimumQuality = 40;
const startingQuality = Number(process.env.OG_IMAGE_QUALITY ?? 85);

if (!Number.isInteger(startingQuality) || startingQuality < 1 || startingQuality > 100) {
  throw new Error('[make:og] OG_IMAGE_QUALITY debe ser un entero entre 1 y 100.');
}

let output;
let quality;
for (quality = startingQuality; quality >= minimumQuality; quality -= 5) {
  output = await sharp(sourcePath)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  if (output.length <= maxBytes) break;
}

if (!output || output.length > maxBytes) {
  throw new Error('[make:og] No se pudo generar og-image.jpg por debajo de 200 KB.');
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, output);
console.info(
  `[make:og] Imagen generada a 1200x630, calidad ${quality}, ${(output.length / 1024).toFixed(1)} KB.`,
);
