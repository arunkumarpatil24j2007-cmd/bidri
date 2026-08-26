'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { artisans } from '@/content/artisans';

export const ClosersSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const leadArtisan = artisans[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  const instagramImages = [
    '/img/hero/hero-1.jpg',
    '/img/editorial/editorial-1.jpg',
    '/img/product/inlay-choker-royal-charm-hero.jpg',
    '/img/editorial/editorial-2.jpg',
    '/img/editorial/editorial-6.jpg',
  ];

  return (
    <div className="w-full bg-ivory select-none">
      {/* 1. Value Row (Three items: Handmade in Bidar / GI Certified Craft / Numbered & Registered) */}
      <section className="border-b border-silver/40 py-16" aria-label="Authenticity Values">
        <div className="container-luxury grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Item 1 */}
          <Reveal delay={0}>
            <div className="space-y-3">
              <Sparkles size={20} strokeWidth={1.2} className="text-bidri-black" />
              <h3 className="font-eyebrow text-[11px] text-bidri-black tracking-[0.3em] uppercase">
                HANDMADE IN BIDAR
              </h3>
              <p className="font-body text-xs text-graphite font-light max-w-[30ch]">
                Every single line chiselled freehand by master families.
              </p>
            </div>
          </Reveal>

          {/* Item 2 */}
          <Reveal delay={0.08}>
            <div className="space-y-3">
              <Award size={20} strokeWidth={1.2} className="text-bidri-black" />
              <h3 className="font-eyebrow text-[11px] text-bidri-black tracking-[0.3em] uppercase">
                GI CERTIFIED CRAFT
              </h3>
              <p className="font-body text-xs text-graphite font-light max-w-[30ch]">
                Official Geographical Indication Tag No. 12 Karnataka.
              </p>
            </div>
          </Reveal>

          {/* Item 3 */}
          <Reveal delay={0.16}>
            <div className="space-y-3">
              <ShieldCheck size={20} strokeWidth={1.2} className="text-bidri-black" />
              <h3 className="font-eyebrow text-[11px] text-bidri-black tracking-[0.3em] uppercase">
                NUMBERED & REGISTERED
              </h3>
              <p className="font-body text-xs text-graphite font-light max-w-[30ch]">
                Accompanied by signed certificate of permanent archive registry.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Artisan Spotlight (Portrait left, four sentences right, MEET THE MAKERS →) */}
      <section className="section-luxury container-luxury border-b border-silver/40" aria-label="Artisan Spotlight">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Portrait Left (5 cols) */}
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative aspect-[3/4] w-full bg-mist border border-silver/40 overflow-hidden">
                <Image
                  src={leadArtisan.image}
                  alt={leadArtisan.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          </div>

          {/* 4 Sentences Right (7 cols) */}
          <div className="md:col-span-7 space-y-6 md:pl-8">
            <Reveal delay={0.1}>
              <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
                MASTER OF BIDAR
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-2">
                {leadArtisan.name}
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-body text-base text-graphite font-light leading-relaxed max-w-[50ch]">
                For forty-eight years, Master Quadri has shaped molten zinc alloy into royal vessels within his Old City workshop.
                His hands hold the secret of harvesting ancient fort earth for the boiling blackening bath.
                Every piece bearing his signature is certified for museum collections and private collectors across the world.
                He continues to teach young apprentices the discipline of freehand silver inlay without mechanical stencils.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="pt-4">
                <Link
                  href="/artisans"
                  className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule"
                >
                  MEET THE MAKERS →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Instagram Strip (Five square images with @bidricrafts) */}
      <section className="py-20 border-b border-silver/40" aria-label="Social Journal">
        <div className="container-luxury mb-8 flex items-baseline justify-between">
          <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase">
            VISUAL DISPATCHES
          </span>
          <span className="font-eyebrow text-[10px] text-bidri-black tracking-[0.3em] uppercase">
            @BIDRICRAFTS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 px-4 sm:px-8">
          {instagramImages.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-square w-full bg-mist border border-silver/30 overflow-hidden group cursor-pointer"
              data-cursor="view"
            >
              <Image
                src={src}
                alt="Bidri Crafts Atelier visual moment"
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Newsletter Block (One underlined input and SUBSCRIBE, label "Two letters a year. Nothing more.") */}
      <section className="section-luxury container-luxury text-center select-none" aria-label="Newsletter">
        <div className="max-w-xl mx-auto space-y-6">
          <Reveal>
            <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
              PRIVATE REGISTER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-bidri-black mt-2">
              The Bidar Gazette
            </h2>
            <p className="font-body text-xs text-graphite/70 font-light pt-2">
              Two letters a year. Nothing more.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {isSubscribed ? (
              <div className="py-6 flex items-center justify-center space-x-2 text-bidri-black font-body text-sm">
                <Check size={16} />
                <span>You have been registered for our biannual dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full sm:w-80 bg-transparent border-b border-bidri-black py-2.5 px-1 font-body text-sm text-bidri-black placeholder:text-graphite/40 focus:outline-none tracking-wide text-center sm:text-left"
                />
                <button
                  type="submit"
                  className="font-eyebrow text-[11px] text-bidri-black tracking-[0.35em] uppercase hover-link-rule py-2 px-4 cursor-pointer focus-visible:outline-none"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
};
