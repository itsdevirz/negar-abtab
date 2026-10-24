import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پنل مدیریت پیشرفته | شرکت نگار آبتاب آبانگاه',
  description: 'مدیریت زنده محتوای سایت، ویدئوهای آموزشی، پروژه‌ها و پیام‌های استعلام',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F6F5F3]">{children}</div>;
}
