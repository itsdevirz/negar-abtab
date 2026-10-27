import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SampleDataBanner } from '@/components/SampleDataBanner';
import { AdminCustomizer } from '@/components/AdminCustomizer';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname?.startsWith('/admin');

  // If in Admin Panel, only render the Admin's own interface with zero main website navbar or footer
  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F6F5F3]">
        <main className="flex-1">{children}</main>
        <ProjectDetailModal />
      </div>
    );
  }

  // Normal public pages: include transparency banner, header, main with padding, footer, modals
  return (
    <>
      <SampleDataBanner />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <AdminCustomizer />
      <ProjectDetailModal />
    </>
  );
}
