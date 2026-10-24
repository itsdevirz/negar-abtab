'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  Film,
  X,
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  onFileSelect: (file: File, durationStr: string) => void;
  onFileRemove: () => void;
  currentPreviewUrl?: string;
  currentFileName?: string;
  currentFileSize?: string;
  currentDuration?: string;
  acceptedFormats?: string[];
  maxSizeMB?: number;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  currentPreviewUrl = '',
  currentFileName = '',
  currentFileSize = '',
  currentDuration = '',
  acceptedFormats = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'],
  maxSizeMB = 500,
  className,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedDuration, setDetectedDuration] = useState<string>(currentDuration);
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    size: string;
    format: string;
  } | null>(
    currentFileName
      ? {
          name: currentFileName,
          size: currentFileSize || '',
          format: currentFileName.split('.').pop()?.toUpperCase() || 'VIDEO',
        }
      : null
  );

  // Derived duration display
  const displayDuration = detectedDuration || currentDuration;

  // Format bytes to readable size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  // Convert seconds to MM:SS format with Persian numerals
  const formatTimePersian = (secondsTotal: number) => {
    const mins = Math.floor(secondsTotal / 60);
    const secs = Math.floor(secondsTotal % 60);
    const mStr = String(mins).padStart(2, '0');
    const sStr = String(secs).padStart(2, '0');
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const raw = `${mStr}:${sStr}`;
    return raw.replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
  };

  const processVideoFile = (file: File) => {
    setErrorMessage(null);

    // Validate video type
    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|mkv|avi)$/i)) {
      setErrorMessage('فایل انتخاب شده معتبر نیست. لطفاً صرفاً یک فایل ویدئویی (MP4، WebM، MOV) انتخاب کنید.');
      return;
    }

    // Validate size limit
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`حجم ویدئو بیش از سقف مجاز (${maxSizeMB} مگابایت) است.`);
      return;
    }

    const format = file.name.split('.').pop()?.toUpperCase() || 'MP4';
    const sizeStr = formatFileSize(file.size);

    setFileDetails({
      name: file.name,
      size: sizeStr,
      format,
    });

    setIsDetecting(true);

    // Create temporary object URL for duration inspection
    const tempUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = tempUrl;

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(tempUrl);
      const durSeconds = video.duration;
      let calculatedTime = '۱۰:۰۰';
      if (!isNaN(durSeconds) && isFinite(durSeconds)) {
        calculatedTime = formatTimePersian(durSeconds);
      }
      setDetectedDuration(calculatedTime);
      setIsDetecting(false);
      onFileSelect(file, calculatedTime);
    };

    video.onerror = () => {
      URL.revokeObjectURL(tempUrl);
      setIsDetecting(false);
      const fallbackDuration = '۰۵:۰۰';
      setDetectedDuration(fallbackDuration);
      onFileSelect(file, fallbackDuration);
    };
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processVideoFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFileDetails(null);
    setErrorMessage(null);
    setDetectedDuration('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove();
  };

  const hasFile = Boolean(currentPreviewUrl || fileDetails);

  return (
    <div className={cn('space-y-3', className)}>
      <input
        type="file"
        ref={fileInputRef}
        accept={acceptedFormats.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {!hasFile ? (
          /* Devigner UI Inspired Dropzone */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 select-none',
              isDragging
                ? 'border-[#e8400d] bg-[#e8400d]/5 shadow-lg scale-[1.01]'
                : 'border-[rgba(17,17,17,0.14)] bg-[#F6F5F3]/50 hover:bg-[#F6F5F3] hover:border-[#111111]'
            )}
          >
            {/* Geometric Corner Accents */}
            <div className="absolute top-2 left-2 text-[10px] font-mono text-[rgba(17,17,17,0.2)]">┌</div>
            <div className="absolute top-2 right-2 text-[10px] font-mono text-[rgba(17,17,17,0.2)]">┐</div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[rgba(17,17,17,0.2)]">└</div>
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[rgba(17,17,17,0.2)]">┘</div>

            {/* Inner Content */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-white border border-[rgba(17,17,17,0.08)] shadow-xs flex items-center justify-center text-[#e8400d] group-hover:text-[#111111] transition-colors"
              >
                <UploadCloud className="w-7 h-7" />
              </motion.div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-[#111111]">
                  فایل ویدئو را اینجا بکشید یا برای انتخاب کلیک کنید
                </p>
              </div>

              {/* Format badges */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white border border-[rgba(17,17,17,0.08)] text-[#575655]">
                  MP4
                </span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white border border-[rgba(17,17,17,0.08)] text-[#575655]">
                  WEBM
                </span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white border border-[rgba(17,17,17,0.08)] text-[#575655]">
                  MOV
                </span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white border border-[rgba(17,17,17,0.08)] text-[#575655]">
                  MKV
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active File Card with Preview & Controls */
          <motion.div
            key="file-details"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="rounded-2xl border border-[rgba(17,17,17,0.1)] bg-white p-4 shadow-xs space-y-4"
          >
            {/* Header Strip */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Film className="w-5 h-5 text-[#FFD7F0]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#111111] line-clamp-1">
                      {fileDetails?.name || currentFileName || 'ویدئوی انتخابی'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F6F5F3] text-[#111111] border border-[rgba(17,17,17,0.08)] font-semibold">
                      {fileDetails?.format || 'VIDEO'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#6D6C6B] mt-0.5 font-mono">
                    {fileDetails?.size && <span>حجم: {fileDetails.size}</span>}
                    {displayDuration && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold font-sans">
                          <Clock className="w-3 h-3" />
                          مدت زمان: {displayDuration}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-semibold text-[#111111] bg-[#F6F5F3] hover:bg-[#eceae6] border border-[rgba(17,17,17,0.08)] rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تغییر ویدئو</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
                  title="حذف فایل ویدئو"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Preview Player */}
            {currentPreviewUrl ? (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video w-full border border-[rgba(17,17,17,0.12)] shadow-inner">
                <video
                  src={currentPreviewUrl}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                >
                  مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
                </video>
              </div>
            ) : null}

            {/* Status & Duration Info Pill */}
            <div className="p-3 bg-[#F6F5F3] rounded-xl flex items-center justify-between text-xs border border-[rgba(17,17,17,0.06)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[#111111] font-medium text-[11px] sm:text-xs">
                  ویدئو با موفقیت بارگذاری شد و در پایگاه داده محلی مرورگر (IndexedDB) ثبت می‌شود.
                </span>
              </div>
              {isDetecting ? (
                <span className="text-[11px] text-amber-700 font-mono animate-pulse shrink-0">
                  محاسبه هوشمند مدت زمان...
                </span>
              ) : displayDuration ? (
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  {displayDuration}
                </span>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
