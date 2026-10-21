'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  Store, 
  MapPin, 
  MessageSquare, 
  Video, 
  HelpCircle, 
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getStoredBusinesses, StoredBusiness } from '@/lib/storage';
import { CATEGORIES } from '@/data/mockData';

interface ChatMessage {
  id: string;
  sender: 'dora' | 'user';
  text: string;
  links?: { label: string; href: string }[];
  businessResults?: StoredBusiness[];
  timestamp: string;
}

export default function DoraAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'dora',
      text: 'Namaste! I am Dora, your Needora AI Assistant. How can I help you discover local businesses, send enquiries, or promote your shop today?',
      links: [
        { label: 'Find Nearby Services', href: '/services' },
        { label: 'List My Business Free', href: '/listing' },
        { label: 'Watch Merchant Reels', href: '/videos' },
        { label: 'My Enquiries', href: '/my-enquiries' },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      respondToQuery(query);
      setIsTyping(false);
    }, 700);
  };

  const respondToQuery = (query: string) => {
    const q = query.toLowerCase();
    const businesses = getStoredBusinesses();

    // 1. Payment or Pricing inquiries
    if (q.includes('pay') || q.includes('payment') || q.includes('upi') || q.includes('price') || q.includes('cost') || q.includes('fee')) {
      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: 'Needora does NOT collect online payments, UPI transfers, or checkout fees! Our platform connects you directly to local businesses for 100% free enquiries. You discuss quotes, scope, and payment directly with the merchant with no middlemen.',
          links: [
            { label: 'View All Services', href: '/services' },
            { label: 'Check My Enquiries', href: '/my-enquiries' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // 2. Business listing inquiries
    if (q.includes('register') || q.includes('list') || q.includes('merchant') || q.includes('add my shop') || q.includes('owner')) {
      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: 'Listing your shop on Needora is completely FREE! You get a dedicated merchant profile, direct customer enquiries via SMS/WhatsApp, and can upload promotional video reels to reach local customers.',
          links: [
            { label: 'Open Free Listing Form', href: '/listing' },
            { label: 'Go to Merchant Dashboard', href: '/merchant' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // 3. Video or Reels inquiries
    if (q.includes('video') || q.includes('reel') || q.includes('watch') || q.includes('clip')) {
      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: 'You can explore vertical video reels uploaded by real local merchants, or upload your own store walkthroughs!',
          links: [
            { label: 'Watch Video Reels', href: '/videos' },
            { label: 'Upload Store Video', href: '/create' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // 4. Search real businesses & categories
    const matchedBusinesses = businesses.filter(b => 
      b.name.toLowerCase().includes(q) || 
      b.category.toLowerCase().includes(q) || 
      b.description.toLowerCase().includes(q)
    );

    const matchedCategory = CATEGORIES.find(c => 
      c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );

    if (matchedBusinesses.length > 0) {
      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: `I found ${matchedBusinesses.length} verified business(es) on Needora matching "${query}":`,
          businessResults: matchedBusinesses.slice(0, 3),
          links: [
            { label: 'View in Full Search', href: `/search` }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    if (matchedCategory) {
      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: `Looking for ${matchedCategory.name}? You can explore verified providers, compare quotes, and send instant enquiries for this category!`,
          links: [
            { label: `Explore ${matchedCategory.name}`, href: `/categories/${matchedCategory.slug}` },
            { label: 'Submit Free Enquiry', href: '/services' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // Default intelligent guidance
    setMessages(prev => [
      ...prev,
      {
        id: 'dora-' + Date.now(),
        sender: 'dora',
        text: `I can help you locate trusted local professionals, find store hours, track your enquiries, or publish your own business. What would you like to explore next?`,
        links: [
          { label: 'Search All Services', href: '/services' },
          { label: 'Browse Categories', href: '/categories' },
          { label: 'Explore Community Feed', href: '/explore' },
          { label: 'Register Free Business', href: '/listing' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const quickPrompts = [
    'How do I list my business for free?',
    'Does Needora charge any payment fee?',
    'Show me Home Decor and Cleaning services',
    'Where can I see my customer enquiries?',
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Dora AI Assistant</span>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[550px]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center gap-2">
                  Dora AI Hyperlocal Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h2>
                <p className="text-xs text-blue-100">Live platform navigation & intelligent discovery</p>
              </div>
            </div>

            <span className="text-[11px] font-bold bg-white/10 px-2.5 py-1 rounded-full text-blue-100">
              Zero Payments • Direct Enquiry
            </span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[60vh]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-slate-100 text-slate-900 rounded-bl-xs border border-slate-200/60'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {/* Optional Embedded Business Cards */}
                  {msg.businessResults && msg.businessResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.businessResults.map(biz => (
                        <div key={biz.id} className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{biz.name}</span>
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                              {biz.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 truncate">{biz.address}, {biz.city}</p>
                          <div className="mt-2 flex gap-2">
                            <Link
                              href="/services"
                              className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md hover:bg-emerald-100 transition-colors"
                            >
                              Send Free Enquiry
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Quick Links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.links.map(link => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 transition-colors shadow-2xs"
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="w-3 h-3 text-blue-500" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Dora is checking verified listings...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Try asking:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700 whitespace-nowrap transition-colors shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Dora about local stores, free listings, or quotations..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-2xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Ask</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
