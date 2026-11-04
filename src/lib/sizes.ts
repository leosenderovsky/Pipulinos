import { BABY_SIZE_ALIAS, CATALOG_CONFIG, SINGLE_SIZE_ALIAS } from '../catalog';
import type { AgeStage, Product } from '../catalog';

export const STAGE_SIZES: Record<AgeStage, string[]> = CATALOG_CONFIG.filters.stageSizes;

const STAGE_SET: Record<AgeStage, Set<string>> = Object.fromEntries(
  (Object.keys(STAGE_SIZES) as AgeStage[]).map((stage) => [stage, new Set(STAGE_SIZES[stage])])
) as Record<AgeStage, Set<string>>;

const isSizeInStage = (size: string, stage: AgeStage): boolean => {
  if (size === BABY_SIZE_ALIAS) return stage === 'recien-nacidos';
  return STAGE_SET[stage].has(size);
};

const expandAliasSizes = (sizes: string[]): string[] =>
  sizes.flatMap((size) => {
    if (size === BABY_SIZE_ALIAS) return STAGE_SIZES['recien-nacidos'];
    return [size];
  });

export const expandSizes = (sizes: string[]): string[] => expandAliasSizes(sizes);

export const stageAffinity = (product: Product, stage: AgeStage): number => {
  const talles = product.sizes;
  if (talles.length === 0) return 0;
  const matchingCount = talles.filter((size) => isSizeInStage(size, stage)).length;
  return matchingCount / talles.length;
};

export const stagesOf = (product: Product): AgeStage[] => {
  if (product.ageStagesOverride) return product.ageStagesOverride;

  return (Object.keys(STAGE_SIZES) as AgeStage[]).filter((stage) => {
    const total = product.sizes.length;
    if (total === 0) return false;
    const inStage = product.sizes.filter((size) => isSizeInStage(size, stage)).length;
    return inStage > 0;
  });
};

export const productHasSize = (product: Product, size: string): boolean => {
  if (product.sizes.includes(size)) return true;

  if (product.sizes.includes(BABY_SIZE_ALIAS) && isSizeInStage(size, 'recien-nacidos')) {
    return true;
  }

  if (product.sizes.includes(SINGLE_SIZE_ALIAS) && product.ageStagesOverride) {
    return product.ageStagesOverride.some((stage) => isSizeInStage(size, stage));
  }

  return false;
};
