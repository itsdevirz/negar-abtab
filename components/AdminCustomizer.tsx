import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCompany } from '@/lib/company-context';
import { X, Save, RotateCcw, Download, Check, SlidersHorizontal } from 'lucide-react';
import { GooSwitch } from '@/components/ui/goo-switch';

export function AdminCustomizer() {
  const { pathname } = useLocation();
  const {
    data,
    updateProfile,
    isCustomizerOpen,
    setIsCustomizerOpen,
    resetToDefaults,
    exportDataAsJson,
  } = useCompany();

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local form state
  const [formData, setFormData] = useState({
    brandTitle: data.profile.brandTitle,
    heroHeadline: data.profile.heroHeadline,
    heroSubheadline: data.profile.heroSubheadline,
    heroDescription: data.profile.heroDescription,
    phone: data.profile.phone,
    mobile: data.profile.mobile,
    email: data.profile.email,
    address: data.profile.address,
    workingHours: data.profile.workingHours,
    isSampleDataNotice: data.profile.isSampleDataNotice,
    years: data.profile.stats.years,
    projects: data.profile.stats.projects,
    clients: data.profile.stats.clients,
    domains: data.profile.stats.domains,
    engineers: data.profile.stats.engineers,
  });

  if (pathname?.startsWith('/admin') || !isCustomizerOpen) {
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      brandTitle: formData.brandTitle,
      heroHeadline: formData.heroHeadline,
      heroSubheadline: formData.heroSubheadline,
      heroDescription: formData.heroDescription,
      phone: formData.phone,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      workingHours: formData.workingHours,
      isSampleDataNotice: formData.isSampleDataNotice,
      stats: {
        years: Number(formData.years),
        projects: Number(formData.projects),
        clients: Number(formData.clients),
        domains: Number(formData.domains),
        engineers: Number(formData.engineers),
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید تمام اطلاعات به تنظیمات اولیه بازنشانی شوند؟')) {
      resetToDefaults();
      setIsCustomizerOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-r border-[rgba(17,17,17,0.08)]">
        {/* Header */}
        <div className="p-5 border-b border-[rgba(17,17,17,0.08)] flex items-center justify-between bg-[#F6F5F3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#111111] text-sm sm:text-base">
                پنل مدیریت و ویرایش آنلاین اطلاعات
              </h3>
              <p className="text-xs text-[#575655]">
                تنظیم زنده متون، مشخصات و شاخص‌های شرکت در مرورگر
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-1.5 text-[#575655] hover:text-[#111111] hover:bg-white rounded-lg transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          {savedSuccess && (
            <div className="p-3 bg-[#B7EFB2]/40 border border-[#B7EFB2] rounded-lg text-emerald-900 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>تغییرات با موفقیت ذخیره و در تمام بخش‌های سایت اعمال شد.</span>
            </div>
          )}

          {/* Section: Brand & Hero */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-[#111111] border-b border-[rgba(17,17,17,0.06)] pb-1.5">
              عناوین و معرفی صفحه اصلی
            </h4>

            <div>
              <label className="block text-xs font-medium text-[#575655] mb-1">
                نام برند و هدر
              </label>
              <input
                type="text"
                value={formData.brandTitle}
                onChange={(e) => setFormData({ ...formData, brandTitle: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575655] mb-1">
                تیتر شاخص هیرو
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575655] mb-1">
                تیتر مکمل هیرو
              </label>
              <input
                type="text"
                value={formData.heroSubheadline}
                onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575655] mb-1">
                توضیح پاراگراف معرفی
              </label>
              <textarea
                rows={3}
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d]"
              />
            </div>
          </div>

          {/* Section: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-[#111111] border-b border-[rgba(17,17,17,0.06)] pb-1.5">
              مشخصات تماس رسمی
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#575655] mb-1">
                  تلفن ثابت
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d] font-mono text-left"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575655] mb-1">
                  تلفن همراه / پیام‌رسان
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d] font-mono text-left"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575655] mb-1">
                پست الکترونیکی رسمی
              </label>
              <input
                type="email"
                dir="ltr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d] font-mono text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575655] mb-1">
                نشانی دفتر مرکزی
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575655] mb-1">
                ساعات پاسخگویی
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d]"
              />
            </div>
          </div>

          {/* Section: Numerical Statistics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider text-[#111111] border-b border-[rgba(17,17,17,0.06)] pb-1.5">
              آمار و شاخص‌های شرکت
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#575655] mb-1">
                  سال‌های تجربه
                </label>
                <input
                  type="number"
                  value={formData.years}
                  onChange={(e) => setFormData({ ...formData, years: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575655] mb-1">
                  تعداد پروژه‌ها
                </label>
                <input
                  type="number"
                  value={formData.projects}
                  onChange={(e) => setFormData({ ...formData, projects: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575655] mb-1">
                  تعداد کارفرمایان
                </label>
                <input
                  type="number"
                  value={formData.clients}
                  onChange={(e) => setFormData({ ...formData, clients: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575655] mb-1">
                  تعداد مهندسان و متخصصین
                </label>
                <input
                  type="number"
                  value={formData.engineers}
                  onChange={(e) => setFormData({ ...formData, engineers: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-[rgba(17,17,17,0.12)] rounded-lg focus:outline-hidden focus:border-[#e8400d] font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <GooSwitch
                checked={formData.isSampleDataNotice}
                onCheckedChange={(val) =>
                  setFormData({ ...formData, isSampleDataNotice: val })
                }
                label="نشان شفافیت داده‌های شرکت"
                description="نمایش نوار «داده‌های آزمایشی استاندارد» در بالای وب‌سایت"
                size="sm"
                badge="Goo Switch"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[rgba(17,17,17,0.08)] space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-lg transition-colors shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره و اعمال تغییرات</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={exportDataAsJson}
                className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-[#111111] bg-[#F6F5F3] hover:bg-[#e8e6e2] rounded-lg transition-colors border border-[rgba(17,17,17,0.08)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود JSON</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>بازنشانی پیش‌فرض</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
