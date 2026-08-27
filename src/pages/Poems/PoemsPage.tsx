import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Filter, RotateCcw } from 'lucide-react';
import {
  poemApi,
  DYNASTY_NAME_TO_ID,
  TYPE_NAME_TO_ID,
  AUTHOR_NAME_TO_ID,
  DYNASTY_TOTAL_COUNTS,
  TYPE_TOTAL_COUNTS,
  AUTHOR_TOTAL_COUNTS,
} from '@/api/poems';
import { dynastyApi } from '@/api/dynasties';
import { typeApi } from '@/api/types';
import { PoemList } from '@/components/Poem/PoemList';
import { FilterPanel } from '@/components/Filter/FilterPanel';
import { MobileFilterDrawer } from '@/components/Filter/MobileFilterDrawer';
import { Pagination } from '@/components/Common/Pagination';
import { ErrorState } from '@/components/Common/ErrorState';
import { filterPoemsByCriteria } from '@/utils/poetDirectory';
import { SealBadge } from '@/components/Common/SealBadge';

import { SearchBar } from '@/components/Search/SearchBar';
import { smartSearchPoems } from '@/utils/searchEngine';

export const PoemsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract query parameters from URL
  const q = searchParams.get('q') || '';
  const dynasty = searchParams.get('dynasty') || undefined;
  const type = searchParams.get('type') || undefined;
  const author = searchParams.get('author') || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 20;

  // 1. Fetch Dynasties & Types for Filter Panels
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
    staleTime: 60 * 60 * 1000,
  });

  const { data: typesRes } = useQuery({
    queryKey: ['types'],
    queryFn: () => typeApi.getTypes(),
    staleTime: 60 * 60 * 1000,
  });

  const dynasties = dynastiesRes?.data || [];
  const types = typesRes?.data || [];

  const activeFilterCount = (q ? 1 : 0) + (dynasty ? 1 : 0) + (type ? 1 : 0) + (author ? 1 : 0);

  // Update URL SearchParams helper
  const updateFilter = (updates: {
    q?: string | null;
    dynasty?: string | null;
    type?: string | null;
    author?: string | null;
    page?: number | null;
  }) => {
    const nextParams = new URLSearchParams(searchParams);

    if (updates.q !== undefined) {
      if (updates.q) nextParams.set('q', updates.q);
      else nextParams.delete('q');
    }

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

  // 2. Fetch Poems with smart hybrid search engine & multi-level ranking
  const {
    data: poemsRes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['poems', { q, page, pageSize, dynasty, type, author }],
    queryFn: async () => {
      // If user typed a search keyword, use high-precision smartSearch engine
      if (q.trim()) {
        const smartRes = await smartSearchPoems({
          q: q.trim(),
          page,
          pageSize,
          dynasty,
          type,
          author,
        });
        return smartRes;
      }

      const dynastyId = dynasty ? DYNASTY_NAME_TO_ID[dynasty] : undefined;
      const typeId = type ? TYPE_NAME_TO_ID[type] : undefined;
      const authorId = author ? AUTHOR_NAME_TO_ID[author] : undefined;

      // Special handling for dynasties not indexed in remote database
      if (dynastyId === 2 || dynastyId === 4 || dynastyId === 5) {
        const localFiltered = filterPoemsByCriteria(dynasty, type, author, page, pageSize);
        return {
          data: localFiltered.poems,
          pagination: {
            page,
            pageSize,
            hasMore: localFiltered.hasMore,
          },
          totalCount: localFiltered.totalCount,
          lang: 'zh-Hans',
        };
      }

      // Query real backend API by authorId / dynastyId / typeId
      const res = await poemApi.getPoems({
        page,
        pageSize,
        dynastyId,
        typeId,
        authorId,
      });

      // If backend returns poems, compute accurate total count
      if (res.data && res.data.length > 0) {
        let computedTotal = 371313;
        if (authorId && AUTHOR_TOTAL_COUNTS[authorId]) {
          computedTotal = AUTHOR_TOTAL_COUNTS[authorId];
        } else if (dynastyId && DYNASTY_TOTAL_COUNTS[dynastyId]) {
          computedTotal = DYNASTY_TOTAL_COUNTS[dynastyId];
        } else if (typeId && TYPE_TOTAL_COUNTS[typeId]) {
          computedTotal = TYPE_TOTAL_COUNTS[typeId];
        }

        return {
          ...res,
          totalCount: computedTotal,
        };
      }

      // If author is not indexed by ID in remote API, search with smart hybrid search
      if (author) {
        return smartSearchPoems({ q: author, page, pageSize, dynasty, type });
      }

      const localFiltered = filterPoemsByCriteria(dynasty, type, author, page, pageSize);
      return {
        data: localFiltered.poems,
        pagination: {
          page,
          pageSize,
          hasMore: localFiltered.hasMore,
        },
        totalCount: localFiltered.totalCount,
        lang: 'zh-Hans',
      };
    },
  });

  const poems = poemsRes?.data || [];
  const pagination = poemsRes?.pagination;
  const hasMore = pagination?.hasMore ?? (poems.length === pageSize);
  const totalCount = (poemsRes as any)?.totalCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
              古籍诗库全帙
            </h1>
            <SealBadge text="典藏" size="sm" variant="cinnabar" />
          </div>
          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif">
            多维联动朝代、体裁与名家，品读千载文脉风华
          </p>
        </div>

        {/* Quick In-Library Search */}
        <div className="w-full md:max-w-md">
          <SearchBar
            initialValue={q}
            onSearch={(newQ) => updateFilter({ q: newQ || null, page: 1 })}
            placeholder="在诗库中精准检索名句、篇名、诗人..."
            showSuggestions={false}
          />
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 px-4 py-2.5 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-2xl text-xs font-serif font-bold text-ink-800 dark:text-ink-200 flex items-center justify-center gap-2 shadow-xs"
          >
            <Filter className="w-3.5 h-3.5 text-chinese-cinnabar" />
            <span>筛选条件</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-chinese-cinnabar text-white rounded-full text-xs font-mono font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="p-2.5 rounded-2xl border border-paper-300 dark:border-ink-700 text-ink-500 hover:text-chinese-cinnabar"
              title="重置全部筛选"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Tags Bar */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap p-3.5 rounded-2xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-serif">
          <span className="text-ink-500 dark:text-ink-400">已选条件：</span>

          {q && (
            <span className="inline-flex items-center bg-chinese-cinnabar/10 text-chinese-cinnabar px-3 py-1 rounded-xl border border-chinese-cinnabar/30 gap-1.5 shadow-xs font-bold">
              <span>关键词 · {q}</span>
              <button
                onClick={() => updateFilter({ q: null })}
                className="text-chinese-cinnabar hover:text-red-700 font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          {dynasty && (
            <span className="inline-flex items-center bg-paper-50 dark:bg-ink-900 text-ink-800 dark:text-ink-100 px-3 py-1 rounded-xl border border-paper-300 dark:border-ink-700 gap-1.5 shadow-xs">
              <span>朝代 · {dynasty}</span>
              <button
                onClick={() => updateFilter({ dynasty: null })}
                className="text-ink-400 hover:text-chinese-cinnabar font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          {type && (
            <span className="inline-flex items-center bg-paper-50 dark:bg-ink-900 text-ink-800 dark:text-ink-100 px-3 py-1 rounded-xl border border-paper-300 dark:border-ink-700 gap-1.5 shadow-xs">
              <span>体裁 · {type}</span>
              <button
                onClick={() => updateFilter({ type: null })}
                className="text-ink-400 hover:text-chinese-cinnabar font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          {author && (
            <span className="inline-flex items-center bg-paper-50 dark:bg-ink-900 text-ink-800 dark:text-ink-100 px-3 py-1 rounded-xl border border-paper-300 dark:border-ink-700 gap-1.5 shadow-xs">
              <span>诗人 · {author}</span>
              <button
                onClick={() => updateFilter({ author: null })}
                className="text-ink-400 hover:text-chinese-cinnabar font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-chinese-cinnabar hover:underline ml-3 font-bold text-xs"
          >
            清空筛选
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

              {/* Pagination */}
              {!isLoading && (poems.length > 0 || (totalCount && totalCount > pageSize)) && (
                <div className="pt-6 border-t border-paper-300/80 dark:border-ink-800">
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
