'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, ShieldCheck, ArrowUpDown, X } from 'lucide-react';
import { products, Product } from '@/content/products';
import { collections } from '@/content/collections';
import { ProductCard } from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

const QuickViewModal = dynamic(
  () => import('@/components/ui/QuickViewModal').then((mod) => mod.QuickViewModal),
  { ssr: false }
);

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'craft-hours';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInlay, setSelectedInlay] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.collection !== selectedCategory) {
        return false;
      }
      // Inlay filter
      if (selectedInlay !== 'all' && p.inlay !== selectedInlay) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesStory = p.story.toLowerCase().includes(query);
        const matchesInlay = p.inlay.toLowerCase().includes(query);
        const matchesArtisan = p.artisanName.toLowerCase().includes(query);
        if (!matchesName && !matchesStory && !matchesInlay && !matchesArtisan) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'craft-hours') return b.craftHours - a.craftHours;
      return 0;
    });
  }, [selectedCategory, selectedInlay, searchQuery, sortBy]);

  return (
    <div className="w-full bg-ivory min-h-screen pt-28 sm:pt-36 pb-28 select-none">
      {/* 1. Shop Hero Banner */}
      <section className="container-luxury mb-12 sm:mb-16">
        <div className="relative bg-bidri-black text-ivory p-8 sm:p-14 overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <Image
              src="/img/editorial/ilkal_street_pop_saree.jpg"
              alt="Bidri street pop background"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2.5 bg-rani-pink/20 border border-rani-pink/40 px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-rani-pink animate-pulse" />
              <span className="font-eyebrow text-[10px] text-silver-bright tracking-[0.38em] uppercase">
                BIDAR MASTERPIECES · EST. 1422
              </span>
            </div>

            <h1 className="font-display headline-sub font-light text-ivory leading-tight">
              The Complete Catalogue
            </h1>

            <p className="font-body text-sm sm:text-base text-silver-bright/90 font-light max-w-2xl leading-relaxed">
              Every single piece is forged in zinc-copper alloy, chiselled by master hands, inlaid with 99.9% fine silver, and darkened in the 600-year-old fort soil of Bidar.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-body text-silver-bright/80">
              <span className="flex items-center space-x-1.5">
                <span className="text-saffron">✦</span>
                <span>GI Certificate Tag No. 12</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="text-rani-pink">✦</span>
                <span>Free Worldwide Insured Courier</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="text-peacock-teal">✦</span>
                <span>100% Direct Artisan Cooperative</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Filters Toolbar */}
      <section className="container-luxury mb-10">
        <div className="bg-mist/80 p-5 sm:p-6 border border-silver/40 space-y-5">
          {/* Top Row: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite/60" />
              <input
                type="text"
                placeholder="Search by name, motif, artisan or technique…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-ivory border border-silver/40 text-xs font-body text-bidri-black placeholder:text-graphite/50 focus:outline-none focus:border-rani-pink transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite/50 hover:text-bidri-black cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sort & Counter */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end space-x-4">
              <span className="text-xs font-body text-graphite/70">
                Showing <strong className="text-bidri-black font-semibold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
              </span>

              <div className="flex items-center space-x-2">
                <ArrowUpDown size={14} className="text-graphite/60" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-ivory border border-silver/40 text-xs font-body py-2 px-3 text-bidri-black focus:outline-none focus:border-rani-pink cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="craft-hours">Most Intricate (Hours)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Row: Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-silver/30">
            <span className="text-xs font-eyebrow tracking-widest text-graphite/70 uppercase mr-2 flex items-center space-x-1">
              <Filter size={12} />
              <span>Houses:</span>
            </span>

            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-body transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-bidri-black text-ivory font-medium shadow-xs'
                  : 'bg-ivory text-graphite hover:text-bidri-black border border-silver/30'
              }`}
            >
              All Typologies ({products.length})
            </button>

            {collections.map((c) => {
              const count = products.filter((p) => p.collection === c.slug).length;
              return (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-3.5 py-1.5 text-xs font-body transition-all cursor-pointer ${
                    selectedCategory === c.slug
                      ? 'bg-rani-pink text-ivory font-medium shadow-xs'
                      : 'bg-ivory text-graphite hover:text-bidri-black border border-silver/30'
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="container-luxury">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-mist/40 border border-silver/30 p-8">
            <Sparkles size={32} className="text-rani-pink mx-auto" />
            <h3 className="font-display text-3xl font-light text-bidri-black">
              No handcrafted artefacts found
            </h3>
            <p className="font-body text-xs text-graphite max-w-md mx-auto">
              We couldn’t find any pieces matching your search query &quot;{searchQuery}&quot;. Try clearing filters or searching for terms like &quot;vase&quot;, &quot;silver&quot;, &quot;choker&quot;, or &quot;tray&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedInlay('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.3em] uppercase hover:bg-rani-pink transition-colors cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => (
              <Reveal key={product.slug} delay={idx * 0.03}>
                <ProductCard
                  product={product}
                  priority={idx < 4}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* 4. Quick View Floating Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
