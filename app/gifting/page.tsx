'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Video, Check, Plus, Minus, Sparkles } from 'lucide-react';
import { products, Product } from '@/content/products';
import { useCartStore } from '@/lib/cartStore';

export default function GiftingPage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    'paan-daan-box',
    'cufflinks-flora',
  ]);
  const [noteMessage, setNoteMessage] = useState(
    'Presented with deepest reverence and warm regards.'
  );
  const [senderName, setSenderName] = useState('With Admiration');

  // Video Consultation Booking State
  const [bookingDate, setBookingDate] = useState('2026-09-02');
  const [bookingTime, setBookingTime] = useState('15:00 GMT');
  const [isBooked, setIsBooked] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  // Filter gift-appropriate pieces
  const giftProducts = products.filter(
    (p) => p.collection === 'gifting' || p.collection === 'desk-and-study' || p.collection === 'barware'
  );

  const toggleSelect = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      if (selectedSlugs.length <= 1) return; // Keep at least 1
      setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
    } else {
      if (selectedSlugs.length >= 3) {
        // limit to 3 items
        setSelectedSlugs([...selectedSlugs.slice(1), slug]);
      } else {
        setSelectedSlugs([...selectedSlugs, slug]);
      }
    }
  };

  const selectedItems = products.filter((p) => selectedSlugs.includes(p.slug));
  const hamperTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  const handleAddHamperToCart = () => {
    selectedItems.forEach((item) => addItem(item, 1));
  };

  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-6xl mx-auto space-y-32">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            CONCIERGE & CEREMONIAL
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            The Gifting Concierge
          </h1>
          <p className="font-body text-base text-graphite font-light max-w-[50ch]">
            Hand-assembled archival gift hampers, calligraphed personal deeds, and bespoke curator appointments for milestone celebrations.
          </p>
        </div>

        {/* 1. Hamper Builder (Choose 2-3 pieces) */}
        <section className="border-t border-silver/40 pt-16 space-y-12" aria-label="Hamper Builder">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <div>
              <span className="font-display text-sm text-silver italic font-light">
                01 / Bespoke Assembly
              </span>
              <h2 className="font-display text-3xl font-light text-bidri-black mt-1">
                Curate Your 2–3 Piece Gift Suite
              </h2>
            </div>
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase">
              {selectedSlugs.length} OF 3 ARTEFACTS CHOSEN
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Artefact Selection Grid (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {giftProducts.slice(0, 6).map((product) => {
                const isSelected = selectedSlugs.includes(product.slug);
                return (
                  <div
                    key={product.slug}
                    onClick={() => toggleSelect(product.slug)}
                    className={`border p-4 transition-all cursor-pointer bg-ivory ${
                      isSelected
                        ? 'border-bidri-black shadow-sm'
                        : 'border-silver/40 hover:border-silver'
                    }`}
                  >
                    <div className="relative aspect-square w-full bg-mist mb-3">
                      <Image
                        src={product.images.hero}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-bidri-black text-ivory p-1">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-baseline text-xs font-body">
                      <span className="text-bidri-black font-normal">{product.name}</span>
                      <span className="text-graphite font-light">{product.formattedPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hamper Preview & Note-Card (5 cols) */}
            <div className="lg:col-span-5 bg-mist border border-silver/40 p-6 sm:p-8 space-y-6">
              <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.3em] uppercase block">
                HAMPER SUMMARY
              </span>

              <div className="divide-y divide-silver/30">
                {selectedItems.map((item) => (
                  <div key={item.slug} className="py-2.5 flex justify-between items-center text-xs font-body">
                    <span className="text-bidri-black font-normal">{item.name}</span>
                    <span className="text-graphite font-light">{item.formattedPrice}</span>
                  </div>
                ))}
              </div>

              {/* Note-Card Field with Live Handwriting Preview */}
              <div className="pt-4 border-t border-silver/30 space-y-4">
                <span className="font-eyebrow text-[9px] text-graphite/60 tracking-[0.25em] uppercase block">
                  PERSONAL INSCRIPTION NOTE
                </span>

                <textarea
                  rows={2}
                  value={noteMessage}
                  onChange={(e) => setNoteMessage(e.target.value)}
                  placeholder="Enter message for hand-calligraphed card..."
                  className="w-full bg-ivory border border-silver/40 p-3 font-body text-xs text-bidri-black focus:outline-none"
                />

                {/* Live Handwriting-style Preview Card */}
                <div className="p-6 bg-ivory border border-silver/50 shadow-inner text-center space-y-3">
                  <span className="font-eyebrow text-[8px] text-silver tracking-[0.3em] uppercase block">
                    CALLIGRAPHED ARCHIVAL CARD
                  </span>
                  <p className="font-display italic text-lg text-bidri-black leading-relaxed">
                    “{noteMessage || 'Your message will appear here...'}”
                  </p>
                  <p className="font-eyebrow text-[9px] text-graphite/60 tracking-widest uppercase pt-2">
                    BIDRI CRAFTS · BIDAR
                  </p>
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-4 border-t border-silver/40 flex items-baseline justify-between">
                <span className="font-body text-xs text-graphite">SUITE TOTAL</span>
                <span className="font-display text-2xl text-bidri-black font-light">
                  ₹ {hamperTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleAddHamperToCart}
                className="w-full h-12 bg-bidri-black text-ivory font-eyebrow text-[11px] tracking-[0.35em] uppercase hover:bg-graphite transition-colors cursor-pointer"
              >
                ADD HAMPER SUITE TO BAG
              </button>
            </div>
          </div>
        </section>

        {/* 2. Video Appointment Booking with Curator */}
        <section className="border-t border-silver/40 pt-16 space-y-8" aria-label="Curator Consultation">
          <div className="max-w-xl">
            <span className="font-display text-sm text-silver italic font-light">
              02 / Personal Assistance
            </span>
            <h2 className="font-display text-3xl font-light text-bidri-black mt-1">
              Private Video Appointment with our Curator
            </h2>
            <p className="font-body text-xs text-graphite font-light mt-3 leading-relaxed">
              Schedule a one-on-one virtual viewing to inspect specific artefacts in natural light with our head curator before confirming your collection.
            </p>
          </div>

          {isBooked ? (
            <div className="p-8 bg-mist border border-silver/40 text-center max-w-lg mx-auto space-y-3">
              <Check size={20} className="mx-auto text-bidri-black" />
              <h3 className="font-display text-2xl font-light text-bidri-black">
                Appointment Confirmed
              </h3>
              <p className="font-body text-xs text-graphite font-light">
                We look forward to meeting you on <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>. A secure calendar invitation with video room link has been dispatched.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl bg-ivory border border-silver/40 p-6">
              <div>
                <label className="font-eyebrow text-[9px] text-graphite/60 tracking-[0.2em] uppercase block mb-2">
                  SELECT DATE
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-mist border border-silver/40 p-2.5 text-xs font-body text-bidri-black focus:outline-none"
                />
              </div>

              <div>
                <label className="font-eyebrow text-[9px] text-graphite/60 tracking-[0.2em] uppercase block mb-2">
                  TIME SLOT
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-mist border border-silver/40 p-2.5 text-xs font-body text-bidri-black focus:outline-none"
                >
                  <option>11:00 GMT</option>
                  <option>15:00 GMT</option>
                  <option>18:30 GMT</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setIsBooked(true)}
                  className="w-full h-10 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.25em] uppercase hover:bg-graphite transition-colors cursor-pointer"
                >
                  BOOK VIEWING
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
