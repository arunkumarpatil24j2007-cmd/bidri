'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from './Navbar';

const SearchModal = dynamic(
  () => import('@/components/search/SearchModal').then((mod) => mod.SearchModal),
  { ssr: false }
);

const CartDrawer = dynamic(
  () => import('@/components/cart/CartDrawer').then((mod) => mod.CartDrawer),
  { ssr: false }
);

export const LayoutClientContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      {children}
      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
      <CartDrawer />
    </>
  );
};
