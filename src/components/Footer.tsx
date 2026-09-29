import React from 'react';
import { BRAND_CONFIG } from '../brand.config';
import { Ruler, HelpCircle, Truck, MessageCircle, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuideModal: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuideModal, onNavigateHome }) => {
  return (
    <footer className="w-full bg-gradient-to-b from-purple-50/70 to-purple-100/60 border-t-2 border-purple-100 py-10 mt-12 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col gap-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & About */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <button
                type="button"
                onClick={onNavigateHome}
                className="cursor-pointer text-left"
              >
                <img
                  src={BRAND_CONFIG.logo.url}
                  alt={BRAND_CONFIG.logo.alt}
                  className="h-14 md:h-16 w-auto object-contain drop-shadow-xs hover:scale-105 transition-transform"
                />
              </button>
            </div>
            <p className="text-xs font-semibold text-purple-900/80 leading-relaxed">
              {BRAND_CONFIG.copy.footerAbout}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-3 h-3 rounded-full bg-[#FFD026]" />
              <span className="w-3 h-3 rounded-full bg-[#FF6B57]" />
              <span className="w-3 h-3 rounded-full bg-[#26A4F8]" />
              <span className="w-3 h-3 rounded-full bg-[#2DD382]" />
              <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
            </div>
          </div>

          {/* Col 2: Ayuda & Compras */}
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-sm text-[#1E2046] mb-1 flex items-center gap-1.5">
              <span>🧸</span> Ayuda &amp; Compras
            </span>
            <button
              type="button"
              onClick={onOpenSizeGuideModal}
              className="text-xs font-bold text-purple-800 hover:text-[#FF6B57] transition-colors flex items-center gap-1.5 text-left cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-[#26A4F8]" />
              <span>Guía de Talles y Medidas</span>
            </button>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent('Hola Pipulinos, tengo una consulta sobre envíos y cambios')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-800 hover:text-[#FF6B57] transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-[#2DD382]" />
              <span>Envíos y Cambios Fáciles</span>
            </a>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent('Hola Pipulinos, tengo preguntas frecuentes')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-800 hover:text-[#FF6B57] transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Preguntas Frecuentes</span>
            </a>
          </div>

          {/* Col 3: Medios de Pago & Envíos */}
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-sm text-[#1E2046] mb-1 flex items-center gap-1.5">
              <span>💳</span> Medios de Pago &amp; Envíos
            </span>
            <p className="text-xs font-bold text-purple-900">
              Mercado Pago • 3 cuotas fijas sin interés
            </p>
            <p className="text-xs font-bold text-emerald-700 bg-emerald-100/60 p-2 rounded-xl border border-emerald-200">
              Transferencia / Efectivo:{' '}
              <strong className="text-emerald-950 font-extrabold">
                {BRAND_CONFIG.commerce.transferDiscountPercent}% OFF EXTRA
              </strong>
            </p>
            <p className="text-xs font-semibold text-purple-800 mt-1">
              Envíos a todo el país a domicilio o sucursal.
            </p>
          </div>

          {/* Col 4: Contacto Showroom */}
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-sm text-[#1E2046] mb-1 flex items-center gap-1.5">
              <span>📍</span> Contacto Showroom
            </span>
            <p className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: {BRAND_CONFIG.contact.whatsappNumberFormatted}</span>
            </p>
            <a
              href={BRAND_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-900 hover:text-pink-600 flex items-center gap-1.5 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Instagram: {BRAND_CONFIG.contact.instagramHandle}</span>
            </a>
            <p className="text-xs font-semibold text-purple-800">
              {BRAND_CONFIG.contact.showroomHours}
            </p>
          </div>
        </div>

        {/* Bottom bar with MANDATORY DISCLAIMER (Requirement 9) */}
        <div className="pt-5 border-t border-purple-200/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
            <p className="text-xs font-bold text-purple-900/70">
              © {BRAND_CONFIG.foundedYear} {BRAND_CONFIG.shortName} Showroom Infantil. Todos los derechos reservados.
            </p>
            <span className="hidden sm:inline text-purple-300">•</span>
            {/* MANDATORY FOOTER DISCLAIMER */}
            <p className="text-[11px] font-semibold text-purple-900/60 tracking-tight">
              {BRAND_CONFIG.copy.footerDisclaimer}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-[#FF6B57] bg-white px-3 py-1 rounded-full border border-purple-100 shadow-xs flex items-center gap-1">
              Hecho con mucho amor para las infancias 🎈⭐
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
