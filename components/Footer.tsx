'use client';

import React from 'react';
import Link from 'next/link';
import { useCompany } from '@/lib/company-context';
import { Phone, Mail, MapPin, Clock, ArrowUpLeft, ShieldCheck, HeartHandshake } from 'lucide-react';

export function Footer() {
  const { data, setIsCustomizerOpen } = useCompany();

  return (
    <footer className="bg-[#272625] text-white pt-16 pb-12 border-t border-[#3a3937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3a3937]">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-[#e8400d] text-white flex items-center justify-center font-bold text-base">
                ن‌آ
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {data.profile.companyName}
              </span>
            </div>
            <p className="text-sm text-[#c5c4c1] leading-relaxed max-w-md">
              مرکز تخصصی فناوری، هوشمندسازی و سیستم‌های جامع مهندسی. متعهد به ارتقای کارایی زیرساخت‌های تأسیساتی و صنعتی با به‌کارگیری استانداردهای بین‌المللی کنترل و اتوماسیون.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#a6a5a2]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B7EFB2]" />
                انطباق با استانداردهای IEC و ISA
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#FFEF99]" />
                پشتیبانی متعهدانه
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider">صفحات اصلی</h4>
            <ul className="space-y-2 text-sm text-[#c5c4c1]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  درباره شرکت و اهداف
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  خدمات و حوزه‌های تخصصی
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  آرشیو پروژه‌ها و نمونه‌کارها
                </Link>
              </li>
              <li>
                <Link href="/records" className="hover:text-white transition-colors">
                  سوابق، افتخارات و خط زمانی
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  ارتباط و استعلام همکاری
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Specialized Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider">خدمات تخصصی</h4>
            <ul className="space-y-2 text-sm text-[#c5c4c1]">
              {data.services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider">ارتباط مستقیم</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#c5c4c1]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#e8400d] shrink-0 mt-0.5" />
                <span className="font-mono tabular-nums text-white" dir="ltr">
                  {data.profile.phone}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#e8400d] shrink-0 mt-0.5" />
                <span className="font-mono text-white" dir="ltr">
                  {data.profile.email}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e8400d] shrink-0 mt-0.5" />
                <span>{data.profile.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#e8400d] shrink-0 mt-0.5" />
                <span className="text-xs">{data.profile.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Sample Transparency note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a6a5a2]">
          <p>
            © کلیه حقوق مادی و معنوی متعلق به شرکت «{data.profile.companyName}» است.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-[#c5c4c1] hover:text-white underline underline-offset-4 transition-colors"
            >
              مدیریت و ویرایش اطلاعات سایت
            </button>
            <span aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              حریم خصوصی و شرایط همکاری
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
