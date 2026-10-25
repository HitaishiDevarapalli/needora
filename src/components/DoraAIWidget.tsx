'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, Send, ChevronRight, MessageSquare, ExternalLink, Mic } from 'lucide-react';
import { getStoredBusinesses } from '@/lib/storage';

export default function DoraAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'తెలుగు' | 'हिंदी'>('English');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'dora' | 'user'; text: string; link?: string }>>([
    {
      sender: 'dora',
      text: 'Hi! I am Dora, Needora AI. Need help finding a local service or listing your shop for free?',
    },
  ]);

  const handleLanguageSwitch = (lang: 'English' | 'తెలుగు' | 'हिंदी') => {
    setSelectedLanguage(lang);
    if (lang === 'తెలుగు') {
      setMessages(prev => [
        ...prev,
        {
          sender: 'dora',
          text: 'నమస్కారం! హోమ్ డెకర్, క్లీనింగ్, స్థానిక దుకాణాలు లేదా ఉచిత వ్యాపార నమోదు గురించి ఏదైనా అడగండి.',
        }
      ]);
    } else if (lang === 'हिंदी') {
      setMessages(prev => [
        ...prev,
        {
          sender: 'dora',
          text: 'नमस्ते! होम डेकोर, क्लीनिंग, स्थानीय दुकानों या मुफ्त दुकान जोड़ने के बारे में कुछ भी पूछें।',
        }
      ]);
    }
  };

  const handleToggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = selectedLanguage === 'తెలుగు' ? 'te-IN' : selectedLanguage === 'हिंदी' ? 'hi-IN' : 'en-IN';

    setIsListening(true);
    rec.start();

    rec.onresult = (ev: any) => {
      const text = ev.results[0][0].transcript;
      setInput(text);
      setIsListening(false);
      processQuery(text);
    };

    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
  };

  const processQuery = (queryText: string) => {
    const query = queryText.trim();
    if (!query) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');

    setTimeout(() => {
      const q = query.toLowerCase();

      // Vernacular payment queries
      if (
        q.includes('pay') || q.includes('upi') || q.includes('price') ||
        q.includes('డబ్బు') || q.includes('చెల్లింపు') || q.includes('ఫీజు') ||
        q.includes('पैसा') || q.includes('भुगतान') || q.includes('फीस')
      ) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'dora',
            text: selectedLanguage === 'తెలుగు'
              ? 'Needora లో 100% ఆన్‌లైన్ పేమెంట్లు ఉండవు! స్థానిక వ్యాపారులకు ఉచితంగా ఎంక్వైరీలు పంపవచ్చు.'
              : selectedLanguage === 'हिंदी'
              ? 'Needora पर 100% मुफ्त इन्క్వాయరీ పద్ధతి! కస్టమర్ల నుండి ఎలాంటి పేమెంట్ తీసుకోము.'
              : 'Needora is 100% free of online payments! You submit free enquiries directly to local businesses.',
            link: '/services',
          },
        ]);
      } else if (
        q.includes('list') || q.includes('register') || q.includes('business') ||
        q.includes('నమోదు') || q.includes('షాప్') || q.includes('రజిస్టర్') ||
        q.includes('दुकान') || q.includes('लिस्ट')
      ) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'dora',
            text: selectedLanguage === 'తెలుగు'
              ? 'మీ దుకాణాన్ని Needora లో 2 నిమిషాల్లో ఉచితంగా నమోదు చేసుకోవచ్చు!'
              : selectedLanguage === 'हिंदी'
              ? 'अपनी दुकान को Needora पर 2 मिनट में बिल्कुल मुफ्त लिस्ट करें!'
              : 'You can list your business on Needora completely free in 2 minutes!',
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
              text: selectedLanguage === 'తెలుగు'
                ? 'మా వద్ద ధృవీకరించబడిన హోమ్ డెకర్, క్లీనింగ్, రిపేర్ సర్వీసులు అందుబాటులో ఉన్నాయి!'
                : selectedLanguage === 'हिंदी'
                ? 'हमारे पास सत्यापित होम डेकोर, क्लीनिंग और रिपेयर सेवाएं उपलब्ध हैं!'
                : 'You can explore all our verified local categories or ask me more specific questions!',
              link: '/categories',
            },
          ]);
        }
      }
    }, 450);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    processQuery(input);
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
                <div className="flex items-center gap-1 mt-0.5">
                  {(['English', 'తెలుగు', 'हिंदी'] as const).map(l => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleLanguageSwitch(l)}
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold transition-all ${
                        selectedLanguage === l
                          ? 'bg-white text-blue-900'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
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

          {/* Quick Input Form with Mic */}
          <form onSubmit={handleSend} className="p-2.5 border-t border-slate-100 bg-white flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleVoice}
              title={`Voice in ${selectedLanguage}`}
              className={`p-1.5 rounded-lg border transition-all ${
                isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                selectedLanguage === 'తెలుగు'
                  ? 'స్థానిక దుకాణాలు లేదా సర్వీసులు...'
                  : selectedLanguage === 'हिंदी'
                  ? 'स्थानीय दुकानें या सेवाएं...'
                  : 'Ask about local stores or services...'
              }
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
