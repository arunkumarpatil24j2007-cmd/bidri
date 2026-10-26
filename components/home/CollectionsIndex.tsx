'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/content/collections';

export const CollectionsIndex: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-mist/60 border-y border-silver/40 select-none" id="collections" aria-label="Curated Collections">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-silver/40">
          <div>
            <span className="font-eyebrow text-[11px] text-rani-pink tracking-[0.35em] uppercase font-semibold block">
              CURATED HERITAGE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-bidri-black mt-1">
              Shop by Collection
            </h2>
            <p className="font-body text-sm sm:text-base text-graphite/90 font-light mt-1.5 max-w-[50ch]">
              Select a themed collection to explore authentic Bidriware handcrafted in Bidar, Karnataka.
            </p>
          </div>
          <Link
            href="/collections"
            className="font-body text-sm font-semibold text-bidri-black hover:text-rani-pink tracking-wide transition-colors self-start sm:self-auto flex items-center space-x-1.5"
          >
            <span>View All Collections</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3-Column Image-Led Collection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E2DFD8] hover:border-rani-pink/50 transition-all duration-300 shadow-[0_4px_20px_rgba(20,16,15,0.06)] hover:shadow-[0_16px_36px_rgba(20,16,15,0.14)] hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] w-full bg-[#FAF8F5] overflow-hidden border-b border-silver/20">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Item count badge on top right */}
                <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full font-body text-xs font-semibold text-bidri-black border border-silver/40 shadow-sm">
                  {col.count} {col.count === 1 ? 'Artefact' : 'Artefacts'}
                </div>
              </div>

              {/* Card Body — Clean, simple & visible without heavy paragraphs */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-1.5">
                  <h3 className="font-display text-2xl font-normal text-bidri-black group-hover:text-rani-pink transition-colors leading-tight">
                    {col.name}
                  </h3>
                  <p className="font-body text-xs sm:text-[13px] text-graphite/80 font-normal leading-relaxed">
                    {col.itemsRef}
                  </p>
                </div>

                {/* Eye-Catching Action Button */}
                <div className="w-full h-11 bg-rani-pink group-hover:bg-ilkal-red text-white font-body font-semibold text-sm rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm group-hover:shadow-md">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
