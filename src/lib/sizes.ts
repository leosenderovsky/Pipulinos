export type AgeStage = 'recien-nacidos' | 'bebes' | 'ninos';

export const STAGE_SIZES: Record<AgeStage, string[]> = {
  'recien-nacidos': ['RN', '0-3m', '3-6m', '6-9m', '9-12m'],
  bebes: ['12-18m', '18-24m', 'T2'],
  ninos: ['T4', 'T6', 'T8', 'T10'],
};

const ALL_SIZES = Object.values(STAGE_SIZES).flat();

export const expandSizes = (sizes: string[]): string[] =>
  sizes.flatMap((size) => {
    if (size === '0-12m') return STAGE_SIZES['recien-nacidos'];
    if (size === 'Talle Único') return ALL_SIZES;
    return [size];
  });

export const productHasSize = (sizes: string[], size: string): boolean =>
  expandSizes(sizes).includes(size);

export const stagesOf = (sizes: string[]): AgeStage[] => {
  const ex = new Set(expandSizes(sizes));
  return (Object.keys(STAGE_SIZES) as AgeStage[]).filter((stage) =>
    STAGE_SIZES[stage].some((value) => ex.has(value))
  );
};
