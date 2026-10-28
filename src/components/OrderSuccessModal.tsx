import React from 'react';
import { Txt } from './Txt';
import { BRAND_CONFIG, formatText } from '../brand.config';
import { CheckCircle2, MessageCircle, ArrowRight, Heart } from 'lucide-react';

interface OrderSuccessModalProps {
  orderId: string;
  paymentMethod: string;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderId,
  paymentMethod,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-emerald-200 relative text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <Txt as="span" className="text-xs font-extrabold text-brand-primary uppercase tracking-wider" value={BRAND_CONFIG.ui.orderSuccess.title} />
          <h2 className="text-2xl font-extrabold text-brand-text mt-1">
            {BRAND_CONFIG.copy.thankYouMessage} {BRAND_CONFIG.shortName}! 🎈
          </h2>
          <p className="text-xs text-purple-900/80 font-medium mt-2 leading-relaxed">
            {BRAND_CONFIG.ui.orderSuccess.registered}{' '}
            <strong className="text-purple-950 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
              #{orderId}
            </strong>{' '}
            {BRAND_CONFIG.ui.orderSuccess.paymentMethod} <strong>{paymentMethod}</strong>.
          </p>
        </div>

        <div className="bg-purple-50/70 p-4 rounded-2xl text-left text-xs font-medium text-purple-900/90 space-y-2 border border-purple-100">
          <p className="flex items-center gap-1.5 font-bold text-brand-text">
            <span>📦</span>{" "}{BRAND_CONFIG.ui.orderSuccess.nextTitle}</p>
          <p>• {BRAND_CONFIG.copy.orderPreparationMessage}</p>
          <Txt as="p" value={BRAND_CONFIG.ui.orderSuccess.nextTracking} />
          <Txt as="p" value={BRAND_CONFIG.ui.orderSuccess.nextExchange} />
        </div>

        <div className="flex flex-col gap-2.5 pt-1">
          <a
            href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(formatText(BRAND_CONFIG.ui.whatsapp.greetingOrder, { name: BRAND_CONFIG.shortName, message: BRAND_CONFIG.copy.whatsappOrderConfirmation, order: String(orderId) }))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <Txt as="span" value={BRAND_CONFIG.ui.orderSuccess.whatsapp} />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-purple-50 hover:bg-brand-secondary-soft text-purple-900 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Txt as="span" value={BRAND_CONFIG.ui.orderSuccess.back} />
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
