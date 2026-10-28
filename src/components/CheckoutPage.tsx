import React, { useState } from 'react';
import { Txt } from './Txt';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG, formatText } from '../brand.config';
import { ProductPicture } from './ProductPicture';
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

type CheckoutField = 'name' | 'email' | 'phone' | 'streetAddress' | 'zipCode' | 'city';
type CheckoutFieldErrors = Partial<Record<CheckoutField, string>>;

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

  const demoCheckout = BRAND_CONFIG.demo.prefillCheckout ? BRAND_CONFIG.demo.checkout : null;

  // Contact form state
  const [email, setEmail] = useState(demoCheckout?.email ?? '');
  const [phone, setPhone] = useState(demoCheckout?.phone ?? '');
  const [fullName, setFullName] = useState(demoCheckout?.name ?? '');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [streetAddress, setStreetAddress] = useState(demoCheckout?.streetAddress ?? '');
  const [apartment, setApartment] = useState(demoCheckout?.apartment ?? '');
  const [zipCode, setZipCode] = useState(demoCheckout?.zipCode ?? '');
  const [city, setCity] = useState(demoCheckout?.city ?? '');
  const [deliveryNotes, setDeliveryNotes] = useState(
    isGiftPackaging && giftDedication.trim()
      ? formatText(BRAND_CONFIG.ui.checkout.dedicationNote, { text: giftDedication })
      : demoCheckout?.deliveryNotes ?? ''
  );
  const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});

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

  const clearFieldError = (field: CheckoutField) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validateCheckout = () => {
    const errors: CheckoutFieldErrors = {};
    if (!fullName.trim()) errors.name = BRAND_CONFIG.ui.checkout.errors.name;
    if (!email.trim()) {
      errors.email = BRAND_CONFIG.ui.checkout.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = BRAND_CONFIG.ui.checkout.errors.emailInvalid;
    }
    if (!phone.trim()) errors.phone = BRAND_CONFIG.ui.checkout.errors.phone;
    if (shippingMethod !== 'pickup') {
      if (!streetAddress.trim()) errors.streetAddress = BRAND_CONFIG.ui.checkout.errors.street;
      if (!zipCode.trim()) errors.zipCode = BRAND_CONFIG.ui.checkout.errors.zip;
      if (!city.trim()) errors.city = BRAND_CONFIG.ui.checkout.errors.city;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // =========================================================================
  // SUBMIT 1: MERCADO PAGO CHECKOUT PRO
  // =========================================================================
  const handleMercadoPagoCheckout = async () => {
    setErrorMessage(null);
    if (!validateCheckout()) return;

    setIsProcessing(true);

    const payload = {
      items: items.map((i) => ({
        id: i.productId,
        quantity: i.quantity,
        size: i.size,
        color: i.color.name,
      })),
      customer: {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: {
          street_name: streetAddress.trim(),
          street_number: '1',
          zip_code: zipCode.trim(),
          city: city.trim(),
        },
        notes: deliveryNotes.trim(),
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
            ? BRAND_CONFIG.ui.checkout.errors.mpNotConfigured
            : formatText(BRAND_CONFIG.ui.checkout.errors.paymentFailed, { status: String(response.status), details: details ? `: ${JSON.stringify(details)}` : '.' })
        );
      }

      const data = await response.json();
      const initPoint = data.init_point || data.sandbox_init_point;
      if (!initPoint || !data.preferenceId) {
        throw new Error(BRAND_CONFIG.ui.checkout.errors.mpInvalidPreference);
      }

      setMpPreferenceResult({
        initPoint,
        preferenceId: data.preferenceId,
        mode: data.mode || 'sandbox',
      });

      // Si estamos en un navegador regular fuera de un iframe rígido, redirigimos
      // Para asegurar una experiencia fluida sin romper el contenedor, mostramos el modal interactivo
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : BRAND_CONFIG.ui.checkout.errors.mpUnexpected;
      setErrorMessage(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================================================================
  // SUBMIT 2: COORDINAR POR WHATSAPP (10% OFF)
  // =========================================================================
  const handleWhatsAppCheckout = () => {
    if (!validateCheckout()) return;

    const itemsText = items
      .map((i) => formatText(BRAND_CONFIG.ui.checkout.whatsapp.itemLine, { quantity: String(i.quantity), name: i.product.nombre, size: i.size, color: i.color.name, price: `$${(i.unitPrice * i.quantity).toLocaleString('es-AR')}` }))
      .join('\n');

    const deliveryAddress = [streetAddress, apartment, city, zipCode]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(', ');
    const shippingText =
      shippingMethod === 'pickup'
        ? formatText(BRAND_CONFIG.ui.checkout.whatsapp.pickup, { address: BRAND_CONFIG.contact.showroomAddress })
        : shippingMethod === 'express'
        ? formatText(BRAND_CONFIG.ui.checkout.whatsapp.express, { address: deliveryAddress, price: `$${shippingCost.toLocaleString('es-AR')}` })
        : formatText(BRAND_CONFIG.ui.checkout.whatsapp.standard, { address: deliveryAddress });

    const message = formatText(BRAND_CONFIG.ui.checkout.whatsapp.message, {
      heading: BRAND_CONFIG.copy.checkoutOrderHeading,
      name: BRAND_CONFIG.shortName.toUpperCase(),
      customer: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      items: itemsText,
      delivery: shippingText,
      notes: deliveryNotes.trim() ? formatText(BRAND_CONFIG.ui.checkout.whatsapp.notes, { notes: deliveryNotes.trim() }) : '',
      total: `$${finalTotal.toLocaleString('es-AR')}`,
      percent: String(BRAND_CONFIG.commerce.transferDiscountPercent),
      transferTotal: `$${transferTotal.toLocaleString('es-AR')}`,
      savings: `$${transferSavings.toLocaleString('es-AR')}`,
    });

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappRaw}?text=${encoded}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Registrar pedido exitoso
    onOrderSuccess(`WA-${Date.now().toString().slice(-6)}`, BRAND_CONFIG.ui.checkout.paymentWhatsapp);
    clearCart();
  };

  return (
    <div className="w-full bg-brand-surface-checkout min-h-screen py-6 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Minimalist Checkout Header */}
        <header className="w-full flex flex-col bg-white rounded-3xl shadow-sm border-2 border-purple-100 overflow-hidden">
          <div className="w-full bg-gradient-to-r from-brand-secondary via-brand-primary-hover to-brand-primary text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2">
            <Txt as="span" value={BRAND_CONFIG.ui.checkout.banner} />
          </div>

          <div className="w-full px-4 py-4 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 sm:flex sm:justify-between sm:gap-4 sm:px-6">
            <button
              type="button"
              onClick={onBackToCart}
              className="col-start-1 row-start-1 inline-flex items-center gap-1.5 text-purple-900/80 hover:text-brand-primary font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <Txt as="span" value={BRAND_CONFIG.ui.checkout.backToCart} />
            </button>

            <img
              src={BRAND_CONFIG.logo.url}
              alt={BRAND_CONFIG.logo.alt}
              width={400}
              height={242}
              loading="lazy"
              decoding="async"
              className="col-span-2 row-start-2 justify-self-center h-auto w-[min(64vw,220px)] max-w-full object-contain sm:w-[190px]"
            />

            <div className="col-start-2 row-start-1 flex items-center gap-2 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              <div className="flex flex-col text-left">
                <Txt as="span" className="font-extrabold text-[10px] text-brand-text uppercase leading-tight" value={BRAND_CONFIG.ui.checkout.secureBadge} />
                <span className="text-[9px] text-purple-400 leading-tight">SSL 256-bit</span>
              </div>
            </div>
          </div>
        </header>

        {/* Step Indicator Bar */}
        <div className="w-full grid grid-cols-3 gap-2 px-1">
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-brand-primary text-white rounded-full shadow-xs text-xs font-bold">
            <span className="w-5 h-5 rounded-full bg-white text-brand-primary text-[11px] flex items-center justify-center font-extrabold">
              1
            </span>
            <Txt as="span" value={BRAND_CONFIG.ui.checkout.step1} />
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-brand-surface-blue text-brand-accent-blue-dark rounded-full shadow-xs text-xs font-bold">
            <span className="w-5 h-5 rounded-full bg-brand-accent-blue-dark text-white text-[11px] flex items-center justify-center font-extrabold">
              2
            </span>
            <Txt as="span" value={BRAND_CONFIG.ui.checkout.step2} />
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-purple-100/60 text-purple-400 rounded-full text-xs font-bold">
            <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-700 text-[11px] flex items-center justify-center font-extrabold">
              3
            </span>
            <Txt as="span" value={BRAND_CONFIG.ui.checkout.step3} />
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
                  <span className="w-7 h-7 rounded-xl bg-brand-surface-pink text-brand-primary font-extrabold text-xs flex items-center justify-center">
                    1
                  </span>
                  <Txt as="h2" className="font-extrabold text-base text-brand-text" value={BRAND_CONFIG.ui.checkout.contactTitle} />
                </div>
                <Txt as="span" className="bg-brand-secondary-soft text-amber-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase" value={BRAND_CONFIG.ui.checkout.stepOfTwo} />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <Txt as="label" className="font-extrabold text-xs text-purple-900" value={BRAND_CONFIG.ui.checkout.emailLabel} />
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError('email');
                    }}
                    placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.email}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'checkout-email-error' : undefined}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                  />
                  {fieldErrors.email && <p id="checkout-email-error" role="alert" className="text-xs text-rose-700">{fieldErrors.email}</p>}
                </div>

                <div className="space-y-1">
                  <Txt as="label" className="font-extrabold text-xs text-purple-900" value={BRAND_CONFIG.ui.checkout.phoneLabel} />
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearFieldError('phone');
                    }}
                    placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.phone}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? 'checkout-phone-error' : undefined}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                  />
                  {fieldErrors.phone && <p id="checkout-phone-error" role="alert" className="text-xs text-rose-700">{fieldErrors.phone}</p>}
                  <p className="text-[10px] text-brand-whatsapp font-bold flex items-center gap-1 mt-0.5">
                    <MessageCircle className="w-3 h-3" />{BRAND_CONFIG.ui.checkout.phoneHelp}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Txt as="label" className="font-extrabold text-xs text-purple-900" value={BRAND_CONFIG.ui.checkout.nameLabel} />
                <input
                  id="checkout-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    clearFieldError('name');
                  }}
                  placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.name}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'checkout-name-error' : undefined}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                />
                {fieldErrors.name && <p id="checkout-name-error" role="alert" className="text-xs text-rose-700">{fieldErrors.name}</p>}
              </div>

              {/* Delivery Methods Selector */}
              <div className="space-y-2 pt-2">
                <Txt as="label" className="font-extrabold text-xs text-purple-900" value={BRAND_CONFIG.ui.checkout.deliveryPrompt} />

                <div className="space-y-2">
                  {/* Standard Free */}
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${
                      shippingMethod === 'standard'
                        ? 'border-brand-primary bg-brand-surface-pink/30 shadow-xs'
                        : 'border-purple-100 bg-purple-50/40 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-brand-primary w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-brand-text flex items-center gap-2">
                          <Txt as="span" value={BRAND_CONFIG.ui.checkout.standardTitle} />
                          <Txt as="span" className="bg-brand-secondary-soft text-amber-900 text-[10px] px-2 py-0.2 rounded-full font-bold" value={BRAND_CONFIG.ui.checkout.standardBadge} />
                        </div>
                        <Txt as="p" className="text-[11px] text-purple-900/60 font-medium" value={BRAND_CONFIG.ui.checkout.standardText} />
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-brand-primary uppercase">GRATIS</span>
                  </label>

                  {/* Express 24hs */}
                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${
                      shippingMethod === 'express'
                        ? 'border-brand-primary bg-brand-surface-pink/30 shadow-xs'
                        : 'border-purple-100 bg-purple-50/40 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-brand-primary w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-brand-text flex items-center gap-2">
                          <Txt as="span" value={BRAND_CONFIG.ui.checkout.expressTitle} />
                          <Txt as="span" className="bg-brand-surface-blue text-brand-accent-blue-dark text-[10px] px-2 py-0.2 rounded-full font-bold" value={BRAND_CONFIG.ui.checkout.expressBadge} />
                        </div>
                        <Txt as="p" className="text-[11px] text-purple-900/60 font-medium" value={BRAND_CONFIG.ui.checkout.expressText} />
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-brand-text">
                      ${BRAND_CONFIG.commerce.expressShippingCost.toLocaleString('es-AR')}
                    </span>
                  </label>

                  {/* Pickup Showroom */}
                  <label
                    onClick={() => setShippingMethod('pickup')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border-2 ${
                      shippingMethod === 'pickup'
                        ? 'border-brand-primary bg-brand-surface-pink/30 shadow-xs'
                        : 'border-purple-100 bg-purple-50/40 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                        className="accent-brand-primary w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <div className="font-extrabold text-xs text-brand-text flex items-center gap-2">
                          <span>{formatText(BRAND_CONFIG.ui.checkout.pickupTitle, { name: BRAND_CONFIG.shortName })}</span>
                          <span className="bg-brand-surface-purple text-brand-text-muted text-[10px] px-2 py-0.2 rounded-full font-bold">
                            📍 {BRAND_CONFIG.contact.showroomAddress}
                          </span>
                        </div>
                        <p className="text-[11px] text-purple-900/60 font-medium">
                          {formatText(BRAND_CONFIG.ui.checkout.pickupHours, { hours: BRAND_CONFIG.contact.showroomHours })}
                        </p>
                      </div>
                    </div>
                    <Txt as="span" className="font-extrabold text-xs text-amber-800 uppercase" value={BRAND_CONFIG.ui.checkout.free} />
                  </label>
                </div>
              </div>

              {/* Address Fields (only if delivery) */}
              {shippingMethod !== 'pickup' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="sm:col-span-2 space-y-1">
                    <Txt as="label" className="text-[11px] font-extrabold text-purple-900" value={BRAND_CONFIG.ui.checkout.streetLabel} />
                    <input
                      id="checkout-street"
                      type="text"
                      value={streetAddress}
                      onChange={(e) => {
                        setStreetAddress(e.target.value);
                        clearFieldError('streetAddress');
                      }}
                      placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.street}
                      aria-invalid={Boolean(fieldErrors.streetAddress)}
                      aria-describedby={fieldErrors.streetAddress ? 'checkout-street-error' : undefined}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                    />
                    {fieldErrors.streetAddress && <p id="checkout-street-error" role="alert" className="text-xs text-rose-700">{fieldErrors.streetAddress}</p>}
                  </div>

                  <div className="space-y-1">
                    <Txt as="label" className="text-[11px] font-extrabold text-purple-900" value={BRAND_CONFIG.ui.checkout.apartmentLabel} />
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.apartment}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <Txt as="label" className="text-[11px] font-extrabold text-purple-900" value={BRAND_CONFIG.ui.checkout.zipLabel} />
                    <input
                      id="checkout-zip"
                      type="text"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value);
                        clearFieldError('zipCode');
                      }}
                      placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.zip}
                      aria-invalid={Boolean(fieldErrors.zipCode)}
                      aria-describedby={fieldErrors.zipCode ? 'checkout-zip-error' : undefined}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                    />
                    {fieldErrors.zipCode && <p id="checkout-zip-error" role="alert" className="text-xs text-rose-700">{fieldErrors.zipCode}</p>}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <Txt as="label" className="text-[11px] font-extrabold text-purple-900" value={BRAND_CONFIG.ui.checkout.cityLabel} />
                    <input
                      id="checkout-city"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        clearFieldError('city');
                      }}
                      placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.city}
                      aria-invalid={Boolean(fieldErrors.city)}
                      aria-describedby={fieldErrors.city ? 'checkout-city-error' : undefined}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                    />
                    {fieldErrors.city && <p id="checkout-city-error" role="alert" className="text-xs text-rose-700">{fieldErrors.city}</p>}
                  </div>
                </div>
              )}

              {/* Delivery / Gift Indications */}
              <div className="space-y-1 pt-1">
                <Txt as="label" className="text-[11px] font-extrabold text-purple-900" value={BRAND_CONFIG.ui.checkout.notesLabel} />
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder={BRAND_CONFIG.copy.checkoutPlaceholders.notes}
                  className="w-full px-3.5 py-2 bg-purple-50/50 rounded-xl text-xs text-brand-text border border-purple-100 focus:border-brand-primary outline-none"
                />
              </div>
            </section>

            {/* STEP 2: Selección del Medio de Pago */}
            <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-purple-100 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-purple-50">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-brand-surface-pink text-brand-primary font-extrabold text-xs flex items-center justify-center">
                    2
                  </span>
                  <Txt as="h2" className="font-extrabold text-base text-brand-text" value={BRAND_CONFIG.ui.checkout.paymentTitle} />
                </div>
                <Txt as="span" className="font-extrabold text-[10px] text-brand-accent-blue-dark bg-brand-surface-blue px-2.5 py-0.5 rounded-full uppercase" value={BRAND_CONFIG.ui.checkout.paymentBadge} />
              </div>

              {/* OPTION A: Mercado Pago Checkout Pro */}
              <div
                className={`p-5 rounded-2xl transition-all border-2 ${
                  paymentGateway === 'mercadopago'
                    ? 'border-brand-payment bg-sky-50/40 shadow-xs'
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
                      className="accent-brand-payment w-4 h-4 cursor-pointer"
                    />
                    <Txt as="span" className="font-extrabold text-sm text-brand-text" value={BRAND_CONFIG.ui.checkout.mpTitle} />
                  </label>
                  <Txt as="span" className="bg-brand-primary text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase" value={BRAND_CONFIG.ui.checkout.mpRecommended} />
                </div>

                <Txt as="p" className="text-xs text-purple-900/80 font-medium leading-relaxed pl-6" value={BRAND_CONFIG.ui.checkout.mpText} />

                {/* Accepted payment badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 pl-6">
                  <Txt as="span" className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs" value={BRAND_CONFIG.ui.checkout.methodVisa} />
                  <Txt as="span" className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs" value={BRAND_CONFIG.ui.checkout.methodMastercard} />
                  <Txt as="span" className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs" value={BRAND_CONFIG.ui.checkout.methodAmex} />
                  <Txt as="span" className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs" value={BRAND_CONFIG.ui.checkout.methodNaranja} />
                  <Txt as="span" className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs" value={BRAND_CONFIG.ui.checkout.methodDebit} />
                  <Txt as="span" className="bg-white text-purple-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-purple-100 shadow-xs" value={BRAND_CONFIG.ui.checkout.methodCash} />
                  <Txt as="span" className="bg-sky-100 text-brand-payment font-extrabold text-[10px] px-2.5 py-1 rounded-lg border border-sky-200 shadow-xs" value={BRAND_CONFIG.ui.checkout.methodBalance} />
                </div>

                {/* Installments Selector */}
                {paymentGateway === 'mercadopago' && (
                  <div className="space-y-2 pt-4 pl-6">
                    <Txt as="label" className="font-extrabold text-xs text-brand-text" value={BRAND_CONFIG.ui.checkout.installmentsPrompt} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <label
                        onClick={() => setSelectedInstallmentPlan('1_payment')}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all ${
                          selectedInstallmentPlan === '1_payment'
                            ? 'border-brand-payment bg-white shadow-xs'
                            : 'border-purple-100 bg-white/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="installments"
                            checked={selectedInstallmentPlan === '1_payment'}
                            onChange={() => setSelectedInstallmentPlan('1_payment')}
                            className="accent-brand-payment w-3.5 h-3.5"
                          />
                          <Txt as="span" className="text-xs font-bold text-brand-text" value={BRAND_CONFIG.ui.checkout.installmentOne} />
                        </div>
                        <span className="font-extrabold text-xs text-brand-text">
                          ${finalTotal.toLocaleString('es-AR')}
                        </span>
                      </label>

                      <label
                        onClick={() => setSelectedInstallmentPlan('3_installments')}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all ${
                          selectedInstallmentPlan === '3_installments'
                            ? 'border-brand-payment bg-white shadow-xs'
                            : 'border-purple-100 bg-white/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="installments"
                            checked={selectedInstallmentPlan === '3_installments'}
                            onChange={() => setSelectedInstallmentPlan('3_installments')}
                            className="accent-brand-payment w-3.5 h-3.5"
                          />
                          <div>
                            <Txt as="span" className="text-xs font-bold text-brand-text block" value={BRAND_CONFIG.ui.checkout.installmentThree} />
                            <span className="text-[11px] text-brand-accent-blue-dark font-semibold">
                              {formatText(BRAND_CONFIG.ui.checkout.installmentAmount, { count: String(BRAND_CONFIG.commerce.installmentsWithoutInterest), amount: `$${installmentPerMonth.toLocaleString('es-AR')}` })}
                            </span>
                          </div>
                        </div>
                        <Txt as="span" className="bg-brand-secondary-soft text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded" value={BRAND_CONFIG.ui.checkout.installmentCft} />
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
                        className="w-full py-3.5 px-6 bg-brand-payment hover:bg-brand-payment-hover text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer disabled:opacity-70"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <Txt as="span" value={BRAND_CONFIG.ui.checkout.generating} />
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>{formatText(BRAND_CONFIG.ui.checkout.payButton, { amount: `$${finalTotal.toLocaleString('es-AR')}` })}</span>
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-purple-900/60 font-medium flex items-center justify-center gap-1 mt-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <Txt as="span" value={BRAND_CONFIG.ui.checkout.redirectNote} />
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* DIVIDER OR */}
              <div className="flex items-center gap-3">
                <div className="flex-grow h-px bg-purple-100" />
                <Txt as="span" className="text-[11px] font-extrabold text-purple-400 uppercase tracking-wider" value={BRAND_CONFIG.ui.checkout.orCoordinate} />
                <div className="flex-grow h-px bg-purple-100" />
              </div>

              {/* OPTION B: WhatsApp Directo con Transferencia */}
              <div
                className={`p-5 rounded-2xl transition-all border-2 ${
                  paymentGateway === 'whatsapp'
                    ? 'border-brand-whatsapp bg-emerald-50/40 shadow-xs'
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
                      className="accent-brand-whatsapp w-4 h-4 cursor-pointer"
                    />
                    <Txt as="span" className="font-extrabold text-sm text-brand-text" value={BRAND_CONFIG.ui.checkout.whatsappTitle} />
                  </label>
                  <Txt as="span" className="bg-brand-secondary-soft text-amber-900 font-extrabold text-xs px-2.5 py-0.5 rounded-lg border border-amber-200" value={BRAND_CONFIG.ui.checkout.whatsappBadge} />
                </div>

                <p className="text-xs text-purple-900/80 font-medium leading-relaxed pl-6">
                  {BRAND_CONFIG.ui.checkout.transferStart}{' '}
                  <strong className="text-emerald-800">
                    {formatText(BRAND_CONFIG.ui.checkout.transferStrong, { percent: String(BRAND_CONFIG.commerce.transferDiscountPercent), amount: `$${transferTotal.toLocaleString('es-AR')}` })}
                  </strong>{' '}
                  {BRAND_CONFIG.ui.checkout.transferEnd}
                </p>

                {paymentGateway === 'whatsapp' && (
                  <div className="space-y-3 pt-3 pl-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                      <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-purple-100">
                        <span className="text-sm">📏</span>
                        <Txt as="span" className="text-purple-900" value={BRAND_CONFIG.ui.checkout.sizeCheck} />
                      </div>
                      <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-purple-100">
                        <span className="text-sm">💰</span>
                        <span className="text-emerald-800 font-bold">
                          {formatText(BRAND_CONFIG.ui.checkout.savingsLine, { amount: `$${transferSavings.toLocaleString('es-AR')}` })}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3.5 px-6 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <Txt as="span" value={BRAND_CONFIG.ui.checkout.whatsappConfirm} />
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
                <Txt as="h3" className="font-extrabold text-base text-brand-text" value={BRAND_CONFIG.ui.checkout.summaryTitle} />
                <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {formatText(BRAND_CONFIG.ui.checkout.itemsCount, { count: String(items.length) })}
                </span>
              </div>

              {/* Items mini list */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="flex items-center gap-3 bg-purple-50/50 p-2.5 rounded-2xl border border-purple-100/60"
                  >
                    <ProductPicture
                      src={i.product.imagenes[0]}
                      alt={i.product.nombre}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={1000}
                      className="w-full h-full rounded-xl object-cover object-center bg-white border border-purple-100"
                      pictureClassName="block w-14 h-14 shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <h4 className="font-bold text-brand-text truncate">{i.product.nombre}</h4>
                      <p className="text-[11px] text-purple-900/60 font-medium">
                        {formatText(BRAND_CONFIG.ui.checkout.itemSizeColor, { size: i.size, color: i.color.name })}
                      </p>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className="text-[11px] text-purple-400">{formatText(BRAND_CONFIG.ui.checkout.itemQuantity, { quantity: String(i.quantity) })}</span>
                        <span className="font-extrabold text-brand-primary">
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
                  <Txt as="span" value={BRAND_CONFIG.ui.checkout.subtotal} />
                  <span className="font-bold text-brand-text">${subtotal.toLocaleString('es-AR')}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-brand-primary">
                    <Txt as="span" value={BRAND_CONFIG.ui.checkout.discount} />
                    <span className="font-extrabold">-${discount.toLocaleString('es-AR')}</span>
                  </div>
                )}

                <div className="flex justify-between text-purple-900/80">
                  <Txt as="span" value={BRAND_CONFIG.ui.checkout.shippingSelected} />
                  <span className="font-bold text-emerald-700">
                    {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-AR')}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-purple-100 flex justify-between items-baseline">
                  <Txt as="span" className="font-extrabold text-sm text-brand-text" value={BRAND_CONFIG.ui.checkout.total} />
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-brand-primary tracking-tight block">
                      ${finalTotal.toLocaleString('es-AR')}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800">
                      {formatText(BRAND_CONFIG.ui.checkout.totalTransfer, { amount: `$${transferTotal.toLocaleString('es-AR')}` })}
                    </span>
                  </div>
                </div>
              </div>

              {/* 30-Day Guarantee */}
              <div className="p-3.5 bg-brand-surface-blue/60 rounded-2xl flex items-start gap-2.5 border border-sky-200">
                <span className="text-base">⭐</span>
                <div>
                  <Txt as="h5" className="font-extrabold text-xs text-sky-950" value={BRAND_CONFIG.ui.checkout.guaranteeTitle} />
                  <Txt as="p" className="text-[11px] text-sky-900/80 font-medium mt-0.5 leading-snug" value={BRAND_CONFIG.ui.checkout.guaranteeText} />
                </div>
              </div>

              {/* Trust Badges under summary */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-extrabold text-brand-text">
                <div className="flex flex-col items-center gap-1 bg-purple-50/60 p-2 rounded-xl">
                  <RefreshCw className="w-4 h-4 text-brand-success" />
                  <Txt as="span" value={BRAND_CONFIG.ui.checkout.trustExchange} />
                </div>
                <div className="flex flex-col items-center gap-1 bg-purple-50/60 p-2 rounded-xl">
                  <Gift className="w-4 h-4 text-brand-primary" />
                  <Txt as="span" value={BRAND_CONFIG.ui.checkout.trustGift} />
                </div>
                <div className="flex flex-col items-center gap-1 bg-purple-50/60 p-2 rounded-xl">
                  <Headphones className="w-4 h-4 text-brand-accent-blue-dark" />
                  <Txt as="span" value={BRAND_CONFIG.ui.checkout.trustSupport} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* POPUP / MODAL: Mercado Pago Sandbox Init Point Modal */}
      {mpPreferenceResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-brand-payment relative text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-brand-payment flex items-center justify-center mx-auto text-2xl">
              💙
            </div>

            <div>
              <Txt as="span" className="bg-sky-100 text-brand-payment text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider" value={BRAND_CONFIG.ui.checkout.mpTitle} />
              {mpPreferenceResult.mode === 'development_demo' && (
                <Txt as="p" role="status" className="mt-2 rounded-xl bg-amber-100 px-3 py-2 text-xs font-extrabold text-amber-950" value={BRAND_CONFIG.ui.checkout.demoNotice} />
              )}
              <Txt as="h3" className="font-extrabold text-xl text-brand-text mt-2" value={BRAND_CONFIG.ui.checkout.demoTitle} />
              <p className="text-xs text-purple-900/80 font-medium mt-1">
                {BRAND_CONFIG.ui.checkout.demoTextStart} <strong>${finalTotal.toLocaleString('es-AR')}</strong>{BRAND_CONFIG.ui.checkout.demoTextEnd}
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-2xl text-left text-xs font-mono text-purple-950 space-y-1 border border-purple-100">
              <Txt as="p" className="font-bold text-[11px] text-purple-700" value={BRAND_CONFIG.ui.checkout.demoDetails} />
              <p className="truncate">{formatText(BRAND_CONFIG.ui.checkout.demoPrefId, { id: mpPreferenceResult.preferenceId })}</p>
              <Txt as="p" value={BRAND_CONFIG.ui.checkout.demoCurrency} />
              <p>{formatText(BRAND_CONFIG.ui.checkout.demoMode, { mode: mpPreferenceResult.mode === 'development_demo' ? BRAND_CONFIG.ui.checkout.demoModeLocal : BRAND_CONFIG.ui.checkout.demoModeReal })}</p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={mpPreferenceResult.initPoint}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-brand-payment hover:bg-brand-payment-hover text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Txt as="span" value={BRAND_CONFIG.ui.checkout.demoOpen} />
                <ExternalLink className="w-4 h-4" />
              </a>

              {import.meta.env.DEV && mpPreferenceResult.mode === 'development_demo' && (
                <Txt as="button"
                  type="button"
                  onClick={() => {
                    onOrderSuccess(mpPreferenceResult.preferenceId, BRAND_CONFIG.ui.checkout.demoMethodLabel);
                    clearCart();
                  }}
                  className="w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs transition-colors cursor-pointer border border-emerald-200" value={BRAND_CONFIG.ui.checkout.demoSimulate} />
              )}

              <Txt as="button"
                type="button"
                onClick={() => setMpPreferenceResult(null)}
                className="text-xs font-bold text-purple-400 hover:text-purple-700 pt-1" value={BRAND_CONFIG.ui.checkout.demoBack} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
