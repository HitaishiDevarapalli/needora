'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, Send, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import { getStoredBusinesses } from '@/lib/storage';

export default function DoraAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'dora' | 'user'; text: string; link?: string }>>([
    {
      sender: 'dora',
      text: 'Hi! I am Dora, Needora AI. Need help finding a local service or listing your shop for free?',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');

    setTimeout(() => {
      const q = query.toLowerCase();
      if (q.includes('pay') || q.includes('upi') || q.includes('price')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'dora',
            text: 'Needora is 100% free of online payments! You submit free enquiries and communicate directly with the local merchant.',
            link: '/services',
          },
        ]);
      } else if (q.includes('list') || q.includes('register') || q.includes('business')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'dora',
            text: 'You can list your business on Needora completely free in 2 minutes!',
            link: '/listing',
          },
        ]);
      } else {
        const businesses = getStoredBusinesses();
        const found = businesses.filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
        if (found.length > 0) {
          setMessages(prev => [
            ...prev,
            {
              sender: 'dora',
              text: `Found ${found.length} local listing(s) matching "${query}". Check our Explore page!`,
              link: '/explore',
            },
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            {
              sender: 'dora',
              text: 'You can explore all our verified local categories or ask me more specific questions!',
              link: '/categories',
            },
          ]);
        }
      }
    }, 500);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 font-sans">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-spin-slow">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <span className="text-xs font-bold tracking-wide">Ask Dora AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-[320px] sm:w-[360px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Dora AI Assistant</h4>
                <p className="text-[10px] text-blue-100">Needora Hyperlocal Discovery</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/dora"
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Open Fullscreen Page"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-3.5 space-y-2.5 max-h-[300px] overflow-y-auto bg-slate-50 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.link && (
                    <Link
                      href={m.link}
                      onClick={() => setIsOpen(false)}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                    >
                      <span>Explore this now</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Input Form */}
          <form onSubmit={handleSend} className="p-2.5 border-t border-slate-100 bg-white flex items-center gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about local stores..."
              className="flex-1 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
