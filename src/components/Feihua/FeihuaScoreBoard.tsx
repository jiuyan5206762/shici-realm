import React from 'react';
import { Timer, Flame } from 'lucide-react';
import { useFeihuaStore } from '@/store/feihuaStore';
import { SealBadge } from '@/components/Common/SealBadge';

export const FeihuaScoreBoard: React.FC = () => {
  const {
    currentKeyword,
    selectedPersona,
    playerScore,
    aiScore,
    playerTurn,
    timeLeft,
    streak,
    playerRank,
  } = useFeihuaStore();

  const isUrgent = timeLeft <= 10;

  return (
    <div className="xuan-card rounded-3xl p-4 sm:p-6 border border-paper-400/50 shadow-oriental space-y-4">
      {/* Top Banner: Keyword Seal + Timer */}
      <div className="flex items-center justify-between">
        {/* Keyword Seal Display */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <SealBadge text={currentKeyword} size="lg" variant="cinnabar" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif text-ink-400">本局飞花令字</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-ink-900 dark:text-ink-50">
              「{currentKeyword}」
            </h2>
          </div>
        </div>

        {/* 30s Countdown Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${
            isUrgent
              ? 'bg-red-500/15 border-red-500 text-red-600 animate-pulse ring-2 ring-red-500/20'
              : 'bg-paper-100 dark:bg-ink-800 border-paper-300 dark:border-ink-700 text-ink-700 dark:text-ink-200'
          }`}
        >
          <Timer className={`w-4 h-4 ${isUrgent ? 'text-red-500 animate-spin' : 'text-chinese-cinnabar'}`} />
          <span className="font-mono font-black text-lg sm:text-xl">
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Duel Combatants Status */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-2 border-t border-paper-300/80 dark:border-ink-800">
        {/* Player Side */}
        <div
          className={`p-3.5 rounded-2xl border transition-all ${
            playerTurn
              ? 'bg-chinese-cinnabar/10 border-chinese-cinnabar/40 ring-1 ring-chinese-cinnabar/20'
              : 'bg-paper-100/60 dark:bg-ink-800/40 border-paper-300 dark:border-ink-800'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-serif font-bold text-ink-800 dark:text-ink-200">
              我方 (应令中)
            </span>
            <span className="text-[10px] font-serif text-chinese-cinnabar font-bold">
              {playerRank}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-chinese-cinnabar font-mono">
              {playerScore}
            </span>
            {streak > 1 && (
              <div className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>{streak} 连胜</span>
              </div>
            )}
          </div>
        </div>

        {/* AI Opponent Side */}
        <div
          className={`p-3.5 rounded-2xl border transition-all ${
            !playerTurn
              ? 'bg-chinese-celadon/10 border-chinese-celadon/40 ring-1 ring-chinese-celadon/20'
              : 'bg-paper-100/60 dark:bg-ink-800/40 border-paper-300 dark:border-ink-800'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-serif font-bold text-ink-800 dark:text-ink-200">
              {selectedPersona.name}
            </span>
            <SealBadge text={selectedPersona.dynasty} size="sm" variant="bamboo" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-chinese-celadon font-mono">
              {aiScore}
            </span>
            <span className="text-[10px] font-serif text-ink-400">
              {selectedPersona.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
