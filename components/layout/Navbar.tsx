'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, Heart } from 'lucide-react';
import { Wordmark } from '@/components/ui/Wordmark';
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
      setIsScrolled(window.scrollY > 40);
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
    <header className="fixed top-0 inset-x-0 z-40">
      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled || isMegaOpen
            ? 'bg-ivory/95 backdrop-blur-md border-b border-silver/40 py-3 shadow-[0_4px_20px_rgba(20,16,15,0.06)]'
            : 'bg-ivory/80 backdrop-blur-xs py-4 border-b border-silver/25'
        }`}
        aria-label="Main Navigation"
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Left Navigation Links & Mobile Trigger */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-bidri-black focus-visible:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            <div className="hidden lg:flex items-center space-x-8 text-left">
              <Link
                href="/shop"
                className="font-eyebrow text-[11.5px] text-rani-pink font-medium hover:text-bidri-black tracking-[0.35em] uppercase hover-link-rule py-1"
              >
                SHOP ALL
              </Link>
              <button
                onClick={() => setIsMegaOpen((prev) => !prev)}
                onMouseEnter={() => setIsMegaOpen(true)}
                className="font-eyebrow text-[11.5px] text-bidri-black hover:text-rani-pink tracking-[0.35em] uppercase focus-visible:outline-none cursor-pointer py-1"
                aria-expanded={isMegaOpen}
              >
                COLLECTIONS
              </button>
              <Link
                href="/about"
                className="font-eyebrow text-[11.5px] text-bidri-black hover:text-rani-pink tracking-[0.35em] uppercase hover-link-rule py-1"
              >
                ABOUT
              </Link>
            </div>
          </div>

          {/* Center: Brand Wordmark */}
          <div className="flex-1 flex justify-center text-center">
            <Link href="/" className="inline-block focus-visible:outline-none group" aria-label="Bidri Crafts Home">
              <span className="font-display text-2xl sm:text-3xl font-light text-bidri-black tracking-[-0.03em] block group-hover:text-rani-pink transition-colors">
                BIDRI CRAFTS
              </span>
              <span className="font-eyebrow text-[8.5px] text-graphite/70 tracking-[0.45em] uppercase block -mt-1">
                BIDAR · EST. 1422
              </span>
            </Link>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center space-x-4 sm:space-x-5 justify-end">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-bidri-black hover:text-rani-pink transition-colors focus-visible:outline-none cursor-pointer"
              aria-label="Open search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/account"
              className="relative p-1.5 text-bidri-black hover:text-rani-pink transition-colors"
              aria-label={`View Wishlist${savedCount > 0 ? ` (${savedCount} items)` : ''}`}
            >
              <Heart size={18} strokeWidth={1.5} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rani-pink text-ivory text-[9px] font-body font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              onClick={openCart}
              className="flex items-center space-x-2 bg-bidri-black text-ivory px-3.5 py-1.5 rounded-lg hover:bg-rani-pink transition-colors focus-visible:outline-none cursor-pointer shadow-xs"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag size={15} strokeWidth={1.6} />
              <span className="font-eyebrow text-[10.5px] tracking-[0.25em] font-medium">
                BAG ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Panel for Collections */}
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
            <div className="container-luxury py-12 grid grid-cols-12 gap-12 items-center">
              {/* Left: Collection Links */}
              <div className="col-span-6 space-y-3 pr-12 border-r border-silver/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.42em] uppercase">
                    BROWSE COLLECTIONS
                  </span>
                  <Link
                    href="/shop"
                    onClick={() => setIsMegaOpen(false)}
                    className="font-eyebrow text-[10px] text-bidri-black hover:text-rani-pink tracking-[0.3em] uppercase hover-link-rule"
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
                    className={`group flex items-baseline justify-between py-2.5 border-b border-silver/20 transition-all duration-300 rounded-md px-2 ${
                      activeCollectionSlug === c.slug ? 'text-bidri-black bg-mist/50' : 'text-graphite/80'
                    }`}
                  >
                    <div className="flex items-baseline space-x-6">
                      <span className="font-display text-sm text-antique-gold italic font-light">
                        {c.numeral}
                      </span>
                      <span className="font-display text-2xl font-light tracking-tight group-hover:text-rani-pink">
                        {c.name}
                      </span>
                    </div>
                    <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase">
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
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                <div className="mt-4 flex justify-between items-baseline">
                  <p className="font-body text-xs text-graphite/80 italic font-light">
                    {activeCollection.headline} — {activeCollection.count} Pieces
                  </p>
                  <Link
                    href={`/collections/${activeCollection.slug}`}
                    onClick={() => setIsMegaOpen(false)}
                    className="font-eyebrow text-[10px] text-bidri-black hover:text-rani-pink tracking-[0.3em] uppercase hover-link-rule"
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-ivory z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-silver/30">
              <Wordmark size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-bidri-black focus-visible:outline-none"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="py-8 space-y-5">
              {[
                { label: 'Shop All Products', href: '/shop', highlight: true },
                { label: 'Collections', href: '/collections' },
                { label: 'About Bidri Craft', href: '/about' },
              ].map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-3xl font-light block transition-colors ${
                      link.highlight ? 'text-rani-pink font-normal' : 'text-bidri-black hover:text-rani-pink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Collection sub-links in mobile */}
              <div className="pt-4 border-t border-silver/30 space-y-3">
                <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block">
                  BROWSE BY COLLECTION
                </span>
                {collections.map((c, idx) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + 0.03 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={`/collections/${c.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-xl font-light text-graphite hover:text-rani-pink block py-1 transition-colors"
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
                  className="flex items-center space-x-2 text-bidri-black"
                >
                  <Heart size={16} strokeWidth={1.5} />
                  <span className="font-body text-sm">Wishlist ({savedCount})</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex items-center space-x-2 bg-bidri-black text-ivory px-4 py-2 rounded-lg"
                >
                  <ShoppingBag size={14} strokeWidth={1.6} />
                  <span className="font-body text-sm">Bag ({cartCount})</span>
                </button>
              </div>
              <div className="text-xs text-graphite/70 font-body">
                Bidar · Karnataka · Est. 1422
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
