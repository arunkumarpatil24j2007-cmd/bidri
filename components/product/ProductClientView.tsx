'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Check, Shield, Compass, Sparkles } from 'lucide-react';
import { Product } from '@/content/products';
import { artisans } from '@/content/artisans';
import { useCartStore } from '@/lib/cartStore';
import { useWishlistStore } from '@/lib/wishlistStore';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { ProductCard } from '@/components/ui/ProductCard';

interface ProductClientViewProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductClientView: React.FC<ProductClientViewProps> = ({
  product,
  relatedProducts,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { isSaved, toggleSave } = useWishlistStore();

  const saved = isSaved(product.slug);
  const artisan = artisans.find((a) => a.id === product.artisanId) || artisans[0];

  const handleAddToCart = () => {
    addItem(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  // Stack of images for left column
  const images = [
    product.images.hero,
    product.images.macro,
    product.images.inFrame || product.images.hero,
  ].filter(Boolean) as string[];

  // Accordion Items
  const accordionItems: AccordionItem[] = [
    {
      id: 'dimensions',
      title: 'Dimensions & Weight',
      content: (
        <div className="space-y-2 text-xs font-light text-graphite">
          <p>
            <strong className="font-normal text-bidri-black">Dimensions:</strong> {product.dimensions}
          </p>
          <p>
            <strong className="font-normal text-bidri-black">Total Weight:</strong> {product.weight}
          </p>
          <p>
            <strong className="font-normal text-bidri-black">Base Alloy:</strong> 94% High-grade Zinc, 6% Refined Copper
          </p>
          <p>
            <strong className="font-normal text-bidri-black">Inlay Grade:</strong> {product.inlay} (99.9% fine silver)
          </p>

          {/* Size Reference Line Drawing for Jewellery */}
          {product.collection === 'jewellery' && (
            <div className="pt-3 border-t border-silver/30 mt-3">
              <span className="font-eyebrow text-[9px] text-graphite/60 tracking-[0.2em] uppercase block mb-2">
                SCALE COMPARISON
              </span>
              <svg width="100%" height="48" viewBox="0 0 240 48" fill="none" className="stroke-silver">
                <circle cx="24" cy="24" r="14" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="24" y="27" fill="#3A3634" fontSize="7" textAnchor="middle" fontFamily="var(--font-jost)">1:1 SCALE</text>
                <line x1="60" y1="24" x2="230" y2="24" strokeWidth="0.8" />
                <line x1="60" y1="18" x2="60" y2="30" strokeWidth="0.8" />
                <line x1="230" y1="18" x2="230" y2="30" strokeWidth="0.8" />
                <text x="145" y="20" fill="#3A3634" fontSize="8" textAnchor="middle" fontFamily="var(--font-jost)">{product.dimensions.split('·')[0]}</text>
              </svg>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'making',
      title: 'The Making',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 bg-mist border border-silver/40 overflow-hidden flex-shrink-0">
              <Image
                src={artisan.image}
                alt={artisan.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-body text-xs font-normal text-bidri-black">{artisan.name}</p>
              <p className="font-body text-[11px] text-graphite/70 font-light">{artisan.lineage}</p>
            </div>
          </div>
          <p className="text-xs text-graphite font-light leading-relaxed">
            Crafted over {product.craftHours} hours of freehand chiselling and Fort soil oxidation in our Old City Bidar atelier.
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care & Maintenance',
      content: (
        <p className="text-xs text-graphite font-light leading-relaxed">
          {product.care}
        </p>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <p className="text-xs text-graphite font-light leading-relaxed">
          Dispatched in archival custom-moulded boxes with tamper-proof seal. Delivered within 3–5 working days globally. Complimentary worldwide shipping. Returns accepted within 14 days of receipt.
        </p>
      ),
    },
  ];

  const isPoa = product.price === 0;

  return (
    <div className="w-full bg-ivory pt-28 select-none">
      {/* Top Breadcrumb */}
      <div className="container-luxury pb-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs font-body text-graphite/60 font-light">
            <li>
              <Link href="/" className="hover-link-rule">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/collections/${product.collection}`} className="hover-link-rule capitalize">
                {product.collection.replace('-', ' ')}
              </Link>
            </li>
            <li>/</li>
            <li className="text-bidri-black">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Main Two-Column Layout */}
      <div className="container-luxury pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Natural Vertical Stack of Images (no gaps other than 8px) */}
          <div className="lg:col-span-7 space-y-2">
            {images.map((imgSrc, idx) => (
              <div
                key={idx}
                className="relative aspect-square w-full bg-mist border border-silver/40 overflow-hidden"
                data-cursor="view"
              >
                <Image
                  src={imgSrc}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Right Rail: Sticky Right Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-7 text-left">
            {/* 1. Collection Eyebrow */}
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
              COLLECTION · {product.collection.replace('-', ' ')}
            </span>

            {/* 2. Name in Cormorant 40px */}
            <h1 className="font-display text-4xl sm:text-[40px] font-light text-bidri-black leading-[1.1]">
              {product.name}
            </h1>

            {/* 3. Price */}
            <div className="font-body text-xl text-bidri-black font-light tracking-wide">
              {product.formattedPrice}
            </div>

            {/* 4. One Line of Specification */}
            <div className="font-body text-xs text-graphite/70 font-light border-y border-silver/30 py-2.5 flex items-center justify-between">
              <span>{product.metal} · {product.inlay}</span>
              <span>{product.edition} Edition</span>
            </div>

            {/* 5. 45-Word Story */}
            <p className="font-body text-[14px] text-graphite font-light leading-relaxed">
              {product.story}
            </p>

            {/* 6. ADD TO BAG / ENQUIRE full-width bidri-black bar */}
            <div className="space-y-3 pt-2">
              {isPoa ? (
                <Link
                  href={`/bespoke?enquiry=${product.slug}`}
                  className="w-full h-14 bg-bidri-black text-ivory flex items-center justify-center font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-bidri-black transition-colors duration-300"
                >
                  ENQUIRE
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full h-14 bg-bidri-black text-ivory flex items-center justify-center font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-bidri-black transition-colors duration-300 cursor-pointer focus-visible:outline-none"
                >
                  {addedAnimation ? 'ADDED TO BAG' : 'ADD TO BAG'}
                </button>
              )}

              {/* 7. SAVE text link */}
              <button
                onClick={() => toggleSave(product.slug)}
                className="w-full py-2 text-center font-eyebrow text-[10px] text-graphite hover:text-bidri-black tracking-[0.25em] uppercase cursor-pointer hover-link-rule focus-visible:outline-none"
              >
                {saved ? '✓ SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}
              </button>
            </div>

            {/* 8. Four Thin Accordions */}
            <div className="pt-4">
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>
      </div>

      {/* Below the Fold: Full-Bleed Macro of Inlay */}
      <section className="w-full bg-ivory border-y border-silver/40 py-24 select-none" aria-label="Inlay Macro Detail">
        <div className="container-luxury">
          <div className="mb-8 flex items-baseline justify-between">
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase">
              TARKASHI DETAIL · 100MM MACRO
            </span>
            <span className="font-body text-xs text-graphite/60 font-light">
              Pure Silver Embedded in Matte Alloy
            </span>
          </div>

          <div className="relative aspect-[16/9] w-full bg-mist border border-silver/40 overflow-hidden" data-cursor="view">
            <Image
              src={product.images.macro}
              alt={`${product.name} extreme silver inlay macro`}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Below the Fold: "Also from Bidar" with three products */}
      {relatedProducts.length > 0 && (
        <section className="section-luxury container-luxury select-none" aria-label="Related Products">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-light text-bidri-black">
              Also from Bidar
            </h2>
            <Link
              href="/collections"
              className="font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.slice(0, 3).map((rel) => (
              <ProductCard key={rel.slug} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Below the Fold: 60px-Tall Certificate Bar */}
      <div className="w-full h-[60px] bg-mist border-t border-silver/40 flex items-center justify-center px-4 select-none">
        <div className="container-luxury flex items-center justify-between text-xs font-body text-graphite">
          <div className="flex items-center space-x-2">
            <Shield size={14} className="text-bidri-black" />
            <span>Every piece ships with a numbered Certificate of Authenticity.</span>
          </div>
          <Link
            href="/authenticity"
            className="font-eyebrow text-[10px] text-bidri-black tracking-[0.25em] uppercase hover-link-rule"
          >
            Verify →
          </Link>
        </div>
      </div>
    </div>
  );
};
