import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, ArrowRight } from 'lucide-react';
import { searchApi } from '@/api/search';
import { poemApi } from '@/api/poems';
import { SearchBar } from '@/components/Search/SearchBar';
import { PoemList } from '@/components/Poem/PoemList';
import { Pagination } from '@/components/Common/Pagination';
import { ErrorState } from '@/components/Common/ErrorState';
import { findPoetByName } from '@/utils/poetDirectory';
import { SealBadge } from '@/components/Common/SealBadge';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 20;

  const handleSearch = (newQuery: string) => {
    const nextParams = new URLSearchParams();
    if (newQuery.trim()) {
      nextParams.set('q', newQuery.trim());
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextPage > 1) {
      nextParams.set('page', String(nextPage));
    } else {
      nextParams.delete('page');
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if searched query is a famous poet
  const matchedPoet = q ? findPoetByName(q) : undefined;

  // 1. If searching for a poet, fetch spotlight poem
  const { data: poetSampleRes } = useQuery({
    queryKey: ['searchPoetSample', q],
    queryFn: () => (q ? poemApi.getRandom({ author: q }) : null),
    enabled: Boolean(q && (matchedPoet || q.trim().length <= 4)),
    staleTime: 30 * 60 * 1000,
  });

  // 2. Perform search query with in-memory & local cache
  const {
    data: searchRes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['search', { q, page, pageSize }],
    queryFn: async () => {
      if (!q.trim()) {
        return { data: [], pagination: { page: 1, pageSize, hasMore: false }, lang: 'zh-Hans' };
      }

      const res = await searchApi.search({ q: q.trim(), page, pageSize });
      return res;
    },
    enabled: Boolean(q.trim()),
    staleTime: 5 * 60 * 1000,
  });

  const poems = searchRes?.data || [];
  const pagination = searchRes?.pagination;
  const hasMore = pagination?.hasMore ?? (poems.length === pageSize);
  const poetSample = poetSampleRes?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in pb-20">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <SealBadge text="搜卷" size="sm" variant="cinnabar" />
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
            全库检索 · 寻章摘句
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif">
          输入诗词名句、篇名或诗人姓名，毫秒级快速匹配古籍藏本
        </p>

        <div className="pt-2">
          <SearchBar initialValue={q} onSearch={handleSearch} autoFocus />
        </div>
      </div>

      {/* When a poet is searched: Show Poet Profile Spotlight */}
      {q && (matchedPoet || poetSample) && (
        <div className="max-w-4xl mx-auto xuan-card rounded-3xl p-6 sm:p-8 space-y-5 border border-paper-400/40 shadow-oriental">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-300/80 dark:border-ink-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-chinese-cinnabar text-white font-serif font-bold text-xl flex items-center justify-center shadow-xs">
                {q.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50">
                    {q}
                  </h3>
                  <SealBadge text={matchedPoet?.dynasty?.name || poetSample?.dynasty?.name || '唐'} size="sm" variant="cinnabar" />
                </div>
                <div className="text-xs text-ink-400 font-serif mt-0.5">
                  文学大家 · 传世名篇入选
                </div>
              </div>
            </div>

            <Link
              to={`/poems?author=${encodeURIComponent(q)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white text-xs font-serif font-bold shadow-xs transition-all interactive-tap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>查看 {q} 传世作品</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          {matchedPoet?.description && (
            <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 font-serif leading-relaxed">
              {matchedPoet.description}
            </p>
          )}

          {poetSample && (
            <div className="p-4 sm:p-5 rounded-2xl bg-paper-100/70 dark:bg-ink-800/60 border border-paper-300/60 dark:border-ink-700/60 text-center space-y-1.5">
              <div className="text-xs font-serif text-chinese-cinnabar">代表名篇赏析</div>
              <h4 className="text-base font-serif font-bold text-ink-900 dark:text-ink-50">
                《{poetSample.title}》
              </h4>
              <p className="text-sm font-serif text-ink-700 dark:text-ink-200">
                {poetSample.content.slice(0, 2).join('，')}。
              </p>
            </div>
          )}
        </div>
      )}

      {/* Results List */}
      {q.trim() && (
        <div className="space-y-6">
          {isError ? (
            <ErrorState
              title="检索诗词失败"
              message="可能网络波动或服务暂时不可用，请点击重试"
              onRetry={() => refetch()}
            />
          ) : (
            <>
              <PoemList
                poems={poems}
                isLoading={isLoading}
                emptyTitle="未找到匹配诗篇"
                emptyDescription={`未找到与「${q}」相关的诗篇，可尝试减少关键词`}
              />

              {!isLoading && poems.length > 0 && (
                <Pagination
                  currentPage={page}
                  hasMore={hasMore}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
