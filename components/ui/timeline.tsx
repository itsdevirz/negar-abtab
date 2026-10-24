'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  ArrowUpLeft,
  CircleDot,
  Clock,
  Award,
} from 'lucide-react';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlight: string;
  badge?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Timeline({ items, className, title, subtitle }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number>(items.length - 1); // default to the latest milestone

  return (
    <div className={cn('relative w-full', className)}>
      {/* Devigner UI Timeline Container */}
      <div className="relative">
        {/* Animated Vertical Track / Guide Beam */}
        <div className="absolute right-4 sm:right-7 top-6 bottom-8 w-[2px] bg-[rgba(17,17,17,0.08)] rounded-full overflow-hidden">
          {/* Animated active gradient progress fill */}
          <motion.div
            className="w-full bg-gradient-to-b from-[#e8400d] via-[#e8400d] to-[#111111] rounded-full"
            initial={{ height: 0 }}
            animate={{
              height: `${((activeIndex + 1) / items.length) * 100}%`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Milestones List */}
        <div className="space-y-6 sm:space-y-8">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const isPassed = index <= activeIndex;
            const stepNum = (index + 1).toString().padStart(2, '۰');

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setActiveIndex(index)}
                className="relative flex items-start gap-4 sm:gap-8 group cursor-pointer select-none"
              >
                {/* Node Milestone Indicator (Devigner geometric tactile node) */}
                <div className="relative shrink-0 flex items-center justify-center pt-1 z-10">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      borderColor: isActive
                        ? '#e8400d'
                        : isPassed
                        ? '#111111'
                        : 'rgba(17,17,17,0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className={cn(
                      'w-9 h-9 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center border-2 bg-white transition-all duration-300 shadow-2xs group-hover:shadow-md',
                      isActive
                        ? 'ring-4 ring-[#e8400d]/15 bg-white'
                        : isPassed
                        ? 'bg-neutral-50'
                        : 'bg-white'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[10px] sm:text-xs font-mono font-bold transition-colors leading-none',
                        isActive
                          ? 'text-[#e8400d]'
                          : isPassed
                          ? 'text-[#111111]'
                          : 'text-[#a6a5a2]'
                      )}
                    >
                      {stepNum}
                    </span>
                    <span
                      className={cn(
                        'text-[9px] sm:text-[10px] font-mono mt-0.5 hidden sm:block',
                        isActive
                          ? 'text-[#e8400d] font-bold'
                          : 'text-[#6D6C6B]'
                      )}
                    >
                      {item.year}
                    </span>
                  </motion.div>

                  {/* Pulsing halo when active */}
                  {isActive && (
                    <motion.div
                      layoutId="timeline-halo"
                      className="absolute inset-0 rounded-2xl bg-[#e8400d]/20 -z-10 animate-ping opacity-30"
                    />
                  )}
                </div>

                {/* Card Body */}
                <motion.div
                  animate={{
                    borderColor: isActive
                      ? 'rgba(232, 64, 13, 0.4)'
                      : 'rgba(17, 17, 17, 0.08)',
                    backgroundColor: isActive ? '#FFFFFF' : '#FAFAF9',
                  }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    'flex-1 p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-2xs group-hover:shadow-sm space-y-3 relative overflow-hidden',
                    isActive && 'shadow-md border-[#e8400d]/30'
                  )}
                >
                  {/* Subtle Geometric Corner Mark for Devigner Aesthetic */}
                  <div className="absolute top-2.5 left-2.5 text-[9px] font-mono text-[rgba(17,17,17,0.15)] pointer-events-none">
                    ┌
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 text-[9px] font-mono text-[rgba(17,17,17,0.15)] pointer-events-none">
                    └
                  </div>

                  {/* Header Row: Year, Badge & Highlight */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm sm:text-base text-[#e8400d] bg-[#e8400d]/10 px-2.5 py-0.5 rounded-lg border border-[#e8400d]/20">
                        {item.year}
                      </span>
                      <span aria-hidden="true" className="text-[#a6a5a2]">
                        ·
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#111111]">
                        {item.highlight}
                      </span>
                    </div>

                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-md border transition-colors',
                        isActive
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#6D6C6B] border-[rgba(17,17,17,0.08)]'
                      )}
                    >
                      مرحله {stepNum} از {items.length.toString().padStart(2, '۰')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      'text-base sm:text-lg font-bold transition-colors',
                      isActive ? 'text-[#111111]' : 'text-[#272625] group-hover:text-[#111111]'
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Active Indicator & Action Hint */}
                  <div className="pt-2 flex items-center justify-between text-xs text-[#6D6C6B] border-t border-[rgba(17,17,17,0.05)]">
                    <span className="flex items-center gap-1.5 font-medium text-[11px]">
                      {isActive ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#e8400d]" />
                          <span className="text-[#e8400d] font-bold">نقطه عطف فعال</span>
                        </>
                      ) : (
                        <>
                          <CircleDot className="w-3.5 h-3.5 text-[#a6a5a2]" />
                          <span>برای مشاهده برجسته کلیک کنید</span>
                        </>
                      )}
                    </span>

                    <span className="text-[10px] font-mono text-[#a6a5a2]">
                      سوابق شرکت نگار آبتاب آبانگاه
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
