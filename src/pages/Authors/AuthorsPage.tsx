import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Users, Search, Compass, RotateCcw, BookOpen, ArrowRight } from 'lucide-react';
import { dynastyApi } from '@/api/dynasties';
import { poemApi } from '@/api/poems';
import { AuthorCard } from '@/components/Author/AuthorCard';
import { AuthorCardSkeleton } from '@/components/Common/LoadingSkeleton';
import { Pagination } from '@/components/Common/Pagination';
import { EmptyState } from '@/components/Common/EmptyState';
import { ErrorState } from '@/components/Common/ErrorState';
import { findPoetByName, filterAuthorsByCriteria } from '@/utils/poetDirectory';
import { Author } from '@/types';

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
  });

  const dynasties = dynastiesRes?.data || [];

  // Check if searched query matches famous poet directory
  const matchedFamousPoet = q ? findPoetByName(q) : undefined;

  // 2. Fetch Authors with pagination, dynasty filter and smart search
  const {
    data: authorsRes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['authors', { page, pageSize, dynasty, q }],
    queryFn: async () => {
      // If filtering by dynasty or searching by name
      if (dynasty || q) {
        const filtered = filterAuthorsByCriteria(dynasty, q, page, pageSize);

        if (filtered.authors.length > 0) {
          return {
            data: filtered.authors,
            pagination: { page, pageSize, hasMore: filtered.hasMore },
            totalCount: filtered.totalCount,
            lang: 'zh-Hans',
          };
        }

        // Try probing remote API for poet
        if (q) {
          try {
            const probe = await poemApi.getRandom({ author: q });
            if (probe.data?.author?.name) {
              const dynamicAuthor: Author = {
                id: probe.data.author.id,
                name: probe.data.author.name,
                description: `${probe.data.dynasty?.name || ''}代文学大家，作品收录于诗境典籍库。`,
                dynasty: probe.data.dynasty,
              };
              return {
                data: [dynamicAuthor],
                pagination: { page: 1, pageSize: 20, hasMore: false },
                totalCount: 1,
                lang: 'zh-Hans',
              };
            }
          } catch {
            // fallback
          }
        }

        return {
          data: [],
          pagination: { page: 1, pageSize: 20, hasMore: false },
          totalCount: 0,
          lang: 'zh-Hans',
        };
      }

      // Default: Return full verified famous poets directory
      const filtered = filterAuthorsByCriteria(undefined, undefined, page, pageSize);
      return {
        data: filtered.authors,
        pagination: { page, pageSize, hasMore: filtered.hasMore },
        totalCount: filtered.totalCount,
        lang: 'zh-Hans',
      };
    },
  });

  // 3. Fetch spotlight poem for the searched poet
  const { data: poetSamplePoemRes } = useQuery({
    queryKey: ['poetSearchPoem', q],
    queryFn: () => (q ? poemApi.getRandom({ author: q }) : null),
    enabled: Boolean(q),
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

  const authors: Author[] = (authorsRes?.data as Author[]) || [];
  const pagination = authorsRes?.pagination;
  const hasMore = pagination?.hasMore ?? (authors.length === pageSize);
  const totalCount = (authorsRes as any)?.totalCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-3">
            <Users className="w-8 h-8 text-chinese-cinnabar" />
            <span>千古先贤 · 诗人百科</span>
          </h1>
          <p className="text-base text-ink-600 dark:text-ink-300 mt-2 font-serif">
            溯源历朝文学巨匠生平与传世名篇
          </p>
        </div>

        {/* Poet Quick Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="搜索诗人姓名 (如李白、苏轼)..."
              className="w-full pl-11 pr-4 py-2.5 text-base bg-white dark:bg-[#1E1E22] border border-stone-200 dark:border-stone-700 rounded-xl text-ink-900 dark:text-ink-50 focus:outline-none focus:ring-1 focus:ring-chinese-ochre font-serif"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-chinese-ochre hover:bg-chinese-ochre/90 text-white rounded-xl text-base font-medium shadow-sm transition-colors"
          >
            搜索
          </button>
        </form>
      </div>

      {/* Dynasty Filter Chips Bar */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 no-scrollbar text-base font-serif">
        <span className="text-ink-500 dark:text-ink-400 font-semibold flex items-center space-x-1.5 whitespace-nowrap">
          <Compass className="w-4 h-4 text-chinese-ochre" />
          <span>朝代：</span>
        </span>

        <button
          onClick={() => updateParam({ dynasty: null })}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            !dynasty
              ? 'bg-chinese-ochre text-white font-medium shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          全部
        </button>

        {dynasties.map((d) => (
          <button
            key={d.id}
            onClick={() => updateParam({ dynasty: d.name === dynasty ? null : d.name })}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              dynasty === d.name
                ? 'bg-chinese-ochre text-white font-medium shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {d.name}
          </button>
        ))}

        {(dynasty || q) && (
          <button
            onClick={handleReset}
            className="text-chinese-cinnabar hover:underline ml-3 flex items-center space-x-1 whitespace-nowrap text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置</span>
          </button>
        )}
      </div>

      {/* When a poet is searched: Show Poet Works Spotlight & Direct Links */}
      {q && (matchedFamousPoet || poetSamplePoem) && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-chinese-cinnabar text-white font-serif font-bold text-2xl flex items-center justify-center shadow-sm">
                {q.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-50">
                  {q}
                </h3>
                <div className="text-base text-ink-500 dark:text-ink-400 font-serif mt-0.5">
                  〔{matchedFamousPoet?.dynasty?.name || poetSamplePoem?.dynasty?.name || '古'}〕文学大家
                </div>
              </div>
            </div>

            <Link
              to={`/poems?author=${encodeURIComponent(q)}`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 text-white text-base font-medium shadow-sm transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>查看 {q} 全部诗篇</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {matchedFamousPoet?.description && (
            <p className="text-base sm:text-lg text-ink-700 dark:text-ink-300 font-serif leading-relaxed">
              {matchedFamousPoet.description}
            </p>
          )}

          {poetSamplePoem && (
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-center space-y-2">
              <div className="text-sm font-serif text-chinese-ochre">名篇赏析</div>
              <Link to={`/poems/${poetSamplePoem.id}`}>
                <h4 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-50 hover:text-chinese-ochre">
                  《{poetSamplePoem.title}》
                </h4>
              </Link>
              <div className="font-serif text-ink-800 dark:text-ink-200 text-base sm:text-lg leading-loose py-2">
                {(poetSamplePoem.content || []).slice(0, 4).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Authors Grid */}
      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <AuthorCardSkeleton key={idx} />
          ))}
        </div>
      ) : authors.length === 0 ? (
        <EmptyState
          title="未找到匹配的诗人"
          description="尝试调整朝代筛选，或直接前往古诗库搜索该诗人的作品"
          actionText="前往古诗库检索"
          onAction={() => updateParam({ q: null, dynasty: null })}
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>

          {/* Pagination */}
          {!q && (
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
              <Pagination
                currentPage={page}
                hasMore={hasMore}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={(nextPage) => updateParam({ page: nextPage })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
