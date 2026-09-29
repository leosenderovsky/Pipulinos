import React from 'react';
import { BRAND_CONFIG } from '../brand.config';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, User, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, extra?: any) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedAgeGroup: string;
  onSelectAgeGroup: (group: string) => void;
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
}) => {
  const { totalCount } = useCart();

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    if (currentView !== 'catalog') {
      onNavigate('catalog');
    }
  };

  const handleAgeGroupClick = (group: string) => {
    onSelectAgeGroup(group);
    if (currentView !== 'catalog') {
      onNavigate('catalog');
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-xl shadow-[0_6px_25px_-5px_rgba(139,92,246,0.1)] border-b border-purple-100/70 sticky top-0 z-50 transition-all">
      {/* 1. Top Announcement Bar */}
      {BRAND_CONFIG.announcement.enabled && (
        <div className="bg-gradient-to-r from-[#FFD026] via-[#FF8A1E] to-[#FF6B57] text-white px-4 py-2 text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs">
          <span className="animate-bounce inline-block text-base">✨</span>
          <span className="font-extrabold tracking-wide drop-shadow-xs">
            {BRAND_CONFIG.announcement.text}
          </span>
          <span className="animate-bounce inline-block text-base">✨</span>
        </div>
      )}

      {/* 2. Brand Level with Heroic Logo and Fast Actions */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        {/* Left auxiliary pill to balance the layout */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4D0] text-amber-900 border border-amber-200/80 font-bold text-xs hover:bg-amber-100 transition-colors"
          >
            <span className="text-sm">🎈</span> {BRAND_CONFIG.contact.showroomId}
          </button>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B5CF6] bg-[#F1EAFE] px-2.5 py-1 rounded-full border border-purple-200">
            ⭐ Nueva Temporada
          </span>
        </div>

        {/* Central Heroic Logo (vertical format given room to breathe) */}
        <div className="flex-1 lg:flex-initial flex justify-center">
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="flex flex-col items-center group transition-transform duration-300 hover:scale-105 cursor-pointer text-left"
          >
            <img
              src={BRAND_CONFIG.logo.url}
              alt={BRAND_CONFIG.logo.alt}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-sm transition-all duration-300"
            />
          </button>
        </div>

        {/* Right Fast Actions: WhatsApp, Guía, Shopping Bag */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent('¡Hola ' + BRAND_CONFIG.name + '! Quisiera hacer una consulta personalizada sobre el catálogo y talles.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-emerald-800 px-3.5 py-2 rounded-full transition-all font-bold text-xs shadow-xs hover:scale-105"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
            </span>
            <span className="hidden md:inline">WhatsApp Pedidos</span>
            <span className="md:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => onNavigate('size-guide')}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-purple-900 hover:text-[#FF6B57] hover:bg-purple-50 transition-colors font-bold text-xs"
          >
            <User className="w-4 h-4 text-[#8B5CF6]" />
            <span>Guía de Talles</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('cart')}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-[#FFF4D0] to-amber-100 text-[#1E2046] hover:scale-110 border border-amber-200 transition-all shadow-xs cursor-pointer"
            aria-label="Ver carrito de compras"
          >
            <ShoppingBag className="w-6 h-6 text-amber-700" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B57] text-white font-extrabold text-[11px] px-2 py-0.5 rounded-full min-w-[1.3rem] text-center leading-tight shadow-md animate-pulse">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Search and Quick Filter Navigation Tier */}
      <div className="border-t border-purple-100/80 bg-white/70 py-2.5 px-4 md:px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Wide Search Bar */}
          <div className="w-full md:max-w-md lg:max-w-lg">
            <div className="relative w-full flex items-center bg-white border-2 border-purple-100 focus-within:border-[#26A4F8] rounded-full px-4 py-1.5 transition-all shadow-xs group">
              <Search className="w-4 h-4 text-[#FF6B57] mr-2 shrink-0 group-focus-within:scale-110 transition-transform" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentView !== 'catalog') onNavigate('catalog');
                }}
                placeholder="Buscar enteritos, bodys, remeras, vestidos..."
                className="w-full bg-transparent border-none outline-none font-medium text-xs sm:text-sm text-[#1E2046] placeholder:text-purple-300 focus:ring-0 p-0"
              />
              <button
                type="button"
                onClick={() => {
                  if (currentView !== 'catalog') onNavigate('catalog');
                }}
                className="bg-[#26A4F8] hover:bg-sky-500 text-white rounded-full p-1 transition-colors flex items-center justify-center shrink-0 ml-1"
                title="Buscar"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category Navigation Bar with stage quick links */}
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => handleAgeGroupClick('recien-nacidos')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs flex items-center gap-1 ${
                selectedAgeGroup === 'recien-nacidos'
                  ? 'bg-[#FF6B57] text-white border-[#FF6B57]'
                  : 'bg-[#FFE9E5] border-[#FF6B57]/30 text-[#FF6B57] hover:bg-[#FF6B57] hover:text-white'
              }`}
            >
              <span>🍼</span> Recién Nacidos 0–12m
            </button>
            <button
              type="button"
              onClick={() => handleAgeGroupClick('bebes')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs flex items-center gap-1 ${
                selectedAgeGroup === 'bebes'
                  ? 'bg-[#FFD026] text-[#1E2046] border-[#FFD026]'
                  : 'bg-[#FFF4D0] border-amber-200 text-amber-800 hover:bg-[#FFD026] hover:text-[#1E2046]'
              }`}
            >
              <span>🧸</span> Bebés 1–3 años
            </button>
            <button
              type="button"
              onClick={() => handleAgeGroupClick('ninos')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs flex items-center gap-1 ${
                selectedAgeGroup === 'ninos'
                  ? 'bg-[#26A4F8] text-white border-[#26A4F8]'
                  : 'bg-[#E2F3FF] border-sky-200 text-sky-800 hover:bg-[#26A4F8] hover:text-white'
              }`}
            >
              <span>🎨</span> Niños 4–10 años
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('Pijamas & Abrigo')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs flex items-center gap-1 ${
                selectedCategory === 'Pijamas & Abrigo'
                  ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                  : 'bg-[#F1EAFE] border-purple-200 text-purple-800 hover:bg-[#8B5CF6] hover:text-white'
              }`}
            >
              <span>🌙</span> Pijamas Suavecitos
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('Accesorios & Packs')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs flex items-center gap-1 ${
                selectedCategory === 'Accesorios & Packs'
                  ? 'bg-[#2DD382] text-white border-[#2DD382]'
                  : 'bg-[#E3F9ED] border-emerald-200 text-emerald-800 hover:bg-[#2DD382] hover:text-white'
              }`}
            >
              <span>🎁</span> Super Ofertas Packs
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
