import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const productsDir = path.join(process.cwd(), 'public', 'assets', 'products');
const strict = process.argv.includes('--strict');
const files = (await fs.readdir(productsDir))
  .filter((name) => name.toLowerCase().endsWith('.jpg'))
  .sort();
const records = [];
const hashes = new Map();

for (const file of files) {
  const filePath = path.join(productsDir, file);
  const [metadata, contents, stats] = await Promise.all([
    sharp(filePath).metadata(),
    fs.readFile(filePath),
    fs.stat(filePath),
  ]);
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const ratio = height ? width / height : 0;
  const hash = createHash('md5').update(contents).digest('hex');
  const productKey = file
    .replace(/\.jpg$/i, '')
    .replace(/_\d+$/, '')
    .replace(/-\d+$/, '');
  const record = { file, width, height, ratio, bytes: stats.size, hash, productKey, flags: [] };

  if (width < 900) record.flags.push('BAJA RESOLUCIÓN');
  if (Math.abs(ratio - 0.8) > 0.02 && Math.abs(ratio - 1) > 0.02) record.flags.push('RATIO');
  try {
    await fs.access(filePath.replace(/\.jpg$/i, '.webp'));
  } catch {
    record.flags.push('FALTA_WEBP');
  }

  const sameHash = hashes.get(hash) ?? [];
  if (sameHash.some((other) => other.productKey !== productKey)) {
    record.flags.push('DUPLICADA');
    for (const other of sameHash) {
      if (other.productKey !== productKey && !other.flags.includes('DUPLICADA')) {
        other.flags.push('DUPLICADA');
      }
    }
  }
  sameHash.push(record);
  hashes.set(hash, sameHash);
  records.push(record);
}

const rows = records.map(({ file, width, height, ratio, bytes, flags }) => ({
  archivo: file,
  dimensiones: `${width}x${height}`,
  ratio: ratio.toFixed(3),
  peso: `${(bytes / 1024).toFixed(1)} KB`,
  alertas: flags.join(', ') || '—',
}));
console.table(rows);
const warningCount = records.filter(({ flags }) => flags.length > 0).length;
console.log(`${records.length} imágenes revisadas; ${warningCount} con advertencias.`);

if (strict && warningCount > 0) process.exitCode = 1;
