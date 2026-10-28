import React, { useState } from 'react';
import { Txt } from './Txt';
import { BRAND_CONFIG, formatText } from '../brand.config';
import { BABY_SIZE_GUIDE, KIDS_SIZE_GUIDE, SIZE_GUIDE_TIPS } from '../data/sizeGuide';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'baby' | 'kids'>('baby');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border-2 border-purple-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-brand-secondary-soft text-amber-900 flex items-center justify-center shadow-xs">
            <Ruler className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <Txt as="h3" className="font-extrabold text-xl text-brand-text" value={BRAND_CONFIG.ui.sizeGuide.title} />
            <Txt as="p" className="text-xs text-purple-900/70 font-medium" value={BRAND_CONFIG.ui.sizeGuide.subtitle} />
          </div>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-purple-50 rounded-2xl mb-5 w-fit border border-purple-100">
          <Txt as="button"
            type="button"
            onClick={() => setActiveTab('baby')}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'baby'
                ? 'bg-white text-brand-text shadow-xs'
                : 'text-purple-700 hover:text-brand-text'
            }`} value={BRAND_CONFIG.ui.sizeGuide.babyStage} />
          <Txt as="button"
            type="button"
            onClick={() => setActiveTab('kids')}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'kids'
                ? 'bg-white text-brand-text shadow-xs'
                : 'text-purple-700 hover:text-brand-text'
            }`} value={BRAND_CONFIG.ui.sizeGuide.kidsStage} />
        </div>

        {/* Tables */}
        {activeTab === 'baby' ? (
          <div className="overflow-x-auto rounded-2xl border border-purple-100 mb-5">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50 text-purple-900 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colSize} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colAge} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colHeight} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colWeight} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colLength} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colArmhole} />
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 text-purple-900">
                {BABY_SIZE_GUIDE.map((row) => (
                  <tr key={row.talle} className="hover:bg-purple-50/40">
                    <td className="p-3 font-extrabold text-brand-primary">{row.talle}</td>
                    <td className="p-3">{row.edadSugerida}</td>
                    <td className="p-3">{row.alturaCm}</td>
                    <td className="p-3">{row.pesoKg}</td>
                    <td className="p-3 font-bold">{formatText(BRAND_CONFIG.ui.sizeGuide.cm, { value: String(row.largoTotalCm) })}</td>
                    <td className="p-3">{formatText(BRAND_CONFIG.ui.sizeGuide.cm, { value: String(row.anchoSisaCm) })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-purple-100 mb-5">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50 text-purple-900 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colSize} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colAge} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colHeight} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colWeight} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colChest} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colWaist} />
                  <Txt as="th" className="p-3" value={BRAND_CONFIG.ui.sizeGuide.colLength} />
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 text-purple-900">
                {KIDS_SIZE_GUIDE.map((row) => (
                  <tr key={row.talle} className="hover:bg-purple-50/40">
                    <td className="p-3 font-extrabold text-brand-accent-blue">{row.talle}</td>
                    <td className="p-3">{row.edadSugerida}</td>
                    <td className="p-3">{row.alturaCm}</td>
                    <td className="p-3">{row.pesoKg}</td>
                    <td className="p-3">{formatText(BRAND_CONFIG.ui.sizeGuide.cm, { value: String(row.pechoCm) })}</td>
                    <td className="p-3">{formatText(BRAND_CONFIG.ui.sizeGuide.cm, { value: String(row.cinturaCm) })}</td>
                    <td className="p-3 font-bold">{formatText(BRAND_CONFIG.ui.sizeGuide.cm, { value: String(row.largoTotalCm) })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tips Box */}
        <div className="bg-brand-surface-warm border border-amber-200 p-4 rounded-2xl mb-5 space-y-2">
          <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-secondary" />
            <span>{SIZE_GUIDE_TIPS.mainTip}</span>
          </p>
          <p className="text-xs text-purple-900/80 font-medium leading-relaxed">
            {SIZE_GUIDE_TIPS.parentAdvice}
          </p>
        </div>

        <Txt as="button"
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-primary-hover text-white font-extrabold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer" value={BRAND_CONFIG.ui.sizeGuide.close} />
      </div>
    </div>
  );
};
