import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Shuffle, BookOpen } from 'lucide-react';
import { poemApi } from '@/api/poems';
import { searchApi } from '@/api/search';
import { PoemList } from '@/components/Poem/PoemList';
import { Pagination } from '@/components/Common/Pagination';
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
      <div className="flex items-center space-x-2 text-sm text-ink-500 dark:text-ink-400 font-serif">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-1 hover:text-chinese-ochre transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </button>
        <span>/</span>
        <Link to="/authors" className="hover:text-chinese-ochre">
          诗人百科
        </Link>
        <span>/</span>
        <span className="text-ink-900 dark:text-ink-100 font-medium">{authorName}</span>
      </div>

      {/* Poet Profile Card */}
      <div className="bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            {/* Poet Avatar Initial */}
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-stone-100 dark:bg-stone-800 text-chinese-cinnabar font-serif font-bold text-2xl sm:text-3xl flex items-center justify-center border border-stone-200 dark:border-stone-700 shadow-sm flex-shrink-0">
              {authorName.charAt(0)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50">
                  {authorName}
                </h1>
                <span className="px-3 py-1 rounded-lg text-sm font-serif bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300">
                  〔{authorDynasty}〕文学大家
                </span>
              </div>

              <p className="text-sm sm:text-base text-ink-600 dark:text-ink-300 max-w-xl font-serif leading-relaxed">
                本页收录 {authorName} 传世作品与相关名篇汇编。
              </p>
            </div>
          </div>

          <button
            onClick={() => refetchSpotlight()}
            disabled={isFetchingSpotlight}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Shuffle className={`w-4 h-4 ${isFetchingSpotlight ? 'animate-spin' : ''}`} />
            <span>随机名篇</span>
          </button>
        </div>
      </div>

      {/* Poet Spotlight Piece (if available) */}
      {spotlightPoem && (
        <section className="space-y-4">
          <div className="text-base font-serif font-bold text-chinese-ochre">
            名篇雅荐 · 《{spotlightPoem.title}》
          </div>
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 text-center space-y-3 shadow-sm">
            <Link to={`/poems/${spotlightPoem.id}`}>
              <h3 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-50 hover:text-chinese-ochre transition-colors tracking-wide">
                {spotlightPoem.title}
              </h3>
            </Link>
            <div className="text-sm text-ink-500 font-serif">
              〔{spotlightPoem.dynasty?.name}〕{spotlightPoem.author?.name} {spotlightPoem.type?.name ? `· ${spotlightPoem.type.name}` : ''}
            </div>
            <div className="font-serif text-ink-900 dark:text-ink-100 text-base sm:text-lg leading-loose max-w-lg mx-auto py-3 tracking-wide">
              {(spotlightPoem.content || []).slice(0, 4).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div className="pt-2">
              <Link
                to={`/poems/${spotlightPoem.id}`}
                className="text-chinese-ochre text-sm font-serif font-semibold hover:underline"
              >
                品读全篇与赏析 →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Poet's Anthology List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-chinese-ochre" />
              <span>{authorName} 作品集</span>
            </h2>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1 font-serif">
              共收录相关篇目
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
