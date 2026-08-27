import React, { useEffect } from 'react';
import { X, Check, RotateCcw, Filter } from 'lucide-react';
import { Dynasty, PoemType } from '@/types';
import { FilterPanel } from './FilterPanel';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dynasties: Dynasty[];
  types: PoemType[];
  selectedDynasty?: string;
  selectedType?: string;
  selectedAuthor?: string;
  onSelectDynasty: (dynasty?: string) => void;
  onSelectType: (type?: string) => void;
  onSelectAuthor: (author?: string) => void;
  onReset: () => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  dynasties,
  types,
  selectedDynasty,
  selectedType,
  selectedAuthor,
  onSelectDynasty,
  onSelectType,
  onSelectAuthor,
  onReset,
}) => {
  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeCount =
    (selectedDynasty ? 1 : 0) + (selectedType ? 1 : 0) + (selectedAuthor ? 1 : 0);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end md:hidden animate-fade-in touch-none"
    >
      <div
        className="bg-paper-50 dark:bg-ink-950 border-t border-paper-300 dark:border-ink-800 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle Bar & Header */}
        <div className="relative pt-3 pb-3 px-5 border-b border-paper-300/80 dark:border-ink-800 flex items-center justify-between flex-shrink-0">
          <div className="w-10 h-1 bg-paper-400 dark:bg-ink-700 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <div className="flex items-center gap-2 mt-1">
            <Filter className="w-4 h-4 text-chinese-cinnabar" />
            <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-50">
              筛选诗词典籍
            </h3>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 bg-chinese-cinnabar text-white rounded-full text-[10px] font-mono font-bold">
                已选 {activeCount} 项
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-500 hover:text-ink-900 dark:hover:text-ink-100 hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-1 space-y-4 touch-auto">
          <FilterPanel
            dynasties={dynasties}
            types={types}
            selectedDynasty={selectedDynasty}
            selectedType={selectedType}
            selectedAuthor={selectedAuthor}
            onSelectDynasty={onSelectDynasty}
            onSelectType={onSelectType}
            onSelectAuthor={onSelectAuthor}
            onReset={onReset}
            className="border-none shadow-none p-0 bg-transparent"
          />
        </div>

        {/* Action Bottom Bar with Safe Area */}
        <div className="p-4 border-t border-paper-300/80 dark:border-ink-800 bg-paper-100 dark:bg-ink-900 flex items-center gap-3 pb-[calc(1.2rem+env(safe-area-inset-bottom))] shadow-lg flex-shrink-0">
          <button
            onClick={onReset}
            className="flex-1 h-11 rounded-2xl border border-paper-300 dark:border-ink-700 text-sm font-serif font-bold text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置条件</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-2xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white text-sm font-serif font-bold flex items-center justify-center gap-1.5 shadow-seal transition-all active:scale-98"
          >
            <Check className="w-4 h-4" />
            <span>完成筛选</span>
          </button>
        </div>
      </div>
    </div>
  );
};
