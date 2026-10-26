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
                className="group flex flex-col bg-ivory rounded-xl overflow-hidden border border-silver/35 hover:border-silver transition-all duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/11] w-full bg-mist overflow-hidden">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bidri-black/70 via-bidri-black/20 to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5 bg-ivory/90 px-2.5 py-1 rounded font-eyebrow text-[9px] text-bidri-black tracking-widest uppercase font-medium">
                    HOUSE {col.numeral}
                  </div>
                  
                  <div className="absolute bottom-3.5 inset-x-3.5 text-ivory">
                    <h2 className="font-display text-2xl font-light">
                      {col.name}
                    </h2>
                    <p className="font-eyebrow text-[10px] text-antique-gold tracking-widest uppercase mt-0.5">
                      {col.descriptor} · {colProducts.length} {colProducts.length === 1 ? 'Artefact' : 'Artefacts'}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="font-body text-xs text-graphite font-light leading-relaxed">
                    {col.description}
                  </p>

                  <div className="pt-3 border-t border-silver/25 flex items-center justify-between text-xs font-eyebrow tracking-widest text-bidri-black group-hover:text-rani-pink uppercase font-medium">
                    <span>EXPLORE PRODUCTS</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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
