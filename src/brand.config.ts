/**
 * Envoltorio de la configuración: los datos editables viven en src/data/brand.json
 * (esquema en src/data/brand.schema.json; tabla de campos en docs/CAMPOS.md).
 * Los componentes siguen importando BRAND_CONFIG desde este archivo.
 */

import brandJson from './data/brand.json' with { type: 'json' };
import { getDemoLegend } from './demoBanner.config.ts';
import type { BrandConfig } from './generated/brand.types.ts';

export type { BrandConfig };

export const BRAND_CONFIG: BrandConfig = {
  ...(brandJson as BrandConfig),
  copy: {
    ...brandJson.copy,
    footerDisclaimer: getDemoLegend(),
  },
};

/** Reemplaza marcadores {clave} de un texto editable por sus valores. */
export function formatText(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? `{${key}}`);
}

/** Verdadero si el texto editable tiene contenido (los textos vacíos ocultan su elemento). */
export function hasText(value?: string | null): boolean {
  return typeof value === 'string' && value.trim() !== '';
}
