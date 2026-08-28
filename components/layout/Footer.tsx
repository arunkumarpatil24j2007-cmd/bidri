import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-bidri-black text-ivory relative overflow-hidden pt-20 pb-12 select-none border-t border-white/10">
      <div className="container-luxury">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl font-light text-ivory tracking-tight block">
                BIDRI CRAFTS
              </span>
              <span className="font-eyebrow text-[9px] text-rani-pink tracking-[0.45em] uppercase block -mt-1 font-medium">
                BIDRIWARE × ILKAL SAREES · EST. 1422
              </span>
            </Link>

            <p className="font-body text-xs text-silver-bright/80 font-light leading-relaxed max-w-sm">
              An independent contemporary Indian craft house dedicated to preserving, evolving, and globally elevating the authentic 600-year GI-tagged Bidri metalcraft of Karnataka.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-body text-silver-bright/70">
              <span className="w-2 h-2 rounded-full bg-peacock-teal" />
              <span>Direct Artisan Cooperative · Bidar, Karnataka</span>
            </div>
          </div>

          {/* Column 2: Explore (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-eyebrow text-[10.5px] text-saffron tracking-[0.38em] uppercase block font-medium">
              EXPLORE
            </span>
            <ul className="space-y-2 font-body text-xs text-silver-bright/80 font-light">
              <li>
                <Link href="/shop" className="hover:text-rani-pink hover-link-rule font-medium text-silver-bright">
                  Shop All Artefacts
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-rani-pink hover-link-rule">
                  The Six Typologies
                </Link>
              </li>
              <li>
                <Link href="/#street-pop" className="hover:text-rani-pink hover-link-rule">
                  Bidri × Street Edit
                </Link>
              </li>
              <li>
                <Link href="/#lookbook" className="hover:text-rani-pink hover-link-rule">
                  Deccan Lookbook
                </Link>
              </li>
              <li>
                <Link href="/craft" className="hover:text-rani-pink hover-link-rule">
                  The 600-Yr Alchemy
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-rani-pink hover-link-rule">
                  Master Inlayer Guild
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Concierge (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-eyebrow text-[10.5px] text-peacock-teal tracking-[0.38em] uppercase block font-medium">
              CLIENT CARE
            </span>
            <ul className="space-y-2 font-body text-xs text-silver-bright/80 font-light">
              <li>
                <Link href="/shipping" className="hover:text-rani-pink hover-link-rule">
                  Worldwide Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-rani-pink hover-link-rule">
                  14-Day Exchanges
                </Link>
              </li>
              <li>
                <Link href="/authenticity" className="hover:text-rani-pink hover-link-rule">
                  GI Registry Tag
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="hover:text-rani-pink hover-link-rule">
                  Patina & Oil Care
                </Link>
              </li>
              <li>
                <Link href="/bespoke" className="hover:text-rani-pink hover-link-rule">
                  Bespoke Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rani-pink hover-link-rule">
                  Concierge Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp & Social (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-eyebrow text-[10.5px] text-rani-pink tracking-[0.38em] uppercase block font-medium">
              CONCIERGE & SOCIAL
            </span>
            <p className="font-body text-xs text-silver-bright/80 font-light leading-relaxed">
              Direct assistance with custom bridal gifting, corporate commissions, and international courier dispatch.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919861088200"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-rani-pink border border-white/20 text-ivory text-xs font-body transition-colors"
              >
                <span>WhatsApp Concierge</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Provenance */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-silver-bright/70 font-body gap-4">
          <div>
            &copy; 1422–{new Date().getFullYear()} BIDRI CRAFTS · Handcrafted with reverence in Bidar & Ilkal, Karnataka.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-ivory hover-link-rule">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ivory hover-link-rule">Terms of Service</Link>
            <Link href="/authenticity" className="hover:text-ivory hover-link-rule">GI Registry No. 12</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

