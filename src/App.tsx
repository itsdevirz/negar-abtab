import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CompanyProvider } from '@/lib/company-context';
import { AppShell } from '@/components/AppShell';
import { HomePage } from '@/src/pages/HomePage';
import { AboutPage } from '@/src/pages/AboutPage';
import { ServicesPage } from '@/src/pages/ServicesPage';
import { ProjectsPage } from '@/src/pages/ProjectsPage';
import { TutorialsPage } from '@/src/pages/TutorialsPage';
import { RecordsPage } from '@/src/pages/RecordsPage';
import { ContactPage } from '@/src/pages/ContactPage';
import { AdminPage } from '@/src/pages/AdminPage';

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
