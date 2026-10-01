export const BABY_SIZES = ['RN', '0-3m', '3-6m', '6-9m', '9-12m', '12-18m', '18-24m'];
export const KIDS_SIZES = ['T2', 'T4', 'T6', 'T8', 'T10'];

export const COLOR_SWATCHES = [
  { id: 'amarillo', name: 'Amarillo Sol', hex: '#FFD026' },
  { id: 'coral', name: 'Coral Alegre', hex: '#FF6B57' },
  { id: 'celeste', name: 'Celeste Cielo', hex: '#26A4F8' },
  { id: 'verde', name: 'Verde Menta', hex: '#2DD382' },
  { id: 'lila', name: 'Lila Ensueño', hex: '#8B5CF6' },
  { id: 'naranja', name: 'Naranja Mandarina', hex: '#FF8A1E' },
  { id: 'neutro', name: 'Crudo Natural', hex: '#E7DFD5' },
] as const;

export const QUICK_FILTERS = [
  {
    id: 'recien-nacidos',
    axis: 'stage',
    value: 'recien-nacidos',
    label: 'Recién Nacidos 0–12m',
    emoji: '🍼',
    activeClass: 'bg-[#FF6B57] text-white border-[#FF6B57]',
    idleClass:
      'bg-[#FFE9E5] border-[#FF6B57]/30 text-[#FF6B57] hover:bg-[#FF6B57] hover:text-white',
  },
  {
    id: 'bebes',
    axis: 'stage',
    value: 'bebes',
    label: 'Bebés 1–3 años',
    emoji: '🧸',
    activeClass: 'bg-[#FFD026] text-[#1E2046] border-[#FFD026]',
    idleClass: 'bg-[#FFF4D0] border-amber-200 text-amber-800 hover:bg-[#FFD026] hover:text-[#1E2046]',
  },
  {
    id: 'ninos',
    axis: 'stage',
    value: 'ninos',
    label: 'Niños 4–10 años',
    emoji: '🎨',
    activeClass: 'bg-[#26A4F8] text-white border-[#26A4F8]',
    idleClass: 'bg-[#E2F3FF] border-sky-200 text-sky-800 hover:bg-[#26A4F8] hover:text-white',
  },
  {
    id: 'pijamas',
    axis: 'tag',
    value: 'pijama',
    label: 'Pijamas Suavecitos',
    emoji: '🌙',
    activeClass: 'bg-[#8B5CF6] text-white border-[#8B5CF6]',
    idleClass: 'bg-[#F1EAFE] border-purple-200 text-purple-800 hover:bg-[#8B5CF6] hover:text-white',
  },
  {
    id: 'packs',
    axis: 'tag',
    value: 'pack',
    label: 'Super Ofertas Packs',
    emoji: '🎁',
    activeClass: 'bg-[#2DD382] text-white border-[#2DD382]',
    idleClass: 'bg-[#E3F9ED] border-emerald-200 text-emerald-800 hover:bg-[#2DD382] hover:text-white',
  },
] as const;
