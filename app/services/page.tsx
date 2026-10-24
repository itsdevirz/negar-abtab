'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCompany } from '@/lib/company-context';
import {
  ArrowUpLeft,
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { motion, AnimatePresence } from 'motion/react';

export default function ServicesPage() {
  const router = useRouter();
  const { data, setContactPrefillTopic } = useCompany();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleInquireService = (serviceTitle: string) => {
    setContactPrefillTopic(`استعلام خدمات تخصصی: ${serviceTitle}`);
    router.push('/contact');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Services Header */}
      <section className="bg-[#F6F5F3] py-16 border-b border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#e8400d]">
            <Link href="/" className="hover:underline">
              صفحه اصلی
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#575655]">خدمات و توانمندی‌ها</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
            خدمات و حوزه‌های تخصصی مهندسی
          </h1>
          <p className="text-sm sm:text-base text-[#575655] max-w-3xl leading-relaxed">
            راهکارهای یکپارچه در اتوماسیون صنعتی، اسکادا، مانیتورینگ تأسیسات زیرساختی، تجهیزات ابزار دقیق و مشاوره معماری سیستم‌ها.
          </p>
        </FadeIn>
      </section>

      {/* Services Comprehensive Deep-Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {data.services.map((service, index) => (
          <FadeIn
            key={service.id}
            id={service.id}
            className="rounded-3xl bg-white border border-[rgba(17,17,17,0.08)] p-6 sm:p-10 space-y-8 scroll-mt-28 shadow-xs"
          >
            {/* Service Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[rgba(17,17,17,0.06)]">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#e8400d]">
                    {(index + 1).toString().padStart(2, '۰')}.
                  </span>
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: service.accentColor }}
                  />
                  <span className="text-xs text-[#6D6C6B]">دپارتمان تخصصی مهندسی</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111111]">
                  {service.title}
                </h2>
                <p className="text-sm sm:text-base text-[#575655] leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              <button
                onClick={() => handleInquireService(service.title)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shrink-0 shadow-xs"
              >
                <span>درخواست استعلام این خدمت</span>
                <ArrowUpLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Features & Business Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Features */}
              <div className="bg-[#F6F5F3] p-6 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-[#111111] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#e8400d]" />
                  <span>توانمندی‌های فنی و مشخصات سامانه</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#272625]">
                  {service.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business Benefits */}
              <div className="bg-[#F6F5F3] p-6 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-[#111111] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ارزش اقتصادی و مزایای همکاری</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#272625]">
                  {service.businessBenefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5-Step Execution Methodology */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-[#111111] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#111111]" />
                <span>مراحل ارائه خدمت و فرآیند اجرای پروژه</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {service.deliverableSteps.map((stepItem, sidx) => (
                  <div
                    key={sidx}
                    className="p-4 rounded-xl border border-[rgba(17,17,17,0.08)] bg-white space-y-1.5"
                  >
                    <span className="text-xs font-bold font-mono text-[#e8400d]">
                      گام {stepItem.step}
                    </span>
                    <h4 className="text-xs font-bold text-[#111111]">{stepItem.title}</h4>
                    <p className="text-[11px] text-[#575655] leading-normal">{stepItem.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQs */}
            {service.faqs.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#6D6C6B] uppercase flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>پرسش‌های متداول کارفرمایان در این حوزه</span>
                </h4>

                <div className="space-y-2">
                  {service.faqs.map((faq, qidx) => {
                    const faqKey = `${service.id}-${qidx}`;
                    const isOpen = openFaq === faqKey;
                    return (
                      <div
                        key={qidx}
                        className="border border-[rgba(17,17,17,0.08)] rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : faqKey)}
                          className="w-full p-4 text-right flex items-center justify-between text-xs sm:text-sm font-semibold text-[#111111] hover:bg-[#F6F5F3] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#6D6C6B] transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-1 bg-[#F6F5F3]/50 text-xs sm:text-sm text-[#575655] leading-relaxed border-t border-[rgba(17,17,17,0.04)]">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </FadeIn>
        ))}
      </section>

      {/* Global Inquire Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="p-8 sm:p-12 rounded-3xl bg-[#272625] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl font-bold">نیاز به راهکاری فراتر از خدمات استاندارد دارید؟</h3>
            <p className="text-xs sm:text-sm text-[#c5c4c1] leading-relaxed">
              مهندسان ما آماده بررسی اختصاصی شرایط فرآیندی سایت شما و ارائه پروپوزال فنی سفارشی هستند.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#111111] bg-white hover:bg-neutral-100 rounded-xl transition-colors whitespace-nowrap shadow-xs"
          >
            <span>شروع مشاوره فنی</span>
            <ArrowUpLeft className="w-4 h-4" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
