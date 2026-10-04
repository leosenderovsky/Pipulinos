import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const productsDir = path.join(root, 'public/assets/products');
const logoPath = path.join(root, 'public/assets/logo/logo.png');
const originalsDir = path.join(root, '.image-originals/public');
const refreshOriginals = process.argv.includes('--refresh-originals');
const targetRatio = 4 / 5;
const squareRatio = 1;

const backupPathFor = (publicPath) =>
  path.join(originalsDir, path.relative(path.join(root, 'public'), publicPath));

const preserveOriginal = async (publicPath) => {
  const backupPath = backupPathFor(publicPath);
  await fs.mkdir(path.dirname(backupPath), { recursive: true });

  try {
    await fs.access(backupPath);
    if (refreshOriginals) await fs.copyFile(publicPath, backupPath);
  } catch {
    await fs.copyFile(publicPath, backupPath);
  }

  return backupPath;
};

const productFiles = (await fs.readdir(productsDir))
  .filter((name) => name.toLowerCase().endsWith('.jpg'))
  .sort();
const unsupportedRatios = [];

for (const name of productFiles) {
  const publicPath = path.join(productsDir, name);
  const originalPath = await preserveOriginal(publicPath);
  const metadata = await sharp(originalPath).metadata();
  const { width, height } = metadata;

  if (
    width &&
    height &&
    Math.abs(width / height - targetRatio) > 0.02 &&
    Math.abs(width / height - squareRatio) > 0.02
  ) {
    unsupportedRatios.push(`${name} (${width}x${height})`);
  }

  const resized = sharp(originalPath).rotate().resize({
    width: 1000,
    height: 1000,
    fit: 'inside',
    withoutEnlargement: true,
  });

  await Promise.all([
    resized.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(publicPath),
    resized.clone().webp({ quality: 70 }).toFile(publicPath.replace(/\.jpg$/i, '.webp')),
  ]);
}

const logoOriginalPath = await preserveOriginal(logoPath);
await sharp(logoOriginalPath)
  .resize({ width: 400, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(`${logoPath}.optimized`);
await fs.rename(`${logoPath}.optimized`, logoPath);

const productEntries = await fs.readdir(productsDir);
const productBytes = await Promise.all(
  productEntries.map(async (name) => (await fs.stat(path.join(productsDir, name))).size)
);

console.log(`Imágenes JPG procesadas: ${productFiles.length}`);
console.log(`Peso total de public/assets/products: ${(productBytes.reduce((sum, size) => sum + size, 0) / 1024 / 1024).toFixed(2)} MB`);
console.log(`Logo: ${((await fs.stat(logoPath)).size / 1024).toFixed(1)} KB`);
console.log('Imágenes fuera de proporciones permitidas (4:5 o 1:1):');
for (const image of unsupportedRatios) console.log(`- ${image}`);