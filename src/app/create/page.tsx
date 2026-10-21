'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Video, 
  Sparkles, 
  Store, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { saveVideo, savePost, getCurrentUser } from '@/lib/storage';
import { CATEGORIES } from '@/data/mockData';

export default function CreateHubPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'video' | 'post'>('video');
  const [currentUser] = useState(getCurrentUser());

  // Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCaption, setVideoCaption] = useState('');
  const [videoMerchantName, setVideoMerchantName] = useState(currentUser?.name || '');
  const [videoCategory, setVideoCategory] = useState(CATEGORIES[0]?.name || 'Home Decor');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoError, setVideoError] = useState('');
  const [videoSuccess, setVideoSuccess] = useState(false);

  // Post Form State
  const [postBusinessName, setPostBusinessName] = useState(currentUser?.name || '');
  const [postAuthorName, setPostAuthorName] = useState(currentUser?.name || '');
  const [postContent, setPostContent] = useState('');
  const [postImagePreview, setPostImagePreview] = useState<string | null>(null);
  const [postError, setPostError] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Handle Video File Selection
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setVideoError('Please choose a valid video file (MP4, WebM, MOV).');
      return;
    }

    setVideoError('');
    setVideoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setVideoPreview(objectUrl);
  };

  // Handle Image File Selection for Post
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPostError('Please choose an image file (JPG, PNG, WebP).');
      return;
    }

    setPostError('');
    const reader = new FileReader();
    reader.onload = () => {
      setPostImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Submit Video
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) {
      setVideoError('Please enter a title for your video.');
      return;
    }
    if (!videoMerchantName.trim()) {
      setVideoError('Please enter your merchant or shop name.');
      return;
    }
    if (!videoPreview) {
      setVideoError('Please select a video file to upload.');
      return;
    }

    saveVideo({
      title: videoTitle.trim(),
      caption: videoCaption.trim(),
      videoUrl: videoPreview,
      merchantId: currentUser?.businessId || 'BIZ-GUEST',
      merchantName: videoMerchantName.trim(),
      category: videoCategory,
    });

    setVideoSuccess(true);
    setTimeout(() => {
      router.push('/videos');
    }, 1200);
  };

  // Submit Post
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postBusinessName.trim()) {
      setPostError('Please enter your business name.');
      return;
    }
    if (!postContent.trim()) {
      setPostError('Please write some content or an announcement.');
      return;
    }

    savePost({
      businessId: currentUser?.businessId || 'BIZ-GUEST',
      businessName: postBusinessName.trim(),
      authorName: postAuthorName.trim() || 'Store Owner',
      content: postContent.trim(),
      imageUrl: postImagePreview || undefined,
    });

    setPostSuccess(true);
    setTimeout(() => {
      router.push('/explore');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/explore" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Publish & Upload</span>
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Needora Creator & Merchant Studio
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Publish real promotional videos or local business announcements for free. Zero transaction fees.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'video'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Upload Video Reel</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('post')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'post'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish Store Update</span>
          </button>

          <Link
            href="/listing"
            className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>List New Business →</span>
          </Link>
        </div>

        {/* TAB 1: UPLOAD VIDEO */}
        {activeTab === 'video' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {videoSuccess ? (
              <div className="py-12 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">Video Uploaded Successfully!</h2>
                <p className="text-xs text-slate-500">Redirecting to Needora Video Reels player...</p>
              </div>
            ) : (
              <form onSubmit={handleVideoSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Upload Merchant Showcase Video</h2>
                  <p className="text-xs text-slate-500">
                    Upload vertical MP4/WebM videos displaying products, customer work, or store walk-throughs.
                  </p>
                </div>

                {videoError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{videoError}</span>
                  </div>
                )}

                {/* Video File Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Video File <span className="text-rose-500">*</span>
                  </label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/30">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoSelect}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-bold text-slate-800">
                      {videoFile ? videoFile.name : 'Click to select video file'}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">MP4, WebM, MOV up to 100MB</span>
                  </label>
                </div>

                {videoPreview && (
                  <div className="rounded-2xl overflow-hidden max-w-xs mx-auto border border-slate-200 bg-black aspect-[9/16]">
                    <video src={videoPreview} controls className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business / Merchant Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={videoMerchantName}
                      onChange={(e) => setVideoMerchantName(e.target.value)}
                      placeholder="e.g. Royal Sweets & Bakers"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Video Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. Festive Special Indian Sweets Preparation"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Caption / Description
                  </label>
                  <textarea
                    rows={3}
                    value={videoCaption}
                    onChange={(e) => setVideoCaption(e.target.value)}
                    placeholder="Describe your work, store address, or special service details..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition-all"
                >
                  Publish Video to Needora Reels
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: PUBLISH POST */}
        {activeTab === 'post' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {postSuccess ? (
              <div className="py-12 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">Update Published Successfully!</h2>
                <p className="text-xs text-slate-500">Redirecting to Needora Community Feed...</p>
              </div>
            ) : (
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Publish Local Store Announcement</h2>
                  <p className="text-xs text-slate-500">
                    Post seasonal updates, holiday hours, new stock arrivals, or service availability.
                  </p>
                </div>

                {postError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{postError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={postBusinessName}
                      onChange={(e) => setPostBusinessName(e.target.value)}
                      placeholder="e.g. Apex Electricals"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Author Name / Designation
                    </label>
                    <input
                      type="text"
                      value={postAuthorName}
                      onChange={(e) => setPostAuthorName(e.target.value)}
                      placeholder="e.g. Ramesh (Proprietor)"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Announcement / Post Content <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write your announcement or store offer here..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Attach Image (Optional)
                  </label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <ImageIcon className="w-6 h-6 text-indigo-600 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">Click to choose store photo</span>
                  </label>
                </div>

                {postImagePreview && (
                  <div className="rounded-xl overflow-hidden max-h-60 border border-slate-200">
                    <img src={postImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-all"
                >
                  Publish Announcement
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
