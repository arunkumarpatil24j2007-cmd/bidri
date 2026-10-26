import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/content/collections';
import { products } from '@/content/products';

export const metadata: Metadata = {
  title: 'All Collections — Authentic Bidriware Handicrafts',
  description: 'Curated collections of authentic Bidriware — home décor, sculptures and statues, barware, desk accessories, and traditional Indian gifts.',
};

export default function CollectionsPage() {
  return (
    <div className="w-full bg-ivory pt-28 sm:pt-36 pb-24 select-none">
      <div className="container-luxury">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <span className="font-eyebrow text-[10.5px] text-rani-pink tracking-[0.35em] uppercase font-medium block">
            HERITAGE CATALOGUE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-bidri-black">
            Curated Collections
          </h1>
          <p className="font-body text-sm sm:text-base text-graphite font-light max-w-[52ch] leading-relaxed">
            Every collection represents an authentic expression of 600-year Deccan metalcraft, cast from zinc-copper alloy and inlaid with pure silver in Bidar, Karnataka.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => {
            const colProducts = products.filter((p) => p.collection === col.slug);

            return (
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full font-body text-xs font-semibold text-bidri-black border border-silver/40 shadow-sm">
                    {colProducts.length} {colProducts.length === 1 ? 'Artefact' : 'Artefacts'}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-1.5">
                    <h2 className="font-display text-2xl font-normal text-bidri-black group-hover:text-rani-pink transition-colors leading-tight">
                      {col.name}
                    </h2>
                    <p className="font-body text-xs sm:text-[13px] text-graphite/80 font-normal leading-relaxed">
                      {col.itemsRef}
                    </p>
                  </div>

                  <div className="w-full h-11 bg-rani-pink group-hover:bg-ilkal-red text-white font-body font-semibold text-sm rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm group-hover:shadow-md">
                    <span>Browse Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
