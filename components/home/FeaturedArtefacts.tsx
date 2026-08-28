'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products, Product } from '@/content/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { Reveal } from '@/components/ui/Reveal';

export const FeaturedArtefacts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = products.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.collection === activeCategory;
  }).slice(0, 6);

  return (
    <section className="section-luxury container-luxury select-none" id="featured" aria-label="Featured Artefacts">
      {/* Header & Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-silver/40 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-rani-pink/10 border border-rani-pink/30 px-3 py-1 mb-2">
            <Sparkles size={12} className="text-rani-pink" />
            <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.38em] uppercase font-medium">
              CURATED MASTERPIECES
            </span>
          </div>
          <h2 className="font-display headline-sub font-light text-bidri-black">
            The Bidri Edit
          </h2>
          <p className="font-body text-xs sm:text-sm text-graphite font-light mt-1">
            Handcrafted in Bidar. Styled for everywhere.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Curations' },
            { id: 'jewellery', label: 'Jewellery' },
            { id: 'table-and-decor', label: 'Table & Decor' },
            { id: 'barware', label: 'Barware' },
            { id: 'gifting', label: 'Gifting' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-body transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-bidri-black text-ivory font-medium shadow-xs'
                  : 'bg-ivory text-graphite hover:text-bidri-black border border-silver/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((product, idx) => (
          <Reveal key={product.slug} delay={idx * 0.05}>
            <ProductCard
              product={product}
              priority={idx < 3}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          </Reveal>
        ))}
      </div>

      {/* Bottom CTA to Full Shop */}
      <div className="mt-14 text-center pt-8 border-t border-silver/30">
        <Link
          href="/shop"
          className="inline-flex items-center space-x-3 px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-rani-pink transition-colors duration-300 shadow-md"
        >
          <span>EXPLORE ALL 24 ARTEFACTS IN SHOP</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};

