'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCompany } from '@/lib/company-context';
import { Menu, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  // If in Admin Panel, do NOT render the main website navbar at all
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/about', label: 'درباره شرکت' },
    { href: '/services', label: 'خدمات و توانمندی‌ها' },
    { href: '/projects', label: 'پروژه‌ها و نمونه‌کارها' },
    { href: '/tutorials', label: 'آموزش و ویدئوها' },
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
          {/* Zone 1: Single text element Brand Zone with Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-lg sm:text-xl font-bold tracking-tight text-[#111111] hover:text-[#e8400d] transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-2xs border border-[rgba(17,17,17,0.08)] bg-white shrink-0 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
              <Image
                src={data.profile.logoUrl || '/assets/aistudio/file_00000000c9e481f4872f5bd5f71094a4_1__c7980156.png'}
                alt={data.profile.brandTitle}
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">{data.profile.brandTitle}</span>
              <span className="text-[10px] font-normal text-[#6D6C6B] hidden sm:block">
                گزارشگری | شفافیت | پاسخگویی
              </span>
            </div>
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

          {/* Zone 3: Mobile Menu Button */}
          <div className="flex items-center gap-2.5 shrink-0">
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:hidden mt-3 pt-3 pb-2 border-t border-[rgba(17,17,17,0.06)] space-y-1 overflow-hidden"
            >
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
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
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
