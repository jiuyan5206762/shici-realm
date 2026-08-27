import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Sparkles } from 'lucide-react';
import { Poem } from '@/types';
import { poemApi } from '@/api/poems';
import { PoemCard } from '@/components/Poem/PoemCard';
import { SealBadge } from '@/components/Common/SealBadge';

export type RandomPoemFilter = 'all' | 'tang' | 'song';

export const SwipeableRandomPoem: React.FC = () => {
  const [filter, setFilter] = useState<RandomPoemFilter>('all');
  const [history, setHistory] = useState<Poem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  // Touch coordinates for gesture tracking
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  // Fetch a new random poem
  const fetchRandomPoem = useCallback(
    async (targetFilter = filter): Promise<Poem | null> => {
      if (isFetchingRef.current) return null;
      isFetchingRef.current = true;
      setIsLoading(true);

      try {
        const dynastyParam =
          targetFilter === 'tang' ? '唐' : targetFilter === 'song' ? '宋' : undefined;
        const res = await poemApi.getRandom({ dynasty: dynastyParam });
        if (res.data) {
          return res.data;
        }
        return null;
      } catch (err) {
        console.error('Failed to fetch random poem:', err);
        return null;
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    },
    [filter]
  );

  // Initial load
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const initialPoem = await fetchRandomPoem(filter);
      if (isMounted && initialPoem) {
        setHistory([initialPoem]);
        setCurrentIndex(0);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Switch to Next Poem (or fetch new one if at end)
  const handleNext = async () => {
    if (isLoading) return;

    if (currentIndex < history.length - 1) {
      setDirection('left');
      setCurrentIndex((prev) => prev + 1);
    } else {
      setDirection('left');
      const newPoem = await fetchRandomPoem();
      if (newPoem) {
        setHistory((prev) => [...prev, newPoem]);
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  // Switch to Previous Poem
  const handlePrevious = () => {
    if (currentIndex > 0 && !isLoading) {
      setDirection('right');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Switch filter (All / Tang / Song)
  const handleFilterChange = async (newFilter: RandomPoemFilter) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setDirection('left');
    const newPoem = await fetchRandomPoem(newFilter);
    if (newPoem) {
      setHistory((prev) => [...prev, newPoem]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Touch Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartXRef.current;
    const deltaY = endY - touchStartYRef.current;

    // Reset touch refs
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Check if horizontal swipe gesture (at least 45px, more horizontal than vertical)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swiped Left -> Next Poem
        handleNext();
      } else {
        // Swiped Right -> Previous Poem
        handlePrevious();
      }
    }
  };

  const currentPoem = history[currentIndex];

  return (
    <section className="space-y-4 select-none">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-5 bg-amber-600 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50 tracking-wider">
            偶得佳句 · 随心漫游
          </h2>
          <SealBadge text="漫步" size="sm" variant="gold" />
          {history.length > 1 && (
            <span className="hidden sm:inline-block text-xs font-serif text-ink-400">
              第 {currentIndex + 1} / {history.length} 首
            </span>
          )}
        </div>

        {/* Filter Pills & Refresh Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-paper-200 dark:bg-ink-800 p-1 rounded-xl text-xs font-serif">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-paper-50 dark:bg-ink-900 text-chinese-cinnabar font-bold shadow-xs'
                  : 'text-ink-600 dark:text-ink-300 hover:text-ink-900'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => handleFilterChange('tang')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filter === 'tang'
                  ? 'bg-paper-50 dark:bg-ink-900 text-chinese-cinnabar font-bold shadow-xs'
                  : 'text-ink-600 dark:text-ink-300 hover:text-ink-900'
              }`}
            >
              唐诗
            </button>
            <button
              onClick={() => handleFilterChange('song')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filter === 'song'
                  ? 'bg-paper-50 dark:bg-ink-900 text-chinese-cinnabar font-bold shadow-xs'
                  : 'text-ink-600 dark:text-ink-300 hover:text-ink-900'
              }`}
            >
              宋词
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isLoading}
            className="p-2 rounded-xl bg-paper-200 dark:bg-ink-800 hover:bg-paper-300 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200 disabled:opacity-40 transition-all active:scale-95 shadow-xs"
            title="上一首诗 (可右滑)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white font-serif text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-seal"
            title="下一首诗 (可左滑)"
          >
            <Shuffle className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>下一篇</span>
            <ChevronRight className="w-3.5 h-3.5 -mr-1" />
          </button>
        </div>
      </div>

      {/* Swipeable Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative group overflow-hidden rounded-3xl touch-pan-y"
      >
        {currentPoem ? (
          <div
            key={currentPoem.id}
            className={`${
              direction === 'left'
                ? 'animate-slide-in-left'
                : direction === 'right'
                ? 'animate-slide-in-right'
                : 'animate-fade-in'
            }`}
          >
            <PoemCard poem={currentPoem} />
          </div>
        ) : (
          <div className="xuan-card rounded-3xl p-12 text-center text-ink-400 font-serif space-y-2">
            <Shuffle className="w-6 h-6 mx-auto text-chinese-cinnabar animate-spin" />
            <p>正在漫游寻觅佳句...</p>
          </div>
        )}

        {/* Desktop Left Float Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper-50/90 dark:bg-ink-900/90 hover:bg-chinese-cinnabar hover:text-white text-ink-700 dark:text-ink-200 border border-paper-300 dark:border-ink-700 items-center justify-center shadow-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95"
            title="上一篇 (快捷键: ←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Desktop Right Float Arrow */}
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper-50/90 dark:bg-ink-900/90 hover:bg-chinese-cinnabar hover:text-white text-ink-700 dark:text-ink-200 border border-paper-300 dark:border-ink-700 items-center justify-center shadow-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95"
          title="下一篇 (快捷键: →)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Swipe Hint Footnote */}
      <div className="flex items-center justify-between text-[11px] font-serif text-ink-400 px-1">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>支持左右滑动或点击箭头快速切换上一首 / 下一首</span>
        </span>
        <span>
          已漫游 {history.length} 首（当前第 {currentIndex + 1} 首）
        </span>
      </div>
    </section>
  );
};
