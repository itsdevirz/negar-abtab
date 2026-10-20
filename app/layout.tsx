import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { CompanyProvider } from '@/lib/company-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SampleDataBanner } from '@/components/SampleDataBanner';
import { AdminCustomizer } from '@/components/AdminCustomizer';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';

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
  openGraph: {
    title: 'نگار آبتاب آبانگاه | تجربه، تخصص و اعتماد',
    description:
      'وبسایت رسمی شرکت نگار آبتاب آبانگاه؛ پیشرو در فناوری، هوشمندسازی و سیستم‌های جامع مهندسی، اتوماسیون صنعتی و پایش تأسیسات تخصصی.',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'نگار آبتاب آبانگاه',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نگار آبتاب آبانگاه | تجربه، تخصص و اعتماد',
    description:
      'وبسایت رسمی شرکت نگار آبتاب آبانگاه؛ پیشرو در فناوری، هوشمندسازی و سیستم‌های جامع مهندسی، اتوماسیون صنعتی و پایش تأسیسات تخصصی.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#111111] antialiased" suppressHydrationWarning>
        <CompanyProvider>
          {/* Top Transparency Banner */}
          <SampleDataBanner />
          {/* Sticky Nav Bar */}
          <Header />
          {/* Main content body with safe top padding */}
          <main className="flex-1 pt-20">{children}</main>
          {/* Official Dark Footer */}
          <Footer />
          {/* Floating Admin & Project Detail Modals */}
          <AdminCustomizer />
          <ProjectDetailModal />
        </CompanyProvider>
      </body>
    </html>
  );
}
