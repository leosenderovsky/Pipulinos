/**
 * CATÁLOGO DE PRODUCTOS PIPULINOS
 * =================================
 * Fuente de datos separada y desacoplada del JSX.
 * En el futuro este archivo puede sustituirse por una llamada a Firestore/Firebase
 * manteniendo exactamente la misma firma y tipos.
 */

export interface ProductColor {
  name: string;
  hex: string;
  colorFamily?: 'amarillo' | 'coral' | 'celeste' | 'verde' | 'lila' | 'naranja' | 'neutro';
}

export type AgeStage = 'recien-nacidos' | 'bebes' | 'ninos';

export const TAG_VOCAB = [
  'body',
  'algodon-pima',
  'basico',
  'abrigo',
  'termico',
  'suave',
  'invierno',
  'pijama',
  'remera',
  'pack',
  'conjunto',
  'jogging',
  'friza',
  'antideslizante',
  'noche',
  'jardinero',
  'denim',
  'calza',
  'escarpines',
  'accesorio',
  'gorro',
  'babero',
  'recien-nacido',
  'buzo',
  'campera',
  'polar',
  'medias',
  'rustico',
  'comodo',
  'vestido',
  'verano',
  'muselina',
  'pantalon',
] as const;

export type ProductTag = typeof TAG_VOCAB[number];

export interface Product {
  id: string;
  nombre: string;
  categoria: 'Bodys & Enteritos' | 'Remeras & Tops' | 'Pantalones & Calzas' | 'Pijamas & Abrigo' | 'Accesorios & Packs';
  subcategoria?: string;
  precio: number;
  precioAnterior?: number;
  tallesDisponibles: string[];
  coloresDisponibles: ProductColor[];
  imagenes: string[];
  descripcion: string;
  descripcionCorta?: string;
  tela: string;
  etiqueta?: string;
  badgeType?: 'destacado' | 'oferta' | 'nuevo' | 'termico' | 'pima';
  etapasOverride?: AgeStage[];
  caracteristicas: string[];
  cuidados: string[];
  stockPorTalle?: Record<string, number>;
  destacado?: boolean;
  esPack?: boolean;
  tags?: ProductTag[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'body-manga-larga-algodon-pima',
    nombre: 'Body Manga Larga Algodón Pima Estampado Estrellitas',
    categoria: 'Bodys & Enteritos',
    subcategoria: 'Bodys',
    precio: 12500,
    precioAnterior: 14200,
    tallesDisponibles: ['RN', '0-3m', '3-6m', '6-9m', '9-12m', '12-18m'],
    coloresDisponibles: [
      { name: 'Amarillo Sol', hex: '#FFD026', colorFamily: 'amarillo' },
      { name: 'Celeste Pastel', hex: '#93C5FD', colorFamily: 'celeste' },
      { name: 'Rosa Melocotón', hex: '#FFB4A8', colorFamily: 'coral' },
      { name: 'Blanco Nube', hex: '#FAF9F6', colorFamily: 'neutro' },
    ],
    imagenes: [
      '/assets/products/body-manga-larga-algodon-pima.jpg',
      '/assets/products/body-manga-larga-algodon-pima-2.jpg',
      '/assets/products/body-manga-larga-algodon-pima-3.jpg',
      '/assets/products/body-manga-larga-algodon-pima-4.jpg',
    ],
    descripcion:
      'Confeccionado artesanalmente en 100% Algodón Pima puro peinado, este body brinda la caricia más suave para la piel sensible de tu bebé. Su cuello americano extensible permite deslizarlo hacia abajo sin apretar las orejitas en caso de cambios de emergencia, mientras sus broches metálicos reforzados libres de níquel garantizan máxima seguridad y durabilidad lavado tras lavado.',
    descripcionCorta: '100% Pima peinado con broches hipoalergénicos y cuello americano extensible.',
    tela: '100% Algodón Pima',
    etiqueta: '¡Más pedido!',
    badgeType: 'pima',
    caracteristicas: [
      'Algodón Pima peruano de fibra extra larga',
      'Cuello americano expandible anti-tirones',
      'Broches pañaleros reforzados libres de níquel y plomo',
      'Costuras planas que evitan cualquier tipo de roce o picazón',
      'Etiqueta impresa al agua sin raspaduras',
    ],
    cuidados: [
      'Lavar con agua fría a mano o ciclo delicado',
      'Usar jabón blanco neutro especial para bebés',
      'Secar a la sombra sin calor directo',
      'Planchar a temperatura moderada del revés',
    ],
    stockPorTalle: { RN: 2, '0-3m': 8, '3-6m': 14, '6-9m': 9, '9-12m': 11, '12-18m': 6 },
    destacado: true,
    tags: ['body', 'algodon-pima', 'basico'],
  },
  {
    id: 'enterito-osito-termico-plush',
    nombre: 'Enterito Osito Térmico Plush Soft con Cierre Doble Vía',
    categoria: 'Pijamas & Abrigo',
    subcategoria: 'Enteritos Térmicos',
    precio: 22900,
    tallesDisponibles: ['0-3m', '3-6m', '6-9m', '9-12m', '12-18m'],
    coloresDisponibles: [
      { name: 'Beige Avena', hex: '#D7C4B7', colorFamily: 'neutro' },
      { name: 'Amarillo Pastel', hex: '#FFD026', colorFamily: 'amarillo' },
      { name: 'Celeste Suave', hex: '#93C5FD', colorFamily: 'celeste' },
    ],
    imagenes: [
      '/assets/products/enterito-osito-termico-plush.jpg',
      '/assets/products/enterito-osito-termico-plush-2.jpg',
    ],
    descripcion:
      'Enterito ultra abrigado en plush térmico soft con capucha con orejitas 3D de osito. Cuenta con un innovador cierre frontal de doble vía con solapa protectora para cambiar los pañales de noche sin desabrigar el pecho de tu peque.',
    descripcionCorta: 'Plush térmico con orejitas 3D y cierre doble vía para cambio nocturno fácil.',
    tela: 'Plush & Friza Abrigada',
    etiqueta: 'Térmico Plush',
    badgeType: 'termico',
    caracteristicas: [
      'Plush térmico de alto gramaje ultra mullido',
      'Cierre frontal doble dirección desde cuello hasta piernita',
      'Capucha anatómica forrada en interlock de algodón',
      'Puños reversibles para tapar manitos en días frescos',
    ],
    cuidados: [
      'Lavar del revés con prendas suaves',
      'Centrifugado suave',
      'No planchar sobre el plush para preservar su volumen',
    ],
    stockPorTalle: { '0-3m': 5, '3-6m': 10, '6-9m': 7, '9-12m': 4, '12-18m': 6 },
    destacado: true,
    tags: ['abrigo', 'termico', 'suave', 'invierno'],
  },
  {
    id: 'pack-x3-remeras-basicas',
    nombre: 'Pack x3 Remeras Básicas Algodón Peinado Unisex',
    categoria: 'Remeras & Tops',
    subcategoria: 'Packs Básicos',
    precio: 26800,
    precioAnterior: 32000,
    tallesDisponibles: ['T2', 'T4', 'T6', 'T8', 'T10'],
    coloresDisponibles: [
      { name: 'Trío Selva & Sol (Verde/Amarillo/Coral)', hex: '#2DD382', colorFamily: 'verde' },
      { name: 'Trío Pastel Nube (Celeste/Lila/Crudo)', hex: '#8B5CF6', colorFamily: 'lila' },
    ],
    imagenes: ['/assets/products/pack-x3-remeras-basicas.jpg'],
    descripcion:
      'Un esencial infalible para el guardarropa infantil. Tres remeras clásicas de cuello redondo reforzado con rib elástico que mantiene su forma tras incontables lavados. Confeccionadas en algodón peinado 24/1 de textura suave, transpirable y resistente para jugar sin parar.',
    descripcionCorta: 'Pack ahorro con 3 remeras básicas de algodón peinado 24/1 duradero.',
    tela: 'Algodón Peinado 24/1',
    etiqueta: '15% OFF Pack',
    badgeType: 'oferta',
    caracteristicas: [
      'Algodón 100% peinado cardado premium',
      'Cuello en rib elastizado con cubre-costura reforzada',
      'Teñido con colorantes ecológicos reactivos',
      'Corte amplio para máxima comodidad en movimiento',
    ],
    cuidados: [
      'Lavar con colores similares',
      'No usar lavandina ni blanqueadores',
      'Planchar a temperatura media',
    ],
    stockPorTalle: { T2: 12, T4: 15, T6: 8, T8: 9, T10: 5 },
    destacado: true,
    esPack: true,
    tags: ['remera', 'pack', 'basico'],
  },
  {
    id: 'conjunto-jogging-friza-soft',
    nombre: 'Conjunto Jogging Friza Soft & Buzo Canguro Pipulino',
    categoria: 'Pantalones & Calzas',
    subcategoria: 'Conjuntos',
    precio: 28500,
    tallesDisponibles: ['T4', 'T6', 'T8', 'T10'],
    coloresDisponibles: [
      { name: 'Arena Melange', hex: '#E7DFD5', colorFamily: 'neutro' },
      { name: 'Lila Ensueño', hex: '#DDD6FE', colorFamily: 'lila' },
      { name: 'Amarillo Mostaza', hex: '#FFD026', colorFamily: 'amarillo' },
      { name: 'Naranja Mango', hex: '#FF8A1E', colorFamily: 'naranja' },
    ],
    imagenes: ['/assets/products/conjunto-jogging-friza-soft.jpg'],
    descripcion:
      'Conjunto urbano y relajado diseñado para abrigar sin pesar. Incluye buzo con bolsillo canguro amplio y capucha forrada, más pantalón jogger con cintura elastizada suave y cordón ajustable decorativo. Interior en friza suave peinada que no desprende pelusas.',
    descripcionCorta: 'Buzo canguro con capucha + pantalón jogger frizado calentito.',
    tela: 'Plush & Friza Abrigada',
    etiqueta: 'Nuevo Lanzamiento',
    badgeType: 'nuevo',
    caracteristicas: [
      'Friza invisible peinada que no hace bolitas',
      'Cintura elastizada con puños en rib en tobillos',
      'Bolsillo canguro funcional y amplio',
      'Bordado delicado Pipulinos tono sobre tono',
    ],
    cuidados: [
      'Lavar con agua fría para mantener el perchado interior',
      'Secado en plano o colgado a la sombra',
    ],
    stockPorTalle: { T4: 7, T6: 12, T8: 9, T10: 4 },
    destacado: true,
    tags: ['conjunto', 'jogging', 'friza', 'abrigo', 'invierno', 'suave'],
  },
  {
    id: 'pijama-enterizo-antideslizante',
    nombre: 'Pijama Enterizo Algodón con Pies Antideslizantes',
    categoria: 'Pijamas & Abrigo',
    subcategoria: 'Pijamas Enteros',
    precio: 16900,
    tallesDisponibles: ['6-9m', '9-12m', '12-18m', '18-24m'],
    coloresDisponibles: [
      { name: 'Lila Pastel', hex: '#C4B5FD', colorFamily: 'lila' },
      { name: 'Celeste Cielo', hex: '#60A5FA', colorFamily: 'celeste' },
      { name: 'Naranja Naranja', hex: '#FF8A1E', colorFamily: 'naranja' },
    ],
    imagenes: ['/assets/products/pijama-enterizo-antideslizante.jpg'],
    descripcion:
      'El pijama ideal para noches de sueño ininterrumpido. Tejido en rib acanalado de algodón con memoria elástica, incluye suelas con apliques antideslizantes de silicona segura para peques que ya gatean o dan sus primeros pasitos por la casa.',
    descripcionCorta: 'Rib suave acanalado con suelas antideslizantes de silicona.',
    tela: 'Rústico con Lycra',
    etiqueta: 'Con Antideslizante',
    badgeType: 'destacado',
    caracteristicas: [
      'Suela antideslizante con textura de estrellitas',
      'Cierre frontal de cuello a tobillo con protector de barbilla',
      'Puños elastizados en muñecas que no aprietan',
    ],
    cuidados: [
      'Lavar del revés para preservar el antideslizante',
      'No centrifugar a máximas revoluciones',
    ],
    stockPorTalle: { '6-9m': 6, '9-12m': 11, '12-18m': 10, '18-24m': 7 },
    tags: ['pijama', 'suave', 'antideslizante', 'noche'],
  },
  {
    id: 'jardinero-denim-liviano',
    nombre: 'Jardinero Denim Liviano Elastizado Especial Juego',
    categoria: 'Bodys & Enteritos',
    subcategoria: 'Jardineros',
    precio: 24200,
    tallesDisponibles: ['T2', 'T4', 'T6'],
    coloresDisponibles: [
      { name: 'Azul Índigo Soft', hex: '#0284C7', colorFamily: 'celeste' },
      { name: 'Celeste Desgastado', hex: '#38BDF8' },
    ],
    imagenes: ['/assets/products/jardinero-denim-liviano.jpg'],
    descripcion:
      'Un clásico reinventado para la infancia moderna. Este jardinero confeccionado en denim camisero ultra liviano cuenta con un 3% de elastano que permite agacharse, trepar y jugar sin ninguna rigidez. Tiradores con botones de madera regulables en dos alturas.',
    descripcionCorta: 'Denim fino 5oz elastizado con botones de madera regulables.',
    tela: 'Denim Ultra Soft',
    etiqueta: 'Denim Ultra Soft',
    badgeType: 'destacado',
    caracteristicas: [
      'Denim liviano de 5.5 oz (no acalora ni pesa)',
      'Tiradores ajustables con 2 posiciones de ojal',
      'Bolsillo frontal plaqué porta-tesoros',
      'Botones de madera natural pulida',
    ],
    cuidados: [
      'Lavar con prendas del mismo tono',
      'Secado al aire libre',
    ],
    stockPorTalle: { T2: 8, T4: 6, T6: 4 },
    tags: ['jardinero', 'denim'],
  },
  {
    id: 'vestido-solero-muselina',
    nombre: 'Vestido Solero Muselina Algodón Estampado Flores',
    categoria: 'Remeras & Tops',
    subcategoria: 'Vestidos & Soleros',
    precio: 19400,
    tallesDisponibles: ['T2', 'T4', 'T6', 'T8'],
    coloresDisponibles: [
      { name: 'Terracota Silvestre', hex: '#FF6B57', colorFamily: 'coral' },
      { name: 'Vainilla Floral', hex: '#FEF08A', colorFamily: 'amarillo' },
    ],
    imagenes: ['/assets/products/vestido-solero-muselina.jpg'],
    descripcion:
      'Fresco, vaporoso y lleno de encanto campestre. Confeccionado en doble gasa de muselina 100% algodón orgánico pre-lavado con textura arrugadita natural. Tirantes anchos con lazo y falda con frunce delicado que no requiere plancha.',
    descripcionCorta: 'Doble gasa de muselina orgánica liviana con estampa botánica suave.',
    tela: 'Muselina Pura',
    etiqueta: 'Muselina Pura',
    badgeType: 'destacado',
    caracteristicas: [
      'Doble gasa de muselina 100% algodón',
      'Textura pre-lavada que no necesita planchado',
      'Tirantes cruzados en espalda con ajuste cómodo',
    ],
    cuidados: [
      'Lavar en agua fría con centrifugado bajo',
      'No requiere planchado',
    ],
    stockPorTalle: { T2: 5, T4: 8, T6: 7, T8: 3 },
    tags: ['vestido', 'verano', 'muselina'],
  },
  {
    id: 'calza-termica-suave-estampada',
    nombre: 'Calza Térmica Suave Estampada Corazones & Estrellas',
    categoria: 'Pantalones & Calzas',
    subcategoria: 'Calzas Térmicas',
    precio: 9800,
    tallesDisponibles: ['RN', '0-3m', '3-6m', '6-9m', '9-12m', 'T2', 'T4'],
    coloresDisponibles: [
      { name: 'Lila Estrellas', hex: '#C084FC', colorFamily: 'lila' },
      { name: 'Coral Corazones', hex: '#FB7185', colorFamily: 'coral' },
      { name: 'Verde Salvia Mini', hex: '#4ADE80', colorFamily: 'verde' },
    ],
    imagenes: ['/assets/products/calza-termica-suave-estampada.jpg'],
    descripcion:
      'Calza indispensable para todos los días en interlock térmico peinado con lycra. Elástica, suave y calentita, se adapta a pañales descartables o de tela sin comprimir la pancita gracias a su cintura elástica ancha embutida.',
    descripcionCorta: 'Interlock térmico elastizado con cintura ancha sin presión en la panza.',
    tela: 'Rústico con Lycra',
    etiqueta: 'Básico Esencial',
    badgeType: 'destacado',
    caracteristicas: [
      'Interlock de algodón con spandex hipoalergénico',
      'Cintura ancha que no marca la piel del bebé',
      'Estampas serigráficas al agua libres de ftalatos',
    ],
    cuidados: [
      'Lavado estándar en lavarropas con agua fría',
      'Apta secarropas en temperatura baja',
    ],
    stockPorTalle: { RN: 6, '0-3m': 10, '3-6m': 14, '6-9m': 9, '9-12m': 12, T2: 8, T4: 5 },
    tags: ['calza', 'termico', 'suave', 'invierno'],
  },
  {
    id: 'pack-x2-escarpines-soft',
    nombre: 'Pack x2 Escarpines Soft Tejidos Algodón',
    categoria: 'Accesorios & Packs',
    subcategoria: 'Escarpines',
    precio: 4900,
    tallesDisponibles: ['0-12m'],
    coloresDisponibles: [
      { name: 'Crudo & Arena', hex: '#FAF9F6', colorFamily: 'neutro' },
      { name: 'Celeste & Blanco', hex: '#93C5FD', colorFamily: 'celeste' },
    ],
    imagenes: ['/assets/products/pack-x2-escarpines-soft.jpg'],
    descripcion:
      'Dúo de escarpines tejidos en hilo de algodón hipoalergénico con puño doble que sujeta suavemente sin caerse.',
    descripcionCorta: 'Dúo de escarpines con puño elastizado que no se cae.',
    tela: '100% Algodón Pima',
    caracteristicas: ['Hilo 100% algodón', 'Puño elastizado anatómico', 'Sin costuras internas'],
    cuidados: ['Lavar a mano'],
    stockPorTalle: { '0-12m': 25 },
    tags: ['escarpines', 'pack', 'suave', 'accesorio'],
    esPack: true,
  },
  {
    id: 'babero-bandana-gotitas',
    nombre: 'Babero Bandana Gotitas Gasa Muselina',
    categoria: 'Accesorios & Packs',
    subcategoria: 'Baberos',
    precio: 3800,
    tallesDisponibles: ['Talle Único'],
    coloresDisponibles: [
      { name: 'Mostaza Sol', hex: '#EAB308', colorFamily: 'amarillo' },
      { name: 'Coral Dulce', hex: '#FB7185', colorFamily: 'coral' },
    ],
    imagenes: ['/assets/products/babero-bandana-gotitas.jpg'],
    descripcion:
      'Babero bandana con triple capa absorbente: gasa de muselina externa y toalla de algodón interna para absorber babitas durante la dentición.',
    descripcionCorta: 'Gasa muselina con reverso de toalla absorbente y doble broche.',
    tela: 'Muselina Pura',
    caracteristicas: ['Triple capa absorbente', '2 broches para regular el cuello', 'Secado ultra rápido'],
    cuidados: ['Lavar en lavarropas con agua tibia'],
    stockPorTalle: { 'Talle Único': 30 },
    etapasOverride: ['recien-nacidos', 'bebes'],
    tags: ['babero', 'accesorio'],
  },
  {
    id: 'gorro-nudo-recien-nacido',
    nombre: 'Gorro Nudo Recién Nacido Morley Elastizado',
    categoria: 'Accesorios & Packs',
    subcategoria: 'Gorritos',
    precio: 4200,
    tallesDisponibles: ['RN', '0-3m'],
    coloresDisponibles: [
      { name: 'Celeste Pastel', hex: '#93C5FD', colorFamily: 'celeste' },
      { name: 'Amarillo Vainilla', hex: '#FEF08A', colorFamily: 'amarillo' },
    ],
    imagenes: ['/assets/products/gorro-nudo-recien-nacido.jpg'],
    descripcion:
      'Gorrito de maternidad en morley elastizado ultra suave con nudo regulable para ajustar la profundidad a la cabecita del bebé.',
    descripcionCorta: 'Morley elastizado con nudo superior regulable.',
    tela: '100% Algodón Pima',
    caracteristicas: ['Nudo regulable', 'Tejido morley elástico', 'Ideal para primeras horas de vida'],
    cuidados: ['Lavar con agua fría'],
    stockPorTalle: { RN: 18, '0-3m': 20 },
    tags: ['gorro', 'accesorio', 'recien-nacido'],
  },
  {
    id: 'pijama-dos-piezas-algodon-suavecito',
    nombre: 'Pijama Dos Piezas Algodón Suavecito Estampado Nubes & Estrellas',
    categoria: 'Pijamas & Abrigo',
    subcategoria: 'Pijamas Dos Piezas',
    precio: 17900,
    tallesDisponibles: ['T2', 'T4', 'T6', 'T8', 'T10'],
    coloresDisponibles: [
      { name: 'Celeste Suave', hex: '#93C5FD', colorFamily: 'celeste' },
      { name: 'Lila Nube', hex: '#C4B5FD', colorFamily: 'lila' },
      { name: 'Amarillo Pastel', hex: '#FFD026', colorFamily: 'amarillo' },
    ],
    imagenes: [
      '/assets/products/pijama-dos-piezas-algodon-suavecito.jpg',
      '/assets/products/pijama-dos-piezas-algodon-suavecito-2.jpg',
    ],
    descripcion:
      'Este pijama de dos piezas está pensado para noches más relajadas y mañanas con sonrisas. La tela de algodón pima es ultra suave sobre la piel y se siente tibia sin apretar, ideal para dormir en calma. Con su estampado de nubes y estrellas, queda divino para jugar antes de irse a la cama.',
    descripcionCorta: 'Pijama de dos piezas en algodón pima con estampado suave para dormir y jugar.',
    tela: '100% Algodón Pima',
    etiqueta: 'Nuevo en la colección',
    badgeType: 'nuevo',
    caracteristicas: [
      'Algodón pima suave y respirable',
      'Estampado de nubes y estrellas en tonos pastel',
      'Corte holgado para moverse con libertad',
      'Pantalón con cintura elástica y cómodo',
    ],
    cuidados: [
      'Lavar a máquina con agua fría',
      'Usar ciclo delicado para cuidar la tela',
      'No usar blanqueador',
      'Secar a la sombra para mantener el color',
    ],
    stockPorTalle: { T2: 8, T4: 12, T6: 9, T8: 7, T10: 6 },
    destacado: true,
    tags: ['pijama', 'suave', 'algodon-pima', 'noche'],
  },
  {
    id: 'pijama-enterito-pima-recien-nacido',
    nombre: 'Pijama Enterito Pima Cierre Frontal Recién Nacido',
    categoria: 'Pijamas & Abrigo',
    subcategoria: 'Pijamas Enteros',
    precio: 15900,
    tallesDisponibles: ['RN', '0-3m', '3-6m', '6-9m'],
    coloresDisponibles: [
      { name: 'Blanco Nube', hex: '#FAF9F6', colorFamily: 'neutro' },
      { name: 'Rosa Melocotón', hex: '#FFB4A8', colorFamily: 'coral' },
      { name: 'Celeste Pastel', hex: '#93C5FD', colorFamily: 'celeste' },
    ],
    imagenes: [
      '/assets/products/pijama-enterito-pima-recien-nacido.jpg',
      '/assets/products/pijama-enterito-pima-recien-nacido-2.jpg',
    ],
    descripcion:
      'Este enterito de algodón pima está pensado para las horas más suaves del día. Tiene cierre frontal para cambiarlo sin complicaciones y una tela muy liviana que se siente bien en la piel del bebé. Es una opción fresca, cómoda y alegre para dormir o descansar en casa.',
    descripcionCorta: 'Enterito de algodón pima con cierre frontal y tela suave para recién nacidos.',
    tela: '100% Algodón Pima',
    etiqueta: 'Ideal para recién nacidos',
    caracteristicas: [
      'Algodón pima elastizado con tacto aterciopelado',
      'Cierre frontal práctico para cambios rápidos',
      'Corte clásico con libertad para mover piernas',
      'Muy suave en la piel sensible del bebé',
    ],
    cuidados: [
      'Lavar en agua fría',
      'Usar detergente suave',
      'No secar en calor fuerte',
      'Planchar a baja temperatura si hace falta',
    ],
    stockPorTalle: { RN: 10, '0-3m': 12, '3-6m': 11, '6-9m': 9 },
    destacado: true,
    tags: ['pijama', 'suave', 'algodon-pima', 'recien-nacido'],
  },
  {
    id: 'buzo-canguro-friza-ninos',
    nombre: 'Buzo Canguro Friza Soft con Capucha y Bolsillo',
    categoria: 'Pijamas & Abrigo',
    subcategoria: 'Buzos & Camperas',
    precio: 21500,
    tallesDisponibles: ['T2', 'T4', 'T6', 'T8', 'T10'],
    coloresDisponibles: [
      { name: 'Naranja Mandarina', hex: '#FF8A1E', colorFamily: 'naranja' },
      { name: 'Beige Avena', hex: '#D7C4B7', colorFamily: 'neutro' },
      { name: 'Verde Selva', hex: '#2DD382', colorFamily: 'verde' },
    ],
    imagenes: [
      '/assets/products/buzo-canguro-friza-ninos.jpg',
      '/assets/products/buzo-canguro-friza-ninos-2.jpg',
    ],
    descripcion:
      'Buzo canguro de friza ultra suave para los días más frescos del año. Tiene capucha, bolsillo canguro y un corte cómodo que deja mover brazos y piernas sin esfuerzo. Es una prenda ideal para andar abrigado y seguir jugando en casa o afuera.',
    descripcionCorta: 'Buzo con capucha y bolsillo en friza suave para días frescos.',
    tela: 'Plush & Friza Abrigada',
    caracteristicas: [
      'Friza suave y abrigada sin ser pesada',
      'Capucha con ajuste cómodo para la cabeza',
      'Bolsillo canguro funcional y amplio',
      'Corte relajado pensado para jugar todo el día',
    ],
    cuidados: [
      'Lavar del revés con agua fría',
      'No usar lejía ni blanqueadores',
      'Secar a temperatura baja',
      'Evitar planchado sobre la friza',
    ],
    stockPorTalle: { T2: 6, T4: 10, T6: 9, T8: 8, T10: 7 },
    destacado: true,
    tags: ['abrigo', 'buzo', 'friza', 'invierno', 'suave'],
  },
  {
    id: 'campera-polar-soft-orejitas',
    nombre: 'Campera Polar Soft con Capucha y Orejitas',
    categoria: 'Pijamas & Abrigo',
    subcategoria: 'Buzos & Camperas',
    precio: 26900,
    tallesDisponibles: ['6-9m', '9-12m', '12-18m', '18-24m'],
    coloresDisponibles: [
      { name: 'Amarillo Pastel', hex: '#FFD026', colorFamily: 'amarillo' },
      { name: 'Beige Avena', hex: '#D7C4B7', colorFamily: 'neutro' },
      { name: 'Celeste Suave', hex: '#93C5FD', colorFamily: 'celeste' },
    ],
    imagenes: [
      '/assets/products/campera-polar-soft-orejitas.jpg',
      '/assets/products/campera-polar-soft-orejitas-2.jpg',
    ],
    descripcion:
      'Esta camperita polar tiene ese abrigo suave y calentito que hace la diferencia en los días fríos. La capucha con orejitas le suma un toque adorable y el tejido es tan cómodo que no pesa ni aprieta. Es perfecta para salir a pasear, tomar un mate en casa o dormir con la tranquilidad que te da la temperatura ideal.',
    descripcionCorta: 'Campera de polar suave con capucha y orejitas para días frescos.',
    tela: 'Plush & Friza Abrigada',
    etiqueta: 'Polar suave',
    badgeType: 'termico',
    caracteristicas: [
      'Polar suave con abrigo térmico interior',
      'Capucha con orejitas para un look adorable',
      'Cierre frontal fácil y seguro',
      'Ideal para días fríos y salidas cortitas',
    ],
    cuidados: [
      'Lavar a máquina en frío',
      'No usar secadora a calor alto',
      'Cuidar la capucha para mantener su forma',
      'Secar a la sombra',
    ],
    stockPorTalle: { '6-9m': 7, '9-12m': 9, '12-18m': 8, '18-24m': 6 },
    destacado: true,
    tags: ['abrigo', 'campera', 'polar', 'termico', 'invierno'],
  },
  {
    id: 'pack-x3-bodys-manga-corta-pima',
    nombre: 'Pack x3 Bodys Manga Corta Algodón Pima Básicos',
    categoria: 'Bodys & Enteritos',
    subcategoria: 'Bodys',
    precio: 23900,
    precioAnterior: 27500,
    tallesDisponibles: ['RN', '0-3m', '3-6m', '6-9m', '9-12m'],
    coloresDisponibles: [
      { name: 'Trío Pastel (Blanco/Celeste/Coral)', hex: '#FAF9F6', colorFamily: 'neutro' },
    ],
    imagenes: [
      '/assets/products/pack-x3-bodys-manga-corta-pima.jpg',
      '/assets/products/pack-x3-bodys-manga-corta-pima-2.jpg',
    ],
    descripcion:
      'Un pack que hace la vida diaria más simple y más linda. Tres bodys básicos de algodón pima para combinar con todo, pensados para que el bebé se sienta cómodo y seco en cada cambio. La tela es suave y ligera, perfecta para usar todos los días sin perder ese toque especial.',
    descripcionCorta: 'Pack de 3 bodys básicos en algodón pima para usar todos los días.',
    tela: '100% Algodón Pima',
    etiqueta: 'Oferta del pack',
    badgeType: 'oferta',
    caracteristicas: [
      '3 bodys esenciales para el día a día',
      'Algodón pima suave y muy cómodo',
      'Corte práctico para cambios rápidos',
      'Ideal para capas y combinaciones',
    ],
    cuidados: [
      'Lavar con agua fría',
      'No usar lejía',
      'Secar a la sombra',
      'Guardar doblados para mantener la forma',
    ],
    stockPorTalle: { RN: 12, '0-3m': 14, '3-6m': 10, '6-9m': 8, '9-12m': 6 },
    destacado: true,
    esPack: true,
    tags: ['body', 'pack', 'algodon-pima', 'basico', 'recien-nacido'],
  },
  {
    id: 'remera-manga-larga-pima-estampada',
    nombre: 'Remera Manga Larga Pima Estampada Dinos Felices',
    categoria: 'Remeras & Tops',
    subcategoria: 'Remeras',
    precio: 11900,
    tallesDisponibles: ['T2', 'T4', 'T6', 'T8', 'T10'],
    coloresDisponibles: [
      { name: 'Verde Selva', hex: '#2DD382', colorFamily: 'verde' },
      { name: 'Amarillo Sol', hex: '#FFD026', colorFamily: 'amarillo' },
      { name: 'Celeste Cielo', hex: '#26A4F8', colorFamily: 'celeste' },
    ],
    imagenes: [
      '/assets/products/remera-manga-larga-pima-estampada.jpg',
      '/assets/products/remera-manga-larga-pima-estampada-2.jpg',
    ],
    descripcion:
      'La remera manga larga de algodón pima tiene ese toque alegre y fresco que les encanta a los más chiquitos. La tela es fresca, suave y muy cómoda para vestir todos los días con un look juguetón. El estampado de dinos felices suma color y ternura sin perder la esencia básica.',
    descripcionCorta: 'Remera de manga larga en algodón pima con estampado divertido y suave.',
    tela: '100% Algodón Pima',
    caracteristicas: [
      'Algodón pima de alta suavidad',
      'Diseño con estampado de dinos felices',
      'Manga larga y corte cómodo',
      'Ideal para combinar con pantalones o calzas',
    ],
    cuidados: [
      'Lavar a máquina en frío',
      'Evitar usar lejía',
      'Secar sin exponer al calor directo',
      'Planchar a temperatura baja si hace falta',
    ],
    stockPorTalle: { T2: 7, T4: 9, T6: 8, T8: 6, T10: 5 },
    destacado: true,
    tags: ['remera', 'algodon-pima', 'basico'],
  },
  {
    id: 'pantalon-jogging-rustico-ninos',
    nombre: 'Pantalón Jogging Rústico con Lycra Cintura Elástica',
    categoria: 'Pantalones & Calzas',
    subcategoria: 'Pantalones',
    precio: 15800,
    tallesDisponibles: ['T2', 'T4', 'T6', 'T8', 'T10'],
    coloresDisponibles: [
      { name: 'Gris Melange', hex: '#D1D5DB', colorFamily: 'neutro' },
      { name: 'Azul Noche', hex: '#60A5FA', colorFamily: 'celeste' },
      { name: 'Naranja Mandarina', hex: '#FF8A1E', colorFamily: 'naranja' },
    ],
    imagenes: [
      '/assets/products/pantalon-jogging-rustico-ninos.jpg',
      '/assets/products/pantalon-jogging-rustico-ninos-2.jpg',
    ],
    descripcion:
      'Este jogging se siente cómodo desde el primer uso y acompaña cada movimiento sin perder la forma. La cintura elástica y la tela combinan suavidad y flexibilidad, ideales para jugar, correr y descansar. Con detalles simples y un corte relajado, es una base que siempre suma en el guardarropa.',
    descripcionCorta: 'Pantalón jogging en rústico con lycra y cintura elástica para moverse con libertad.',
    tela: 'Rústico con Lycra',
    caracteristicas: [
      'Tela rústica con lycra para mayor flexibilidad',
      'Cintura elástica que acompaña cómodamente',
      'Corte relajado ideal para jugar',
      'Muy práctico para uso diario',
    ],
    cuidados: [
      'Lavar a máquina con agua fría',
      'No usar blanqueador',
      'Secar a temperatura baja',
      'Guardar plegado para mantener su forma',
    ],
    stockPorTalle: { T2: 8, T4: 10, T6: 9, T8: 7, T10: 5 },
    destacado: true,
    tags: ['pantalon', 'jogging', 'rustico', 'comodo'],
  },
  {
    id: 'pack-x3-medias-antideslizantes',
    nombre: 'Pack x3 Medias Antideslizantes Algodón Soft',
    categoria: 'Accesorios & Packs',
    subcategoria: 'Medias',
    precio: 5900,
    tallesDisponibles: ['6-9m', '9-12m', '12-18m', '18-24m'],
    coloresDisponibles: [
      { name: 'Trío Pastel (Celeste/Coral/Crudo)', hex: '#FAF9F6', colorFamily: 'celeste' },
    ],
    imagenes: [
      '/assets/products/pack-x3-medias-antideslizantes.jpg',
      '/assets/products/pack-x3-medias-antideslizantes-2.jpg',
    ],
    descripcion:
      'Estas medias suaves son ideales para acompañar cada paso de tu bebé con más seguridad. La base de algodón soft y las suelas antideslizantes ayudan a moverse mejor en casas y pisos lisos, con una sensación agradable sobre la piel. Son un básico práctico, cómodo y siempre útil en el guardarropa.',
    descripcionCorta: 'Pack de 3 medias antideslizantes de algodón soft para bebés activos.',
    tela: '100% Algodón Pima',
    caracteristicas: [
      'Antepié con suela antideslizante',
      'Algodón soft muy suave',
      'Pack de 3 pares para rotar',
      'Ideal para caminar y explorar',
    ],
    cuidados: [
      'Lavar a mano o en delicado',
      'No usar plancha',
      'Guardar secas para cuidar la suela',
      'Evitar solventes fuertes',
    ],
    stockPorTalle: { '6-9m': 11, '9-12m': 14, '12-18m': 10, '18-24m': 7 },
    destacado: true,
    esPack: true,
    tags: ['medias', 'pack', 'antideslizante', 'accesorio', 'suave'],
  },
];

export const MAX_CATALOG_PRICE = Math.ceil(Math.max(...PRODUCTS.map((product) => product.precio)) / 5000) * 5000;
export const MIN_CATALOG_PRICE = Math.floor(Math.min(...PRODUCTS.map((product) => product.precio)) / 500) * 500;

// Categorías del catálogo con iconos y nombres descriptivos
export const CATALOG_CATEGORIES = [
  { id: 'todos', label: 'Todos los artículos', emoji: '🌟', count: PRODUCTS.length },
  { id: 'Bodys & Enteritos', label: 'Bodys & Enteritos', emoji: '🧸', count: PRODUCTS.filter((p) => p.categoria === 'Bodys & Enteritos').length },
  { id: 'Remeras & Tops', label: 'Remeras & Tops', emoji: '👕', count: PRODUCTS.filter((p) => p.categoria === 'Remeras & Tops').length },
  { id: 'Pantalones & Calzas', label: 'Pantalones & Calzas', emoji: '👖', count: PRODUCTS.filter((p) => p.categoria === 'Pantalones & Calzas').length },
  { id: 'Pijamas & Abrigo', label: 'Pijamas & Abrigo', emoji: '💤', count: PRODUCTS.filter((p) => p.categoria === 'Pijamas & Abrigo').length },
  { id: 'Accesorios & Packs', label: 'Accesorios & Packs', emoji: '🎁', count: PRODUCTS.filter((p) => p.categoria === 'Accesorios & Packs').length },
];

export const FABRICS_LIST = [
  '100% Algodón Pima',
  'Algodón Peinado 24/1',
  'Plush & Friza Abrigada',
  'Rústico con Lycra',
  'Denim Ultra Soft',
  'Muselina Pura',
];
