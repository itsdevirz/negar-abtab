'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { X, Check } from 'lucide-react';

export interface DeleteButtonProps {
  onDelete: () => void | Promise<void>;
  itemTitle?: string;
  variant?: 'icon' | 'labeled';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
}

export function DeleteButton({
  onDelete,
  itemTitle,
  variant = 'icon',
  size = 'md',
  className,
  disabled = false,
}: DeleteButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss confirmation after 4 seconds of inactivity
  useEffect(() => {
    if (!isConfirming) return;
    const timer = setTimeout(() => {
      setIsConfirming(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, [isConfirming]);

  // Click outside to cancel confirmation
  useEffect(() => {
    if (!isConfirming) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsConfirming(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isConfirming]);

  const handleInitialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || isDeleting) return;
    setIsConfirming(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirming(false);
  };

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <AnimatePresence mode="wait">
        {!isConfirming ? (
          /* Devigner UI Animated Trash Can Button */
          <motion.button
            key="delete-trigger"
            type="button"
            disabled={disabled || isDeleting}
            onClick={handleInitialClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className={cn(
              'group relative inline-flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer overflow-hidden border border-red-200/80 bg-red-50/50 hover:bg-red-50 text-red-600 hover:text-red-700 shadow-2xs',
              size === 'sm' ? 'p-2' : 'px-3 py-2 gap-1.5',
              className
            )}
            title={itemTitle ? `حذف ${itemTitle}` : 'حذف'}
            aria-label="حذف"
          >
            {/* Animated SVG Trash with lifting lid */}
            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
              {/* Trash Lid (lifts and tilts on hover) */}
              <motion.svg
                viewBox="0 0 16 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 w-3.5 h-1 stroke-current stroke-[1.6] stroke-linecap-round stroke-linejoin-round"
                animate={{
                  y: isHovered ? -2.5 : 0,
                  rotate: isHovered ? -20 : 0,
                  transformOrigin: 'left bottom',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                {/* Lid handle */}
                <path d="M6 1.2h4" />
                {/* Lid top bar */}
                <path d="M1 3h14" />
              </motion.svg>

              {/* Falling paper crumb on hover */}
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.5 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 2 : -4,
                  scale: isHovered ? 0.8 : 0.4,
                }}
                transition={{ duration: 0.25 }}
                className="absolute top-1 w-1 h-1 bg-red-400 rounded-xs pointer-events-none"
              />

              {/* Trash Can Body */}
              <svg
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 w-3.5 h-2.5 stroke-current stroke-[1.6] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M2.5 1l.9 9.2a1 1 0 001 .8h7.2a1 1 0 001-.8L13.5 1" />
                <path d="M6 3.5v5" />
                <path d="M10 3.5v5" />
              </svg>
            </div>

            {variant === 'labeled' && (
              <span className="text-xs font-semibold">حذف</span>
            )}
          </motion.button>
        ) : (
          /* Devigner UI Animated Confirmation State */
          <motion.div
            key="delete-confirm"
            initial={{ opacity: 0, scale: 0.85, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 26 }}
            className="inline-flex items-center gap-1.5 p-1 bg-red-600 text-white rounded-xl shadow-lg border border-red-700 z-20"
          >
            <span className="text-[11px] font-bold px-2 whitespace-nowrap">
              {isDeleting ? 'در حال حذف...' : 'تایید حذف؟'}
            </span>

            {/* Confirm button */}
            <motion.button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
              title="بله، حذف کن"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </motion.button>

            {/* Cancel button */}
            <motion.button
              type="button"
              onClick={handleCancel}
              disabled={isDeleting}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-lg bg-black/20 hover:bg-black/30 text-white/90 hover:text-white cursor-pointer transition-colors"
              title="انصراف"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
