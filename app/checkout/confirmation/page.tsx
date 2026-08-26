'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, ArrowRight, Printer } from 'lucide-react';
import { Wordmark } from '@/components/ui/Wordmark';

export default function OrderConfirmationPage() {
  const [certNo, setCertNo] = useState('BIDRI-1422-784');
  const [patronName, setPatronName] = useState('Honoured Patron');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCert = sessionStorage.getItem('last_order_certificate');
      const savedName = sessionStorage.getItem('last_order_name');
      if (savedCert) setCertNo(savedCert);
      if (savedName && savedName.trim()) setPatronName(savedName);
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-ivory pt-36 pb-32 flex flex-col justify-between select-none">
      <div className="container-luxury max-w-2xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="w-12 h-12 rounded-full border border-bidri-black flex items-center justify-center mx-auto text-bidri-black">
            <CheckCircle2 size={24} strokeWidth={1.2} />
          </div>

          <span className="font-eyebrow text-[10px] text-graphite/60 tracking-[0.42em] uppercase block">
            ORDER CONFIRMED & DEEDED
          </span>

          <h1 className="font-display headline-sub font-light text-bidri-black">
            Thank You, {patronName}.
          </h1>

          <p className="font-body text-sm text-graphite font-light max-w-[46ch] mx-auto leading-relaxed">
            Your authentic Bidri artefacts are now being carefully inspected, hand-polished with cold-pressed oil, and boxed in our Bidar atelier.
          </p>
        </motion.div>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-10 bg-mist border border-silver/50 shadow-md text-left space-y-6"
        >
          <div className="flex justify-between items-center border-b border-silver/30 pb-4">
            <Wordmark size="sm" />
            <span className="font-mono text-xs text-bidri-black font-semibold tracking-wider">
              {certNo}
            </span>
          </div>

          <div className="space-y-2 font-body text-xs text-graphite">
            <p>
              <strong className="font-normal text-bidri-black">Archival Status:</strong> Registered to Karnataka Guild Ledger
            </p>
            <p>
              <strong className="font-normal text-bidri-black">GI Authentication:</strong> Registered under GI Tag No. 12 (Bidar, Karnataka)
            </p>
            <p>
              <strong className="font-normal text-bidri-black">Estimated Dispatch:</strong> 2 business days via insured private courier
            </p>
          </div>

          <div className="pt-4 border-t border-silver/30 flex justify-between items-center text-xs">
            <Link
              href={`/authenticity`}
              className="font-eyebrow text-[10px] text-bidri-black tracking-widest uppercase hover-link-rule"
            >
              LOOKUP IN REGISTRY →
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 text-graphite/70 hover:text-bidri-black cursor-pointer"
            >
              <Printer size={12} />
              <span>Print Deed</span>
            </button>
          </div>
        </motion.div>

        {/* Action Button */}
        <div className="pt-6">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-bidri-black text-ivory font-eyebrow text-[10px] tracking-[0.35em] uppercase hover:bg-graphite transition-colors"
          >
            RETURN TO MAISON
          </Link>
        </div>
      </div>
    </div>
  );
}
