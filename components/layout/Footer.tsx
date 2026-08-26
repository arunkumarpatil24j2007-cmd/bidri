import React from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/ui/Wordmark';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-bidri-black text-ivory relative overflow-hidden pt-24 pb-12 select-none">
      <div className="container-luxury">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-20 border-b border-silver/20">
          {/* Column 1: Collections */}
          <div className="space-y-4">
            <span className="font-eyebrow text-[10px] text-silver tracking-[0.42em] uppercase block">
              COLLECTIONS
            </span>
            <ul className="space-y-2.5 font-body text-[13px] text-silver-bright/80 font-light">
              <li>
                <Link href="/collections/jewellery" className="hover:text-ivory hover-link-rule">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="/collections/table-and-decor" className="hover:text-ivory hover-link-rule">
                  Table & Décor
                </Link>
              </li>
              <li>
                <Link href="/collections/barware" className="hover:text-ivory hover-link-rule">
                  Barware
                </Link>
              </li>
              <li>
                <Link href="/collections/desk-and-study" className="hover:text-ivory hover-link-rule">
                  Desk & Study
                </Link>
              </li>
              <li>
                <Link href="/collections/gifting" className="hover:text-ivory hover-link-rule">
                  Gifting Concierge
                </Link>
              </li>
              <li>
                <Link href="/collections/the-archive" className="hover:text-ivory hover-link-rule">
                  The Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: The House */}
          <div className="space-y-4">
            <span className="font-eyebrow text-[10px] text-silver tracking-[0.42em] uppercase block">
              THE HOUSE
            </span>
            <ul className="space-y-2.5 font-body text-[13px] text-silver-bright/80 font-light">
              <li>
                <Link href="/craft" className="hover:text-ivory hover-link-rule">
                  The Eight-Step Craft
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-ivory hover-link-rule">
                  Master Inlayers
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="hover:text-ivory hover-link-rule">
                  The Bahmani Court
                </Link>
              </li>
              <li>
                <Link href="/authenticity" className="hover:text-ivory hover-link-rule">
                  Certificate Registry
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-ivory hover-link-rule">
                  Journal & Metallurgy
                </Link>
              </li>
              <li>
                <Link href="/bespoke" className="hover:text-ivory hover-link-rule">
                  Private Commission
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care */}
          <div className="space-y-4">
            <span className="font-eyebrow text-[10px] text-silver tracking-[0.42em] uppercase block">
              CLIENT CARE
            </span>
            <ul className="space-y-2.5 font-body text-[13px] text-silver-bright/80 font-light">
              <li>
                <Link href="/care-guide" className="hover:text-ivory hover-link-rule">
                  Patina & Oil Care Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-ivory hover-link-rule">
                  Complimentary Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-ivory hover-link-rule">
                  Returns & Guarantee
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-ivory hover-link-rule">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory hover-link-rule">
                  Concierge Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier Address & GI Tag */}
          <div className="space-y-4 text-left">
            <span className="font-eyebrow text-[10px] text-silver tracking-[0.42em] uppercase block">
              ATELIER
            </span>
            <p className="font-body text-[13px] text-silver-bright/80 font-light leading-relaxed">
              Chowbara Road, Old City<br />
              Bidar 585401, Karnataka<br />
              India
            </p>
            <div className="pt-2">
              <span className="inline-block border border-silver/30 px-3 py-1 font-eyebrow text-[9px] text-silver tracking-[0.25em] uppercase">
                GI Tag No. 12 · Karnataka
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Giant Bleeding Wordmark & Legal Bar */}
        <div className="pt-16 pb-4 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Bleeding Wordmark */}
          <div className="-ml-3 opacity-90">
            <Wordmark variant="light" size="giant" />
          </div>

          {/* Legal / Copyright */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-body text-[11px] text-silver/70 font-light">
            <span>© 1422–{new Date().getFullYear()} BIDRI CRAFTS. All rights reserved.</span>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-ivory hover-link-rule">
                Privacy
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-ivory hover-link-rule">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
