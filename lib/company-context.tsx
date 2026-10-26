'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_COMPANY_DATA,
  CompanyProfile,
  ProjectItem,
  VideoTutorial,
  ContactInquiry,
  AdminUser,
} from './company-data';
import { formatPersianDate } from './utils';

interface CompanyContextType {
  data: typeof INITIAL_COMPANY_DATA;
  updateProfile: (updated: Partial<CompanyProfile>) => void;
  toggleSampleNotice: () => void;
  resetToDefaults: () => void;
  exportDataAsJson: () => void;
  importDataFromJson: (jsonString: string) => boolean;
  // Video Management
  addVideo: (video: Omit<VideoTutorial, 'id' | 'createdAt' | 'viewsCount'> & { id?: string }) => string;
  updateVideo: (id: string, updated: Partial<VideoTutorial>) => void;
  deleteVideo: (id: string) => void;
  // Project Management
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  // Inquiries / Leads Management
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  // Admin User Management
  addAdmin: (admin: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  updateAdmin: (id: string, updated: Partial<AdminUser>) => void;
  deleteAdmin: (id: string) => boolean;
  validateAdminCredentials: (username: string, password: string) => AdminUser | null;
  // Modals & Selectors
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  contactPrefillTopic: string;
  setContactPrefillTopic: (topic: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const STORAGE_KEY = 'negar_abtab_company_data_v2';

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<typeof INITIAL_COMPANY_DATA>(INITIAL_COMPANY_DATA);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [contactPrefillTopic, setContactPrefillTopic] = useState('');

  // Hydrate from localStorage asynchronously after initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure videos, inquiries, and admins arrays exist if restoring from previous versions
        const merged: typeof INITIAL_COMPANY_DATA = {
          ...INITIAL_COMPANY_DATA,
          ...parsed,
          videos: parsed.videos || INITIAL_COMPANY_DATA.videos,
          inquiries: parsed.inquiries || INITIAL_COMPANY_DATA.inquiries,
          admins: parsed.admins && parsed.admins.length > 0 ? parsed.admins : INITIAL_COMPANY_DATA.admins,
        };
        queueMicrotask(() => {
          setData(merged);
        });
      }
    } catch {
      // Fallback silently
    }
  }, []);

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

  // Video CRUD
  const addVideo = (
    videoInput: Omit<VideoTutorial, 'id' | 'createdAt' | 'viewsCount'> & { id?: string }
  ): string => {
    const videoId = videoInput.id || `vid-${Date.now()}`;
    const newVideo: VideoTutorial = {
      ...videoInput,
      id: videoId,
      createdAt: formatPersianDate(new Date()),
      viewsCount: 1,
    };
    const newData = {
      ...data,
      videos: [newVideo, ...data.videos],
    };
    saveToStorage(newData);
    return videoId;
  };

  const updateVideo = (id: string, updated: Partial<VideoTutorial>) => {
    const newData = {
      ...data,
      videos: data.videos.map((v) => (v.id === id ? { ...v, ...updated } : v)),
    };
    saveToStorage(newData);
  };

  const deleteVideo = (id: string) => {
    const newData = {
      ...data,
      videos: data.videos.filter((v) => v.id !== id),
    };
    saveToStorage(newData);
  };

  // Project CRUD
  const addProject = (projectInput: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...projectInput,
      id: `proj-${Date.now()}`,
    };
    const newData = {
      ...data,
      projects: [newProject, ...data.projects],
    };
    saveToStorage(newData);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    const newData = {
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    };
    saveToStorage(newData);
  };

  const deleteProject = (id: string) => {
    const newData = {
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    };
    saveToStorage(newData);
  };

  // Inquiry CRUD
  const addInquiry = (inquiryInput: Omit<ContactInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryInput,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('fa-IR'),
    };
    const newData = {
      ...data,
      inquiries: [newInquiry, ...data.inquiries],
    };
    saveToStorage(newData);
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    const newData = {
      ...data,
      inquiries: data.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    };
    saveToStorage(newData);
  };

  const deleteInquiry = (id: string) => {
    const newData = {
      ...data,
      inquiries: data.inquiries.filter((inq) => inq.id !== id),
    };
    saveToStorage(newData);
  };

  // Admin User CRUD
  const addAdmin = (adminInput: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const newAdmin: AdminUser = {
      ...adminInput,
      id: `admin-${Date.now()}`,
      createdAt: formatPersianDate(new Date().toISOString()),
    };
    const newData = {
      ...data,
      admins: [newAdmin, ...data.admins],
    };
    saveToStorage(newData);
  };

  const updateAdmin = (id: string, updated: Partial<AdminUser>) => {
    const newData = {
      ...data,
      admins: data.admins.map((adm) => (adm.id === id ? { ...adm, ...updated } : adm)),
    };
    saveToStorage(newData);
  };

  const deleteAdmin = (id: string): boolean => {
    // Prevent deleting primary 'You' default admin
    const target = data.admins.find((a) => a.id === id);
    if (target?.username === 'You' || data.admins.length <= 1) {
      return false;
    }
    const newData = {
      ...data,
      admins: data.admins.filter((adm) => adm.id !== id),
    };
    saveToStorage(newData);
    return true;
  };

  const validateAdminCredentials = (username: string, password: string): AdminUser | null => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // Check in stored admins
    const match = data.admins.find(
      (a) => a.username.toLowerCase() === trimmedUser.toLowerCase() && a.password === trimmedPass
    );

    if (match) return match;

    // Hardcoded fallback for default 'You' / 'You1431569@' credentials
    if (trimmedUser.toLowerCase() === 'you' && trimmedPass === 'You1431569@') {
      return INITIAL_COMPANY_DATA.admins[0];
    }

    return null;
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

  const importDataFromJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile && parsed.services) {
        saveToStorage(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        data,
        updateProfile,
        toggleSampleNotice,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
        addVideo,
        updateVideo,
        deleteVideo,
        addProject,
        updateProject,
        deleteProject,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        validateAdminCredentials,
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
