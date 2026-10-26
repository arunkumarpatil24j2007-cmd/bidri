'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, formatPrice } = useCartStore();

  const subtotal = getSubtotal();
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-bidri-black/60 backdrop-blur-xs"
          />

          {/* Ivory Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[460px] bg-ivory border-l border-silver/40 shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-silver/30 flex items-center justify-between bg-ivory">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rani-pink" />
                  <span className="font-eyebrow text-[10px] text-rani-pink tracking-[0.35em] uppercase font-medium">
                    SHOPPING BAG
                  </span>
                </div>
                <span className="font-display text-2xl font-light text-bidri-black">
                  {totalItemCount} {totalItemCount === 1 ? 'Handcrafted Piece' : 'Handcrafted Pieces'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-bidri-black hover:text-rani-pink transition-colors focus-visible:outline-none cursor-pointer rounded-lg hover:bg-mist"
                aria-label="Close bag"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* India Delivery Assurance Banner */}
            <div className="bg-mist/70 px-5 py-3 border-b border-silver/30 flex items-center space-x-2 text-xs font-body text-graphite">
              <Truck size={15} className="text-antique-gold flex-shrink-0" />
              <span><strong>Free Insured Express Delivery</strong> on all orders across India</span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-silver/30">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="font-display text-2xl text-graphite/70 italic font-light">
                    Your bag is currently empty.
                  </p>
                  <p className="font-body text-xs text-graphite max-w-xs mx-auto">
                    Explore our curated collection of authentic 600-year Bidriware handicrafts and statues.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-block mt-4 px-6 py-3 bg-bidri-black text-ivory font-eyebrow text-xs tracking-[0.25em] uppercase hover:bg-rani-pink transition-colors rounded-lg shadow-sm"
                  >
                    EXPLORE SHOP ALL →
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.slug} className="py-4 flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-mist flex-shrink-0 rounded-lg border border-silver/30 overflow-hidden">
                      <Image
                        src={item.product.images.hero}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-body text-sm text-bidri-black font-medium hover:text-rani-pink transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product.slug)}
                            className="text-graphite/50 hover:text-rani-pink p-1 cursor-pointer transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <X size={15} />
                          </button>
                        </div>
                        <p className="font-body text-[11px] text-graphite/70 font-light mt-0.5">
                          {item.product.inlay} · {item.product.craftHours}h Chisel
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-silver/40 rounded-md bg-ivory">
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                            className="p-1.5 text-graphite hover:text-bidri-black cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2.5 font-body text-xs text-bidri-black font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                            className="p-1.5 text-graphite hover:text-bidri-black cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-body text-sm text-bidri-black font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-silver/40 bg-ivory space-y-4">
                <div className="space-y-1.5 text-xs font-body">
                  <div className="flex justify-between text-graphite/80">
                    <span>Subtotal</span>
                    <span className="font-medium text-bidri-black">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-graphite/80">
                    <span>Shipping Across India</span>
                    <span className="text-peacock-teal font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-silver/30 font-body">
                    <span className="text-xs uppercase font-medium text-bidri-black tracking-wider">Total</span>
                    <span className="font-display text-2xl text-bidri-black font-normal">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-1.5 text-[11px] text-graphite/70 font-body">
                  <ShieldCheck size={14} className="text-antique-gold flex-shrink-0" />
                  <span>Includes Karnataka GI Registry Tag #12 Certificate</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full h-12 rounded-lg bg-bidri-black text-ivory flex items-center justify-center space-x-2 font-eyebrow text-xs tracking-[0.25em] uppercase hover:bg-rani-pink transition-colors duration-200 shadow-md cursor-pointer"
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
