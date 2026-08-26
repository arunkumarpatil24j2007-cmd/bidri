import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/content/collections';
import { products } from '@/content/products';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'All Collections',
  description: 'Six distinct houses of authentic Bidriware — jewellery, table and decor, barware, desk objects, gifting, and archival pieces.',
};

export default function CollectionsPage() {
  return (
    <div className="w-full bg-ivory pt-32 pb-24 select-none">
      <div className="container-luxury">
        {/* Header */}
        <div className="max-w-2xl mb-20 space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            THE CATALOGUE
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            The Six Collections
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch]">
            Every typology represents a dedicated chapter in Deccan court metalcraft, from wearable adornments to permanent archival monuments.
          </p>
        </div>

        {/* Collections Editorial Grid */}
        <div className="space-y-32">
          {collections.map((col, idx) => {
            const colProducts = products.filter((p) => p.collection === col.slug);
            const isReversed = idx % 2 === 1;

            return (
              <section
                key={col.slug}
                className="border-t border-silver/40 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Image (7 cols) */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Reveal scale>
                    <Link
                      href={`/collections/${col.slug}`}
                      className="block relative aspect-[16/10] w-full bg-mist border border-silver/40 overflow-hidden group"
                      data-cursor="view"
                    >
                      <Image
                        src={col.image}
                        alt={col.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-ivory/95 px-3 py-1 font-eyebrow text-[10px] text-bidri-black tracking-[0.25em] uppercase border border-silver/30">
                        {col.numeral} / {col.descriptor}
                      </div>
                    </Link>
                  </Reveal>
                </div>

                {/* Narrative (5 cols) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:order-1 lg:pr-12' : 'lg:order-2 lg:pl-12'
                  }`}
                >
                  <Reveal delay={0.1}>
                    <span className="font-display text-sm text-silver italic font-light">
                      Collection {col.numeral}
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-light text-bidri-black mt-1">
                      {col.name}
                    </h2>
                    <p className="font-body text-base text-graphite font-light leading-relaxed mt-4">
                      {col.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <div className="pt-2 flex items-center justify-between border-t border-silver/30 pt-4">
                      <span className="font-body text-xs text-graphite/70 font-light">
                        {colProducts.length} {colProducts.length === 1 ? 'Artefact' : 'Artefacts'} in Collection
                      </span>
                      <Link
                        href={`/collections/${col.slug}`}
                        className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule"
                      >
                        EXPLORE HOUSES →
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
