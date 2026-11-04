import sizeGuideData from './size-guide.json' with { type: 'json' };
import type { BabySizeRow, KidSizeRow, SizeGuideConfig } from '../generated/size-guide.types';

const sizeGuide = sizeGuideData as SizeGuideConfig;

export type { BabySizeRow, KidSizeRow };
export const BABY_SIZE_GUIDE: BabySizeRow[] = sizeGuide.babySizes;
export const KIDS_SIZE_GUIDE: KidSizeRow[] = sizeGuide.kidsSizes;
export const SIZE_GUIDE_TIPS = sizeGuide.tips;
