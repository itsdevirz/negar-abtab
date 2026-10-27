import React, { useState } from 'react';
import { useCompany } from '@/lib/company-context';
import { getApiUrl } from '@/lib/api-config';
import { Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

export function ContactForm() {
  const { data, contactPrefillTopic, setContactPrefillTopic, addInquiry } = useCompany();

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    serviceCategory: 'اتوماسیون صنعتی و اسکادا',
    subject: contactPrefillTopic || '',
    message: '',
  });

  const [prevPrefill, setPrevPrefill] = useState(contactPrefillTopic);
  if (contactPrefillTopic !== prevPrefill) {
    setPrevPrefill(contactPrefillTopic);
    if (contactPrefillTopic) {
      setFormData((prev) => ({
        ...prev,
        subject: contactPrefillTopic,
      }));
    }
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    referenceId?: string;
    message?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'لطفاً نام و نام خانوادگی خود را وارد نمایید.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'شماره تماس جهت هماهنگی الزامی است.';
    } else if (!/^09\d{9}$|^0\d{2,3}\d{7,8}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      errs.phone = 'لطفاً یک شماره تماس معتبر (مثلاً ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۲۱۸۸...) وارد کنید.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'فرمت آدرس ایمیل نامعتبر است.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'لطفاً موضوع پیام یا استعلام خود را مشخص فرمایید.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'لطفاً توضیحات درخواست خود را دقیق‌تر (حداقل ۱۰ کاراکتر) بنویسید.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch(getApiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setSubmitResult({
          success: true,
          referenceId: resData.trackingId,
          message: resData.message || 'درخواست شما با موفقیت ثبت شد.',
        });
        addInquiry({
          trackingId: resData.trackingId,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          serviceCategory: formData.serviceCategory,
          subject: formData.subject,
          message: formData.message,
          status: 'new',
        });
        setContactPrefillTopic('');
      } else {
        setSubmitResult({
          success: false,
          message: resData.message || 'خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش کنید.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'خطای شبکه در ارسال فرم. می‌توانید مستقیماً با تلفن شرکت تماس بگیرید.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyInquiryDetails = () => {
    const textToCopy = `درخواست رسمی نگار آبتاب آبانگاه\nکد پیگیری: ${submitResult?.referenceId}\nفرستنده: ${formData.fullName}\nتلفن: ${formData.phone}\nموضوع: ${formData.subject}\nمتن: ${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitResult?.success) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#111111]">
            درخواست همکاری با موفقیت ثبت گردید
          </h3>
          <p className="text-sm text-[#575655] max-w-md mx-auto leading-relaxed">
            کارشناسان دپارتمان مهندسی شرکت «{data.profile.companyName}» حداکثر ظرف مدت ۲۴ ساعت کاری با شما تماس خواهند گرفت.
          </p>
        </div>

        <div className="p-4 bg-[#F6F5F3] rounded-xl max-w-sm mx-auto text-xs space-y-1">
          <span className="text-[#6D6C6B] block">شماره رهگیری درخواست:</span>
          <span className="text-base font-bold font-mono text-[#111111] block" dir="ltr">
            {submitResult.referenceId}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={copyInquiryDetails}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-[#111111] bg-[#F6F5F3] hover:bg-[#e8e6e2] rounded-lg transition-colors border border-[rgba(17,17,17,0.08)]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'کپی شد' : 'کپی مشخصات پیگیری'}</span>
          </button>
          <button
            onClick={() => {
              setSubmitResult(null);
              setFormData({
                fullName: '',
                company: '',
                phone: '',
                email: '',
                serviceCategory: 'اتوماسیون صنعتی و اسکادا',
                subject: '',
                message: '',
              });
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-lg transition-colors"
          >
            ارسال پیام جدید
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[rgba(17,17,17,0.08)] p-6 sm:p-8 space-y-5 shadow-xs">
      {submitResult && !submitResult.success && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{submitResult.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#111111] mb-1.5">
            نام و نام خانوادگی <span className="text-[#e8400d]">*</span>
          </label>
          <input
            type="text"
            placeholder="مثال: مهندس رضوانی"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-xl focus:outline-hidden transition-colors ${
              errors.fullName ? 'border-red-500' : 'border-[rgba(17,17,17,0.12)] focus:border-[#e8400d]'
            }`}
          />
          {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#111111] mb-1.5">
            نام شرکت / سازمان (اختیاری)
          </label>
          <input
            type="text"
            placeholder="مثال: شرکت آب منطقه‌ای / پتروشیمی ..."
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] rounded-xl focus:outline-hidden transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#111111] mb-1.5">
            شماره تماس همراه یا ثابت <span className="text-[#e8400d]">*</span>
          </label>
          <input
            type="text"
            dir="ltr"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono text-left bg-white border rounded-xl focus:outline-hidden transition-colors ${
              errors.phone ? 'border-red-500' : 'border-[rgba(17,17,17,0.12)] focus:border-[#e8400d]'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#111111] mb-1.5">
            پست الکترونیکی (ایمیل)
          </label>
          <input
            type="email"
            dir="ltr"
            placeholder="name@company.ir"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono text-left bg-white border rounded-xl focus:outline-hidden transition-colors ${
              errors.email ? 'border-red-500' : 'border-[rgba(17,17,17,0.12)] focus:border-[#e8400d]'
            }`}
          />
          {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#111111] mb-1.5">
            حوزه خدمت یا استعلام موردنظر
          </label>
          <select
            value={formData.serviceCategory}
            onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[rgba(17,17,17,0.12)] focus:border-[#e8400d] rounded-xl focus:outline-hidden transition-colors"
          >
            {data.services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="سایر موضوعات">سایر درخواست‌ها و ارتباط اداری</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#111111] mb-1.5">
            موضوع درخواست <span className="text-[#e8400d]">*</span>
          </label>
          <input
            type="text"
            placeholder="مثال: استعلام هزینه اجرای سامانه تله‌متری"
            value={formData.subject}
            onChange={(e) => {
              setFormData({ ...formData, subject: e.target.value });
              if (errors.subject) setErrors({ ...errors, subject: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-xl focus:outline-hidden transition-colors ${
              errors.subject ? 'border-red-500' : 'border-[rgba(17,17,17,0.12)] focus:border-[#e8400d]'
            }`}
          />
          {errors.subject && <p className="text-[11px] text-red-600 mt-1">{errors.subject}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#111111] mb-1.5">
          شرح درخواست و مشخصات فنی پروژه <span className="text-[#e8400d]">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="شرح مختصری از اهداف طرح، مشخصات تأسیسات، محل پروژه یا نیازمندی‌های سیستم کنترلی خود را مرقوم فرمایید..."
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-xl focus:outline-hidden transition-colors ${
            errors.message ? 'border-red-500' : 'border-[rgba(17,17,17,0.12)] focus:border-[#e8400d]'
          }`}
        />
        {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-[#6D6C6B]">
          اطلاعات ارسالی مطابق خط‌مشی محرمانگی شرکت نزد ما محفوظ خواهد ماند.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#111111] hover:bg-[#272625] active:bg-black rounded-xl transition-colors disabled:opacity-50 shadow-xs"
        >
          {isSubmitting ? (
            <span>در حال ارسال اطلاعات...</span>
          ) : (
            <>
              <span>ارسال درخواست رسمی</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
