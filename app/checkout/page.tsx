'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, ArrowLeft, Lock, Truck, Check } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, formatPrice, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Karnataka',
    postalCode: '',
    country: 'India',
    paymentMethod: 'upi',
    upiId: '',
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
    const generatedCert = `BIDRI-GI12-${Math.floor(1000 + Math.random() * 9000)}`;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('last_order_certificate', generatedCert);
      sessionStorage.setItem('last_order_name', `${formData.firstName} ${formData.lastName}`);
      sessionStorage.setItem('last_order_amount', formatPrice(subtotal));
    }
    clearCart();
    router.push('/checkout/confirmation');
  };

  if (items.length === 0 && checkoutStep === 1) {
    return (
      <div className="w-full min-h-[60vh] bg-ivory pt-40 pb-20 container-luxury text-center space-y-6">
        <h1 className="font-display text-3xl font-light text-bidri-black">Your shopping bag is empty.</h1>
        <p className="font-body text-xs text-graphite max-w-sm mx-auto">
          Add authentic Bidriware handicrafts to your bag to proceed with checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-bidri-black text-ivory font-eyebrow text-xs tracking-widest uppercase hover:bg-rani-pink transition-colors rounded-lg shadow-sm"
        >
          EXPLORE SHOP ALL →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-ivory pt-32 sm:pt-36 pb-32 select-none">
      <div className="container-luxury max-w-5xl mx-auto">
        {/* Checkout Header */}
        <div className="mb-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-silver/30 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-peacock-teal" />
              <span className="font-eyebrow text-[10px] text-peacock-teal tracking-[0.35em] uppercase font-medium">
                SECURE INDIAN CHECKOUT
              </span>
            </div>
            <h1 className="font-display text-3xl font-light text-bidri-black mt-0.5">
              Order Placement
            </h1>
          </div>

          <div className="flex items-center space-x-4 text-xs font-body text-graphite">
            <span className={`px-2.5 py-1 rounded-md ${checkoutStep >= 1 ? 'bg-bidri-black text-ivory font-medium' : 'text-graphite/60'}`}>
              1. Contact
            </span>
            <span className="text-silver">→</span>
            <span className={`px-2.5 py-1 rounded-md ${checkoutStep >= 2 ? 'bg-bidri-black text-ivory font-medium' : 'text-graphite/60'}`}>
              2. Delivery
            </span>
            <span className="text-silver">→</span>
            <span className={`px-2.5 py-1 rounded-md ${checkoutStep >= 3 ? 'bg-bidri-black text-ivory font-medium' : 'text-graphite/60'}`}>
              3. Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Columns (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: Contact Information */}
            {checkoutStep === 1 && (
              <div className="bg-ivory p-6 sm:p-7 rounded-xl border border-silver/35 shadow-xs space-y-5">
                <div className="border-b border-silver/30 pb-4">
                  <h2 className="font-display text-2xl font-light text-bidri-black">
                    Contact Information
                  </h2>
                  <p className="font-body text-xs text-graphite font-light mt-1">
                    We will send your order confirmation and dispatch tracking details here.
                  </p>
                </div>

                <div className="space-y-4 font-body text-xs">
                  <div>
                    <label className="text-graphite/80 font-medium block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full bg-mist/60 border border-silver/40 rounded-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black"
                    />
                  </div>

                  <div>
                    <label className="text-graphite/80 font-medium block mb-1">
                      MOBILE NUMBER (FOR SMS DELIVERY UPDATES) *
                    </label>
                    <div className="flex">
                      <span className="bg-silver/20 border border-r-0 border-silver/40 rounded-l-lg px-3 py-3 text-graphite">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full bg-mist/60 border border-silver/40 rounded-r-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-graphite/80 font-medium block mb-1">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full bg-mist/60 border border-silver/40 rounded-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black"
                      />
                    </div>
                    <div>
                      <label className="text-graphite/80 font-medium block mb-1">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full bg-mist/60 border border-silver/40 rounded-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.email || !formData.firstName) {
                        alert('Please fill in your name and email address.');
                        return;
                      }
                      setCheckoutStep(2);
                    }}
                    className="px-6 py-3 bg-bidri-black text-ivory font-eyebrow text-xs tracking-widest uppercase hover:bg-rani-pink transition-colors rounded-lg flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>CONTINUE TO DELIVERY</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Address (India) */}
            {checkoutStep === 2 && (
              <div className="bg-ivory p-6 sm:p-7 rounded-xl border border-silver/35 shadow-xs space-y-5">
                <div className="border-b border-silver/30 pb-4">
                  <h2 className="font-display text-2xl font-light text-bidri-black">
                    Shipping & Delivery Address
                  </h2>
                  <p className="font-body text-xs text-graphite font-light mt-1">
                    Free express insured delivery to all Indian destinations.
                  </p>
                </div>

                <div className="space-y-4 font-body text-xs">
                  <div>
                    <label className="text-graphite/80 font-medium block mb-1">
                      STREET ADDRESS / FLAT / HOUSE NO. *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House No., Building, Street Name"
                      className="w-full bg-mist/60 border border-silver/40 rounded-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-graphite/80 font-medium block mb-1">
                        CITY *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Bengaluru, Mumbai, Delhi"
                        className="w-full bg-mist/60 border border-silver/40 rounded-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black"
                      />
                    </div>
                    <div>
                      <label className="text-graphite/80 font-medium block mb-1">
                        PIN CODE *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="6-digit PIN code"
                        className="w-full bg-mist/60 border border-silver/40 rounded-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-graphite/80 font-medium block mb-1">
                        STATE *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-mist/60 border border-silver/40 rounded-lg p-3 text-bidri-black focus:outline-none focus:border-bidri-black cursor-pointer"
                      >
                        <option>Karnataka</option>
                        <option>Maharashtra</option>
                        <option>Delhi NCR</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Andhra Pradesh</option>
                        <option>Gujarat</option>
                        <option>West Bengal</option>
                        <option>Kerala</option>
                        <option>Uttar Pradesh</option>
                        <option>Rajasthan</option>
                        <option>Punjab</option>
                        <option>Haryana</option>
                        <option>Goa</option>
                        <option>Other Indian State</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-graphite/80 font-medium block mb-1">
                        COUNTRY
                      </label>
                      <input
                        type="text"
                        name="country"
                        value="India"
                        disabled
                        className="w-full bg-silver/10 border border-silver/40 rounded-lg p-3 text-graphite font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(1)}
                    className="font-eyebrow text-xs text-graphite tracking-widest uppercase hover-link-rule flex items-center space-x-1"
                  >
                    <ArrowLeft size={13} />
                    <span>BACK TO CONTACT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.address || !formData.city || !formData.postalCode) {
                        alert('Please fill in your address, city, and PIN code.');
                        return;
                      }
                      setCheckoutStep(3);
                    }}
                    className="px-6 py-3 bg-bidri-black text-ivory font-eyebrow text-xs tracking-widest uppercase hover:bg-rani-pink transition-colors rounded-lg flex items-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method */}
            {checkoutStep === 3 && (
              <div className="bg-ivory p-6 sm:p-7 rounded-xl border border-silver/35 shadow-xs space-y-5">
                <div className="flex justify-between items-baseline border-b border-silver/30 pb-4">
                  <div>
                    <h2 className="font-display text-2xl font-light text-bidri-black">
                      Payment Settlement
                    </h2>
                    <p className="font-body text-xs text-graphite font-light mt-1">
                      Choose your preferred Indian payment method.
                    </p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-peacock-teal font-medium">
                    <Lock size={13} />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                <form onSubmit={handleCompleteOrder} className="space-y-5 font-body text-xs">
                  {/* Payment Method Selector */}
                  <div className="space-y-2.5">
                    <label
                      className={`flex items-center p-3.5 rounded-lg border cursor-pointer transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'border-bidri-black bg-mist/60 ring-1 ring-bidri-black/10'
                          : 'border-silver/40 hover:border-silver'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-bidri-black block">
                          Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                        </span>
                        <span className="text-graphite/70 text-[11px]">
                          Zero processing fees. Instant confirmation.
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-center p-3.5 rounded-lg border cursor-pointer transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-bidri-black bg-mist/60 ring-1 ring-bidri-black/10'
                          : 'border-silver/40 hover:border-silver'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-bidri-black block">
                          Credit / Debit Card (Visa, MasterCard, RuPay)
                        </span>
                        <span className="text-graphite/70 text-[11px]">
                          Supports all major Indian banks & RuPay cards.
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-center p-3.5 rounded-lg border cursor-pointer transition-all ${
                        formData.paymentMethod === 'netbanking'
                          ? 'border-bidri-black bg-mist/60 ring-1 ring-bidri-black/10'
                          : 'border-silver/40 hover:border-silver'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={formData.paymentMethod === 'netbanking'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-bidri-black block">
                          Netbanking (All Major Indian Banks)
                        </span>
                        <span className="text-graphite/70 text-[11px]">
                          HDFC, ICICI, SBI, Axis, Kotak & 50+ banks.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* UPI ID input if UPI is selected */}
                  {formData.paymentMethod === 'upi' && (
                    <div className="p-4 bg-mist/40 rounded-lg border border-silver/30 space-y-2">
                      <label className="text-graphite/80 font-medium block">
                        ENTER UPI ID (VPA)
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        placeholder="mobilenumber@upi or name@okhdfcbank"
                        className="w-full bg-ivory border border-silver/40 rounded-lg p-2.5 text-bidri-black focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Card Fields if Card is selected */}
                  {formData.paymentMethod === 'card' && (
                    <div className="p-4 bg-mist/40 rounded-lg border border-silver/30 space-y-3">
                      <div>
                        <label className="text-graphite/80 font-medium block mb-1">
                          CARD NUMBER
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full bg-ivory border border-silver/40 rounded-lg p-2.5 text-bidri-black focus:outline-none font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-graphite/80 font-medium block mb-1">
                            EXPIRY
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="w-full bg-ivory border border-silver/40 rounded-lg p-2.5 text-bidri-black focus:outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-graphite/80 font-medium block mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="w-full bg-ivory border border-silver/40 rounded-lg p-2.5 text-bidri-black focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3.5 bg-saffron/10 border border-saffron/30 rounded-lg flex items-center space-x-2 text-[11px] text-graphite">
                    <ShieldCheck size={16} className="text-antique-gold flex-shrink-0" />
                    <span>Your order will be issued an authentic Karnataka GI Tag #12 Certificate.</span>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(2)}
                      className="font-eyebrow text-xs text-graphite tracking-widest uppercase hover-link-rule flex items-center space-x-1"
                    >
                      <ArrowLeft size={13} />
                      <span>BACK TO DELIVERY</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-xs tracking-widest uppercase hover:bg-rani-pink transition-colors rounded-lg cursor-pointer shadow-md flex items-center space-x-2"
                    >
                      <span>PLACE ORDER · {formatPrice(subtotal)}</span>
                      <Check size={14} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Rail: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-ivory rounded-xl border border-silver/35 p-6 space-y-5 shadow-xs sticky top-28">
            <h3 className="font-display text-xl font-light text-bidri-black border-b border-silver/30 pb-3">
              Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            {/* Items */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto divide-y divide-silver/20 pr-1">
              {items.map((item) => (
                <div key={item.product.slug} className="pt-3 first:pt-0 flex gap-3 items-center">
                  <div className="relative w-14 h-14 bg-mist rounded-lg overflow-hidden border border-silver/30 flex-shrink-0">
                    <Image
                      src={item.product.images.hero}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs font-medium text-bidri-black line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="font-body text-[11px] text-graphite/60 font-light">
                      Qty: {item.quantity} · {item.product.inlay}
                    </p>
                  </div>
                  <span className="font-body text-xs font-semibold text-bidri-black flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-silver/30 pt-3 space-y-2 text-xs font-body">
              <div className="flex justify-between text-graphite/80">
                <span>Subtotal</span>
                <span className="font-medium text-bidri-black">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-graphite/80">
                <span>Insured Courier Delivery (India)</span>
                <span className="text-peacock-teal font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-graphite/80">
                <span>GST (Goods & Services Tax)</span>
                <span className="text-graphite/60">Included</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-silver/30 font-body">
                <span className="text-xs uppercase font-medium text-bidri-black tracking-wider">Total</span>
                <span className="font-display text-2xl text-bidri-black font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* Shipping note */}
            <div className="p-3 bg-mist/60 rounded-lg text-[11px] font-body text-graphite space-y-1">
              <div className="flex items-center space-x-1.5 font-medium text-bidri-black">
                <Truck size={14} className="text-antique-gold" />
                <span>Dispatches from Bidar, Karnataka</span>
              </div>
              <p className="text-graphite/70">
                Packed in custom-cushioned wooden boxes with tamper-evident seal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
