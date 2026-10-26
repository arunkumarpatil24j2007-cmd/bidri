import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-bidri-black text-ivory relative overflow-hidden pt-16 sm:pt-20 pb-12 select-none border-t border-white/10">
      <div className="container-luxury">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-white/15">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl sm:text-3xl font-light text-ivory tracking-tight block">
                BIDRI CRAFTS
              </span>
              <span className="font-eyebrow text-[9px] text-antique-gold tracking-[0.4em] uppercase block -mt-1 font-medium">
                HANDCRAFTED IN BIDAR, KARNATAKA · EST. 1422
              </span>
            </Link>

            <p className="font-body text-xs text-silver-bright/80 font-light leading-relaxed max-w-sm">
              Authentic Indian handicraft store dedicated to preserving the 600-year-old GI-certified metalcraft of Karnataka. Hand-cast from zinc-copper alloy and inlaid with 99.9% fine silver.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs font-body text-silver-bright/70">
              <div className="flex items-center space-x-2">
                <Truck size={14} className="text-antique-gold flex-shrink-0" />
                <span>Free Insured Delivery Across India (3–5 business days)</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-peacock-teal flex-shrink-0" />
                <span>Govt of India GI Tag No. 12 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw size={14} className="text-rani-pink flex-shrink-0" />
                <span>7-Day Transit Damage Guarantee</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop & Collections (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-eyebrow text-[10.5px] text-antique-gold tracking-[0.35em] uppercase block font-medium">
              SHOP COLLECTIONS
            </span>
            <ul className="space-y-2 font-body text-xs text-silver-bright/80 font-light">
              <li>
                <Link href="/shop" className="hover:text-rani-pink hover-link-rule font-medium text-silver-bright">
                  Shop All Products →
                </Link>
              </li>
              <li>
                <Link href="/collections/table-and-decor" className="hover:text-rani-pink hover-link-rule">
                  Home Décor & Vases
                </Link>
              </li>
              <li>
                <Link href="/collections/sculptures-and-statues" className="hover:text-rani-pink hover-link-rule">
                  Sculptures & Statues
                </Link>
              </li>
              <li>
                <Link href="/collections/barware" className="hover:text-rani-pink hover-link-rule">
                  Barware & Hospitality
                </Link>
              </li>
              <li>
                <Link href="/collections/desk-and-study" className="hover:text-rani-pink hover-link-rule">
                  Desk & Study Objects
                </Link>
              </li>
              <li>
                <Link href="/collections/gifting" className="hover:text-rani-pink hover-link-rule">
                  Traditional Gifts & Boxes
                </Link>
              </li>
              <li>
                <Link href="/collections/the-archive" className="hover:text-rani-pink hover-link-rule">
                  The Archive (Imperial Recreations)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-eyebrow text-[10.5px] text-peacock-teal tracking-[0.35em] uppercase block font-medium">
              CUSTOMER CARE & POLICIES
            </span>
            <ul className="space-y-2 font-body text-xs text-silver-bright/80 font-light">
              <li>
                <Link href="/shipping" className="hover:text-rani-pink hover-link-rule">
                  Shipping & Delivery (India)
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-rani-pink hover-link-rule">
                  7-Day Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/authenticity" className="hover:text-rani-pink hover-link-rule">
                  Karnataka GI Registry Tag #12
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="hover:text-rani-pink hover-link-rule">
                  Bidriware Care & Cleaning
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rani-pink hover-link-rule">
                  About Our Craft & Artisans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rani-pink hover-link-rule">
                  Contact Customer Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-rani-pink hover-link-rule">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-rani-pink hover-link-rule">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-body text-silver-bright/60">
          <p>© {new Date().getFullYear()} Bidri Crafts. Direct Artisan Cooperative, Bidar, Karnataka. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Operating Exclusively in India</span>
            <span>·</span>
            <span>Prices in INR (₹)</span>
            <span>·</span>
            <span>100% Handcrafted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
