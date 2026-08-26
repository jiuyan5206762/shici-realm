import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Filter, BookOpen, RotateCcw } from 'lucide-react';
import { poemApi } from '@/api/poems';
import { searchApi } from '@/api/search';
import { dynastyApi } from '@/api/dynasties';
import { typeApi } from '@/api/types';
import { PoemList } from '@/components/Poem/PoemList';
import { FilterPanel } from '@/components/Filter/FilterPanel';
import { MobileFilterDrawer } from '@/components/Filter/MobileFilterDrawer';
import { Pagination } from '@/components/Common/Pagination';
import { ErrorState } from '@/components/Common/ErrorState';
import { getPoetPoems } from '@/utils/poetDirectory';
import { Poem } from '@/types';

export const PoemsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract query parameters from URL
  const dynasty = searchParams.get('dynasty') || undefined;
  const type = searchParams.get('type') || undefined;
  const author = searchParams.get('author') || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 20;

  // 1. Fetch Dynasties & Types for Filter Panels
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
  });

  const { data: typesRes } = useQuery({
    queryKey: ['types'],
    queryFn: () => typeApi.getTypes(),
  });

  const dynasties = dynastiesRes?.data || [];
  const types = typesRes?.data || [];

  // Update URL SearchParams helper
  const updateFilter = (updates: {
    dynasty?: string | null;
    type?: string | null;
    author?: string | null;
    page?: number | null;
  }) => {
    const nextParams = new URLSearchParams(searchParams);

    if (updates.dynasty !== undefined) {
      if (updates.dynasty) nextParams.set('dynasty', updates.dynasty);
      else nextParams.delete('dynasty');
    }

    if (updates.type !== undefined) {
      if (updates.type) nextParams.set('type', updates.type);
      else nextParams.delete('type');
    }

    if (updates.author !== undefined) {
      if (updates.author) nextParams.set('author', updates.author);
      else nextParams.delete('author');
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

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Fetch Poems with true multi-page support for author
  const {
    data: poemsRes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['poems', { page, pageSize, dynasty, type, author }],
    queryFn: async () => {
      // If author filter is specified
      if (author) {
        const poetData = getPoetPoems(author, page, pageSize);

        if (poetData.totalCount > 0) {
          let items = poetData.poems;
          if (dynasty) items = items.filter((p) => p.dynasty?.name === dynasty);
          if (type) items = items.filter((p) => p.type?.name === type);

          return {
            data: items,
            pagination: {
              page,
              pageSize,
              hasMore: poetData.hasMore,
            },
            totalCount: poetData.totalCount,
            lang: 'zh-Hans',
          };
        }

        // For non-indexed authors, query dynamic remote sample & search
        const pool: Poem[] = [];
        try {
          const sample = await poemApi.getRandom({ author, dynasty, type });
          if (sample.data?.id) {
            pool.push(sample.data);
          }
        } catch {
          // continue
        }

        try {
          const q = author.length < 3 ? `${author} 诗` : author;
          const searchRes = await searchApi.search({ q, page, pageSize });
          const searchItems = (searchRes.data || []).filter(
            (p) => !pool.some((existing) => existing.id === p.id)
          );
          pool.push(...searchItems);
        } catch {
          // continue
        }

        let filtered = pool;
        if (dynasty) filtered = filtered.filter((p) => p.dynasty?.name === dynasty);
        if (type) filtered = filtered.filter((p) => p.type?.name === type);

        return {
          data: filtered,
          pagination: { page, pageSize, hasMore: pool.length >= pageSize },
          totalCount: pool.length,
          lang: 'zh-Hans',
        };
      }

      // Default pagination browse
      const res = await poemApi.getPoems({ page, pageSize });
      let filtered = res.data || [];
      if (dynasty) filtered = filtered.filter((p) => p.dynasty?.name === dynasty);
      if (type) filtered = filtered.filter((p) => p.type?.name === type);
      return { ...res, data: filtered, totalCount: 371313 };
    },
  });

  const poems = poemsRes?.data || [];
  const pagination = poemsRes?.pagination;
  const hasMore = pagination?.hasMore ?? (poems.length === pageSize);
  const totalCount = (poemsRes as any)?.totalCount;

  const activeFilterCount = (dynasty ? 1 : 0) + (type ? 1 : 0) + (author ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-2.5">
            <BookOpen className="w-7 h-7 sm:w-8 h-8 text-chinese-ochre" />
            <span>古诗总库 · 辞章雅聚</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-400 mt-1">
            历朝典籍收录，支持按朝代、体裁形式与诗人多维组合探索
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 px-4 py-2.5 bg-white dark:bg-chinese-nightCard border border-stone-200 dark:border-chinese-nightBorder rounded-xl text-xs font-medium text-ink-700 dark:text-ink-200 flex items-center justify-center space-x-2 shadow-sm"
          >
            <Filter className="w-4 h-4 text-chinese-ochre" />
            <span>多维筛选</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.2 bg-chinese-cinnabar text-white rounded-full text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-chinese-nightBorder text-ink-500 hover:text-rose-500"
              title="重置全部"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Tags Bar */}
      {activeFilterCount > 0 && (
        <div className="flex items-center space-x-2 flex-wrap gap-y-1.5 p-3 rounded-2xl bg-chinese-ochre/10 border border-chinese-ochre/20 text-xs">
          <span className="text-chinese-ochre font-semibold">当前筛选：</span>

          {dynasty && (
            <span className="inline-flex items-center bg-white dark:bg-stone-800 text-ink-700 dark:text-ink-200 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 space-x-1">
              <span>朝代：{dynasty}</span>
              <button
                onClick={() => updateFilter({ dynasty: null })}
                className="text-stone-400 hover:text-rose-500 font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          {type && (
            <span className="inline-flex items-center bg-white dark:bg-stone-800 text-ink-700 dark:text-ink-200 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 space-x-1">
              <span>体裁：{type}</span>
              <button
                onClick={() => updateFilter({ type: null })}
                className="text-stone-400 hover:text-rose-500 font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          {author && (
            <span className="inline-flex items-center bg-white dark:bg-stone-800 text-ink-700 dark:text-ink-200 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 space-x-1">
              <span>诗人：{author}</span>
              <button
                onClick={() => updateFilter({ author: null })}
                className="text-stone-400 hover:text-rose-500 font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-chinese-cinnabar hover:underline ml-2 font-medium"
          >
            清空所有筛选
          </button>
        </div>
      )}

      {/* Main Grid: Left Filter Sidebar (Desktop) + Right Poem List */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Panel */}
        <div className="hidden md:block md:col-span-1 sticky top-24">
          <FilterPanel
            dynasties={dynasties}
            types={types}
            selectedDynasty={dynasty}
            selectedType={type}
            selectedAuthor={author}
            onSelectDynasty={(d) => updateFilter({ dynasty: d || null })}
            onSelectType={(t) => updateFilter({ type: t || null })}
            onSelectAuthor={(a) => updateFilter({ author: a || null })}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Poems List */}
        <div className="md:col-span-3 space-y-6">
          {isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : (
            <>
              <PoemList
                poems={poems}
                isLoading={isLoading}
                onResetFilter={activeFilterCount > 0 ? handleResetFilters : undefined}
              />

              {/* Pagination with real multi-page count */}
              {!isLoading && (poems.length > 0 || (totalCount && totalCount > pageSize)) && (
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
                  <Pagination
                    currentPage={page}
                    hasMore={hasMore}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={(nextPage) => updateFilter({ page: nextPage })}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        dynasties={dynasties}
        types={types}
        selectedDynasty={dynasty}
        selectedType={type}
        selectedAuthor={author}
        onSelectDynasty={(d) => updateFilter({ dynasty: d || null })}
        onSelectType={(t) => updateFilter({ type: t || null })}
        onSelectAuthor={(a) => updateFilter({ author: a || null })}
        onReset={handleResetFilters}
      />
    </div>
  );
};
