import React, { useState } from 'react';
import { Txt } from './Txt';
import { Product, ProductColor } from '../catalog';
import { BRAND_CONFIG, formatText } from '../brand.config';
import { useCart } from '../context/CartContext';
import { ProductPicture } from './ProductPicture';
import { BABY_SIZE_GUIDE, KIDS_SIZE_GUIDE } from '../data/sizeGuide';
import {
  Heart,
  ShoppingBag,
  Ruler,
  ChevronRight,
  Home,
  Check,
  ChevronDown,
  Sparkles,
  CreditCard,
  Truck,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  ZoomIn,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  onBackToCatalog: () => void;
  onOpenSizeGuideModal: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBackToCatalog,
  onOpenSizeGuideModal,
}) => {
  const { addToCart } = useCart();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || {
      name: 'Estándar',
      hex: BRAND_CONFIG.theme.primary,
    }
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || 'Único'
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Accordions state
  const [openAccordion, setOpenAccordion] = useState<string | null>('acc-1');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 3500);
  };

  const transferPrice = Math.round(
    product.price * (1 - BRAND_CONFIG.commerce.transferDiscountPercent / 100)
  );
  const installmentAmount = Math.round(
    product.price / BRAND_CONFIG.commerce.installmentsWithoutInterest
  );
  const totalPurchasePrice = product.price * quantity;

  // WhatsApp order link
  const whatsappProductMessage = `¡Hola ${BRAND_CONFIG.name}! Me interesa el "${product.name}" en talle ${selectedSize} y color ${selectedColor.name}. ¿Tienen disponibilidad en showroom?`;
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(whatsappProductMessage)}`;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-6">
      {/* Breadcrumb Header Navigation */}
      <nav aria-label={BRAND_CONFIG.ui.productDetail.breadcrumbLabel} className="flex items-center gap-1.5 text-purple-900/80 text-xs font-bold mb-5 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="hover:text-brand-primary transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <Txt as="span" value={BRAND_CONFIG.ui.productDetail.breadcrumbHome} />
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-purple-300 shrink-0" />
        <button
          type="button"
          onClick={onBackToCatalog}
          className="hover:text-brand-primary transition-colors shrink-0 cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-purple-300 shrink-0" />
        <span className="text-brand-primary bg-brand-surface-pink px-2.5 py-0.5 rounded-full border border-brand-primary/20 font-extrabold truncate">
          {product.name}
        </span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Gallery & Trust signals (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Main Photo Card */}
          <div className="relative w-full bg-white rounded-3xl shadow-sm border-2 border-purple-100 overflow-hidden group">
            {/* Badges overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
              <span className="bg-brand-primary text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {product.material}
              </span>
              <Txt as="span" className="bg-brand-secondary-soft text-amber-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs" value={BRAND_CONFIG.ui.productDetail.badgeHypoallergenic} />
            </div>

            {/* Favorite button */}
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-purple-400 hover:text-brand-primary shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
              title={BRAND_CONFIG.ui.productDetail.favoriteLabel}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-brand-primary text-brand-primary' : ''}`} />
            </button>

            {/* Main Zoomable Photo */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="aspect-[4/5] w-full bg-purple-50/30 overflow-hidden flex items-center justify-center cursor-zoom-in relative"
            >
              <ProductPicture
                key={product.images[selectedPhotoIndex] || product.images[0]}
                src={product.images[selectedPhotoIndex] || product.images[0]}
                alt={product.name}
                decoding="async"
                fetchPriority="high"
                width={800}
                height={1000}
                className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-125' : ''
                }`}
                pictureClassName="block w-full h-full"
              />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-brand-text px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-extrabold border border-purple-100 pointer-events-none shadow-xs">
                <ZoomIn className="w-3.5 h-3.5 text-brand-primary" />
                <span>{isZoomed ? BRAND_CONFIG.ui.productDetail.zoomOut : BRAND_CONFIG.ui.productDetail.zoomIn}</span>
              </div>
            </div>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedPhotoIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-xs border-2 transition-all p-0.5 bg-white cursor-pointer ${
                    selectedPhotoIndex === idx
                      ? 'border-brand-primary ring-2 ring-brand-primary/30 scale-105'
                      : 'border-purple-100 hover:border-purple-300'
                  }`}
                >
                  <ProductPicture
                    key={img}
                    src={img}
                    alt={formatText(BRAND_CONFIG.ui.productDetail.viewAlt, { number: String(idx + 1) })}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover object-center rounded-xl"
                    pictureClassName="block w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Trust badges below photo */}
          <div className="grid grid-cols-3 gap-2 bg-gradient-to-r from-amber-50/80 via-rose-50/60 to-sky-50/80 border border-purple-100 p-3.5 rounded-3xl">
            <div className="flex flex-col items-center text-center p-1 gap-1">
              <span className="w-8 h-8 rounded-xl bg-brand-surface-pink text-brand-primary flex items-center justify-center font-bold text-sm">
                🌿
              </span>
              <Txt as="span" className="font-extrabold text-[11px] text-brand-text" value={BRAND_CONFIG.ui.productDetail.featureCottonTitle} />
              <Txt as="span" className="text-[10px] text-purple-900/70 font-medium" value={BRAND_CONFIG.ui.productDetail.featureCottonText} />
            </div>

            <div className="flex flex-col items-center text-center p-1 gap-1">
              <span className="w-8 h-8 rounded-xl bg-brand-secondary-soft text-amber-900 flex items-center justify-center font-bold text-sm">
                🪡
              </span>
              <Txt as="span" className="font-extrabold text-[11px] text-brand-text" value={BRAND_CONFIG.ui.productDetail.featureSeamsTitle} />
              <Txt as="span" className="text-[10px] text-purple-900/70 font-medium" value={BRAND_CONFIG.ui.productDetail.featureSeamsText} />
            </div>

            <div className="flex flex-col items-center text-center p-1 gap-1">
              <span className="w-8 h-8 rounded-xl bg-brand-surface-blue text-sky-800 flex items-center justify-center font-bold text-sm">
                🔒
              </span>
              <Txt as="span" className="font-extrabold text-[11px] text-brand-text" value={BRAND_CONFIG.ui.productDetail.featureSnapsTitle} />
              <Txt as="span" className="text-[10px] text-purple-900/70 font-medium" value={BRAND_CONFIG.ui.productDetail.featureSnapsText} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Details, Variants, Add to cart & Accordions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border-2 border-purple-100">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="font-extrabold text-xs uppercase tracking-wider text-brand-primary">
                Línea Showroom {BRAND_CONFIG.shortName} • {product.material}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                <span>⭐ ⭐ ⭐ ⭐ ⭐</span>
                <Txt as="span" className="text-purple-900/70 font-semibold" value={BRAND_CONFIG.ui.productDetail.reviews} />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-purple-900/80 font-medium mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-surface-warm via-white to-brand-surface-lilac border-2 border-brand-primary/20 shadow-xs flex flex-col gap-2">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-extrabold text-brand-primary tracking-tight">
                ${product.price.toLocaleString('es-AR')}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-purple-300 line-through font-bold">
                  ${product.compareAtPrice.toLocaleString('es-AR')}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="bg-rose-500 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                  Ahorrás ${((product.compareAtPrice ?? product.price) - product.price).toLocaleString('es-AR')} 💛
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text">
              <span className="text-sm">💵</span>
              <span>
                <strong className="text-emerald-800 font-extrabold">
                  ${transferPrice.toLocaleString('es-AR')}
                </strong>{' '}
                {BRAND_CONFIG.ui.productDetail.transferText} (
                <span className="text-brand-primary font-extrabold bg-brand-surface-pink px-1.5 py-0.5 rounded-md">
                  {formatText(BRAND_CONFIG.ui.productDetail.transferBadge, { percent: String(BRAND_CONFIG.commerce.transferDiscountPercent) })}
                </span>
                )
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-sky-900 bg-brand-surface-blue px-3 py-1.5 rounded-xl border border-sky-200">
              <CreditCard className="w-4 h-4 text-brand-accent-blue" />
              <span>
                {formatText(BRAND_CONFIG.ui.productDetail.installments, { count: String(BRAND_CONFIG.commerce.installmentsWithoutInterest), amount: `$${installmentAmount.toLocaleString('es-AR')}` })}
              </span>
            </div>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs sm:text-sm text-brand-text">{BRAND_CONFIG.ui.productDetail.colorLabel}{" "}<strong className="text-brand-primary">{selectedColor.name}</strong>
              </span>
              <span className="text-xs font-bold text-purple-400">
                {product.colors.length} tonos disponibles
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {product.colors.map((col, idx) => {
                const isSelected = selectedColor.name === col.name;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`relative p-1 rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-brand-primary ring-offset-2 scale-110'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    title={col.name}
                  >
                    <span
                      style={{ backgroundColor: col.hex }}
                      className="block w-7 h-7 rounded-full shadow-xs ring-1 ring-black/10"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector with integrated stock pill */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Txt as="span" className="font-extrabold text-xs sm:text-sm text-brand-text" value={BRAND_CONFIG.ui.productDetail.sizeLabel} />
              <button
                type="button"
                onClick={onOpenSizeGuideModal}
                className="flex items-center gap-1 text-brand-accent-blue hover:underline font-extrabold text-xs cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <Txt as="span" value={BRAND_CONFIG.ui.productDetail.sizeTable} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize === sz;
                const stock = product.stockBySize?.[sz] ?? 8;
                const isLowStock = stock <= 3;
                const sizeHint =
                  BRAND_CONFIG.ui.productDetail.sizeHints.find(({ sizeFragment }) =>
                    sz.includes(sizeFragment),
                  )?.text ?? BRAND_CONFIG.copy.sizeHintFallback;

                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-brand-primary bg-brand-secondary-soft/60 shadow-xs'
                        : 'border-purple-100 bg-purple-50/30 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-extrabold text-sm ${
                          isSelected ? 'text-brand-primary' : 'text-brand-text'
                        }`}
                      >
                        {sz}
                      </span>
                      {isLowStock ? (
                        <span className="text-[10px] font-extrabold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                          {formatText(BRAND_CONFIG.ui.productDetail.lastUnits, { stock: String(stock) })}
                        </span>
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title={BRAND_CONFIG.ui.productDetail.inStock} />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-purple-900/60 mt-1">
                      {sz.includes('RN')
                        ? 'Hasta 3.5 kg'
                        : sz.includes('0-3')
                        ? 'Hasta 5.5 kg'
                        : sz.includes('3-6')
                        ? 'Hasta 7.5 kg'
                        : sz.includes('6-9')
                        ? 'Hasta 9.0 kg'
                        : sz.includes('9-12')
                        ? 'Hasta 10.5 kg'
                        : sz.includes('12-18')
                        ? 'Hasta 12.0 kg'
                        : 'Disponible'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Helpful tip */}
            <div className="flex items-center gap-1.5 bg-amber-50 p-2.5 rounded-2xl border border-amber-200/70 text-[11px] text-amber-950 font-semibold mt-1">
              <span className="text-sm">💡</span>
              <span>
                <strong>{formatText(BRAND_CONFIG.ui.productDetail.tipTitle, { name: BRAND_CONFIG.shortName })}</strong>{" "}{BRAND_CONFIG.ui.productDetail.tipText}</span>
            </div>
          </div>

          {/* Quantity + Add to Cart + WhatsApp Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center bg-purple-50 rounded-2xl p-1 border border-purple-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-lg text-purple-900 hover:bg-purple-100 transition-colors cursor-pointer"
                  title={BRAND_CONFIG.ui.productDetail.decreaseLabel}
                >
                  -
                </button>
                <span className="w-10 text-center font-extrabold text-sm text-brand-text">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-lg text-purple-900 hover:bg-purple-100 transition-colors cursor-pointer"
                  title={BRAND_CONFIG.ui.productDetail.increaseLabel}
                >
                  +
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-primary-hover text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{formatText(BRAND_CONFIG.ui.productDetail.addToOrder, { price: `$${totalPurchasePrice.toLocaleString('es-AR')}` })}</span>
              </button>
            </div>

            {/* Quick WhatsApp Inquiry */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-extrabold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <Txt as="span" value={BRAND_CONFIG.ui.productDetail.askAvailability} />
            </a>
          </div>

          {/* Product Accordions */}
          <div className="flex flex-col gap-2 pt-2 border-t border-purple-50">
            {/* Accordion 1: Composición y Cuidados */}
            <div className="rounded-2xl bg-purple-50/50 border border-purple-100/70 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('acc-1')}
                className="w-full p-3.5 flex items-center justify-between text-left font-extrabold text-xs sm:text-sm text-brand-text hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">🧺</span>
                  <Txt as="span" value={BRAND_CONFIG.ui.productDetail.careTitle} />
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
                    openAccordion === 'acc-1' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openAccordion === 'acc-1' && (
                <div className="p-3.5 pt-0 text-xs font-medium text-purple-900/80 space-y-1.5 leading-relaxed">
                  <p>• {product.material} puro certificado peinado de máxima suavidad al tacto.</p>
                  <p>• Lavado recomendado con agua fría (máx 30°C) con programa delicado o a mano.</p>
                  <p>• Usar jabón blanco neutro especial para recién nacidos y pieles atópicas.</p>
                  <p>• No usar secarropas con calor directo; secar a la sombra.</p>
                  <p>• Planchar del revés a temperatura suave.</p>
                </div>
              )}
            </div>

            {/* Accordion 2: Envíos & Retiro */}
            <div className="rounded-2xl bg-purple-50/50 border border-purple-100/70 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('acc-2')}
                className="w-full p-3.5 flex items-center justify-between text-left font-extrabold text-xs sm:text-sm text-brand-text hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-accent-blue" />
                  <Txt as="span" value={BRAND_CONFIG.ui.productDetail.shippingTitle} />
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
                    openAccordion === 'acc-2' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openAccordion === 'acc-2' && (
                <div className="p-3.5 pt-0 text-xs font-medium text-purple-900/80 space-y-1.5 leading-relaxed">
                  <p>
                    • <strong>{BRAND_CONFIG.ui.productDetail.shippingFreeLabel}</strong> {formatText(BRAND_CONFIG.ui.productDetail.shippingFreeText, { amount: `$${BRAND_CONFIG.commerce.freeShippingThreshold.toLocaleString('es-AR')}` })}
                  </p>
                  <Txt as="p" value={BRAND_CONFIG.ui.productDetail.shippingExpress} />
                  <p>
                    • <strong>{BRAND_CONFIG.ui.productDetail.pickupLabel}</strong> {formatText(BRAND_CONFIG.ui.productDetail.pickupText, { address: BRAND_CONFIG.contact.showroomAddress, hours: BRAND_CONFIG.contact.showroomHours })}
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3: Cambios */}
            <div className="rounded-2xl bg-purple-50/50 border border-purple-100/70 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('acc-3')}
                className="w-full p-3.5 flex items-center justify-between text-left font-extrabold text-xs sm:text-sm text-brand-text hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-brand-success" />
                  <span>Cambios sin costo dentro de los 30 días</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
                    openAccordion === 'acc-3' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openAccordion === 'acc-3' && (
                <div className="p-3.5 pt-0 text-xs font-medium text-purple-900/80 space-y-1.5 leading-relaxed">
                  <Txt as="p" value={BRAND_CONFIG.ui.productDetail.exchangeIntro} />
                  <p>{BRAND_CONFIG.ui.productDetail.exchangeStart} <strong>{formatText(BRAND_CONFIG.ui.productDetail.exchangeStrong, { days: String(BRAND_CONFIG.commerce.exchangePeriodDays) })}</strong> {BRAND_CONFIG.ui.productDetail.exchangeEnd}</p>
                  <Txt as="p" value={BRAND_CONFIG.ui.productDetail.exchangeFirst} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FULL RESPONSIVE SIZE GUIDE TABLE AT BOTTOM OF PDP (requirement 3 & 5) */}
      <section className="mt-12 bg-white p-6 md:p-8 rounded-3xl shadow-sm border-2 border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-secondary-soft text-amber-900 flex items-center justify-center font-bold">
              <Ruler className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <Txt as="h2" className="font-extrabold text-lg md:text-xl text-brand-text" value={BRAND_CONFIG.ui.productDetail.guideTitle} />
              <Txt as="p" className="text-xs font-medium text-purple-900/70" value={BRAND_CONFIG.ui.productDetail.guideSubtitle} />
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-brand-secondary-soft text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Txt as="span" value={BRAND_CONFIG.ui.productDetail.guideTip} />
            <Txt as="span" value={BRAND_CONFIG.ui.productDetail.guideTipText} />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="w-full overflow-x-auto mt-4 rounded-2xl border border-purple-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/80 text-purple-900 font-extrabold uppercase tracking-wider text-[11px]">
              <tr>
                <Txt as="th" className="py-3 px-4" value={BRAND_CONFIG.ui.productDetail.colSize} />
                <Txt as="th" className="py-3 px-4" value={BRAND_CONFIG.ui.productDetail.colAge} />
                <Txt as="th" className="py-3 px-4" value={BRAND_CONFIG.ui.productDetail.colHeight} />
                <Txt as="th" className="py-3 px-4" value={BRAND_CONFIG.ui.productDetail.colWeight} />
                <Txt as="th" className="py-3 px-4" value={BRAND_CONFIG.ui.productDetail.colLength} />
                <Txt as="th" className="py-3 px-4" value={BRAND_CONFIG.ui.productDetail.colArmhole} />
                <Txt as="th" className="py-3 px-4" value={BRAND_CONFIG.ui.productDetail.colMoment} />
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 text-purple-900 font-medium">
              {BABY_SIZE_GUIDE.map((row) => (
                <tr
                  key={row.size}
                  className={`hover:bg-purple-50/50 transition-colors ${
                    selectedSize === row.size ? 'bg-brand-secondary-soft/40 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-extrabold text-brand-primary">{row.size}</td>
                  <td className="py-3 px-4">{row.suggestedAge}</td>
                  <td className="py-3 px-4">{row.heightCm}</td>
                  <td className="py-3 px-4">{row.weightKg}</td>
                  <td className="py-3 px-4 font-bold">{row.totalLengthCm} cm</td>
                  <td className="py-3 px-4">{row.armholeWidthCm} cm</td>
                  <td className="py-3 px-4 text-purple-400 text-[11px]">                  {row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50/60 p-4 rounded-2xl mt-4 items-center border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-xl shrink-0">
              👶
            </div>
            <div>
              <Txt as="p" className="font-extrabold text-xs text-brand-text" value={BRAND_CONFIG.ui.productDetail.measureTitle} />
              <Txt as="p" className="text-[11px] text-purple-900/70 font-medium mt-0.5" value={BRAND_CONFIG.ui.productDetail.measureText} />
            </div>
          </div>

          <div className="flex items-center md:justify-end gap-2">
            <Txt as="span" className="text-xs font-bold text-purple-900/70" value={BRAND_CONFIG.ui.productDetail.helpTitle} />
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(formatText(BRAND_CONFIG.ui.whatsapp.greeting, { name: BRAND_CONFIG.shortName, message: BRAND_CONFIG.copy.whatsappSizeMessage }))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white border border-purple-200 text-brand-primary font-extrabold text-xs hover:bg-brand-surface-pink transition-colors flex items-center gap-1 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-brand-whatsapp" />
              <Txt as="span" value={BRAND_CONFIG.ui.productDetail.helpButton} />
            </a>
          </div>
        </div>
      </section>

      {/* Floating Add To Cart Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-text text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm animate-bounce">
          <span className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4" />
          </span>
          <div className="flex flex-col">
            <Txt as="span" className="font-extrabold text-xs" value={BRAND_CONFIG.ui.productDetail.addedToast} />
            <span className="text-[11px] text-purple-200">
              {quantity}x {product.name} ({selectedSize} - {selectedColor.name})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
