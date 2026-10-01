import { PRODUCTS, CATALOG_CATEGORIES, FABRICS_LIST, MAX_CATALOG_PRICE } from '../src/data/products';
import { BABY_SIZES, KIDS_SIZES, COLOR_SWATCHES, QUICK_FILTERS } from '../src/data/filterOptions';
import { applyCatalogFilters } from '../src/lib/catalogFilters';
import { productHasSize } from '../src/lib/sizes';

const rows: Array<{ name: string; ok: boolean; actual: string | number; expected: string }> = [];

const check = (name: string, ok: boolean, actual: string | number, expected: string) => {
  rows.push({ name, ok, actual, expected });
};

for (const filter of QUICK_FILTERS) {
  const result = applyCatalogFilters(PRODUCTS, {
    searchQuery: '',
    category: 'todos',
    ageGroup: filter.axis === 'stage' ? filter.value : 'all',
    size: null,
    color: null,
    maxPrice: MAX_CATALOG_PRICE,
    fabrics: [],
    tag: filter.axis === 'tag' ? filter.value : null,
  });

  check(`${filter.label} solo`, result.items.length >= 2, result.items.length, '>= 2');
}

for (const stage of QUICK_FILTERS.filter((item) => item.axis === 'stage')) {
  for (const tag of QUICK_FILTERS.filter((item) => item.axis === 'tag')) {
    const result = applyCatalogFilters(PRODUCTS, {
      searchQuery: '',
      category: 'todos',
      ageGroup: stage.value,
      size: null,
      color: null,
      maxPrice: MAX_CATALOG_PRICE,
      fabrics: [],
      tag: tag.value,
    });

    check(`${stage.value} x ${tag.value}`, result.items.length >= 1, result.items.length, '>= 1');
  }
}

for (const category of CATALOG_CATEGORIES.filter((item) => item.id !== 'todos')) {
  const result = applyCatalogFilters(PRODUCTS, {
    searchQuery: '',
    category: category.id,
    ageGroup: 'all',
    size: null,
    color: null,
    maxPrice: MAX_CATALOG_PRICE,
    fabrics: [],
    tag: null,
  });

  check(`Categoría ${category.id}`, result.items.length >= 1, result.items.length, '>= 1');
}

for (const swatch of COLOR_SWATCHES) {
  const count = PRODUCTS.filter((product) =>
    product.coloresDisponibles.some((color) => color.colorFamily === swatch.id)
  ).length;
  check(`Swatch ${swatch.id}`, count >= 2, count, '>= 2');
}

for (const size of [...BABY_SIZES, ...KIDS_SIZES]) {
  const count = PRODUCTS.filter((product) => productHasSize(product.tallesDisponibles, size)).length;
  check(`Talle ${size}`, count >= 1, count, '>= 1');
}

for (const fabric of FABRICS_LIST) {
  const count = PRODUCTS.filter((product) => product.tela === fabric).length;
  check(`Tela ${fabric}`, count >= 1, count, '>= 1');
}

for (const query of [
  'pijamas suavecitos',
  'pijama',
  'PIJAMAS',
  'termico',
  'body pima',
  'escarpines',
  'naranja',
]) {
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

  check(`Buscar: ${query}`, result.items.length >= 1, result.items.length, '>= 1');
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

check('Buscar: xyz', xyz.items.length === 0 && xyz.relaxed === false, `${xyz.items.length}/${String(xyz.relaxed)}`, '0/false');

const failures = rows.filter((row) => !row.ok);
if (failures.length > 0) {
  console.table(rows.map((row) => ({ ...row, status: row.ok ? 'ok' : 'fail' })));
  console.error(`\n${failures.length} filtros fallaron.`);
  process.exit(1);
}

console.table(rows.map((row) => ({ ...row, status: row.ok ? 'ok' : 'fail' })));
console.log('\nTodos los checks de filtros pasaron.');
