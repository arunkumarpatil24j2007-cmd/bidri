'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, Heart } from 'lucide-react';
import { Wordmark } from '@/components/ui/Wordmark';
import { AnnouncementBar } from './AnnouncementBar';
import { collections } from '@/content/collections';
import { useCartStore } from '@/lib/cartStore';
import { useWishlistStore } from '@/lib/wishlistStore';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [activeCollectionSlug, setActiveCollectionSlug] = useState(collections[0].slug);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = useCartStore((s) => s.getTotalCount());
  const openCart = useCartStore((s) => s.openCart);
  const savedCount = useWishlistStore((s) => s.savedSlugs.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const activeCollection = collections.find((c) => c.slug === activeCollectionSlug) || collections[0];

  return (
    <header className="fixed top-0 inset-x-0 z-40 w-full flex flex-col">
      {/* Row 1: Separate, properly sized announcement bar */}
      <AnnouncementBar />

      {/* Row 2: Main Navigation Bar in its own row with no overlap */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled || isMegaOpen
            ? 'bg-ivory/98 backdrop-blur-md border-b border-silver/40 shadow-[0_4px_20px_rgba(20,16,15,0.06)]'
            : 'bg-ivory/95 backdrop-blur-md border-b border-silver/30'
        }`}
        aria-label="Main Navigation"
      >
        <div className="container-luxury h-16 sm:h-[72px]">
          {/* 3-Column Symmetric Grid: Left 1fr, Center auto, Right 1fr */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full w-full gap-2 sm:gap-4">
            
            {/* Column 1: Left Navigation Links & Mobile Trigger */}
            <div className="flex items-center justify-start min-w-0">
              {/* Mobile hamburger menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-bidri-black hover:text-rani-pink focus-visible:outline-none transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-7 xl:space-x-8">
                <Link
                  href="/shop"
                  className="font-eyebrow text-[11.5px] text-bidri-black hover:text-rani-pink font-medium tracking-[0.3em] uppercase hover-link-rule whitespace-nowrap transition-colors py-1"
                >
                  SHOP ALL
                </Link>
                <button
                  onClick={() => setIsMegaOpen((prev) => !prev)}
                  onMouseEnter={() => setIsMegaOpen(true)}
                  className="font-eyebrow text-[11.5px] text-bidri-black hover:text-rani-pink font-medium tracking-[0.3em] uppercase focus-visible:outline-none cursor-pointer whitespace-nowrap transition-colors py-1"
                  aria-expanded={isMegaOpen}
                >
                  COLLECTIONS
                </button>
                <Link
                  href="/about"
                  className="font-eyebrow text-[11.5px] text-bidri-black hover:text-rani-pink font-medium tracking-[0.3em] uppercase hover-link-rule whitespace-nowrap transition-colors py-1"
                >
                  ABOUT
                </Link>
              </div>
            </div>

            {/* Column 2: Logo — Mathematically centered horizontally, independent of left & right */}
            <div className="flex items-center justify-center text-center px-2 sm:px-4 shrink-0">
              <Link
                href="/"
                className="inline-flex flex-col items-center justify-center focus-visible:outline-none group py-1"
                aria-label="Bidri Crafts Home"
              >
                <span className="font-display text-xl sm:text-2xl lg:text-3xl font-light text-bidri-black tracking-[-0.02em] sm:tracking-[-0.03em] leading-none block group-hover:text-rani-pink transition-colors whitespace-nowrap">
                  BIDRI CRAFTS
                </span>
                <span className="font-eyebrow text-[7.5px] sm:text-[8px] lg:text-[8.5px] text-graphite/70 tracking-[0.4em] sm:tracking-[0.45em] uppercase leading-none mt-1">
                  BIDAR · EST. 1422
                </span>
              </Link>
            </div>

            {/* Column 3: Right Controls — Search, Wishlist, Bag */}
            <div className="flex items-center justify-end space-x-1.5 sm:space-x-3 min-w-0">
              {/* Search Icon */}
              <button
                onClick={onOpenSearch}
                className="p-1.5 sm:p-2 text-bidri-black hover:text-rani-pink transition-colors focus-visible:outline-none cursor-pointer rounded-full hover:bg-mist/80"
                aria-label="Open search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/account"
                className="relative p-1.5 sm:p-2 text-bidri-black hover:text-rani-pink transition-colors rounded-full hover:bg-mist/80"
                aria-label={`View Wishlist${savedCount > 0 ? ` (${savedCount} items)` : ''}`}
              >
                <Heart size={18} strokeWidth={1.5} />
                {savedCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 rounded-full bg-rani-pink text-ivory text-[9px] font-body font-bold flex items-center justify-center shadow-xs">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="flex items-center space-x-1.5 sm:space-x-2 bg-bidri-black text-ivory px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg hover:bg-rani-pink transition-all duration-200 focus-visible:outline-none cursor-pointer shadow-xs shrink-0"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag size={14} className="sm:w-[15px] sm:h-[15px]" strokeWidth={1.6} />
                <span className="font-eyebrow text-[9.5px] sm:text-[10.5px] tracking-[0.18em] sm:tracking-[0.25em] font-medium whitespace-nowrap">
                  BAG ({cartCount})
                </span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Desktop Mega Panel for Collections (Drops down below nav) */}
      <AnimatePresence>
        {isMegaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onMouseLeave={() => setIsMegaOpen(false)}
            className="w-full bg-ivory border-b border-silver/40 shadow-xl"
          >
            <div className="container-luxury py-10 grid grid-cols-12 gap-10 items-center">
              {/* Left: Collection Links */}
              <div className="col-span-6 space-y-2.5 pr-10 border-r border-silver/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.35em] uppercase font-medium">
                    BROWSE COLLECTIONS
                  </span>
                  <Link
                    href="/shop"
                    onClick={() => setIsMegaOpen(false)}
                    className="font-eyebrow text-[10px] text-bidri-black hover:text-rani-pink tracking-[0.25em] uppercase hover-link-rule"
                  >
                    VIEW ALL PRODUCTS →
                  </Link>
                </div>
                {collections.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    onClick={() => setIsMegaOpen(false)}
                    onMouseEnter={() => setActiveCollectionSlug(c.slug)}
                    className={`group flex items-baseline justify-between py-2 border-b border-silver/20 transition-all duration-200 rounded-md px-2 ${
                      activeCollectionSlug === c.slug ? 'text-bidri-black bg-mist/50' : 'text-graphite/80 hover:text-bidri-black'
                    }`}
                  >
                    <div className="flex items-baseline space-x-5">
                      <span className="font-display text-sm text-antique-gold italic font-light">
                        {c.numeral}
                      </span>
                      <span className="font-display text-xl font-light tracking-tight group-hover:text-rani-pink transition-colors">
                        {c.name}
                      </span>
                    </div>
                    <span className="font-eyebrow text-[9.5px] text-graphite/60 tracking-[0.25em] uppercase">
                      {c.descriptor}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Right: Large Hover Image Crossfade */}
              <div className="col-span-6 flex flex-col justify-center">
                <div className="relative aspect-[16/10] w-full bg-mist overflow-hidden border border-silver/30 rounded-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCollection.slug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeCollection.image}
                        alt={activeCollection.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1200px) 50vw, 40vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-3 flex justify-between items-baseline">
                  <p className="font-body text-xs text-graphite/80 italic font-light">
                    {activeCollection.headline} — {activeCollection.count} Pieces
                  </p>
                  <Link
                    href={`/collections/${activeCollection.slug}`}
                    onClick={() => setIsMegaOpen(false)}
                    className="font-eyebrow text-[10px] text-bidri-black hover:text-rani-pink tracking-[0.25em] uppercase hover-link-rule"
                  >
                    EXPLORE COLLECTION →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-ivory z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-silver/30">
              <Wordmark size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-bidri-black hover:text-rani-pink focus-visible:outline-none cursor-pointer transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="py-6 space-y-4">
              {[
                { label: 'Shop All Products', href: '/shop', highlight: true },
                { label: 'Collections', href: '/collections' },
                { label: 'About Bidri Craft', href: '/about' },
              ].map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-2xl sm:text-3xl font-light block transition-colors ${
                      link.highlight ? 'text-rani-pink font-normal' : 'text-bidri-black hover:text-rani-pink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Collection sub-links in mobile */}
              <div className="pt-4 border-t border-silver/30 space-y-2.5">
                <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block">
                  BROWSE BY COLLECTION
                </span>
                {collections.map((c, idx) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + 0.03 * idx, duration: 0.25 }}
                  >
                    <Link
                      href={`/collections/${c.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-lg font-light text-graphite hover:text-rani-pink block py-0.5 transition-colors"
                    >
                      {c.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile menu footer */}
            <div className="pt-6 border-t border-silver/30 space-y-3">
              <div className="flex justify-between items-center">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-bidri-black hover:text-rani-pink transition-colors"
                >
                  <Heart size={16} strokeWidth={1.5} />
                  <span className="font-body text-sm">Wishlist ({savedCount})</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex items-center space-x-2 bg-bidri-black text-ivory px-4 py-2 rounded-lg hover:bg-rani-pink transition-colors cursor-pointer"
                >
                  <ShoppingBag size={14} strokeWidth={1.6} />
                  <span className="font-body text-sm font-medium">Bag ({cartCount})</span>
                </button>
              </div>
              <div className="text-xs text-graphite/60 font-body">
                Bidar · Karnataka · Est. 1422
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
