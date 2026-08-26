import React from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex flex-col justify-end md:hidden animate-fadeIn">
      <div className="bg-[#FAF8F5] dark:bg-[#18181A] border-t border-stone-200 dark:border-stone-800 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl animate-slideUp">
        {/* Top Drag Pill & Header */}
        <div className="pt-3 pb-3 px-6 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div className="w-12 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2.5" />
          <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50 mt-1">
            筛选诗词典籍
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-ink-500 hover:text-ink-900 dark:hover:text-ink-100 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="overflow-y-auto p-5 flex-1 space-y-4">
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

        {/* Action Sticky Bottom Bar */}
        <div className="p-4 border-t border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#1E1E22] flex items-center space-x-3 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-lg">
          <button
            onClick={onReset}
            className="flex-1 h-12 rounded-xl border border-stone-200 dark:border-stone-700 text-base font-serif font-medium text-ink-700 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 text-white text-base font-serif font-medium flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Check className="w-5 h-5" />
            <span>查看结果</span>
          </button>
        </div>
      </div>
    </div>
  );
};
