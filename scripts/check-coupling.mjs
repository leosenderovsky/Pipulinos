import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const catalog = JSON.parse(await fs.readFile(path.join(root, 'src/data/catalog.json'), 'utf8'));
const config = JSON.parse(await fs.readFile(path.join(root, 'scripts/check-coupling.config.json'), 'utf8'));
const sourceRoot = path.join(root, 'src');
const literals = new Set([
  ...catalog.categories.map((category) => category.id),
  ...catalog.filters.babySizes,
  ...catalog.filters.kidsSizes,
  ...catalog.filters.fabrics,
  ...catalog.filters.colorSwatches.map((swatch) => swatch.id),
  ...catalog.filters.quickFilters.map((filter) => filter.id),
  ...Object.keys(catalog.filters.stageSizes),
  ...Object.values(catalog.settings),
]);
const exceptions = new Set(Object.keys(config.exceptions ?? {}));
const violations = [];

for (const [literal, reason] of Object.entries(config.exceptions ?? {})) {
  if (!reason.trim()) violations.push(`scripts/check-coupling.config.json.exceptions.${literal}: falta el motivo`);
}

const visit = async (directory) => {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (['data', 'generated'].includes(entry.name)) continue;
      await visit(filePath);
      continue;
    }
    if (!/\.(?:ts|tsx|js|jsx)$/.test(entry.name) || entry.name === 'catalog.ts') continue;
    const content = await fs.readFile(filePath, 'utf8');
    for (const literal of literals) {
      if (exceptions.has(literal)) continue;
      const escaped = literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp(`(['"\`])${escaped}\\1`).test(content)) {
        violations.push(`${path.relative(root, filePath).replaceAll(path.sep, '/')}: literal "${literal}"`);
      }
    }
  }
};

await visit(sourceRoot);

if (violations.length) {
  for (const violation of violations) console.error(`ERROR ${violation}`);
  process.exitCode = 1;
} else {
  console.log('check:coupling correcto.');
}
