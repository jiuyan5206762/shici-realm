import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Compass, RotateCcw, BookOpen, ArrowRight } from 'lucide-react';
import { dynastyApi } from '@/api/dynasties';
import { poemApi } from '@/api/poems';
import { AuthorCard } from '@/components/Author/AuthorCard';
import { AuthorCardSkeleton } from '@/components/Common/LoadingSkeleton';
import { Pagination } from '@/components/Common/Pagination';
import { EmptyState } from '@/components/Common/EmptyState';
import { ErrorState } from '@/components/Common/ErrorState';
import { findPoetByName, filterAuthorsByCriteria } from '@/utils/poetDirectory';
import { Author } from '@/types';
import { SealBadge } from '@/components/Common/SealBadge';

export const AuthorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const dynasty = searchParams.get('dynasty') || undefined;
  const q = searchParams.get('q') || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 20;

  // 1. Fetch Dynasties for author filter
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
    staleTime: 60 * 60 * 1000,
  });

  const dynasties = dynastiesRes?.data || [];

  // Check if searched query matches famous poet directory
  const matchedFamousPoet = q ? findPoetByName(q) : undefined;

  // 2. Fetch Authors with pagination, dynasty filter and smart search
  const {
    data: authorsRes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['authorsPage', { dynasty, q, page }],
    queryFn: async () => {
      // Local filter directory for instant high-quality match
      const localResult = filterAuthorsByCriteria(dynasty, q, page, pageSize);
      return localResult;
    },
    staleTime: 10 * 60 * 1000,
  });

  // 3. Sample Poem for Searched Famous Poet
  const { data: poetSamplePoemRes } = useQuery({
    queryKey: ['poetSamplePoem', q],
    queryFn: () => (q ? poemApi.getRandom({ author: q }) : null),
    enabled: Boolean(q),
    staleTime: 30 * 60 * 1000,
  });

  const poetSamplePoem = poetSamplePoemRes?.data;

  const updateParam = (updates: { dynasty?: string | null; q?: string | null; page?: number | null }) => {
    const nextParams = new URLSearchParams(searchParams);

    if (updates.dynasty !== undefined) {
      if (updates.dynasty) nextParams.set('dynasty', updates.dynasty);
      else nextParams.delete('dynasty');
    }

    if (updates.q !== undefined) {
      if (updates.q) nextParams.set('q', updates.q);
      else nextParams.delete('q');
    }

    if (updates.page !== undefined) {
      if (updates.page && updates.page > 1) nextParams.set('page', String(updates.page));
      else nextParams.delete('page');
    } else {
      nextParams.delete('page');
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam({ q: searchInput.trim() || null });
  };

  const handleReset = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  const authors: Author[] = authorsRes?.authors || [];
  const hasMore = authorsRes?.hasMore ?? (authors.length === pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in pb-20">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SealBadge text="先贤" size="sm" variant="bamboo" />
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
              千古先贤 · 历代词宗
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif">
            探寻从先秦诸子到唐宋八大家之风骨神采，领略百代名宿笔墨芳华
          </p>
        </div>

        {/* Search Bar with Internal Button */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="搜索诗人（如：李白、苏轼）..."
            className="w-full pl-3.5 pr-10 py-2.5 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-xl text-xs sm:text-sm text-ink-900 dark:text-ink-50 focus:outline-hidden focus:border-chinese-cinnabar transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-chinese-cinnabar hover:bg-chinese-rouge text-white rounded-lg shadow-xs transition-colors flex items-center justify-center"
            title="搜索诗人"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Dynasty Filter Chips */}
      <div className="xuan-card rounded-3xl p-4 sm:p-6 border border-paper-400/40 shadow-oriental space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-serif text-ink-500">
            <Compass className="w-4 h-4 text-chinese-cinnabar" />
            <span>依朝代寻访先贤：</span>
          </div>

          {(dynasty || q) && (
            <button
              onClick={handleReset}
              className="text-xs font-serif text-chinese-cinnabar hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>清除所有筛选</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParam({ dynasty: null, page: 1 })}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
              !dynasty
                ? 'bg-chinese-cinnabar text-white shadow-xs'
                : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 border border-paper-300/60 dark:border-ink-700'
            }`}
          >
            全部朝代
          </button>
          {dynasties.map((d) => {
            const isSelected = dynasty === d.name;
            return (
              <button
                key={d.id}
                onClick={() => updateParam({ dynasty: d.name, page: 1 })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-serif transition-all ${
                  isSelected
                    ? 'bg-chinese-cinnabar text-white font-bold shadow-xs'
                    : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 border border-paper-300/60 dark:border-ink-700'
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spotlight: Searched Famous Poet Card */}
      {q && (matchedFamousPoet || poetSamplePoem) && (
        <div className="xuan-card rounded-3xl p-6 sm:p-8 border-2 border-chinese-cinnabar/30 bg-chinese-cinnabar/5 space-y-4 animate-fade-in shadow-oriental">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-chinese-cinnabar text-white font-serif font-bold text-xl flex items-center justify-center shadow-xs">
                {q.slice(0, 1)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50">
                    {q}
                  </h2>
                  {matchedFamousPoet?.dynasty?.name && (
                    <SealBadge text={matchedFamousPoet.dynasty.name} size="sm" variant="bamboo" />
                  )}
                </div>
                <div className="text-xs text-ink-400 font-serif mt-0.5">
                  文学大家 · 传世名篇入选
                </div>
              </div>
            </div>

            <Link
              to={`/poems?author=${encodeURIComponent(q)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white text-xs font-serif font-bold shadow-xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>查看 {q} 全部诗篇</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {matchedFamousPoet?.description && (
            <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 font-serif leading-relaxed">
              {matchedFamousPoet.description}
            </p>
          )}

          {/* Sample Poem Snippet */}
          {poetSamplePoem && (
            <div className="p-4 rounded-2xl bg-paper-50 dark:bg-ink-900 border border-paper-300 dark:border-ink-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-serif text-ink-400">
                <span>代表绝句摘录：</span>
                <span>《{poetSamplePoem.title}》</span>
              </div>
              <p className="text-sm font-serif font-bold text-chinese-cinnabar leading-relaxed">
                {poetSamplePoem.content.slice(0, 2).join('，')}。
              </p>
            </div>
          )}
        </div>
      )}

      {/* Author Grid Display */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <AuthorCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState message={(error as Error)?.message || '加载诗人列表失败'} onRetry={refetch} />
      ) : authors.length === 0 ? (
        <EmptyState
          title="未寻得相关先贤"
          description="可尝试切换朝代或重新搜索其他诗人名讳"
          onAction={handleReset}
          actionText="重置检索条件"
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {authors.map((author) => (
              <AuthorCard key={author.id || author.name} author={author} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            hasMore={hasMore}
            pageSize={pageSize}
            onPageChange={(newPage) => updateParam({ page: newPage })}
          />
        </div>
      )}
    </div>
  );
};
