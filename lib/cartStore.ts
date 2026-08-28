'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/content/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  currency: CurrencyCode;
  reservationTimeLeft: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInInr: number) => string;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      currency: 'INR',
      reservationTimeLeft: 1800, // 30 minutes in seconds
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCurrency: (currency: CurrencyCode) => set({ currency }),
      formatPrice: (amountInInr: number) => {
        const { currency } = get();
        const rate = CURRENCY_RATES[currency] || 1;
        const converted = amountInInr * rate;
        const symbol = CURRENCY_SYMBOLS[currency] || '₹';
        if (currency === 'INR') {
          return `${symbol} ${amountInInr.toLocaleString('en-IN')}`;
        }
        return `${symbol}${Math.round(converted).toLocaleString('en-US')}`;
      },
      addItem: (product, quantity = 1) => {
        if (product.price === 0) return; // POA item cannot be added directly to cart
        set((state) => {
          const existing = state.items.find((item) => item.product.slug === product.slug);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.slug === product.slug
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity }],
            isOpen: true,
          };
        });
      },
      removeItem: (slug) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.slug !== slug),
        }));
      },
      updateQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          get().removeItem(slug);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.slug === slug ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'bidri-crafts-cart',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
);

