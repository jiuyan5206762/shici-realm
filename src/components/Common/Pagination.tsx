import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  hasMore?: boolean;
  totalCount?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasMore = false,
  totalCount,
  pageSize = 20,
  onPageChange,
  className = '',
}) => {
  const [jumpPage, setJumpPage] = useState('');

  // Calculate total pages if totalCount is known
  const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : undefined;

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPage, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      if (totalPages && pageNum > totalPages) {
        onPageChange(totalPages);
      } else {
        onPageChange(pageNum);
      }
      setJumpPage('');
    }
  };

  // Generate page numbers array for desktop
  const getPageNumbers = () => {
    if (!totalPages) {
      const pages: number[] = [];
      const start = Math.max(1, currentPage - 1);
      for (let i = start; i <= currentPage + (hasMore ? 1 : 0); i++) {
        pages.push(i);
      }
      return pages;
    }

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`space-y-4 py-4 ${className}`}>
      {/* Mobile & Desktop Header: Page Info & Direct Nav */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-serif text-ink-600 dark:text-ink-300">
        <div>
          第 <span className="font-bold text-ink-900 dark:text-ink-50">{currentPage}</span> 页
          {totalPages && (
            <>
              {' '}
              / 共 <span className="font-bold text-ink-900 dark:text-ink-50">{totalPages}</span> 页
            </>
          )}
          {totalCount !== undefined && (
            <span className="text-ink-500 dark:text-ink-400 ml-1">
              (共 {totalCount.toLocaleString()} 首)
            </span>
          )}
        </div>

        {/* Quick Jump Form */}
        {totalPages && totalPages > 1 && (
          <form onSubmit={handleJump} className="flex items-center space-x-2 text-sm">
            <span className="text-ink-500 dark:text-ink-400">跳至</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              placeholder="页码"
              className="w-16 px-2.5 py-1 text-center bg-white dark:bg-[#1E1E22] border border-stone-200 dark:border-stone-700 rounded-lg text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-1 focus:ring-chinese-ochre font-serif"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-200 hover:bg-chinese-ochre hover:text-white transition-colors"
            >
              跳转
            </button>
          </form>
        )}
      </div>

      {/* Buttons Strip (Responsive) */}
      <div className="flex items-center justify-between sm:justify-center space-x-1.5 sm:space-x-2">
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-ink-700 dark:text-ink-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-1 font-serif text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>上一页</span>
        </button>

        {/* Number Buttons (Hidden on ultra small screens if too many, shown on sm+) */}
        <div className="hidden sm:flex items-center space-x-1.5">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`dots-${idx}`} className="px-2 py-1 text-ink-400 font-serif">
                  …
                </span>
              );
            }

            const pageNum = Number(p);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[38px] h-10 px-2 rounded-xl text-sm font-serif font-medium transition-all ${
                  isActive
                    ? 'bg-chinese-ochre text-white shadow-sm font-bold'
                    : 'border border-stone-200 dark:border-stone-700 text-ink-700 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={totalPages ? currentPage >= totalPages : !hasMore}
          className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-ink-700 dark:text-ink-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-1 font-serif text-sm"
        >
          <span>下一页</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
