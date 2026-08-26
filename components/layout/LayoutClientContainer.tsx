'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { SearchModal } from '@/components/search/SearchModal';

export const LayoutClientContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      {children}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
