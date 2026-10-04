import { BRAND_CONFIG } from '../brand.config';

export function createExternalReference() {
  const brandSlug = BRAND_CONFIG.shortName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${brandSlug}-${Date.now()}`;
}
