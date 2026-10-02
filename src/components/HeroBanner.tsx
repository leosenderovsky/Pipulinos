import React from 'react';
import { BRAND_CONFIG } from '../brand.config';
import { CreditCard, Truck, RefreshCw, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onScrollToCatalog?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onScrollToCatalog }) => {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-2">
      {/* Compact Showroom Banner Container */}
      <div className="relative w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-sm border-2 border-purple-100 bg-white">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center bg-gradient-to-r from-[#FFFDF6] via-[#FAF4FF] to-[#F1F6FF] relative">
          {/* Left Content Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-center gap-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B57] text-white font-extrabold text-xs shadow-xs tracking-wide">
                <span>✨</span> {BRAND_CONFIG.hero.badge}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E3F9ED] border border-emerald-300 text-emerald-800 font-extrabold text-xs">
                <span>🚚</span> ENVÍO GRATIS &gt; ${BRAND_CONFIG.commerce.freeShippingThreshold.toLocaleString('es-AR')}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E2046] tracking-tight leading-[1.15]">
              {BRAND_CONFIG.hero.title}
            </h2>

            <div className="space-y-1.5 text-xs sm:text-sm font-medium">
              <p className="font-extrabold text-[#8B5CF6] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#8B5CF6]" />
                {BRAND_CONFIG.hero.promoCreditCard}
              </p>
              <p className="font-bold text-emerald-700 bg-emerald-100/60 inline-block px-2.5 py-1 rounded-xl border border-emerald-200">
                {BRAND_CONFIG.hero.promoTransfer}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onScrollToCatalog}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B57] to-[#FF8A1E] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Ver Colección Showroom</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-purple-900/70">
                o explorá el catálogo con los filtros abajo 👇
              </span>
            </div>
          </div>

          {/* Right Image Column (Lifestyle Photo) */}
          <div className="lg:col-span-5 relative h-56 sm:h-64 md:h-72 lg:h-full w-full overflow-hidden">
            <img
              src={BRAND_CONFIG.hero.bannerImageUrl}
              alt={BRAND_CONFIG.hero.bannerImageAlt}
              width={512}
              height={286}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="hidden lg:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FFFDF6] to-transparent pointer-events-none" />
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-100 shadow-sm text-xs font-extrabold text-purple-900 flex items-center gap-1.5">
              <span>⭐</span> {BRAND_CONFIG.hero.trustPill}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Bottom Value Badges Strip */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-3 flex items-center gap-3 shadow-xs hover:border-[#FFD026] transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#FFF4D0] text-amber-800 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="font-extrabold text-xs text-[#1E2046]">3 y 6 Cuotas Sin Interés</p>
            <p className="text-[11px] font-medium text-purple-400">Con todas las tarjetas vía Mercado Pago</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-3 flex items-center gap-3 shadow-xs hover:border-[#26A4F8] transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#E2F3FF] text-sky-800 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-extrabold text-xs text-[#1E2046]">
              Envío Gratis &gt; ${BRAND_CONFIG.commerce.freeShippingThreshold.toLocaleString('es-AR')}
            </p>
            <p className="text-[11px] font-medium text-purple-400">Llegamos a todo el país seguro y rápido</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-3 flex items-center gap-3 shadow-xs hover:border-[#2DD382] transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#E3F9ED] text-emerald-800 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="font-extrabold text-xs text-[#1E2046]">
              {BRAND_CONFIG.commerce.exchangePeriodDays} Días para Cambios
            </p>
            <p className="text-[11px] font-medium text-purple-400">Cambio ágil y sin complicaciones</p>
          </div>
        </div>
      </div>
    </section>
  );
};
