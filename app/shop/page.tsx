'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, ArrowUpDown, X, Truck, ShieldCheck } from 'lucide-react';
import { products } from '@/content/products';
import { collections } from '@/content/collections';
import { ProductCard } from '@/components/ui/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'craft-hours';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.collection !== selectedCategory) {
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
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'craft-hours') return b.craftHours - a.craftHours;
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full bg-ivory min-h-screen pt-28 sm:pt-36 pb-28 select-none">
      {/* 1. Shop Header */}
      <section className="container-luxury mb-8 sm:mb-12">
        <div className="bg-bidri-black text-ivory p-8 sm:p-12 rounded-2xl overflow-hidden border border-white/10 relative">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 bg-saffron/20 border border-saffron/40 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span className="font-eyebrow text-[10px] text-silver-bright tracking-[0.3em] uppercase">
                BIDAR MASTERPIECES · GI TAG NO. 12
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-light text-ivory leading-tight">
              All Handcrafted Artefacts
            </h1>

            <p className="font-body text-xs sm:text-sm text-silver-bright/80 font-light leading-relaxed">
              Browse authentic Bidriware sculptures, home décor, barware, and executive desk accessories. Hand-cast from zinc-copper alloy and inlaid with 99.9% pure silver in Bidar, Karnataka.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-body text-silver-bright/80">
              <span className="flex items-center space-x-1.5">
                <Truck size={14} className="text-antique-gold" />
                <span>Free Insured Delivery Across India</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck size={14} className="text-peacock-teal" />
                <span>Govt GI Tag #12 Authenticity Guarantee</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Filters Toolbar */}
      <section className="container-luxury mb-8">
        <div className="bg-mist/70 p-4 sm:p-5 rounded-xl border border-silver/35 space-y-4">
          {/* Top Row: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite/60" />
              <input
                type="text"
                placeholder="Search by name, motif, vase, statue, box, or ewer…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-ivory rounded-lg border border-silver/40 text-xs font-body text-bidri-black placeholder:text-graphite/50 focus:outline-none focus:border-bidri-black transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite/50 hover:text-bidri-black cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sort & Counter */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end space-x-4">
              <span className="text-xs font-body text-graphite/70">
                Showing <strong className="text-bidri-black font-semibold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'Artefact' : 'Artefacts'}
              </span>

              <div className="flex items-center space-x-2">
                <ArrowUpDown size={14} className="text-graphite/60" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-ivory border border-silver/40 rounded-lg text-xs font-body py-2 px-3 text-bidri-black focus:outline-none focus:border-bidri-black cursor-pointer"
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
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-silver/30">
            <span className="text-xs font-eyebrow tracking-widest text-graphite/70 uppercase mr-1 flex items-center space-x-1">
              <Filter size={12} />
              <span>Categories:</span>
            </span>

            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-body rounded-full transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-bidri-black text-ivory font-medium shadow-xs'
                  : 'bg-ivory text-graphite hover:text-bidri-black border border-silver/40'
              }`}
            >
              All Categories ({products.length})
            </button>

            {collections.map((c) => {
              const count = products.filter((p) => p.collection === c.slug).length;
              if (count === 0) return null;
              return (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-3 py-1.5 text-xs font-body rounded-full transition-all cursor-pointer ${
                    selectedCategory === c.slug
                      ? 'bg-bidri-black text-ivory font-medium shadow-xs'
                      : 'bg-ivory text-graphite hover:text-bidri-black border border-silver/40'
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
          <div className="py-20 text-center space-y-4 bg-mist/40 rounded-xl border border-silver/30 p-8">
            <Sparkles size={28} className="text-antique-gold mx-auto" />
            <h3 className="font-display text-2xl font-light text-bidri-black">
              No handcrafted artefacts found
            </h3>
            <p className="font-body text-xs text-graphite max-w-md mx-auto">
              We couldn&apos;t find any pieces matching your search &quot;{searchQuery}&quot;. Try searching for &quot;vase&quot;, &quot;surahi&quot;, &quot;elephant&quot;, &quot;flask&quot;, or &quot;box&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-5 py-2 bg-bidri-black text-ivory text-xs font-eyebrow uppercase tracking-widest rounded-lg cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.slug}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
