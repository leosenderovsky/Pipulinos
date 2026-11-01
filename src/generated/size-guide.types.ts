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
})[];
  "tips": {
  "mainTip": string;
  "parentAdvice": string;
  "measuringSteps": (string)[];
};
};
export type BabySizeRow = SizeGuideConfig["babySizes"][number];
export type KidSizeRow = SizeGuideConfig["kidsSizes"][number];
