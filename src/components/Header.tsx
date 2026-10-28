import React from 'react';
import { Txt } from './Txt';
import { BRAND_CONFIG, formatText } from '../brand.config';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, User, ArrowRight, X } from 'lucide-react';
import { QUICK_FILTERS } from '../data/filterOptions';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, extra?: any) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedAgeGroup: string;
  onSelectAgeGroup: (group: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onSubmitSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedAgeGroup,
  onSelectAgeGroup,
  selectedTag,
  onSelectTag,
  onSubmitSearch,
}) => {
  const { totalCount } = useCart();

  const handleQuickFilterClick = (filter: (typeof QUICK_FILTERS)[number]) => {
    if (filter.axis === 'stage') {
      const nextValue = selectedAgeGroup === filter.value ? 'all' : filter.value;
      onSelectAgeGroup(nextValue);
    } else {
      const nextValue = selectedTag === filter.value ? null : filter.value;
      onSelectTag(nextValue);
    }

    if (currentView !== 'catalog') onNavigate('catalog');
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-xl shadow-[0_6px_25px_-5px_color-mix(in_srgb,var(--brand-text-muted)_10%,transparent)] border-b border-purple-100/70 sticky top-0 z-50 transition-all">
      {BRAND_CONFIG.announcement.enabled && (
        <div className="bg-gradient-to-r from-brand-secondary via-brand-primary-hover to-brand-primary text-white px-4 py-2 text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs">
          <span className="animate-bounce inline-block text-base">✨</span>
          <span className="font-extrabold tracking-wide drop-shadow-xs">{BRAND_CONFIG.announcement.text}</span>
          <span className="animate-bounce inline-block text-base">✨</span>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary-soft text-amber-900 border border-amber-200/80 font-bold text-xs hover:bg-amber-100 transition-colors"
          >
            <span className="text-sm">🎈</span> {BRAND_CONFIG.contact.showroomId}
          </button>
          <Txt as="span" className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-text-muted bg-brand-surface-purple px-2.5 py-1 rounded-full border border-purple-200" value={BRAND_CONFIG.ui.header.season} />
        </div>

        <div className="flex-1 lg:flex-initial flex justify-center">
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="flex flex-col items-center group transition-transform duration-300 hover:scale-105 cursor-pointer text-left"
          >
            <img
              src={BRAND_CONFIG.logo.url}
              alt={BRAND_CONFIG.logo.alt}
              width={400}
              height={242}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-20 sm:h-[5.5rem] w-auto max-w-[min(48vw,11rem)] object-contain drop-shadow-sm transition-all duration-300"
            />
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(formatText(BRAND_CONFIG.ui.header.whatsappMessage, { name: BRAND_CONFIG.name }))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-brand-whatsapp/15 hover:bg-brand-whatsapp/25 border border-brand-whatsapp/35 text-emerald-800 px-3.5 py-2 rounded-full transition-all font-bold text-xs shadow-xs hover:scale-105"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-whatsapp opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-whatsapp"></span>
            </span>
            <Txt as="span" className="hidden md:inline" value={BRAND_CONFIG.ui.header.whatsappLong} />
            <Txt as="span" className="md:hidden" value={BRAND_CONFIG.ui.header.whatsappShort} />
          </a>

          <button
            type="button"
            onClick={() => onNavigate('size-guide')}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-purple-900 hover:text-brand-primary hover:bg-purple-50 transition-colors font-bold text-xs"
          >
            <User className="w-4 h-4 text-brand-text-muted" />
            <Txt as="span" value={BRAND_CONFIG.ui.header.sizeGuide} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('cart')}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-brand-secondary-soft to-amber-100 text-brand-text hover:scale-110 border border-amber-200 transition-all shadow-xs cursor-pointer"
            aria-label={BRAND_CONFIG.ui.header.cartLabel}
          >
            <ShoppingBag className="w-6 h-6 text-amber-700" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white font-extrabold text-[11px] px-2 py-0.5 rounded-full min-w-[1.3rem] text-center leading-tight shadow-md animate-pulse">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-purple-100/80 bg-white/70 py-2.5 px-4 md:px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full md:max-w-md lg:max-w-lg">
            <div className="relative w-full flex items-center bg-white border-2 border-purple-100 focus-within:border-brand-accent-blue rounded-full px-4 py-1.5 transition-all shadow-xs group">
              <Search className="w-4 h-4 text-brand-primary mr-2 shrink-0 group-focus-within:scale-110 transition-transform" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  onSearchChange(event.target.value);
                  if (currentView !== 'catalog') onNavigate('catalog');
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    onSubmitSearch();
                  }
                }}
                placeholder={BRAND_CONFIG.ui.header.searchPlaceholder}
                className="w-full bg-transparent border-none outline-none font-medium text-xs sm:text-sm text-brand-text placeholder:text-purple-300 focus:ring-0 p-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    if (currentView !== 'catalog') onNavigate('catalog');
                  }}
                  className="flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 p-1 shrink-0 ml-1"
                  aria-label={BRAND_CONFIG.ui.header.clearSearch}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onSubmitSearch}
                className="bg-brand-accent-blue hover:bg-sky-500 text-white rounded-full p-1 transition-colors flex items-center justify-center shrink-0 ml-1"
                title={BRAND_CONFIG.ui.header.searchTitle}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {QUICK_FILTERS.map((filter) => {
              const isActive = filter.axis === 'stage' ? selectedAgeGroup === filter.value : selectedTag === filter.value;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleQuickFilterClick(filter)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs flex items-center gap-1 ${
                    isActive ? filter.activeClass : filter.idleClass
                  }`}
                >
                  <span>{filter.emoji}</span> {filter.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
