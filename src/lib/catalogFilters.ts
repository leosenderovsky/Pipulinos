import type { Product } from '../catalog';
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
    if (filters.category !== 'todos' && product.category !== filters.category) return false;

    if (
      filters.ageGroup !== 'all' &&
      !stagesOf(product).includes(filters.ageGroup as 'recien-nacidos' | 'bebes' | 'ninos')
    ) {
      return false;
    }

    if (filters.size && !productHasSize(product, filters.size)) return false;

    if (filters.color && !product.colors.some((color) => color.colorFamily === filters.color)) {
      return false;
    }

    if (product.price > filters.maxPrice) return false;

    if (filters.fabrics.length > 0 && !filters.fabrics.some((fabric) => product.material === fabric)) {
      return false;
    }

    if (filters.tag && !(product.tags ?? []).some((tag) => tag === filters.tag)) return false;

    return true;
  });

export const applyCatalogFilters = (products: Product[], filters: CatalogFilters) => {
  const structured = applyStructuredFilters(products, filters);
  return searchProducts(structured, filters.searchQuery);
};
