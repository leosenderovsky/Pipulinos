export type CatalogConfig = {
  "$schema": string;
  "schemaVersion": number;
  "categories": ({
  "id": string;
  "label": string;
  "emoji": string;
  "x-group"?: unknown;
})[];
  "products": ({
  "id": string;
  "name": string;
  "category": string;
  "subcategory": string;
  "price": number;
  "compareAtPrice"?: number;
  "sizes": (string)[];
  "colors": ({
  "name": string;
  "hex": string;
  "colorFamily"?: "amarillo" | "coral" | "celeste" | "verde" | "lila" | "naranja" | "neutro";
  "x-group"?: unknown;
})[];
  "images": (string)[];
  "description": string;
  "shortDescription": string;
  "material": string;
  "badge"?: string;
  "badgeType"?: "destacado" | "oferta" | "nuevo" | "termico" | "pima";
  "features": (string)[];
  "careInstructions": (string)[];
  "stockBySize": Record<string, number>;
  "featured"?: boolean;
  "tags": ("body" | "algodon-pima" | "basico" | "abrigo" | "termico" | "suave" | "invierno" | "pijama" | "remera" | "pack" | "conjunto" | "jogging" | "friza" | "antideslizante" | "noche" | "jardinero" | "denim" | "calza" | "escarpines" | "accesorio" | "gorro" | "babero" | "recien-nacido" | "buzo" | "campera" | "polar" | "medias" | "rustico" | "comodo" | "vestido" | "verano" | "muselina" | "pantalon")[];
  "isBundle"?: boolean;
  "ageStagesOverride"?: ("recien-nacidos" | "bebes" | "ninos")[];
  "x-group"?: unknown;
})[];
  "filters": {
  "fabrics": (string)[];
  "babySizes": (string)[];
  "kidsSizes": (string)[];
  "colorSwatches": ({
  "id": string;
  "name": string;
  "hex": string;
  "x-group"?: unknown;
})[];
  "quickFilters": ({
  "id": string;
  "axis": "stage" | "tag";
  "value": string;
  "label": string;
  "emoji": string;
  "activeClass": string;
  "idleClass": string;
  "activeLabel"?: string;
  "x-group"?: unknown;
})[];
  "stageSizes": {
  "recien-nacidos": (string)[];
  "bebes": (string)[];
  "ninos": (string)[];
  "x-group"?: unknown;
};
  "x-group"?: unknown;
};
  "settings": {
  "crossSellCategory": string;
  "babySizeAlias": string;
  "singleSizeAlias": string;
  "x-group"?: unknown;
};
  "x-group"?: unknown;
};
export type Product = CatalogConfig["products"][number];
export type ProductColor = Product["colors"][number];
export type CatalogCategory = CatalogConfig["categories"][number];
export type QuickFilter = CatalogConfig["filters"]["quickFilters"][number];
export const TAG_VOCAB = [
  "body",
  "algodon-pima",
  "basico",
  "abrigo",
  "termico",
  "suave",
  "invierno",
  "pijama",
  "remera",
  "pack",
  "conjunto",
  "jogging",
  "friza",
  "antideslizante",
  "noche",
  "jardinero",
  "denim",
  "calza",
  "escarpines",
  "accesorio",
  "gorro",
  "babero",
  "recien-nacido",
  "buzo",
  "campera",
  "polar",
  "medias",
  "rustico",
  "comodo",
  "vestido",
  "verano",
  "muselina",
  "pantalon"
] as const;
export type ProductTag = (typeof TAG_VOCAB)[number];
export type AgeStage = "recien-nacidos" | "bebes" | "ninos";
