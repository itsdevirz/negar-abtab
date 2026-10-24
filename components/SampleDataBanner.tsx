'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useCompany } from '@/lib/company-context';
import { Info, SlidersHorizontal, X } from 'lucide-react';

export function SampleDataBanner() {
  const pathname = usePathname();
  const { data, toggleSampleNotice, setIsCustomizerOpen } = useCompany();

  if (pathname?.startsWith('/admin') || !data.profile.isSampleDataNotice) {
    return null;
  }

  return (
    <div className="bg-[#F6F5F3] border-b border-[rgba(17,17,17,0.08)] text-xs text-[#575655] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#e8400d] shrink-0" />
          <span>
            <strong>شفافیت سازمانی:</strong> داده‌ها، ارقام آماری و پروژه‌های اولیه در قالب داده‌های آزمایشی استاندارد جهت بررسی معماری سایت بارگذاری شده‌اند و برای ثبت اسناد رسمی قابل ویرایش می‌باشند.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="inline-flex items-center gap-1 font-medium text-[#111111] hover:text-[#e8400d] underline underline-offset-2"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>ویرایش آنلاین مشخصات</span>
          </button>
          <button
            onClick={toggleSampleNotice}
            className="p-1 text-[#6D6C6B] hover:text-[#111111] rounded-md transition-colors"
            title="بستن این پیام"
            aria-label="بستن این پیام"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
