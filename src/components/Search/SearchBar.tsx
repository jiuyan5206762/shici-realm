import React, { useState, useRef, useEffect } from 'react';
import { Search, X, History, Sparkles, Flame } from 'lucide-react';
import { useSearchHistoryStore } from '@/store/searchHistoryStore';
import { guqinAudio } from '@/services/audio/guqinAudio';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  showSuggestions?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const HOT_SEARCHES = ['静夜思', '李白', '苏轼', '水调歌头', '将进酒', '明月', '春江花月夜', '辛弃疾'];

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  placeholder = '搜索古诗词名、诗句、诗人名（如：明月、李白、静夜思）...',
  onSearch,
  showSuggestions = true,
  autoFocus = false,
  className = '',
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { searches, addSearch, removeSearch } = useSearchHistoryStore();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Click outside to hide suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    guqinAudio.playChime();
    addSearch(trimmed);
    setIsFocused(false);
    onSearch(trimmed);
  };

  const handleSelectSuggestion = (text: string) => {
    guqinAudio.playChime();
    setQuery(text);
    addSearch(text);
    setIsFocused(false);
    onSearch(text);
  };

  const handleClear = () => {
    guqinAudio.playChime();
    setQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="absolute left-4 text-ink-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-paper-100 dark:bg-ink-800 border border-paper-400/60 dark:border-ink-700 rounded-2xl sm:rounded-3xl shadow-oriental text-xs sm:text-sm text-ink-900 dark:text-ink-50 placeholder-ink-400 dark:placeholder-ink-500 focus:outline-hidden focus:border-chinese-cinnabar font-serif transition-all"
        />

        <div className="absolute right-2.5 sm:right-3 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 hover:bg-paper-200 dark:hover:bg-ink-700 transition-colors"
              title="清空内容"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-chinese-cinnabar hover:bg-chinese-rouge text-white text-xs sm:text-sm font-serif font-bold rounded-xl sm:rounded-2xl transition-all shadow-xs interactive-tap flex items-center gap-1 flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>检索</span>
          </button>
        </div>
      </form>

      {/* Suggestion Dropdown */}
      {showSuggestions && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 xuan-card rounded-2xl shadow-xl z-50 p-4 space-y-4 border border-paper-400/50 animate-slide-down">
          {/* Recent Searches */}
          {searches.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-ink-400 font-serif">
                <span className="flex items-center gap-1">
                  <History className="w-3.5 h-3.5" />
                  <span>最近搜索</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 font-serif">
                {searches.map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center bg-paper-200 dark:bg-ink-800 rounded-xl text-xs text-ink-700 dark:text-ink-200 pl-2.5 pr-1 py-1 hover:bg-paper-300 dark:hover:bg-ink-700 transition-colors"
                  >
                    <span
                      onClick={() => handleSelectSuggestion(item)}
                      className="cursor-pointer"
                    >
                      {item}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearch(item);
                      }}
                      className="ml-1 p-0.5 text-ink-400 hover:text-red-500 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hot Searches */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-chinese-cinnabar font-serif font-bold">
              <Flame className="w-3.5 h-3.5 fill-chinese-cinnabar" />
              <span>热门推荐词</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-serif">
              {HOT_SEARCHES.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectSuggestion(item)}
                  className="px-2.5 py-1 rounded-xl text-xs bg-chinese-cinnabar/10 hover:bg-chinese-cinnabar/20 text-chinese-cinnabar transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
