import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { collections } from '@/content/collections';
import { products } from '@/content/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

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
    title: `${col.name} — ${col.descriptor}`,
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
    <div className="w-full bg-ivory pt-32 pb-24 select-none">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
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
            <li className="text-bidri-black">{col.name}</li>
          </ol>
        </nav>

        {/* Collection Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="font-display text-sm text-silver italic">Collection {col.numeral}</span>
            <span className="text-silver/40">·</span>
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase">
              {col.descriptor}
            </span>
          </div>

          <h1 className="font-display headline-sub font-light text-bidri-black">
            {col.name}
          </h1>

          <p className="font-body text-base text-graphite font-light max-w-[54ch]">
            {col.description}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 pt-8 border-t border-silver/40">
          {colProducts.map((product, idx) => (
            <Reveal key={product.slug} delay={idx * 0.05}>
              <ProductCard product={product} priority={idx < 3} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
