'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompany } from '@/lib/company-context';
import {
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Award,
  ArrowUpLeft,
  Briefcase,
  Layers,
  ChevronLeft,
} from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

export default function AboutPage() {
  const { data } = useCompany();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-[#F6F5F3] py-16 border-b border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#e8400d]">
            <Link href="/" className="hover:underline">
              صفحه اصلی
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#575655]">درباره شرکت</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
            درباره نگار آبتاب آبانگاه
          </h1>
          <p className="text-sm sm:text-base text-[#575655] max-w-3xl leading-relaxed">
            پیشینه، خط‌مشی مهندسی، ارزش‌های بنیادین و چشم‌انداز توسعه در طراحی و استقرار سیستم‌های هوشمند کنترل، اتوماسیون و پایش تأسیساتی.
          </p>
        </FadeIn>
      </section>

      {/* Main Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] space-y-5">
              <div className="flex items-center gap-3.5 pb-4 border-b border-[rgba(17,17,17,0.08)]">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white p-1.5 shadow-2xs border border-[rgba(17,17,17,0.08)] shrink-0">
                  <Image
                    src="/assets/aistudio/file_00000000c9e481f4872f5bd5f71094a4_1__c7980156.png"
                    alt={data.profile.companyName}
                    width={64}
                    height={64}
                    priority
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#e8400d] uppercase tracking-wide block">
                    نشان رسمی و هویت بصری
                  </span>
                  <span className="text-base font-bold text-[#111111] block">
                    {data.profile.companyName}
                  </span>
                  <span className="text-[11px] text-[#6D6C6B]">
                    گزارشگری · شفافیت · پاسخگویی
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#111111]">
                تلفیق دانش فرآیند، سخت‌افزار صنعتی و نرم‌افزار زمان‌واقعی
              </h3>
              <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                شرکت نگار آبتاب آبانگاه با تکیه بر تجارب انباشته در حوزه‌های اتوماسیون، تله‌متری و ابزار دقیق، توانسته است پروژه‌های متعددی را در بخش‌های زیرساختی و صنایع کشور به سرانجام برساند.
              </p>
              <div className="pt-2 border-t border-[rgba(17,17,17,0.06)] text-xs text-[#111111] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#575655]">نام رسمی ثبتی:</span>
                  <span className="font-semibold">{data.profile.companyName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#575655]">زمینه تخصصی:</span>
                  <span className="font-semibold">فناوری و هوشمندسازی جامع مهندسی</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#575655] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#111111]">
              تاریخچه و مسیر شکل‌گیری
            </h2>
            <p>
              پیدایش شرکت نگار آبتاب آبانگاه در پاسخ به نیازی ملموس در صنایع تأسیساتی شکل گرفت: شکاف میان تجهیزات مکانیکی/هیدرولیکی موجود در سایت‌ها و فقدان سامانه‌های پایش برخط و کنترل هوشمند جهت جلوگیری از هدررفت منابع و استهلاک تجهیزات.
            </p>
            <p>
              از همان آغاز، رویکرد ما پرهیز از تکیه صرف بر واردات پکیج‌های سربسته و انحصاری و در عوض، تمرکز بر طراحی معماری‌های باز صنعتی (Open Architecture) منطبق با استانداردهای جهانی نظیر IEC 61131 و ISA-101 بود تا کارفرمایان در آینده امکان توسعه و بهره‌برداری مستقل را داشته باشند.
            </p>
            <p>
              امروزه دپارتمان‌های فنی شرکت با در اختیار داشتن متخصصان برجسته در حوزه‌های برق قدرت، اتوماسیون، شبکه‌های مخابراتی صنعتی و پردازش داده‌ها، خدمات کامل EPC از امکان‌سنجی تا راه‌اندازی و نگهداری را ارائه می‌نمایند.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-[#F6F5F3] py-16 border-y border-[rgba(17,17,17,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFD7F0] flex items-center justify-center">
                <Target className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">مأموریت سازمانی</h3>
              <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                {data.profile.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B7EFB2] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">چشم‌انداز بلندمدت</h3>
              <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                {data.profile.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#e8400d] uppercase">اصول بنیادین</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">ارزش‌های سازمانی</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.profile.coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[rgba(17,17,17,0.08)] space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F6F5F3] flex items-center justify-center font-bold text-xs text-[#111111]">
                {(idx + 1).toString().padStart(2, '۰')}
              </div>
              <h4 className="text-base font-bold text-[#111111]">{val.title}</h4>
              <p className="text-xs text-[#575655] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Philosophy & Execution Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#272625] text-white space-y-6">
          <span className="text-xs font-mono text-[#FFEF99] uppercase">رویکرد اجرایی</span>
          <h2 className="text-2xl sm:text-3xl font-black leading-snug">
            متدولوژی مهندسی و انضباط در تحویل پروژه‌ها
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs sm:text-sm text-[#c5c4c1] leading-relaxed">
            <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-white text-sm">۱. ممیزی و مهندسی پایه</h4>
              <p>تحلیل دقیق شرایط میدانی سایت، شناسایی متغیرهای بحرانی فرآیند و مستندسازی دقیق P&ID پیش از هرگونه خرید تجهیزات.</p>
            </div>
            <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-white text-sm">۲. آزمون‌های کارگاهی FAT</h4>
              <p>شبیه‌سازی کامل سیگنال‌ها و کدنویسی کنترلرها در محیط آزمایشگاهی قبل از انتقال تجهیزات به سایت پروژه.</p>
            </div>
            <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-white text-sm">۳. راه‌اندازی و آموزش عملیاتی</h4>
              <p>تحویل رسمی مدارک As-Built به همراه کارگاه‌های آموزشی تخصصی برای اپراتورها و پرسنل نگهداری کارفرما.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards & Certifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#e8400d] uppercase">کیفیت و استانداردها</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
            انطباق با مراجع و استانداردهای صنعتی
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1">
            <span className="font-bold text-sm text-[#111111] font-mono">IEC 61131-3</span>
            <p className="text-xs text-[#575655]">استاندارد بین‌المللی برنامه‌نویسی کنترلرهای صنعتی PLC</p>
          </div>
          <div className="p-4 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1">
            <span className="font-bold text-sm text-[#111111] font-mono">ISA-101 / ISA-18.2</span>
            <p className="text-xs text-[#575655]">طراحی ارگونومیک HMI و مدیریت استاندارد آلارم‌های بحرانی</p>
          </div>
          <div className="p-4 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1">
            <span className="font-bold text-sm text-[#111111] font-mono">DNP3 / Modbus TCP</span>
            <p className="text-xs text-[#575655]">پروتکل‌های باز مخابرات تله‌متری با امنیت رمزنگاری</p>
          </div>
          <div className="p-4 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1">
            <span className="font-bold text-sm text-[#111111] font-mono">IP67 / IP68 Ingress</span>
            <p className="text-xs text-[#575655]">کلاس‌های تاب‌آوری محیطی در برابر نفوذ رطوبت و گردوغبار</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-[#111111]">
            علاقه‌مند به همکاری با تیم مهندسی ما هستید؟
          </h3>
          <p className="text-xs sm:text-sm text-[#575655]">
            جهت تبادل تجارب فنی، بررسی فرصت‌های مشارکت و درخواست پروپوزال، با ما در تماس باشید.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
            >
              <span>تماس با دفتر مهندسی</span>
              <ArrowUpLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
