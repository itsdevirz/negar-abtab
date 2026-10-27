import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '@/lib/company-context';
import { X, CheckCircle2, ArrowUpLeft, AlertCircle, Cpu, Calendar, Building, Sparkles } from 'lucide-react';

export function ProjectDetailModal() {
  const navigate = useNavigate();
  const { data, selectedProjectId, setSelectedProjectId, setContactPrefillTopic } = useCompany();

  if (!selectedProjectId) return null;

  const project = data.projects.find((p) => p.id === selectedProjectId);
  if (!project) return null;

  const handleInquire = () => {
    setContactPrefillTopic(`استعلام همکاری درباره: ${project.title}`);
    setSelectedProjectId(null);
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[rgba(17,17,17,0.1)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top colored strip banner */}
        <div
          className="p-6 sm:p-8 flex items-start justify-between relative border-b border-[rgba(17,17,17,0.06)]"
          style={{ backgroundColor: project.accentColor }}
        >
          <div className="space-y-2 max-w-xl">
            {/* Metadata (Zero pill: text with separator) */}
            <div className="flex items-center gap-2 text-xs text-[#272625] font-medium flex-wrap">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                سال اجرا: {project.year}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                {project.clientType}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] leading-snug">
              {project.title}
            </h2>
          </div>

          <button
            onClick={() => setSelectedProjectId(null)}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#111111] flex items-center justify-center transition-colors shadow-xs shrink-0"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-sm text-[#272625]">
          {/* Status badge note */}
          <div className="flex items-center justify-between p-3.5 bg-[#F6F5F3] rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="font-semibold text-[#111111]">وضعیت پروژه: {project.status}</span>
            </div>
            {project.isSampleData && (
              <span className="text-[#6D6C6B] text-[11px]">
                پروژه نمونه منطبق با متدولوژی مهندسی شرکت
              </span>
            )}
          </div>

          {/* Challenge and Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 bg-[#F6F5F3]/60 p-4 rounded-xl border border-[rgba(17,17,17,0.06)]">
              <h4 className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>شرح مسئله و چالش کارفرما</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-2 bg-[#F6F5F3]/60 p-4 rounded-xl border border-[rgba(17,17,17,0.06)]">
              <h4 className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#e8400d]" />
                <span>راهکار مهندسی پیاده‌سازی‌شده</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#575655] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111]">نتایج مستند و دستاوردهای کمی</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.impactMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[rgba(17,17,17,0.08)] shadow-2xs text-center"
                >
                  <span className="text-xs text-[#575655] block mb-1">{metric.label}</span>
                  <span className="text-lg font-bold font-mono text-[#111111] block" dir="ltr">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#111111]" />
              <span>جدول مشخصات و معماری فنی</span>
            </h4>
            <div className="rounded-xl border border-[rgba(17,17,17,0.08)] overflow-hidden">
              <table className="w-full text-xs text-right">
                <tbody className="divide-y divide-[rgba(17,17,17,0.06)]">
                  {project.specs.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F6F5F3]/50'}>
                      <td className="p-3 font-semibold text-[#111111] w-1/3">{spec.title}</td>
                      <td className="p-3 text-[#575655] font-mono" dir="auto">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer / Inquire Action */}
        <div className="p-6 bg-[#F6F5F3] border-t border-[rgba(17,17,17,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#575655]">
            نیاز به پیاده‌سازی راهکاری مشابه برای تأسیسات یا خطوط تولید خود دارید؟
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSelectedProjectId(null)}
              className="px-4 py-2 text-xs font-medium text-[#575655] hover:text-[#111111] transition-colors"
            >
              بستن
            </button>
            <button
              onClick={handleInquire}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#272625] rounded-lg transition-colors shadow-xs"
            >
              <span>درخواست مشاوره درباره این پروژه</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
