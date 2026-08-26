'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United Kingdom',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mock certificate number
    const generatedCert = `BIDRI-1422-${Math.floor(100 + Math.random() * 900)}`;
    sessionStorage.setItem('last_order_certificate', generatedCert);
    sessionStorage.setItem('last_order_name', `${formData.firstName} ${formData.lastName}`);
    clearCart();
    router.push('/checkout/confirmation');
  };

  if (items.length === 0 && checkoutStep === 1) {
    return (
      <div className="w-full min-h-[60vh] bg-ivory pt-40 pb-20 container-luxury text-center space-y-6">
        <h1 className="font-display text-3xl font-light text-bidri-black">Your bag is empty.</h1>
        <Link
          href="/collections"
          className="inline-block font-eyebrow text-[11px] text-bidri-black tracking-[0.3em] uppercase hover-link-rule"
        >
          EXPLORE COLLECTIONS →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-5xl mx-auto">
        {/* Checkout Header */}
        <div className="mb-12 flex justify-between items-center border-b border-silver/30 pb-4">
          <div>
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
              SECURE ARCHIVAL DISPATCH
            </span>
            <h1 className="font-display text-2xl font-light text-bidri-black">
              Checkout
            </h1>
          </div>

          <div className="flex items-center space-x-6 text-xs font-display text-graphite">
            <span className={checkoutStep >= 1 ? 'text-bidri-black font-medium' : 'text-silver'}>
              01 / Identity
            </span>
            <span className="text-silver">·</span>
            <span className={checkoutStep >= 2 ? 'text-bidri-black font-medium' : 'text-silver'}>
              02 / Delivery
            </span>
            <span className="text-silver">·</span>
            <span className={checkoutStep >= 3 ? 'text-bidri-black font-medium' : 'text-silver'}>
              03 / Settlement
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Columns (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: Identity */}
              {checkoutStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl font-light text-bidri-black">
                    Patron & Contact Details
                  </h2>

                  <div className="space-y-4 font-body text-xs">
                    <div>
                      <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="patron@domain.com"
                        className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                          FIRST NAME
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name"
                          className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                          LAST NAME
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                          className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(2)}
                      className="px-8 py-3 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.3em] uppercase hover:bg-graphite transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                      <span>PROCEED TO DELIVERY</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Delivery */}
              {checkoutStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl font-light text-bidri-black">
                    Delivery Address
                  </h2>

                  <div className="space-y-4 font-body text-xs">
                    <div>
                      <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                        STREET ADDRESS
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House no., street name"
                        className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                          CITY
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                          POSTAL CODE
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          required
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="Postal code"
                          className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                        COUNTRY
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none"
                      >
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>India</option>
                        <option>United Arab Emirates</option>
                        <option>Switzerland</option>
                        <option>Singapore</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="font-eyebrow text-[10px] text-graphite tracking-widest uppercase hover-link-rule"
                    >
                      ← BACK
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(3)}
                      className="px-8 py-3 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.3em] uppercase hover:bg-graphite transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                      <span>PROCEED TO SETTLEMENT</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Settlement */}
              {checkoutStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-baseline">
                    <h2 className="font-display text-2xl font-light text-bidri-black">
                      Payment Settlement
                    </h2>
                    <div className="flex items-center space-x-1.5 text-xs text-graphite/70">
                      <Lock size={12} />
                      <span>256-Bit Encrypted</span>
                    </div>
                  </div>

                  <form onSubmit={handleCompleteOrder} className="space-y-4 font-body text-xs">
                    <div>
                      <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                        CARD NUMBER
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                          EXPIRY
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-graphite/60 uppercase tracking-widest block mb-1">
                          SECURITY CODE
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          className="w-full bg-mist border border-silver/40 p-3 text-bidri-black focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-mist border border-silver/40 space-y-1 mt-4">
                      <span className="font-eyebrow text-[9px] text-bidri-black tracking-widest uppercase block">
                        AUTHENTICITY DEED ASSIGNMENT
                      </span>
                      <p className="text-[11px] text-graphite font-light">
                        Upon order confirmation, a dedicated Karnataka GI Certificate Number will be generated and stamped into the permanent archive ledger.
                      </p>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep(2)}
                        className="font-eyebrow text-[10px] text-graphite tracking-widest uppercase hover-link-rule"
                      >
                        ← BACK
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.3em] uppercase hover:bg-graphite transition-colors cursor-pointer"
                      >
                        COMPLETE ORDER · ₹ {subtotal.toLocaleString('en-IN')}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary Rail (5 cols) */}
          <div className="lg:col-span-5 bg-mist border border-silver/40 p-6 sm:p-8 space-y-6">
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block">
              ORDER SUMMARY
            </span>

            <div className="divide-y divide-silver/30">
              {items.map((item) => (
                <div key={item.product.slug} className="py-3 flex gap-4 text-xs font-body">
                  <div className="relative w-14 h-14 bg-ivory border border-silver/30 flex-shrink-0">
                    <Image
                      src={item.product.images.hero}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="font-normal text-bidri-black">{item.product.name}</p>
                      <p className="text-graphite/60">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-normal text-bidri-black">
                      ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-silver/30 space-y-2 font-body text-xs">
              <div className="flex justify-between text-graphite">
                <span>Subtotal</span>
                <span>₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-graphite">
                <span>Complimentary Insured Shipping</span>
                <span>₹ 0</span>
              </div>
              <div className="flex justify-between text-graphite">
                <span>Certificate & Archival Registration</span>
                <span>Included</span>
              </div>
              <div className="pt-3 border-t border-silver/40 flex justify-between font-display text-xl text-bidri-black">
                <span>Total</span>
                <span>₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
