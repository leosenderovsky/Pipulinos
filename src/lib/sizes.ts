import type { Product } from '../data/products';

export type AgeStage = 'recien-nacidos' | 'bebes' | 'ninos';

export const STAGE_SIZES: Record<AgeStage, string[]> = {
  'recien-nacidos': ['RN', '0-3m', '3-6m', '6-9m', '9-12m'],
  bebes: ['12-18m', '18-24m', 'T2'],
  ninos: ['T4', 'T6', 'T8', 'T10'],
};

export const STAGE_MIN_SHARE = 0;

const STAGE_SET: Record<AgeStage, Set<string>> = Object.fromEntries(
  (Object.keys(STAGE_SIZES) as AgeStage[]).map((stage) => [stage, new Set(STAGE_SIZES[stage])])
) as Record<AgeStage, Set<string>>;

const isSizeInStage = (size: string, stage: AgeStage): boolean => {
  if (size === '0-12m') return stage === 'recien-nacidos';
  return STAGE_SET[stage].has(size);
};

const expandAliasSizes = (sizes: string[]): string[] =>
  sizes.flatMap((size) => {
    if (size === '0-12m') return STAGE_SIZES['recien-nacidos'];
    return [size];
  });

export const expandSizes = (sizes: string[]): string[] => expandAliasSizes(sizes);

export const stageAffinity = (product: Product, stage: AgeStage): number => {
  const talles = product.tallesDisponibles;
  if (talles.length === 0) return 0;
  const matchingCount = talles.filter((size) => isSizeInStage(size, stage)).length;
  return matchingCount / talles.length;
};

export const stagesOf = (product: Product): AgeStage[] => {
  if (product.etapasOverride) return product.etapasOverride;

  return (Object.keys(STAGE_SIZES) as AgeStage[]).filter((stage) => {
    const total = product.tallesDisponibles.length;
    if (total === 0) return false;
    const inStage = product.tallesDisponibles.filter((size) => isSizeInStage(size, stage)).length;
    return (inStage / total) > 0 && (inStage / total) >= STAGE_MIN_SHARE;
  });
};

export const productHasSize = (product: Product, size: string): boolean => {
  if (product.tallesDisponibles.includes(size)) return true;

  if (product.tallesDisponibles.includes('0-12m') && isSizeInStage(size, 'recien-nacidos')) {
    return true;
  }

  if (product.tallesDisponibles.includes('Talle Único') && product.etapasOverride) {
    return product.etapasOverride.some((stage) => isSizeInStage(size, stage));
  }

  return false;
};
