/**
 * Pipulinos - configuración central de marca.
 * La configuración editable está en src/data/brand.json.
 */
import brandData from './data/brand.json' with { type: 'json' };
import type { BrandConfig } from './generated/brand.types';

export const BRAND_CONFIG: BrandConfig = brandData as BrandConfig;
