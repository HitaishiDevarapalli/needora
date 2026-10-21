'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Search, 
  Filter, 
  Users, 
  Store, 
  BarChart, 
  Sliders,
  Check,
  X,
  MapPin,
  ExternalLink,
  Copy
} from 'lucide-react';
import { MOCK_VERIFICATIONS, MOCK_COMPLAINTS, MOCK_MERCHANTS } from '@/data/mockData';
import { VerificationRequest } from '@/types';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'verifications' | 'duplicates' | 'moderation' | 'users'>('verifications');
  const [verifications, setVerifications] = useState<VerificationRequest[]>(MOCK_VERIFICATIONS);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(MOCK_VERIFICATIONS[1]);
  const [decisionNotes, setDecisionNotes] = useState('');

  const handleDecision = (id: string, status: 'approved' | 'rejected') => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status } : null));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
              N
            </div>
            <span className="font-bold text-white text-base">Needora</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 text-xs font-semibold">
              Admin & Trust Safety Suite
            </span>
            <span className="text-xs text-slate-400 hidden md:inline">
              Super Admin Session: adm-99201
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-medium text-slate-300 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ← Exit to Marketplace
          </Link>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Navigation */}
        <aside className="w-full lg:w-60 bg-slate-950/80 rounded-2xl border border-slate-800 p-3 shrink-0 h-fit space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Trust & Governance
          </div>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'verifications'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Merchant Verification</span>
            </div>
            <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded-full text-indigo-300">
              {verifications.filter((v) => v.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('duplicates')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'duplicates'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Duplicate Detection</span>
            </div>
            <span className="bg-amber-900/40 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-full border border-amber-800">
              1 alert
            </span>
          </button>

          <button
            onClick={() => setActiveTab('moderation')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'moderation'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Customer Complaints</span>
            </div>
            <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded-full text-slate-400">
              {MOCK_COMPLAINTS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Directory</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-6">
          
          {/* TAB 1: VERIFICATIONS */}
          {activeTab === 'verifications' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Request List */}
              <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Verification Queue ({verifications.length})
                  </h3>
                  <span className="text-[11px] text-indigo-400 font-medium">Pending Review</span>
                </div>

                <div className="space-y-2">
                  {verifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedRequest(item)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedRequest?.id === item.id
                          ? 'border-indigo-500 bg-indigo-950/40 shadow-xs'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white truncate max-w-[180px]">
                          {item.businessName}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          item.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : item.status === 'rejected'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{item.category} • {item.ownerName}</div>
                      <div className="text-[10px] text-slate-500 mt-1">Submitted: {item.submittedAt}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Workspace */}
              <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-5">
                {selectedRequest ? (
                  <>
                    <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h2 className="text-base font-bold text-white">{selectedRequest.businessName}</h2>
                        <p className="text-xs text-slate-400">Legal: {selectedRequest.legalEntityName}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        selectedRequest.riskScore === 'Low'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}>
                        Risk: {selectedRequest.riskScore}
                      </span>
                    </div>

                    {/* Duplicate Candidate warning if detected */}
                    {selectedRequest.duplicateMatchFound && (
                      <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-800/80 text-amber-200 text-xs space-y-1">
                        <div className="flex items-center gap-2 font-bold text-amber-300">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>Duplicate Candidate Detected</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          {selectedRequest.duplicateNotes}
                        </p>
                      </div>
                    )}

                    {/* Official Credentials */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">GSTIN Reference</span>
                        <div className="font-mono font-semibold text-slate-200">{selectedRequest.gstin}</div>
                        <span className="text-[10px] text-emerald-400">Verified via GST API</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">FSSAI License</span>
                        <div className="font-mono font-semibold text-slate-200">{selectedRequest.fssaiNumber || 'Not Required'}</div>
                        <span className="text-[10px] text-slate-400">Standard Category</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">Phone Audit</span>
                        <div className="font-medium text-slate-200">{selectedRequest.phone}</div>
                        <span className="text-[10px] text-emerald-400">SMS OTP Verified</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">Location & Pincode</span>
                        <div className="font-medium text-slate-200">{selectedRequest.pincode}</div>
                        <span className="text-[10px] text-slate-400">{selectedRequest.address}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-400">
                        Status: <span className="font-bold text-white capitalize">{selectedRequest.status}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecision(selectedRequest.id, 'rejected')}
                          className="px-4 py-2 rounded-xl bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900 text-xs font-bold transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDecision(selectedRequest.id, 'approved')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          Approve & Issue Gold Badge
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Select a verification request from the left column.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: DUPLICATES */}
          {activeTab === 'duplicates' && (
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Geographic Proximity & Name Similarity Scanner
              </h2>
              <div className="p-4 rounded-xl border border-amber-800 bg-amber-950/20 text-xs space-y-2">
                <span className="font-bold text-amber-300">Potential Duplicate Flagged</span>
                <p className="text-slate-300">
                  Business &quot;Kaveri Pure Veg Tiffin Center&quot; matches existing registered merchant &quot;Kaveri Sweets & Fast Food&quot; located 140 meters away.
                </p>
                <div className="pt-2 flex gap-2">
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold">
                    Merge Store Records
                  </button>
                  <button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">
                    Mark as Legitimate Separate Branch
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MODERATION / COMPLAINTS */}
          {activeTab === 'moderation' && (
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Consumer Grievances & Resolution Log
              </h2>
              <div className="space-y-3">
                {MOCK_COMPLAINTS.map((cmp) => (
                  <div key={cmp.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-indigo-400">{cmp.ticketNumber}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[10px]">
                        {cmp.status}
                      </span>
                    </div>
                    <div className="text-slate-200 font-medium">{cmp.issue}</div>
                    <div className="text-slate-400 text-[11px]">
                      Customer: {cmp.customerName} ({cmp.customerPhone}) • Store: {cmp.merchantName}
                    </div>
                    {cmp.resolution && (
                      <div className="text-emerald-400 text-[11px] pt-1 border-t border-slate-800">
                        Resolution: {cmp.resolution}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: USERS */}
          {activeTab === 'users' && (
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Platform Merchant & Customer Accounts
              </h2>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Category</th>
                      <th className="py-2 px-3">City</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {MOCK_MERCHANTS.map((m) => (
                      <tr key={m.id}>
                        <td className="py-2.5 px-3 font-semibold text-slate-200">{m.businessName}</td>
                        <td className="py-2.5 px-3 text-slate-400">{m.category}</td>
                        <td className="py-2.5 px-3 text-slate-400">{m.city}</td>
                        <td className="py-2.5 px-3 text-emerald-400">{m.status}</td>
                        <td className="py-2.5 px-3 text-slate-200">{m.rating} ★</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
