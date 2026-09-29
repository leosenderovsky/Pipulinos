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
  logo: {
    url: string;
    alt: string;
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
  };
}

export const BRAND_CONFIG: BrandConfig = {
  name: 'PIPULINO',
  shortName: 'Pipulinos',
  tagline: 'Showroom de Indumentaria Infantil',
  slogan: 'Amor en cada puntada para crecer jugando 🎈',
  foundedYear: 2025,
  logo: {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYP5kAaSFVMgGqGckykDhpxAK3PNXHJCVJCZB0x3BgFBGBt0eACCbpcUdiHhDXI8Z8bbWWVx_FFDtdpxncteVpGypj0b6lcVmrNe9k_9iueMc0e54T-2e2vOAymmdo9tdYw2RRMCO28IrbMkhQ3UGUSDuC3qvFj8xQH5CBUcvSn2hNRwf4Kaj_h5I3a-ZI9_BQyFB9RrpcoreDulorM9Nwww6yXAttVfUcdONog9MBXp7W3xSL5ED3Cd1EI0EKnd-maBc',
    alt: 'Pipulinos - Indumentaria Infantil',
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1553bDDh87vxFV7K5hXRyL0wj9yR_CrPbCqwfXOZwLs2x493olvttm4JBaHW-D8X5zS66ZdyPrHzRbczoaB9kC2dFDjiH9BiTCcCOwDnL-r05_aO2VNV7B5MswUuTSbRrSJwCtKYimKVYmp3bOu0GiAN7V_gjbkO631c_MlfrMbxBimNBjHiZmSBUj9MR_DDHa1zZjJzDU13J8FMk28MoRIXtdqsopJ5xwjfctQ_lQUNELYjB6NGidw',
    bannerImageAlt: 'Bebés jugando felices con prendas suaves Pipulinos en showroom',
    trustPill: '100% Algodón Peinado Suave',
  },
  copy: {
    sizeAssistancePrompt: '¿Dudas con el talle de tu peque? Escribinos por WhatsApp y una asesora te pasa medidas en centímetros y fotos en vivo.',
    giftPackagingTitle: '¿Es para regalo? 🎁',
    giftPackagingDescription: 'Te enviamos la bolsita ilustrada Pipulinos con moño, papel de seda y tarjetita con dedicatoria lista para sorprender.',
    footerAbout: 'Showroom oficial de ropa tierna y noble para bebés y peques de 0 a 10 años. Diseñado con amor para jugar, explorar y dormir felices.',
    footerDisclaimer: 'Marca, productos y precios de ejemplo — prototipo de demostración de sender.ia',
  },
};
