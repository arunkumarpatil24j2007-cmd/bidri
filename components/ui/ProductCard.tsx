'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, Check } from 'lucide-react';
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(product.slug);
  };

  return (
    <div
      className="group flex flex-col w-full text-left select-none relative bg-ivory rounded-xl p-3 border border-silver/35 hover:border-silver transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        {product.edition === 'One of one' ? (
          <span className="bg-rani-pink text-ivory font-eyebrow text-[8.5px] tracking-[0.2em] px-2 py-0.5 uppercase font-medium rounded-md shadow-xs">
            1 OF 1 ARCHIVE
          </span>
        ) : (
          <span className="bg-bidri-black/90 backdrop-blur-xs text-silver-bright font-eyebrow text-[8px] tracking-[0.18em] px-2 py-0.5 uppercase border border-white/10 rounded-md">
            GI TAG #12
          </span>
        )}
      </div>

      {/* Top Right Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full border backdrop-blur-xs transition-colors cursor-pointer ${
          saved
            ? 'bg-ivory border-rani-pink text-rani-pink'
            : 'bg-ivory/90 border-silver/30 text-graphite hover:text-rani-pink hover:border-silver'
        }`}
        aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart size={14} fill={saved ? '#E11D48' : 'none'} />
      </button>

      <Link href={`/product/${product.slug}`} className="block focus-visible:outline-none">
        {/* Square Product Image 1:1 against clean neutral backdrop */}
        <div className="relative aspect-square w-full bg-[#FBFAF8] rounded-lg overflow-hidden mb-3 border border-silver/20">
          {/* Base Hero Image */}
          <Image
            src={product.images.hero}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover object-center transition-opacity duration-500 ease-out ${
              isHovered && product.images.macro ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Macro Detail Image on Hover */}
          {product.images.macro && (
            <Image
              src={product.images.macro}
              alt={`${product.name} silver inlay detail`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-opacity duration-500 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Quick Add Overlay on Hover (Desktop) */}
          <div
            className={`absolute bottom-2.5 inset-x-2.5 hidden sm:flex transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`w-full py-2 px-3 text-[10px] font-eyebrow tracking-widest uppercase rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-md ${
                isAdding
                  ? 'bg-peacock-teal text-ivory border border-peacock-teal'
                  : 'bg-bidri-black hover:bg-rani-pink text-ivory border border-bidri-black hover:border-rani-pink'
              }`}
            >
              {isAdding ? (
                <>
                  <Check size={12} />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={12} />
                  <span>ADD TO BAG</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Name & Clean INR Price */}
        <div className="space-y-1 px-0.5">
          <h3 className="font-body text-[13.5px] sm:text-[14px] text-bidri-black font-normal tracking-[0.01em] group-hover:text-rani-pink transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-baseline justify-between pt-0.5">
            <span className="font-body text-sm sm:text-[15px] text-bidri-black font-semibold tracking-tight">
              {formatPrice(product.price)}
            </span>
            <span className="text-[11px] font-body text-graphite/60 font-light">
              {product.inlay}
            </span>
          </div>
        </div>
      </Link>

      {/* Mobile Add to Bag Button */}
      <div className="mt-2.5 sm:hidden">
        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className={`w-full py-2 text-[10px] font-eyebrow tracking-widest uppercase rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
            isAdding
              ? 'bg-peacock-teal text-ivory'
              : 'bg-bidri-black text-ivory active:bg-rani-pink'
          }`}
        >
          {isAdding ? (
            <>
              <Check size={12} />
              <span>ADDED</span>
            </>
          ) : (
            <>
              <ShoppingBag size={12} />
              <span>ADD TO BAG</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
