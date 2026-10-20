'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCompany } from '@/lib/company-context';
import { Menu, X, SlidersHorizontal, ArrowUpLeft } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { data, setIsCustomizerOpen } = useCompany();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/about', label: 'درباره شرکت' },
    { href: '/services', label: 'خدمات و توانمندی‌ها' },
    { href: '/projects', label: 'پروژه‌ها و نمونه‌کارها' },
    { href: '/records', label: 'سوابق و دستاوردها' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[rgba(17,17,17,0.06)] py-3.5'
          : 'bg-white/90 backdrop-blur-xs border-b border-[rgba(17,17,17,0.04)] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Single text element Brand Zone */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-[#111111] hover:text-[#e8400d] transition-colors whitespace-nowrap shrink-0"
          >
            <span className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
              ن‌آ
            </span>
            <span>{data.profile.brandTitle}</span>
          </Link>

          {/* Zone 2: Navigation Links (Clean unboxed text with active indicator) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#575655]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    isActive
                      ? 'text-[#e8400d] font-semibold'
                      : 'hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e8400d] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Tools */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Admin Drawer Toggle */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              title="تنظیمات و ویرایش آنلاین محتوا"
              aria-label="تنظیمات و ویرایش آنلاین محتوا"
              className="p-2 text-[#575655] hover:text-[#111111] hover:bg-[#F6F5F3] rounded-lg transition-colors border border-[rgba(17,17,17,0.06)]"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#111111] hover:bg-[#272625] active:bg-black rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <span>درخواست همکاری</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#111111] hover:bg-[#F6F5F3] rounded-lg transition-colors"
              aria-label="باز کردن منو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-2 border-t border-[rgba(17,17,17,0.06)] space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#F6F5F3] text-[#e8400d] font-semibold'
                      : 'text-[#111111] hover:bg-[#F6F5F3]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-lg transition-colors"
              >
                <span>درخواست همکاری رسمی</span>
                <ArrowUpLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
