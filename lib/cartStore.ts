'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/content/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
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
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      formatPrice: (amountInInr: number) => {
        if (amountInInr === 0) return 'Price on Enquiry';
        return `₹${amountInInr.toLocaleString('en-IN')}`;
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
      partialize: (state) => ({ items: state.items }),
    }
  )
);
