import React, { useState } from 'react';
import { RotateCcw, Compass, Layers, User, Search } from 'lucide-react';
import { Dynasty, PoemType } from '@/types';
import { SealBadge } from '@/components/Common/SealBadge';

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
      className={`xuan-card rounded-3xl p-5 sm:p-6 shadow-oriental border border-paper-400/40 space-y-6 ${className}`}
    >
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3.5 border-b border-paper-300/80 dark:border-ink-800">
        <div className="flex items-center gap-2">
          <SealBadge text="选录" size="sm" variant="cinnabar" />
          <h3 className="font-serif font-bold text-base sm:text-lg text-ink-900 dark:text-ink-50">
            典籍精筛
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => {
              setAuthorInput('');
              onReset();
            }}
            className="flex items-center gap-1 text-xs font-serif text-chinese-cinnabar hover:underline transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>
        )}
      </div>

      {/* 1. Dynasty Filter */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-ink-700 dark:text-ink-300 font-serif">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-chinese-cinnabar" />
            <span>朝代</span>
          </div>
          {selectedDynasty && (
            <button
              onClick={() => {
                onSelectDynasty(undefined);
              }}
              className="text-chinese-cinnabar hover:underline text-xs font-serif"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              onSelectDynasty(undefined);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-serif transition-colors ${
              !selectedDynasty
                ? 'bg-chinese-cinnabar text-white font-bold shadow-xs'
                : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-700'
            }`}
          >
            全部
          </button>

          {dynasties.map((dynasty) => {
            const isSelected = selectedDynasty === dynasty.name;
            return (
              <button
                key={dynasty.id}
                onClick={() => {
                  onSelectDynasty(isSelected ? undefined : dynasty.name);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-serif transition-colors ${
                  isSelected
                    ? 'bg-chinese-cinnabar text-white font-bold shadow-xs'
                    : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-700'
                }`}
              >
                {dynasty.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Genre / Type Filter */}
      <div className="space-y-2.5 pt-3.5 border-t border-paper-300/60 dark:border-ink-800">
        <div className="flex items-center justify-between text-xs font-bold text-ink-700 dark:text-ink-300 font-serif">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-chinese-celadon" />
            <span>体裁</span>
          </div>
          {selectedType && (
            <button
              onClick={() => {
                onSelectType(undefined);
              }}
              className="text-chinese-cinnabar hover:underline text-xs font-serif"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              onSelectType(undefined);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-serif transition-colors ${
              !selectedType
                ? 'bg-chinese-celadon text-white font-bold shadow-xs'
                : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-700'
            }`}
          >
            全部
          </button>

          {types.map((type) => {
            const isSelected = selectedType === type.name;
            return (
              <button
                key={type.id}
                onClick={() => {
                  onSelectType(isSelected ? undefined : type.name);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-serif transition-colors ${
                  isSelected
                    ? 'bg-chinese-celadon text-white font-bold shadow-xs'
                    : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-700'
                }`}
              >
                {type.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Author Filter */}
      <div className="space-y-2.5 pt-3.5 border-t border-paper-300/60 dark:border-ink-800">
        <div className="flex items-center justify-between text-xs font-bold text-ink-700 dark:text-ink-300 font-serif">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-chinese-cinnabar" />
            <span>诗人名家</span>
          </div>
          {selectedAuthor && (
            <button
              onClick={() => {
                setAuthorInput('');
                onSelectAuthor(undefined);
              }}
              className="text-chinese-cinnabar hover:underline text-xs font-serif"
            >
              清除
            </button>
          )}
        </div>

        {/* Author Search Form - Safe Nested Icon Button (Zero overflow) */}
        <form onSubmit={handleAuthorSearch} className="relative w-full">
          <input
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="搜索诗人姓名 (如李白)..."
            className="w-full pl-3.5 pr-10 py-2 text-xs bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-xl text-ink-900 dark:text-ink-100 focus:outline-hidden focus:border-chinese-cinnabar font-serif transition-colors"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-chinese-cinnabar hover:bg-chinese-rouge text-white text-xs transition-colors flex items-center justify-center shadow-xs"
            title="检索诗人"
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
                className={`px-2.5 py-1 rounded-xl text-xs transition-colors font-serif ${
                  isSelected
                    ? 'bg-chinese-cinnabar text-white font-bold shadow-xs'
                    : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-200 dark:hover:bg-ink-700'
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
