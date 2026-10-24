'use client';

import React, { useId, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';

export interface GooSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  badge?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  activeColor?: string;
}

export function GooSwitch({
  checked,
  onCheckedChange,
  label,
  description,
  badge = 'Goo Switch',
  disabled = false,
  size = 'md',
  className,
  activeColor = 'bg-[#e8400d]',
}: GooSwitchProps) {
  const filterId = useId().replace(/:/g, '');
  const [isPressing, setIsPressing] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const sizeConfig = {
    sm: {
      track: 'w-11 h-6 p-0.5',
      thumb: 'w-5 h-5',
      blobSize: 20,
      textSize: 'text-xs',
      descSize: 'text-[11px]',
    },
    md: {
      track: 'w-14 h-7 p-1',
      thumb: 'w-5 h-5',
      blobSize: 20,
      textSize: 'text-xs sm:text-sm',
      descSize: 'text-xs',
    },
    lg: {
      track: 'w-16 h-8 p-1',
      thumb: 'w-6 h-6',
      blobSize: 24,
      textSize: 'text-sm font-semibold',
      descSize: 'text-xs',
    },
  }[size];

  return (
    <div
      onClick={handleToggle}
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
      onMouseLeave={() => setIsPressing(false)}
      className={cn(
        'group flex items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-[rgba(17,17,17,0.06)] bg-white hover:bg-[#F6F5F3]/50 transition-colors select-none cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      role="switch"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {/* SVG Gooey Liquid Filter */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id={`goo-${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {(label || description) && (
        <div className="flex-1 space-y-0.5">
          <div className="flex items-center gap-2">
            {label && (
              <span className={cn('font-semibold text-[#111111]', sizeConfig.textSize)}>
                {label}
              </span>
            )}
            {badge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F6F5F3] text-[#575655] border border-[rgba(17,17,17,0.08)] flex items-center gap-1">
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    checked ? 'bg-[#e8400d]' : 'bg-neutral-400'
                  )}
                />
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className={cn('text-[#6D6C6B] leading-relaxed', sizeConfig.descSize)}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Devigner UI Goo Switch Track */}
      <div
        className={cn(
          'relative flex items-center shrink-0 rounded-full border transition-all duration-300 shadow-inner overflow-visible',
          sizeConfig.track,
          checked
            ? `${activeColor} border-transparent shadow-xs`
            : 'bg-[#E3E1DC] border-[rgba(17,17,17,0.14)]'
        )}
        style={{
          direction: 'ltr',
        }}
      >
        {/* Gooey Liquid Container with SVG Filter */}
        <div
          className="absolute inset-0 flex items-center p-0.5 w-full h-full pointer-events-none"
          style={{
            filter: `url(#goo-${filterId})`,
          }}
        >
          {/* Main Fluid Blob Thumb */}
          <motion.div
            layout
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 24,
              mass: 0.8,
            }}
            animate={{
              scaleX: isPressing ? 1.35 : 1,
              scaleY: isPressing ? 0.8 : 1,
            }}
            className={cn(
              'rounded-full bg-white shadow-md flex items-center justify-center relative z-10',
              sizeConfig.thumb,
              checked ? 'ml-auto' : 'mr-auto'
            )}
          >
            {/* Liquid Core Dot / Indicator */}
            <motion.div
              animate={{
                scale: checked ? 1 : 0.6,
                rotate: checked ? 0 : -45,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="flex items-center justify-center"
            >
              {checked ? (
                <div className="w-2 h-2 rounded-full bg-[#e8400d]" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              )}
            </motion.div>
          </motion.div>

          {/* Secondary Liquid Droplet for the "Goo" Separation Effect */}
          <motion.div
            layout
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 28,
              mass: 1.2,
            }}
            className={cn(
              'rounded-full bg-white/90 absolute opacity-70 pointer-events-none',
              size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
              checked ? 'right-2' : 'left-2'
            )}
          />
        </div>
      </div>
    </div>
  );
}
