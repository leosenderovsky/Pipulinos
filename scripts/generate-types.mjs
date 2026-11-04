import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const readSchema = async (name) =>
  JSON.parse(await readFile(path.join(root, 'src', 'data', name), 'utf8'));

const toTypeScript = (schema) => {
  if (Array.isArray(schema.enum)) {
    return schema.enum.map((value) => JSON.stringify(value)).join(' | ');
  }
  if (schema.type === 'array') return `(${toTypeScript(schema.items)})[]`;
  if (Array.isArray(schema.type)) {
    return schema.type.map((type) => type === 'null' ? 'null' : type).join(' | ');
  }
  if (schema.type === 'object' && schema.properties) {
    const required = new Set(schema.required ?? []);
    const entries = Object.entries(schema.properties).map(([key, property]) =>
      `  ${JSON.stringify(key)}${required.has(key) ? '' : '?'}: ${toTypeScript(property)};`,
    );
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      entries.push(`  [key: string]: ${toTypeScript(schema.additionalProperties)};`);
    }
    return `{\n${entries.join('\n')}\n}`;
  }
  if (schema.type === 'object' && schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    return `Record<string, ${toTypeScript(schema.additionalProperties)}>`;
  }
  return schema.type === 'integer' ? 'number' : schema.type ?? 'unknown';
};

const brandSchema = await readSchema('brand.schema.json');
const catalogSchema = await readSchema('catalog.schema.json');
const sizeGuideSchema = await readSchema('size-guide.schema.json');
const brandTypes = [
  `export type BrandConfig = ${toTypeScript(brandSchema)};`,
  '',
].join('\n');
const productTags = catalogSchema.properties.products.items.properties.tags.items.enum;
const ageStages = catalogSchema.properties.products.items.properties.ageStagesOverride.items.enum;
const catalogTypes = [
  `export type CatalogConfig = ${toTypeScript(catalogSchema)};`,
  'export type Product = CatalogConfig["products"][number];',
  'export type ProductColor = Product["colors"][number];',
  'export type CatalogCategory = CatalogConfig["categories"][number];',
  'export type QuickFilter = CatalogConfig["filters"]["quickFilters"][number];',
  `export const TAG_VOCAB = ${JSON.stringify(productTags, null, 2)} as const;`,
  'export type ProductTag = (typeof TAG_VOCAB)[number];',
  `export type AgeStage = ${ageStages.map((stage) => JSON.stringify(stage)).join(' | ')};`,
  '',
].join('\n');
const sizeGuideTypes = [
  `export type SizeGuideConfig = ${toTypeScript(sizeGuideSchema)};`,
  'export type BabySizeRow = SizeGuideConfig["babySizes"][number];',
  'export type KidSizeRow = SizeGuideConfig["kidsSizes"][number];',
  '',
].join('\n');

await Promise.all([
  writeFile(path.join(root, 'src', 'generated', 'brand.types.ts'), brandTypes),
  writeFile(path.join(root, 'src', 'generated', 'catalog.types.ts'), catalogTypes),
  writeFile(path.join(root, 'src', 'generated', 'size-guide.types.ts'), sizeGuideTypes),
]);

console.log('Generated brand.types.ts, catalog.types.ts, and size-guide.types.ts.');
