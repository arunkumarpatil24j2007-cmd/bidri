'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { Product } from '@/content/products';
import { useCartStore } from '@/lib/cartStore';
import { useWishlistStore } from '@/lib/wishlistStore';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const formatPrice = useCartStore((s) => s.formatPrice);
  const { isSaved, toggleSave } = useWishlistStore();

  const saved = isSaved(product.slug);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1200);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(product.slug);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="group flex flex-col w-full text-left select-none relative card-hover-rich bg-ivory p-3.5 border border-silver/35 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-5 left-5 z-20 flex flex-col gap-1.5 pointer-events-none">
        {product.edition === 'One of one' ? (
          <span className="bg-rani-pink text-ivory font-eyebrow text-[9px] tracking-[0.25em] px-2.5 py-0.5 uppercase font-medium shadow-xs">
            1 OF 1 ARCHIVE
          </span>
        ) : (
          <span className="bg-bidri-black/90 backdrop-blur-xs text-silver-bright font-eyebrow text-[8.5px] tracking-[0.22em] px-2 py-0.5 uppercase border border-white/10">
            GI TAG #12
          </span>
        )}
      </div>

      {/* Top Right Wishlist Button */}
      <button
        onClick={handleBookmark}
        className="absolute top-5 right-5 z-20 p-2 bg-ivory/90 backdrop-blur-xs border border-silver/30 text-bidri-black hover:text-rani-pink transition-colors cursor-pointer rounded-full"
        aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart size={14} fill={saved ? '#E11D48' : 'none'} className={saved ? 'text-rani-pink' : 'text-bidri-black'} />
      </button>

      <Link href={`/product/${product.slug}`} className="block focus-visible:outline-none">
        {/* Image Container 1:1 with Macro Crossfade */}
        <div className="relative aspect-square w-full bg-[#FBFAF8] overflow-hidden mb-4 border border-silver/20">
          {/* Base Hero Image */}
          <Image
            src={product.images.hero}
            alt={product.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className={`object-cover object-center transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Macro Detail Image */}
          <Image
            src={product.images.macro}
            alt={`${product.name} silver inlay detail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-center transition-opacity duration-500 ease-out absolute inset-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Quick Action Overlay Buttons on Hover */}
          <div
            className={`absolute bottom-3 inset-x-3 flex gap-2 transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
            }`}
          >
            {onQuickView && (
              <button
                onClick={handleOpenQuickView}
                className="flex-1 bg-ivory/95 hover:bg-ivory text-bidri-black text-[10px] font-eyebrow tracking-widest py-2.5 px-3 border border-silver/40 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Eye size={13} />
                <span>QUICK VIEW</span>
              </button>
            )}

            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`flex-1 text-[10px] font-eyebrow tracking-widest py-2.5 px-3 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-md ${
                isAdding
                  ? 'bg-peacock-teal text-ivory border border-peacock-teal'
                  : 'bg-bidri-black hover:bg-rani-pink text-ivory border border-bidri-black hover:border-rani-pink'
              }`}
            >
              {isAdding ? (
                <>
                  <Check size={13} />
                  <span>ADDED</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  <span>ADD TO BAG</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-body text-[14px] text-bidri-black font-normal tracking-[0.03em] group-hover:text-rani-pink transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="font-body text-[14px] text-bidri-black font-semibold tracking-wide flex-shrink-0">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-body text-graphite/75 font-light pt-0.5 border-t border-silver/20 mt-1">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span>{product.inlay} Inlay</span>
            </span>
            <span className="text-antique-gold font-medium italic font-display">{product.craftHours}h Chisel</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

