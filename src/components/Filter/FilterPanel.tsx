import React, { useState } from 'react';
import { RotateCcw, Compass, Layers, User, Search } from 'lucide-react';
import { Dynasty, PoemType } from '@/types';

interface FilterPanelProps {
  dynasties: Dynasty[];
  types: PoemType[];
  selectedDynasty?: string;
  selectedType?: string;
  selectedAuthor?: string;
  onSelectDynasty: (dynasty?: string) => void;
  onSelectType: (type?: string) => void;
  onSelectAuthor: (author?: string) => void;
  onReset: () => void;
  className?: string;
}

// Famous top master poets for quick selection
const FAMOUS_POETS = [
  '李白',
  '杜甫',
  '苏轼',
  '辛弃疾',
  '李清照',
  '王维',
  '白居易',
  '陶渊明',
  '陆游',
  '李商隐',
  '杜牧',
  '纳兰性德',
  '屈原',
  '孟浩然',
  '柳宗元',
  '王勃',
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  dynasties,
  types,
  selectedDynasty,
  selectedType,
  selectedAuthor,
  onSelectDynasty,
  onSelectType,
  onSelectAuthor,
  onReset,
  className = '',
}) => {
  const [authorInput, setAuthorInput] = useState(selectedAuthor || '');

  const handleAuthorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectAuthor(authorInput.trim() || undefined);
  };

  const hasActiveFilters = Boolean(selectedDynasty || selectedType || selectedAuthor);

  return (
    <div
      className={`bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder rounded-3xl p-6 shadow-oriental space-y-6 ${className}`}
    >
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
        <h3 className="font-serif font-bold text-base text-ink-800 dark:text-ink-100 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-chinese-ochre" />
          <span>多维诗库筛选</span>
        </h3>

        {hasActiveFilters && (
          <button
            onClick={() => {
              setAuthorInput('');
              onReset();
            }}
            className="flex items-center space-x-1 text-xs text-rose-600 dark:text-rose-400 hover:underline transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置全部</span>
          </button>
        )}
      </div>

      {/* 1. Dynasty Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-ink-500 dark:text-ink-400">
          <div className="flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-chinese-ochre" />
            <span>朝代历史</span>
          </div>
          {selectedDynasty && (
            <button
              onClick={() => onSelectDynasty(undefined)}
              className="text-chinese-ochre hover:underline text-[11px]"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectDynasty(undefined)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              !selectedDynasty
                ? 'bg-chinese-ochre text-white shadow-sm font-semibold'
                : 'bg-stone-100 dark:bg-stone-800/80 text-ink-600 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            全部
          </button>

          {dynasties.map((dynasty) => {
            const isSelected = selectedDynasty === dynasty.name;
            return (
              <button
                key={dynasty.id}
                onClick={() => onSelectDynasty(isSelected ? undefined : dynasty.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-chinese-ochre text-white shadow-sm font-semibold scale-105'
                    : 'bg-stone-100 dark:bg-stone-800/80 text-ink-600 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {dynasty.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Genre / Type Filter */}
      <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center justify-between text-xs font-semibold text-ink-500 dark:text-ink-400">
          <div className="flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-chinese-celadon" />
            <span>诗词体裁</span>
          </div>
          {selectedType && (
            <button
              onClick={() => onSelectType(undefined)}
              className="text-chinese-ochre hover:underline text-[11px]"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectType(undefined)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              !selectedType
                ? 'bg-chinese-celadon text-white shadow-sm font-semibold'
                : 'bg-stone-100 dark:bg-stone-800/80 text-ink-600 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            全部
          </button>

          {types.map((type) => {
            const isSelected = selectedType === type.name;
            return (
              <button
                key={type.id}
                onClick={() => onSelectType(isSelected ? undefined : type.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-chinese-celadon text-white shadow-sm font-semibold scale-105'
                    : 'bg-stone-100 dark:bg-stone-800/80 text-ink-600 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {type.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Author Filter */}
      <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center justify-between text-xs font-semibold text-ink-500 dark:text-ink-400">
          <div className="flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-chinese-cinnabar" />
            <span>诗人先贤</span>
          </div>
          {selectedAuthor && (
            <button
              onClick={() => {
                setAuthorInput('');
                onSelectAuthor(undefined);
              }}
              className="text-chinese-ochre hover:underline text-[11px]"
            >
              清除
            </button>
          )}
        </div>

        {/* Author Search Form */}
        <form onSubmit={handleAuthorSearch} className="flex items-center space-x-1.5">
          <input
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="输入诗人姓名 (如李白)"
            className="flex-1 px-3 py-1.5 text-xs bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-xl text-ink-800 dark:text-ink-100 focus:outline-none focus:ring-1 focus:ring-chinese-ochre"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 text-white text-xs transition-colors"
            title="按诗人筛选"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Famous Poets Quick Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {FAMOUS_POETS.map((poet) => {
            const isSelected = selectedAuthor === poet;
            return (
              <button
                key={poet}
                onClick={() => {
                  if (isSelected) {
                    setAuthorInput('');
                    onSelectAuthor(undefined);
                  } else {
                    setAuthorInput(poet);
                    onSelectAuthor(poet);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  isSelected
                    ? 'bg-chinese-cinnabar text-white font-medium shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800/80 text-ink-600 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {poet}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
