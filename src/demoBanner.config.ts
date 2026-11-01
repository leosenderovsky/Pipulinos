// DEMO ONLY. Al entregar el sitio a un cliente real: borrar este archivo, PrototypeBanner.tsx y su import en App.tsx (marcado DEMO ONLY).
export const DEFAULT_DEMO_BRAND_NAME = 'Tienda ON!';
// Tienda ON! no tiene un sitio público todavía.
export const DEFAULT_DEMO_BRAND_URL = '';

export const DEMO_BANNER_CONFIG = {
  companyName: (import.meta.env?.VITE_DEMO_BRAND_NAME || DEFAULT_DEMO_BRAND_NAME).trim(),
  link: (import.meta.env?.VITE_DEMO_BRAND_URL || DEFAULT_DEMO_BRAND_URL).trim(),
};

export function getDemoLegend(): string {
  const base = 'Marca, productos y precios de ejemplo — prototipo';
  const companyName = DEMO_BANNER_CONFIG.companyName;
  return companyName && companyName !== '[EMPRESA]' ? `${base} de ${companyName}` : base;
}

export function getValidDemoBannerLink(link: string): string | null {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}