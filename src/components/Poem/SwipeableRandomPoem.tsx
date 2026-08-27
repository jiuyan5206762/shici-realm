import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Sparkles, Zap } from 'lucide-react';
import { Poem } from '@/types';
import { poemApi } from '@/api/poems';
import { PoemCard } from '@/components/Poem/PoemCard';
import { SealBadge } from '@/components/Common/SealBadge';
import { FAMOUS_POETS_DIRECTORY } from '@/utils/poetDirectory';

export type RandomPoemFilter = 'all' | 'tang' | 'song';

// Extract all available curated poems grouped by filter
function getMasterpiecePool(dynastyFilter?: string): Poem[] {
  const list: Poem[] = [];
  for (const poet of FAMOUS_POETS_DIRECTORY) {
    if (!dynastyFilter || poet.dynasty?.name === dynastyFilter) {
      if (poet.poems && poet.poems.length > 0) {
        list.push(...poet.poems);
      }
    }
  }
  // Shuffle array using Fisher-Yates
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

// Generate initial robust pre-buffered queue of 30+ poems
function generateInitialQueue(filter: RandomPoemFilter): Poem[] {
  const dynastyName = filter === 'tang' ? '唐' : filter === 'song' ? '宋' : undefined;
  const pool = getMasterpiecePool(dynastyName);
  if (pool.length > 0) {
    return pool.slice(0, 40);
  }
  return FAMOUS_POETS_DIRECTORY.flatMap((p) => p.poems);
}

export const SwipeableRandomPoem: React.FC = () => {
  const [filter, setFilter] = useState<RandomPoemFilter>('all');
  // Pre-seed buffer with 30+ ready poems: 0ms switch time, zero wait!
  const [queue, setQueue] = useState<Poem[]>(() => generateInitialQueue('all'));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  // Real-time touch dragging state & physics
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const isPrefetchingRef = useRef<boolean>(false);

  // Background Prefetcher: Silently fetches new poems ahead so user NEVER hits an await
  const prefetchMore = useCallback(async (currentFilter: RandomPoemFilter) => {
    if (isPrefetchingRef.current) return;
    isPrefetchingRef.current = true;

    try {
      const dynastyParam =
        currentFilter === 'tang' ? '唐' : currentFilter === 'song' ? '宋' : undefined;
      const res = await poemApi.getRandom({ dynasty: dynastyParam });
      if (res && res.data && res.data.title) {
        setQueue((prev) => {
          // Avoid duplicate adjacent IDs
          if (prev.some((p) => p.id === res.data.id)) return prev;
          return [...prev, res.data];
        });
      }
    } catch {
      // Ignore background network blips
    } finally {
      isPrefetchingRef.current = false;
    }
  }, []);

  // Whenever user approaches end of buffer (within 8 poems), top up in background
  useEffect(() => {
    if (queue.length - currentIndex < 10) {
      prefetchMore(filter);
    }
  }, [currentIndex, queue.length, filter, prefetchMore]);

  // INSTANT Synchronous Next Switch (0ms latency, handles rapid multi-swipes)
  const handleNext = useCallback(() => {
    setDragOffset(0);
    setIsDragging(false);
    setDirection('left');

    setCurrentIndex((prev) => {
      if (prev < queue.length - 1) {
        return prev + 1;
      }
      // If buffer exhausted, cycle through shuffled local pool immediately
      const extra = getMasterpiecePool(
        filter === 'tang' ? '唐' : filter === 'song' ? '宋' : undefined
      );
      setQueue((q) => [...q, ...extra]);
      return prev + 1;
    });
  }, [queue.length, filter]);

  // INSTANT Synchronous Previous Switch (0ms latency)
  const handlePrevious = useCallback(() => {
    setDragOffset(0);
    setIsDragging(false);

    if (currentIndex > 0) {
      setDirection('right');
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Switch filter (All / Tang / Song) - Instantly loads new queue
  const handleFilterChange = (newFilter: RandomPoemFilter) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setDirection('left');
    const newQueue = generateInitialQueue(newFilter);
    setQueue(newQueue);
    setCurrentIndex(0);
    setDragOffset(0);
  };

  // Touch Gesture: Start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
    setIsDragging(true);
  };

  // Touch Gesture: Move (Real-time card tracking with zero lag)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartXRef.current;
    const diffY = currentY - touchStartYRef.current;

    // Only drag horizontally if horizontal movement exceeds vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(diffX);
    }
  };

  // Touch Gesture: End (Velocity flick + displacement detection)
  const handleTouchEnd = () => {
    setIsDragging(false);
    const duration = Date.now() - touchStartTimeRef.current;
    const offset = dragOffset;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Fast flick detection (velocity > 0.25px/ms) or distance > 30px
    const isFastFlick = duration < 250 && Math.abs(offset) > 25;
    const isDisplacement = Math.abs(offset) > 40;

    if (isFastFlick || isDisplacement) {
      if (offset < 0) {
        // Swiped Left -> Instant Next Poem
        handleNext();
      } else {
        // Swiped Right -> Instant Previous Poem
        if (currentIndex > 0) {
          handlePrevious();
        } else {
          setDragOffset(0);
        }
      }
    } else {
      // Spring back to center
      setDragOffset(0);
    }
  };

  const currentPoem = queue[currentIndex] || queue[0];

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
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-serif text-ink-400">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>秒级极速切换 · 第 {currentIndex + 1} 首</span>
          </span>
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
            disabled={currentIndex === 0}
            className="p-2 rounded-xl bg-paper-200 dark:bg-ink-800 hover:bg-paper-300 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200 disabled:opacity-30 transition-all active:scale-95 shadow-xs"
            title="上一首诗 (可右滑)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="px-3.5 py-1.5 rounded-xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white font-serif text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-seal"
            title="下一首诗 (可左滑)"
          >
            <Shuffle className="w-3.5 h-3.5" />
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
            opacity: Math.max(0.65, 1 - Math.abs(dragOffset) / 500),
            transition: isDragging
              ? 'none'
              : 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.16s ease',
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
          <span>左右极速连划，秒切千首佳句</span>
        </span>
        <span>
          当前第 {currentIndex + 1} 首
        </span>
      </div>
    </section>
  );
};
