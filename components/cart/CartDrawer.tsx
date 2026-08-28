'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, formatPrice } = useCartStore();

  const subtotal = getSubtotal();
  const freeShippingThreshold = 15000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-bidri-black/50 backdrop-blur-xs"
          />

          {/* 480px Ivory Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-ivory border-l border-silver/40 shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-silver/30 flex items-center justify-between bg-ivory">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rani-pink" />
                  <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.4em] uppercase font-medium">
                    SHOPPING BAG
                  </span>
                </div>
                <span className="font-display text-2xl font-light text-bidri-black">
                  {items.length} {items.length === 1 ? 'Handcrafted Piece' : 'Handcrafted Pieces'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-bidri-black hover:text-rani-pink transition-colors focus-visible:outline-none cursor-pointer"
                aria-label="Close bag"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="bg-mist p-4 border-b border-silver/30">
              <div className="flex items-center justify-between text-xs font-body text-bidri-black mb-2">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-peacock-teal font-medium flex items-center space-x-1.5">
                    <Sparkles size={13} />
                    <span>You unlocked <strong>Free Express Worldwide Shipping!</strong></span>
                  </span>
                ) : (
                  <span className="text-graphite font-light">
                    Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for <strong>Free Worldwide Shipping</strong>
                  </span>
                )}
                <span className="font-semibold text-[11px] text-bidri-black">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-silver/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rani-pink to-antique-gold transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 divide-y divide-silver/30">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="font-display text-2xl text-graphite/70 italic font-light">
                    Your bag is currently empty.
                  </p>
                  <p className="font-body text-xs text-graphite max-w-xs mx-auto">
                    Explore our curated collection of authentic 600-year Bidriware masterpieces.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-block mt-4 px-6 py-2.5 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.3em] uppercase hover:bg-rani-pink transition-colors"
                  >
                    EXPLORE SHOP ALL →
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.slug} className="py-5 flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-mist flex-shrink-0 border border-silver/30 overflow-hidden">
                      <Image
                        src={item.product.images.macro || item.product.images.hero}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-body text-[14px] text-bidri-black font-normal tracking-wide">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.product.slug)}
                            className="text-graphite/50 hover:text-rani-pink text-xs transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="font-body text-[11px] text-graphite/70 font-light">
                          {item.product.inlay} · {item.product.craftHours}h Craft
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-silver/40 bg-ivory">
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                            className="p-1.5 text-graphite hover:text-bidri-black focus-visible:outline-none cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} strokeWidth={1.5} />
                          </button>
                          <span className="px-3 font-body text-xs text-bidri-black font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                            className="p-1.5 text-graphite hover:text-bidri-black focus-visible:outline-none cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="font-body text-sm text-bidri-black font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout Button */}
            {items.length > 0 && (
              <div className="p-6 sm:p-7 border-t border-silver/40 bg-ivory space-y-4">
                <div className="flex justify-between items-baseline font-body">
                  <span className="text-xs text-graphite/80 tracking-wider uppercase font-medium">SUBTOTAL</span>
                  <span className="font-display text-2xl text-bidri-black font-normal">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-graphite/75 font-body">
                  <ShieldCheck size={14} className="text-antique-gold" />
                  <span>Includes official Karnataka GI Registry Certificate</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full h-12 bg-bidri-black text-ivory flex items-center justify-center space-x-2 font-eyebrow text-[11px] tracking-[0.3em] uppercase hover:bg-rani-pink transition-colors duration-300 shadow-md cursor-pointer"
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

