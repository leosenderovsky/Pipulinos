import React from 'react';
import { Txt } from './Txt';
import { BRAND_CONFIG, formatText } from '../brand.config';
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
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={242}
                  className="h-auto w-[min(100%,180px)] max-w-full object-contain drop-shadow-xs hover:scale-105 transition-transform"
                />
              </button>
            </div>
            <p className="text-xs font-semibold text-purple-900/80 leading-relaxed">
              {BRAND_CONFIG.copy.footerAbout}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-3 h-3 rounded-full bg-brand-secondary" />
              <span className="w-3 h-3 rounded-full bg-brand-primary" />
              <span className="w-3 h-3 rounded-full bg-brand-accent-blue" />
              <span className="w-3 h-3 rounded-full bg-brand-success" />
              <span className="w-3 h-3 rounded-full bg-brand-text-muted" />
            </div>
          </div>

          {/* Col 2: Ayuda & Compras */}
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-sm text-brand-text mb-1 flex items-center gap-1.5">
              <span>🧸</span>{" "}{BRAND_CONFIG.ui.footer.helpTitle}</span>
            <button
              type="button"
              onClick={onOpenSizeGuideModal}
              className="text-xs font-bold text-purple-800 hover:text-brand-primary transition-colors flex items-center gap-1.5 text-left cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-brand-accent-blue" />
              <Txt as="span" value={BRAND_CONFIG.ui.footer.helpSizeGuide} />
            </button>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(formatText(BRAND_CONFIG.ui.whatsapp.greeting, { name: BRAND_CONFIG.shortName, message: BRAND_CONFIG.copy.whatsappShippingMessage }))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-800 hover:text-brand-primary transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-brand-success" />
              <Txt as="span" value={BRAND_CONFIG.ui.footer.helpShipping} />
            </a>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(formatText(BRAND_CONFIG.ui.whatsapp.greeting, { name: BRAND_CONFIG.shortName, message: BRAND_CONFIG.copy.whatsappFaqMessage }))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-800 hover:text-brand-primary transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <Txt as="span" value={BRAND_CONFIG.ui.footer.helpFaq} />
            </a>
          </div>

          {/* Col 3: Medios de Pago & Envíos */}
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-sm text-brand-text mb-1 flex items-center gap-1.5">
              <span>💳</span>{" "}{BRAND_CONFIG.ui.footer.paymentTitle}</span>
            <Txt as="p" className="text-xs font-bold text-purple-900" value={formatText(BRAND_CONFIG.ui.footer.installmentsLine, { count: String(BRAND_CONFIG.commerce.installmentsWithoutInterest) })} />
            <p className="text-xs font-bold text-emerald-700 bg-emerald-100/60 p-2 rounded-xl border border-emerald-200">
              {BRAND_CONFIG.ui.footer.transferLabel}{' '}
              <strong className="text-emerald-950 font-extrabold">
                {formatText(BRAND_CONFIG.ui.footer.transferValue, { percent: String(BRAND_CONFIG.commerce.transferDiscountPercent) })}
              </strong>
            </p>
            <Txt as="p" className="text-xs font-semibold text-purple-800 mt-1" value={BRAND_CONFIG.ui.footer.shippingNote} />
          </div>

          {/* Col 4: Contacto Showroom */}
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-sm text-brand-text mb-1 flex items-center gap-1.5">
              <span>📍</span>{" "}{BRAND_CONFIG.ui.footer.contactTitle}</span>
            <p className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-brand-whatsapp" />
              <span>{formatText(BRAND_CONFIG.ui.footer.whatsappLine, { phone: BRAND_CONFIG.contact.whatsappNumberFormatted })}</span>
            </p>
            <a
              href={BRAND_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-900 hover:text-pink-600 flex items-center gap-1.5 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>{formatText(BRAND_CONFIG.ui.footer.instagramLine, { handle: BRAND_CONFIG.contact.instagramHandle })}</span>
            </a>
            <p className="text-xs font-semibold text-purple-800">
              {BRAND_CONFIG.contact.showroomHours}
            </p>
          </div>
        </div>

        {/* Bottom bar with MANDATORY DISCLAIMER (Requirement 9) */}
        <div className="pt-5 border-t border-purple-200/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
            <Txt as="p" className="text-xs font-bold text-purple-900/70" value={formatText(BRAND_CONFIG.ui.footer.copyright, { year: String(BRAND_CONFIG.foundedYear), name: BRAND_CONFIG.shortName })} />
            <span className="hidden sm:inline text-purple-300">•</span>
            {/* MANDATORY FOOTER DISCLAIMER */}
            <p className="text-[11px] font-semibold text-purple-900/60 tracking-tight">
              {BRAND_CONFIG.copy.footerDisclaimer}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Txt as="span" className="text-xs font-extrabold text-brand-primary bg-white px-3 py-1 rounded-full border border-purple-100 shadow-xs flex items-center gap-1" value={BRAND_CONFIG.ui.footer.love} />
          </div>
        </div>
      </div>
    </footer>
  );
};
