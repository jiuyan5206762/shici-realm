import React from 'react';
import { X, Check } from 'lucide-react';
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
      <div className="bg-paper-50 dark:bg-chinese-nightCard border-t border-stone-200 dark:border-chinese-nightBorder rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-chinese-nightBorder flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-ink-800 dark:text-ink-50">
            筛选诗词条件
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="overflow-y-auto p-4 flex-1">
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

        {/* Action Button */}
        <div className="p-4 border-t border-stone-200 dark:border-chinese-nightBorder bg-white dark:bg-chinese-night flex items-center space-x-3">
          <button
            onClick={onReset}
            className="flex-1 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-medium text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            重置
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 text-white text-sm font-medium flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>查看结果</span>
          </button>
        </div>
      </div>
    </div>
  );
};
