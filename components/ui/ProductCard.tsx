'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/content/products';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col w-full text-left select-none relative card-hover-rich bg-ivory p-3 border border-silver/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="view"
    >
      <Link href={`/product/${product.slug}`} className="block focus-visible:outline-none">
        {/* Image Container 1:1 with Ivory Background and Subtle Contact Shadow */}
        <div className="relative aspect-square w-full bg-[#FBFAF8] overflow-hidden mb-4 border border-silver/20">
          {/* Base Hero Image */}
          <Image
            src={product.images.hero}
            alt={product.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className={`object-cover object-center transition-opacity duration-600 ease-out ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Macro Detail Image (crossfade on hover) */}
          <Image
            src={product.images.macro}
            alt={`${product.name} silver inlay detail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-center transition-opacity duration-600 ease-out absolute inset-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Quick View Hairline Overlay on hover with vibrant Rani Pink text on dark */}
          <div
            className={`absolute bottom-0 inset-x-0 bg-bidri-black/95 backdrop-blur-sm border-t border-silver/30 py-2.5 text-center transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            <span className="font-eyebrow text-[9.5px] text-ivory tracking-[0.3em] uppercase group-hover:text-silver-bright">
              VIEW ARTEFACT · {product.edition}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-1 px-1">
          <div className="flex items-baseline justify-between">
            <h3 className="font-body text-[14px] text-bidri-black font-normal tracking-[0.06em] group-hover:text-rani-pink transition-colors">
              {product.name}
            </h3>
            <span className="font-body text-[14px] text-bidri-black font-medium tracking-wide pl-2">
              {product.formattedPrice}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-body text-graphite/70 font-light pt-0.5">
            <span>Bidar Atelier · {product.inlay}</span>
            <span className="text-antique-gold/80 italic font-display">{product.craftHours}h Craft</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
