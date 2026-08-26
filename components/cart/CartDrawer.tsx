'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();

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
            className="fixed inset-0 bg-bidri-black/40 backdrop-blur-xs"
          />

          {/* 480px Ivory Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-ivory border-l border-silver/40 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-silver/30 flex items-center justify-between">
              <div>
                <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
                  SHOPPING BAG
                </span>
                <span className="font-display text-2xl font-light text-bidri-black">
                  {items.length} {items.length === 1 ? 'Artefact' : 'Artefacts'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-bidri-black hover:text-graphite transition-colors focus-visible:outline-none"
                aria-label="Close bag"
              >
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>

            {/* Reserved Banner */}
            <div className="bg-mist px-6 sm:px-8 py-2.5 border-b border-silver/30 text-center">
              <p className="font-body text-[12px] text-graphite font-light tracking-wide">
                Artefacts are held reserved for 30 minutes.
              </p>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 divide-y divide-silver/30">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="font-display text-2xl text-graphite/60 italic font-light">
                    Your bag is currently empty.
                  </p>
                  <p className="font-body text-xs text-graphite/80 max-w-xs mx-auto">
                    Explore our collection of authentic 14th-century Bidriware handcrafted in Bidar.
                  </p>
                  <Link
                    href="/collections"
                    onClick={closeCart}
                    className="inline-block mt-4 font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
                  >
                    EXPLORE COLLECTIONS →
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.slug} className="py-6 flex gap-5">
                    {/* Macro Thumbnail */}
                    <div className="relative w-20 h-20 bg-mist flex-shrink-0 border border-silver/30">
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
                          <h4 className="font-body text-[14px] text-bidri-black font-light tracking-wide">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.product.slug)}
                            className="text-graphite/50 hover:text-bidri-black text-xs transition-colors p-1"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="font-body text-[11px] text-graphite/70 font-light">
                          Edition: {item.product.edition} · {item.product.inlay}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3">
                        {/* Quiet Stepper */}
                        <div className="flex items-center border border-silver/40">
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                            className="p-1.5 text-graphite hover:text-bidri-black focus-visible:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} strokeWidth={1.2} />
                          </button>
                          <span className="px-3 font-body text-xs text-bidri-black font-light">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                            className="p-1.5 text-graphite hover:text-bidri-black focus-visible:outline-none"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} strokeWidth={1.2} />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="font-body text-sm text-bidri-black font-light">
                          ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout Button */}
            {items.length > 0 && (
              <div className="p-6 sm:p-8 border-t border-silver/40 bg-ivory space-y-4">
                <div className="flex justify-between items-baseline font-body">
                  <span className="text-xs text-graphite/80 tracking-wider uppercase">SUBTOTAL</span>
                  <span className="font-display text-2xl text-bidri-black font-light">
                    ₹ {subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="font-body text-[11px] text-graphite/70 font-light text-center">
                  Includes complimentary insured international delivery and registry certification.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full h-12 bg-bidri-black text-ivory flex items-center justify-center font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-ivory hover:text-bidri-black border border-bidri-black transition-colors duration-300"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
