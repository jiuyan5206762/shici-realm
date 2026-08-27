import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Minimize2, ArrowRight, X, BookOpen } from 'lucide-react';
import { useZenStore } from '@/store/zenStore';
import { searchApi } from '@/api/search';
import { SearchBar } from '@/components/Search/SearchBar';

export const ZenSearchView: React.FC = () => {
  const navigate = useNavigate();
  const toggleZenMode = useZenStore((state) => state.toggleZenMode);
  const [searchQuery, setSearchQuery] = useState('');

  // Listen for Esc key to exit Zen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleZenMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleZenMode]);

  // Live search query in Zen Mode
  const { data: searchRes, isLoading } = useQuery({
    queryKey: ['zenSearch', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return null;
      return searchApi.search({ q: searchQuery.trim(), page: 1, pageSize: 6 });
    },
    enabled: Boolean(searchQuery.trim()),
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = (query: string) => {
    if (query.trim()) {
      toggleZenMode();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handlePoemClick = (poemId: string | number) => {
    toggleZenMode();
    navigate(`/poems/${poemId}`);
  };

  const handleViewAllResults = () => {
    toggleZenMode();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 relative selection:bg-chinese-cinnabar/20 selection:text-chinese-cinnabar animate-fade-in font-serif">
      {/* Floating Exit Zen Mode Button (Top Right) */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleZenMode}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-paper-400/80 dark:border-ink-700 bg-paper-50/90 dark:bg-ink-900/90 text-xs font-serif text-ink-700 dark:text-ink-200 hover:text-chinese-cinnabar hover:border-chinese-cinnabar transition-all shadow-sm interactive-tap group"
          title="退出极简模式 (或按 Esc 键)"
        >
          <Minimize2 className="w-3.5 h-3.5 group-hover:scale-95 transition-transform" />
          <span>退出极简模式</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-paper-200 dark:bg-ink-800 text-ink-500 rounded-md">
            Esc
          </kbd>
        </button>
      </div>

      {/* Pure Central Search Bar Area */}
      <div className="w-full max-w-2xl mx-auto space-y-4 text-center">
        <div className="w-full">
          <SearchBar
            initialValue={searchQuery}
            onSearch={handleSearch}
            placeholder="搜索诗词名句、名篇、诗人（按回车检索）..."
            autoFocus
            showSuggestions={false}
          />
        </div>

        {/* Live Search Instant Dropdown Results if user typed */}
        {searchQuery && (
          <div className="xuan-card rounded-3xl p-5 border border-paper-400/60 shadow-2xl space-y-3 text-left animate-slide-up">
            <div className="flex items-center justify-between pb-2 border-b border-paper-300/80 dark:border-ink-800 text-xs">
              <span className="text-ink-500 font-serif">
                匹配「{searchQuery}」的传世佳句：
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-ink-400 hover:text-chinese-cinnabar p-0.5 rounded-full"
                title="清空"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {isLoading ? (
              <div className="py-6 text-center text-xs text-ink-400">
                正在古籍诗海中寻觅中...
              </div>
            ) : searchRes?.data && searchRes.data.length > 0 ? (
              <div className="space-y-2">
                {searchRes.data.slice(0, 5).map((poem) => (
                  <div
                    key={poem.id}
                    onClick={() => handlePoemClick(poem.id)}
                    className="p-3 rounded-xl hover:bg-chinese-cinnabar/10 dark:hover:bg-ink-700/60 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-0.5 max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-ink-900 dark:text-ink-50 group-hover:text-chinese-cinnabar transition-colors">
                          《{poem.title}》
                        </span>
                        <span className="text-xs text-ink-400">
                          〔{poem.dynasty?.name || '唐'}〕{poem.author?.name || '佚名'}
                        </span>
                      </div>
                      <p className="text-xs text-ink-600 dark:text-ink-300 truncate">
                        {poem.content ? poem.content.slice(0, 2).join('，') : ''}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-chinese-cinnabar group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}

                <button
                  onClick={handleViewAllResults}
                  className="w-full mt-2 py-2 rounded-xl bg-chinese-cinnabar text-white text-xs font-serif font-bold hover:bg-chinese-rouge transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>查看「{searchQuery}」全部搜索结果</span>
                </button>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-ink-400">
                未找到匹配诗篇，尝试更换关键词
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
