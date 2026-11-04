export type SizeGuideConfig = {
  "$schema": string;
  "schemaVersion": number;
  "babySizes": ({
  "size": string;
  "suggestedAge": string;
  "heightCm": string;
  "weightKg": string;
  "totalLengthCm": number;
  "armholeWidthCm": number;
  "note": string;
  "x-group"?: unknown;
})[];
  "kidsSizes": ({
  "size": string;
  "suggestedAge": string;
  "heightCm": string;
  "weightKg": string;
  "chestCm": number;
  "waistCm": number;
  "totalLengthCm": number;
  "note": string;
  "x-group"?: unknown;
})[];
  "tips": {
  "mainTip": string;
  "parentAdvice": string;
  "measuringSteps": (string)[];
  "x-group"?: unknown;
};
  "x-group"?: unknown;
};
export type BabySizeRow = SizeGuideConfig["babySizes"][number];
export type KidSizeRow = SizeGuideConfig["kidsSizes"][number];
