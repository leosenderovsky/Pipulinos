/**
 * PIPULINO - CONFIGURACIÓN CENTRAL DE MARCA
 * ==========================================
 * Este es el ÚNICO archivo que debe modificarse para adaptar el sitio
 * a un nuevo cliente o marca de indumentaria.
 * Define identidad, redes, WhatsApp, reglas comerciales, promociones y textos globales.
 */

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  slogan: string;
  foundedYear: number;
  catalogYear: number;
  seo: {
    titleSuffix: string;
    description: string;
    socialImage: string;
  };
  typography: {
    headings: string;
    body: string;
    stylesheetUrl: string;
  };
  theme: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondarySoft: string;
    background: string;
    surface: string;
    surfaceCheckout: string;
    surfaceLilac: string;
    surfacePink: string;
    surfacePinkStrong: string;
    surfaceBlue: string;
    surfaceGreen: string;
    surfacePurple: string;
    surfaceWarm: string;
    text: string;
    textMuted: string;
    accentBlue: string;
    accentBlueDark: string;
    payment: string;
    paymentHover: string;
    success: string;
    whatsapp: string;
    whatsappHover: string;
    neutral: string;
    blueTint: string;
    productPastelBlue: string;
    productCoral: string;
  };
  storage: {
    cartKey: string;
  };
  demo: {
    prefillCart: boolean;
    giftDedication: string;
    coupon: string | null;
    giftPackaging: boolean;
  };
  checkoutDefaults: {
    name: string;
    email: string;
    streetAddress: string;
    apartment: string;
    zipCode: string;
    city: string;
  };
  logo: {
    url: string;
    alt: string;
    faviconUrl: string;
    appleTouchIconUrl: string;
  };
  contact: {
    whatsappNumberFormatted: string;
    whatsappRaw: string; // solo dígitos con código de país para wa.me
    whatsappAdvisorName: string;
    instagramHandle: string;
    instagramUrl: string;
    showroomAddress: string;
    showroomId: string;
    showroomHours: string;
    email: string;
  };
  commerce: {
    currency: string;
    currencySymbol: string;
    coupons: Array<{ code: string; type: 'percent' | 'fixed'; value: number }>;
    freeShippingThreshold: number;
    transferDiscountPercent: number;
    installmentsWithoutInterest: number;
    expressShippingCost: number;
    standardShippingDays: string;
    expressShippingDays: string;
    exchangePeriodDays: number;
  };
  announcement: {
    enabled: boolean;
    text: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    promoCreditCard: string;
    promoTransfer: string;
    bannerImageUrl: string;
    bannerImageAlt: string;
    trustPill: string;
  };
  copy: {
    sizeAssistancePrompt: string;
    giftPackagingTitle: string;
    giftPackagingDescription: string;
    footerAbout: string;
    footerDisclaimer: string;
    whatsappShippingMessage: string;
    whatsappFaqMessage: string;
    whatsappSizeMessage: string;
    whatsappOrderConfirmation: string;
    catalogTitle: string;
    catalogCollectionTitle: string;
    customerServiceLabel: string;
    handmadeGuarantee: string;
    crossSellTitle: string;
    checkoutOrderHeading: string;
    thankYouMessage: string;
    orderPreparationMessage: string;
    giftDedicationPlaceholder: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  name: 'PIPULINO',
  shortName: 'Pipulinos',
  tagline: 'Showroom de Indumentaria Infantil',
  slogan: 'Amor en cada puntada para crecer jugando 🎈',
  foundedYear: 2025,
  catalogYear: 2027,
  seo: {
    titleSuffix: 'Showroom & Catálogo de Indumentaria Infantil',
    description:
      'Showroom y catálogo de indumentaria infantil. Ropa tierna para bebés y niños de 0 a 10 años, compra online con Mercado Pago y WhatsApp.',
    socialImage: '/assets/hero/hero-1.jpg',
  },
  typography: {
    headings: 'Plus Jakarta Sans, sans-serif',
    body: 'Plus Jakarta Sans, sans-serif',
    stylesheetUrl:
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  theme: {
    primary: '#FF6B57',
    primaryHover: '#FF8A1E',
    secondary: '#FFD026',
    secondarySoft: '#FFF4D0',
    background: '#FFFDF9',
    surface: '#FFFFFF',
    surfaceCheckout: '#FAF9FF',
    surfaceLilac: '#FAF4FF',
    surfacePink: '#FFE9E5',
    surfacePinkStrong: '#FFD4CC',
    surfaceBlue: '#E2F3FF',
    surfaceGreen: '#E3F9ED',
    surfacePurple: '#F1EAFE',
    surfaceWarm: '#FFFDF6',
    text: '#1E2046',
    textMuted: '#8B5CF6',
    accentBlue: '#26A4F8',
    accentBlueDark: '#0284C7',
    payment: '#009EE3',
    paymentHover: '#0089c7',
    success: '#2DD382',
    whatsapp: '#25D366',
    whatsappHover: '#20ba59',
    neutral: '#E7DFD5',
    blueTint: '#F1F6FF',
    productPastelBlue: '#93C5FD',
    productCoral: '#FB7185',
  },
  storage: {
    cartKey: 'pipulinos_cart',
  },
  // Solo para demostraciones comerciales; desactivar o borrar al entregar a un cliente real.
  demo: {
    prefillCart: false,
    giftDedication: '¡Bienvenido Benicio al mundo! Te amamos tus tíos Sofi y Lucas 💕 ⭐',
    coupon: 'PROMO-PACK',
    giftPackaging: true,
  },
  checkoutDefaults: {
    name: 'Laura Gómez',
    email: 'laura.gomez@gmail.com',
    streetAddress: 'Av. Coronel Díaz 2145',
    apartment: '6to A',
    zipCode: 'C1425',
    city: 'Palermo, CABA',
  },
  logo: {
    url: '/assets/logo/logo.png',
    alt: 'Pipulinos - Indumentaria Infantil',
    faviconUrl: '/assets/logo/favicon-32.png',
    appleTouchIconUrl: '/assets/logo/apple-touch-icon.png',
  },
  contact: {
    whatsappNumberFormatted: '+54 9 11 4820-9912',
    whatsappRaw: '5491148209912',
    whatsappAdvisorName: 'Sofi de Pipulinos',
    instagramHandle: '@pipulinos.kids',
    instagramUrl: 'https://instagram.com/pipulinos.kids',
    showroomAddress: 'Palermo Soho, CABA (Honduras 4850)',
    showroomId: 'Showroom Pipulinos Palermo',
    showroomHours: 'Lunes a Sábados de 10:00 a 19:00 hs',
    email: 'pedidos@pipulinos.kids',
  },
  commerce: {
    currency: 'ARS',
    currencySymbol: '$',
    coupons: [
      { code: 'PIPULINOS10', type: 'percent', value: 10 },
      { code: 'PROMO-PACK', type: 'fixed', value: 5000 },
      { code: 'BIENVENIDA', type: 'percent', value: 10 },
    ],
    freeShippingThreshold: 45000,
    transferDiscountPercent: 10,
    installmentsWithoutInterest: 3,
    expressShippingCost: 3500,
    standardShippingDays: '3 a 5 días hábiles (Correo Argentino)',
    expressShippingDays: 'Llega en 24hs (Moto CABA/GBA)',
    exchangePeriodDays: 30,
  },
  announcement: {
    enabled: true,
    text: 'Envíos gratis desde $45.000 • 3 y 6 cuotas sin interés con Mercado Pago • ¡Atención personalizada por WhatsApp!',
  },
  hero: {
    badge: 'NUEVA COLECCIÓN 2027',
    title: 'Amor en cada puntada para crecer jugando 🎈',
    subtitle: 'Prendas suaves, nobles e hipoalergénicas para acompañar los primeros pasos y sueños de tu peque.',
    promoCreditCard: 'Hasta 6 Cuotas Sin Interés con Mercado Pago',
    promoTransfer: '+ 10% OFF abonando por Transferencia Bancaria',
    bannerImageUrl:
      '/assets/hero/hero-1.jpg',
    bannerImageAlt: 'Bebés jugando felices con prendas suaves Pipulinos en showroom',
    trustPill: '100% Algodón Peinado Suave',
  },
  copy: {
    sizeAssistancePrompt: '¿Dudas con el talle de tu peque? Escribinos por WhatsApp y una asesora te pasa medidas en centímetros y fotos en vivo.',
    giftPackagingTitle: '¿Es para regalo? 🎁',
    giftPackagingDescription: 'Te enviamos la bolsita ilustrada Pipulinos con moño, papel de seda y tarjetita con dedicatoria lista para sorprender.',
    footerAbout: 'Showroom oficial de ropa tierna y noble para bebés y peques de 0 a 10 años. Diseñado con amor para jugar, explorar y dormir felices.',
    footerDisclaimer: 'Marca, productos y precios de ejemplo — prototipo de demostración de sender.ia',
    whatsappShippingMessage: 'tengo una consulta sobre envíos y cambios',
    whatsappFaqMessage: 'tengo preguntas frecuentes',
    whatsappSizeMessage: 'tengo dudas con las medidas para mi bebé',
    whatsappOrderConfirmation: 'confirmo mi pedido',
    catalogTitle: 'Catálogo Showroom',
    catalogCollectionTitle: 'Colección Showroom',
    customerServiceLabel: 'Atendido por Madres',
    handmadeGuarantee: 'Garantía de confección artesanal Showroom',
    crossSellTitle: 'Completá el Conjunto',
    checkoutOrderHeading: 'NUEVO PEDIDO SHOWROOM',
    thankYouMessage: '¡Gracias por elegir!',
    orderPreparationMessage: 'Preparamos tus prendas con todo el amor en nuestro showroom.',
    giftDedicationPlaceholder: 'Ej: ¡Bienvenido al mundo! Con mucho cariño',
  },
};
