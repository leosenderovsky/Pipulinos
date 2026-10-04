import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ProductPicture } from './ProductPicture';
import { BRAND_CONFIG } from '../brand.config';
import { PRODUCTS, Product } from '../data/products';
import {
  ArrowLeft,
  Trash2,
  Gift,
  ShieldCheck,
  RefreshCw,
  Truck,
  HeartHandshake,
  MessageCircle,
  CreditCard,
  Plus,
  Minus,
  Sparkles,
  ChevronRight,
  Lock,
  Tag,
} from 'lucide-react';

interface CartPageProps {
  onBackToCatalog: () => void;
  onProceedToCheckout: (method?: 'mercadopago' | 'whatsapp') => void;
  onOpenSizeGuideModal: () => void;
  onOpenProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onBackToCatalog,
  onProceedToCheckout,
  onOpenSizeGuideModal,
  onOpenProduct,
}) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    total,
    totalCount,
    isFreeShipping,
    freeShippingThreshold,
    freeShippingProgress,
    amountRemainingForFreeShipping,
    isGiftPackaging,
    setIsGiftPackaging,
    giftDedication,
    setGiftDedication,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    addToCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  // Quick cross-sell accessories
  const crossSellProducts = PRODUCTS.filter((p) => p.categoria === 'Accesorios & Packs');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (!ok) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2500);
    } else {
      setCouponInput('');
      setCouponError(false);
    }
  };

  const transferTotal = Math.round(
    total * (1 - BRAND_CONFIG.commerce.transferDiscountPercent / 100)
  );
  const installmentAmount = Math.round(
    total / BRAND_CONFIG.commerce.installmentsWithoutInterest
  );

  if (items.length === 0) {
    return (
      <div className="w-full max-w-[1240px] mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-sm flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-brand-secondary-soft text-amber-800 flex items-center justify-center text-3xl">
            🧸
          </div>
          <h2 className="text-2xl font-extrabold text-brand-text">Tu carrito está vacío</h2>
          <p className="text-xs sm:text-sm text-purple-900/70 font-medium">
            ¡Descubrí las prendas más suaves y tiernas de la nueva temporada en el showroom!
          </p>
          <button
            type="button"
            onClick={onBackToCatalog}
            className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-hover text-white font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Explorar Catálogo {BRAND_CONFIG.shortName}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-background min-h-screen">
      {/* Progress & Confidence Banner */}
      <section className="w-full bg-purple-50/70 border-b border-purple-100 py-2.5 px-4 md:px-6">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="hover:text-brand-primary transition-colors flex items-center gap-1 font-bold text-purple-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Seguir comprando</span>
            <span className="text-purple-300 mx-1">•</span>
            <span className="text-brand-primary font-extrabold">Carrito de Compras</span>
          </button>

          <div className="hidden sm:flex items-center gap-4 text-purple-900/80 font-bold text-[11px]">
            <span className="flex items-center gap-1 text-brand-primary">
              <ShieldCheck className="w-3.5 h-3.5" /> Compra 100% Protegida
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-brand-success" /> 30 días para cambios
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-brand-accent-blue" /> Despacho en 24hs
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="w-full max-w-[1240px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Title & Free Shipping Milestone Bento */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-extrabold text-brand-primary uppercase tracking-widest block mb-1">
              Paso Final
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight">
              Tu Pedido {BRAND_CONFIG.shortName}{' '}
              <span className="text-base sm:text-lg text-purple-900/60 font-medium">
                ({totalCount} {totalCount === 1 ? 'prenda' : 'prendas'})
              </span>
            </h1>
          </div>

          {/* Free Shipping Goal Tracker */}
          <div className="w-full md:w-auto md:min-w-[420px] bg-brand-surface-warm border-2 border-amber-200 rounded-3xl p-4 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-secondary text-amber-900 shadow-xs">
                  <Truck className="w-4 h-4" />
                </span>
                <span className="font-extrabold text-xs text-brand-text">
                  {isFreeShipping ? '¡Envío Gratis a Domicilio!' : '¡Estás muy cerca del Envío Gratis!'}
                </span>
              </div>

              <span
                className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 ${
                  isFreeShipping
                    ? 'bg-brand-surface-green text-emerald-800 border border-emerald-300'
                    : 'bg-brand-secondary-soft text-amber-900 border border-amber-200'
                }`}
              >
                {isFreeShipping ? '⭐ ¡Conseguido!' : `${freeShippingProgress}%`}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-purple-100 rounded-full h-2.5 overflow-hidden p-0.5 shadow-inner">
              <div
                style={{ width: `${freeShippingProgress}%` }}
                className="bg-gradient-to-r from-brand-secondary via-brand-primary-hover to-brand-primary h-full rounded-full transition-all duration-500"
              />
            </div>

            <p className="text-[11px] text-purple-900/80 font-medium">
              {isFreeShipping ? (
                <>
                  ¡Genial! Ya superaste los{' '}
                  <strong className="text-brand-text font-extrabold">
                    ${freeShippingThreshold.toLocaleString('es-AR')}
                  </strong>
                  : tenés{' '}
                  <span className="text-brand-primary font-bold bg-brand-surface-pink px-1.5 py-0.5 rounded">
                    ENVÍO GRATIS
                  </span>{' '}
                  asegurado a todo el país 🌟
                </>
              ) : (
                <>
                  Agregá{' '}
                  <strong className="text-brand-primary font-extrabold">
                    ${amountRemainingForFreeShipping.toLocaleString('es-AR')}
                  </strong>{' '}
                  más para alcanzar el <strong>Envío Gratis</strong> nacional 🚚
                </>
              )}
            </p>
          </div>
        </div>

        {/* 2-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Items Rows + Gift Box (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Items Container Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border-2 border-purple-100 flex flex-col divide-y divide-purple-100">
              {items.map((item) => {
                const itemTotal = item.unitPrice * item.quantity;
                return (
                  <article
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {/* Item Image */}
                      <div
                        onClick={() => onOpenProduct(item.product)}
                        className="relative w-22 h-26 sm:w-26 sm:h-30 shrink-0 rounded-2xl overflow-hidden bg-purple-50 shadow-xs border border-purple-100 cursor-pointer group"
                      >
                        <ProductPicture
                          src={item.product.imagenes[0]}
                          alt={item.product.nombre}
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={1000}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                          pictureClassName="block w-full h-full"
                        />
                        <span className="absolute bottom-1.5 left-1.5 text-[9px] font-extrabold bg-white/90 backdrop-blur-xs text-brand-text px-1.5 py-0.5 rounded-full shadow-xs">
                          {item.size}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-400">
                          {item.product.tela}
                        </span>
                        <h2
                          onClick={() => onOpenProduct(item.product)}
                          className="font-extrabold text-sm sm:text-base text-brand-text line-clamp-1 hover:text-brand-primary transition-colors cursor-pointer"
                        >
                          {item.product.nombre}
                        </h2>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-purple-900/80 font-medium">
                          <span className="flex items-center gap-1.5">
                            <span
                              style={{ backgroundColor: item.color.hex }}
                              className="w-3 h-3 rounded-full ring-1 ring-black/10 inline-block"
                            />
                            <span>
                              Talle: <strong className="text-brand-text">{item.size}</strong>
                            </span>
                          </span>
                          <span>•</span>
                          <span>
                            Color: <strong className="text-brand-text">{item.color.name}</strong>
                          </span>
                        </div>

                        {/* Mobile price row */}
                        <div className="flex items-baseline gap-2 mt-1 sm:hidden">
                          <span className="font-extrabold text-base text-brand-primary">
                            ${itemTotal.toLocaleString('es-AR')}
                          </span>
                          <span className="text-[11px] text-purple-400 font-medium">
                            (${item.unitPrice.toLocaleString('es-AR')} c/u)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stepper + Subtotal (Right Desktop / Bottom Mobile) */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-purple-50 rounded-full px-2 py-1 border border-purple-100">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-purple-900 font-bold active:scale-95 transition-all cursor-pointer"
                          title="Restar cantidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-extrabold text-xs text-brand-text">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-purple-900 font-bold active:scale-95 transition-all cursor-pointer"
                          title="Aumentar cantidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Desktop Price Box */}
                      <div className="hidden sm:flex flex-col text-right">
                        <span className="font-extrabold text-base text-brand-primary">
                          ${itemTotal.toLocaleString('es-AR')}
                        </span>
                        <span className="text-[10px] text-purple-400 font-medium">
                          ${item.unitPrice.toLocaleString('es-AR')} c/u
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-purple-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bento Add-on: Packaging para Regalo */}
            <div className="bg-gradient-to-br from-brand-surface-warm via-white to-brand-surface-lilac border-2 border-amber-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary-soft flex items-center justify-center text-amber-800 shadow-xs shrink-0">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm sm:text-base text-brand-text">
                        {BRAND_CONFIG.copy.giftPackagingTitle}
                      </h3>
                      <span className="text-[10px] font-extrabold bg-brand-primary text-white px-2.5 py-0.5 rounded-full uppercase shadow-xs">
                        Sin Cargo Extra
                      </span>
                    </div>
                    <p className="text-xs text-purple-900/70 font-medium mt-1 leading-relaxed">
                      {BRAND_CONFIG.copy.giftPackagingDescription}
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={isGiftPackaging}
                    onChange={(e) => setIsGiftPackaging(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-purple-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-primary shadow-xs"></div>
                </label>
              </div>

              {/* Dedication Card Input */}
              {isGiftPackaging && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-brand-text flex items-center gap-1.5">
                      <span>💌</span> Escribí tu mensaje para la tarjetita de dedicatoria:
                    </span>
                    <span className="text-[10px] font-bold text-purple-400 bg-white px-2 py-0.5 rounded-full">
                      Incluida gratis
                    </span>
                  </div>
                  <textarea
                    value={giftDedication}
                    onChange={(e) => setGiftDedication(e.target.value)}
                    rows={2}
                    placeholder={BRAND_CONFIG.copy.giftDedicationPlaceholder}
                    className="w-full bg-white text-brand-text text-xs rounded-xl p-2.5 border border-amber-200 focus:border-brand-primary outline-none shadow-xs resize-none transition-all"
                  />
                </div>
              )}
            </div>

            {/* Customer Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-purple-100 shadow-xs">
                <span className="w-8 h-8 rounded-xl bg-brand-surface-blue text-brand-accent-blue flex items-center justify-center font-bold text-sm">
                  ☁️
                </span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs text-brand-text">100% Algodón Seguro</span>
                  <span className="text-[10px] text-purple-900/60 font-medium">Hipoalergénico</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-purple-100 shadow-xs">
                <span className="w-8 h-8 rounded-xl bg-brand-surface-pink text-brand-primary flex items-center justify-center font-bold text-sm">
                  🔄
                </span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs text-brand-text">Cambio de Talle Fácil</span>
                  <span className="text-[10px] text-purple-900/60 font-medium">Mensajería o showroom</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-purple-100 shadow-xs">
                <span className="w-8 h-8 rounded-xl bg-brand-secondary-soft text-amber-800 flex items-center justify-center font-bold text-sm">
                  🧸
                </span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs text-brand-text">
                    {BRAND_CONFIG.copy.customerServiceLabel}
                  </span>
                  <span className="text-[10px] text-purple-900/60 font-medium">Te guiamos en cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Dual Checkout Buttons (5 cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-purple-100 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                <h2 className="font-extrabold text-base text-brand-text">Resumen de la Orden</h2>
                <span className="text-[11px] font-extrabold bg-purple-50 text-brand-text-muted px-2.5 py-0.5 rounded-full">
                  {BRAND_CONFIG.shortName} #AR-849
                </span>
              </div>

              {/* Price Calculations */}
              <div className="flex flex-col gap-2 text-xs font-semibold">
                <div className="flex items-center justify-between text-purple-900/80">
                  <span>Subtotal productos ({totalCount} prendas)</span>
                  <span className="font-extrabold text-brand-text">
                    ${subtotal.toLocaleString('es-AR')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-brand-primary">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Descuento aplicado ({appliedCoupon || 'Promo'})</span>
                    </span>
                    <span className="font-extrabold">-${discount.toLocaleString('es-AR')}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-emerald-800">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Costo de Envío a Domicilio</span>
                  </span>
                  <span className="font-extrabold uppercase">
                    {isFreeShipping ? 'GRATIS' : 'Por calcular'}
                  </span>
                </div>

                {/* Coupon input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Código de cupón"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-purple-100 text-xs text-brand-text uppercase font-bold focus:border-brand-primary outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-brand-secondary text-purple-900 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Aplicar
                  </button>
                </form>

                {couponError && (
                  <p className="text-[10px] text-rose-500 font-bold">
                    Cupón no válido.
                  </p>
                )}

                {/* Divider */}
                <div className="w-full h-px bg-purple-100 my-1" />

                {/* Grand Total Section */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-extrabold text-sm text-brand-text">TOTAL FINAL</span>
                    <span className="text-3xl font-extrabold text-brand-primary tracking-tight">
                      ${total.toLocaleString('es-AR')}
                    </span>
                  </div>

                  {/* Installments pill */}
                  <div className="bg-purple-50/80 px-3 py-2 rounded-xl flex items-center justify-between mt-1 text-brand-text">
                    <span className="text-xs font-bold flex items-center gap-1">
                      <CreditCard className="w-4 h-4 text-brand-accent-blue" />
                      <span>
                        Hasta <strong>{BRAND_CONFIG.commerce.installmentsWithoutInterest} cuotas fijas</strong> sin interés
                      </span>
                    </span>
                    <span className="text-xs font-extrabold text-brand-text">
                      de ${installmentAmount.toLocaleString('es-AR')}
                    </span>
                  </div>

                  {/* Cash / Bank Transfer Highlight */}
                  <div className="bg-brand-secondary-soft/60 border border-amber-200/80 rounded-xl p-2.5 mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-950 text-xs font-bold">
                      <span>💰</span>
                      <span>Transferencia / Efectivo (-{BRAND_CONFIG.commerce.transferDiscountPercent}%):</span>
                    </div>
                    <span className="text-xs font-extrabold text-amber-950">
                      ${transferTotal.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* DUAL CHECKOUT BUTTONS (Requirement 7) */}
              <div className="flex flex-col gap-2.5 pt-2">
                <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider text-center">
                  Seleccioná cómo preferís finalizar tu pedido
                </span>

                {/* BUTTON 1: MERCADO PAGO */}
                <button
                  type="button"
                  onClick={() => onProceedToCheckout('mercadopago')}
                  className="w-full group bg-brand-payment hover:bg-brand-payment-hover text-white py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-extrabold text-sm leading-tight">
                        Pagar con Mercado Pago
                      </span>
                      <span className="text-white/80 text-[10px] font-medium leading-tight">
                        Tarjetas de crédito, débito o dinero en cuenta
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* BUTTON 2: WHATSAPP */}
                <button
                  type="button"
                  onClick={() => onProceedToCheckout('whatsapp')}
                  className="w-full group bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-extrabold text-sm leading-tight">
                        Coordinar por WhatsApp
                      </span>
                      <span className="text-white/90 text-[10px] font-medium leading-tight">
                        Asesoramiento, talles y 10% OFF transferencia
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust assurances */}
              <div className="flex flex-col gap-1.5 pt-1 text-[11px] text-purple-900/70 font-semibold border-t border-purple-50">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Checkout encriptado con seguridad SSL 256 bits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-success" />
                  <span>
                    {BRAND_CONFIG.copy.handmadeGuarantee} {BRAND_CONFIG.shortName}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Sizing Assistance Card */}
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">📏</span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs text-brand-text">
                    ¿Dudas con los talles de tu peque?
                  </span>
                  <span className="text-[11px] text-purple-900/70">
                    Escribinos y te pasamos medidas en centímetros.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenSizeGuideModal}
                className="text-xs font-extrabold text-brand-accent-blue hover:underline cursor-pointer"
              >
                Ver Tabla
              </button>
            </div>
          </aside>
        </div>

        {/* Suggested Cross-sell Carousel Header */}
        <section className="mt-12 pt-6 border-t border-purple-100 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-extrabold text-brand-primary uppercase tracking-wider flex items-center gap-1">
                ⭐ {BRAND_CONFIG.copy.crossSellTitle} {BRAND_CONFIG.shortName}
              </span>
              <h3 className="text-xl font-extrabold text-brand-text">
                Agregá con un clic antes de cerrar tu pedido
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-brand-surface-green px-3 py-1 rounded-full border border-emerald-200">
              ✓ Con tu envío gratis ya asegurado
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {crossSellProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-3 flex items-center gap-3.5 shadow-xs hover:shadow-md border border-purple-100 transition-all hover:scale-[1.01]"
              >
                <div
                  onClick={() => onOpenProduct(prod)}
                  className="w-18 h-18 rounded-xl overflow-hidden bg-purple-50 shrink-0 cursor-pointer"
                >
                  <ProductPicture
                    src={prod.imagenes[0]}
                    alt={prod.nombre}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover object-center"
                    pictureClassName="block w-full h-full"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] text-purple-400 font-bold">{prod.tela}</span>
                  <h4
                    onClick={() => onOpenProduct(prod)}
                    className="font-extrabold text-xs text-brand-text truncate hover:text-brand-primary cursor-pointer"
                  >
                    {prod.nombre}
                  </h4>
                  <span className="font-extrabold text-sm text-brand-primary">
                    ${prod.precio.toLocaleString('es-AR')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const defaultSize = prod.tallesDisponibles[0] || 'Único';
                    const defaultColor = prod.coloresDisponibles[0] || {
                      name: 'Estándar',
                      hex: BRAND_CONFIG.theme.primary,
                    };
                    addToCart(prod, defaultSize, defaultColor, 1);
                  }}
                  className="w-9 h-9 rounded-full bg-brand-surface-pink hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-xs cursor-pointer"
                  title="Sumar al pedido"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
