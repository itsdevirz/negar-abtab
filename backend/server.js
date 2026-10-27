const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SERVER_IP = '141.11.32.127';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initial State Database (In-Memory / File Persistent)
let companyProfile = {
  companyName: 'نگار آبتاب آبانگاه',
  brandTitle: 'نگار آبتاب آبانگاه',
  logoUrl: '/assets/aistudio/file_00000000c9e481f4872f5bd5f71094a4_1__c7980156.png',
  slogan: 'تجربه، تخصص و اعتماد در مهندسی هوشمند',
  heroHeadline: 'نگار آبتاب آبانگاه',
  heroSubheadline: 'نگاهی حرفه‌ای به تجربه، تخصص و آینده',
  heroDescription: 'ارائه‌دهنده راهکارهای تخصصی اتوماسیون صنعتی، سیستم‌های اسکادا، تله‌متری، ابزار دقیق و مانیتورینگ هوشمند تأسیسات زیرساختی آب و انرژی.',
  aboutIntro: 'شرکت نگار آبتاب آبانگاه با تکیه بر دانش بومی و استانداردهای بین‌المللی، مجری پروژه‌های کلان هوشمندسازی و اتوماسیون صنعتی در کشور می‌باشد.',
  mission: 'ارتقای بازدهی عملیاتی و کاهش استهلاک تجهیزات صنعتی با استقرار سیستم‌های هوشمند پایش برخط.',
  vision: 'تبدیل شدن به مرجع تخصصی اتوماسیون و مانیتورینگ زیرساختی در سطح خاورمیانه.',
  phone: '۰۲۱-۸۸۹۹۰۰۱۱',
  mobile: '۰۹۱۲۳۴۵۶۷۸۹',
  email: 'info@negar-abtab.ir',
  address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری نگار، طبقه ۶، واحد ۶۰۲',
  workingHours: 'شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰ | پنجشنبه: ۸:۰۰ الی ۱۳:۰۰',
  isSampleDataNotice: true,
  stats: {
    years: 15,
    projects: 120,
    clients: 45,
    domains: 4,
    engineers: 28,
  },
};

let adminUsers = [
  {
    id: 'admin-1',
    username: 'You',
    password: 'You1431569@',
    fullName: 'مدیر ارشد (You)',
    role: 'superadmin',
    createdAt: '۱۴۰۴/۰۱/۰۱',
  },
];

let videoTutorials = [
  {
    id: 'vid-1',
    title: 'کارگاه جامع پیکربندی شبکه تله‌متری و پروتکل Modbus RTU در PLCهای صنعتی',
    category: 'telemetry',
    categoryLabel: 'تله‌متری و پایش',
    duration: '۱۲:۴۵',
    instructor: 'مهندس محمدرضا شایان‌مهر',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'در این کارگاه آموزشی چگونگی پیکربندی شبکه مخابراتی صنعتی، تنظیم ساختار RTU و تست آنالیز سیگنال‌ها بررسی می‌شود.',
    captionText: 'بسم الله الرحمن الرحیم. با سلام خدمت مهندسان گرامی. در این ویدئو مراحل گام به گام تنظیم Master و Slave در مدباص بررسی می‌گردد...',
    createdAt: '۱۴۰۴/۰۲/۱۰',
    viewsCount: 1420,
    featured: true,
    accentColor: '#FFD7F0',
  },
  {
    id: 'vid-2',
    title: 'اصول طراحی گرافیک HMI صنعتی بر اساس استاندارد ISA-101 و کاهش خطای اپراتوری',
    category: 'scada',
    categoryLabel: 'سیستم‌های اسکادا',
    duration: '۱۸:۲۰',
    instructor: 'دکتر علیرضا کاظمی',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'تکنیک‌های طراحی رابط کاربری High-Performance HMI جهت تسهیل تصمیم‌گیری سریع اپراتورها در اتاق‌های کنترل اسکادا.',
    captionText: 'سلام و وقت بخیر. در استاندارد ISA-101 هدف اصلی کاهش شلوغی‌های بصری غیرضروری و تمرکز بر هشدارهای حیاتی فرآیند است...',
    createdAt: '۱۴۰۴/۰۳/۰۵',
    viewsCount: 980,
    featured: true,
    accentColor: '#B7EFB2',
  },
];

let projectsList = [
  {
    id: 'proj-1',
    title: 'سامانه یکپارچه اسکادا و تله‌متری مخازن هوشمند ایستگاه‌های پمپاژ آب',
    category: 'telemetry',
    categoryLabel: 'تله‌متری و پایش برخط',
    summary: 'پایش زمان‌واقعی سطح، فشار و دبی ۷۲ مخزن توزیع با قابلیت کنترل از راه دور شیرآلات هیدرولیکی.',
    year: '۱۴۰۳',
    clientType: 'شرکت آب و فاضلاب شهری',
    isSampleData: false,
    status: 'در حال بهره‌برداری',
    challenge: 'عدم دسترسی به داده‌های لحظه‌ای سطح مخازن و سرریزهای مکرر آب در ساعات اوج مصرف.',
    solution: 'استقرار RTUهای صنعتی مقاوم با ارتباط بی سیم لورا و ارتباط رادیویی اختصاصی.',
    impactMetrics: [
      { label: 'کاهش هدررفت آب', value: '۳۲٪' },
      { label: 'پایایی شبکه ارتباطی', value: '۹۹.۹٪' },
    ],
    specs: [
      { title: 'پروتکل ارتباطی', value: 'DNP3 & Modbus TCP' },
      { title: 'تعداد گره‌ها', value: '۷۲ نقطه تله‌متری' },
    ],
    accentColor: '#B7EFB2',
  },
];

let inquiriesList = [];

// ==========================================
// REST API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    serverIp: SERVER_IP,
    timestamp: new Date().toISOString(),
    message: 'Backend server is running smoothly for Negar Abtab Abangah',
  });
});

// 1. Company Profile Endpoints
app.get('/api/company', (req, res) => {
  res.json({ success: true, profile: companyProfile });
});

app.put('/api/company/profile', (req, res) => {
  companyProfile = { ...companyProfile, ...req.body };
  res.json({ success: true, profile: companyProfile, message: 'پروفایل شرکت با موفقیت به‌روزرسانی شد' });
});

// 2. Admin Authentication & Management
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'نام کاربری و رمز عبور الزامی است' });
  }

  const user = adminUsers.find(
    (a) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password.trim()
  );

  if (user || (username.trim().toLowerCase() === 'you' && password.trim() === 'You1431569@')) {
    const activeUser = user || adminUsers[0];
    return res.json({
      success: true,
      user: activeUser,
      token: `token_${Date.now()}_${activeUser.username}`,
    });
  }

  return res.status(401).json({ success: false, error: 'نام کاربری یا رمز عبور اشتباه است' });
});

app.get('/api/admins', (req, res) => {
  res.json({ success: true, admins: adminUsers });
});

app.post('/api/admins', (req, res) => {
  const { username, password, fullName, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'اطلاعات ادمین کامل نیست' });
  }
  const newAdmin = {
    id: `admin-${Date.now()}`,
    username: username.trim(),
    password: password.trim(),
    fullName: fullName || username,
    role: role || 'editor',
    createdAt: new Date().toLocaleDateString('fa-IR'),
  };
  adminUsers.unshift(newAdmin);
  res.json({ success: true, admin: newAdmin, admins: adminUsers });
});

app.delete('/api/admins/:id', (req, res) => {
  const { id } = req.params;
  const target = adminUsers.find((a) => a.id === id);
  if (target?.username === 'You' || adminUsers.length <= 1) {
    return res.status(403).json({ success: false, error: 'حساب ادمین اصلی سیستم قابل حذف نیست' });
  }
  adminUsers = adminUsers.filter((a) => a.id !== id);
  res.json({ success: true, admins: adminUsers });
});

// 3. Video Metadata Endpoints (Note: Processing & Metadata processed on backend API; video files stored on host)
app.get('/api/videos', (req, res) => {
  res.json({ success: true, videos: videoTutorials });
});

app.post('/api/videos', (req, res) => {
  const newVideo = {
    id: req.body.id || `vid-${Date.now()}`,
    title: req.body.title || 'ویدئوی جدید',
    category: req.body.category || 'automation',
    categoryLabel: req.body.categoryLabel || 'اتوماسیون صنعتی',
    duration: req.body.duration || '۱۰:۰۰',
    instructor: req.body.instructor || 'مهندس فنی',
    videoUrl: req.body.videoUrl || '',
    description: req.body.description || '',
    captionText: req.body.captionText || '',
    createdAt: new Date().toLocaleDateString('fa-IR'),
    viewsCount: 1,
    featured: Boolean(req.body.featured),
    accentColor: req.body.accentColor || '#FFD7F0',
  };
  videoTutorials.unshift(newVideo);
  res.json({ success: true, video: newVideo, videos: videoTutorials });
});

app.put('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  videoTutorials = videoTutorials.map((v) => (v.id === id ? { ...v, ...req.body } : v));
  res.json({ success: true, videos: videoTutorials });
});

app.delete('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  videoTutorials = videoTutorials.filter((v) => v.id !== id);
  res.json({ success: true, videos: videoTutorials });
});

// 4. Projects Endpoints
app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects: projectsList });
});

app.post('/api/projects', (req, res) => {
  const newProj = {
    id: `proj-${Date.now()}`,
    ...req.body,
  };
  projectsList.unshift(newProj);
  res.json({ success: true, project: newProj, projects: projectsList });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectsList = projectsList.map((p) => (p.id === id ? { ...p, ...req.body } : p));
  res.json({ success: true, projects: projectsList });
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectsList = projectsList.filter((p) => p.id !== id);
  res.json({ success: true, projects: projectsList });
});

// 5. Inquiries Endpoints
app.get('/api/inquiries', (req, res) => {
  res.json({ success: true, inquiries: inquiriesList });
});

app.post('/api/inquiries', (req, res) => {
  const newInq = {
    id: `inq-${Date.now()}`,
    trackingId: `NG-${Math.floor(100000 + Math.random() * 900000)}`,
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    company: req.body.company,
    serviceCategory: req.body.serviceCategory || 'عمومی',
    subject: req.body.subject || 'استعلام فنی',
    message: req.body.message,
    status: 'new',
    createdAt: new Date().toLocaleDateString('fa-IR'),
  };
  inquiriesList.unshift(newInq);
  res.json({ success: true, inquiry: newInq, trackingId: newInq.trackingId });
});

app.put('/api/inquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  inquiriesList = inquiriesList.map((i) => (i.id === id ? { ...i, status } : i));
  res.json({ success: true, inquiries: inquiriesList });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Express Backend Server is running!`);
  console.log(`🌐 Server IP: ${SERVER_IP}`);
  console.log(`🔌 Listening on Port: ${PORT}`);
  console.log(`🔗 API Base: http://${SERVER_IP}:${PORT}/api`);
  console.log(`===================================================`);
});
