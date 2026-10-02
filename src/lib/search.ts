import type { Product } from '../data/products';
import SEARCH_SYNONYMS from '../data/searchSynonyms';
import { productHasSize } from './sizes';

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

interface SearchFields {
  name: string[];
  metadata: string[];
  description: string[];
}

const cache = new WeakMap<Product, SearchFields>();

const getWords = (value: string): string[] =>
  normalize(value).split(' ').filter(Boolean).map(stem);

const getFields = (product: Product): SearchFields => {
  let fields = cache.get(product);

  if (!fields) {
    fields = {
      name: getWords(product.nombre),
      metadata: getWords([product.etiqueta, ...(product.tags ?? [])].filter(Boolean).join(' ')),
      description: getWords(
        [
          product.descripcion,
          product.descripcionCorta,
          product.tela,
          ...(product.caracteristicas ?? []),
          ...product.coloresDisponibles.map((color) => color.name),
        ]
          .filter(Boolean)
          .join(' ')
      ),
    };
    cache.set(product, fields);
  }

  return fields;
};

const parseSizeQuery = (query: string): string | null => {
  if (/^(?:t\s*|talle\s+)(2|4|6|8|10)$/.test(query)) {
    return `T${query.match(/(2|4|6|8|10)$/)?.[1]}`;
  }
  if (query === 'rn' || query === 'recien nacido' || query === 'recien nacidos') return 'RN';
  if (/^0\s*3\s*m$/.test(query)) return '0-3m';
  return null;
};

const matches = (field: string[], token: string): boolean =>
  field.some((word) => word.startsWith(token));

const matchesGroup = (product: Product, group: string[]): boolean => {
  const fields = getFields(product);
  return group.some(
    (token) => matches(fields.name, token) || matches(fields.metadata, token) || matches(fields.description, token)
  );
};

type RelevanceScore = [number, number, number];

const relevance = (product: Product, tokenGroups: string[][]): RelevanceScore => {
  const fields = getFields(product);
  return tokenGroups.reduce<RelevanceScore>((score, group) => {
    if (group.some((token) => matches(fields.name, token))) score[0] += 1;
    else if (group.some((token) => matches(fields.metadata, token))) score[1] += 1;
    else if (group.some((token) => matches(fields.description, token))) score[2] += 1;
    return score;
  }, [0, 0, 0]);
};

const sortByRelevance = (products: Product[], tokenGroups: string[][]): Product[] =>
  products
    .map((product) => ({ product, score: relevance(product, tokenGroups) }))
    .sort((a, b) =>
      b.score[0] - a.score[0] ||
      b.score[1] - a.score[1] ||
      b.score[2] - a.score[2] ||
      Number(Boolean(b.product.destacado)) - Number(Boolean(a.product.destacado))
    )
    .map(({ product }) => product);

export const searchProducts = (
  products: Product[],
  query: string
): { items: Product[]; relaxed: boolean } => {
  const normalizedQuery = normalize(query);
  const size = parseSizeQuery(normalizedQuery);
  if (size) {
    return { items: products.filter((product) => productHasSize(product, size)), relaxed: false };
  }

  const rawTokens = normalizedQuery
    .split(' ')
    .filter((token) => token && !STOPWORDS.has(token));

  if (rawTokens.length === 0) return { items: products, relaxed: false };

  const tokenGroups = rawTokens.map((rawToken) => [
    stem(rawToken),
    ...(SEARCH_SYNONYMS[rawToken] ?? SEARCH_SYNONYMS[stem(rawToken)] ?? []).flatMap((synonym) => getWords(synonym)),
  ]);
  const scored = products.map((product) => ({ product, score: relevance(product, tokenGroups) }));

  const exact = scored
    .filter((entry) => tokenGroups.every((group) => matchesGroup(entry.product, group)))
    .map((entry) => entry.product);

  if (exact.length > 0) return { items: sortByRelevance(exact, tokenGroups), relaxed: false };

  const partial = scored
    .filter((entry) => entry.score.some((score) => score > 0))
    .map((entry) => entry.product);

  const items = sortByRelevance(partial, tokenGroups)
    .slice(0, 4);

  return { items, relaxed: items.length > 0 };
};
