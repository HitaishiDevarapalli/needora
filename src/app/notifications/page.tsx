'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bell, 
  CheckCheck, 
  MessageSquare, 
  ChevronRight, 
  Clock 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  getStoredNotifications, 
  markAllNotificationsRead, 
  StoredNotification 
} from '@/lib/storage';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<StoredNotification[]>([]);

  const loadNotifications = () => {
    setNotifications(getStoredNotifications());
  };

  useEffect(() => {
    loadNotifications();
    window.addEventListener('needora_storage_update', loadNotifications);
    return () => window.removeEventListener('needora_storage_update', loadNotifications);
  }, []);

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    loadNotifications();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Notifications</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-600" />
              Platform Notifications
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Real-time updates regarding your business enquiries, quotations, and merchant responses.
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition-all"
            >
              <CheckCheck className="w-4 h-4 text-blue-600" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">No notifications yet</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              When a local merchant replies to your enquiry or updates a quote, your alerts will show up here.
            </p>
            <div className="mt-6">
              <Link
                href="/services"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all inline-block"
              >
                Send an Enquiry
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notif => (
              <Link
                key={notif.id}
                href={notif.link || '/my-enquiries'}
                className={`block p-4 rounded-2xl border transition-all ${
                  notif.read
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-blue-50/50 border-blue-200 hover:border-blue-400 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.read ? 'bg-slate-100 text-slate-500' : 'bg-blue-600 text-white'
                    }`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{notif.message}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(notif.createdAt).toLocaleTimeString()} • {new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
