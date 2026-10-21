'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import PopularServicesSection from '@/components/PopularServicesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import VideoReelsSection from '@/components/VideoReelsSection';
import FeaturedSection from '@/components/FeaturedSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BottomCtaSection from '@/components/BottomCtaSection';
import BookingModal from '@/components/BookingModal';
import VoiceSearchModal from '@/components/VoiceSearchModal';
import AuthModal from '@/components/AuthModal';
import { ServiceItem } from '@/types';
import { POPULAR_SERVICES } from '@/data/mockData';

export default function Home() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [voiceSearchOpen, setVoiceSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('All');
  const [recentEnquirySuccess, setRecentEnquirySuccess] = useState<string | null>(null);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleSearchSubmit = (query: string) => {
    // If a service matches, open booking or filter
    const found = POPULAR_SERVICES.find(s => 
      s.title.toLowerCase().includes(query.toLowerCase()) || 
      s.category.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setSelectedService(found);
    } else {
      // scroll to popular services
      const el = document.getElementById('popular-services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Toast notification for enquiry dispatched to merchant */}
      {recentEnquirySuccess && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <span>✓ Enquiry dispatched to merchant! Ref: {recentEnquirySuccess} (SMS & WhatsApp alert transmitted)</span>
          <button onClick={() => setRecentEnquirySuccess(null)} className="ml-2 font-bold text-emerald-200">✕</button>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenSearch={() => setVoiceSearchOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearchSubmit={handleSearchSubmit}
          onOpenVoiceSearch={() => setVoiceSearchOpen(true)}
        />

        {/* 12 Categories Grid matching reference */}
        <CategoriesSection
          onSelectCategory={(catName) => {
            setActiveFilterCategory(catName);
            const el = document.getElementById('popular-services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Popular Services matching reference */}
        <PopularServicesSection
          onSelectService={handleServiceSelect}
        />

        {/* Why Choose Needora + App Mockup matching reference */}
        <WhyChooseSection />

        {/* Video Stories & Merchant Reels for Blogs (with Upload Modal) */}
        <VideoReelsSection />

        {/* Featured on Needora + Stats row matching reference */}
        <FeaturedSection />

        {/* User Testimonials matching reference */}
        <TestimonialsSection />

        {/* Bottom CTA Banner & Footer matching reference */}
        <BottomCtaSection onOpenAuth={handleOpenAuth} />
      </main>

      {/* Modals & Interactive Overlays */}
      <BookingModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOrderPlaced={(order) => {
          setRecentEnquirySuccess(order.orderNumber);
        }}
      />

      <VoiceSearchModal
        isOpen={voiceSearchOpen}
        onClose={() => setVoiceSearchOpen(false)}
        onSelectResult={(query: string) => {
          handleSearchSubmit(query);
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(role) => {
          if (role === 'merchant') {
            window.location.href = '/merchant';
          }
        }}
      />
    </div>
  );
}
