import React, { useState } from 'react';
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
          <div className="w-10 h-10 rounded-2xl bg-[#FFF4D0] text-amber-900 flex items-center justify-center shadow-xs">
            <Ruler className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-[#1E2046]">Tabla Oficial de Talles &amp; Medidas</h3>
            <p className="text-xs text-purple-900/70 font-medium">
              Medidas corporales y de prenda para elegir con total tranquilidad.
            </p>
          </div>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-purple-50 rounded-2xl mb-5 w-fit border border-purple-100">
          <button
            type="button"
            onClick={() => setActiveTab('baby')}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'baby'
                ? 'bg-white text-[#1E2046] shadow-xs'
                : 'text-purple-700 hover:text-[#1E2046]'
            }`}
          >
            🍼 Etapa Bebé (RN a 24 Meses)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kids')}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'kids'
                ? 'bg-white text-[#1E2046] shadow-xs'
                : 'text-purple-700 hover:text-[#1E2046]'
            }`}
          >
            🎈 Etapa Niños (T2 a T10 Años)
          </button>
        </div>

        {/* Tables */}
        {activeTab === 'baby' ? (
          <div className="overflow-x-auto rounded-2xl border border-purple-100 mb-5">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50 text-purple-900 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Talle</th>
                  <th className="p-3">Edad</th>
                  <th className="p-3">Altura</th>
                  <th className="p-3">Peso</th>
                  <th className="p-3">Largo</th>
                  <th className="p-3">Sisa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 text-purple-900">
                {BABY_SIZE_GUIDE.map((row) => (
                  <tr key={row.talle} className="hover:bg-purple-50/40">
                    <td className="p-3 font-extrabold text-[#FF6B57]">{row.talle}</td>
                    <td className="p-3">{row.edadSugerida}</td>
                    <td className="p-3">{row.alturaCm}</td>
                    <td className="p-3">{row.pesoKg}</td>
                    <td className="p-3 font-bold">{row.largoTotalCm} cm</td>
                    <td className="p-3">{row.anchoSisaCm} cm</td>
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
                  <th className="p-3">Talle</th>
                  <th className="p-3">Edad</th>
                  <th className="p-3">Altura</th>
                  <th className="p-3">Peso</th>
                  <th className="p-3">Pecho</th>
                  <th className="p-3">Cintura</th>
                  <th className="p-3">Largo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 text-purple-900">
                {KIDS_SIZE_GUIDE.map((row) => (
                  <tr key={row.talle} className="hover:bg-purple-50/40">
                    <td className="p-3 font-extrabold text-[#26A4F8]">{row.talle}</td>
                    <td className="p-3">{row.edadSugerida}</td>
                    <td className="p-3">{row.alturaCm}</td>
                    <td className="p-3">{row.pesoKg}</td>
                    <td className="p-3">{row.pechoCm} cm</td>
                    <td className="p-3">{row.cinturaCm} cm</td>
                    <td className="p-3 font-bold">{row.largoTotalCm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tips Box */}
        <div className="bg-[#FFFDF6] border border-amber-200 p-4 rounded-2xl mb-5 space-y-2">
          <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FFD026]" />
            <span>{SIZE_GUIDE_TIPS.mainTip}</span>
          </p>
          <p className="text-xs text-purple-900/80 font-medium leading-relaxed">
            {SIZE_GUIDE_TIPS.parentAdvice}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF6B57] to-[#FF8A1E] text-white font-extrabold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer"
        >
          Entendido, volver a las prendas
        </button>
      </div>
    </div>
  );
};
