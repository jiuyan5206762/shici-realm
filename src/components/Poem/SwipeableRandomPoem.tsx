import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Sparkles } from 'lucide-react';
import { Poem } from '@/types';
import { poemApi } from '@/api/poems';
import { PoemCard } from '@/components/Poem/PoemCard';
import { SealBadge } from '@/components/Common/SealBadge';
import { FAMOUS_POETS_DIRECTORY } from '@/utils/poetDirectory';

export type RandomPoemFilter = 'all' | 'tang' | 'song';

// Guaranteed instant curated poem helper
function getRandomLocalMasterpiece(dynasty?: string): Poem {
  const matchingPoems: Poem[] = [];
  for (const poet of FAMOUS_POETS_DIRECTORY) {
    if (!dynasty || poet.dynasty?.name === dynasty) {
      if (poet.poems && poet.poems.length > 0) {
        matchingPoems.push(...poet.poems);
      }
    }
  }

  if (matchingPoems.length > 0) {
    const idx = Math.floor(Math.random() * matchingPoems.length);
    return matchingPoems[idx];
  }

  // Fallback to absolute default masterpiece: 水调歌头 · 明月几时有
  return FAMOUS_POETS_DIRECTORY[0].poems[0];
}

export const SwipeableRandomPoem: React.FC = () => {
  const [filter, setFilter] = useState<RandomPoemFilter>('all');
  // Initialize with a guaranteed instant masterpiece so it NEVER shows empty / stuck loading
  const [history, setHistory] = useState<Poem[]>(() => [getRandomLocalMasterpiece()]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  // Real-time touch dragging state & physics
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  // Fast & resilient fetch with 1.8s timeout + guaranteed local fallback
  const fetchRandomPoem = useCallback(
    async (targetFilter = filter): Promise<Poem> => {
      if (isFetchingRef.current) {
        return getRandomLocalMasterpiece(
          targetFilter === 'tang' ? '唐' : targetFilter === 'song' ? '宋' : undefined
        );
      }
      isFetchingRef.current = true;
      setIsLoading(true);

      const dynastyParam =
        targetFilter === 'tang' ? '唐' : targetFilter === 'song' ? '宋' : undefined;

      try {
        // Race network fetch against a fast 1800ms timeout
        const timeoutPromise = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 1800)
        );
        const fetchPromise = poemApi.getRandom({ dynasty: dynastyParam });
        const res = (await Promise.race([fetchPromise, timeoutPromise])) as any;

        if (res && res.data && res.data.title && res.data.content?.length > 0) {
          return res.data;
        }
      } catch (err) {
        console.warn('Random poem network fetch timed out or failed, using curated masterpiece:', err);
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }

      // Instant local masterpiece fallback
      return getRandomLocalMasterpiece(dynastyParam);
    },
    [filter]
  );

  // Switch to Next Poem (or fetch new one if at end)
  const handleNext = async () => {
    setDragOffset(0);
    setIsDragging(false);

    if (currentIndex < history.length - 1) {
      setDirection('left');
      setCurrentIndex((prev) => prev + 1);
    } else {
      setDirection('left');
      const newPoem = await fetchRandomPoem();
      setHistory((prev) => [...prev, newPoem]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Switch to Previous Poem
  const handlePrevious = () => {
    setDragOffset(0);
    setIsDragging(false);

    if (currentIndex > 0) {
      setDirection('right');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Switch dynasty filter (All / Tang / Song)
  const handleFilterChange = async (newFilter: RandomPoemFilter) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setDirection('left');
    const newPoem = await fetchRandomPoem(newFilter);
    setHistory((prev) => [...prev, newPoem]);
    setCurrentIndex((prev) => prev + 1);
  };

  // Touch Gesture: Start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  // Touch Gesture: Move (Real-time card tracking)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartXRef.current;
    const diffY = currentY - touchStartYRef.current;

    // Only drag horizontally if horizontal movement exceeds vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Add slight elastic resistance
      setDragOffset(diffX * 0.88);
    }
  };

  // Touch Gesture: End (Snap to next/previous or spring back)
  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (dragOffset < -50) {
      // Swiped Left -> Next Poem
      handleNext();
    } else if (dragOffset > 50) {
      // Swiped Right -> Previous Poem
      if (currentIndex > 0) {
        handlePrevious();
      } else {
        setDragOffset(0);
      }
    } else {
      // Spring back to center
      setDragOffset(0);
    }
  };

  const currentPoem = history[currentIndex] || history[0];

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
            className="p-2 rounded-xl bg-paper-200 dark:bg-ink-800 hover:bg-paper-300 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200 disabled:opacity-30 transition-all active:scale-95 shadow-xs"
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

      {/* Swipeable Container with Real-Time Interactive Physics */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative group overflow-hidden rounded-3xl touch-pan-y"
      >
        <div
          key={currentPoem.id}
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.015}deg)`,
            opacity: Math.max(0.65, 1 - Math.abs(dragOffset) / 600),
            transition: isDragging
              ? 'none'
              : 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.24s ease',
            willChange: 'transform, opacity',
          }}
          className={`${
            !isDragging && direction === 'left'
              ? 'animate-slide-in-left'
              : !isDragging && direction === 'right'
              ? 'animate-slide-in-right'
              : ''
          }`}
        >
          <PoemCard poem={currentPoem} />
        </div>

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
