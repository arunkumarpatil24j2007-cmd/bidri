import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, Product } from '@/content/products';
import { ProductClientView } from '@/components/product/ProductClientView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: 'Artefact' };

  return {
    title: `${product.name} — ${product.formattedPrice}`,
    description: product.story,
    openGraph: {
      title: `${product.name} · BIDRI CRAFTS`,
      description: product.story,
      images: [{ url: product.images.hero, width: 800, height: 800, alt: product.alt }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same collection or adjacent
  const relatedProducts = products.filter(
    (p) => p.slug !== product.slug && (p.collection === product.collection || p.price > 0)
  );

  // JSON-LD Product Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [`https://bidricrafts.com${product.images.hero}`],
    description: product.story,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'BIDRI CRAFTS',
    },
    offers: {
      '@type': 'Offer',
      url: `https://bidricrafts.com/product/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price > 0 ? product.price : undefined,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClientView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
