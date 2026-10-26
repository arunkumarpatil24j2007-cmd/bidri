'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Check, Shield, Truck, RotateCcw, Award, Plus, Minus, ShoppingBag } from 'lucide-react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const formatPrice = useCartStore((s) => s.formatPrice);
  const { isSaved, toggleSave } = useWishlistStore();

  const saved = isSaved(product.slug);
  const artisan = artisans.find((a) => a.id === product.artisanId) || artisans[0];

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  // Stack of images
  const images = [
    product.images.hero,
    product.images.macro,
    product.images.inFrame,
  ].filter(Boolean) as string[];

  // Accordion Items
  const accordionItems: AccordionItem[] = [
    {
      id: 'specifications',
      title: 'Specifications & Dimensions',
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
            <strong className="font-normal text-bidri-black">Inlay Work:</strong> {product.inlay} (99.9% fine silver beaten wire & sheet)
          </p>
          <p>
            <strong className="font-normal text-bidri-black">Artisan Atelier:</strong> {product.artisanName} · Bidar, Karnataka
          </p>
          <p>
            <strong className="font-normal text-bidri-black">GI Certification:</strong> Geographical Indication Registry Tag No. 12
          </p>
        </div>
      ),
    },
    {
      id: 'making',
      title: 'Craftsmanship & Artisans',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-lg bg-mist border border-silver/40 overflow-hidden flex-shrink-0">
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
            Crafted over {product.craftHours} hours of freehand chiselling (Kandankari), pure silver inlay (Tarkashi), and fort soil oxidation in our Bidar atelier.
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care & Maintenance Instructions',
      content: (
        <p className="text-xs text-graphite font-light leading-relaxed">
          {product.care}
        </p>
      ),
    },
    {
      id: 'shipping',
      title: 'Delivery & Returns (India)',
      content: (
        <div className="space-y-2 text-xs text-graphite font-light leading-relaxed">
          <p>
            <strong>Free Insured Express Delivery</strong> across India via Bluedart and Delhivery.
          </p>
          <p>
            Dispatched in archival custom-cushioned wooden boxes with tamper-evident security seal. Delivered within 3–5 business days.
          </p>
          <p>
            Hassle-free 7-day returns or exchanges if damaged during transit.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-ivory pt-28 select-none">
      {/* Top Breadcrumb */}
      <div className="container-luxury pb-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs font-body text-graphite/60 font-light">
            <li>
              <Link href="/" className="hover-link-rule">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" className="hover-link-rule">
                Shop All
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/collections/${product.collection}`} className="hover-link-rule capitalize">
                {product.collection.replace(/-/g, ' ')}
              </Link>
            </li>
            <li>/</li>
            <li className="text-bidri-black font-medium line-clamp-1">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Main Two-Column Layout */}
      <div className="container-luxury pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Showcase with Thumbnails */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full bg-[#FBFAF8] rounded-xl border border-silver/35 overflow-hidden shadow-xs">
              <Image
                src={images[selectedImageIndex] || images[0]}
                alt={`${product.name} view ${selectedImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-all duration-300"
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                {product.edition === 'One of one' ? (
                  <span className="bg-rani-pink text-ivory font-eyebrow text-[9.5px] tracking-widest px-3 py-1 uppercase rounded-md shadow-xs">
                    1 OF 1 ARCHIVAL MASTERPIECE
                  </span>
                ) : (
                  <span className="bg-bidri-black/90 backdrop-blur-xs text-silver-bright font-eyebrow text-[9px] tracking-widest px-2.5 py-0.5 uppercase border border-white/10 rounded-md">
                    GI TAG #12 KARNATAKA
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-bidri-black ring-2 ring-bidri-black/10'
                        : 'border-silver/40 hover:border-graphite opacity-75 hover:opacity-100'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Rail: Product Info & Order Placement */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 text-left">
            {/* 1. Collection & In-stock badge */}
            <div className="flex items-center justify-between">
              <span className="font-eyebrow text-[10px] text-graphite/70 tracking-[0.35em] uppercase font-medium">
                {product.collection.replace(/-/g, ' ')}
              </span>
              <span className="inline-flex items-center space-x-1.5 text-xs text-peacock-teal font-medium bg-peacock-teal/10 px-2.5 py-0.5 rounded-full border border-peacock-teal/20">
                <span className="w-1.5 h-1.5 rounded-full bg-peacock-teal animate-pulse" />
                <span>{product.stock > 0 ? 'In Stock · Ready to Dispatch' : 'Crafted to Order'}</span>
              </span>
            </div>

            {/* 2. Product Name */}
            <h1 className="font-display text-3xl sm:text-4xl font-light text-bidri-black leading-snug">
              {product.name}
            </h1>

            {/* 3. Price Display */}
            <div className="flex items-baseline space-x-3">
              <span className="font-body text-3xl font-semibold text-bidri-black">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs font-body text-graphite/60">
                (Inclusive of all taxes & delivery across India)
              </span>
            </div>

            {/* 4. Specifications Summary */}
            <div className="p-3.5 bg-mist/60 rounded-lg border border-silver/30 font-body text-xs text-graphite space-y-1.5">
              <div className="flex justify-between">
                <span className="text-graphite/70">Materials:</span>
                <span className="font-medium text-bidri-black">{product.metal} · {product.inlay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite/70">Dimensions:</span>
                <span className="font-medium text-bidri-black">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-graphite/70">Craftsmanship:</span>
                <span className="font-medium text-bidri-black">{product.craftHours} hours hand chisel</span>
              </div>
            </div>

            {/* 5. Short Description */}
            <p className="font-body text-sm text-graphite font-light leading-relaxed">
              {product.story}
            </p>

            {/* 6. Purchase Area: Quantity & Add to Bag */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-silver/50 rounded-lg bg-ivory px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-graphite hover:text-bidri-black cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-body text-sm font-medium text-bidri-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 text-graphite hover:text-bidri-black cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 rounded-lg text-ivory flex items-center justify-center space-x-2 font-eyebrow text-xs tracking-[0.25em] uppercase font-medium transition-all duration-200 cursor-pointer shadow-md ${
                    addedAnimation
                      ? 'bg-peacock-teal'
                      : 'bg-bidri-black hover:bg-rani-pink'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={16} />
                      <span>ADDED TO YOUR BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>ADD TO BAG · {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleSave(product.slug)}
                  className={`h-12 w-12 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                    saved
                      ? 'border-rani-pink bg-rani-pink/10 text-rani-pink'
                      : 'border-silver/50 hover:border-bidri-black text-bidri-black bg-ivory'
                  }`}
                  aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart size={18} fill={saved ? '#E11D48' : 'none'} />
                </button>
              </div>
            </div>

            {/* 7. India Delivery & Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-silver/30">
              <div className="flex items-center space-x-2 text-xs font-body text-graphite">
                <Truck size={15} className="text-antique-gold flex-shrink-0" />
                <span>Free delivery across India</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-body text-graphite">
                <Shield size={15} className="text-peacock-teal flex-shrink-0" />
                <span>Karnataka GI Tag #12 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-body text-graphite">
                <RotateCcw size={15} className="text-graphite flex-shrink-0" />
                <span>7-Day Insured Transit Protection</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-body text-graphite">
                <Award size={15} className="text-saffron flex-shrink-0" />
                <span>Direct Artisan Cooperative</span>
              </div>
            </div>

            {/* 8. Accordions */}
            <div className="pt-2">
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Handicrafts */}
      {relatedProducts.length > 0 && (
        <section className="section-luxury container-luxury border-t border-silver/40 select-none" aria-label="Related Products">
          <div className="mb-10 flex items-baseline justify-between">
            <div>
              <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.35em] uppercase block">
                COMPLEMENTARY ARTEFACTS
              </span>
              <h2 className="font-display text-3xl font-light text-bidri-black mt-1">
                More Handcrafted Masterpieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-eyebrow text-[11px] text-bidri-black hover:text-rani-pink tracking-[0.25em] uppercase hover-link-rule"
            >
              VIEW ALL CATALOGUE →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.slice(0, 3).map((rel) => (
              <ProductCard key={rel.slug} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
