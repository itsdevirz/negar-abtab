'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_COMPANY_DATA,
  CompanyProfile,
} from './company-data';

interface CompanyContextType {
  data: typeof INITIAL_COMPANY_DATA;
  updateProfile: (updated: Partial<CompanyProfile>) => void;
  toggleSampleNotice: () => void;
  resetToDefaults: () => void;
  exportDataAsJson: () => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  contactPrefillTopic: string;
  setContactPrefillTopic: (topic: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const STORAGE_KEY = 'negar_abtab_company_data_v1';

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<typeof INITIAL_COMPANY_DATA>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // Fallback silently
      }
    }
    return INITIAL_COMPANY_DATA;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [contactPrefillTopic, setContactPrefillTopic] = useState('');

  const saveToStorage = (newData: typeof INITIAL_COMPANY_DATA) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // ignore
    }
  };

  const updateProfile = (updated: Partial<CompanyProfile>) => {
    const newData = {
      ...data,
      profile: {
        ...data.profile,
        ...updated,
      },
    };
    saveToStorage(newData);
  };

  const toggleSampleNotice = () => {
    updateProfile({ isSampleDataNotice: !data.profile.isSampleDataNotice });
  };

  const resetToDefaults = () => {
    setData(INITIAL_COMPANY_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const exportDataAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'negar-abtab-data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <CompanyContext.Provider
      value={{
        data,
        updateProfile,
        toggleSampleNotice,
        resetToDefaults,
        exportDataAsJson,
        isCustomizerOpen,
        setIsCustomizerOpen,
        selectedProjectId,
        setSelectedProjectId,
        contactPrefillTopic,
        setContactPrefillTopic,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
