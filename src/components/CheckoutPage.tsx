import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../brand.config';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Truck,
  MapPin,
  CheckCircle2,
  Lock,
  Loader2,
  RefreshCw,
  Gift,
  Headphones,
  ExternalLink,
} from 'lucide-react';

interface CheckoutPageProps {
  initialMethod?: 'mercadopago' | 'whatsapp';
  onBackToCart: () => void;
  onOrderSuccess: (orderId: string, method: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  initialMethod = 'mercadopago',
  onBackToCart,
  onOrderSuccess,
}) => {
  const {
    items,
    subtotal,
    discount,
    total,
    isGiftPackaging,
    giftDedication,
    clearCart,
    appliedCoupon,
  } = useCart();

  // Contact form state
  const [email, setEmail] = useState('laura.gomez@gmail.com');
  const [phone, setPhone] = useState('+54 9 11 4820-9912');
  const [fullName, setFullName] = useState('Laura Gómez');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [streetAddress, setStreetAddress] = useState('Av. Coronel Díaz 2145');
  const [apartment, setApartment] = useState('6to A');
  const [zipCode, setZipCode] = useState('C1425');
  const [city, setCity] = useState('Palermo, CABA');
  const [deliveryNotes, setDeliveryNotes] = useState(
    isGiftPackaging ? `Incluir dedicatoria: "${giftDedication}"` : 'Tocar timbre en portería'
  );

  // Payment method selection
  const [paymentGateway, setPaymentGateway] = useState<'mercadopago' | 'whatsapp'>(initialMethod);
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState<'1_payment' | '3_installments'>('3_installments');

  // Loading & error states
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpPreferenceResult, setMpPreferenceResult] = useState<{
    initPoint: string;
    preferenceId: string;
    mode: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calculated totals
  const shippingCost = shippingMethod === 'express' ? BRAND_CONFIG.commerce.expressShippingCost : 0;
  const finalTotal = total + shippingCost;
  const transferTotal = Math.round(
    finalTotal * (1 - BRAND_CONFIG.commerce.transferDiscountPercent / 100)
  );
  const transferSavings = finalTotal - transferTotal;
  const installmentPerMonth = Math.round(
    finalTotal / BRAND_CONFIG.commerce.installmentsWithoutInterest
  );

  // =========================================================================
  // SUBMIT 1: MERCADO PAGO CHECKOUT PRO
  // =========================================================================
  const handleMercadoPagoCheckout = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    const payload = {
      items: items.map((i) => ({
        id: i.productId,
        quantity: i.quantity,
        size: i.size,
        color: i.color.name,
      })),
      customer: {
        name: fullName,
        email,
        phone,
        address: {
          street_name: streetAddress,
          street_number: '1',
          zip_code: zipCode,
          city,
        },
        notes: deliveryNotes,
      },
      shippingMethod,
      paymentMethod: paymentGateway === 'mercadopago' ? 'mercadopago' : 'transfer',
      couponCode: appliedCoupon,
    };

    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const details = errorData.details?.message || errorData.details || errorData.error;
        throw new Error(
          response.status === 503
            ? 'Mercado Pago no está configurado. Probá más tarde o contactanos por WhatsApp.'
            : `No pudimos iniciar el pago (${response.status})${details ? `: ${JSON.stringify(details)}` : '.'}`
        );
      }

      const data = await response.json();
      const initPoint = data.init_point || data.sandbox_init_point;
      if (!initPoint || !data.preferenceId) {
        throw new Error('Mercado Pago no devolvió una preferencia de pago válida.');
      }

      setMpPreferenceResult({
        initPoint,
        preferenceId: data.preferenceId,
        mode: data.mode || 'sandbox',
      });

      // Si estamos en un navegador regular fuera de un iframe rígido, redirigimos
      // Para asegurar una experiencia fluida sin romper el contenedor, mostramos el modal interactivo
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error inesperado al iniciar el pago.';
      setErrorMessage(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================================================================
  // SUBMIT 2: COORDINAR POR WHATSAPP (10% OFF)
  // =========================================================================
  const handleWhatsAppCheckout = () => {
    const itemsText = items
      .map((i) => `• ${i.quantity}x ${i.product.nombre} (Talle: ${i.size} | Color: ${i.color.name}) - $${(i.unitPrice * i.quantity).toLocaleString('es-AR')}`)
      .join('\n');

    const shippingText =
      shippingMethod === 'pickup'
        ? `Retiro sin cargo en Showroom (${BRAND_CONFIG.contact.showroomAddress})`
        : shippingMethod === 'express'
        ? `Envío Express 24hs a ${streetAddress}, ${apartment}, ${city} ($${shippingCost.toLocaleString('es-AR')})`
        : `Envío Estándar GRATIS a ${streetAddress}, ${apartment}, ${city}`;

    const message = `🛍️ *NUEVO PEDIDO PIPULINOS SHOWROOM*
----------------------------------------
*Cliente:* ${fullName}
*WhatsApp:* ${phone}
*Email:* ${email}

*Prendas elegidas:*
${itemsText}

*Entrega:* ${shippingText}
${deliveryNotes ? `*Indicaciones:* ${deliveryNotes}\n` : ''}
*Total lista:* $${finalTotal.toLocaleString('es-AR')}
*TOTAL CON 10% OFF TRANSFERENCIA:* $${transferTotal.toLocaleString('es-AR')} (Ahorrás $${transferSavings.toLocaleString('es-AR')})

¡Hola! Les paso mi pedido para confirmar datos bancarios de transferencia y coordinar la entrega. ¡Muchas gracias! 💕`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encoded}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Registrar pedido exitoso
    onOrderSuccess(`WA-${Date.now().toString().slice(-6)}`, 'WhatsApp & Transferencia');
    clearCart();
  };

  return (
    <div className="w-full bg-[#FAF9FF] min-h-screen py-6 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Minimalist Checkout Header */}
        <header className="w-full flex flex-col bg-white rounded-3xl shadow-sm border-2 border-purple-100 overflow-hidden">
          <div className="w-full bg-gradient-to-r from-[#FFD026] via-[#FF8A1E] to-[#FF6B57] text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2">
            <span>✨ Compra 100% Segura • 3 y 6 cuotas sin interés • Despachos garantizados a todo el país ✨</span>
          </div>

          <div className="w-full px-4 py-4 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 sm:flex sm:justify-between sm:gap-4 sm:px-6">
            <button
              type="button"
              onClick={onBackToCart}
              className="col-start-1 row-start-1 inline-flex items-center gap-1.5 text-purple-900/80 hover:text-[#FF6B57] font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al carrito</span>
            </button>

            <img
              src={BRAND_CONFIG.logo.url}
              alt={BRAND_CONFIG.logo.alt}
              width={400}
              height={242}
              decoding="async"
              className="col-span-2 row-start-2 justify-self-center h-auto w-[min(64vw,220px)] max-w-full object-contain sm:w-[190px]"
            />

            <div className="col-start-2 row-start-1 flex items-center gap-2 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
              <ShieldCheck className="w-4 h-4 text-[#FF6B57]" />
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-[10px] text-[#1E2046] uppercase leading-tight">
                  Compra Segura
                </span>
                <span className="text-[9px] text-purple-400 leading-tight">SSL 256-bit</span>
              </div>
            </div>
          </div>
        </header>

        {/* Step Indicator Bar */}
        <div className="w-full grid grid-cols-3 gap-2 px-1">
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-[#FF6B57] text-white rounded-full shadow-xs text-xs font-bold">
            <span className="w-5 h-5 rounded-full bg-white text-[#FF6B57] text-[11px] flex items-center justify-center font-extrabold">
              1
            </span>
            <span>1. Envío</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-[#E2F3FF] text-[#0284C7] rounded-full shadow-xs text-xs font-bold">
            <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white text-[11px] flex items-center justify-center font-extrabold">
              2
            </span>
            <span>2. Pago</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-purple-100/60 text-purple-400 rounded-full text-xs font-bold">
            <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-700 text-[11px] flex items-center justify-center font-extrabold">
              3
            </span>
            <span>3. Confirmación</span>
          </div>
        </div>

        {/* Main Grid: Form + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Step 1 (Shipping/Contact) & Step 2 (Payment Gateway) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* STEP 1: Contacto y Envío */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-purple-100 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-purple-50">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-[#FFE9E5] text-[#FF6B57] font-extrabold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-extrabold text-base text-[#1E2046]">Contacto y Envío</h2>
                </div>
                <span className="bg-[#FFF4D0] text-amber-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Paso 1 de 2
                </span>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-extrabold text-xs text-purple-900">Email para confirmación</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-xs text-purple-900">Teléfono celular / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 9 11 5555-8888"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                  />
                  <p className="text-[10px] text-[#25D366] font-bold flex items-center gap-1 mt-0.5">
                    <MessageCircle className="w-3 h-3" />
                    Te enviaremos el código de seguimiento por WhatsApp
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-xs text-purple-900">
                  Nombre y Apellido de quien recibe
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Laura Gómez"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                />
              </div>

              {/* Delivery Methods Selector */}
              <div className="space-y-2 pt-2">
                <label className="font-extrabold text-xs text-purple-900">
                  Seleccioná cómo recibir tu pedido:
                </label>

                <div className="space-y-2">
                  {/* Standard Free */}
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${
                      shippingMethod === 'standard'
                        ? 'border-[#FF6B57] bg-[#FFE9E5]/30 shadow-xs'
                        : 'border-purple-100 bg-purple-50/40 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-[#FF6B57] w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-[#1E2046] flex items-center gap-2">
                          <span>Envío a domicilio Estándar</span>
                          <span className="bg-[#FFF4D0] text-amber-900 text-[10px] px-2 py-0.2 rounded-full font-bold">
                            📦 3 a 5 días
                          </span>
                        </div>
                        <p className="text-[11px] text-purple-900/60 font-medium">
                          Por Correo Argentino a todo el país
                        </p>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-[#FF6B57] uppercase">GRATIS</span>
                  </label>

                  {/* Express 24hs */}
                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${
                      shippingMethod === 'express'
                        ? 'border-[#FF6B57] bg-[#FFE9E5]/30 shadow-xs'
                        : 'border-purple-100 bg-purple-50/40 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-[#FF6B57] w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-[#1E2046] flex items-center gap-2">
                          <span>Envío Express 24hs CABA/GBA</span>
                          <span className="bg-[#E2F3FF] text-[#0284C7] text-[10px] px-2 py-0.2 rounded-full font-bold">
                            ⚡ Llega mañana
                          </span>
                        </div>
                        <p className="text-[11px] text-purple-900/60 font-medium">
                          Moto mensajería privada puerta a puerta
                        </p>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-[#1E2046]">
                      ${BRAND_CONFIG.commerce.expressShippingCost.toLocaleString('es-AR')}
                    </span>
                  </label>

                  {/* Pickup Showroom */}
                  <label
                    onClick={() => setShippingMethod('pickup')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${
                      shippingMethod === 'pickup'
                        ? 'border-[#FF6B57] bg-[#FFE9E5]/30 shadow-xs'
                        : 'border-purple-100 bg-purple-50/40 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                        className="accent-[#FF6B57] w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-[#1E2046] flex items-center gap-2">
                          <span>Retiro en Showroom Pipulinos</span>
                          <span className="bg-[#F1EAFE] text-[#8B5CF6] text-[10px] px-2 py-0.2 rounded-full font-bold">
                            📍 Palermo Soho
                          </span>
                        </div>
                        <p className="text-[11px] text-purple-900/60 font-medium">
                          {BRAND_CONFIG.contact.showroomHours} (Listo en 2hs)
                        </p>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-amber-800 uppercase">SIN CARGO</span>
                  </label>
                </div>
              </div>

              {/* Address Fields (only if delivery) */}
              {shippingMethod !== 'pickup' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-extrabold text-purple-900">Calle y Altura</label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Ej. Av. Santa Fe 3421"
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-purple-900">Piso / Depto</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Ej. 6to A"
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-purple-900">Código Postal</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="C1425"
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-extrabold text-purple-900">Ciudad / Localidad</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Palermo, CABA"
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Delivery / Gift Indications */}
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-extrabold text-purple-900">
                  Indicaciones para entrega o dedicatoria para regalo
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Tocar timbre en portería. Si es regalo incluir dedicatoria."
                  className="w-full px-3.5 py-2 bg-purple-50/50 rounded-xl text-xs text-[#1E2046] border border-purple-100 focus:border-[#FF6B57] outline-none"
                />
              </div>
            </section>

            {/* STEP 2: Selección del Medio de Pago */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-purple-100 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-purple-50">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-[#FFE9E5] text-[#FF6B57] font-extrabold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-extrabold text-base text-[#1E2046]">Selección del Medio de Pago</h2>
                </div>
                <span className="font-extrabold text-[10px] text-[#0284C7] bg-[#E2F3FF] px-2.5 py-0.5 rounded-full uppercase">
                  Pago Seguro
                </span>
              </div>

              {/* OPTION A: Mercado Pago Checkout Pro */}
              <div
                className={`p-5 rounded-2xl transition-all border-2 ${
                  paymentGateway === 'mercadopago'
                    ? 'border-[#009EE3] bg-sky-50/40 shadow-xs'
                    : 'border-purple-100 bg-purple-50/20'
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentGateway"
                      checked={paymentGateway === 'mercadopago'}
                      onChange={() => setPaymentGateway('mercadopago')}
                      className="accent-[#009EE3] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-extrabold text-sm text-[#1E2046]">
                      Mercado Pago Checkout Pro
                    </span>
                  </label>
                  <span className="bg-[#FF6B57] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    Opción Recomendada
                  </span>
                </div>

                <p className="text-xs text-purple-900/80 font-medium leading-relaxed pl-6">
                  Aboná de forma 100% segura mediante tus tarjetas bancarias, dinero en cuenta o
                  puntos de pago en efectivo.
                </p>

                {/* Accepted payment badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 pl-6">
                  <span className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs">
                    💳 Visa
                  </span>
                  <span className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs">
                    💳 Mastercard
                  </span>
                  <span className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs">
                    💳 Amex
                  </span>
                  <span className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs">
                    🟠 Naranja
                  </span>
                  <span className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs">
                    🏧 Débito
                  </span>
                  <span className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs">
                    🏪 Rapipago / Pago Fácil
                  </span>
                  <span className="bg-sky-100 text-[#009EE3] font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-sky-200 shadow-xs">
                    💙 Saldo Mercado Pago
                  </span>
                </div>

                {/* Installments Selector */}
                {paymentGateway === 'mercadopago' && (
                  <div className="space-y-2 pt-4 pl-6">
                    <label className="font-extrabold text-xs text-[#1E2046]">
                      Seleccioná plan de cuotas:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <label
                        onClick={() => setSelectedInstallmentPlan('1_payment')}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all ${
                          selectedInstallmentPlan === '1_payment'
                            ? 'border-[#009EE3] bg-white shadow-xs'
                            : 'border-purple-100 bg-white/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="installments"
                            checked={selectedInstallmentPlan === '1_payment'}
                            onChange={() => setSelectedInstallmentPlan('1_payment')}
                            className="accent-[#009EE3] w-3.5 h-3.5"
                          />
                          <span className="text-xs font-bold text-[#1E2046]">1 Pago Débito/Crédito</span>
                        </div>
                        <span className="font-extrabold text-xs text-[#1E2046]">
                          ${finalTotal.toLocaleString('es-AR')}
                        </span>
                      </label>

                      <label
                        onClick={() => setSelectedInstallmentPlan('3_installments')}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all ${
                          selectedInstallmentPlan === '3_installments'
                            ? 'border-[#009EE3] bg-white shadow-xs'
                            : 'border-purple-100 bg-white/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="installments"
                            checked={selectedInstallmentPlan === '3_installments'}
                            onChange={() => setSelectedInstallmentPlan('3_installments')}
                            className="accent-[#009EE3] w-3.5 h-3.5"
                          />
                          <div>
                            <span className="text-xs font-bold text-[#1E2046] block">
                              3 Cuotas sin interés
                            </span>
                            <span className="text-[11px] text-[#0284C7] font-semibold">
                              3 de ${installmentPerMonth.toLocaleString('es-AR')}
                            </span>
                          </div>
                        </div>
                        <span className="bg-[#FFF4D0] text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded">
                          0% CFT
                        </span>
                      </label>
                    </div>

                    {/* MP CTA Button */}
                    <div className="pt-2">
                      {errorMessage && (
                        <p role="alert" className="mb-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800">
                          {errorMessage}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={handleMercadoPagoCheckout}
                        disabled={isProcessing}
                        className="w-full py-3.5 px-6 bg-[#009EE3] hover:bg-[#0089c7] text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer disabled:opacity-70"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generando preferencia en Mercado Pago...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>Pagar ${finalTotal.toLocaleString('es-AR')} con Mercado Pago</span>
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-purple-900/60 font-medium flex items-center justify-center gap-1 mt-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Redirección directa y protegida por Mercado Pago Argentina</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* DIVIDER OR */}
              <div className="flex items-center gap-3">
                <div className="flex-grow h-px bg-purple-100" />
                <span className="text-[11px] font-extrabold text-purple-400 uppercase tracking-wider">
                  O preferís coordinar directo
                </span>
                <div className="flex-grow h-px bg-purple-100" />
              </div>

              {/* OPTION B: WhatsApp Directo con Transferencia */}
              <div
                className={`p-5 rounded-2xl transition-all border-2 ${
                  paymentGateway === 'whatsapp'
                    ? 'border-[#25D366] bg-emerald-50/40 shadow-xs'
                    : 'border-purple-100 bg-purple-50/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentGateway"
                      checked={paymentGateway === 'whatsapp'}
                      onChange={() => setPaymentGateway('whatsapp')}
                      className="accent-[#25D366] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-extrabold text-sm text-[#1E2046]">
                      Coordinar y Pagar por WhatsApp
                    </span>
                  </label>
                  <span className="bg-[#FFF4D0] text-amber-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg border border-amber-200">
                    10% OFF
                  </span>
                </div>

                <p className="text-xs text-purple-900/80 font-medium leading-relaxed pl-6">
                  ¿Preferís abonar por{' '}
                  <strong className="text-emerald-800">
                    transferencia bancaria con 10% OFF (${transferTotal.toLocaleString('es-AR')})
                  </strong>{' '}
                  o querés confirmar medidas exactas de tu bebé antes de pagar? Te enviamos el resumen
                  directo a WhatsApp para cerrar con una asesora en tiempo real.
                </p>

                {paymentGateway === 'whatsapp' && (
                  <div className="space-y-3 pt-3 pl-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                      <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-purple-100">
                        <span className="text-sm">📏</span>
                        <span className="text-purple-900">Chequeo de centímetros de tu peque</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-purple-100">
                        <span className="text-sm">💰</span>
                        <span className="text-emerald-800 font-bold">
                          Ahorrás ${transferSavings.toLocaleString('es-AR')} por transferencia
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Finalizar pedido y coordinar por WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Order Summary (5 cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-purple-100 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                <h3 className="font-extrabold text-base text-[#1E2046]">Resumen de Compra</h3>
                <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length} artículos
                </span>
              </div>

              {/* Items mini list */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="flex items-center gap-3 bg-purple-50/50 p-2.5 rounded-2xl border border-purple-100/60"
                  >
                    <picture className="block w-14 h-14 shrink-0">
                      <source srcSet={i.product.imagenes[0].replace(/\.jpg$/i, '.webp')} type="image/webp" />
                      <img
                        src={i.product.imagenes[0]}
                        alt={i.product.nombre}
                        loading="lazy"
                        decoding="async"
                        width={1000}
                        height={1000}
                        className="w-full h-full rounded-xl object-contain bg-white border border-purple-100"
                      />
                    </picture>
                    <div className="flex-1 min-w-0 text-xs">
                      <h4 className="font-bold text-[#1E2046] truncate">{i.product.nombre}</h4>
                      <p className="text-[11px] text-purple-900/60 font-medium">
                        Talle: {i.size} • Color: {i.color.name}
                      </p>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="text-[11px] text-purple-400">Cant: {i.quantity}</span>
                        <span className="font-extrabold text-[#FF6B57]">
                          ${(i.unitPrice * i.quantity).toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2 pt-2 border-t border-purple-100 text-xs font-semibold">
                <div className="flex justify-between text-purple-900/80">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E2046]">${subtotal.toLocaleString('es-AR')}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#FF6B57]">
                    <span>Descuento Promo</span>
                    <span className="font-extrabold">-${discount.toLocaleString('es-AR')}</span>
                  </div>
                )}

                <div className="flex justify-between text-purple-900/80">
                  <span>Envío seleccionado</span>
                  <span className="font-bold text-emerald-700">
                    {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-AR')}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-purple-100 flex justify-between items-baseline">
                  <span className="font-extrabold text-sm text-[#1E2046]">Total final:</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#FF6B57] tracking-tight block">
                      ${finalTotal.toLocaleString('es-AR')}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800">
                      o ${transferTotal.toLocaleString('es-AR')} abonando por transferencia
                    </span>
                  </div>
                </div>
              </div>

              {/* 30-Day Guarantee */}
              <div className="p-3.5 bg-[#E2F3FF]/60 rounded-2xl flex items-start gap-2.5 border border-sky-200">
                <span className="text-base">⭐</span>
                <div>
                  <h5 className="font-extrabold text-xs text-sky-950">
                    Garantía de Crecimiento • 30 días de cambio
                  </h5>
                  <p className="text-[11px] text-sky-900/80 font-medium mt-0.5 leading-snug">
                    Si le queda chico o preferís otro color, el primer cambio es 100% ágil y gratuito
                    en showroom o correo.
                  </p>
                </div>
              </div>

              {/* Trust Badges under summary */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-extrabold text-[#1E2046]">
                <div className="flex flex-col items-center gap-1 bg-purple-50/60 p-2 rounded-xl">
                  <RefreshCw className="w-4 h-4 text-[#2DD382]" />
                  <span>Cambio Fácil</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-purple-50/60 p-2 rounded-xl">
                  <Gift className="w-4 h-4 text-[#FF6B57]" />
                  <span>Embalaje Regalo</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-purple-50/60 p-2 rounded-xl">
                  <Headphones className="w-4 h-4 text-[#0284C7]" />
                  <span>Atención 1 a 1</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* POPUP / MODAL: Mercado Pago Sandbox Init Point Modal */}
      {mpPreferenceResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#009EE3] relative text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-[#009EE3] flex items-center justify-center mx-auto text-2xl">
              💙
            </div>

            <div>
              <span className="bg-sky-100 text-[#009EE3] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Mercado Pago Checkout Pro
              </span>
              <h3 className="font-extrabold text-xl text-[#1E2046] mt-2">
                ¡Preferencia Generada!
              </h3>
              <p className="text-xs text-purple-900/80 font-medium mt-1">
                La función serverless procesó el carrito y generó la preferencia de pago en Mercado
                Pago con moneda ARS por <strong>${finalTotal.toLocaleString('es-AR')}</strong>.
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-2xl text-left text-xs font-mono text-purple-950 space-y-1 border border-purple-100">
              <p className="font-bold text-[11px] text-purple-700">Detalles técnicos del pedido:</p>
              <p className="truncate">• Pref ID: {mpPreferenceResult.preferenceId}</p>
              <p>• Moneda: ARS (Pesos Argentinos)</p>
              <p>• Modo: {mpPreferenceResult.mode === 'development_demo' ? 'Demostración local' : 'Mercado Pago'}</p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={mpPreferenceResult.initPoint}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  onOrderSuccess(mpPreferenceResult.preferenceId, 'Mercado Pago');
                  clearCart();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#009EE3] hover:bg-[#0089c7] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span>Abrir Checkout Pro de Mercado Pago</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {import.meta.env.DEV && mpPreferenceResult.mode === 'development_demo' && (
                <button
                  type="button"
                  onClick={() => {
                    onOrderSuccess(mpPreferenceResult.preferenceId, 'Mercado Pago (demo local)');
                    clearCart();
                  }}
                  className="w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs transition-colors cursor-pointer border border-emerald-200"
                >
                  Simular pago aprobado
                </button>
              )}

              <button
                type="button"
                onClick={() => setMpPreferenceResult(null)}
                className="text-xs font-bold text-purple-400 hover:text-purple-700 pt-1"
              >
                Volver a editar pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
