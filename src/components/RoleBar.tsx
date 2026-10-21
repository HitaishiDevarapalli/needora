'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

export default function RoleBar() {
  const pathname = usePathname();

  const isCustomer = pathname === '/';
  const isMerchant = pathname.startsWith('/merchant');
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-300">
            Needora Multi-Role Platform:
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Explore authentic customer, merchant, and administrator experiences
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
              isCustomer
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Customer Marketplace</span>
          </Link>

          <Link
            href="/merchant"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
              isMerchant
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Merchant Portal</span>
          </Link>

          <Link
            href="/admin"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors ${
              isAdmin
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Verification</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
