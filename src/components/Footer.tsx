'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#121B2B] text-slate-300 pt-12 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg tracking-tighter">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Needora</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hyperlocal business discovery and enquiry platform connecting local shops, service providers, and consumers.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg inline-block">
              ✓ 100% Free Enquiries • Zero Commission
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Community</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories & Directory</Link></li>
              <li><Link href="/videos" className="hover:text-white transition-colors">Merchant Video Reels</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Advanced Search</Link></li>
            </ul>
          </div>

          {/* For Merchants */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">For Businesses</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/listing" className="hover:text-white text-rose-400 font-semibold transition-colors">Free Business Listing</Link></li>
              <li><Link href="/create" className="hover:text-white transition-colors">Upload Store Video / Post</Link></li>
              <li><Link href="/merchant" className="hover:text-white transition-colors">Merchant Dashboard</Link></li>
              <li><Link href="/my-enquiries" className="hover:text-white transition-colors">Customer Enquiries</Link></li>
              <li><Link href="/dora" className="hover:text-white text-indigo-400 transition-colors">Dora AI Assistant</Link></li>
            </ul>
          </div>

          {/* Governance & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Company & Support</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Updates</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/admin" className="hover:text-white text-slate-500 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Needora Hyperlocal Network. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Needora connects customers and local merchants directly. We do not collect payments or process transactions between parties.
          </div>
        </div>
      </div>
    </footer>
  );
}
