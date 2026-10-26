'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/content/collections';

export const CategoryTiles: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 container-luxury select-none" aria-label="Shop by Category">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-5 border-b border-silver/35">
        <div>
          <span className="font-eyebrow text-[10.5px] text-rani-pink tracking-[0.35em] uppercase font-medium block">
            EXPLORE THE STORE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-1">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/shop"
          className="font-eyebrow text-[11px] text-bidri-black hover:text-rani-pink tracking-[0.25em] uppercase hover-link-rule self-start sm:self-auto flex items-center space-x-1"
        >
          <span>VIEW FULL CATALOGUE</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Visual Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {collections.filter(c => c.slug !== 'the-archive').map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className="group flex flex-col bg-ivory rounded-xl p-3 border border-silver/30 hover:border-silver transition-all duration-300 hover:shadow-md"
          >
            {/* Image Aspect 4:3 or 1:1 */}
            <div className="relative aspect-square w-full rounded-lg bg-mist overflow-hidden mb-3 border border-silver/20">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bidri-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-2.5 left-2.5 text-ivory">
                <span className="font-eyebrow text-[9px] tracking-widest uppercase text-silver-bright/80 block">
                  {cat.count} PIECES
                </span>
              </div>
            </div>

            {/* Name & Arrow */}
            <div className="flex items-center justify-between px-1">
              <h3 className="font-body text-xs sm:text-sm font-medium text-bidri-black group-hover:text-rani-pink transition-colors">
                {cat.name}
              </h3>
              <span className="text-graphite/40 group-hover:text-rani-pink group-hover:translate-x-0.5 transition-all text-xs font-semibold">
                →
              </span>
            </div>
            <p className="font-body text-[11px] text-graphite/60 font-light px-1 mt-0.5 line-clamp-1">
              {cat.descriptor}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
