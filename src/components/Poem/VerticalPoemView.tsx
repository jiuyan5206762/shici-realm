import React from 'react';
import { Poem } from '@/types';
import { SealBadge } from '@/components/Common/SealBadge';

interface VerticalPoemViewProps {
  poem: Poem;
}

export const VerticalPoemView: React.FC<VerticalPoemViewProps> = ({ poem }) => {
  const dynastyName = poem.dynasty?.name || '唐';
  const authorName = poem.author?.name || '佚名';
  const lines: string[] = poem.content || [];

  return (
    <div className="relative xuan-card rounded-3xl p-8 sm:p-14 shadow-oriental border border-paper-400/50 min-h-[460px] flex flex-col justify-between overflow-hidden">
      {/* Background seal watermark */}
      <div className="absolute top-8 left-8 opacity-10 pointer-events-none select-none font-serif text-8xl text-chinese-cinnabar">
        詩
      </div>

      {/* Traditional Right-to-Left Vertical Writing Canvas */}
      <div className="flex-1 flex justify-center items-center py-6 sm:py-10 overflow-x-auto no-scrollbar">
        <div className="writing-vertical-rl flex flex-row-reverse gap-6 sm:gap-10 tracking-widest select-text font-serif text-ink-900 dark:text-ink-50">
          {/* 1. Title Column */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-chinese-cinnabar border-l sm:border-l-2 border-chinese-cinnabar/30 pl-2">
              {poem.title}
            </h2>
          </div>

          {/* 2. Dynasty & Author Seal Column */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-ink-500 font-serif">
            <span>〔{dynastyName}〕</span>
            <span className="font-bold text-ink-800 dark:text-ink-200">{authorName}</span>
            <div className="pt-2">
              <SealBadge text={dynastyName} size="sm" variant="cinnabar" />
            </div>
          </div>

          {/* 3. Verse Columns */}
          <div className="flex flex-row-reverse gap-4 sm:gap-6 text-lg sm:text-2xl leading-loose">
            {lines.map((line: string, idx: number) => (
              <p
                key={idx}
                className="hover:text-chinese-cinnabar transition-colors cursor-default whitespace-nowrap"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-4 mt-6 border-t border-paper-300/60 dark:border-ink-800/80 flex items-center justify-between text-xs font-serif text-ink-400">
        <span>经典右起竖排卷轴 · 宋代古籍刻印风骨</span>
        <span>诗境 · 中华传世经典</span>
      </div>
    </div>
  );
};
