import React, { useMemo, useState } from 'react';
import { Txt } from './Txt';
import { PRODUCTS, Product, MAX_CATALOG_PRICE } from '../data/products';
import { BRAND_CONFIG, formatText } from '../brand.config';
import { HeroBanner } from './HeroBanner';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, MessageCircle, Home } from 'lucide-react';
import { applyCatalogFilters } from '../lib/catalogFilters';
import { QUICK_FILTERS } from '../data/filterOptions';
import { stageAffinity } from '../lib/sizes';

interface CatalogViewProps {
  onOpenProduct: (product: Product) => void;
  onOpenSizeGuideModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedAgeGroup: string;
  onSelectAgeGroup: (group: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onOpenMobileFilters: () => void;
  activeFiltersCount: number;
  selectedSize: string | null;
  onSelectSize: (s: string | null) => void;
  selectedColor: string | null;
  onSelectColor: (c: string | null) => void;
  maxPrice: number;
  onMaxPriceChange: (v: number) => void;
  selectedFabrics: string[];
  onToggleFabric: (f: string) => void;
  onResetFilters: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onOpenProduct,
  onOpenSizeGuideModal,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedAgeGroup,
  onSelectAgeGroup,
  selectedTag,
  onSelectTag,
  onOpenMobileFilters,
  activeFiltersCount,
  selectedSize,
  onSelectSize,
  selectedColor,
  onSelectColor,
  maxPrice,
  onMaxPriceChange,
  selectedFabrics,
  onToggleFabric,
  onResetFilters,
}) => {
  const [sortOrder, setSortOrder] = useState<string>('populares');

  const { items: filteredProducts, relaxed } = useMemo(
    () =>
      applyCatalogFilters(PRODUCTS, {
        searchQuery,
        category: selectedCategory,
        ageGroup: selectedAgeGroup,
        size: selectedSize,
        color: selectedColor,
        maxPrice,
        fabrics: selectedFabrics,
        tag: selectedTag,
      }),
    [searchQuery, selectedCategory, selectedAgeGroup, selectedSize, selectedColor, maxPrice, selectedFabrics, selectedTag]
  );

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    if (sortOrder === 'menor_precio') return items.sort((a, b) => a.precio - b.precio);
    if (sortOrder === 'mayor_precio') return items.sort((a, b) => b.precio - a.precio);
    if (sortOrder === 'descuento')
      return items.sort((a, b) => {
        const discA = a.precioAnterior ? a.precioAnterior - a.precio : 0;
        const discB = b.precioAnterior ? b.precioAnterior - b.precio : 0;
        return discB - discA;
      });

    if (selectedAgeGroup !== 'all') {
      return items.sort((a, b) => {
        const affinityA = stageAffinity(a, selectedAgeGroup as 'recien-nacidos' | 'bebes' | 'ninos');
        const affinityB = stageAffinity(b, selectedAgeGroup as 'recien-nacidos' | 'bebes' | 'ninos');
        return affinityB - affinityA;
      });
    }

    return items;
  }, [filteredProducts, sortOrder, selectedAgeGroup]);

  const activeFilterPills: Array<{ id: string; label: string; onRemove: () => void }> = [];

  if (searchQuery.trim()) {
    activeFilterPills.push({
      id: 'search',
      label: formatText(BRAND_CONFIG.ui.catalog.pillSearch, { query: searchQuery }),
      onRemove: () => onSearchChange(''),
    });
  }

  if (selectedCategory !== 'todos') {
    activeFilterPills.push({
      id: 'category',
      label: selectedCategory,
      onRemove: () => onSelectCategory('todos'),
    });
  }

  if (selectedAgeGroup !== 'all') {
    activeFilterPills.push({
      id: 'age',
      label: selectedAgeGroup === 'recien-nacidos' ? BRAND_CONFIG.ui.filters.ageNewborn : selectedAgeGroup === 'bebes' ? BRAND_CONFIG.ui.filters.ageBabies : BRAND_CONFIG.ui.filters.ageKids,
      onRemove: () => onSelectAgeGroup('all'),
    });
  }

  if (selectedTag) {
    const label = QUICK_FILTERS.find((filter) => filter.value === selectedTag)?.label ?? selectedTag;
    activeFilterPills.push({
      id: `tag-${selectedTag}`,
      label,
      onRemove: () => onSelectTag(null),
    });
  }

  if (selectedSize) {
    activeFilterPills.push({
      id: `size-${selectedSize}`,
      label: formatText(BRAND_CONFIG.ui.catalog.pillSize, { size: selectedSize }),
      onRemove: () => onSelectSize(null),
    });
  }

  if (selectedColor) {
    activeFilterPills.push({
      id: `color-${selectedColor}`,
      label: formatText(BRAND_CONFIG.ui.catalog.pillColor, { color: selectedColor }),
      onRemove: () => onSelectColor(null),
    });
  }

  selectedFabrics.forEach((fabric) => {
    activeFilterPills.push({
      id: `fabric-${fabric}`,
      label: fabric,
      onRemove: () => onToggleFabric(fabric),
    });
  });

  if (maxPrice < MAX_CATALOG_PRICE) {
    activeFilterPills.push({
      id: 'price',
      label: formatText(BRAND_CONFIG.ui.catalog.pillPrice, { price: `$${maxPrice.toLocaleString('es-AR')}` }),
      onRemove: () => onMaxPriceChange(MAX_CATALOG_PRICE),
    });
  }

  const scrollToCatalogAnchor = () => {
    const el = document.getElementById('catalogo-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      <div className="pointer-events-none absolute -top-10 left-10 w-64 h-64 bg-brand-secondary/15 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-40 right-10 w-80 h-80 bg-brand-accent-blue/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-96 left-1/3 w-72 h-72 bg-brand-text-muted/10 rounded-full blur-3xl -z-10" />

      <HeroBanner onScrollToCatalog={scrollToCatalogAnchor} />

      <div id="catalogo-anchor" className="w-full bg-white/70 backdrop-blur-md border-y border-purple-100/70 py-2.5 px-4 md:px-6 mt-4 scroll-mt-44">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-purple-900/80">
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-brand-primary" />
              <Txt as="span" value={BRAND_CONFIG.ui.catalog.breadcrumbHome} />
            </span>
            <span className="text-purple-300">/</span>
            <span className="text-brand-primary bg-brand-surface-pink px-2.5 py-0.5 rounded-full border border-brand-primary/20 font-extrabold">
              {BRAND_CONFIG.copy.catalogTitle} {BRAND_CONFIG.shortName} {BRAND_CONFIG.catalogYear}
            </span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-purple-900/70 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-brand-surface-green text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />{BRAND_CONFIG.ui.catalog.badgeStock}</span>
            <Txt as="span" className="hidden sm:inline-flex items-center gap-1.5 bg-brand-surface-blue text-sky-800 px-2.5 py-0.5 rounded-full border border-sky-200" value={BRAND_CONFIG.ui.catalog.badgeExpress} />
            <Txt as="span" className="hidden md:inline-flex items-center gap-1 text-amber-800 bg-brand-secondary-soft px-2.5 py-0.5 rounded-full border border-amber-200 font-bold" value={BRAND_CONFIG.ui.catalog.badgeLove} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-6">
        <div className="lg:hidden flex items-center justify-between gap-2 mb-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-sm border border-purple-100">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-primary-hover text-white py-2.5 px-4 rounded-xl font-extrabold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>
              {BRAND_CONFIG.ui.catalog.filterButton} {activeFiltersCount > 0 ? formatText(BRAND_CONFIG.ui.catalog.activeCount, { count: String(activeFiltersCount) }) : ''}
            </span>
          </button>
          <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-xl border border-purple-100">
            <span className="font-extrabold text-xs text-brand-text-muted">{formatText(BRAND_CONFIG.ui.catalog.productCount, { count: String(sortedProducts.length) })}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6 relative">
          <div className="hidden lg:block w-[290px] shrink-0 sticky top-28">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              selectedAgeGroup={selectedAgeGroup}
              onSelectAgeGroup={onSelectAgeGroup}
              selectedSize={selectedSize}
              onSelectSize={onSelectSize}
              selectedColor={selectedColor}
              onSelectColor={onSelectColor}
              maxPrice={maxPrice}
              onMaxPriceChange={onMaxPriceChange}
              selectedFabrics={selectedFabrics}
              onToggleFabric={onToggleFabric}
              onResetFilters={onResetFilters}
              activeFiltersCount={activeFiltersCount}
              onOpenSizeGuide={onOpenSizeGuideModal}
            />
          </div>

          <section className="flex-1 w-full min-w-0 flex flex-col gap-5">
            <div className="w-full bg-gradient-to-r from-white via-amber-50/30 to-purple-50/40 p-4 sm:p-5 rounded-3xl shadow-xs border-2 border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base sm:text-lg">⭐</span>
                  <h1 className="font-extrabold text-lg sm:text-xl text-brand-text tracking-tight">
                    {BRAND_CONFIG.copy.catalogCollectionTitle} {BRAND_CONFIG.shortName}{' '}
                    {BRAND_CONFIG.catalogYear}
                  </h1>
                </div>
                <p className="text-xs font-semibold text-purple-900/80 flex items-center gap-1.5 flex-wrap">
                  {BRAND_CONFIG.ui.catalog.headline}{' '}
                  <span className="bg-brand-surface-pink text-brand-primary px-2 py-0.5 rounded-full font-extrabold">
                    {formatText(BRAND_CONFIG.ui.catalog.modelsAvailable, { count: String(sortedProducts.length) })}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center relative z-10">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-2xl border border-purple-100 shadow-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
                  <Txt as="label" htmlFor="sortOrderSelect" className="text-xs font-bold text-purple-400" value={BRAND_CONFIG.ui.catalog.sortLabel} />
                  <select
                    id="sortOrderSelect"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-brand-text outline-none cursor-pointer pr-1"
                  >
                    <option value="populares">{BRAND_CONFIG.ui.catalog.sortPopular}</option>
                    <option value="menor_precio">{BRAND_CONFIG.ui.catalog.sortPriceAsc}</option>
                    <option value="mayor_precio">{BRAND_CONFIG.ui.catalog.sortPriceDesc}</option>
                    <option value="descuento">{BRAND_CONFIG.ui.catalog.sortDiscount}</option>
                  </select>
                </div>
              </div>
            </div>

            {activeFilterPills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-purple-100 bg-white/80 p-3">
                {activeFilterPills.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={filter.onRemove}
                    className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-800 hover:bg-purple-100"
                  >
                    {filter.label}
                    <span className="text-[10px]">×</span>
                  </button>
                ))}
                <Txt as="button"
                  type="button"
                  onClick={onResetFilters}
                  className="ml-auto rounded-full bg-brand-surface-pink px-3 py-1 text-[11px] font-extrabold text-brand-primary hover:bg-brand-surface-pink-strong" value={BRAND_CONFIG.ui.catalog.clearAll} />
              </div>
            )}

            {relaxed && sortedProducts.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <Txt as="span" className="font-bold" value={BRAND_CONFIG.ui.catalog.similarResults} />
                <Txt as="button"
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold text-amber-800 border border-amber-200 hover:bg-amber-100" value={BRAND_CONFIG.ui.catalog.clearSearch} />
              </div>
            )}

            {sortedProducts.length === 0 ? (
              <div className="w-full bg-white rounded-3xl p-10 border-2 border-purple-100 text-center flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-brand-secondary-soft text-amber-800 flex items-center justify-center text-2xl">🔍</div>
                <Txt as="h3" className="text-base font-extrabold text-brand-text" value={BRAND_CONFIG.ui.catalog.emptyTitle} />
                <Txt as="p" className="text-xs text-purple-900/70 font-medium max-w-sm" value={BRAND_CONFIG.ui.catalog.emptyDescription} />
                <div className="flex flex-wrap justify-center gap-2">
                  {activeFilterPills.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={filter.onRemove}
                      className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-800"
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Txt as="button"
                    type="button"
                    onClick={onResetFilters}
                    className="mt-2 px-5 py-2.5 rounded-full bg-brand-primary text-white font-extrabold text-xs shadow-xs hover:bg-brand-primary-hover transition-all cursor-pointer" value={BRAND_CONFIG.ui.catalog.clearAll} />
                  <Txt as="button"
                    type="button"
                    onClick={() => onResetFilters()}
                    className="mt-2 px-5 py-2.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-xs shadow-xs hover:bg-purple-200 transition-all cursor-pointer" value={BRAND_CONFIG.ui.catalog.viewAll} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onOpenProduct={onOpenProduct} />
                ))}
              </div>
            )}

            <div className="mt-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xs border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs font-bold text-purple-800">
                {formatText(BRAND_CONFIG.ui.catalog.pagination, { page: '1', shown: String(sortedProducts.length), total: String(PRODUCTS.length) })}
              </p>
              <div className="flex items-center gap-1 font-bold text-xs">
                <button type="button" disabled className="w-8 h-8 rounded-xl bg-purple-50 text-purple-300 flex items-center justify-center cursor-not-allowed border border-purple-100">‹</button>
                <button type="button" className="w-8 h-8 rounded-xl bg-brand-primary text-white font-extrabold flex items-center justify-center shadow-xs">1</button>
                <button type="button" disabled className="w-8 h-8 rounded-xl bg-purple-50 text-purple-300 flex items-center justify-center cursor-not-allowed border border-purple-100">›</button>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-200/80 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden shadow-xs">
              <div className="flex items-center gap-3.5 text-left relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-whatsapp to-emerald-400 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">📏</span>
                    <Txt as="h4" className="font-extrabold text-base sm:text-lg text-emerald-950" value={BRAND_CONFIG.ui.catalog.sizeCtaTitle} />
                  </div>
                  <p className="text-xs text-emerald-900/80 font-medium mt-0.5">{BRAND_CONFIG.copy.sizeAssistancePrompt}</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(formatText(BRAND_CONFIG.ui.whatsapp.greeting, { name: BRAND_CONFIG.shortName, message: BRAND_CONFIG.copy.whatsappSizeMessage }))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto shrink-0 px-6 py-3 rounded-full bg-brand-whatsapp hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />{BRAND_CONFIG.ui.catalog.sizeCtaButton}</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
