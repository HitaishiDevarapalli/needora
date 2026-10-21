'use client';

import React from 'react';
import Link from 'next/link';

interface BottomCtaSectionProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export default function BottomCtaSection({ onOpenAuth }: BottomCtaSectionProps) {
  return (
    <section className="bg-[#121B2B] text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Strip matching reference screenshot */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">Needora</span>
              <span className="text-[10px] text-slate-400 tracking-wider">Discover. Connect. Get It Done.</span>
            </div>
          </div>

          {/* Center Callout & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="text-sm text-slate-300 font-medium max-w-md">
              Join Needora today and experience a smarter way to get things done.
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenAuth && onOpenAuth('signup')}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
              >
                Sign Up Now
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth('login')}
                className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 text-slate-200 font-medium text-xs sm:text-sm transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Social Icons matching reference */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-medium">Follow Us</span>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#instagram" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#facebook" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#x" className="hover:text-white transition-colors" aria-label="X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#youtube" className="hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#linkedin" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Sub-links & Copyright matching reference */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[11px] text-slate-500 gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About Us</Link>
            <span className="text-slate-700">|</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Help & Support</Link>
            <span className="text-slate-700">|</span>
            <Link href="/services" className="hover:text-slate-300 transition-colors">All Services</Link>
            <span className="text-slate-700">|</span>
            <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog Reels</Link>
          </div>

          <div>
            © 2025 Needora. All rights reserved.
          </div>
        </div>

      </div>
    </section>
  );
}
