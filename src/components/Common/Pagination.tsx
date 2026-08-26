import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

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

  // Generate page numbers array with smart ellipsis
  const getPageNumbers = () => {
    if (!totalPages) {
      // Unknown total pages: show current context
      const pages: number[] = [];
      const start = Math.max(1, currentPage - 2);
      for (let i = start; i <= currentPage + (hasMore ? 2 : 0); i++) {
        pages.push(i);
      }
      return pages;
    }

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > 4) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 ${className}`}>
      {/* Total / Status info */}
      <div className="text-xs sm:text-sm text-ink-400 dark:text-ink-400">
        第 <span className="font-semibold text-ink-700 dark:text-ink-100">{currentPage}</span> 页
        {totalPages && (
          <>
            {' '}
            / 共 <span className="font-semibold text-ink-700 dark:text-ink-100">{totalPages}</span> 页
          </>
        )}
        {totalCount !== undefined && (
          <>
            {' '}
            (共 <span className="text-chinese-ochre font-medium">{totalCount.toLocaleString()}</span> 首)
          </>
        )}
      </div>

      {/* Page numbers & Nav buttons */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 flex-wrap justify-center">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2 rounded-lg border border-stone-200 dark:border-chinese-nightBorder text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="首页"
          aria-label="首页"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 sm:p-2 rounded-lg border border-stone-200 dark:border-chinese-nightBorder text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="上一页"
          aria-label="上一页"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Number Buttons */}
        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 py-1 text-ink-400 text-sm">
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
              className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-chinese-ochre text-white shadow-sm font-semibold scale-105'
                  : 'border border-stone-200 dark:border-chinese-nightBorder text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={totalPages ? currentPage >= totalPages : !hasMore}
          className="p-1.5 sm:p-2 rounded-lg border border-stone-200 dark:border-chinese-nightBorder text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="下一页"
          aria-label="下一页"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page (if known) */}
        {totalPages && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded-lg border border-stone-200 dark:border-chinese-nightBorder text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="尾页"
            aria-label="尾页"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Jump input */}
      <form onSubmit={handleJump} className="flex items-center space-x-1.5 text-xs sm:text-sm">
        <span className="text-ink-400">跳至</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="页码"
          className="w-12 sm:w-14 px-2 py-1 text-center bg-white dark:bg-chinese-nightCard border border-stone-200 dark:border-chinese-nightBorder rounded-lg text-ink-700 dark:text-ink-200 focus:outline-none focus:ring-1 focus:ring-chinese-ochre"
        />
        <span className="text-ink-400">页</span>
        <button
          type="submit"
          disabled={!jumpPage}
          className="px-2 py-1 rounded-lg bg-stone-100 dark:bg-chinese-nightCard border border-stone-200 dark:border-chinese-nightBorder text-ink-600 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 transition-colors"
        >
          前往
        </button>
      </form>
    </div>
  );
};
