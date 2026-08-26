'use client';

import React from 'react';
import Link from 'next/link';
import { products } from '@/content/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

export const FeaturedArtefacts: React.FC = () => {
  // 4 Featured products only
  const featured = [
    products.find((p) => p.slug === 'inlay-choker-royal-charm') || products[0],
    products.find((p) => p.slug === 'bulbous-vase-12') || products[7],
    products.find((p) => p.slug === 'hip-flask') || products[12],
    products.find((p) => p.slug === 'paan-daan-box') || products[20],
  ];

  return (
    <section className="section-luxury container-luxury select-none" aria-label="Featured Artefacts">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Full Column of Empty Ivory on Desktop (Left 4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between pr-8">
          <div className="space-y-6">
            <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
              SELECTION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bidri-black leading-tight">
              Featured<br />
              Artefacts
            </h2>
            <p className="font-body text-sm text-graphite font-light leading-relaxed max-w-[34ch]">
              Four masterworks exemplifying the contrast between oxidized zinc alloy and pure silver inlay.
            </p>
          </div>

          <div className="pt-12">
            <Link
              href="/collections"
              className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule"
            >
              VIEW ALL 24 PIECES →
            </Link>
          </div>
        </div>

        {/* 2x2 Grid on Desktop (Right 8 columns) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16">
          {featured.map((product, idx) => (
            <Reveal key={product.slug} delay={idx * 0.08}>
              <ProductCard product={product} priority={idx < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
