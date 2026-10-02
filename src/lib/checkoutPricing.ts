import { BRAND_CONFIG } from '../brand.config';
import { PRODUCTS } from '../data/products';

export interface CheckoutItemInput {
  id: string;
  size?: string;
  color?: string;
  quantity: number;
}

export interface CheckoutInput {
  items: CheckoutItemInput[];
  shippingMethod?: 'standard' | 'express' | 'pickup';
  paymentMethod?: 'mercadopago' | 'transfer';
  couponCode?: string | null;
}

interface MercadoPagoItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
  picture_url?: string;
}

export class CheckoutInputError extends Error {}

export function calculateCouponDiscount(subtotal: number, couponCode?: string | null) {
  if (couponCode === 'PROMO-PACK') return Math.min(5000, subtotal);
  if (couponCode === 'PIPULINOS10' || couponCode === 'BIENVENIDA') {
    return Math.min(Math.round(subtotal * 0.1), subtotal);
  }
  return 0;
}

export function calculateCheckout(input: CheckoutInput) {
  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new CheckoutInputError('El carrito no contiene productos.');
  }

  const items = input.items.map<MercadoPagoItem>((item) => {
    if (!item || typeof item.id !== 'string') {
      throw new CheckoutInputError('El producto enviado no es válido.');
    }

    const allowedKeys = new Set(['id', 'size', 'color', 'quantity']);
    if (Object.keys(item).some((key) => !allowedKeys.has(key))) {
      throw new CheckoutInputError('Los productos solo pueden incluir id, size, color y quantity.');
    }

    const product = PRODUCTS.find((candidate) => candidate.id === item.id);
    if (!product) {
      throw new CheckoutInputError(`Producto inexistente: ${item.id}.`);
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
      throw new CheckoutInputError('La cantidad debe ser un número entero entre 1 y 20.');
    }

    return {
      id: product.id,
      title: `${product.nombre}${item.size ? ` (Talle: ${item.size})` : ''}${item.color ? ` - ${item.color}` : ''}`,
      description: `${BRAND_CONFIG.name} - Talle: ${item.size || 'Único'} - Color: ${item.color || 'Estándar'}`,
      quantity: item.quantity,
      currency_id: BRAND_CONFIG.commerce.currency,
      unit_price: product.precio,
      picture_url: product.imagenes[0],
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const couponDiscount = calculateCouponDiscount(subtotal, input.couponCode);
  const subtotalAfterCoupon = subtotal - couponDiscount;
  const shippingMethod = input.shippingMethod || 'standard';
  if (!['standard', 'express', 'pickup'].includes(shippingMethod)) {
    throw new CheckoutInputError('El método de envío no es válido.');
  }

  const shippingCost = shippingMethod === 'express' ? BRAND_CONFIG.commerce.expressShippingCost : 0;
  const transferDiscount = input.paymentMethod === 'transfer'
    ? Math.round((subtotalAfterCoupon + shippingCost) * BRAND_CONFIG.commerce.transferDiscountPercent / 100)
    : 0;

  return {
    items,
    subtotal,
    couponDiscount,
    shippingCost,
    transferDiscount,
    total: subtotalAfterCoupon + shippingCost - transferDiscount,
    shippingMethod,
  };
}