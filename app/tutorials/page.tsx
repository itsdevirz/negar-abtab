'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCompany } from '@/lib/company-context';
import { VideoTutorial } from '@/lib/company-data';
import { getVideoBlob } from '@/lib/video-storage';
import {
  Play,
  Search,
  FileText,
  Clock,
  User,
  Eye,
  Filter,
  X,
  SlidersHorizontal,
  ChevronLeft,
  Share2,
  Check,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import { formatPersianDate } from '@/lib/utils';
import { FadeIn } from '@/components/ui/fade-in';
import { motion, AnimatePresence } from 'motion/react';

export default function TutorialsPage() {
  const { data } = useCompany();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoTutorial | null>(null);
  const [playingVideoSrc, setPlayingVideoSrc] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const playerSectionRef = useRef<HTMLDivElement>(null);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
        setPlayingVideoSrc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Resolve video blob from IndexedDB if uploaded locally
  useEffect(() => {
    let isCancelled = false;
    let objUrl: string | null = null;

    if (!activeVideo) {
      return;
    }

    getVideoBlob(activeVideo.id).then((blob) => {
      if (isCancelled) return;
      if (blob) {
        objUrl = URL.createObjectURL(blob);
        setPlayingVideoSrc(objUrl);
      } else if (activeVideo.videoUrl && activeVideo.videoUrl.trim() !== '') {
        setPlayingVideoSrc(activeVideo.videoUrl.trim());
      } else {
        setPlayingVideoSrc(null);
      }
    });

    return () => {
      isCancelled = true;
      if (objUrl) {
        URL.revokeObjectURL(objUrl);
      }
    };
  }, [activeVideo]);

  const categories = [
    { id: 'all', label: 'همه دوره‌ها و ویدئوها' },
    { id: 'automation', label: 'اتوماسیون صنعتی' },
    { id: 'scada', label: 'سیستم‌های اسکادا' },
    { id: 'iot', label: 'اینترنت اشیاء صنعتی (IIoT)' },
    { id: 'instrumentation', label: 'ابزار دقیق و کالیبراسیون' },
    { id: 'telemetry', label: 'تله‌متری و پایش' },
  ];

  const filteredVideos = useMemo(() => {
    return data.videos.filter((vid) => {
      const matchesCategory = selectedCategory === 'all' || vid.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        vid.title.toLowerCase().includes(q) ||
        vid.description.toLowerCase().includes(q) ||
        vid.captionText.toLowerCase().includes(q) ||
        vid.instructor.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [data.videos, selectedCategory, searchQuery]);

  const handleSelectVideo = (vid: VideoTutorial) => {
    setActiveVideo(vid);
    setPlayingVideoSrc(null);
    setTimeout(() => {
      playerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setPlayingVideoSrc(null);
  };

  const handleShare = () => {
    if (activeVideo) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-[#F6F5F3] py-16 border-b border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e8400d]">
              <Link href="/" className="hover:underline">
                صفحه اصلی
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#575655]">ویدئوهای آموزشی و کپشن‌ها</span>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111111] bg-white hover:bg-neutral-100 rounded-lg border border-[rgba(17,17,17,0.08)] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#e8400d]" />
              <span>پنل مدیریت و افزودن ویدئو</span>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
            مرکز آموزش، وبینارها و ویدئوهای تخصصی
          </h1>
          <p className="text-sm sm:text-base text-[#575655] max-w-3xl leading-relaxed">
            مجموعه کارگاه‌های ویدئویی مهندسی اتوماسیون، تله‌متری، اسکادا و ابزار دقیق همراه با کپشن‌ها و ترنسکریپت متنی کامل جهت استفاده کارشناسان و دانشجویان صنعت.
          </p>
        </FadeIn>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="p-4 sm:p-6 bg-white rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="جستجو در عنوان ویدئو، دسته‌بندی یا نام مدرس..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] focus:border-[#e8400d] rounded-xl focus:outline-hidden transition-colors"
              />
              <Search className="w-4 h-4 text-[#6D6C6B] absolute left-3 top-3 pointer-events-none" />
            </div>

            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 text-xs text-[#575655]">
              <span className="font-mono tabular-nums">
                تعداد ویدئوها: <strong>{filteredVideos.length}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#6D6C6B]">آموزش‌های کاربردی و استاندارد صنعتی</span>
            </div>
          </div>

          {/* Categories */}
          <div className="pt-2 border-t border-[rgba(17,17,17,0.06)] flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-3.5 h-3.5 text-[#6D6C6B] shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-2xs font-semibold'
                    : 'bg-[#F6F5F3] text-[#575655] hover:text-[#111111] hover:bg-[#eceae6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-[11px] text-[#e8400d] hover:underline flex items-center gap-1 mr-auto shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>حذف فیلترها</span>
              </button>
            )}
          </div>
        </FadeIn>
      </section>

      {/* ==============================================================
          ACTIVE VIDEO PLAYER SECTION (WITH PROMINENT CLOSE 'X' BUTTON)
      ============================================================== */}
      {activeVideo && (
        <section
          ref={playerSectionRef}
          id="active-video-player"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all scroll-mt-24"
        >
          <div className="bg-white rounded-3xl border-2 border-[#111111] shadow-2xl overflow-hidden ring-4 ring-[#e8400d]/10">
            {/* Top Bar of the Video Player Section */}
            <div className="p-4 sm:p-5 bg-[#111111] text-white flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#e8400d] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  <Play className="w-4 h-4 ml-0.5" />
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/20 text-[#FFEF99] font-medium">
                      {activeVideo.categoryLabel}
                    </span>
                    <span className="text-xs text-[#a6a5a2] font-mono">
                      مدت زمان: {activeVideo.duration}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                    {activeVideo.title}
                  </h2>
                </div>
              </div>

              {/* CRITICAL: PROMINENT CLOSE BUTTON */}
              <button
                onClick={handleCloseVideo}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 border border-red-500"
                title="بستن این ویدئو و بازگشت به فهرست"
              >
                <X className="w-5 h-5 stroke-[3]" />
                <span>بستن ویدئو (✕)</span>
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative bg-black aspect-video w-full flex items-center justify-center">
              {playingVideoSrc ? (
                <video
                  key={playingVideoSrc}
                  src={playingVideoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  مرورگر شما از پخش این ویدئو پشتیبانی نمی‌کند.
                </video>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-white/70 text-xs py-16">
                  <div className="w-8 h-8 border-2 border-[#D97706] border-t-transparent rounded-full animate-spin" />
                  <span>در حال بارگذاری و آماده‌سازی ویدئو...</span>
                </div>
              )}
            </div>

            {/* Video Info and Transcript / Caption */}
            <div className="p-6 sm:p-8 space-y-6 bg-[#F6F5F3]">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[rgba(17,17,17,0.08)] pb-4">
                <div className="flex items-center gap-3 text-xs text-[#575655] flex-wrap">
                  <span className="font-semibold text-[#111111]">مدرس: {activeVideo.instructor}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#111111]">
                    <Calendar className="w-3.5 h-3.5 text-[#e8400d]" />
                    <span>تاریخ انتشار: {formatPersianDate(activeVideo.createdAt)}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#575655] hover:text-[#111111] bg-white rounded-lg border border-[rgba(17,17,17,0.08)] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'لینک کپی شد' : 'اشتراک‌گذاری'}</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  شرح و سرفصل‌های کارگاه آموزشی:
                </h4>
                <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Videos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVideos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-2xl border border-[rgba(17,17,17,0.08)] overflow-hidden hover:border-[rgba(17,17,17,0.2)] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Video Preview Frame */}
                  <div
                    className="relative aspect-video w-full flex items-center justify-center cursor-pointer group overflow-hidden border-b border-[rgba(17,17,17,0.06)]"
                    style={{ backgroundColor: vid.accentColor || '#F6F5F3' }}
                    onClick={() => handleSelectVideo(vid)}
                  >
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          'radial-gradient(#111 1px, transparent 1px), radial-gradient(#111 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Big Play Button */}
                    <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-[#111111] group-hover:text-white text-[#111111] flex items-center justify-center transition-all shadow-md group-hover:scale-110 z-10">
                      <Play className="w-6 h-6 ml-1" />
                    </div>

                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 text-white text-[11px] font-mono">
                        {vid.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/75 text-white text-xs font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span dir="ltr">{vid.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#6D6C6B] flex-wrap">
                      <span className="flex items-center gap-1 font-medium text-[#111111]">
                        <User className="w-3.5 h-3.5" />
                        {vid.instructor}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#575655]">
                        <Calendar className="w-3 h-3 text-[#6D6C6B]" />
                        <span>{formatPersianDate(vid.createdAt)}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Eye className="w-3.5 h-3.5" />
                        {vid.viewsCount} بازدید
                      </span>
                    </div>

                    <h3
                      onClick={() => handleSelectVideo(vid)}
                      className="text-base sm:text-lg font-bold text-[#111111] hover:text-[#e8400d] cursor-pointer transition-colors leading-snug"
                    >
                      {vid.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#575655] leading-relaxed line-clamp-3">
                      {vid.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[rgba(17,17,17,0.06)]">
                  <button
                    onClick={() => handleSelectVideo(vid)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e8400d] hover:text-[#b83008] transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>پخش و مشاهده ویدئو</span>
                  </button>

                  <span className="text-[11px] font-mono text-[#6D6C6B]">
                    {vid.categoryLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-4 bg-[#F6F5F3] rounded-3xl border border-[rgba(17,17,17,0.06)]">
            <p className="text-sm font-semibold text-[#111111]">
              هیچ ویدئوی آموزشی مطابق با جستجوی شما یافت نشد.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#111111] rounded-lg hover:bg-[#272625] transition-colors"
            >
              نمایش همه ویدئوها
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
