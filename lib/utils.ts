import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

export function formatPersianDate(dateInput?: string | Date | number): string {
  if (!dateInput) {
    try {
      return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date());
    } catch {
      return '۳۰ مهر ۱۴۰۴';
    }
  }

  // If already contains Persian month name (e.g., '۱۵ مهر ۱۴۰۴')
  if (typeof dateInput === 'string' && PERSIAN_MONTHS.some((m) => dateInput.includes(m))) {
    return dateInput;
  }

  // Handle slash formats like '1404/07/15' or '۱۴۰۴/۰۷/۱۵'
  if (typeof dateInput === 'string' && dateInput.includes('/')) {
    const parts = dateInput.trim().split('/');
    if (parts.length === 3) {
      const p2e = (s: string) =>
        s.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
      const y = parseInt(p2e(parts[0]), 10);
      const m = parseInt(p2e(parts[1]), 10);
      const d = parseInt(p2e(parts[2]), 10);

      const toPersianDigits = (num: number) =>
        String(num).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[+digit]);

      if (m >= 1 && m <= 12 && !isNaN(y) && !isNaN(d)) {
        const monthName = PERSIAN_MONTHS[m - 1];
        return `${toPersianDigits(d)} ${monthName} ${toPersianDigits(y)}`;
      }
    }
  }

  // Try parsing Date or timestamp
  try {
    const dt = new Date(dateInput);
    if (!isNaN(dt.getTime())) {
      return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(dt);
    }
  } catch {
    // ignore
  }

  return String(dateInput);
}

