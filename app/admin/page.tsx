'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompany } from '@/lib/company-context';
import { motion, AnimatePresence } from 'motion/react';
import {
  VideoTutorial,
  ProjectItem,
  ContactInquiry,
  AdminUser,
} from '@/lib/company-data';
import {
  LayoutDashboard,
  Video,
  Briefcase,
  Mail,
  Settings,
  Database,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Download,
  Upload,
  RotateCcw,
  Save,
  ArrowUpLeft,
  X,
  Play,
  FileText,
  PhoneCall,
  Search,
  ExternalLink,
  ShieldCheck,
  UploadCloud,
  Film,
  LogOut,
  Users,
  Key,
  Lock,
  Shield,
  UserCheck,
} from 'lucide-react';
import {
  saveVideoFile,
  deleteVideoFile,
  getVideoBlob,
  uploadVideoToServerHost,
} from '@/lib/video-storage';
import { GooSwitch } from '@/components/ui/goo-switch';
import { FileUpload } from '@/components/ui/file-upload';
import { DeleteButton } from '@/components/ui/delete-button';

export default function AdminPage() {
  const {
    data,
    updateProfile,
    addVideo,
    updateVideo,
    deleteVideo,
    addProject,
    updateProject,
    deleteProject,
    updateInquiryStatus,
    deleteInquiry,
    exportDataAsJson,
    importDataFromJson,
    resetToDefaults,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    validateAdminCredentials,
  } = useCompany();

  // Authentication State
  const [authAdminUser, setAuthAdminUser] = useState<AdminUser | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [loginUsername, setLoginUsername] = useState('You');
  const [loginPassword, setLoginPassword] = useState('You1431569@');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check persisted session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('negar_admin_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.username) {
          queueMicrotask(() => {
            setAuthAdminUser(parsed);
          });
        }
      }
    } catch {
      // ignore
    } finally {
      queueMicrotask(() => {
        setAuthLoaded(true);
      });
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const user = validateAdminCredentials(loginUsername, loginPassword);
    if (user) {
      setAuthAdminUser(user);
      try {
        localStorage.setItem('negar_admin_auth', JSON.stringify(user));
      } catch {
        // ignore
      }
    } else {
      setLoginError('نام کاربری یا رمز عبور اشتباه است. لطفاً اطلاعات واردشده را بررسی فرمایید.');
    }
  };

  const handleLogout = () => {
    setAuthAdminUser(null);
    try {
      localStorage.removeItem('negar_admin_auth');
    } catch {
      // ignore
    }
  };

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'videos' | 'projects' | 'inquiries' | 'settings' | 'backup' | 'admins'
  >('overview');

  // Admin User Management Form State
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [adminFormData, setAdminFormData] = useState<{
    username: string;
    password: string;
    fullName: string;
    role: 'superadmin' | 'editor';
  }>({
    username: '',
    password: '',
    fullName: '',
    role: 'editor',
  });
  const [showAdminPassMap, setShowAdminPassMap] = useState<Record<string, boolean>>({});

  // Notification Banner
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // Video Form Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoFormData, setVideoFormData] = useState<{
    title: string;
    category: VideoTutorial['category'];
    categoryLabel: string;
    duration: string;
    instructor: string;
    videoUrl: string;
    description: string;
    captionText: string;
    featured: boolean;
    accentColor: string;
  }>({
    title: '',
    category: 'automation',
    categoryLabel: 'اتوماسیون صنعتی',
    duration: '۱۰:۰۰',
    instructor: 'مهندس فنی نگار آبتاب آبانگاه',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: '',
    captionText: '',
    featured: false,
    accentColor: '#FFD7F0',
  });

  // Video File Upload & Selected State
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);

  // Project Form Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState<{
    title: string;
    category: ProjectItem['category'];
    categoryLabel: string;
    summary: string;
    year: string;
    clientType: string;
    isSampleData: boolean;
    status: ProjectItem['status'];
    challenge: string;
    solution: string;
    accentColor: string;
  }>({
    title: '',
    category: 'automation',
    categoryLabel: 'اتوماسیون صنعتی',
    summary: '',
    year: '۱۴۰۴',
    clientType: 'صنایع زیرساختی',
    isSampleData: false,
    status: 'در حال بهره‌برداری',
    challenge: '',
    solution: '',
    accentColor: '#B7EFB2',
  });

  // Company Profile Settings Form
  const [profileForm, setProfileForm] = useState({
    companyName: data.profile.companyName,
    brandTitle: data.profile.brandTitle,
    slogan: data.profile.slogan,
    heroHeadline: data.profile.heroHeadline,
    heroSubheadline: data.profile.heroSubheadline,
    heroDescription: data.profile.heroDescription,
    aboutIntro: data.profile.aboutIntro,
    mission: data.profile.mission,
    vision: data.profile.vision,
    phone: data.profile.phone,
    mobile: data.profile.mobile,
    email: data.profile.email,
    address: data.profile.address,
    workingHours: data.profile.workingHours,
    isSampleDataNotice: data.profile.isSampleDataNotice,
    years: data.profile.stats.years,
    projects: data.profile.stats.projects,
    clients: data.profile.stats.clients,
    domains: data.profile.stats.domains || 4,
    engineers: data.profile.stats.engineers,
  });

  // Dedicated Stats Form for Quick Indicators Management (Moved from public home)
  const [statsForm, setStatsForm] = useState({
    years: data.profile.stats.years,
    projects: data.profile.stats.projects,
    clients: data.profile.stats.clients,
    domains: data.profile.stats.domains || 4,
    engineers: data.profile.stats.engineers,
    isSampleDataNotice: data.profile.isSampleDataNotice,
  });

  const handleSaveStats = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateProfile({
      ...data.profile,
      isSampleDataNotice: statsForm.isSampleDataNotice,
      stats: {
        years: Number(statsForm.years),
        projects: Number(statsForm.projects),
        clients: Number(statsForm.clients),
        domains: Number(statsForm.domains) || 4,
        engineers: Number(statsForm.engineers),
      },
    });
    setProfileForm((prev) => ({
      ...prev,
      years: Number(statsForm.years),
      projects: Number(statsForm.projects),
      clients: Number(statsForm.clients),
      domains: Number(statsForm.domains) || 4,
      engineers: Number(statsForm.engineers),
      isSampleDataNotice: statsForm.isSampleDataNotice,
    }));
    showNotice('شاخص‌های بنیادین عملکرد و ظرفیت‌های اجرایی با موفقیت در سایت به‌روزرسانی شد.');
  };

  // JSON Import Textarea
  const [importJsonText, setImportJsonText] = useState('');

  // Open Add Video Modal

  const handleOpenAddVideo = () => {
    setEditingVideoId(null);
    setSelectedVideoFile(null);
    setVideoPreviewUrl('');
    setFileDetails(null);
    setVideoFormData({
      title: '',
      category: 'automation',
      categoryLabel: 'اتوماسیون صنعتی',
      duration: 'در انتظار انتخاب فایل ویدئو...',
      instructor: 'مهندس فنی نگار آبتاب آبانگاه',
      videoUrl: '',
      description: '',
      captionText: '',
      featured: false,
      accentColor: '#FFD7F0',
    });
    setVideoModalOpen(true);
  };

  const handleOpenEditVideo = async (vid: VideoTutorial) => {
    setEditingVideoId(vid.id);
    setSelectedVideoFile(null);
    setFileDetails(null);

    // If locally saved video blob exists in IndexedDB, load it
    try {
      const blob = await getVideoBlob(vid.id);
      if (blob) {
        const objUrl = URL.createObjectURL(blob);
        setVideoPreviewUrl(objUrl);
        setFileDetails({
          name: `فایل ذخیره‌شده ویدئو (${vid.title})`,
          size: (blob.size / (1024 * 1024)).toFixed(1) + ' مگابایت',
        });
      } else {
        setVideoPreviewUrl(vid.videoUrl);
      }
    } catch {
      setVideoPreviewUrl(vid.videoUrl);
    }

    setVideoFormData({
      title: vid.title,
      category: vid.category,
      categoryLabel: vid.categoryLabel,
      duration: vid.duration,
      instructor: vid.instructor,
      videoUrl: vid.videoUrl,
      description: vid.description,
      captionText: vid.captionText,
      featured: vid.featured,
      accentColor: vid.accentColor,
    });
    setVideoModalOpen(true);
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFormData.title.trim()) {
      alert('لطفاً عنوان ویدئوی آموزشی را وارد فرمایید.');
      return;
    }

    if (!editingVideoId && !selectedVideoFile) {
      alert('لطفاً یک فایل ویدئویی را جهت بارگذاری انتخاب نمایید.');
      return;
    }

    const videoId = editingVideoId || `vid-${Date.now()}`;
    let finalVideoUrl = videoFormData.videoUrl;

    // If a new video file was uploaded, save it to server host (/api/upload) & IndexedDB
    if (selectedVideoFile) {
      const serverHostUrl = await uploadVideoToServerHost(selectedVideoFile);
      if (serverHostUrl) {
        finalVideoUrl = serverHostUrl;
      } else if (videoPreviewUrl) {
        finalVideoUrl = videoPreviewUrl;
      }
      await saveVideoFile(videoId, selectedVideoFile);
    }

    if (editingVideoId) {
      updateVideo(editingVideoId, {
        ...videoFormData,
        videoUrl: finalVideoUrl,
      });
      showNotice('ویدئوی آموزشی با موفقیت در هاست و دیتابیس سیستم به‌روزرسانی شد.');
    } else {
      addVideo({
        ...videoFormData,
        id: videoId,
        videoUrl:
          finalVideoUrl ||
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      });
      showNotice('ویدئوی آموزشی جدید با موفقیت روی هاست آپلود و ذخیره گردید.');
    }
    setVideoModalOpen(false);
    setSelectedVideoFile(null);
    setVideoPreviewUrl('');
    setFileDetails(null);
  };

  const handleDeleteVideo = async (id: string, title: string) => {
    if (confirm(`آیا از حذف ویدئوی «${title}» اطمینان دارید؟`)) {
      deleteVideo(id);
      await deleteVideoFile(id);
      showNotice('ویدئو با موفقیت حذف شد.');
    }
  };

  // Project Handlers
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectFormData({
      title: '',
      category: 'automation',
      categoryLabel: 'اتوماسیون صنعتی',
      summary: '',
      year: '۱۴۰۴',
      clientType: 'صنایع آب و انرژی',
      isSampleData: false,
      status: 'در حال بهره‌برداری',
      challenge: '',
      solution: '',
      accentColor: '#B7EFB2',
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj: ProjectItem) => {
    setEditingProjectId(proj.id);
    setProjectFormData({
      title: proj.title,
      category: proj.category,
      categoryLabel: proj.categoryLabel,
      summary: proj.summary,
      year: proj.year,
      clientType: proj.clientType,
      isSampleData: proj.isSampleData,
      status: proj.status,
      challenge: proj.challenge,
      solution: proj.solution,
      accentColor: proj.accentColor,
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) {
      alert('لطفاً نام پروژه را وارد فرمایید.');
      return;
    }

    if (editingProjectId) {
      updateProject(editingProjectId, projectFormData);
      showNotice('مشخصات پروژه با موفقیت ویرایش شد.');
    } else {
      addProject({
        ...projectFormData,
        impactMetrics: [
          { label: 'راندمان پایش', value: '۹۹.۴٪' },
          { label: 'کاهش اتلاف', value: '۲۵٪' },
        ],
        specs: [
          { title: 'پروتکل', value: 'استاندارد صنعتی' },
          { title: 'معماری کنترل', value: 'یکپارچه متمرکز' },
        ],
      });
      showNotice('پروژه جدید به آرشیو نمونه‌کارهای شرکت افزوده شد.');
    }
    setProjectModalOpen(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`آیا از حذف پروژه «${title}» مطمئن هستید؟`)) {
      deleteProject(id);
      showNotice('پروژه با موفقیت حذف شد.');
    }
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      companyName: profileForm.companyName,
      brandTitle: profileForm.brandTitle,
      slogan: profileForm.slogan,
      heroHeadline: profileForm.heroHeadline,
      heroSubheadline: profileForm.heroSubheadline,
      heroDescription: profileForm.heroDescription,
      aboutIntro: profileForm.aboutIntro,
      mission: profileForm.mission,
      vision: profileForm.vision,
      phone: profileForm.phone,
      mobile: profileForm.mobile,
      email: profileForm.email,
      address: profileForm.address,
      workingHours: profileForm.workingHours,
      isSampleDataNotice: profileForm.isSampleDataNotice,
      stats: {
        years: Number(profileForm.years),
        projects: Number(profileForm.projects),
        clients: Number(profileForm.clients),
        domains: Number(profileForm.domains) || 4,
        engineers: Number(profileForm.engineers),
      },
    });
    setStatsForm({
      years: Number(profileForm.years),
      projects: Number(profileForm.projects),
      clients: Number(profileForm.clients),
      domains: Number(profileForm.domains) || 4,
      engineers: Number(profileForm.engineers),
      isSampleDataNotice: profileForm.isSampleDataNotice,
    });
    showNotice('تنظیمات و اطلاعات کلی شرکت با موفقیت ذخیره گردید.');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataFromJson(importJsonText);
    if (ok) {
      showNotice('داده‌ها با موفقیت از فایل JSON وارد و جایگزین شدند.');
      setImportJsonText('');
    } else {
      alert('فرمت فایل JSON نامعتبر است یا ساختار استانداردی ندارد.');
    }
  };

  // Admin User Handlers
  const handleOpenAddAdmin = () => {
    setEditingAdminId(null);
    setAdminFormData({
      username: '',
      password: '',
      fullName: '',
      role: 'editor',
    });
    setAdminModalOpen(true);
  };

  const handleOpenEditAdmin = (adminUser: AdminUser) => {
    setEditingAdminId(adminUser.id);
    setAdminFormData({
      username: adminUser.username,
      password: adminUser.password,
      fullName: adminUser.fullName,
      role: adminUser.role,
    });
    setAdminModalOpen(true);
  };

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminFormData.username.trim() || !adminFormData.password.trim()) {
      alert('لطفاً نام کاربری و رمز عبور را وارد فرمایید.');
      return;
    }

    if (editingAdminId) {
      updateAdmin(editingAdminId, adminFormData);
      showNotice(`مشخصات مدیر «${adminFormData.fullName || adminFormData.username}» به‌روزرسانی شد.`);
    } else {
      addAdmin(adminFormData);
      showNotice(`حساب مدیر جدید «${adminFormData.fullName || adminFormData.username}» با موفقیت تعریف گردید.`);
    }
    setAdminModalOpen(false);
  };

  const handleDeleteAdminUser = (id: string, name: string) => {
    if (confirm(`آیا از حذف حساب مدیریت «${name}» اطمینان دارید؟`)) {
      const ok = deleteAdmin(id);
      if (ok) {
        showNotice(`حساب مدیر «${name}» با موفقیت حذف شد.`);
      } else {
        alert('حساب ادمین اصلی (You) یا تنها ادمین سیستم قابل حذف نمی‌باشد.');
      }
    }
  };

  const newInquiriesCount = data.inquiries.filter((i) => i.status === 'new').length;

  // Render Login Gate Screen if NOT Authenticated
  if (!authLoaded) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6 text-white font-mono text-xs">
        در حال بررسی سطح دسترسی مدیریت...
      </div>
    );
  }

  if (!authAdminUser) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 sm:p-6 text-white dir-rtl relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e8400d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#1a1918] border border-[rgba(255,255,255,0.12)] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-2 shadow-inner">
              <Image
                src={data.profile.logoUrl || '/assets/aistudio/file_00000000c9e481f4872f5bd5f71094a4_1__c7980156.png'}
                alt={data.profile.companyName}
                width={56}
                height={56}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-[#e8400d] uppercase tracking-wider block">
                سامانه اتوماسیون و مدیریت ارشد
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                ورود به پنل مدیریت {data.profile.companyName}
              </h1>
            </div>
          </div>

          {/* Credentials Info Box */}
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1">
            <div className="flex items-center justify-between text-[#FFEF99] font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#e8400d]" />
                اطلاعات ورود ادمین پیش‌فرض:
              </span>
              <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded">SuperAdmin</span>
            </div>
            <div className="text-[11px] text-[#c5c4c1] pt-1 space-y-0.5 font-mono" dir="ltr">
              <div>نام کاربری (Username): <strong className="text-white">You</strong></div>
              <div>رمز عبور (Password): <strong className="text-white">You1431569@</strong></div>
            </div>
          </div>

          {/* Error Message Banner */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/15 border border-red-500/30 text-red-300 rounded-xl text-xs flex items-center gap-2"
            >
              <X className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#c5c4c1] mb-1.5">
                نام کاربری (Username)
              </label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="You"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-[#e8400d] text-white rounded-xl focus:outline-hidden font-mono text-sm pl-10"
                  required
                />
                <Lock className="w-4 h-4 text-[#6D6C6B] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c5c4c1] mb-1.5">
                رمز عبور (Password)
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  dir="ltr"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="You1431569@"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-[#e8400d] text-white rounded-xl focus:outline-hidden font-mono text-sm pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute left-3 top-3 text-[#6D6C6B] hover:text-white transition-colors"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Key className="w-4 h-4 text-[#6D6C6B] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#e8400d] hover:bg-[#d0380a] active:bg-[#b83008] text-white font-bold text-xs rounded-xl transition-all shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>ورود به پنل مدیریت</span>
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-2 text-center border-t border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#a6a5a2] hover:text-white transition-colors"
            >
              <ArrowUpLeft className="w-3.5 h-3.5" />
              <span>انصراف و بازگشت به صفحه اصلی سایت</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F3] pb-24">
      {/* Top Admin Bar */}
      <div className="bg-[#111111] text-white py-4 px-4 sm:px-8 border-b border-[#272625] sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
              <Image
                src="/assets/aistudio/file_00000000c9e481f4872f5bd5f71094a4_1__c7980156.png"
                alt="لوگوی شرکت نگار آبتاب آبانگاه"
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold">
                  پنل مدیریت پیشرفته نگار آبتاب آبانگاه
                </h1>
                <span className="px-2 py-0.5 text-[10px] bg-[#e8400d] text-white rounded-md font-mono font-bold">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-[#a6a5a2]">
                مدیریت زنده محتوای سایت، ویدئوهای آموزشی، پروژه‌ها و استعلام‌های دریافتی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs hidden sm:block">
              <span className="font-bold text-white block">{authAdminUser.fullName}</span>
              <span className="text-[10px] text-[#a6a5a2]">
                نقش: {authAdminUser.role === 'superadmin' ? 'مدیر ارشد' : 'ویرایشگر'} ({authAdminUser.username})
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold rounded-xl border border-red-500/30 transition-colors flex items-center gap-1.5 shrink-0"
              title="خروج از حساب مدیریت"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-100 rounded-lg transition-colors shadow-2xs"
            >
              <span>مشاهده سایت</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Notice Toast */}
      {notice && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div className="p-3.5 bg-emerald-500 text-white rounded-xl shadow-md text-xs sm:text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{notice}</span>
          </div>
        </div>
      )}

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[rgba(17,17,17,0.08)] p-3 space-y-1 shadow-2xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575655] hover:bg-[#F6F5F3] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>داشبورد کلی</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'videos'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575655] hover:bg-[#F6F5F3] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-[#e8400d]" />
                <span>ویدئوهای آموزشی و کپشن‌ها</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/20">
                {data.videos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575655] hover:bg-[#F6F5F3] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>مدیریت پروژه‌ها</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/20">
                {data.projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'inquiries'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575655] hover:bg-[#F6F5F3] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>استعلام‌ها و پیام‌ها</span>
              </div>
              {newInquiriesCount > 0 && (
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[#e8400d] text-white">
                  {newInquiriesCount} جدید
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575655] hover:bg-[#F6F5F3] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>مشخصات شرکت و تماس</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'backup'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575655] hover:bg-[#F6F5F3] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-amber-600" />
                <span>پشتیبان‌گیری و خروجی</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('admins')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'admins'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#575655] hover:bg-[#F6F5F3] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-purple-600" />
                <span>مدیریت مدیران و دسترسی‌ها</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/20">
                {data.admins.length}
              </span>
            </button>
          </div>

          {/* Main Workspace Area */}
          <div className="lg:col-span-9 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="space-y-6"
              >
                {/* ==============================================================
                    TAB 1: OVERVIEW DASHBOARD
                ============================================================== */}
                {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#575655]">ویدئوهای آموزشی</span>
                      <Video className="w-4 h-4 text-[#e8400d]" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#111111] block" dir="ltr">
                      {data.videos.length}
                    </span>
                    <button
                      onClick={() => setActiveTab('videos')}
                      className="text-[11px] text-[#e8400d] hover:underline"
                    >
                      مدیریت و افزودن ویدئو ←
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#575655]">پروژه‌های ثبت‌شده</span>
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#111111] block" dir="ltr">
                      {data.projects.length}
                    </span>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-[11px] text-emerald-600 hover:underline"
                    >
                      ویرایش سوابق و پروژه‌ها ←
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#575655]">پیام‌ها و استعلام‌ها</span>
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#111111] block" dir="ltr">
                      {data.inquiries.length}
                    </span>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-[11px] text-blue-600 hover:underline"
                    >
                      مشاهده صندوق پیام‌ها ←
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#575655]">سابقه فعالیت</span>
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#111111] block" dir="ltr">
                      +{data.profile.stats.years} سال
                    </span>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="text-[11px] text-amber-600 hover:underline"
                    >
                      تنظیم شاخص‌ها ←
                    </button>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-[#111111]">
                    عملیات سریع مدیریتی
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={handleOpenAddVideo}
                      className="p-4 rounded-xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3] hover:bg-[#eceae6] transition-colors flex items-center gap-3 text-right"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#FFD7F0] flex items-center justify-center shrink-0">
                        <Plus className="w-5 h-5 text-[#111111]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#111111] block">
                          افزودن ویدئو آموزشی جدید
                        </span>
                        <span className="text-[11px] text-[#6D6C6B] block">
                          همراه با کپشن و ترنسکریپت
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={handleOpenAddProject}
                      className="p-4 rounded-xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3] hover:bg-[#eceae6] transition-colors flex items-center gap-3 text-right"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#B7EFB2] flex items-center justify-center shrink-0">
                        <Plus className="w-5 h-5 text-[#111111]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#111111] block">
                          ثبت پروژه یا نمونه‌کار
                        </span>
                        <span className="text-[11px] text-[#6D6C6B] block">
                          مشخصات فنی و چالش/راهکار
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={exportDataAsJson}
                      className="p-4 rounded-xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3] hover:bg-[#eceae6] transition-colors flex items-center gap-3 text-right"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#FFEF99] flex items-center justify-center shrink-0">
                        <Download className="w-5 h-5 text-[#111111]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#111111] block">
                          خروجی کامل پشتیبان
                        </span>
                        <span className="text-[11px] text-[#6D6C6B] block">
                          دانلود فایل JSON محتوا
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Stats & Operational Indicators Management Card (Moved from HomePage Section 3) */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(17,17,17,0.06)] gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e8400d]" />
                        <h3 className="text-base font-bold text-[#111111]">
                          مدیریت شاخص‌های بنیادین عملکرد و ظرفیت‌های اجرایی (ارقام صفحه اصلی)
                        </h3>
                      </div>
                      <p className="text-xs text-[#575655] mt-1">
                        ویرایش مستقیم آمار عددی و ظرفیت‌های نمایش‌داده‌شده در بخش شاخص‌های صفحه اصلی سایت
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#6D6C6B] bg-[#F6F5F3] px-2.5 py-1 rounded-md border border-[rgba(17,17,17,0.06)] self-start sm:self-auto">
                      {data.profile.isSampleDataNotice ? 'حالت پیش‌نمایش / قابل ویرایش' : 'تاییدشده رسمی'}
                    </span>
                  </div>

                  <form onSubmit={handleSaveStats} className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="p-3 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1.5">
                        <label className="block text-[11px] font-bold text-[#111111]">
                          سال‌های سابقه تخصصی
                        </label>
                        <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-[rgba(17,17,17,0.1)]">
                          <span className="text-xs text-[#6D6C6B] font-mono">+</span>
                          <input
                            type="number"
                            min="1"
                            value={statsForm.years}
                            onChange={(e) =>
                              setStatsForm({ ...statsForm, years: Number(e.target.value) })
                            }
                            className="w-full text-xs font-mono font-bold text-[#111111] focus:outline-hidden"
                            required
                          />
                          <span className="text-[10px] text-[#6D6C6B]">سال</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1.5">
                        <label className="block text-[11px] font-bold text-[#111111]">
                          پروژه‌های پیاده‌سازی‌شده
                        </label>
                        <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-[rgba(17,17,17,0.1)]">
                          <span className="text-xs text-[#6D6C6B] font-mono">+</span>
                          <input
                            type="number"
                            min="0"
                            value={statsForm.projects}
                            onChange={(e) =>
                              setStatsForm({ ...statsForm, projects: Number(e.target.value) })
                            }
                            className="w-full text-xs font-mono font-bold text-[#111111] focus:outline-hidden"
                            required
                          />
                          <span className="text-[10px] text-[#6D6C6B]">پروژه</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1.5">
                        <label className="block text-[11px] font-bold text-[#111111]">
                          کارفرما و همکار صنعتی
                        </label>
                        <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-[rgba(17,17,17,0.1)]">
                          <span className="text-xs text-[#6D6C6B] font-mono">+</span>
                          <input
                            type="number"
                            min="0"
                            value={statsForm.clients}
                            onChange={(e) =>
                              setStatsForm({ ...statsForm, clients: Number(e.target.value) })
                            }
                            className="w-full text-xs font-mono font-bold text-[#111111] focus:outline-hidden"
                            required
                          />
                          <span className="text-[10px] text-[#6D6C6B]">مجموعه</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1.5">
                        <label className="block text-[11px] font-bold text-[#111111]">
                          دپارتمان‌های تخصصی
                        </label>
                        <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-[rgba(17,17,17,0.1)]">
                          <input
                            type="number"
                            min="1"
                            value={statsForm.domains}
                            onChange={(e) =>
                              setStatsForm({ ...statsForm, domains: Number(e.target.value) })
                            }
                            className="w-full text-xs font-mono font-bold text-[#111111] focus:outline-hidden"
                            required
                          />
                          <span className="text-[10px] text-[#6D6C6B]">واحد</span>
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-1 p-3 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-1.5">
                        <label className="block text-[11px] font-bold text-[#111111]">
                          مهندسان و کارشناسان
                        </label>
                        <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-[rgba(17,17,17,0.1)]">
                          <span className="text-xs text-[#6D6C6B] font-mono">+</span>
                          <input
                            type="number"
                            min="1"
                            value={statsForm.engineers}
                            onChange={(e) =>
                              setStatsForm({ ...statsForm, engineers: Number(e.target.value) })
                            }
                            className="w-full text-xs font-mono font-bold text-[#111111] focus:outline-hidden"
                            required
                          />
                          <span className="text-[10px] text-[#6D6C6B]">نفر</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="flex-1 max-w-xl">
                        <GooSwitch
                          checked={statsForm.isSampleDataNotice}
                          onCheckedChange={(val) =>
                            setStatsForm({ ...statsForm, isSampleDataNotice: val })
                          }
                          label="نشان وضعیت شفافیت داده‌های شرکت"
                          description="نمایش برچسب رسمی داده‌های اولیه/تاییدشده در پروفایل شرکت"
                          size="sm"
                          badge="Goo Switch"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href="/"
                          target="_blank"
                          className="px-3.5 py-2 text-xs font-semibold text-[#111111] bg-[#F6F5F3] hover:bg-[#eceae6] border border-[rgba(17,17,17,0.08)] rounded-xl transition-colors inline-flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>مشاهده در صفحه اصلی</span>
                        </Link>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-bold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs inline-flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>ذخیره تغییرات شاخص‌ها</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Latest Inquiries Preview */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#111111]">
                      آخرین پیام‌ها و استعلام‌های رسیده
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-[#e8400d] hover:underline"
                    >
                      مشاهده همه ({data.inquiries.length})
                    </button>
                  </div>

                  <div className="divide-y divide-[rgba(17,17,17,0.06)]">
                    {data.inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#111111]">{inq.fullName}</span>
                            <span className="text-[11px] text-[#6D6C6B]">
                              ({inq.company || 'شخصی'})
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-sm font-semibold ${
                                inq.status === 'new'
                                  ? 'bg-red-50 text-red-700'
                                  : inq.status === 'in_progress'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-emerald-50 text-emerald-700'
                              }`}
                            >
                              {inq.status === 'new'
                                ? 'جدید'
                                : inq.status === 'in_progress'
                                ? 'در حال بررسی'
                                : 'رسیدگی‌شده'}
                            </span>
                          </div>
                          <p className="text-xs text-[#575655] line-clamp-1">{inq.subject}</p>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-[11px] font-mono text-[#6D6C6B] block" dir="ltr">
                            {inq.phone}
                          </span>
                          <span className="text-[10px] text-[#a6a5a2] block">{inq.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                TAB 2: VIDEOS & CAPTIONS MANAGEMENT
            ============================================================== */}
            {activeTab === 'videos' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(17,17,17,0.06)]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111]">
                      مدیریت ویدئوهای آموزشی و کپشن‌ها
                    </h3>
                    <p className="text-xs text-[#575655] mt-0.5">
                      افزودن، ویرایش و تنظیم رونوشت‌های متنی و کپشن کارگاه‌های مهندسی
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddVideo}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن ویدئو جدید</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="p-5 rounded-xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3]/60 hover:bg-[#F6F5F3] transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold text-[#e8400d]">
                              {vid.categoryLabel}
                            </span>
                            <span aria-hidden="true" className="text-[#6D6C6B]">
                              ·
                            </span>
                            <span className="text-[#6D6C6B]">مدت: {vid.duration}</span>
                            <span aria-hidden="true" className="text-[#6D6C6B]">
                              ·
                            </span>
                            <span className="text-[#6D6C6B]">مدرس: {vid.instructor}</span>
                          </div>
                          <h4 className="text-base font-bold text-[#111111]">{vid.title}</h4>
                          <p className="text-xs text-[#575655] line-clamp-2">{vid.description}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenEditVideo(vid)}
                            className="p-2 text-[#575655] hover:text-[#111111] hover:bg-white rounded-xl transition-colors border border-[rgba(17,17,17,0.08)] shadow-2xs"
                            title="ویرایش ویدئو و کپشن"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <DeleteButton
                            onDelete={async () => {
                              deleteVideo(vid.id);
                              await deleteVideoFile(vid.id);
                              showNotice(`ویدئوی «${vid.title}» با موفقیت حذف شد.`);
                            }}
                            itemTitle={vid.title}
                            size="sm"
                          />
                        </div>
                      </div>

                      {/* Caption Preview Box */}
                      {vid.captionText && (
                        <div className="p-3 bg-white rounded-lg border border-[rgba(17,17,17,0.06)] text-xs text-[#272625] space-y-1">
                          <span className="text-[11px] font-semibold text-[#111111] flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-[#e8400d]" />
                            متن کپشن و زیرنویس فعال:
                          </span>
                          <p className="text-[#575655] leading-relaxed line-clamp-2">
                            {vid.captionText}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==============================================================
                TAB 3: PROJECTS MANAGEMENT
            ============================================================== */}
            {activeTab === 'projects' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(17,17,17,0.06)]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111]">
                      مدیریت پروژه‌ها و نمونه‌کارها
                    </h3>
                    <p className="text-xs text-[#575655] mt-0.5">
                      ثبت پروژه‌های جدید، به‌روزرسانی مشخصات فنی و مدیریت وضعیت اجرایی
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ثبت پروژه جدید</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3]/50 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#6D6C6B]">
                          <span className="font-semibold text-[#111111]">{proj.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>سال: {proj.year}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                            {proj.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#111111]">{proj.title}</h4>
                        <p className="text-xs text-[#575655] line-clamp-1">{proj.summary}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditProject(proj)}
                          className="p-2 text-[#575655] hover:text-[#111111] hover:bg-white rounded-lg transition-colors border border-[rgba(17,17,17,0.06)]"
                          title="ویرایش پروژه"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <DeleteButton
                          onDelete={() => {
                            handleDeleteProject(proj.id, proj.title);
                          }}
                          itemTitle={proj.title}
                          size="sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==============================================================
                TAB 4: INQUIRIES & LEADS INBOX
            ============================================================== */}
            {activeTab === 'inquiries' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6">
                <div className="pb-4 border-b border-[rgba(17,17,17,0.06)]">
                  <h3 className="text-lg font-bold text-[#111111]">
                    صندوق استعلام‌ها و درخواست‌های ارسالی کاربران
                  </h3>
                  <p className="text-xs text-[#575655] mt-0.5">
                    پیام‌هایی که از طریق فرم تماس رسمی سایت ارسال شده‌اند.
                  </p>
                </div>

                {data.inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {data.inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3]/50 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-[#111111]">
                                {inq.fullName}
                              </span>
                              {inq.company && (
                                <span className="text-xs text-[#6D6C6B]">({inq.company})</span>
                              )}
                              <span className="font-mono text-xs font-bold text-[#e8400d] bg-white px-2 py-0.5 rounded-md border border-[rgba(17,17,17,0.06)]">
                                {inq.trackingId}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-semibold text-[#111111]">
                              موضوع: {inq.subject}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                updateInquiryStatus(
                                  inq.id,
                                  e.target.value as ContactInquiry['status']
                                )
                              }
                              className="px-2.5 py-1.5 bg-white border border-[rgba(17,17,17,0.12)] rounded-lg text-xs font-medium focus:outline-hidden"
                            >
                              <option value="new">🔴 پیام جدید</option>
                              <option value="in_progress">🟡 در حال بررسی</option>
                              <option value="reviewed">🟢 رسیدگی‌شده</option>
                              <option value="closed">⚪ بایگانی‌شده</option>
                            </select>

                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                              title="حذف پیام"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Message Body */}
                        <div className="p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)] text-xs sm:text-sm text-[#272625] leading-relaxed">
                          {inq.message}
                        </div>

                        {/* Contact details footer */}
                        <div className="flex items-center justify-between text-xs text-[#6D6C6B] flex-wrap gap-2 pt-1">
                          <div className="flex items-center gap-4">
                            <a
                              href={`tel:${inq.phone.replace(/[^0-9]/g, '')}`}
                              className="flex items-center gap-1 font-mono font-bold text-[#111111] hover:text-[#e8400d]"
                              dir="ltr"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>{inq.phone}</span>
                            </a>
                            {inq.email && (
                              <span className="font-mono text-[#575655]" dir="ltr">
                                {inq.email}
                              </span>
                            )}
                          </div>
                          <span>تاریخ ثبت: {inq.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-[#6D6C6B]">
                    هنوز پیامی در صندوق دریافت ثبت نشده است.
                  </div>
                )}
              </div>
            )}

            {/* ==============================================================
                TAB 5: COMPANY PROFILE & SETTINGS
            ============================================================== */}
            {activeTab === 'settings' && (
              <form
                onSubmit={handleSaveProfile}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6"
              >
                <div className="pb-4 border-b border-[rgba(17,17,17,0.06)] flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111]">
                      تنظیمات عمومی شرکت و اطلاعات تماس
                    </h3>
                    <p className="text-xs text-[#575655] mt-0.5">
                      ویرایش عناوین، تلفن‌ها، آدرس و متون بیانیه مأموریت و ارزش‌ها
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>ذخیره تغییرات</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      نام رسمی شرکت
                    </label>
                    <input
                      type="text"
                      value={profileForm.companyName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, companyName: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      شعار سازمانی
                    </label>
                    <input
                      type="text"
                      value={profileForm.slogan}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, slogan: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      تیتر شاخص هیرو
                    </label>
                    <input
                      type="text"
                      value={profileForm.heroHeadline}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, heroHeadline: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      تیتر مکمل هیرو
                    </label>
                    <input
                      type="text"
                      value={profileForm.heroSubheadline}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, heroSubheadline: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-medium text-[#575655] mb-1">
                      توضیحات معرفی صفحه نخست
                    </label>
                    <textarea
                      rows={3}
                      value={profileForm.heroDescription}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, heroDescription: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      تلفن ثابت
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 font-mono text-left border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      همراه / پیام‌رسان
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={profileForm.mobile}
                      onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                      className="w-full px-3 py-2 font-mono text-left border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      ایمیل رسمی
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 font-mono text-left border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#575655] mb-1">
                      ساعات کاری
                    </label>
                    <input
                      type="text"
                      value={profileForm.workingHours}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, workingHours: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-medium text-[#575655] mb-1">
                      نشانی دفتر مرکزی
                    </label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Numerical Statistics */}
                <div className="pt-4 border-t border-[rgba(17,17,17,0.06)] space-y-3">
                  <h4 className="text-xs font-bold text-[#111111]">
                    آمار و ارقام عددی نمایش‌داده‌شده (شاخص‌های صفحه اصلی)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-[#575655] mb-1">سال‌های سابقه</label>
                      <input
                        type="number"
                        value={profileForm.years}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, years: Number(e.target.value) })
                        }
                        className="w-full px-2.5 py-1.5 border rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#575655] mb-1">تعداد پروژه‌ها</label>
                      <input
                        type="number"
                        value={profileForm.projects}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, projects: Number(e.target.value) })
                        }
                        className="w-full px-2.5 py-1.5 border rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#575655] mb-1">تعداد کارفرمایان</label>
                      <input
                        type="number"
                        value={profileForm.clients}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, clients: Number(e.target.value) })
                        }
                        className="w-full px-2.5 py-1.5 border rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#575655] mb-1">دپارتمان‌های تخصصی</label>
                      <input
                        type="number"
                        value={profileForm.domains}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, domains: Number(e.target.value) })
                        }
                        className="w-full px-2.5 py-1.5 border rounded-lg font-mono"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[11px] text-[#575655] mb-1">تعداد مهندسان</label>
                      <input
                        type="number"
                        value={profileForm.engineers}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, engineers: Number(e.target.value) })
                        }
                        className="w-full px-2.5 py-1.5 border rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <GooSwitch
                      checked={profileForm.isSampleDataNotice}
                      onCheckedChange={(val) =>
                        setProfileForm({ ...profileForm, isSampleDataNotice: val })
                      }
                      label="نمایش نشان داده‌های اولیه/تاییدشده در پروفایل شرکت"
                      description="اعمال برچسب شفافیت داده‌ها در سربرگ و مشخصات شرکت"
                      size="sm"
                      badge="Goo Switch"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(17,17,17,0.06)]">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>ذخیره کلیه اطلاعات</span>
                  </button>
                </div>
              </form>
            )}

            {/* ==============================================================
                TAB 6: BACKUP & RESTORE
            ============================================================== */}
            {activeTab === 'backup' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6">
                <div className="pb-4 border-b border-[rgba(17,17,17,0.06)]">
                  <h3 className="text-lg font-bold text-[#111111]">
                    پشتیبان‌گیری، خروجی و بازیابی اطلاعات
                  </h3>
                  <p className="text-xs text-[#575655] mt-0.5">
                    ذخیره دائمی تنظیمات و بازگردانی سریع کلیه پروژه‌ها و ویدیوها
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Export Box */}
                  <div className="p-5 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-3">
                    <h4 className="font-bold text-[#111111] flex items-center gap-2">
                      <Download className="w-4 h-4 text-[#e8400d]" />
                      <span>دانلود فایل پشتیبان کامل (JSON)</span>
                    </h4>
                    <p className="text-[#575655] leading-relaxed">
                      یک نسخه کامل از پروفایل شرکت، آرشیو پروژه‌ها، کلیه ویدئوهای آموزشی و کپشن‌ها در قالب یک فایل استاندارد دریافت کنید.
                    </p>
                    <button
                      onClick={exportDataAsJson}
                      className="px-4 py-2 bg-[#111111] text-white font-semibold rounded-lg hover:bg-[#272625] transition-colors"
                    >
                      دانلود فایل JSON
                    </button>
                  </div>

                  {/* Reset Box */}
                  <div className="p-5 bg-red-50/50 rounded-xl border border-red-200 space-y-3">
                    <h4 className="font-bold text-red-900 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-red-600" />
                      <span>بازنشانی به تنظیمات اولیه کارخانه</span>
                    </h4>
                    <p className="text-red-700 leading-relaxed">
                      در صورت بروز هرگونه مشکل یا نیاز به بازگرداندن داده‌های پیش‌فرض اولیه، می‌توانید حافظه مرورگر را بازنشانی کنید.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('آیا مطمئن هستید؟ تمامی تغییرات شخصی‌سازی شده پاک خواهد شد.')) {
                          resetToDefaults();
                          showNotice('داده‌ها به حالت پیش‌فرض اولیه بازنشانی شدند.');
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      بازنشانی پیش‌فرض
                    </button>
                  </div>
                </div>

                {/* Import Box */}
                <div className="p-5 bg-[#F6F5F3] rounded-xl border border-[rgba(17,17,17,0.06)] space-y-3">
                  <h4 className="text-xs font-bold text-[#111111] flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#111111]" />
                    <span>بارگذاری و ایمپورت داده‌ها از فایل JSON</span>
                  </h4>
                  <p className="text-xs text-[#575655]">
                    محتوای متنی فایل پشتیبان JSON قبلی را در کادر زیر قرار دهید و دکمه اعمال را بزنید:
                  </p>
                  <textarea
                    rows={4}
                    placeholder="{ ... }"
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="w-full p-3 font-mono text-xs bg-white border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden"
                  />
                  <button
                    onClick={handleImportJson}
                    className="px-4 py-2 bg-[#111111] text-white font-semibold rounded-lg hover:bg-[#272625] transition-colors text-xs"
                  >
                    اعمال و بازنشانی از JSON
                  </button>
                </div>
              </div>
            )}

            {/* ==============================================================
                TAB 7: ADMIN USERS & CREDENTIALS MANAGEMENT
            ============================================================== */}
            {activeTab === 'admins' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(17,17,17,0.06)]">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111]">
                      مدیریت حساب‌های مدیران و سطوح دسترسی
                    </h3>
                    <p className="text-xs text-[#575655] mt-0.5">
                      تعریف مدیران جدید، ویرایش کلمه عبور و مدیریت مجوزهای ورود به پنل اتوماسیون
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddAdmin}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>تعریف ادمین جدید</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.admins.map((adm) => {
                    const isShowPass = showAdminPassMap[adm.id] || false;
                    return (
                      <div
                        key={adm.id}
                        className="p-4 sm:p-5 rounded-2xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#111111]">{adm.fullName}</span>
                            <span
                              className="text-xs font-mono font-bold text-[#e8400d] bg-white px-2 py-0.5 rounded border border-[rgba(17,17,17,0.08)]"
                              dir="ltr"
                            >
                              @{adm.username}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                                adm.role === 'superadmin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {adm.role === 'superadmin' ? 'مدیر ارشد (SuperAdmin)' : 'ویرایشگر محتوا'}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-[#575655] pt-1 flex-wrap">
                            <div className="flex items-center gap-1.5 font-mono">
                              <Lock className="w-3.5 h-3.5 text-[#6D6C6B]" />
                              <span>رمز عبور:</span>
                              <strong className="text-[#111111]">
                                {isShowPass ? adm.password : '••••••••'}
                              </strong>
                              <button
                                type="button"
                                onClick={() =>
                                  setShowAdminPassMap({
                                    ...showAdminPassMap,
                                    [adm.id]: !isShowPass,
                                  })
                                }
                                className="p-1 text-[#6D6C6B] hover:text-[#111111] transition-colors"
                                title="نمایش/مخفی‌سازی رمز عبور"
                              >
                                {isShowPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#6D6C6B]">تاریخ ایجاد: {adm.createdAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenEditAdmin(adm)}
                            className="p-2 text-[#575655] hover:text-[#111111] hover:bg-white rounded-xl transition-colors border border-[rgba(17,17,17,0.08)] shadow-2xs"
                            title="ویرایش مشخصات مدیر"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {adm.username !== 'You' && data.admins.length > 1 && (
                            <DeleteButton
                              onDelete={() => handleDeleteAdminUser(adm.id, adm.fullName || adm.username)}
                              itemTitle={adm.fullName || adm.username}
                              size="sm"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ==============================================================
          MODAL: ADD / EDIT VIDEO WITH CAPTIONS
      ============================================================== */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[rgba(17,17,17,0.1)] overflow-hidden my-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-5 bg-[#F6F5F3] border-b border-[rgba(17,17,17,0.08)] flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-[#111111]">
                  {editingVideoId ? 'ویرایش ویدئوی آموزشی و کپشن' : 'افزودن ویدئوی آموزشی جدید همراه با کپشن'}
                </h3>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-1 text-[#575655] hover:text-[#111111] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVideo} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block font-medium text-[#111111] mb-1">
                    عنوان ویدئوی آموزشی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: آموزش پیکربندی پروتکل Modbus RTU..."
                    value={videoFormData.title}
                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#111111] mb-1">نام مدرس یا ارائه‌دهنده</label>
                    <input
                      type="text"
                      placeholder="مثال: مهندس محمدرضا شایان‌مهر"
                      value={videoFormData.instructor}
                      onChange={(e) =>
                        setVideoFormData({ ...videoFormData, instructor: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* DEDICATED FILE UPLOAD ZONE (DEVIGNER UI FILE UPLOAD COMPONENT) */}
                <div className="space-y-2">
                  <label className="block font-medium text-[#111111]">
                    بارگذاری فایل ویدئویی <span className="text-red-500">*</span>
                  </label>

                  <FileUpload
                    onFileSelect={(file, durationStr) => {
                      setSelectedVideoFile(file);
                      const objUrl = URL.createObjectURL(file);
                      setVideoPreviewUrl(objUrl);
                      setFileDetails({
                        name: file.name,
                        size: (file.size / (1024 * 1024)).toFixed(1) + ' مگابایت',
                      });
                      setVideoFormData((prev) => ({
                        ...prev,
                        duration: durationStr,
                        videoUrl: objUrl,
                      }));
                    }}
                    onFileRemove={() => {
                      setSelectedVideoFile(null);
                      setVideoPreviewUrl('');
                      setFileDetails(null);
                      setVideoFormData((prev) => ({
                        ...prev,
                        duration: 'در انتظار انتخاب فایل ویدئو...',
                        videoUrl: '',
                      }));
                    }}
                    currentPreviewUrl={videoPreviewUrl}
                    currentFileName={fileDetails?.name || (editingVideoId ? videoFormData.title : '')}
                    currentFileSize={fileDetails?.size || ''}
                    currentDuration={videoFormData.duration}
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">شرح خلاصه محتوای کارگاه</label>
                  <textarea
                    rows={2}
                    placeholder="سرفصل‌ها و توضیحات کلی ویدئو..."
                    value={videoFormData.description}
                    onChange={(e) =>
                      setVideoFormData({ ...videoFormData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(false)}
                    className="px-4 py-2 border border-[rgba(17,17,17,0.12)] rounded-xl text-xs text-[#575655] hover:text-[#111111] hover:bg-[#F6F5F3] transition-colors"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#111111] text-white text-xs font-semibold rounded-xl hover:bg-[#272625] transition-colors shadow-xs"
                  >
                    ذخیره ویدئو
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==============================================================
          MODAL: ADD / EDIT PROJECT
      ============================================================== */}
      <AnimatePresence>
        {projectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[rgba(17,17,17,0.1)] overflow-hidden my-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-5 bg-[#F6F5F3] border-b border-[rgba(17,17,17,0.08)] flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-[#111111]">
                  {editingProjectId ? 'ویرایش پروژه مهندسی' : 'ثبت پروژه جدید در آرشیو'}
                </h3>
                <button
                  onClick={() => setProjectModalOpen(false)}
                  className="p-1 text-[#575655] hover:text-[#111111] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block font-medium text-[#111111] mb-1">
                    نام پروژه <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: سامانه تله‌متری مخازن هوشمند..."
                    value={projectFormData.title}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#111111] mb-1">دسته‌بندی</label>
                    <select
                      value={projectFormData.category}
                      onChange={(e) => {
                        const cat = e.target.value as ProjectItem['category'];
                        const labels: Record<ProjectItem['category'], string> = {
                          automation: 'اتوماسیون صنعتی',
                          monitoring: 'پایش و مانیتورینگ',
                          telemetry: 'تله‌متری و پایش برخط',
                          consulting: 'مشاوره و ممیزی مهندسی',
                        };
                        setProjectFormData({
                          ...projectFormData,
                          category: cat,
                          categoryLabel: labels[cat] || 'پروژه مهندسی',
                        });
                      }}
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    >
                      <option value="automation">اتوماسیون صنعتی</option>
                      <option value="telemetry">تله‌متری و پایش برخط</option>
                      <option value="monitoring">پایش و مانیتورینگ</option>
                      <option value="consulting">مشاوره و ممیزی مهندسی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#111111] mb-1">سال اجرا</label>
                    <input
                      type="text"
                      value={projectFormData.year}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, year: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">نوع کارفرما / بخش</label>
                  <input
                    type="text"
                    placeholder="مثال: شرکت آب منطقه‌ای / پالایشگاه..."
                    value={projectFormData.clientType}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, clientType: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">خلاصه پروژه</label>
                  <textarea
                    rows={2}
                    value={projectFormData.summary}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, summary: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">شرح چالش کارفرما</label>
                  <textarea
                    rows={2}
                    value={projectFormData.challenge}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, challenge: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">راهکار مهندسی پیاده‌شده</label>
                  <textarea
                    rows={2}
                    value={projectFormData.solution}
                    onChange={(e) =>
                      setProjectFormData({ ...projectFormData, solution: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <GooSwitch
                    checked={projectFormData.isSampleData}
                    onCheckedChange={(val) =>
                      setProjectFormData({ ...projectFormData, isSampleData: val })
                    }
                    label="نشان پروژه نمونه و آزمایشی"
                    description="برچسب‌گذاری به عنوان پروژه آزمایشی در ویترین پروژه‌ها"
                    size="sm"
                    badge="Goo Switch"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-[#575655] hover:text-[#111111]"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#111111] text-white font-semibold rounded-lg hover:bg-[#272625]"
                  >
                    ذخیره پروژه
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==============================================================
          MODAL: ADD / EDIT ADMIN USER
      ============================================================== */}
      <AnimatePresence>
        {adminModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[rgba(17,17,17,0.1)] overflow-hidden my-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-5 bg-[#F6F5F3] border-b border-[rgba(17,17,17,0.08)] flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-[#111111]">
                  {editingAdminId ? 'ویرایش مشخصات ادمین' : 'تعریف حساب مدیر جدید'}
                </h3>
                <button
                  onClick={() => setAdminModalOpen(false)}
                  className="p-1 text-[#575655] hover:text-[#111111] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAdmin} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-[#111111] mb-1">
                    نام و نام خانوادگی مدیر <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: مهندس احمدی"
                    value={adminFormData.fullName}
                    onChange={(e) => setAdminFormData({ ...adminFormData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">
                    نام کاربری (Username) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="مثال: AdminUser"
                    value={adminFormData.username}
                    onChange={(e) => setAdminFormData({ ...adminFormData, username: e.target.value })}
                    className="w-full px-3 py-2 font-mono border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">
                    رمز عبور (Password) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="رمز عبور ادمین..."
                    value={adminFormData.password}
                    onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                    className="w-full px-3 py-2 font-mono border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#111111] mb-1">نقش و سطح دسترسی</label>
                  <select
                    value={adminFormData.role}
                    onChange={(e) => setAdminFormData({ ...adminFormData, role: e.target.value as 'superadmin' | 'editor' })}
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden"
                  >
                    <option value="superadmin">مدیر ارشد (SuperAdmin - دسترسی کامل)</option>
                    <option value="editor">ویرایشگر محتوا (Editor)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(17,17,17,0.06)]">
                  <button
                    type="button"
                    onClick={() => setAdminModalOpen(false)}
                    className="px-4 py-2 border border-[rgba(17,17,17,0.12)] rounded-xl text-xs text-[#575655] hover:text-[#111111] hover:bg-[#F6F5F3] transition-colors"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#111111] text-white text-xs font-semibold rounded-xl hover:bg-[#272625] transition-colors shadow-xs"
                  >
                    ذخیره مشخصات مدیر
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
