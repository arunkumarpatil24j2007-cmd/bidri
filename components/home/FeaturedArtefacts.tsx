'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '@/content/products';
import { ProductCard } from '@/components/ui/ProductCard';

export const FeaturedArtefacts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = products
    .filter((p) => {
      if (activeCategory === 'all') return true;
      return p.collection === activeCategory;
    })
    .slice(0, 6);

  return (
    <section className="py-16 sm:py-20 container-luxury select-none" id="bestsellers" aria-label="Bestselling Artefacts">
      {/* Header & Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-5 border-b border-silver/35">
        <div>
          <div className="inline-flex items-center space-x-2 bg-saffron/10 border border-saffron/30 px-3 py-1 rounded-full mb-2">
            <Sparkles size={12} className="text-antique-gold" />
            <span className="font-eyebrow text-[10px] text-antique-gold tracking-[0.3em] uppercase font-medium">
              MOST COVETED MASTERPIECES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black">
            Bestselling Bidriware
          </h2>
          <p className="font-body text-xs sm:text-sm text-graphite font-light mt-1">
            Hand-cast in Bidar, Karnataka. Finished in pure silver Tarkashi inlay.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Bestsellers' },
            { id: 'table-and-decor', label: 'Home Décor' },
            { id: 'sculptures-and-statues', label: 'Sculptures' },
            { id: 'barware', label: 'Barware' },
            { id: 'gifting', label: 'Gifts' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-body rounded-full transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-bidri-black text-ivory font-medium shadow-xs'
                  : 'bg-ivory text-graphite hover:text-bidri-black border border-silver/40 hover:border-graphite'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid: 2 columns on mobile, 3 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {filtered.map((product, idx) => (
          <ProductCard
            key={product.slug}
            product={product}
            priority={idx < 3}
          />
        ))}
      </div>

      {/* Bottom CTA to Full Catalog */}
      <div className="mt-12 text-center pt-8 border-t border-silver/30">
        <Link
          href="/shop"
          className="inline-flex items-center space-x-3 px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-xs tracking-[0.25em] uppercase hover:bg-rani-pink transition-colors duration-300 rounded-lg shadow-md"
        >
          <span>EXPLORE COMPLETE COLLECTION IN SHOP ALL</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
