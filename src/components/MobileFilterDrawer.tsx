import React from 'react';
import { X, Check } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filteredCount: number;
  // pass through all FilterSidebar props
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedAgeGroup: string;
  onSelectAgeGroup: (group: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
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
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={props.onClose}
      />

      {/* Bottom Sheet Drawer */}
      <div className="relative bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl z-10 overflow-hidden border-t-2 border-purple-100">
        {/* Drag handle & header */}
        <div className="pt-3 px-5 pb-3 border-b border-purple-100 flex items-center justify-between shrink-0 bg-purple-50/50">
          <div className="flex items-center gap-2">
            <span className="w-8 h-1 bg-purple-200 rounded-full mx-auto block absolute top-2 left-1/2 -translate-x-1/2" />
            <h3 className="font-extrabold text-base text-[#1E2046] mt-1">
              Filtrar Catálogo Showroom
            </h3>
            {props.activeFiltersCount > 0 && (
              <span className="bg-[#FF6B57] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1">
                {props.activeFiltersCount}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={props.onClose}
            className="w-8 h-8 rounded-full bg-white border border-purple-100 flex items-center justify-center text-purple-700 hover:text-black mt-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Filter Body */}
        <div className="overflow-y-auto p-4 flex-1">
          <FilterSidebar {...props} className="shadow-none border-0 p-0 rounded-none bg-transparent" />
        </div>

        {/* Sticky Apply Button */}
        <div className="p-4 border-t border-purple-100 bg-white/95 backdrop-blur-sm shrink-0 flex items-center gap-2">
          {props.activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={props.onResetFilters}
              className="py-3 px-4 rounded-2xl bg-purple-50 text-purple-800 font-bold text-xs hover:bg-purple-100"
            >
              Borrar
            </button>
          )}
          <button
            type="button"
            onClick={props.onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF6B57] to-[#FF8A1E] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Ver {props.filteredCount} modelos</span>
          </button>
        </div>
      </div>
    </div>
  );
};
