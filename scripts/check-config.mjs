import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dataDirectory = path.join(root, 'src', 'data');
const publicDirectory = path.join(root, 'public');
const strict = process.argv.includes('--strict');
const errors = [];
const warnings = [];
const examples = [];
const markers = [];

const readJson = async (relativePath) =>
  JSON.parse(await fs.readFile(path.join(root, relativePath), 'utf8'));

const brand = await readJson('src/data/brand.json');
const catalog = await readJson('src/data/catalog.json');
const catalogSchema = await readJson('src/data/catalog.schema.json');
const sizeGuide = await readJson('src/data/size-guide.json');

const isType = (value, type) => {
  if (type === 'null') return value === null;
  if (type === 'array') return Array.isArray(value);
  if (type === 'object') return Boolean(value && typeof value === 'object' && !Array.isArray(value));
  if (type === 'integer') return Number.isInteger(value);
  return typeof value === type;
};

const validateSchema = (value, schema, valuePath) => {
  const allowedTypes = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  if (allowedTypes.length && !allowedTypes.some((type) => isType(value, type))) {
    errors.push(`${valuePath}: se esperaba ${allowedTypes.join(' o ')}`);
    return;
  }
  if (schema.enum && !schema.enum.some((candidate) => candidate === value)) {
    errors.push(`${valuePath}: valor fuera de los permitidos`);
  }
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${valuePath}: debe tener al menos ${schema.minLength} caracteres`);
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push(`${valuePath}: no puede superar ${schema.maxLength} caracteres`);
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push(`${valuePath}: no coincide con el formato esperado`);
    }
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push(`${valuePath}: debe ser mayor o igual a ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      errors.push(`${valuePath}: debe ser menor o igual a ${schema.maximum}`);
    }
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${valuePath}: debe contener al menos ${schema.minItems} elementos`);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      errors.push(`${valuePath}: no puede contener más de ${schema.maxItems} elementos`);
    }
  }
  if (typeof value === 'string') {
    if (schema['x-exampleData'] === true) examples.push(`${valuePath}: ${value}`);
    const declared = new Set(schema['x-vars'] ?? []);
    for (const [, variable] of value.matchAll(/\{([^{}]+)\}/g)) {
      if (!declared.has(variable)) {
        errors.push(`${valuePath}: variable {${variable}} no declarada en x-vars`);
      }
    }
    if (value.includes('[EMPRESA]') || /\b(?:TODO|CAMBIAR|REVISAR)\b/.test(value)) {
      markers.push(`${valuePath}: ${value}`);
    }
  }
  if (Array.isArray(value) && schema.items) {
    value.forEach((item, index) => validateSchema(item, schema.items, `${valuePath}[${index}]`));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const properties = schema.properties ?? {};
    for (const required of schema.required ?? []) {
      if (!(required in value)) errors.push(`${valuePath}.${required}: campo obligatorio ausente`);
    }
    for (const [key, item] of Object.entries(value)) {
      const propertySchema = properties[key];
      if (propertySchema) {
        validateSchema(item, propertySchema, `${valuePath}.${key}`);
      } else if (schema.additionalProperties === false) {
        errors.push(`${valuePath}.${key}: campo no definido en el esquema`);
      } else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
        validateSchema(item, schema.additionalProperties, `${valuePath}.${key}`);
      }
    }
  }
};

for (const [dataPath, schemaPath, data] of [
  ['src/data/brand.json', 'src/data/brand.schema.json', brand],
  ['src/data/catalog.json', 'src/data/catalog.schema.json', catalog],
  ['src/data/size-guide.json', 'src/data/size-guide.schema.json', sizeGuide],
]) {
  const schema = await readJson(schemaPath);
  if (schema.$schema !== 'http://json-schema.org/draft-07/schema#') {
    errors.push(`${schemaPath}: debe usar JSON Schema draft-07`);
  }
  validateSchema(data, schema, dataPath);
}

const categoryIds = new Set();
for (const category of catalog.categories) {
  if (categoryIds.has(category.id)) errors.push(`src/data/catalog.json.categories: id duplicado "${category.id}"`);
  categoryIds.add(category.id);
}
const productIds = new Set();
for (const [index, product] of catalog.products.entries()) {
  const productPath = `src/data/catalog.json.products[${index}]`;
  if (productIds.has(product.id)) errors.push(`${productPath}.id: id duplicado "${product.id}"`);
  productIds.add(product.id);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.id)) {
    errors.push(`${productPath}.id: debe estar en kebab-case`);
  }
  if (!categoryIds.has(product.category)) {
    errors.push(`${productPath}.category: categoría inexistente "${product.category}"`);
  }
  if (!(product.price > 0)) errors.push(`${productPath}.price: debe ser mayor que cero`);
  if (product.compareAtPrice !== undefined && !(product.compareAtPrice > product.price)) {
    errors.push(`${productPath}.compareAtPrice: debe ser mayor que price`);
  }
  const allowedTags = catalogSchema.properties.products.items.properties.tags.items.enum;
  for (const [tagIndex, tag] of product.tags.entries()) {
    if (!allowedTags.includes(tag)) {
      errors.push(`${productPath}.tags[${tagIndex}]: etiqueta fuera de TAG_VOCAB`);
    }
  }
}
if (catalog.settings.crossSellCategory && !categoryIds.has(catalog.settings.crossSellCategory)) {
  errors.push(
    `src/data/catalog.json.settings.crossSellCategory: categoría inexistente "${catalog.settings.crossSellCategory}"`,
  );
}

const imagePaths = [
  ...catalog.products.flatMap((product) => product.images),
  brand.logo.url,
  brand.logo.faviconUrl,
  brand.logo.appleTouchIconUrl,
  brand.hero.bannerImageUrl,
  brand.seo.socialImage,
];
for (const imagePath of imagePaths) {
  const filePath = path.join(publicDirectory, imagePath.replace(/^\/+/, ''));
  try {
    await fs.access(filePath);
  } catch {
    errors.push(`public${imagePath}: imagen inexistente`);
  }
}

const associatedFiles = new Set(
  catalog.products.flatMap((product) =>
    product.images.flatMap((image) => {
      const jpg = path.basename(image);
      return [jpg, jpg.replace(/\.jpg$/i, '.webp')];
    }),
  ),
);
const productDirectory = path.join(publicDirectory, 'assets', 'products');
for (const file of await fs.readdir(productDirectory)) {
  if (!/^.+\.(?:jpg|webp)$/i.test(file)) continue;
  if (!associatedFiles.has(file)) warnings.push(`public/assets/products/${file}: imagen sin producto asociado`);
}

const contrastRatio = (foreground, background) => {
  const luminance = (hex) => {
    const channels = hex.match(/[0-9a-f]{2}/gi)?.map((channel) => parseInt(channel, 16) / 255) ?? [];
    const linear = channels.map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

const brandSchema = await readJson('src/data/brand.schema.json');
const validAssetKeys = new Set([
  'path',
  'minWidth',
  'maxWidth',
  'ratio',
  'ratios',
  'ratioTolerance',
  'maxKB',
]);
const ratioPattern = /^\d+:\d+$/;
for (const [schemaPath, schema] of [
  ['src/data/brand.schema.json', brandSchema],
  ['src/data/catalog.schema.json', catalogSchema],
  ['src/data/size-guide.schema.json', await readJson('src/data/size-guide.schema.json')],
]) {
  const inspectAssets = (node, fieldPath) => {
    if (!node || typeof node !== 'object') return;
    const asset = node['x-asset'];
    if (asset) {
      for (const key of Object.keys(asset)) {
        if (!validAssetKeys.has(key)) {
          errors.push(`${schemaPath}.${fieldPath}.x-asset.${key}: propiedad no permitida`);
        }
      }
      if (typeof asset.path !== 'string' || !asset.path) {
        errors.push(`${schemaPath}.${fieldPath}.x-asset.path: falta la ruta`);
      }
      if (asset.ratio !== undefined && (typeof asset.ratio !== 'string' || !ratioPattern.test(asset.ratio))) {
        errors.push(`${schemaPath}.${fieldPath}.x-asset.ratio: debe usar el formato "W:H"`);
      }
      if (asset.ratios !== undefined && (
        !Array.isArray(asset.ratios) || !asset.ratios.every((ratio) => typeof ratio === 'string' && ratioPattern.test(ratio))
      )) {
        errors.push(`${schemaPath}.${fieldPath}.x-asset.ratios: debe ser una lista de proporciones "W:H"`);
      }
      if (asset.ratio === undefined && asset.ratios === undefined) {
        if (fieldPath === 'properties.seo.properties.socialImage'
          || fieldPath === 'properties.products.items.properties.images.items'
          || fieldPath === 'properties.logo.properties.faviconUrl'
          || fieldPath === 'properties.logo.properties.appleTouchIconUrl') {
          errors.push(`${schemaPath}.${fieldPath}.x-asset: falta ratio o ratios`);
        }
      }
      if (asset.ratioTolerance !== undefined && (
        typeof asset.ratioTolerance !== 'number' || asset.ratioTolerance < 0
      )) {
        errors.push(`${schemaPath}.${fieldPath}.x-asset.ratioTolerance: debe ser un número no negativo`);
      }
    }
    for (const [key, value] of Object.entries(node)) {
      if (value && typeof value === 'object') inspectAssets(value, fieldPath ? `${fieldPath}.${key}` : key);
    }
  };
  inspectAssets(schema, '');
}
for (const [key, tokenSchema] of Object.entries(brandSchema.properties.theme.properties)) {
  const against = tokenSchema['x-contrastWith'];
  if (!against) continue;
  const ratio = contrastRatio(brand.theme[key], brand.theme[against]);
  if (ratio < 4.5) {
    warnings.push(`src/data/brand.json.theme.${key}: contraste ${ratio.toFixed(2)}:1 con ${against}; se recomiendan 4,5:1`);
  }
}

if (strict) {
  for (const example of examples) warnings.push(`${example}: dato de ejemplo marcado en el esquema`);
  for (const marker of markers) warnings.push(`${marker}: marcador pendiente de reemplazo`);
}

if (warnings.length) {
  for (const warning of warnings) console.warn(`ADVERTENCIA ${warning}`);
}
if (errors.length || (strict && (examples.length > 0 || markers.length > 0))) {
  for (const error of errors) console.error(`ERROR ${error}`);
  if (strict) {
    for (const example of examples) console.error(`EJEMPLO ${example}`);
    for (const marker of markers) console.error(`MARCADOR ${marker}`);
  }
  process.exitCode = 1;
} else {
  console.log('check:config correcto.');
}
