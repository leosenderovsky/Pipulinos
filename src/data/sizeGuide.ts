/**
 * GUÍA DE TALLES INFANTIL PIPULINOS
 * =================================
 * Fuente de datos independiente para tablas de medidas infantiles
 * por edad, meses y contextura física.
 */

export interface BabySizeRow {
  talle: string;
  edadSugerida: string;
  alturaCm: string;
  pesoKg: string;
  largoTotalCm: number;
  anchoSisaCm: number;
  nota?: string;
}

export interface KidSizeRow {
  talle: string;
  edadSugerida: string;
  alturaCm: string;
  pesoKg: string;
  pechoCm: number;
  cinturaCm: number;
  largoTotalCm: number;
  nota?: string;
}

export const BABY_SIZE_GUIDE: BabySizeRow[] = [
  {
    talle: 'RN',
    edadSugerida: '0 a 1 mes',
    alturaCm: 'Hasta 52 cm',
    pesoKg: 'Hasta 3.5 kg',
    largoTotalCm: 34,
    anchoSisaCm: 18,
    nota: 'Ideal bolso de maternidad',
  },
  {
    talle: '0-3m',
    edadSugerida: '1 a 3 meses',
    alturaCm: '52 - 62 cm',
    pesoKg: '3.5 - 5.5 kg',
    largoTotalCm: 37,
    anchoSisaCm: 20,
    nota: 'Primeros paseos',
  },
  {
    talle: '3-6m',
    edadSugerida: '3 a 6 meses',
    alturaCm: '62 - 68 cm',
    pesoKg: '5.5 - 7.5 kg',
    largoTotalCm: 40,
    anchoSisaCm: 22,
    nota: 'Comienza a girar y jugar',
  },
  {
    talle: '6-9m',
    edadSugerida: '6 a 9 meses',
    alturaCm: '68 - 74 cm',
    pesoKg: '7.5 - 9.0 kg',
    largoTotalCm: 43,
    anchoSisaCm: 24,
    nota: 'Primeras comidas y gateo',
  },
  {
    talle: '9-12m',
    edadSugerida: '9 a 12 meses',
    alturaCm: '74 - 80 cm',
    pesoKg: '9.0 - 10.5 kg',
    largoTotalCm: 46,
    anchoSisaCm: 25,
    nota: 'De pie y primeros apoyos',
  },
  {
    talle: '12-18m',
    edadSugerida: '12 a 18 meses',
    alturaCm: '80 - 86 cm',
    pesoKg: '10.5 - 12.0 kg',
    largoTotalCm: 49,
    anchoSisaCm: 27,
    nota: 'Primeros pasos independientes',
  },
  {
    talle: '18-24m',
    edadSugerida: '18 a 24 meses',
    alturaCm: '86 - 92 cm',
    pesoKg: '12.0 - 13.5 kg',
    largoTotalCm: 52,
    anchoSisaCm: 29,
    nota: 'Exploradores activos',
  },
];

export const KIDS_SIZE_GUIDE: KidSizeRow[] = [
  {
    talle: 'T2',
    edadSugerida: '2 a 3 años',
    alturaCm: '92 - 98 cm',
    pesoKg: '13 - 15 kg',
    pechoCm: 53,
    cinturaCm: 51,
    largoTotalCm: 42,
    nota: 'Jardín maternal',
  },
  {
    talle: 'T4',
    edadSugerida: '3 a 4 años',
    alturaCm: '98 - 106 cm',
    pesoKg: '15 - 18 kg',
    pechoCm: 56,
    cinturaCm: 53,
    largoTotalCm: 46,
    nota: 'Salita de 3 y 4',
  },
  {
    talle: 'T6',
    edadSugerida: '5 a 6 años',
    alturaCm: '106 - 116 cm',
    pesoKg: '18 - 22 kg',
    pechoCm: 60,
    cinturaCm: 56,
    largoTotalCm: 50,
    nota: 'Preescolar / Primaria',
  },
  {
    talle: 'T8',
    edadSugerida: '7 a 8 años',
    alturaCm: '116 - 126 cm',
    pesoKg: '22 - 27 kg',
    pechoCm: 64,
    cinturaCm: 59,
    largoTotalCm: 54,
    nota: 'Juegos y aire libre',
  },
  {
    talle: 'T10',
    edadSugerida: '9 a 10 años',
    alturaCm: '126 - 136 cm',
    pesoKg: '27 - 33 kg',
    pechoCm: 68,
    cinturaCm: 62,
    largoTotalCm: 58,
    nota: 'Ropa duradera escolar',
  },
];

export const SIZE_GUIDE_TIPS = {
  mainTip: 'El algodón Pima y las telas de punto ceden cómodamente entre un 8% y 12% para permitir libertad total de movimiento.',
  parentAdvice: 'Si dudás entre dos talles, te aconsejamos elegir el más grande: las prendas durarán mucho más y las botamangas o puños se pueden arremangar cómodamente.',
  measuringSteps: [
    'Apoyá una prenda que le quede cómoda sobre una superficie plana (mesa o cama).',
    'Medí el largo total desde el punto más alto del hombro hasta la botamanga o broches inferiores.',
    'Medí el ancho de sisa a sisa (de axila a axila) en línea recta.',
    'Compará esos centímetros con los valores de nuestra tabla.',
  ],
};
