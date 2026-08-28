'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '@/content/products';
import { useCartStore } from '@/lib/cartStore';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<'hero' | 'macro'>('hero');
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const formatPrice = useCartStore((s) => s.formatPrice);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-bidri-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-ivory border border-silver/40 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-bidri-black hover:text-rani-pink transition-colors bg-ivory/80 backdrop-blur-xs cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Image Section (7 cols) */}
            <div className="md:col-span-7 bg-mist p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-silver/30">
              <div className="relative aspect-square w-full bg-[#FBFAF8] border border-silver/20 overflow-hidden shadow-xs mb-4">
                <Image
                  src={activeImage === 'hero' ? product.images.hero : product.images.macro}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div className="absolute top-3 left-3 bg-bidri-black text-ivory text-[9px] font-eyebrow tracking-[0.25em] px-2.5 py-1">
                  {product.edition.toUpperCase()} · {product.inlay.toUpperCase()}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setActiveImage('hero')}
                  className={`relative w-16 h-16 border-2 transition-all overflow-hidden cursor-pointer ${
                    activeImage === 'hero' ? 'border-rani-pink ring-2 ring-rani-pink/20' : 'border-silver/40 opacity-70'
                  }`}
                >
                  <Image src={product.images.hero} alt="Hero" fill className="object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage('macro')}
                  className={`relative w-16 h-16 border-2 transition-all overflow-hidden cursor-pointer ${
                    activeImage === 'macro' ? 'border-rani-pink ring-2 ring-rani-pink/20' : 'border-silver/40 opacity-70'
                  }`}
                >
                  <Image src={product.images.macro} alt="Macro Silver Detail" fill className="object-cover" />
                </button>
              </div>
            </div>

            {/* Right Details Section (5 cols) */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rani-pink" />
                  <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.35em] uppercase font-medium">
                    GI TAG NO. 12 KARNATAKA
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-light text-bidri-black leading-snug">
                  {product.name}
                </h3>

                <div className="flex items-baseline space-x-3">
                  <span className="font-display text-2xl font-light text-bidri-black">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-body text-xs text-graphite/70">
                    ({product.craftHours}h Chisel & Inlay)
                  </span>
                </div>

                <p className="font-body text-xs text-graphite font-light leading-relaxed">
                  {product.story}
                </p>

                <div className="border-t border-silver/30 pt-3 space-y-1.5 text-[11px] font-body text-graphite/80 font-light">
                  <p><strong className="font-medium text-bidri-black">Dimensions:</strong> {product.dimensions}</p>
                  <p><strong className="font-medium text-bidri-black">Weight:</strong> {product.weight}</p>
                  <p><strong className="font-medium text-bidri-black">Artisan:</strong> {product.artisanName}</p>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-silver/30">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-silver/50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-graphite hover:text-bidri-black cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-xs font-body font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-graphite hover:text-bidri-black cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={added}
                    className={`flex-1 h-11 px-4 font-eyebrow text-[10.5px] tracking-[0.3em] uppercase flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer ${
                      added
                        ? 'bg-peacock-teal text-ivory'
                        : 'bg-bidri-black text-ivory hover:bg-rani-pink'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={14} />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <span>ADD TO BAG</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-graphite/70 font-body">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck size={13} className="text-antique-gold" />
                    <span>Free Express Shipping</span>
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="font-eyebrow tracking-widest text-bidri-black hover:text-rani-pink uppercase hover-link-rule"
                  >
                    FULL DETAILS →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
