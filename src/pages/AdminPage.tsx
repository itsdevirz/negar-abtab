import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  uploadVideoWithProgress,
  deleteVideoFromHost,
} from '@/lib/video-storage';
import { GooSwitch } from '@/components/ui/goo-switch';
import { FileUpload } from '@/components/ui/file-upload';
import { DeleteButton } from '@/components/ui/delete-button';

export function AdminPage() {
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
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

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

  // Dedicated Stats Form
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

  const handleOpenAddVideo = () => {
    setEditingVideoId(null);
    setSelectedVideoFile(null);
    setVideoPreviewUrl('');
    setFileDetails(null);
    setUploadProgress(null);
    setIsUploading(false);
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
    setUploadProgress(null);
    setIsUploading(false);

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

    if (selectedVideoFile) {
      setIsUploading(true);
      setUploadProgress(0);

      const uploadRes = await uploadVideoWithProgress(selectedVideoFile, (percent) => {
        setUploadProgress(percent);
      });

      if (uploadRes.url) {
        finalVideoUrl = uploadRes.url;
      } else if (videoPreviewUrl) {
        finalVideoUrl = videoPreviewUrl;
      }
      await saveVideoFile(videoId, selectedVideoFile);
      setIsUploading(false);
      setUploadProgress(null);
    }

    if (editingVideoId) {
      updateVideo(editingVideoId, {
        ...videoFormData,
        videoUrl: finalVideoUrl,
      });
      showNotice('ویدئوی آموزشی با موفقیت در پوشه uploads هاست و دیتابیس سیستم به‌روزرسانی شد.');
    } else {
      addVideo({
        ...videoFormData,
        id: videoId,
        videoUrl:
          finalVideoUrl ||
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      });
      showNotice('ویدئوی آموزشی جدید با موفقیت روی پوشه uploads هاست آپلود و ذخیره گردید.');
    }
    setVideoModalOpen(false);
    setSelectedVideoFile(null);
    setVideoPreviewUrl('');
    setFileDetails(null);
    setUploadProgress(null);
    setIsUploading(false);
  };

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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e8400d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#1a1918] border border-[rgba(255,255,255,0.12)] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-2 shadow-inner">
              <img
                src={data.profile.logoUrl || '/assets/aistudio/file_00000000c9e481f4872f5bd5f71094a4_1__c7980156.png'}
                alt={data.profile.companyName}
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
                  placeholder=""
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
                  placeholder=""
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

          <div className="pt-2 text-center border-t border-white/10">
            <Link
              to="/"
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
              <img
                src="/assets/aistudio/file_00000000c9e481f4872f5bd5f71094a4_1__c7980156.png"
                alt="لوگوی شرکت نگار آبتاب آبانگاه"
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
              to="/"
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
                {/* TAB 1: OVERVIEW DASHBOARD */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
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
                  </div>
                )}

                {/* TAB 2: VIDEOS & CAPTIONS */}
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
                                  await deleteVideoFromHost(vid.videoUrl);
                                  deleteVideo(vid.id);
                                  await deleteVideoFile(vid.id);
                                  showNotice(`ویدئوی «${vid.title}» با موفقیت از سیستم و پوشه uploads هاست حذف شد.`);
                                }}
                                itemTitle={vid.title}
                                size="sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: PROJECTS */}
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

                {/* TAB 4: INQUIRIES */}
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

                            <div className="p-4 bg-white rounded-xl border border-[rgba(17,17,17,0.06)] text-xs sm:text-sm text-[#272625] leading-relaxed">
                              {inq.message}
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

                {/* TAB 5: SETTINGS */}
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
                          تلفن ثابت
                        </label>
                        <input
                          type="text"
                          dir="ltr"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  </form>
                )}

                {/* TAB 6: BACKUP */}
                {activeTab === 'backup' && (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6">
                    <div className="pb-4 border-b border-[rgba(17,17,17,0.06)]">
                      <h3 className="text-lg font-bold text-[#111111]">
                        پشتیبان‌گیری، ورود و خروج داده‌ها
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-5 bg-[#F6F5F3] rounded-2xl border border-[rgba(17,17,17,0.08)] space-y-3">
                        <Download className="w-6 h-6 text-[#111111]" />
                        <h4 className="text-sm font-bold text-[#111111]">دانلود نسخه پشتیبان (JSON)</h4>
                        <p className="text-xs text-[#575655]">
                          دریافت کامل آخرین تنظیمات، پروژه‌ها و ویدئوها در قالب فایل JSON استاندارد.
                        </p>
                        <button
                          onClick={exportDataAsJson}
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-xl transition-colors shadow-xs"
                        >
                          دانلود فایل پشتیبان
                        </button>
                      </div>

                      <div className="p-5 bg-[#F6F5F3] rounded-2xl border border-[rgba(17,17,17,0.08)] space-y-3">
                        <RotateCcw className="w-6 h-6 text-red-600" />
                        <h4 className="text-sm font-bold text-red-700">بازنشانی کامل داده‌ها</h4>
                        <p className="text-xs text-[#575655]">
                          بازگرداندن تمام اطلاعات، پروژه‌ها و متون به مقادیر اولیه کارخانه.
                        </p>
                        <button
                          onClick={() => {
                            if (confirm('آیا از بازنشانی کامل اطلاعات اطمینان دارید؟')) {
                              resetToDefaults();
                              showNotice('تمام داده‌ها به وضعیت اولیه بازنشانی شدند.');
                            }
                          }}
                          className="px-4 py-2 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 rounded-xl transition-colors border border-red-200"
                        >
                          بازنشانی به پیش‌فرض اولیه
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 7: ADMIN MANAGEMENT */}
                {activeTab === 'admins' && (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[rgba(17,17,17,0.06)]">
                      <div>
                        <h3 className="text-lg font-bold text-[#111111]">
                          مدیریت مدیران و سطوح دسترسی
                        </h3>
                        <p className="text-xs text-[#575655] mt-0.5">
                          تعریف حساب‌های ادمین جدید و تغییر رمزهای عبور ورود به پنل
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
                      {data.admins.map((admin) => (
                        <div
                          key={admin.id}
                          className="p-4 rounded-xl border border-[rgba(17,17,17,0.08)] bg-[#F6F5F3]/50 flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#111111]">
                                {admin.fullName}
                              </span>
                              <span className="font-mono text-xs font-semibold text-[#e8400d]">
                                ({admin.username})
                              </span>
                              <span className="text-[10px] bg-white border border-[rgba(17,17,17,0.08)] px-2 py-0.5 rounded font-mono">
                                {admin.role === 'superadmin' ? 'مدیر ارشد' : 'ویرایشگر'}
                              </span>
                            </div>
                            <div className="text-xs text-[#575655] font-mono" dir="ltr">
                              Password: <strong>{admin.password}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {admin.username !== 'You' && (
                              <button
                                onClick={() => handleDeleteAdminUser(admin.id, admin.fullName)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                title="حذف ادمین"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-[rgba(17,17,17,0.1)] p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,17,17,0.08)]">
              <h3 className="font-bold text-[#111111]">
                {editingVideoId ? 'ویرایش ویدئوی آموزشی' : 'افزودن ویدئوی آموزشی جدید'}
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 text-[#575655] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#111111] mb-1">عنوان ویدئو</label>
                <input
                  type="text"
                  value={videoFormData.title}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  placeholder="عنوان کارگاه آموزشی..."
                  className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#111111] mb-1">نام مدرس</label>
                  <input
                    type="text"
                    value={videoFormData.instructor}
                    onChange={(e) => setVideoFormData({ ...videoFormData, instructor: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#111111] mb-1">مدت زمان</label>
                  <input
                    type="text"
                    value={videoFormData.duration}
                    onChange={(e) => setVideoFormData({ ...videoFormData, duration: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#111111] mb-1">انتخاب فایل ویدئو (آپلود مستقیم رو هاست)</label>
                <FileUpload
                  onFileSelect={(file, durationStr) => {
                    setSelectedVideoFile(file);
                    const localUrl = URL.createObjectURL(file);
                    setVideoPreviewUrl(localUrl);
                    setVideoFormData((prev) => ({ ...prev, duration: durationStr }));
                    setFileDetails({
                      name: file.name,
                      size: (file.size / (1024 * 1024)).toFixed(1) + ' مگابایت',
                    });
                  }}
                  onFileRemove={() => {
                    setSelectedVideoFile(null);
                    setVideoPreviewUrl('');
                    setFileDetails(null);
                  }}
                  currentPreviewUrl={videoPreviewUrl}
                  currentFileName={fileDetails?.name}
                  currentFileSize={fileDetails?.size}
                  currentDuration={videoFormData.duration}
                />
                {fileDetails && (
                  <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px]">
                    فایل انتخاب شد: <strong>{fileDetails.name}</strong> ({fileDetails.size})
                  </div>
                )}
              </div>

              {isUploading && uploadProgress !== null && (
                <div className="space-y-1.5 p-3 bg-[#F6F5F3] border border-[rgba(17,17,17,0.1)] rounded-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#111111]">
                    <span>در حال آپلود ویدئو به پوشه uploads هاست...</span>
                    <span className="font-mono text-[#e8400d] font-bold">{uploadProgress}٪</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#e8400d] h-full transition-all duration-150 ease-out rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-medium text-[#111111] mb-1">شرح ویدئو</label>
                <textarea
                  rows={3}
                  value={videoFormData.description}
                  onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden"
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className="block font-medium text-[#111111] mb-1">متن زیرنویس و کپشن</label>
                <textarea
                  rows={3}
                  value={videoFormData.captionText}
                  onChange={(e) => setVideoFormData({ ...videoFormData, captionText: e.target.value })}
                  placeholder="متن کامل پیاده‌شده زیرنویس..."
                  className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden"
                  disabled={isUploading}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(17,17,17,0.08)]">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  disabled={isUploading}
                  className="px-4 py-2 bg-[#F6F5F3] hover:bg-[#eceae6] rounded-lg font-medium text-[#575655] disabled:opacity-50"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 bg-[#111111] hover:bg-[#272625] text-white rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin text-[#FFD7F0]" />
                      <span>در حال آپلود ({uploadProgress !== null ? uploadProgress : 0}٪)...</span>
                    </>
                  ) : (
                    <span>ذخیره و آپلود ویدئو</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Add Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl border border-[rgba(17,17,17,0.1)] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,17,17,0.08)]">
              <h3 className="font-bold text-[#111111]">
                {editingAdminId ? 'ویرایش حساب مدیر' : 'تعریف حساب ادمین جدید'}
              </h3>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="p-1 text-[#575655] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdmin} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-[#111111] mb-1">نام و نام خانوادگی مدیر</label>
                <input
                  type="text"
                  value={adminFormData.fullName}
                  onChange={(e) => setAdminFormData({ ...adminFormData, fullName: e.target.value })}
                  placeholder="مثال: مدیر فنی"
                  className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#111111] mb-1">نام کاربری (Username)</label>
                <input
                  type="text"
                  dir="ltr"
                  value={adminFormData.username}
                  onChange={(e) => setAdminFormData({ ...adminFormData, username: e.target.value })}
                  placeholder="You"
                  className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#111111] mb-1">رمز عبور (Password)</label>
                <input
                  type="text"
                  dir="ltr"
                  value={adminFormData.password}
                  onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                  placeholder="You1431569@"
                  className="w-full px-3 py-2 border rounded-lg border-[rgba(17,17,17,0.12)] focus:outline-hidden font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(17,17,17,0.08)]">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2 bg-[#F6F5F3] hover:bg-[#eceae6] rounded-lg font-medium text-[#575655]"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#111111] hover:bg-[#272625] text-white rounded-lg font-semibold"
                >
                  ذخیره حساب مدیر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
