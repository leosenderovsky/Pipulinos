import type { Product } from '../data/products';
import { productHasSize, stagesOf } from './sizes';
import { searchProducts } from './search';

export interface CatalogFilters {
  searchQuery: string;
  category: string;
  ageGroup: string;
  size: string | null;
  color: string | null;
  maxPrice: number;
  fabrics: string[];
  tag: string | null;
}

export const applyStructuredFilters = (products: Product[], filters: CatalogFilters): Product[] =>
  products.filter((product) => {
    if (filters.category !== 'todos' && product.categoria !== filters.category) return false;

    if (
      filters.ageGroup !== 'all' &&
      !stagesOf(product.tallesDisponibles).includes(filters.ageGroup as 'recien-nacidos' | 'bebes' | 'ninos')
    ) {
      return false;
    }

    if (filters.size && !productHasSize(product.tallesDisponibles, filters.size)) return false;

    if (filters.color && !product.coloresDisponibles.some((color) => color.colorFamily === filters.color)) {
      return false;
    }

    if (product.precio > filters.maxPrice) return false;

    if (filters.fabrics.length > 0 && !filters.fabrics.some((fabric) => product.tela === fabric)) {
      return false;
    }

    if (filters.tag && !(product.tags ?? []).includes(filters.tag)) return false;

    return true;
  });

export const applyCatalogFilters = (products: Product[], filters: CatalogFilters) => {
  const structured = applyStructuredFilters(products, filters);
  return searchProducts(structured, filters.searchQuery);
};
