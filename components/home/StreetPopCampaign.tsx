'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export const StreetPopCampaign: React.FC = () => {
  return (
    <section className="relative w-full bg-bidri-black text-ivory py-20 sm:py-28 overflow-hidden select-none" id="street-pop">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-rani-pink/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-peacock-teal/15 blur-[120px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Street Pop Collage Image (6 cols) */}
          <div className="lg:col-span-6 relative">
            <Reveal>
              <div className="relative aspect-[4/3] w-full bg-mist/10 border border-white/20 overflow-hidden shadow-2xl group">
                <Image
                  src="/img/editorial/ilkal_street_pop_saree.jpg"
                  alt="Modern Indian woman in Ilkal saree with sneakers and sunglasses holding Bidri plate on colorful pop art rooftop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Story Card */}
              <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:right-6 bg-ivory text-bidri-black p-4 sm:p-5 border border-silver/40 shadow-2xl max-w-[280px] sm:max-w-xs">
                <div className="inline-block bg-rani-pink text-ivory text-[9px] font-eyebrow tracking-widest px-2 py-0.5 uppercase mb-1.5 font-medium">
                  STREET STYLING 01
                </div>
                <p className="font-body text-xs text-graphite font-light leading-relaxed">
                  Peacock teal Ilkal saree draped with chunky white sneakers and 90s vintage shades, holding hand-inlaid Bidri mandala plate.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: Content Statement (6 cols) */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center space-x-2 bg-saffron/20 border border-saffron/40 px-3 py-1">
                <Sparkles size={13} className="text-pop-yellow" />
                <span className="font-eyebrow text-[10px] text-pop-yellow tracking-[0.38em] uppercase font-medium">
                  BIDRI × STREET EDIT
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-light text-ivory leading-tight mt-2">
                FROM THE FORT<br />
                <span className="italic text-pop-yellow font-normal">TO THE STREET.</span>
              </h2>

              <p className="font-body text-base text-silver-bright/90 font-light leading-relaxed">
                A new generation is wearing its heritage differently. No longer locked inside bridal trunks or museum display vitrines, Bidriware takes to urban streets, concrete balconies, underground gigs, cozy living rooms, and global runways.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/15">
                <div className="bg-white/5 border border-white/10 p-4">
                  <h4 className="font-eyebrow text-[11px] text-silver-bright tracking-wider uppercase font-medium text-rani-pink">
                    SNEAKERS × ILKAL SAREE × BIDRI INLAY
                  </h4>
                  <p className="font-body text-xs text-silver-bright/80 font-light mt-1">
                    Structured handloom pleats and 14th-century silver craft paired effortlessly with contemporary streetwear silhouettes.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4">
                  <h4 className="font-eyebrow text-[11px] text-silver-bright tracking-wider uppercase font-medium text-peacock-teal">
                    UNAPOLOGETICALLY INDIAN
                  </h4>
                  <p className="font-body text-xs text-silver-bright/80 font-light mt-1">
                    Deeply rooted in Karnataka soil and Bahmani history, crafted with zero compromise on global luxury standards.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="h-12 px-7 bg-rani-pink text-ivory font-eyebrow text-[10.5px] tracking-[0.3em] uppercase hover:bg-ivory hover:text-bidri-black transition-all flex items-center space-x-2.5 shadow-lg cursor-pointer"
                >
                  <span>EXPLORE THE EDIT</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="#lookbook"
                  className="h-12 px-6 border border-white/30 text-silver-bright font-eyebrow text-[10.5px] tracking-[0.3em] uppercase hover:bg-white/10 transition-colors flex items-center"
                >
                  VIEW LOOKBOOK
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
