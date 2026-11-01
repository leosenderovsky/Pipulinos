import catalogData from './data/catalog.json' with { type: 'json' };
import { BRAND_CONFIG } from './brand.config';
import type { CatalogConfig, Product } from './generated/catalog.types';
export { TAG_VOCAB } from './generated/catalog.types';
export type {
  AgeStage,
  Product,
  ProductColor,
  ProductTag,
} from './generated/catalog.types';

const catalog = catalogData as unknown as CatalogConfig;
export const CATALOG_CONFIG = catalog;

export const PRODUCTS: Product[] = catalog.products;
export const CATEGORIES = [
  {
    id: 'todos',
    label: BRAND_CONFIG.ui.catalog.allCategoryLabel,
    emoji: '🌟',
    count: PRODUCTS.length,
  },
  ...catalog.categories.map((category) => ({
    ...category,
    count: PRODUCTS.filter((product) => product.category === category.id).length,
  })),
];
export const CATALOG_CATEGORIES = CATEGORIES;
export const FABRICS_LIST = catalog.filters.fabrics;
export const MAX_CATALOG_PRICE =
  Math.ceil(Math.max(...PRODUCTS.map((product) => product.price)) / 5000) * 5000;
export const MIN_CATALOG_PRICE =
  Math.floor(Math.min(...PRODUCTS.map((product) => product.price)) / 500) * 500;
export const CROSS_SELL_CATEGORY = catalog.settings.crossSellCategory;

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: BRAND_CONFIG.commerce.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
