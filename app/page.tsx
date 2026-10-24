'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCompany } from '@/lib/company-context';
import { ProjectCard } from '@/components/ProjectCard';
import { Timeline } from '@/components/ui/timeline';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/ui/fade-in';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpLeft,
  ArrowLeft,
  ChevronLeft,
  ShieldCheck,
  Cpu,
  Layers,
  Clock,
  Zap,
  FileText,
  Activity,
  Radio,
  SlidersHorizontal,
  CheckCircle2,
  Building2,
  Boxes,
  Compass,
  Rocket,
  Scale,
  Headphones,
  LineChart,
  Workflow,
} from 'lucide-react';

export default function HomePage() {
  const { data, setIsCustomizerOpen } = useCompany();
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('all');
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);

  // Filter projects for the featured section
  const filteredProjects =
    activeProjectFilter === 'all'
      ? data.projects.slice(0, 3)
      : data.projects.filter((p) => p.category === activeProjectFilter).slice(0, 3);

  // Helper icon map for differentiators
  const getDifferentiatorIcon = (key: string) => {
    switch (key) {
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#111111]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#111111]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#111111]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#111111]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#111111]" />;
      default:
        return <Zap className="w-5 h-5 text-[#111111]" />;
    }
  };

  const workflowPillars = [
    {
      id: 'scalability',
      title: 'مقیاس‌پذیری بالا و معماری تاب‌آور',
      shortTitle: 'مقیاس‌پذیری بالا',
      icon: Scale,
      color: '#FFD7F0',
      badge: '+۱۰,۰۰۰ گره داده',
      tagline: 'معماری ماژولار با پذیرش آنی صدها ایستگاه تله‌متری بدون افت کارایی',
      metric1: { label: 'ظرفیت سنسورها', value: 'Edge-to-Cloud نامحدود' },
      metric2: { label: 'تأخیر پردازش', value: '< ۵ میلی‌ثانیه' },
      points: [
        'معماری ماژولار توزیع‌شده با قابلیت افزایش خطوط و گره‌ها بدون توقف سیستم',
        'سازگاری چندپروتکلی (Modbus, Profinet, OPC-UA, MQTT, DNP3)',
        'پردازش لبه (Edge Computing) برای تضمین کارکرد پیوسته در قطعی موقت شبکه',
      ],
    },
    {
      id: 'speed',
      title: 'توسعه و استقرار سریع',
      shortTitle: 'توسعه سریع',
      icon: Rocket,
      color: '#FFEF99',
      badge: '۴۰٪ کاهش دوره پروژه',
      tagline: 'تحویل چابک پروژه‌ها با مهندسی همزمان و آزمون شبیه‌سازی پیشرفته',
      metric1: { label: 'آزمون شبیه‌سازی', value: '۱۰۰٪ دیجیتال‌توئین' },
      metric2: { label: 'سرعت راه‌اندازی', value: '۳ برابر سریع‌تر' },
      points: [
        'شبیه‌سازی کامل منطق کنترل (Software-in-the-Loop) پیش از اجرا در سایت',
        'کتابخانه‌های استاندارد و تست‌شده PLC و HMI مطابق استاندارد IEC 61131-3',
        'کاهش حداکثری زمان توقف خطوط تولید کارفرما در روز راه‌اندازی',
      ],
    },
    {
      id: 'support',
      title: 'پشتیبانی کامل و در دسترس',
      shortTitle: 'پشتیبانی کامل',
      icon: Headphones,
      color: '#B7EFB2',
      badge: '۲۴/۷ SLA تضمینی',
      tagline: 'دسترسی مستقیم به تیم مهندسی طراح پروژه و عیب‌یابی آنی ریموت و حضوری',
      metric1: { label: 'زمان واکنش اضطراری', value: '< ۱۵ دقیقه' },
      metric2: { label: 'پایداری عملیاتی', value: '۹۹.۹۸٪ تضمینی' },
      points: [
        'کانال مستقیم ارتباطی با کارشناسان ارشد اتوماسیون در تمام ساعات شبانه‌روز',
        'عیب‌یابی از راه دور امن (Secure Remote Diagnostics) با پروتکل‌های رمزنگاری‌شده',
        'تأمین فوری قطعات استاندارد، اعزام تیم به سایت و برگزاری دوره‌های آموزشی اپراتوری',
      ],
    },
    {
      id: 'monitoring',
      title: 'تحلیل داده و مانیتورینگ زنده',
      shortTitle: 'تحلیل و مانیتورینگ',
      icon: LineChart,
      color: '#E8F0FE',
      badge: 'داده‌محور و لحظه‌ای',
      tagline: 'داشبوردهای هوشمند ارگونومیک، تحلیل روندهای فرآیندی و پیشگیری از خرابی',
      metric1: { label: 'نرخ بروزرسانی داده', value: 'بلادرنگ (Real-Time)' },
      metric2: { label: 'کشف ناهنجاری', value: '۹۹.۴٪ پیشگیرانه' },
      points: [
        'رابط‌های کاربری صنعتی ارگونومیک منطبق با استاندارد بین‌المللی ISA-101',
        'الگوریتم‌های کشف ناهنجاری پیشگیرانه برای جلوگیری از آسیب به ماشین‌آلات حساس',
        'ثبت رویدادها، آرشیو داده‌های تاریخی و گزارش‌گیری خودکار برای مدیران ارشد',
      ],
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* =========================================================================
          SECTION 1: HERO
      ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left/Main Col: Typographic Statement */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet kicker text (Anti-slop: unboxed clean text) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#e8400d]">
                <span>فناوری، هوشمندسازی و سیستم‌های جامع مهندسی</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#575655]">رسمی و معتبر</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#111111] leading-[1.2] tracking-tight">
                {data.profile.heroHeadline}
                <span className="block text-xl sm:text-2xl md:text-3xl font-medium text-[#575655] mt-2">
                  {data.profile.heroSubheadline}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#575655] leading-relaxed max-w-2xl">
                {data.profile.heroDescription}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#111111] hover:bg-[#272625] active:bg-black rounded-xl transition-colors shadow-xs"
                >
                  <span>مشاهده پروژه‌ها و نمونه‌کارها</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-[#111111] bg-[#F6F5F3] hover:bg-[#eae8e4] rounded-xl transition-colors border border-[rgba(17,17,17,0.08)]"
                >
                  <span>آشنایی با شرکت</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-4 border-t border-[rgba(17,17,17,0.06)] flex items-center gap-6 text-xs text-[#575655] flex-wrap">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  استانداردهای ایمنی صنعتی
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  سیستم‌های کنترل زمان‌واقعی
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  تله‌متری پایدار و مقیاس‌پذیر
                </span>
              </div>
            </div>

            {/* Right Col: How We Work & Engineering Methodology Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] p-5 sm:p-6 space-y-5 overflow-hidden shadow-xs">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-[rgba(17,17,17,0.06)] pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#111111]">
                      نحوه کار و رویکرد مهندسی ما
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#6D6C6B] bg-white px-2 py-0.5 rounded-md border border-[rgba(17,17,17,0.06)]">
                    AGILE · EPC · 24/7
                  </span>
                </div>

                {/* 4 Interactive Switcher Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-white/80 rounded-xl border border-[rgba(17,17,17,0.06)]">
                  {workflowPillars.map((pillar, idx) => {
                    const isActive = activePillarIndex === idx;
                    const Icon = pillar.icon;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => setActivePillarIndex(idx)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-[11px] font-bold transition-all ${
                          isActive
                            ? 'bg-[#111111] text-white shadow-xs'
                            : 'text-[#575655] hover:text-[#111111] hover:bg-black/5'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#575655]'}`} />
                        <span className="truncate">{pillar.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Pillar Showcase Card */}
                {(() => {
                  const current = workflowPillars[activePillarIndex];
                  const CurrentIcon = current.icon;
                  return (
                    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[rgba(17,17,17,0.08)] space-y-4 shadow-2xs">
                      {/* Active Pillar Title & Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-2xs"
                            style={{ backgroundColor: current.color }}
                          >
                            <CurrentIcon className="w-5 h-5 text-[#111111]" />
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#111111]">
                              {current.title}
                            </h3>
                            <p className="text-[11px] text-[#6D6C6B] mt-0.5 leading-snug">
                              {current.tagline}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full shrink-0">
                          {current.badge}
                        </span>
                      </div>

                      {/* 2 Key Quantitative Metrics */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="bg-[#FAF9F7] rounded-xl p-2.5 border border-[rgba(17,17,17,0.05)]">
                          <span className="block text-[10px] text-[#6D6C6B] font-medium">
                            {current.metric1.label}
                          </span>
                          <span className="block text-xs font-bold font-mono text-[#111111] mt-0.5">
                            {current.metric1.value}
                          </span>
                        </div>
                        <div className="bg-[#FAF9F7] rounded-xl p-2.5 border border-[rgba(17,17,17,0.05)]">
                          <span className="block text-[10px] text-[#6D6C6B] font-medium">
                            {current.metric2.label}
                          </span>
                          <span className="block text-xs font-bold font-mono text-[#111111] mt-0.5">
                            {current.metric2.value}
                          </span>
                        </div>
                      </div>

                      {/* Concrete Process Execution Points */}
                      <div className="space-y-2 pt-1 border-t border-[rgba(17,17,17,0.05)]">
                        {current.points.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-[11px] text-[#333333] leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Quick Pillar Status Micro-Strip */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-[#6D6C6B] flex items-center justify-between px-1">
                    <span>ستون‌های عملیاتی چرخه پروژه:</span>
                    <span className="text-[10px] text-[#8C8B8A]">کلیک برای مشاهده جزئیات</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {workflowPillars.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePillarIndex(idx)}
                        className={`text-right p-2 rounded-xl border text-[10px] transition-all flex items-center justify-between ${
                          activePillarIndex === idx
                            ? 'bg-white border-[#111111] text-[#111111] font-bold shadow-2xs'
                            : 'bg-white/60 border-[rgba(17,17,17,0.06)] text-[#6D6C6B] hover:bg-white hover:text-[#111111]'
                        }`}
                      >
                        <span className="truncate">{p.shortTitle}</span>
                        <span
                          className="w-2 h-2 rounded-full shrink-0 mr-1.5"
                          style={{ backgroundColor: p.color }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust & Action Strip */}
                <div className="pt-2 border-t border-[rgba(17,17,17,0.06)] flex items-center justify-between text-[11px] text-[#575655]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    تضمین پایداری ۹۹.۹۸٪ خطوط صنعتی
                  </span>
                  <button
                    onClick={() => setIsCustomizerOpen(true)}
                    className="text-[#e8400d] hover:underline flex items-center gap-1 font-medium transition-colors"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>شخصی‌سازی مقادیر</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 2: SHORT INTRO
      ========================================================================= */}
      <section className="bg-[#F6F5F3] py-16 border-y border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold text-[#e8400d] tracking-wider uppercase">
                درباره نگار آبتاب آبانگاه
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] leading-snug">
                مهندسی دقیق، اجرای اصولی و راهکارهای پایدار
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#575655] leading-relaxed">
              <p>{data.profile.aboutIntro}</p>
              <p>
                ما در این شرکت بر این باوریم که سامانه‌های اتوماسیون و پایش هوشمند، شریان حیاتی بهره‌وری در صنایع امروز هستند. تلفیق تجربه عملیاتی با استانداردهای مدرن جهانی، تضمین‌کننده امنیت و بازدهی سرمایه‌گذاری پروژه‌های کارفرمایان ماست.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#e8400d] transition-colors group"
                >
                  <span>مطالعه بیشتر درباره پیشینه و خط‌مشی شرکت</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 3: STATS & INDICATORS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(17,17,17,0.08)] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[rgba(17,17,17,0.06)] gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111]">
                شاخص‌های بنیادین عملکرد و ظرفیت اجرایی
              </h3>
              <p className="text-xs text-[#575655] mt-0.5">
                برآورد مستند ظرفیت‌های فنی و تجارب مهندسی شرکت
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                آمار و ظرفیت‌های تاییدشده رسمی
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.years}
              </span>
              <span className="text-xs text-[#575655] block font-medium">سال سابقه تخصصی</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.projects}
              </span>
              <span className="text-xs text-[#575655] block font-medium">پروژه پیاده‌سازی‌شده</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.clients}
              </span>
              <span className="text-xs text-[#575655] block font-medium">کارفرما و همکار صنعتی</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111]" dir="ltr">
                {data.profile.stats.domains}
              </span>
              <span className="text-xs text-[#575655] block font-medium">دپارتمان تخصصی</span>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.engineers}
              </span>
              <span className="text-xs text-[#575655] block font-medium">کارشناس و مهندس ارشد</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 4: SERVICES & SPECIALIZATIONS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeIn className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#e8400d] tracking-wider uppercase">
              حوزه‌های خدمات مهندسی
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
              خدمات تخصصی و توانمندی‌های فناورانه
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#e8400d] transition-colors"
          >
            <span>مشاهده ماتریس تفصیلی کلیه خدمات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((service, index) => (
            <div
              key={service.id}
              className="rounded-2xl bg-white border border-[rgba(17,17,17,0.08)] p-6 sm:p-8 flex flex-col justify-between hover:border-[rgba(17,17,17,0.2)] transition-all hover:shadow-sm space-y-6"
            >
              <div className="space-y-4">
                {/* Header with human editorial numbering */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#6D6C6B]">
                    {(index + 1).toString().padStart(2, '۰')}.
                  </span>
                  <div
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: service.accentColor }}
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Features (Zero pill: unboxed items with check) */}
                <ul className="space-y-2 pt-2 text-xs text-[#272625]">
                  {service.features.slice(0, 3).map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8400d] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[rgba(17,17,17,0.06)] flex items-center justify-between">
                <Link
                  href={`/services#${service.id}`}
                  className="text-xs font-semibold text-[#111111] hover:text-[#e8400d] flex items-center gap-1.5 transition-colors"
                >
                  <span>شرح مراحل اجرا و نیازمندی‌ها</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURED PROJECTS WITH CATEGORY FILTER
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeIn className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#e8400d] tracking-wider uppercase">
              پروژه‌ها و نمونه‌کارها
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
              گزیده‌ای از پروژه‌های شاخص مهندسی
            </h2>
          </div>

          {/* Interactive Filter Controls (Functional buttons with active states) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] overflow-x-auto">
            <button
              onClick={() => setActiveProjectFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeProjectFilter === 'all'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#575655] hover:text-[#111111]'
              }`}
            >
              همه پروژه‌ها
            </button>
            <button
              onClick={() => setActiveProjectFilter('telemetry')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeProjectFilter === 'telemetry'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#575655] hover:text-[#111111]'
              }`}
            >
              تله‌متری و پایش
            </button>
            <button
              onClick={() => setActiveProjectFilter('automation')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeProjectFilter === 'automation'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#575655] hover:text-[#111111]'
              }`}
            >
              اتوماسیون صنعتی
            </button>
            <button
              onClick={() => setActiveProjectFilter('monitoring')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeProjectFilter === 'monitoring'
                  ? 'bg-white text-[#111111] shadow-2xs font-semibold'
                  : 'text-[#575655] hover:text-[#111111]'
              }`}
            >
              مدیریت انرژی
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-[#111111] bg-[#F6F5F3] hover:bg-[#eae8e4] rounded-xl transition-colors border border-[rgba(17,17,17,0.08)]"
          >
            <span>مشاهده کلیه پروژه‌ها در صفحه اختصاصی</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 6: WHY NEGAR ABTAB ABANGAH?
      ========================================================================= */}
      <section className="bg-[#F6F5F3] py-16 border-y border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#e8400d] tracking-wider uppercase">
              ارزش‌های تمایزآفرین
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
              چرا نگار آبتاب آبانگاه؟
            </h2>
            <p className="text-xs sm:text-sm text-[#575655]">
              معیارهای بنیادینی که ما را به همراهی قابل اعتماد در پروژه‌های پیچیده مهندسی تبدیل می‌کنند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.differentiators.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[rgba(17,17,17,0.08)] space-y-3 shadow-2xs hover:border-[rgba(17,17,17,0.2)] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F6F5F3] flex items-center justify-center">
                  {getDifferentiatorIcon(item.iconKey)}
                </div>
                <h3 className="text-base font-bold text-[#111111]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 7: GROWTH TIMELINE
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeIn className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#e8400d] tracking-wider uppercase">
              مسیر پیشرفت
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
              سوابق و نقاط عطف سازمانی
            </h2>
          </div>
          <Link
            href="/records"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#e8400d] transition-colors"
          >
            <span>مشاهده صفحه کامل سوابق و افتخارات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <Timeline items={data.milestones} />
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 8: CLIENTS & PARTNER SECTORS
      ========================================================================= */}
      <section className="bg-[#F6F5F3] py-14 border-y border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="space-y-1 max-w-xl mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-[#111111]">
              بخش‌ها و صنایع هدف خدمات شرکت
            </h3>
            <p className="text-xs text-[#575655]">
              صنایع و سازمان‌هایی که راهکارهای هوشمندسازی نگار آبتاب آبانگاه در آن‌ها پیاده‌سازی می‌گردد.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#111111]">
              <Building2 className="w-4 h-4 text-[#e8400d]" />
              <span>شرکت‌های آب و فاضلاب منطقه‌ای</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#111111]">
              <Boxes className="w-4 h-4 text-[#e8400d]" />
              <span>مجتمع‌های پتروشیمی و پالایشگاهی</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#111111]">
              <Cpu className="w-4 h-4 text-[#e8400d]" />
              <span>صنایع فولاد و تولید سنگین</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#111111]">
              <Compass className="w-4 h-4 text-[#e8400d]" />
              <span>پیمانکاران عمومی طرح‌های EPC</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 9: TESTIMONIALS & TRANSPARENCY
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <FadeIn className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(17,17,17,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[#e8400d] uppercase">اصول اخلاق حرفه‌ای</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
              تعهد به رضایت کارفرما و محرمانگی داده‌ها
            </h3>
            <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
              شرکت نگار آبتاب آبانگاه با تکیه بر اصول اخلاق مهندسی، از انتشار اسناد و اطلاعات محرمانه پروژه‌های کارفرمایان بدون اخذ مجوز کتبی خودداری می‌نماید. برای دریافت مراجع رسمی همکاری و رضایت‌نامه‌های قبلی می‌توانید با دبیرخانه شرکت مکاتبه فرمایید.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#111111] bg-[#F6F5F3] hover:bg-[#eae8e4] rounded-xl transition-colors border border-[rgba(17,17,17,0.08)] whitespace-nowrap shrink-0"
          >
            <span>استعلام سوابق و رضایت‌نامه‌ها</span>
            <ArrowUpLeft className="w-4 h-4" />
          </Link>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 10: COLLABORATION CTA
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="relative rounded-3xl bg-[#272625] text-white p-8 sm:p-14 overflow-hidden border border-[#3a3937] space-y-6 text-center sm:text-right">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8400d]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-mono tracking-wider text-[#FFEF99] uppercase">
              شروع تعامل حرفه‌ای
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white">
              آینده همکاری‌های ارزشمند از یک گفت‌وگو آغاز می‌شود.
            </h2>
            <p className="text-xs sm:text-sm text-[#c5c4c1] leading-relaxed">
              برای آشنایی بیشتر با توانمندی‌های نگار آبتاب آبانگاه یا بررسی فرصت‌های همکاری در پروژه‌های اتوماسیون و پایش هوشمند، کارشناسان ما آماده پاسخگویی هستند.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#e8400d] hover:bg-[#d0380a] active:bg-[#b83008] rounded-xl transition-colors shadow-sm"
            >
              <span>درخواست جلسه مشاوره و همکاری</span>
              <ArrowUpLeft className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${data.profile.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/15 rounded-xl transition-colors border border-white/10"
              dir="ltr"
            >
              <span className="font-mono">{data.profile.phone}</span>
              <span className="text-xs">تماس مستقیم</span>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION: TECHNICAL VIDEO WORKSHOPS & TUTORIALS
      ========================================================================= */}
      <section className="bg-[#F6F5F3] py-16 border-y border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#e8400d] tracking-wider uppercase">
                کارگاه‌های ویدئویی و آموزش‌های تخصصی
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
                ویدئوهای کاربردی مهندسی و آموزش‌های تخصصی
              </h2>
            </div>
            <Link
              href="/tutorials"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#e8400d] transition-colors"
            >
              <span>مشاهده همه آموزش‌های ویدئویی</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.videos.slice(0, 2).map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-2xl border border-[rgba(17,17,17,0.08)] p-6 space-y-4 hover:border-[rgba(17,17,17,0.2)] transition-all hover:shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#6D6C6B]">
                    <span className="font-semibold text-[#e8400d]">{vid.categoryLabel}</span>
                    <span className="font-mono">مدت: {vid.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#111111] leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-[#575655] leading-relaxed line-clamp-3">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[rgba(17,17,17,0.06)] flex items-center justify-between text-xs font-semibold text-[#111111]">
                  <span>مدرس: {vid.instructor}</span>
                  <Link
                    href="/tutorials"
                    className="inline-flex items-center gap-1 text-[#e8400d] hover:underline"
                  >
                    <span>مشاهده و پخش ویدئو</span>
                    <ArrowUpLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          SECTION 11: LATEST NEWS & TECHNICAL REPORTS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeIn className="space-y-8">
          <div className="space-y-2">
          <span className="text-xs font-bold text-[#e8400d] tracking-wider uppercase">
            دانش و تجارب فنی
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
            آخرین مقالات و گزارش‌های تحلیلی
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.newsArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-[rgba(17,17,17,0.08)] p-6 flex flex-col justify-between hover:border-[rgba(17,17,17,0.2)] transition-all hover:shadow-xs space-y-4"
            >
              <div className="space-y-3">
                {/* Meta without pills */}
                <div className="flex items-center gap-2 text-xs text-[#6D6C6B]">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-[#111111] leading-snug hover:text-[#e8400d] transition-colors cursor-pointer">
                  {article.title}
                </h3>

                <p className="text-xs text-[#575655] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(17,17,17,0.06)] flex items-center justify-between text-xs font-semibold text-[#111111] hover:text-[#e8400d] cursor-pointer">
                <span>مطالعه کامل مقاله</span>
                <ArrowUpLeft className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>
        </FadeIn>
      </section>
    </div>
  );
}
