'use client';

import React from 'react';
import Link from 'next/link';
import { useCompany } from '@/lib/company-context';
import { ContactForm } from '@/components/ContactForm';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Navigation,
  MessageSquare,
  Building,
  SlidersHorizontal,
} from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

export default function ContactPage() {
  const { data, setIsCustomizerOpen } = useCompany();

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#F6F5F3] py-16 border-b border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#e8400d]">
            <Link href="/" className="hover:underline">
              صفحه اصلی
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#575655]">تماس با ما</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
            ارتباط با شرکت نگار آبتاب آبانگاه
          </h1>
          <p className="text-sm sm:text-base text-[#575655] max-w-3xl leading-relaxed">
            جهت استعلام خدمات مهندسی، مشاوره فنی، برگزاری جلسات حضوری یا ارسال درخواست همکاری، از راه‌های ارتباطی زیر استفاده فرمایید.
          </p>
        </FadeIn>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(17,17,17,0.08)] space-y-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[rgba(17,17,17,0.06)] pb-4">
                <h3 className="text-lg font-bold text-[#111111]">اطلاعات رسمی دفتر مرکزی</h3>
                <button
                  onClick={() => setIsCustomizerOpen(true)}
                  className="text-xs text-[#e8400d] hover:underline flex items-center gap-1 font-medium"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>ویرایش شماره‌ها</span>
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#272625]">
                <div className="flex items-start gap-3 p-3 bg-[#F6F5F3] rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#e8400d] shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-[#6D6C6B] block">تلفن‌های تماس مستقیم:</span>
                    <a
                      href={`tel:${data.profile.phone.replace(/[^0-9]/g, '')}`}
                      className="font-bold font-mono text-[#111111] hover:text-[#e8400d] transition-colors block text-left"
                      dir="ltr"
                    >
                      {data.profile.phone}
                    </a>
                    <span className="font-mono text-xs text-[#575655] block text-left" dir="ltr">
                      همراه: {data.profile.mobile}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#F6F5F3] rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#e8400d] shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-[#6D6C6B] block">پست الکترونیکی رسمی:</span>
                    <a
                      href={`mailto:${data.profile.email}`}
                      className="font-bold font-mono text-[#111111] hover:text-[#e8400d] transition-colors block text-left"
                      dir="ltr"
                    >
                      {data.profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#F6F5F3] rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#e8400d] shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-[#6D6C6B] block">نشانی فیزیکی دفتر مرکزی:</span>
                    <p className="text-xs text-[#111111] leading-relaxed">{data.profile.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#F6F5F3] rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#e8400d] shadow-2xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-[#6D6C6B] block">ساعات پاسخگویی اداری:</span>
                    <p className="text-xs text-[#111111]">{data.profile.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Location & Navigation Guide */}
            <div className="p-6 rounded-3xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#e8400d]" />
                  <span>راهنمای دسترسی به دفتر شرکت</span>
                </h4>
                <span className="text-[10px] font-mono text-[#6D6C6B]">تهران - ولیعصر</span>
              </div>

              {/* Graphic Blueprint Map Representation */}
              <div className="h-40 w-full rounded-2xl bg-white border border-[rgba(17,17,17,0.08)] relative overflow-hidden p-4 flex flex-col justify-between">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between text-[11px] text-[#575655]">
                  <span>مختصات جغرافیایی تقریب:</span>
                  <span className="font-mono text-xs text-[#111111]" dir="ltr">
                    35.7585° N, 51.4112° E
                  </span>
                </div>
                <div className="relative z-10 my-auto text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#272625] text-white text-xs font-semibold shadow-xs">
                    <Building className="w-3.5 h-3.5 text-[#e8400d]" />
                    <span>برج فناوری - شرکت نگار آبتاب آبانگاه</span>
                  </div>
                </div>
                <div className="relative z-10 text-[10px] text-[#6D6C6B] text-center">
                  دسترسی آسان از طریق ایستگاه‌های حمل و نقل عمومی و بزرگراه شهید حقانی
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                ارسال پیام یا درخواست پیش‌پروپوزال
              </h2>
              <p className="text-xs sm:text-sm text-[#575655]">
                فرم زیر را تکمیل فرمایید تا کارشناسان فنی ما در اسرع وقت اقدام به بررسی و هماهنگی جلسه نمایند.
              </p>
            </div>

            <ContactForm />
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
