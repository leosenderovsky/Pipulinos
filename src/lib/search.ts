import type { Product } from '../data/products';

const STOPWORDS = new Set([
  'de',
  'del',
  'la',
  'el',
  'los',
  'las',
  'con',
  'y',
  'e',
  'para',
  'por',
  'en',
  'un',
  'una',
]);

export const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const stem = (word: string): string => {
  let next = word;

  if (next.length > 4 && next.endsWith('es')) next = next.slice(0, -2);
  else if (next.length > 3 && next.endsWith('s')) next = next.slice(0, -1);

  const dim = next.replace(/(ecito|ecita|cito|cita|ito|ita)$/, '');
  if (dim.length >= 3) next = dim;

  if (next.length > 3 && /[aeo]$/.test(next)) next = next.slice(0, -1);

  return next;
};

const cache = new WeakMap<Product, string[]>();

const getWords = (product: Product): string[] => {
  let words = cache.get(product);

  if (!words) {
    const text = normalize(
      [
        product.nombre,
        product.descripcion,
        product.descripcionCorta,
        product.tela,
        product.etiqueta,
        ...(product.caracteristicas ?? []),
        ...product.coloresDisponibles.map((color) => color.name),
        ...(product.tags ?? []),
      ]
        .filter(Boolean)
        .join(' ')
    );

    words = Array.from(new Set(text.split(' ').filter(Boolean).map(stem)));
    cache.set(product, words);
  }

  return words;
};

export const searchProducts = (
  products: Product[],
  query: string
): { items: Product[]; relaxed: boolean } => {
  const tokens = normalize(query)
    .split(' ')
    .filter((token) => token && !STOPWORDS.has(token))
    .map(stem);

  if (tokens.length === 0) return { items: products, relaxed: false };

  const scored = products.map((product) => {
    const words = getWords(product);
    const score = tokens.filter((token) => words.some((word) => word.startsWith(token))).length;
    return { product, score };
  });

  const exact = scored
    .filter((entry) => entry.score === tokens.length)
    .map((entry) => entry.product);

  if (exact.length > 0) return { items: exact, relaxed: false };

  const partial = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product)
    .slice(0, 4);

  return { items: partial, relaxed: partial.length > 0 };
};
