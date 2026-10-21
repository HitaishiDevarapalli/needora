'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Package, 
  Clock, 
  Tag, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Truck,
  Eye,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MOCK_MERCHANTS, MOCK_ORDERS } from '@/data/mockData';

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'catalogue' | 'storefront' | 'offers' | 'analytics'>('orders');
  
  // Merchant active profile
  const merchant = MOCK_MERCHANTS[0]; // Sri Balaji Sweets & Traditional Savories

  // Live Orders state
  const [orders, setOrders] = useState([
    {
      id: 'ord-901',
      orderNumber: 'NDR-2025-901',
      customerName: 'Kavita Sundaram',
      phone: '+91 98480 99881',
      items: 'Special Kaju Katli (500g) x 1, Motichoor Ladoo x 2',
      amount: 1180,
      payment: 'Paid (UPI)',
      status: 'New',
      time: '12 mins ago',
      slot: 'Express Delivery (30 mins)'
    },
    {
      id: 'ord-902',
      orderNumber: 'NDR-2025-902',
      customerName: 'Anil Rao',
      phone: '+91 97001 22334',
      items: 'Madras Mixture (500g) x 2, Gulab Jamun (1kg) x 1',
      amount: 760,
      payment: 'Paid (UPI)',
      status: 'Preparing',
      time: '28 mins ago',
      slot: 'Today, 06:00 PM'
    },
    {
      id: 'ord-903',
      orderNumber: 'NDR-2025-903',
      customerName: 'Meera Deshpande',
      phone: '+91 91234 88776',
      items: 'Assorted Festive Mithai Gift Box (1kg)',
      amount: 1450,
      payment: 'Cash on Delivery',
      status: 'Out for Delivery',
      time: '45 mins ago',
      slot: 'Assigned to Delivery Partner'
    }
  ]);

  // Catalogue items state
  const [catalogue, setCatalogue] = useState([
    { id: 'cat-1', name: 'Special Kaju Katli (500g)', category: 'Sweets', price: 540, stock: 35, status: 'In Stock' },
    { id: 'cat-2', name: 'Pure Ghee Motichoor Ladoo (500g)', category: 'Sweets', price: 340, stock: 48, status: 'In Stock' },
    { id: 'cat-3', name: 'Special Madras Mixture (250g)', category: 'Savories', price: 120, stock: 90, status: 'In Stock' },
    { id: 'cat-4', name: 'Dry Fruit Halwa (400g)', category: 'Sweets', price: 420, stock: 12, status: 'Low Stock' },
    { id: 'cat-5', name: 'Spicy Ribbon Pakoda (250g)', category: 'Savories', price: 110, stock: 0, status: 'Out of Stock' }
  ]);

  const updateOrderStatus = (orderId: string, nextStatus: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Merchant Bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              N
            </div>
            <span className="font-bold text-slate-900 hidden sm:inline">Needora</span>
          </Link>
          <div className="h-5 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Merchant Workspace
            </span>
            <span className="text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-none">
              {merchant.businessName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Store Online (Accepting Orders)
          </span>
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Switch to Customer View
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200 p-4 shrink-0 shadow-xs h-fit space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Store Operations
          </div>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4" />
              <span>Live Orders Queue</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'catalogue'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Catalogue & Pricing</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === 'catalogue' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {catalogue.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('storefront')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'storefront'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Storefront & Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'offers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Offers & Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Revenue & Reports</span>
          </button>

          <div className="pt-4 border-t border-slate-100 px-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Verification Status
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <span className="font-bold block">Gold Verified Business</span>
                <span className="text-[11px] text-emerald-700">GST & FSSAI cleared</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Today Sales</span>
              <div className="text-xl font-black text-slate-900 mt-1">₹14,890</div>
              <span className="text-[10px] text-emerald-600 font-semibold">↑ 18% vs yesterday</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Active Orders</span>
              <div className="text-xl font-black text-slate-900 mt-1">{orders.length}</div>
              <span className="text-[10px] text-blue-600 font-semibold">All within SLA</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Customer Rating</span>
              <div className="text-xl font-black text-slate-900 mt-1">4.9 ★</div>
              <span className="text-[10px] text-slate-500">1,420 total reviews</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Next Payout</span>
              <div className="text-xl font-black text-slate-900 mt-1">₹48,200</div>
              <span className="text-[10px] text-slate-500">Direct NEFT on Friday</span>
            </div>
          </div>

          {/* TAB 1: LIVE ORDERS QUEUE */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Live Fulfilment Queue</h2>
                  <p className="text-xs text-slate-500">Process, prepare, and dispatch orders in real-time</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full border border-blue-200">
                  Auto-refreshing every 30s
                </span>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600">{ord.orderNumber}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-slate-800">{ord.customerName}</span>
                        <span className="text-[11px] text-slate-400">({ord.phone})</span>
                      </div>
                      <div className="text-xs text-slate-700 font-medium">{ord.items}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Slot: {ord.slot}</span>
                        <span>•</span>
                        <span>{ord.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-900">₹{ord.amount}</div>
                        <div className="text-[10px] text-emerald-600 font-medium">{ord.payment}</div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {ord.status === 'New' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Preparing')}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                          >
                            Accept & Prepare
                          </button>
                        )}
                        {ord.status === 'Preparing' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Out for Delivery')}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs"
                          >
                            Dispatch Order
                          </button>
                        )}
                        {ord.status === 'Out for Delivery' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Delivered')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {ord.status === 'Delivered' && (
                          <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CATALOGUE & INVENTORY */}
          {activeTab === 'catalogue' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Catalogue Management</h2>
                  <p className="text-xs text-slate-500">Manage products, stock quantity, and instant prices</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newItem = {
                      id: `cat-${Date.now()}`,
                      name: 'Fresh Rasgulla (500g)',
                      category: 'Sweets',
                      price: 280,
                      stock: 25,
                      status: 'In Stock'
                    };
                    setCatalogue([newItem, ...catalogue]);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-y border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Item Name</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Price</th>
                      <th className="py-2.5 px-3">Stock</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {catalogue.map((it) => (
                      <tr key={it.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-semibold text-slate-800">{it.name}</td>
                        <td className="py-3 px-3 text-slate-500">{it.category}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">₹{it.price}</td>
                        <td className="py-3 px-3">{it.stock} units</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            it.status === 'In Stock'
                              ? 'bg-emerald-50 text-emerald-700'
                              : it.status === 'Low Stock'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}>
                            {it.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button className="text-blue-600 hover:underline font-semibold">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: STOREFRONT PROFILE */}
          {activeTab === 'storefront' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">Storefront Profile & Branding</h2>
                <p className="text-xs text-slate-500">Public information displayed on Needora customer discovery</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    defaultValue={merchant.businessName}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Category</label>
                  <input
                    type="text"
                    defaultValue={merchant.category}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Owner Contact Phone</label>
                  <input
                    type="text"
                    defaultValue={merchant.phone}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Store Address</label>
                  <input
                    type="text"
                    defaultValue={merchant.address}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs">
                  Save Store Profile Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: OFFERS & REELS */}
          {activeTab === 'offers' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Promotional Offers & Reels</h2>
                  <p className="text-xs text-slate-500">Publish festival discounts and short product videos</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold">
                  + Create Campaign
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900">Diwali Sweets Combo 20% OFF</span>
                  <p className="text-[11px] text-slate-500">Valid till 31 Oct • Coupon: DIWALI20</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS & REPORTS */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Sales & Payout Telemetry</h2>
                <p className="text-xs text-slate-500">Track real-time transactions, commission deductions, and GST invoices</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">Monthly Revenue: ₹2,48,900</h4>
                <p className="text-xs text-slate-500">All merchant payouts are cleared automatically every Tuesday and Friday.</p>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
