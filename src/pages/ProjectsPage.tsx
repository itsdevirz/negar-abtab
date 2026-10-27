import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '@/lib/company-context';
import { ProjectCard } from '@/components/ProjectCard';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

export function ProjectsPage() {
  const { data } = useCompany();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'title'>('newest');

  const categories = [
    { id: 'all', label: 'همه پروژه‌ها' },
    { id: 'telemetry', label: 'تله‌متری و پایش' },
    { id: 'automation', label: 'اتوماسیون صنعتی' },
    { id: 'monitoring', label: 'پایش انرژی و سیالات' },
    { id: 'consulting', label: 'مشاوره و ممیزی' },
  ];

  const filteredProjects = useMemo(() => {
    return data.projects
      .filter((project) => {
        const matchesCategory =
          selectedCategory === 'all' || project.category === selectedCategory;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          project.title.toLowerCase().includes(query) ||
          project.summary.toLowerCase().includes(query) ||
          project.challenge.toLowerCase().includes(query) ||
          project.clientType.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.year.localeCompare(a.year);
        }
        return a.title.localeCompare(b.title);
      });
  }, [data.projects, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#F6F5F3] py-16 border-b border-[rgba(17,17,17,0.06)]">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#e8400d]">
            <Link to="/" className="hover:underline">
              صفحه اصلی
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#575655]">پروژه‌ها و نمونه‌کارها</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
            آرشیو پروژه‌ها و نمونه‌کارهای مهندسی
          </h1>
          <p className="text-sm sm:text-base text-[#575655] max-w-3xl leading-relaxed">
            مجموعه سوابق، پیاده‌سازی سامانه‌های اتوماسیون، تله‌متری و مانیتورینگ تأسیسات با مشخصات فنی و نتایج سنجش‌پذیر.
          </p>
        </FadeIn>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="p-4 sm:p-6 bg-white rounded-2xl border border-[rgba(17,17,17,0.08)] shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="جستجو در عنوان یا متن پروژه..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] focus:border-[#e8400d] rounded-xl focus:outline-hidden transition-colors"
              />
              <Search className="w-4 h-4 text-[#6D6C6B] absolute left-3 top-3 pointer-events-none" />
            </div>

            {/* Sort Dropdown & Count */}
            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 text-xs text-[#575655]">
              <span className="font-mono tabular-nums">
                تعداد پروژه‌ها: <strong>{filteredProjects.length}</strong>
              </span>

              <div className="flex items-center gap-2">
                <span>مرتب‌سازی:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'title')}
                  className="px-2.5 py-1.5 bg-[#F6F5F3] border border-[rgba(17,17,17,0.08)] rounded-lg text-xs text-[#111111] focus:outline-hidden"
                >
                  <option value="newest">جدیدترین سال اجرا</option>
                  <option value="title">حروف الفبا</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-2 border-t border-[rgba(17,17,17,0.06)] flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-3.5 h-3.5 text-[#6D6C6B] shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-2xs font-semibold'
                    : 'bg-[#F6F5F3] text-[#575655] hover:text-[#111111] hover:bg-[#eceae6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-[11px] text-[#e8400d] hover:underline flex items-center gap-1 mr-auto shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>حذف فیلترها</span>
              </button>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-4 bg-[#F6F5F3] rounded-3xl border border-[rgba(17,17,17,0.06)]">
              <p className="text-sm font-semibold text-[#111111]">
                پروژه‌ای مطابق با معیارهای جستجوی شما یافت نشد.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#111111] rounded-lg hover:bg-[#272625] transition-colors"
              >
                نمایش کلیه پروژه‌ها
              </button>
            </div>
          )}
        </FadeIn>
      </section>
    </div>
  );
}
