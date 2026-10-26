import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { collections } from '@/content/collections';
import { products } from '@/content/products';
import { ProductCard } from '@/components/ui/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = collections.find((c) => c.slug === slug);
  if (!col) return { title: 'Collection' };

  return {
    title: `${col.name} — ${col.descriptor} | Bidri Crafts`,
    description: col.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const col = collections.find((c) => c.slug === slug);

  if (!col) {
    notFound();
  }

  const colProducts = products.filter((p) => p.collection === col.slug);

  return (
    <div className="w-full bg-ivory pt-28 sm:pt-36 pb-24 select-none min-h-screen">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs font-body text-graphite/60 font-light">
            <li>
              <Link href="/" className="hover-link-rule">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/collections" className="hover-link-rule">
                Collections
              </Link>
            </li>
            <li>/</li>
            <li className="text-bidri-black font-medium">{col.name}</li>
          </ol>
        </nav>

        {/* Collection Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center space-x-3">
            <span className="font-display text-sm text-antique-gold italic font-medium">House {col.numeral}</span>
            <span className="text-silver/60">·</span>
            <span className="font-eyebrow text-[10px] text-graphite/70 tracking-[0.35em] uppercase">
              {col.descriptor}
            </span>
            <span className="text-silver/60">·</span>
            <span className="text-xs font-body text-graphite/60">
              {colProducts.length} {colProducts.length === 1 ? 'Piece' : 'Pieces'}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-bidri-black">
            {col.name}
          </h1>

          <p className="font-body text-sm sm:text-base text-graphite font-light max-w-[54ch] leading-relaxed">
            {col.description}
          </p>
        </div>

        {/* Product Grid: 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-silver/35">
          {colProducts.map((product, idx) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
