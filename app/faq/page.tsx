import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers regarding authentic Bidri craft, pure silver purity, shipping, certification, and custom commissions.',
};

export default function FaqPage() {
  const faqItems: AccordionItem[] = [
    {
      id: 'q1',
      title: 'What makes authentic Bidriware different from painted or plated metal?',
      content: (
        <p>
          Authentic Bidriware is an integrated metallurgical craft. The silver wire is mechanically hammered into hand-chiselled grooves of a zinc-copper alloy. The black patina is not paint or lacquer; it is created by a boiling chemical reaction with mineral-rich soil harvested from Bidar Fort.
        </p>
      ),
    },
    {
      id: 'q2',
      title: 'What is the purity of the silver used in inlay?',
      content: (
        <p>
          We use 99.9% fine pure silver wire and leaf. Because the base alloy turns black during the fort soil bath, only pure silver possesses the required resistance to emerge radiant and unaffected.
        </p>
      ),
    },
    {
      id: 'q3',
      title: 'How do I verify the authenticity of my piece?',
      content: (
        <p>
          Every piece ships with a signed and numbered Certificate of Authenticity under GI Tag No. 12. You can verify your unique serial number on our Authenticity Registry page at any time.
        </p>
      ),
    },
    {
      id: 'q4',
      title: 'What are your worldwide shipping timelines?',
      content: (
        <p>
          We provide complimentary insured global courier delivery on all numbered pieces. Domestic orders arrive within 2–4 business days; international deliveries arrive within 4–7 business days in bespoke museum-grade protective packaging.
        </p>
      ),
    },
    {
      id: 'q5',
      title: 'Can I commission a custom size, motif, or monogram?',
      content: (
        <p>
          Yes. Our master craftsmen accept private commissions for custom heraldry, family seals, architectural panels, and one-of-one ceremonial pieces with an 8 to 16 week lead time through our Bespoke service.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full bg-ivory pt-36 pb-32 select-none">
      <div className="container-luxury max-w-3xl mx-auto space-y-16">
        <div className="space-y-4 text-center max-w-xl mx-auto">
          <span className="font-eyebrow text-[11px] text-graphite/60 tracking-[0.42em] uppercase block">
            KNOWLEDGE BASE
          </span>
          <h1 className="font-display headline-sub font-light text-bidri-black">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-base text-graphite font-light">
            Insights on metallurgy, provenance deeds, delivery, and care.
          </p>
        </div>

        <div className="pt-8">
          <Accordion items={faqItems} allowMultiple />
        </div>

        <div className="text-center pt-8 text-xs font-body text-graphite/70">
          Have an unlisted inquiry? <Link href="/contact" className="text-bidri-black hover-link-rule">Contact our curator</Link>.
        </div>
      </div>
    </div>
  );
}
