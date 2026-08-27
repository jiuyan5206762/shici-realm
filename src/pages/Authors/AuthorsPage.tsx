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
import { guqinAudio } from '@/services/audio/guqinAudio';

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
    refetch,
  } = useQuery({
    queryKey: ['authors', { page, pageSize, dynasty, q }],
    queryFn: async () => {
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
          } catch {}
        }

        return {
          data: [],
          pagination: { page: 1, pageSize: 20, hasMore: false },
          totalCount: 0,
          lang: 'zh-Hans',
        };
      }

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
    staleTime: 30 * 60 * 1000,
  });

  const poetSamplePoem = poetSamplePoemRes?.data;

  const updateParam = (updates: { dynasty?: string | null; q?: string | null; page?: number | null }) => {
    guqinAudio.playChime();
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
    guqinAudio.playChime();
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  const authors: Author[] = (authorsRes?.data as Author[]) || [];
  const pagination = authorsRes?.pagination;
  const hasMore = pagination?.hasMore ?? (authors.length === pageSize);
  const totalCount = (authorsRes as any)?.totalCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in pb-20">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div>
          <div className="flex items-center gap-2">
            <SealBadge text="先贤" size="sm" variant="bamboo" />
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
              千古先贤 · 诗人百科
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 mt-1 font-serif">
            溯源历朝文学巨匠生平、字号别称与传世名篇
          </p>
        </div>

        {/* Poet Quick Search Input (Inner Search Button - zero overflow) */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-sm w-full">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="搜索诗人姓名 (如李白、苏轼)..."
            className="w-full pl-4 pr-12 py-2.5 text-xs sm:text-sm bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-2xl text-ink-900 dark:text-ink-50 focus:outline-hidden focus:border-chinese-cinnabar font-serif transition-colors"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-chinese-cinnabar hover:bg-chinese-rouge text-white rounded-xl text-xs font-serif font-bold shadow-xs transition-colors flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>搜索</span>
          </button>
        </form>
      </div>

      {/* Dynasty Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs font-serif">
        <span className="text-ink-500 font-semibold flex items-center gap-1 whitespace-nowrap">
          <Compass className="w-3.5 h-3.5 text-chinese-cinnabar" />
          <span>朝代：</span>
        </span>

        <button
          onClick={() => updateParam({ dynasty: null })}
          className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
            !dynasty
              ? 'bg-chinese-cinnabar text-white font-bold shadow-xs'
              : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-700'
          }`}
        >
          全部
        </button>

        {dynasties.map((d) => (
          <button
            key={d.id}
            onClick={() => updateParam({ dynasty: d.name === dynasty ? null : d.name })}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
              dynasty === d.name
                ? 'bg-chinese-cinnabar text-white font-bold shadow-xs'
                : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-700'
            }`}
          >
            {d.name}
          </button>
        ))}

        {(dynasty || q) && (
          <button
            onClick={handleReset}
            className="text-chinese-cinnabar hover:underline ml-3 flex items-center gap-1 whitespace-nowrap text-xs font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>
        )}
      </div>

      {/* When a poet is searched: Show Poet Works Spotlight */}
      {q && (matchedFamousPoet || poetSamplePoem) && (
        <div className="xuan-card rounded-3xl p-6 sm:p-8 space-y-6 border border-paper-400/40 shadow-oriental">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-300/80 dark:border-ink-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-chinese-cinnabar text-white font-serif font-bold text-2xl flex items-center justify-center shadow-xs">
                {q.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50">
                    {q}
                  </h3>
                  <SealBadge text={matchedFamousPoet?.dynasty?.name || poetSamplePoem?.dynasty?.name || '唐'} size="sm" variant="cinnabar" />
                </div>
                <div className="text-xs text-ink-400 font-serif mt-0.5">
                  文学大家 · 传世名篇入选
                </div>
              </div>
            </div>

            <Link
              to={`/poems?author=${encodeURIComponent(q)}`}
              onClick={() => guqinAudio.playChime()}
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

          {poetSamplePoem && (
            <div className="p-4 sm:p-5 rounded-2xl bg-paper-100/70 dark:bg-ink-800/60 border border-paper-300/60 dark:border-ink-700/60 text-center space-y-1.5">
              <div className="text-xs font-serif text-chinese-cinnabar">名篇赏析</div>
              <Link to={`/poems/${poetSamplePoem.id}`}>
                <h4 className="text-base sm:text-lg font-serif font-bold text-ink-900 dark:text-ink-50 hover:text-chinese-cinnabar">
                  《{poetSamplePoem.title}》
                </h4>
              </Link>
              <div className="font-serif text-ink-800 dark:text-ink-200 text-xs sm:text-sm leading-relaxed py-1">
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
            <div className="pt-6 border-t border-paper-300/80 dark:border-ink-800">
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
