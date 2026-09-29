import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { BRAND_CONFIG } from '../brand.config';
import { HeroBanner } from './HeroBanner';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, MessageCircle, Home, Sparkles } from 'lucide-react';

interface CatalogViewProps {
  onOpenProduct: (product: Product) => void;
  onOpenSizeGuideModal: () => void;
  searchQuery: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedAgeGroup: string;
  onSelectAgeGroup: (group: string) => void;
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
  selectedCategory,
  onSelectCategory,
  selectedAgeGroup,
  onSelectAgeGroup,
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

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.nombre.toLowerCase().includes(q);
        const matchesDesc = product.descripcion.toLowerCase().includes(q);
        const matchesCat = product.categoria.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // 2. Category
      if (selectedCategory !== 'todos' && product.categoria !== selectedCategory) {
        return false;
      }

      // 3. Age Group
      if (selectedAgeGroup !== 'all' && product.edadEtapa !== selectedAgeGroup) {
        return false;
      }

      // 4. Size
      if (selectedSize && !product.tallesDisponibles.includes(selectedSize)) {
        return false;
      }

      // 5. Color
      if (selectedColor) {
        const hasColor = product.coloresDisponibles.some(
          (c) => c.colorFamily === selectedColor || c.name.toLowerCase().includes(selectedColor)
        );
        if (!hasColor) return false;
      }

      // 6. Max Price
      if (product.precio > maxPrice) {
        return false;
      }

      // 7. Fabrics
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.tela)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'menor_precio') return a.precio - b.precio;
      if (sortOrder === 'mayor_precio') return b.precio - a.precio;
      if (sortOrder === 'descuento') {
        const discA = a.precioAnterior ? a.precioAnterior - a.precio : 0;
        const discB = b.precioAnterior ? b.precioAnterior - b.precio : 0;
        return discB - discA;
      }
      return 0; // Default popular / curated
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedAgeGroup,
    selectedSize,
    selectedColor,
    maxPrice,
    selectedFabrics,
    sortOrder,
  ]);

  const scrollToCatalogAnchor = () => {
    const el = document.getElementById('catalogo-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-10 left-10 w-64 h-64 bg-[#FFD026]/15 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-40 right-10 w-80 h-80 bg-[#26A4F8]/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-96 left-1/3 w-72 h-72 bg-[#8B5CF6]/10 rounded-full blur-3xl -z-10" />

      {/* Hero Banner Component (Compact showroom campaign) */}
      <HeroBanner onScrollToCatalog={scrollToCatalogAnchor} />

      {/* Top Utility Announcement & Breadcrumb Bar */}
      <div
        id="catalogo-anchor"
        className="w-full bg-white/70 backdrop-blur-md border-y border-purple-100/70 py-2.5 px-4 md:px-6 mt-4"
      >
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-purple-900/80">
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#FF6B57]" />
              <span>Inicio</span>
            </span>
            <span className="text-purple-300">/</span>
            <span className="text-[#FF6B57] bg-[#FFE9E5] px-2.5 py-0.5 rounded-full border border-[#FF6B57]/20 font-extrabold">
              Catálogo Showroom Pipulinos 2027
            </span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-purple-900/70 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-[#E3F9ED] text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-[#2DD382] animate-ping" />
              Stock renovado hoy
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#E2F3FF] text-sky-800 px-2.5 py-0.5 rounded-full border border-sky-200">
              ⚡ Envíos express 24/48hs
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-amber-800 bg-[#FFF4D0] px-2.5 py-0.5 rounded-full border border-amber-200 font-bold">
              ★ 100% Amor garantizado
            </span>
          </div>
        </div>
      </div>

      {/* Main Showroom Workspace */}
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-6">
        {/* Mobile Filter Open Trigger (Sticky top on mobile viewports) */}
        <div className="lg:hidden flex items-center justify-between gap-2 mb-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-sm border border-purple-100">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B57] to-[#FF8A1E] text-white py-2.5 px-4 rounded-xl font-extrabold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>
              Filtrar prendas divertidas{' '}
              {activeFiltersCount > 0 ? `(${activeFiltersCount} activos)` : ''}
            </span>
          </button>
          <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-xl border border-purple-100">
            <span className="font-extrabold text-xs text-[#8B5CF6]">
              {filteredProducts.length} prendas
            </span>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="flex flex-col lg:flex-row items-start gap-6 relative">
          {/* LEFT COLUMN: Sticky Filter Sidebar (~290px on Desktop) */}
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

          {/* RIGHT COLUMN: Catalog Display Area */}
          <section className="flex-1 w-full min-w-0 flex flex-col gap-5">
            {/* Showroom Top Bar Control */}
            <div className="w-full bg-gradient-to-r from-white via-amber-50/30 to-purple-50/40 p-4 sm:p-5 rounded-3xl shadow-xs border-2 border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base sm:text-lg">⭐</span>
                  <h1 className="font-extrabold text-lg sm:text-xl text-[#1E2046] tracking-tight">
                    Colección Showroom Pipulinos 2027
                  </h1>
                </div>
                <p className="text-xs font-semibold text-purple-900/80 flex items-center gap-1.5 flex-wrap">
                  Prendas suaves, amorosas y listas para jugar •{' '}
                  <span className="bg-[#FFE9E5] text-[#FF6B57] px-2 py-0.5 rounded-full font-extrabold">
                    {filteredProducts.length} modelos disponibles
                  </span>
                </p>
              </div>

              {/* Sorting options */}
              <div className="flex items-center gap-2 self-end sm:self-center relative z-10">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-2xl border border-purple-100 shadow-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
                  <label htmlFor="sortOrderSelect" className="text-xs font-bold text-purple-400">
                    Ordenar:
                  </label>
                  <select
                    id="sortOrderSelect"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-[#1E2046] outline-none cursor-pointer pr-1"
                  >
                    <option value="populares">Más vendidos ⭐</option>
                    <option value="menor_precio">Menor precio</option>
                    <option value="mayor_precio">Mayor precio</option>
                    <option value="descuento">Mayor descuento %</option>
                  </select>
                </div>
              </div>
            </div>

            {/* High-Fidelity Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="w-full bg-white rounded-3xl p-10 border-2 border-purple-100 text-center flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#FFF4D0] text-amber-800 flex items-center justify-center text-2xl">
                  🔍
                </div>
                <h3 className="text-base font-extrabold text-[#1E2046]">
                  No encontramos prendas con esos filtros
                </h3>
                <p className="text-xs text-purple-900/70 font-medium max-w-sm">
                  Probá restableciendo los filtros o buscando con otros términos para ver toda la
                  colección.
                </p>
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="mt-2 px-5 py-2.5 rounded-full bg-[#FF6B57] text-white font-extrabold text-xs shadow-xs hover:bg-[#FF8A1E] transition-all cursor-pointer"
                >
                  Ver todos los modelos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenProduct={onOpenProduct}
                  />
                ))}
              </div>
            )}

            {/* Friendly Pagination Strip */}
            <div className="mt-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xs border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs font-bold text-purple-800">
                Página <strong className="text-[#1E2046] bg-[#FFF4D0] px-2 py-0.5 rounded-md">1</strong> de 1 •
                Mostrando {filteredProducts.length} de {PRODUCTS.length} prendas mimadas
              </p>
              <div className="flex items-center gap-1 font-bold text-xs">
                <button
                  type="button"
                  disabled
                  className="w-8 h-8 rounded-xl bg-purple-50 text-purple-300 flex items-center justify-center cursor-not-allowed border border-purple-100"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-xl bg-[#FF6B57] text-white font-extrabold flex items-center justify-center shadow-xs"
                >
                  1
                </button>
                <button
                  type="button"
                  disabled
                  className="w-8 h-8 rounded-xl bg-purple-50 text-purple-300 flex items-center justify-center cursor-not-allowed border border-purple-100"
                >
                  ›
                </button>
              </div>
            </div>

            {/* WhatsApp Sizing Trust Banner (Integrated at bottom of catalog) */}
            <div className="mt-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-200/80 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden shadow-xs">
              <div className="flex items-center gap-3.5 text-left relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#25D366] to-emerald-400 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">📏</span>
                    <h4 className="font-extrabold text-base sm:text-lg text-emerald-950">
                      ¿Dudas con el talle de tu peque?
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-900/80 font-medium mt-0.5">
                    {BRAND_CONFIG.copy.sizeAssistancePrompt}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent('Hola Pipulinos, tengo dudas con las medidas para mi bebé')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto shrink-0 px-6 py-3 rounded-full bg-[#25D366] hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar a una asesora</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
