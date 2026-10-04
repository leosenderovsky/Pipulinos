import React, { useState } from 'react';
import { Product } from '../data/products';
import { BRAND_CONFIG } from '../brand.config';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductPicture } from './ProductPicture';

interface ProductCardProps {
  product: Product;
  onOpenProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenProduct }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickAddFeedback, setShowQuickAddFeedback] = useState(false);

  const installmentAmount = Math.round(
    product.precio / BRAND_CONFIG.commerce.installmentsWithoutInterest
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.tallesDisponibles[0] || 'Único';
    const defaultColor = product.coloresDisponibles[0] || {
      name: 'Estándar',
      hex: BRAND_CONFIG.theme.primary,
    };
    addToCart(product, defaultSize, defaultColor, 1);

    setShowQuickAddFeedback(true);
    setTimeout(() => {
      setShowQuickAddFeedback(false);
    }, 1500);
  };

  const getBadgeStyle = () => {
    switch (product.badgeType) {
      case 'pima':
        return 'bg-brand-primary text-white';
      case 'termico':
        return 'bg-brand-secondary text-brand-text';
      case 'oferta':
        return 'bg-brand-success text-white';
      case 'nuevo':
        return 'bg-brand-text-muted text-white';
      default:
        return 'bg-brand-accent-blue text-white';
    }
  };

  return (
    <article
      onClick={() => onOpenProduct(product)}
      className="group bg-white rounded-3xl shadow-sm hover:shadow-[0_15px_30px_-5px_color-mix(in_srgb,var(--brand-primary)_18%,transparent)] border-2 border-purple-100/70 hover:border-brand-primary/50 transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer"
    >
      {/* Media Box */}
      <div className="relative w-full aspect-[4/5] bg-purple-50/40 overflow-hidden">
        <ProductPicture
          src={product.imagenes[0]}
          alt={product.nombre}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          className="w-full h-full object-cover object-center"
          pictureClassName="block w-full h-full"
        />

        {/* Floating badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start pointer-events-none">
          <span
            className={`px-3 py-1 rounded-full font-extrabold text-[11px] shadow-xs flex items-center gap-1 ${getBadgeStyle()}`}
          >
            <span>✨</span> {product.tela}
          </span>
          {product.etiqueta && (
            <span className="px-2.5 py-0.5 rounded-full bg-brand-secondary text-brand-text font-extrabold text-[10px] shadow-xs">
              {product.etiqueta}
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer ${
            isFavorite ? 'text-brand-primary' : 'text-purple-300 hover:text-brand-primary'
          }`}
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-brand-primary' : ''}`} />
        </button>

        {/* Size range badge */}
        <span className="absolute bottom-3 left-3 text-[11px] font-extrabold px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-brand-text border border-purple-100 shadow-xs flex items-center gap-1 pointer-events-none">
          <span>👶</span> {product.tallesDisponibles[0]} a{' '}
          {product.tallesDisponibles[product.tallesDisponibles.length - 1]}
        </span>
      </div>

      {/* Info & Purchase Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-gradient-to-b from-white to-purple-50/20">
        <div>
          {/* Swatches preview */}
          <div className="flex items-center gap-1.5 mb-2">
            {product.coloresDisponibles.slice(0, 3).map((col, idx) => (
              <span
                key={idx}
                style={{ backgroundColor: col.hex }}
                className="w-3.5 h-3.5 rounded-full ring-1 ring-white shadow-xs inline-block"
                title={col.name}
              />
            ))}
            {product.coloresDisponibles.length > 3 && (
              <span className="text-[10px] font-extrabold text-purple-400 ml-1">
                +{product.coloresDisponibles.length - 3} tonos
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm text-brand-text line-clamp-2 group-hover:text-brand-primary transition-colors leading-snug">
            {product.nombre}
          </h3>
        </div>

        <div className="pt-1 border-t border-purple-50">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="font-extrabold text-lg text-brand-primary">
              ${product.precio.toLocaleString('es-AR')}
            </span>
            {product.precioAnterior && (
              <span className="text-xs text-purple-400 line-through font-bold">
                ${product.precioAnterior.toLocaleString('es-AR')}
              </span>
            )}
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
              Mercado Pago
            </span>
          </div>

          <p className="text-[11px] font-semibold text-purple-600">
            3 cuotas de{' '}
            <strong className="text-brand-text font-bold">
              ${installmentAmount.toLocaleString('es-AR')}
            </strong>{' '}
            sin interés
          </p>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onOpenProduct(product)}
              className="col-span-3 py-2 px-2 rounded-2xl bg-purple-50 hover:bg-brand-secondary hover:text-brand-text text-purple-900 text-center font-bold text-xs transition-all border border-purple-100 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Elegir talle</span>
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`col-span-1 py-2 flex items-center justify-center rounded-2xl text-white transition-all shadow-sm hover:scale-105 cursor-pointer ${
                showQuickAddFeedback ? 'bg-emerald-500' : 'bg-brand-primary hover:bg-brand-primary-hover'
              }`}
              title="Agregar al carrito"
            >
              {showQuickAddFeedback ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
