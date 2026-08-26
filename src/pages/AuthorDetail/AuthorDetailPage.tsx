import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Shuffle, BookOpen, Sparkles } from 'lucide-react';
import { poemApi } from '@/api/poems';
import { searchApi } from '@/api/search';
import { PoemList } from '@/components/Poem/PoemList';
import { Pagination } from '@/components/Common/Pagination';
import { getDynastyColorClass } from '@/utils/formatters';
import { getPoetPoems } from '@/utils/poetDirectory';

export const AuthorDetailPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const authorName = searchParams.get('name') || '诗人';
  const authorDynasty = searchParams.get('dynasty') || '古';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 20;

  // 1. Fetch a Featured / Spotlight poem by this author
  const {
    data: spotlightPoemRes,
    refetch: refetchSpotlight,
    isFetching: isFetchingSpotlight,
  } = useQuery({
    queryKey: ['authorSpotlight', authorName],
    queryFn: () => poemApi.getRandom({ author: authorName }),
    staleTime: 5 * 60 * 1000,
  });

  // 2. Fetch author's works via verified directory & remote search with pagination
  const {
    data: worksRes,
    isLoading: isWorksLoading,
  } = useQuery({
    queryKey: ['authorWorks', { authorName, page, pageSize }],
    queryFn: async () => {
      const poetData = getPoetPoems(authorName, page, pageSize);
      if (poetData.totalCount > 0) {
        return {
          data: poetData.poems,
          pagination: {
            page,
            pageSize,
            hasMore: poetData.hasMore,
          },
          totalCount: poetData.totalCount,
        };
      }

      const q = authorName.length < 3 ? `${authorName} 诗` : authorName;
      const res = await searchApi.search({ q, page, pageSize });
      return {
        data: res.data || [],
        pagination: res.pagination,
        totalCount: (res.data || []).length,
      };
    },
  });

  const spotlightPoem = spotlightPoemRes?.data;
  const works = worksRes?.data || [];
  const pagination = worksRes?.pagination;
  const totalCount = worksRes?.totalCount;
  const hasMore = pagination?.hasMore ?? (works.length === pageSize);

  const dynastyColor = getDynastyColorClass(authorDynasty);

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextPage > 1) {
      nextParams.set('page', String(nextPage));
    } else {
      nextParams.delete('page');
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm text-ink-400">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-1 hover:text-chinese-ochre transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回上一页</span>
        </button>
        <span>/</span>
        <Link to="/authors" className="hover:text-chinese-ochre">
          诗人百科
        </Link>
        <span>/</span>
        <span className="text-ink-700 dark:text-ink-200 font-medium">{authorName}</span>
      </div>

      {/* Poet Profile Banner Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-paper-50 to-paper-200/90 dark:from-chinese-nightCard dark:to-stone-900 border border-stone-200/90 dark:border-chinese-nightBorder rounded-3xl p-6 sm:p-10 shadow-oriental">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            {/* Poet Avatar Initial */}
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-chinese-cinnabar text-white font-serif font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md flex-shrink-0">
              {authorName.charAt(0)}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
                  {authorName}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${dynastyColor.bg} ${dynastyColor.text} ${dynastyColor.border}`}>
                  {authorDynasty}代
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 max-w-xl font-sans">
                {authorDynasty}代著名文豪。本页汇集了诗泉古籍库收录之相关代表作与典籍辞章。
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => refetchSpotlight()}
              disabled={isFetchingSpotlight}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 text-white text-xs sm:text-sm font-medium shadow-sm transition-transform active:scale-95 disabled:opacity-50"
            >
              <Shuffle className={`w-4 h-4 ${isFetchingSpotlight ? 'animate-spin' : ''}`} />
              <span>抽一首该诗人作品</span>
            </button>
          </div>
        </div>
      </div>

      {/* Poet Spotlight Piece (if available) */}
      {spotlightPoem && (
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-sm font-serif font-bold text-chinese-ochre">
            <Sparkles className="w-4 h-4" />
            <span>名篇雅鉴 · 《{spotlightPoem.title}》</span>
          </div>
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder text-center space-y-3">
            <Link to={`/poems/${spotlightPoem.id}`}>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50 hover:text-chinese-ochre transition-colors">
                {spotlightPoem.title}
              </h3>
            </Link>
            <div className="text-xs text-ink-400 font-serif">
              {spotlightPoem.dynasty?.name}代 · {spotlightPoem.author?.name} · {spotlightPoem.type?.name}
            </div>
            <div className="font-serif text-ink-700 dark:text-ink-200 text-sm sm:text-base leading-loose max-w-lg mx-auto py-2">
              {(spotlightPoem.content || []).slice(0, 4).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div className="pt-2">
              <Link
                to={`/poems/${spotlightPoem.id}`}
                className="inline-flex items-center space-x-1 text-chinese-ochre text-xs font-semibold hover:underline"
              >
                <span>阅读全文与 AI 深度解析 →</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Poet's Anthology List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-chinese-ochre" />
              <span>{authorName} 的诗篇存目</span>
            </h2>
            <p className="text-xs text-ink-400">
              第 {page} 页 (每页 20 首)
            </p>
          </div>
        </div>

        {/* Poems Grid */}
        <PoemList
          poems={works}
          isLoading={isWorksLoading}
          emptyTitle={`暂未检索到 ${authorName} 的更多作品`}
          emptyDescription="请尝试通过上方随机抽选按钮漫游作品，或返回诗人百科浏览其他名家"
        />

        {/* Pagination */}
        {!isWorksLoading && (works.length > 0 || (totalCount && totalCount > pageSize)) && (
          <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
            <Pagination
              currentPage={page}
              hasMore={hasMore}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </div>
  );
};
