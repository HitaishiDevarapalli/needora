'use client';

import React, { useState } from 'react';
import { X, Mic, Volume2, Globe, ArrowRight, Search, CheckCircle2 } from 'lucide-react';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (query: string) => void;
}

export default function VoiceSearchModal({ isOpen, onClose, onSelectResult }: VoiceSearchModalProps) {
  if (!isOpen) return null;

  const [language, setLanguage] = useState<'Telugu' | 'Hindi' | 'English'>('Telugu');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('నాకు దగ్గరలో మంచి స్వీట్స్ షాప్ కావాలి');
  const [detectedIntent, setDetectedIntent] = useState('Category: Food & Dining • Query: Fresh Sweets Shop');

  const samplePrompts = {
    Telugu: [
      { text: 'నాకు దగ్గరలో మంచి స్వీట్స్ షాప్ కావాలి', intent: 'Category: Food & Dining • Query: Fresh Sweets Shop' },
      { text: 'ఇంట్లో డీప్ క్లీనింగ్ సర్వీస్ కావాలి', intent: 'Category: Home Services • Query: Deep House Cleaning' },
      { text: 'తాజా కూరగాయలు డెలివరీ చేయండి', intent: 'Category: Shopping • Query: Fresh Vegetables' },
    ],
    Hindi: [
      { text: 'घर की डीप क्लीनिंग के लिए सर्विस चाहिए', intent: 'Category: Home Services • Query: Deep Home Cleaning' },
      { text: 'पास में सबसे अच्छी मिठाई की दुकान कौन सी है?', intent: 'Category: Food & Dining • Query: Best Sweets Shop' },
      { text: 'गाड़ी की वाशिंग और सर्विसिंग बुक करें', intent: 'Category: Automotive • Query: Car Wash & Servicing' },
    ],
    English: [
      { text: 'Find reliable AC repair technicians nearby', intent: 'Category: Home Services • Query: AC Servicing & Repair' },
      { text: 'Looking for organic grocery delivery today', intent: 'Category: Shopping • Query: Organic Groceries' },
      { text: 'Book salon appointment for hair treatment', intent: 'Category: Beauty & Wellness • Query: Salon & Hair Spa' },
    ]
  };

  const handleLanguageChange = (lang: 'Telugu' | 'Hindi' | 'English') => {
    setLanguage(lang);
    setTranscript(samplePrompts[lang][0].text);
    setDetectedIntent(samplePrompts[lang][0].intent);
  };

  const toggleListen = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Vernacular Voice Search</h3>
              <p className="text-xs text-slate-500">Speak naturally in your preferred language</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Language Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">Select Voice Language</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Telugu', 'Hindi', 'English'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    language === lang
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lang === 'Telugu' ? 'తెలుగు (Telugu)' : lang === 'Hindi' ? 'हिंदी (Hindi)' : 'English'}
                </button>
              ))}
            </div>
          </div>

          {/* Microphone Wave Animation Area */}
          <div className="flex flex-col items-center justify-center py-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <button
              type="button"
              onClick={toggleListen}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-100'
                  : 'bg-blue-600 hover:bg-blue-700 text-white ring-4 ring-blue-50'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <span className="text-xs font-semibold text-slate-700 mt-4">
              {isListening ? 'Listening... Speak now' : 'Tap microphone to speak'}
            </span>
          </div>

          {/* Real-time Transcription box */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Detected Speech</span>
              <span className="text-emerald-600 font-medium">Ready</span>
            </div>
            <textarea
              rows={2}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full text-sm font-medium text-slate-800 bg-transparent resize-none focus:outline-none"
            />
            {detectedIntent && (
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{detectedIntent}</span>
              </div>
            )}
          </div>

          {/* Quick Vernacular Phrases to try */}
          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-2">Or try these common queries:</span>
            <div className="space-y-1.5">
              {samplePrompts[language].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(prompt.text);
                    setDetectedIntent(prompt.intent);
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-xs text-slate-700 transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{prompt.text}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={() => {
              onSelectResult(transcript);
              onClose();
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Marketplace with this Query</span>
          </button>

        </div>
      </div>
    </div>
  );
}
