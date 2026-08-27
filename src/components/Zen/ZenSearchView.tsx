import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Minimize2, Sparkles, BookOpen, ArrowRight, X } from 'lucide-react';
import { useZenStore } from '@/store/zenStore';
import { searchApi } from '@/api/search';
import { SearchBar } from '@/components/Search/SearchBar';
import { SealBadge } from '@/components/Common/SealBadge';

const ZEN_QUOTES = [
  { text: '行到水穷处，坐看云起时。', author: '王维' },
  { text: '采菊东篱下，悠然见南山。', author: '陶渊明' },
  { text: '人生到处知何似，应似飞鸿踏雪泥。', author: '苏轼' },
  { text: '海上生明月，天涯共此时。', author: '张九龄' },
  { text: '大漠孤烟直，长河落日圆。', author: '王维' },
  { text: '落霞与孤鹜齐飞，秋水共长天一色。', author: '王勃' },
  { text: '山重水复疑无路，柳暗花明又一村。', author: '陆游' },
];

const HOT_KEYWORDS = ['李白', '苏轼', '将进酒', '辛弃疾', '明月', '春江花月夜', '水调歌头', '杜甫'];

export const ZenSearchView: React.FC = () => {
  const navigate = useNavigate();
  const toggleZenMode = useZenStore((state) => state.toggleZenMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Rotate quotes periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % ZEN_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

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

  // Quick live search query in Zen Mode
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
    setSearchQuery(query);
  };

  const handlePoemClick = (poemId: string | number) => {
    toggleZenMode();
    navigate(`/poems/${poemId}`);
  };

  const handleViewAllResults = () => {
    toggleZenMode();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const currentQuote = ZEN_QUOTES[currentQuoteIndex];

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 relative selection:bg-chinese-cinnabar/20 selection:text-chinese-cinnabar animate-fade-in font-serif">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-chinese-cinnabar text-white font-serif font-bold text-base flex items-center justify-center shadow-xs">
            诗
          </div>
          <span className="font-serif font-bold text-sm tracking-widest text-ink-700 dark:text-ink-300">
            诗境 · 极简纯粹
          </span>
          <SealBadge text="澄心" size="sm" variant="cinnabar" />
        </div>

        {/* Exit Minimalist Mode Button */}
        <button
          onClick={toggleZenMode}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-paper-400/80 dark:border-ink-700 bg-paper-50/80 dark:bg-ink-900/80 text-xs font-serif text-ink-700 dark:text-ink-200 hover:text-chinese-cinnabar hover:border-chinese-cinnabar transition-all shadow-xs interactive-tap group"
          title="退出极简模式 (按 Esc 键)"
        >
          <Minimize2 className="w-3.5 h-3.5 group-hover:scale-95 transition-transform" />
          <span>退出极简</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-paper-200 dark:bg-ink-800 text-ink-500 rounded-md">
            Esc
          </kbd>
        </button>
      </div>

      {/* Centerpiece: Poetic Branding + Single Centered Search */}
      <div className="my-auto w-full max-w-2xl mx-auto space-y-7 text-center">
        {/* Branding & Subtitle */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chinese-cinnabar/10 text-chinese-cinnabar text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>摒绝万虑 · 独对诗海</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-ink-900 dark:text-ink-50 tracking-wider">
            寻章摘句 · 一念入境
          </h1>

          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 transition-all duration-500 h-5">
            「{currentQuote.text}」—— {currentQuote.author}
          </p>
        </div>

        {/* Central Search Bar */}
        <div className="w-full">
          <SearchBar
            initialValue={searchQuery}
            onSearch={handleSearch}
            placeholder="输入诗词名句、名篇或诗人（按回车检索）..."
            autoFocus
            showSuggestions={!searchQuery}
          />
        </div>

        {/* Hot Keywords Recommendation */}
        {!searchQuery && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-ink-400">热寻名篇：</span>
            {HOT_KEYWORDS.map((kw) => (
              <button
                key={kw}
                onClick={() => setSearchQuery(kw)}
                className="px-2.5 py-1 rounded-full bg-paper-200/80 dark:bg-ink-800/80 text-ink-700 dark:text-ink-300 hover:bg-chinese-cinnabar hover:text-white transition-all text-xs"
              >
                {kw}
              </button>
            ))}
          </div>
        )}

        {/* Live Search Results in Zen Mode */}
        {searchQuery && (
          <div className="xuan-card rounded-3xl p-5 border border-paper-400/60 shadow-xl space-y-3 text-left animate-slide-up">
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

      {/* Bottom Footer Hint */}
      <div className="w-full text-center text-[11px] text-ink-400">
        <span>按 Esc 或点击右上角随时返回全景文华殿</span>
      </div>
    </div>
  );
};
