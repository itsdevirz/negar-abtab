'use client';

import React from 'react';
import Link from 'next/link';
import { useCompany } from '@/lib/company-context';
import {
  Award,
  Calendar,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  ArrowUpLeft,
  SlidersHorizontal,
} from 'lucide-react';

export default function RecordsPage() {
  const { data, setIsCustomizerOpen } = useCompany();

  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <section className="bg-[#F6F5F3] py-16 border-b border-[rgba(17,17,17,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#e8400d]">
            <Link href="/" className="hover:underline">
              صفحه اصلی
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#575655]">سوابق و دستاوردها</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
            سوابق حرفه‌ای، افتخارات و مسیر رشد
          </h1>
          <p className="text-sm sm:text-base text-[#575655] max-w-3xl leading-relaxed">
            تاریخچه مستند تکامل مهندسی، پروژه‌های شاخص اجراشده و مراجع کنترل کیفی شرکت نگار آبتاب آبانگاه از زمان تأسیس تاکنون.
          </p>
        </div>
      </section>

      {/* Numerical Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white border border-[rgba(17,17,17,0.08)] shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(17,17,17,0.06)]">
            <h3 className="text-base font-bold text-[#111111]">خلاصه ظرفیت‌های انباشته</h3>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-xs text-[#e8400d] hover:underline flex items-center gap-1 font-medium"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>ویرایش آمار</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl font-bold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.years}
              </span>
              <span className="text-xs text-[#575655] block">سال سابقه عملیاتی در صنعت</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-bold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.projects}
              </span>
              <span className="text-xs text-[#575655] block">پروژه و قرارداد اجرایی موفق</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-bold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.clients}
              </span>
              <span className="text-xs text-[#575655] block">کارفرمای دولتی و خصوصی</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-bold font-mono text-[#111111]" dir="ltr">
                +{data.profile.stats.engineers}
              </span>
              <span className="text-xs text-[#575655] block">نیروی متخصص فنی مستقر</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Milestone Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#e8400d] uppercase">خط زمانی تحول</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
            نقاط عطف و رویدادهای کلیدی شرکت
          </h2>
          <p className="text-xs sm:text-sm text-[#575655]">
            روند گام‌به‌گام توسعه خدمات از اتوماسیون کارگاهی تا پلتفرم‌های مانیتورینگ هوشمند سراسری.
          </p>
        </div>

        <div className="relative border-r-2 border-[rgba(17,17,17,0.12)] pr-6 sm:pr-10 space-y-10 mr-3 sm:mr-6">
          {data.milestones.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -right-[33px] sm:-right-[49px] top-1 w-5 h-5 rounded-full bg-white border-2 border-[#111111] group-hover:border-[#e8400d] group-hover:scale-125 transition-all flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111] group-hover:bg-[#e8400d]" />
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-3 hover:border-[rgba(17,17,17,0.2)] transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-mono text-[#e8400d]">{item.year}</span>
                    <span aria-hidden="true" className="text-[#6D6C6B]">
                      ·
                    </span>
                    <h3 className="text-base font-bold text-[#111111]">{item.title}</h3>
                  </div>
                  <span className="text-xs font-medium text-[#6D6C6B] bg-[#F6F5F3] px-2.5 py-1 rounded-md">
                    {item.highlight}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Standards & Testing Infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#e8400d] uppercase">پایایی و تضمین کیفیت</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
            زیرساخت آزمون و کنترل کیفی تابلوها و کدهای کنترلی
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#111111]" />
            <h4 className="text-base font-bold text-[#111111]">تست شبیه‌سازی سیگنال (FAT)</h4>
            <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
              تمامی تابلوهای PLC و سیستم‌های اسکادا پیش از خروج از کارگاه با تجهیزات شبیه‌ساز ورودی/خروجی تست کامل عملکردی می‌شوند.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] space-y-3">
            <FileCheck className="w-6 h-6 text-[#111111]" />
            <h4 className="text-base font-bold text-[#111111]">مستندات As-Built کامل</h4>
            <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
              ارائه دفترچه نقشه‌های الکتریکال EPLAN، ماتریس ارتباطی تله‌متری و فایل سورس کدهای معتبر برای کلیه پروژه‌ها.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] space-y-3">
            <Award className="w-6 h-6 text-[#111111]" />
            <h4 className="text-base font-bold text-[#111111]">پایبندی به استانداردهای رسمی</h4>
            <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
              تطابق با ضوابط دفاتر فنی کارفرمایی، دستورالعمل‌های توانیر، شرکت مدیریت منابع آب و سازمان ملی استاندارد.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-[#111111]">
            نیاز به دریافت رزومه تفصیلی یا معرفی‌نامه رسمی دارید؟
          </h3>
          <p className="text-xs sm:text-sm text-[#575655]">
            کارشناسان ما کاتالوگ جامع سوابق و مستندات فنی را در قالب فایل PDF رسمی برای شما ارسال می‌نمایند.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
            >
              <span>درخواست کاتالوگ و رزومه مهندسی</span>
              <ArrowUpLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
