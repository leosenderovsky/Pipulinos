import React from 'react';
import { CATALOG_CATEGORIES, FABRICS_LIST } from '../data/products';
import { COLOR_SWATCHES } from '../data/filterOptions';
import { Sparkles, X, Ruler } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedAgeGroup: string;
  onSelectAgeGroup: (group: string) => void;
  selectedSize: string | null;
  onSelectSize: (size: string | null) => void;
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
  maxPrice: number;
  onMaxPriceChange: (val: number) => void;
  selectedFabrics: string[];
  onToggleFabric: (fabric: string) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
  onOpenSizeGuide: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedAgeGroup,
  onSelectAgeGroup,
  selectedSize,
  onSelectSize,
  selectedColor,
  onSelectColor,
  maxPrice,
  onMaxPriceChange,
  selectedFabrics,
  onToggleFabric,
  onResetFilters,
  activeFiltersCount,
  onOpenSizeGuide,
  className = '',
}) => {
  const BABY_SIZES = ['RN', '0-3m', '3-6m', '6-9m', '9-12m', '12-18m', '18-24m'];
  const KIDS_SIZES = ['T2', 'T4', 'T6', 'T8', 'T10'];

  return (
    <aside
      className={`bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--brand-text-muted)_15%,transparent)] border-2 border-purple-100 transition-all ${className}`}
    >
      {/* Active Filters Header */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-secondary flex items-center justify-center text-brand-text font-bold text-sm shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-brand-text">Filtros Activos</h2>
            <span className="text-[11px] font-semibold text-purple-400 block -mt-0.5">
              {activeFiltersCount > 0 ? `${activeFiltersCount} seleccionados` : 'Personalizá tu búsqueda'}
            </span>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="font-bold text-xs text-brand-primary hover:text-brand-text bg-brand-surface-pink hover:bg-brand-secondary-soft px-2.5 py-1 rounded-full transition-all cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Applied Chips Preview */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 pb-3">
          {selectedCategory !== 'todos' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-surface-pink border border-brand-primary/30 text-brand-primary font-bold text-xs">
              {selectedCategory}
              <button
                type="button"
                onClick={() => onSelectCategory('todos')}
                className="hover:text-black"
                title="Quitar filtro"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedAgeGroup !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-surface-blue border border-sky-300 text-sky-800 font-bold text-xs">
              {selectedAgeGroup === 'recien-nacidos'
                ? '0-12m'
                : selectedAgeGroup === 'bebes'
                ? '1-3 años'
                : '4-10 años'}
              <button
                type="button"
                onClick={() => onSelectAgeGroup('all')}
                className="hover:text-black"
                title="Quitar filtro"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedSize && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-secondary-soft border border-amber-300 text-amber-900 font-bold text-xs">
              Talle: {selectedSize}
              <button
                type="button"
                onClick={() => onSelectSize(null)}
                className="hover:text-black"
                title="Quitar filtro"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedColor && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 font-bold text-xs capitalize">
              {selectedColor}
              <button
                type="button"
                onClick={() => onSelectColor(null)}
                className="hover:text-black"
                title="Quitar filtro"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Section: Categories with Counters */}
      <div className="py-3 border-t border-purple-50">
        <div className="flex items-center justify-between mb-2">
          <span className="font-extrabold text-xs uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-primary" />
            Categorías
          </span>
          <span className="text-[10px] font-bold text-brand-text-muted bg-purple-50 px-2 py-0.5 rounded-full">
            Showroom
          </span>
        </div>

        <div className="flex flex-col gap-1 text-xs font-semibold">
          {CATALOG_CATEGORIES.map((cat) => {
            const isSelected =
              cat.id === 'todos' ? selectedCategory === 'todos' : selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center justify-between p-2 rounded-2xl transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-secondary-soft to-amber-50 text-amber-950 font-extrabold border border-amber-200 shadow-xs scale-[1.01]'
                    : 'hover:bg-purple-50 text-purple-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-brand-secondary text-brand-text' : 'bg-purple-50 text-purple-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section: Age & Size Grouped Pills */}
      <div className="py-3 border-t border-purple-50">
        <div className="flex items-center justify-between mb-2">
          <span className="font-extrabold text-xs uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-accent-blue" />
            Talles por Etapa
          </span>
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-[11px] font-bold text-brand-accent-blue hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Ruler className="w-3 h-3" />
            <span>Guía</span>
          </button>
        </div>

        {/* Subgroup Baby */}
        <div className="mb-2.5 bg-purple-50/50 p-2.5 rounded-2xl border border-purple-100/60">
          <span className="text-[11px] font-extrabold text-purple-900 block mb-1.5 flex items-center gap-1">
            🍼 Etapa Bebé (Meses)
          </span>
          <div className="grid grid-cols-4 gap-1 text-xs text-center font-bold">
            {BABY_SIZES.map((sz) => {
              const active = selectedSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onSelectSize(active ? null : sz)}
                  className={`py-1 px-1 rounded-xl transition-all cursor-pointer ${
                    active
                      ? 'bg-brand-accent-blue text-white shadow-xs'
                      : 'bg-white border border-purple-100 text-purple-800 hover:border-brand-accent-blue hover:text-brand-accent-blue'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subgroup Kids */}
        <div className="bg-amber-50/50 p-2.5 rounded-2xl border border-amber-100/60">
          <span className="text-[11px] font-extrabold text-amber-900 block mb-1.5 flex items-center gap-1">
            🎈 Etapa Niños (Años)
          </span>
          <div className="grid grid-cols-5 gap-1 text-xs text-center font-bold">
            {KIDS_SIZES.map((sz) => {
              const active = selectedSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onSelectSize(active ? null : sz)}
                  className={`py-1 px-0.5 rounded-xl transition-all cursor-pointer ${
                    active
                      ? 'bg-brand-secondary text-brand-text shadow-xs font-extrabold'
                      : 'bg-white border border-amber-200 text-amber-900 hover:bg-brand-secondary-soft'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section: Color Palettes Swatches */}
      <div className="py-3 border-t border-purple-50">
        <span className="font-extrabold text-xs uppercase tracking-wider text-purple-900 block mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-success" />
          Paleta de Colores
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {COLOR_SWATCHES.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(isSelected ? null : color.id)}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                className={`w-7 h-7 rounded-full shadow-xs transition-transform cursor-pointer hover:scale-115 ${
                  isSelected ? 'ring-2 ring-brand-text ring-offset-2 scale-110' : 'ring-1 ring-black/10'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Section: Price Slider */}
      <div className="py-3 border-t border-purple-50">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-extrabold text-xs uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-secondary" />
            Rango de Precio
          </span>
          <span className="text-[11px] font-extrabold text-brand-primary bg-brand-surface-pink px-2 py-0.5 rounded-full">
            ARS ($)
          </span>
        </div>

        <div className="py-2">
          <input
            type="range"
            min={4000}
            max={35000}
            step={500}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-brand-primary cursor-pointer h-2 bg-purple-100 rounded-lg appearance-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-purple-50 px-2.5 py-1.5 rounded-xl flex flex-col border border-purple-100">
            <span className="text-[10px] font-bold text-purple-400">Mínimo</span>
            <span className="font-extrabold text-xs text-brand-text">$4.000</span>
          </div>
          <div className="bg-brand-surface-pink/70 px-2.5 py-1.5 rounded-xl flex flex-col text-right border border-brand-primary/20">
            <span className="text-[10px] font-bold text-brand-primary">Hasta</span>
            <span className="font-extrabold text-xs text-brand-primary">
              ${maxPrice.toLocaleString('es-AR')}
            </span>
          </div>
        </div>
      </div>

      {/* Section: Fabric & Comfort Badges */}
      <div className="pt-3 border-t border-purple-50">
        <span className="font-extrabold text-xs uppercase tracking-wider text-purple-900 block mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-text-muted" />
          Telas &amp; Confort
        </span>
        <div className="flex flex-col gap-1.5 text-xs font-semibold text-purple-900">
          {FABRICS_LIST.map((fabric) => {
            const checked = selectedFabrics.includes(fabric);
            return (
              <label
                key={fabric}
                className="flex items-center gap-2 cursor-pointer hover:text-brand-primary p-1.5 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleFabric(fabric)}
                  className="w-4 h-4 rounded text-brand-primary accent-brand-primary focus:ring-brand-primary"
                />
                <span className="flex items-center justify-between w-full">
                  <span>{fabric}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
