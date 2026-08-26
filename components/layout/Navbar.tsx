'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Wordmark } from '@/components/ui/Wordmark';
import { collections } from '@/content/collections';
import { useCartStore } from '@/lib/cartStore';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
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
    <header className="fixed top-[34px] inset-x-0 z-40 transition-colors duration-400">
      <nav
        className={`w-full transition-all duration-400 ${
          isScrolled || isMegaOpen
            ? 'bg-ivory/95 backdrop-blur-md border-b border-silver/40 py-4 shadow-[0_1px_0_rgba(201,198,193,0.3)]'
            : 'bg-transparent py-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Left Navigation Links */}
          <div className="hidden lg:flex items-center space-x-9 text-left">
            <button
              onClick={() => setIsMegaOpen((prev) => !prev)}
              onMouseEnter={() => setIsMegaOpen(true)}
              className="font-eyebrow text-[11px] text-bidri-black hover:text-graphite tracking-[0.42em] uppercase focus-visible:outline-none cursor-pointer py-1"
              aria-expanded={isMegaOpen}
            >
              COLLECTIONS
            </button>
            <Link
              href="/craft"
              className="font-eyebrow text-[11px] text-bidri-black hover:text-graphite tracking-[0.42em] uppercase hover-link-rule py-1"
            >
              CRAFT
            </Link>
            <Link
              href="/artisans"
              className="font-eyebrow text-[11px] text-bidri-black hover:text-graphite tracking-[0.42em] uppercase hover-link-rule py-1"
            >
              ARTISANS
            </Link>
            <Link
              href="/bespoke"
              className="font-eyebrow text-[11px] text-bidri-black hover:text-graphite tracking-[0.42em] uppercase hover-link-rule py-1"
            >
              BESPOKE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-bidri-black focus-visible:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu size={20} strokeWidth={1.2} />
            </button>
          </div>

          {/* Center: Wordmark */}
          <div className="flex-1 flex justify-center lg:justify-center">
            <Link href="/" className="inline-block focus-visible:outline-none" aria-label="Bidri Crafts Home">
              <Wordmark size="md" />
            </Link>
          </div>

          {/* Right Navigation Links */}
          <div className="flex items-center space-x-6 lg:space-x-9 justify-end">
            <button
              onClick={onOpenSearch}
              className="font-eyebrow text-[11px] text-bidri-black hover:text-graphite tracking-[0.42em] uppercase cursor-pointer hover-link-rule py-1 focus-visible:outline-none"
            >
              SEARCH
            </button>
            <Link
              href="/account"
              className="hidden sm:inline-block font-eyebrow text-[11px] text-bidri-black hover:text-graphite tracking-[0.42em] uppercase hover-link-rule py-1"
            >
              ACCOUNT
            </Link>
            <button
              onClick={openCart}
              className="font-eyebrow text-[11px] text-bidri-black hover:text-graphite tracking-[0.42em] uppercase cursor-pointer hover-link-rule py-1 focus-visible:outline-none"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              BAG ({cartCount})
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onMouseLeave={() => setIsMegaOpen(false)}
            className="w-full bg-ivory border-b border-silver/40 shadow-sm"
          >
            <div className="container-luxury py-14 grid grid-cols-12 gap-12 items-center">
              {/* Left: 6 Text Links */}
              <div className="col-span-6 space-y-4 pr-12 border-r border-silver/30">
                <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block mb-4">
                  INDEX OF HOUSES
                </span>
                {collections.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collections/${c.slug}`}
                    onMouseEnter={() => setActiveCollectionSlug(c.slug)}
                    className={`group flex items-baseline justify-between py-2 border-b border-silver/20 transition-all duration-300 ${
                      activeCollectionSlug === c.slug ? 'text-bidri-black pl-2' : 'text-graphite/80'
                    }`}
                  >
                    <div className="flex items-baseline space-x-6">
                      <span className="font-display text-sm text-silver italic font-light">
                        {c.numeral}
                      </span>
                      <span className="font-display text-2xl font-light tracking-tight group-hover:text-bidri-black">
                        {c.name}
                      </span>
                    </div>
                    <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase">
                      {c.descriptor}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Right: Large Hover Image Crossfade (500ms) */}
              <div className="col-span-6 flex flex-col justify-center">
                <div className="relative aspect-[16/10] w-full bg-mist overflow-hidden border border-silver/30">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCollection.slug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                    {activeCollection.headline} — {activeCollection.count} Artefacts
                  </p>
                  <Link
                    href={`/collections/${activeCollection.slug}`}
                    className="font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
                  >
                    EXPLORE →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-ivory z-50 flex flex-col justify-between p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-8 border-b border-silver/30">
              <Wordmark size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-bidri-black focus-visible:outline-none"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.2} />
              </button>
            </div>

            <div className="py-12 space-y-6">
              {[
                { label: 'Collections', href: '/collections' },
                { label: 'The Craft', href: '/craft' },
                { label: 'Artisans', href: '/artisans' },
                { label: 'Heritage', href: '/heritage' },
                { label: 'Bespoke', href: '/bespoke' },
                { label: 'Gifting', href: '/gifting' },
                { label: 'Authenticity Registry', href: '/authenticity' },
                { label: 'Journal', href: '/journal' },
              ].map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-[32px] font-light text-bidri-black block hover:text-graphite transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-silver/30 flex justify-between items-center text-xs text-graphite/70 font-body">
              <span>Bidar · Karnataka · Est. 1422</span>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="hover-link-rule">
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
