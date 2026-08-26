import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, User } from 'lucide-react';
import { searchApi } from '@/api/search';
import { poemApi } from '@/api/poems';
import { SearchBar } from '@/components/Search/SearchBar';
import { PoemList } from '@/components/Poem/PoemList';
import { Pagination } from '@/components/Common/Pagination';
import { ErrorState } from '@/components/Common/ErrorState';
import { EmptyState } from '@/components/Common/EmptyState';
import { findPoetByName } from '@/utils/poetDirectory';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  // 1. If searching for a poet, fetch spotlight poem from remote API
  const { data: poetSampleRes } = useQuery({
    queryKey: ['searchPoetSample', q],
    queryFn: () => (q ? poemApi.getRandom({ author: q }) : null),
    enabled: Boolean(q && (matchedPoet || q.trim().length <= 4)),
  });

  // 2. Perform search query
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

      const queryToSend = q.trim().length < 3 ? `${q.trim()} 诗` : q.trim();
      const res = await searchApi.search({ q: queryToSend, page, pageSize });
      return res;
    },
    enabled: Boolean(q.trim()),
  });

  const poems = searchRes?.data || [];
  const pagination = searchRes?.pagination;
  const hasMore = pagination?.hasMore ?? (poems.length === pageSize);
  const poetSample = poetSampleRes?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50">
          全文诗词检索
        </h1>
        <p className="text-base text-ink-600 dark:text-ink-300 font-serif">
          输入诗题、诗句、诗人名或意象关键词，检索 37万+ 首古籍名篇
        </p>

        <div className="pt-2">
          <SearchBar initialValue={q} onSearch={handleSearch} autoFocus={!q} />
        </div>
      </div>

      {/* Search Results Area */}
      {q ? (
        <div className="space-y-8">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="text-base text-ink-700 dark:text-ink-200 font-serif">
              检索关键词：<span className="font-bold text-chinese-ochre">“{q}”</span>
              {!isLoading && (
                <span className="text-sm text-ink-500 dark:text-ink-400 ml-2">
                  (第 {page} 页)
                </span>
              )}
            </div>

            {matchedPoet && (
              <Link
                to={`/authors/${matchedPoet.id}?name=${encodeURIComponent(matchedPoet.name)}&dynasty=${encodeURIComponent(matchedPoet.dynasty.name)}`}
                className="text-base text-chinese-cinnabar hover:underline flex items-center space-x-1 font-serif font-medium"
              >
                <User className="w-4 h-4" />
                <span>进入【{matchedPoet.name}】专页</span>
              </Link>
            )}
          </div>

          {/* Poet Spotlight Card (if matched a poet) */}
          {matchedPoet && (
            <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-chinese-cinnabar text-white font-serif font-bold text-xl flex items-center justify-center">
                  {matchedPoet.name[0]}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-ink-900 dark:text-ink-50">
                    诗人 · {matchedPoet.name}（{matchedPoet.dynasty.name}代）
                  </h3>
                  <p className="text-base text-ink-600 dark:text-ink-300 font-serif mt-1">
                    {matchedPoet.description}
                  </p>
                </div>
              </div>

              {/* Representative Works Chips */}
              {matchedPoet.poems && matchedPoet.poems.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-base font-serif font-bold text-chinese-ochre">
                    传世代表名篇：
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {matchedPoet.poems.slice(0, 4).map((work) => (
                      <Link
                        key={work.id}
                        to={`/poems/${work.id}`}
                        className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-chinese-ochre block group"
                      >
                        <div className="font-serif font-bold text-base text-ink-900 dark:text-ink-100 group-hover:text-chinese-ochre truncate">
                          《{work.title}》
                        </div>
                        <div className="text-sm font-serif text-ink-500 dark:text-ink-400 truncate mt-1">
                          {(work.content || []).join(' ')}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Random sample if query is a poet */}
          {poetSample && !matchedPoet && (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1E22] border border-stone-200 dark:border-stone-700 flex items-center justify-between text-base font-serif">
              <span className="text-ink-700 dark:text-ink-200">
                匹配到诗人 <strong>{poetSample.author?.name}</strong> 作品：《{poetSample.title}》
              </span>
              <Link
                to={`/poems/${poetSample.id}`}
                className="text-chinese-ochre font-medium hover:underline ml-2"
              >
                阅读 →
              </Link>
            </div>
          )}

          {/* Search Result Poem Cards */}
          {isError ? (
            <ErrorState
              title="检索未响应或接口繁忙"
              message="请检查检索关键词，或稍后重新尝试"
              onRetry={() => refetch()}
            />
          ) : (
            <>
              <PoemList
                poems={poems}
                isLoading={isLoading}
                emptyTitle={matchedPoet ? `已在上方展示 ${q} 的代表作品` : `未找到包含 “${q}” 的相关诗词`}
                emptyDescription={
                  matchedPoet
                    ? `您可以直接点击上方卡片阅读 ${q} 的诗作，或前往古诗总库浏览`
                    : '可以尝试更换同义字词，例如搜索“明月”、“春风”、“李白”'
                }
              />

              {/* Pagination */}
              {!isLoading && poems.length > 0 && (
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
                  <Pagination
                    currentPage={page}
                    hasMore={hasMore}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        /* Empty State before searching */
        <EmptyState
          icon={<Search className="w-10 h-10 text-stone-400" />}
          title="开启您的诗词探索之旅"
          description="在上方输入关键词开始检索，或浏览首页推荐与朝代分类"
          actionText="随便看看推荐"
          onAction={() => navigate('/poems')}
        />
      )}
    </div>
  );
};
