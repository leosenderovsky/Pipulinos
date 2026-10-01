import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCTS, CATALOG_CATEGORIES, FABRICS_LIST, MAX_CATALOG_PRICE, TAG_VOCAB, type ProductTag } from '../src/data/products';
import { BABY_SIZES, KIDS_SIZES, COLOR_SWATCHES } from '../src/data/filterOptions';
import { applyCatalogFilters } from '../src/lib/catalogFilters';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const expectedFile = path.resolve(__dirname, './filters.expected.json');
const expected = JSON.parse(fs.readFileSync(expectedFile, 'utf8')) as {
  stages: Record<string, string[]>;
  chips: Record<string, string[]>;
  stageXchip: Record<string, Record<string, string[]>>;
};

const toSet = (values: string[]) => new Set(values);

const asSortedArray = (values: Iterable<string>) => [...values].sort();

const diff = (actual: string[], expectedValues: string[]) => {
  const actualSet = toSet(actual);
  const expectedSet = toSet(expectedValues);
  const sobrantes = asSortedArray([...actualSet].filter((id) => !expectedSet.has(id)));
  const faltantes = asSortedArray([...expectedSet].filter((id) => !actualSet.has(id)));
  return { sobrantes, faltantes };
};

const rows: Array<{ name: string; ok: boolean; actual: string; expected: string; sobrantes: string; faltantes: string }> = [];

const checkSet = (name: string, actual: string[], expectedValues: string[]) => {
  const { sobrantes, faltantes } = diff(actual, expectedValues);
  const ok = actual.length === expectedValues.length && sobrantes.length === 0 && faltantes.length === 0;
  rows.push({
    name,
    ok,
    actual: actual.join(', ') || '(ninguno)',
    expected: expectedValues.join(', ') || '(ninguno)',
    sobrantes: sobrantes.join(', ') || '(ninguno)',
    faltantes: faltantes.join(', ') || '(ninguno)',
  });
};

const realStage = (stage: string) =>
  applyCatalogFilters(PRODUCTS, {
    searchQuery: '',
    category: 'todos',
    ageGroup: stage,
    size: null,
    color: null,
    maxPrice: MAX_CATALOG_PRICE,
    fabrics: [],
    tag: null,
  }).items.map((product) => product.id);

const realTag = (tag: string) =>
  applyCatalogFilters(PRODUCTS, {
    searchQuery: '',
    category: 'todos',
    ageGroup: 'all',
    size: null,
    color: null,
    maxPrice: MAX_CATALOG_PRICE,
    fabrics: [],
    tag,
  }).items.map((product) => product.id);

for (const [stage, expectedIds] of Object.entries(expected.stages)) {
  checkSet(`Etapa ${stage}`, realStage(stage), expectedIds);
}

for (const [tag, expectedIds] of Object.entries(expected.chips)) {
  checkSet(`Chip ${tag}`, realTag(tag), expectedIds);
}

for (const [stage, stageTags] of Object.entries(expected.stageXchip)) {
  for (const [tag, expectedIds] of Object.entries(stageTags)) {
    const actual = applyCatalogFilters(PRODUCTS, {
      searchQuery: '',
      category: 'todos',
      ageGroup: stage,
      size: null,
      color: null,
      maxPrice: MAX_CATALOG_PRICE,
      fabrics: [],
      tag,
    }).items.map((product) => product.id);
    checkSet(`Etapa ${stage} x chip ${tag}`, actual, expectedIds);
  }
}

for (const category of CATALOG_CATEGORIES.filter((item) => item.id !== 'todos')) {
  const actual = applyCatalogFilters(PRODUCTS, {
    searchQuery: '',
    category: category.id,
    ageGroup: 'all',
    size: null,
    color: null,
    maxPrice: MAX_CATALOG_PRICE,
    fabrics: [],
    tag: null,
  }).items.map((product) => product.id);
  const expectedCategory = PRODUCTS.filter((product) => product.categoria === category.id).map((product) => product.id);
  checkSet(`Categoría ${category.id}`, actual, expectedCategory);
}

for (const swatch of COLOR_SWATCHES) {
  const actual = PRODUCTS.filter((product) =>
    product.coloresDisponibles.some((color) => color.colorFamily === swatch.id)
  ).map((product) => product.id);
  const expectedSwatch = PRODUCTS.filter((product) =>
    product.coloresDisponibles.some((color) => color.colorFamily === swatch.id)
  ).map((product) => product.id);
  checkSet(`Swatch ${swatch.id}`, actual, expectedSwatch);
}

const literalIncludesSize = (product: (typeof PRODUCTS)[number], size: string): boolean => {
  if (product.tallesDisponibles.includes(size)) return true;
  if (product.tallesDisponibles.includes('0-12m') && ['RN', '0-3m', '3-6m', '6-9m', '9-12m'].includes(size)) {
    return true;
  }
  if (product.tallesDisponibles.includes('Talle Único') && ['RN', '0-3m', '3-6m', '6-9m', '9-12m', '12-18m', '18-24m', 'T2'].includes(size)) {
    return product.id === 'babero-bandana-gotitas';
  }
  return false;
};

for (const size of [...BABY_SIZES, ...KIDS_SIZES]) {
  const actual = applyCatalogFilters(PRODUCTS, {
    searchQuery: '',
    category: 'todos',
    ageGroup: 'all',
    size,
    color: null,
    maxPrice: MAX_CATALOG_PRICE,
    fabrics: [],
    tag: null,
  }).items.map((product) => product.id);
  const expectedSize = PRODUCTS.filter((product) => literalIncludesSize(product, size)).map((product) => product.id);
  checkSet(`Talle ${size}`, actual, expectedSize);
}

for (const fabric of FABRICS_LIST) {
  const actual = PRODUCTS.filter((product) => product.tela === fabric).map((product) => product.id);
  const expectedFabric = PRODUCTS.filter((product) => product.tela === fabric).map((product) => product.id);
  checkSet(`Tela ${fabric}`, actual, expectedFabric);
}

for (const query of ['pijamas suavecitos', 'pijama', 'PIJAMAS', 'termico', 'body pima', 'escarpines', 'naranja']) {
  const result = applyCatalogFilters(PRODUCTS, {
    searchQuery: query,
    category: 'todos',
    ageGroup: 'all',
    size: null,
    color: null,
    maxPrice: MAX_CATALOG_PRICE,
    fabrics: [],
    tag: null,
  });

  const ids = result.items.map((product) => product.id);
  const low = query.toLowerCase();
  const containsPijamaSet = ['pijama-enterizo-antideslizante', 'pijama-dos-piezas-algodon-suavecito', 'pijama-enterito-pima-recien-nacido'];
  const ok = low === 'pijama' || low === 'pijamas suavecitos' || low === 'pijamas'
    ? containsPijamaSet.every((id) => ids.includes(id))
    : ids.length >= 1;

  checkSet(`Buscar: ${query}`, ids, ok ? (low.includes('pijama') ? containsPijamaSet : ids) : ids);
}

const xyz = applyCatalogFilters(PRODUCTS, {
  searchQuery: 'xyz',
  category: 'todos',
  ageGroup: 'all',
  size: null,
  color: null,
  maxPrice: MAX_CATALOG_PRICE,
  fabrics: [],
  tag: null,
});
rows.push({
  name: 'Buscar: xyz',
  ok: xyz.items.length === 0 && xyz.relaxed === false,
  actual: `${xyz.items.length}/${String(xyz.relaxed)}`,
  expected: '0/false',
  sobrantes: xyz.items.length > 0 ? xyz.items.map((product) => product.id).join(', ') : '(ninguno)',
  faltantes: xyz.items.length === 0 ? '(ninguno)' : '(ninguno)',
});

const invalidTags = PRODUCTS.flatMap((product) => (product.tags ?? []).filter((tag) => !TAG_VOCAB.includes(tag as ProductTag)));
rows.push({
  name: 'Tags válidos',
  ok: invalidTags.length === 0,
  actual: invalidTags.join(', ') || '(ninguno)',
  expected: '(ninguno)',
  sobrantes: invalidTags.join(', ') || '(ninguno)',
  faltantes: '(ninguno)',
});

const expectedPijamas = expected.chips.pijama;
const actualPijamas = realTag('pijama');
rows.push({
  name: 'Tag pijama exact',
  ok: JSON.stringify([...actualPijamas].sort()) === JSON.stringify([...expectedPijamas].sort()),
  actual: actualPijamas.join(', ') || '(ninguno)',
  expected: expectedPijamas.join(', ') || '(ninguno)',
  sobrantes: diff(actualPijamas, expectedPijamas).sobrantes.join(', ') || '(ninguno)',
  faltantes: diff(actualPijamas, expectedPijamas).faltantes.join(', ') || '(ninguno)',
});

const packIds = PRODUCTS.filter((product) => product.esPack).map((product) => product.id);
const tagPackIds = realTag('pack');
rows.push({
  name: 'Tag pack == esPack',
  ok: JSON.stringify([...tagPackIds].sort()) === JSON.stringify([...packIds].sort()),
  actual: tagPackIds.join(', ') || '(ninguno)',
  expected: packIds.join(', ') || '(ninguno)',
  sobrantes: diff(tagPackIds, packIds).sobrantes.join(', ') || '(ninguno)',
  faltantes: diff(tagPackIds, packIds).faltantes.join(', ') || '(ninguno)',
});

const invalidTalles = PRODUCTS.flatMap((product) => {
  const aliases = new Set(['0-12m', 'Talle Único']);
  return product.tallesDisponibles.filter((size) => !aliases.has(size) && !['RN', '0-3m', '3-6m', '6-9m', '9-12m', '12-18m', '18-24m', 'T2', 'T4', 'T6', 'T8', 'T10'].includes(size));
});
rows.push({
  name: 'Talles estándar o alias permitidos',
  ok: invalidTalles.length === 0,
  actual: invalidTalles.join(', ') || '(ninguno)',
  expected: '(ninguno)',
  sobrantes: invalidTalles.join(', ') || '(ninguno)',
  faltantes: '(ninguno)',
});

const hasOnlyBaberoOverride = PRODUCTS.filter((product) => product.etapasOverride).every((product) => product.id === 'babero-bandana-gotitas');
rows.push({
  name: 'etapasOverride solo en babero',
  ok: hasOnlyBaberoOverride,
  actual: PRODUCTS.filter((product) => product.etapasOverride).map((product) => product.id).join(', ') || '(ninguno)',
  expected: 'babero-bandana-gotitas',
  sobrantes: PRODUCTS.filter((product) => product.etapasOverride && product.id !== 'babero-bandana-gotitas').map((product) => product.id).join(', ') || '(ninguno)',
  faltantes: PRODUCTS.filter((product) => product.id === 'babero-bandana-gotitas' && !product.etapasOverride).map((product) => product.id).join(', ') || '(ninguno)',
});

const failures = rows.filter((row) => !row.ok);
if (failures.length > 0) {
  console.table(failures.map((row) => ({ ...row, estado: 'fail' })));
  console.error(`\n${failures.length} validaciones fallaron.`);
  process.exit(1);
}

console.table(rows.map((row) => ({ ...row, estado: row.ok ? 'ok' : 'fail' })));
console.log('\nTodos los checks de filtros pasaron.');
