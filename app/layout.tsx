import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { CompanyProvider } from '@/lib/company-context';
import { AppShell } from '@/components/AppShell';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'نگار آبتاب آبانگاه | تجربه، تخصص و اعتماد',
  description:
    'وبسایت رسمی شرکت نگار آبتاب آبانگاه؛ پیشرو در فناوری، هوشمندسازی و سیستم‌های جامع مهندسی، اتوماسیون صنعتی و پایش تأسیسات تخصصی.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'نگار آبتاب آبانگاه | تجربه، تخصص و اعتماد',
    description:
      'وبسایت رسمی شرکت نگار آبتاب آبانگاه؛ پیشرو در فناوری، هوشمندسازی و سیستم‌های جامع مهندسی، اتوماسیون صنعتی و پایش تأسیسات تخصصی.',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'نگار آبتاب آبانگاه',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'لوگوی رسمی شرکت نگار آبتاب آبانگاه',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نگار آبتاب آبانگاه | تجربه، تخصص و اعتماد',
    description:
      'وبسایت رسمی شرکت نگار آبتاب آبانگاه؛ پیشرو در فناوری، هوشمندسازی و سیستم‌های جامع مهندسی، اتوماسیون صنعتی و پایش تأسیسات تخصصی.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#111111] antialiased" suppressHydrationWarning>
        <CompanyProvider>
          <AppShell>{children}</AppShell>
        </CompanyProvider>
      </body>
    </html>
  );
}
