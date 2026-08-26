'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/content/products';

interface WishlistStore {
  savedSlugs: string[];
  toggleSave: (slug: string) => void;
  isSaved: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      savedSlugs: ['inlay-choker-royal-charm', 'surahi-ewer'],
      toggleSave: (slug) => {
        set((state) => {
          const exists = state.savedSlugs.includes(slug);
          return {
            savedSlugs: exists
              ? state.savedSlugs.filter((s) => s !== slug)
              : [...state.savedSlugs, slug],
          };
        });
      },
      isSaved: (slug) => get().savedSlugs.includes(slug),
    }),
    {
      name: 'bidri-crafts-wishlist',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
    }
  )
);
