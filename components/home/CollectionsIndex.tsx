'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/content/collections';

export const CollectionsIndex: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-mist/40 border-y border-silver/35 select-none" id="collections" aria-label="Curated Collections">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-5 border-b border-silver/35">
          <div>
            <span className="font-eyebrow text-[10.5px] text-rani-pink tracking-[0.35em] uppercase font-medium block">
              HERITAGE TYPOLOGIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-1">
              Curated Collections
            </h2>
            <p className="font-body text-xs sm:text-sm text-graphite font-light mt-1">
              Explore themed series designed around authentic South Indian living rituals.
            </p>
          </div>
          <Link
            href="/collections"
            className="font-eyebrow text-[11px] text-bidri-black hover:text-rani-pink tracking-[0.25em] uppercase hover-link-rule self-start sm:self-auto flex items-center space-x-1"
          >
            <span>ALL COLLECTIONS</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 3-Column Image-Led Collection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group flex flex-col bg-ivory rounded-xl overflow-hidden border border-silver/35 hover:border-silver transition-all duration-300 hover:shadow-lg"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full bg-mist overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bidri-black/75 via-bidri-black/20 to-transparent" />
                
                {/* Badges on image */}
                <div className="absolute top-3.5 left-3.5 bg-ivory/90 backdrop-blur-xs px-2.5 py-1 rounded font-eyebrow text-[9px] text-bidri-black tracking-widest uppercase font-medium">
                  HOUSE {col.numeral}
                </div>
                
                <div className="absolute bottom-3.5 inset-x-3.5 text-ivory">
                  <h3 className="font-display text-2xl font-light leading-snug">
                    {col.name}
                  </h3>
                  <p className="font-eyebrow text-[10px] text-antique-gold tracking-widest uppercase mt-0.5">
                    {col.descriptor} · {col.count} Artefacts
                  </p>
                </div>
              </div>

              {/* Text Body & Link */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="font-body text-xs text-graphite font-light leading-relaxed line-clamp-2">
                  {col.description}
                </p>

                <div className="pt-2 border-t border-silver/25 flex items-center justify-between text-xs font-eyebrow tracking-widest text-bidri-black group-hover:text-rani-pink uppercase font-medium">
                  <span>BROWSE COLLECTION</span>
                  <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
