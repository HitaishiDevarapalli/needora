'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  if (!isOpen) return null;

  const [items, setItems] = useState([
    {
      id: 'c-1',
      title: 'Full 2BHK Deep Cleaning & Sanitization',
      provider: 'CleanPro Hygiene Solutions',
      price: 1499,
      quantity: 1
    },
    {
      id: 'c-2',
      title: 'Pure Ghee Motichoor Ladoo (500g)',
      provider: 'Sri Balaji Sweets & Traditional Savories',
      price: 340,
      quantity: 2
    }
  ]);

  const [coupon, setCoupon] = useState('NEEDORA50');
  const [couponApplied, setCouponApplied] = useState(true);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof items
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const discount = couponApplied ? Math.min(150, Math.round(subtotal * 0.1)) : 0;
  const delivery = subtotal > 0 ? 40 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal - discount + delivery + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-slate-900">Your Cart ({items.length})</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-600">Your cart is empty</p>
                <p className="text-xs text-slate-400">Discover local services & fresh store items</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="p-3 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.provider}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-slate-900">₹{item.price * item.quantity}</span>
                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-slate-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-slate-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Coupon Code section */}
            {items.length > 0 && (
              <div className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl font-mono uppercase"
                    />
                  </div>
                  <button
                    onClick={() => setCouponApplied(true)}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    ✓ Code NEEDORA50 applied (₹{discount} saved)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery & Handling</span>
                  <span>₹{delivery}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (GST)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Order Total</span>
                  <span className="text-brand-600">₹{total}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onCheckout();
                  onClose();
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
