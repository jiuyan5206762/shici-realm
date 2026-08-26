import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Users, Search, Compass, RotateCcw, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { authorApi } from '@/api/authors';
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
                description: `${probe.data.dynasty?.name || ''}代文学名家，作品收录于诗泉古籍库。`,
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
            // continue
          }
        }

        return {
          data: [],
          pagination: { page: 1, pageSize: 20, hasMore: false },
          totalCount: 0,
          lang: 'zh-Hans',
        };
      }

      // Default pagination browse of the 13,000+ author database
      const res = await authorApi.getAuthors({ page, pageSize });
      return { ...res, totalCount: 13577 };
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-2.5">
            <Users className="w-7 h-7 sm:w-8 h-8 text-chinese-cinnabar" />
            <span>千古先贤 · 诗人百科</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-400 mt-1">
            历朝 13,000+ 位诗人辞采，溯源华夏文学巨匠生平与作品集录
          </p>
        </div>

        {/* Poet Quick Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="搜索诗人名字 (如李白、杜甫)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-chinese-nightCard border border-stone-200 dark:border-chinese-nightBorder rounded-xl text-ink-800 dark:text-ink-100 focus:outline-none focus:ring-1 focus:ring-chinese-ochre"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-chinese-ochre hover:bg-chinese-ochre/90 text-white rounded-xl text-xs sm:text-sm font-medium shadow-sm transition-colors"
          >
            搜索
          </button>
        </form>
      </div>

      {/* Dynasty Filter Chips Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar text-xs">
        <span className="text-ink-400 font-semibold flex items-center space-x-1 whitespace-nowrap">
          <Compass className="w-3.5 h-3.5" />
          <span>朝代：</span>
        </span>

        <button
          onClick={() => updateParam({ dynasty: null })}
          className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
            !dynasty
              ? 'bg-chinese-ochre text-white font-semibold shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200'
          }`}
        >
          全部朝代
        </button>

        {dynasties.map((d) => (
          <button
            key={d.id}
            onClick={() => updateParam({ dynasty: d.name === dynasty ? null : d.name })}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              dynasty === d.name
                ? 'bg-chinese-ochre text-white font-semibold shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200'
            }`}
          >
            {d.name}
          </button>
        ))}

        {(dynasty || q) && (
          <button
            onClick={handleReset}
            className="text-chinese-cinnabar hover:underline ml-2 flex items-center space-x-1 whitespace-nowrap"
          >
            <RotateCcw className="w-3 h-3" />
            <span>重置</span>
          </button>
        )}
      </div>

      {/* When a poet is searched: Show Poet Works Spotlight & Direct Links */}
      {q && (matchedFamousPoet || poetSamplePoem) && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-paper-50 to-paper-200/90 dark:from-chinese-nightCard dark:to-stone-900 border border-chinese-ochre/30 shadow-oriental space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-chinese-cinnabar text-white font-serif font-black text-xl flex items-center justify-center shadow-sm">
                {q.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50">
                  {q} 的古诗作品与生平
                </h3>
                <p className="text-xs text-ink-400">
                  已为您检索到诗人资料与经典存目
                </p>
              </div>
            </div>

            <Link
              to={`/poems?author=${encodeURIComponent(q)}`}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-chinese-ochre hover:bg-chinese-ochre/90 text-white rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95 self-start sm:self-auto"
            >
              <BookOpen className="w-4 h-4" />
              <span>在古诗库中浏览 {q} 的全部诗作</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Representative Works Cards */}
          {matchedFamousPoet?.poems && matchedFamousPoet.poems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-serif font-bold text-chinese-ochre">
                <Sparkles className="w-3.5 h-3.5" />
                <span>传世名篇精选</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {matchedFamousPoet.poems.slice(0, 4).map((work) => (
                  <Link
                    key={work.id}
                    to={`/poems/${work.id}`}
                    className="p-4 rounded-2xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-ochre/60 dark:hover:border-chinese-ochre/60 transition-all hover:shadow-md block group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-serif font-bold text-base text-ink-800 dark:text-ink-100 group-hover:text-chinese-ochre transition-colors truncate">
                        {work.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-ink-400">
                        {work.type?.name}
                      </span>
                    </div>
                    <p className="text-xs text-ink-500 dark:text-ink-400 font-serif line-clamp-2 leading-relaxed">
                      {(work.content || []).join(' ')}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sample Poem from DB */}
          {poetSamplePoem && (
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-chinese-ochre font-semibold">随机发现典籍作品：</span>
                <span className="font-serif font-bold text-ink-800 dark:text-ink-100 text-sm ml-1">
                  《{poetSamplePoem.title}》
                </span>
                <span className="text-ink-400 font-serif ml-2">
                  « {(poetSamplePoem.content || []).slice(0, 2).join('，')}…… »
                </span>
              </div>
              <Link
                to={`/poems/${poetSamplePoem.id}`}
                className="text-chinese-ochre font-medium hover:underline flex-shrink-0"
              >
                阅读这首诗 →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Main Author Cards Grid */}
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
