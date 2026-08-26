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

// 16 Famous Poets for Quick Selection
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
      className={`bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-7 ${className}`}
    >
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
        <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-chinese-ochre" />
          <span>典籍筛选</span>
        </h3>

        {hasActiveFilters && (
          <button
            onClick={() => {
              setAuthorInput('');
              onReset();
            }}
            className="flex items-center space-x-1 text-sm text-rose-600 dark:text-rose-400 hover:underline transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>
        )}
      </div>

      {/* 1. Dynasty Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm font-semibold text-ink-700 dark:text-ink-300 font-serif">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-chinese-ochre" />
            <span>朝代</span>
          </div>
          {selectedDynasty && (
            <button
              onClick={() => onSelectDynasty(undefined)}
              className="text-chinese-ochre hover:underline text-xs"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectDynasty(undefined)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !selectedDynasty
                ? 'bg-chinese-ochre text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
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
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-chinese-ochre text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {dynasty.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Genre / Type Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center justify-between text-sm font-semibold text-ink-700 dark:text-ink-300 font-serif">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-chinese-ochre" />
            <span>体裁</span>
          </div>
          {selectedType && (
            <button
              onClick={() => onSelectType(undefined)}
              className="text-chinese-ochre hover:underline text-xs"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectType(undefined)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !selectedType
                ? 'bg-chinese-ochre text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
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
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-chinese-ochre text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {type.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Author Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center justify-between text-sm font-semibold text-ink-700 dark:text-ink-300 font-serif">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-chinese-ochre" />
            <span>诗人名家</span>
          </div>
          {selectedAuthor && (
            <button
              onClick={() => {
                setAuthorInput('');
                onSelectAuthor(undefined);
              }}
              className="text-chinese-ochre hover:underline text-xs"
            >
              清除
            </button>
          )}
        </div>

        {/* Author Search Form */}
        <form onSubmit={handleAuthorSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="搜索诗人姓名 (如李白)"
            className="flex-1 px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-1 focus:ring-chinese-ochre font-serif"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 text-white text-sm transition-colors flex items-center justify-center"
            title="检索诗人"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Famous Poets Quick Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
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
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors font-serif ${
                  isSelected
                    ? 'bg-chinese-cinnabar text-white font-medium shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
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
