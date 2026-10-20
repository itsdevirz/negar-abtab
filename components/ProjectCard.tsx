'use client';

import React from 'react';
import { ProjectItem } from '@/lib/company-data';
import { useCompany } from '@/lib/company-context';
import { ArrowUpLeft, Activity, Cpu, Radio, Gauge } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { setSelectedProjectId } = useCompany();

  // Helper icon for category
  const renderCategoryIcon = () => {
    switch (project.category) {
      case 'automation':
        return <Cpu className="w-5 h-5 text-[#111111]" />;
      case 'monitoring':
        return <Activity className="w-5 h-5 text-[#111111]" />;
      case 'telemetry':
        return <Radio className="w-5 h-5 text-[#111111]" />;
      default:
        return <Gauge className="w-5 h-5 text-[#111111]" />;
    }
  };

  return (
    <div
      onClick={() => setSelectedProjectId(project.id)}
      className="group cursor-pointer rounded-2xl bg-white border border-[rgba(17,17,17,0.08)] hover:border-[rgba(17,17,17,0.2)] transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-md"
    >
      <div>
        {/* Visual Graphic Banner (Styled CSS/SVG Technical Blueprint Architecture) */}
        <div
          className="relative h-44 sm:h-48 w-full p-6 flex flex-col justify-between border-b border-[rgba(17,17,17,0.06)] overflow-hidden"
          style={{ backgroundColor: project.accentColor }}
        >
          {/* Subtle background technical grid pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(#111 1px, transparent 1px), radial-gradient(#111 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
            }}
          />

          {/* Top metadata strip (Zero-pill discipline: unboxed clean text) */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#272625] font-medium">
            <span className="flex items-center gap-1.5 font-semibold">
              {renderCategoryIcon()}
              <span>{project.categoryLabel}</span>
            </span>
            <span className="font-mono tabular-nums">{project.year}</span>
          </div>

          {/* Center Blueprint Graphic */}
          <div className="relative z-10 my-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/75 backdrop-blur-xs text-xs font-mono text-[#111111] border border-black/10">
              <span className="w-2 h-2 rounded-full bg-[#e8400d]" />
              <span>پروژه مرجع مهندسی</span>
            </div>
          </div>

          {/* Bottom tag text */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#272625]/80">
            <span>{project.clientType}</span>
            <span className="font-medium text-[#111111]">{project.status}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#e8400d] transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#575655] leading-relaxed line-clamp-3">
            {project.summary}
          </p>

          {/* Key metrics strip */}
          <div className="pt-2 border-t border-[rgba(17,17,17,0.06)] grid grid-cols-2 gap-2 text-xs">
            {project.impactMetrics.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="bg-[#F6F5F3] p-2 rounded-lg">
                <span className="text-[11px] text-[#6D6C6B] block truncate">{metric.label}</span>
                <span className="font-bold text-[#111111] font-mono text-xs mt-0.5 block" dir="ltr">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="px-6 pb-6 pt-1 flex items-center justify-between text-xs font-semibold text-[#111111] group-hover:text-[#e8400d] transition-colors">
        <span>مشاهده مشخصات فنی و نتایج</span>
        <div className="w-7 h-7 rounded-full bg-[#F6F5F3] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-colors">
          <ArrowUpLeft className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
