import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, PRODUCTS } from '../data/products';
import { BRAND_CONFIG } from '../brand.config';
import { calculateCouponDiscount } from '../lib/checkoutPricing';

export interface CartItem {
  id: string; // unique item id: `${productId}-${size}-${colorName}`
  productId: string;
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
  unitPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  discount: number;
  total: number;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountRemainingForFreeShipping: number;
  isGiftPackaging: boolean;
  setIsGiftPackaging: (val: boolean) => void;
  giftDedication: string;
  setGiftDedication: (val: string) => void;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Carrito inicial con 3 productos para reflejar fielmente la maqueta importada de Stitch
const INITIAL_ITEMS: CartItem[] = [
  {
    id: 'body-manga-larga-algodon-pima-3-6m-Blanco Nube',
    productId: 'body-manga-larga-algodon-pima',
    product: PRODUCTS[0],
    size: '3-6 Meses',
    color: { name: 'Blanco Nube / Amarillo', hex: '#FFD026' },
    quantity: 2,
    unitPrice: 12500,
  },
  {
    id: 'enterito-osito-termico-plush-6-9m-Celeste Suave',
    productId: 'enterito-osito-termico-plush',
    product: PRODUCTS[1],
    size: '6-9 Meses',
    color: { name: 'Celeste Pastel', hex: '#93C5FD' },
    quantity: 1,
    unitPrice: 22900,
  },
  {
    id: 'pack-x3-remeras-basicas-T4-Trío Selva & Sol',
    productId: 'pack-x3-remeras-basicas',
    product: PRODUCTS[2],
    size: '4 Años',
    color: { name: 'Surtido Estrellas', hex: '#FB7185' },
    quantity: 1,
    unitPrice: 26800,
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('pipulinos_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_ITEMS;
  });

  const [isGiftPackaging, setIsGiftPackaging] = useState<boolean>(true);
  const [giftDedication, setGiftDedication] = useState<string>('¡Bienvenido Benicio al mundo! Te amamos tus tíos Sofi y Lucas 💕 ⭐');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('PROMO-PACK');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('pipulinos_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity: number = 1) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          size,
          color,
          quantity,
          unitPrice: product.precio,
        },
      ];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const discount = calculateCouponDiscount(subtotal, appliedCoupon).discount;

  const total = Math.max(0, subtotal - discount);

  const freeShippingThreshold = BRAND_CONFIG.commerce.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountRemainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (!clean) return false;
    const result = calculateCouponDiscount(subtotal, clean);
    if (!result.valid) return false;
    setAppliedCoupon(clean);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        discount,
        total,
        isFreeShipping,
        freeShippingThreshold,
        freeShippingProgress,
        amountRemainingForFreeShipping,
        isGiftPackaging,
        setIsGiftPackaging,
        giftDedication,
        setGiftDedication,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};
