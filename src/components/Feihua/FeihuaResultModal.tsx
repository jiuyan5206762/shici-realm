import React, { useState } from 'react';
import { RotateCcw, Share2, Check } from 'lucide-react';
import { useFeihuaStore } from '@/store/feihuaStore';
import { SealBadge } from '@/components/Common/SealBadge';
import { guqinAudio } from '@/services/audio/guqinAudio';

export const FeihuaResultModal: React.FC = () => {
  const {
    status,
    winner,
    playerScore,
    selectedPersona,
    currentKeyword,
    history,
    playerRank,
    gameoverReason,
    resetGame,
    startGame,
  } = useFeihuaStore();

  const [copied, setCopied] = useState(false);

  if (status !== 'gameover') return null;

  const isPlayerWin = winner === 'user';
  const playerVersesCount = history.filter((h) => h.sender === 'user').length;

  const handleCopyShare = () => {
    guqinAudio.playChime();
    const shareText = `【飞花令状 · 诗境】
令字：【${currentKeyword}】
对决先贤：${selectedPersona.name}
对令战绩：${isPlayerWin ? '夺魁及第' : '憾负名家'}${gameoverReason ? ` (${gameoverReason})` : ''}
应令诗句：${playerVersesCount} 联
御赐功名：【${playerRank}】
得胜积分：${playerScore} 分
—— 诗境 · 东方美学数字典藏`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg xuan-card rounded-3xl p-6 sm:p-10 border-2 border-chinese-gold/60 shadow-2xl space-y-6 text-center">
        {/* Imperial Decree Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <SealBadge text={isPlayerWin ? '及第' : '惜败'} size="md" variant={isPlayerWin ? 'cinnabar' : 'ink'} />
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-ink-900 dark:text-ink-50">
              {isPlayerWin ? '恭喜夺魁 · 飞花及第' : '对决落幕 · 虽败犹荣'}
            </h2>
          </div>
          {gameoverReason && (
            <p className="text-xs font-serif text-chinese-cinnabar font-bold">
              {gameoverReason}
            </p>
          )}
          <p className="text-xs font-serif text-ink-500">
            飞花令字【{currentKeyword}】· 鏖战 {history.length} 回合
          </p>
        </div>

        {/* Imperial Rank Badge */}
        <div className="p-6 rounded-2xl bg-paper-100 dark:bg-ink-900 border border-paper-300 dark:border-ink-800 space-y-3">
          <div className="text-xs font-serif text-ink-400">赐封文名</div>
          <div className="text-3xl sm:text-4xl font-serif font-black text-chinese-cinnabar tracking-widest">
            {playerRank}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-paper-300/80 dark:border-ink-800 text-xs font-serif">
            <div>
              <span className="text-ink-400">我方积分：</span>
              <strong className="text-ink-900 dark:text-ink-50 ml-1 text-sm font-mono">{playerScore}</strong>
            </div>
            <div>
              <span className="text-ink-400">成功对令：</span>
              <strong className="text-ink-900 dark:text-ink-50 ml-1 text-sm font-mono">{playerVersesCount} 联</strong>
            </div>
          </div>
        </div>

        {/* Selected verses summary */}
        <div className="max-h-36 overflow-y-auto p-3 rounded-xl bg-paper-50 dark:bg-ink-950 text-left text-xs font-serif text-ink-600 dark:text-ink-300 space-y-1.5 border border-paper-300/60 dark:border-ink-800">
          <div className="text-ink-400 font-bold mb-1">对局佳联摘录：</div>
          {history.slice(-4).map((h, idx) => (
            <p key={idx} className="truncate">
              {h.sender === 'user' ? '〔我〕' : `〔${selectedPersona.name}〕`}: {h.verse}
            </p>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              guqinAudio.playChime();
              startGame();
            }}
            className="h-12 rounded-2xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all interactive-tap"
          >
            <RotateCcw className="w-4 h-4" />
            <span>再战一局</span>
          </button>

          <button
            onClick={handleCopyShare}
            className="h-12 rounded-2xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 hover:bg-paper-200 text-ink-800 dark:text-ink-100 font-serif font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? '已复制令状' : '分享令状'}</span>
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              guqinAudio.playChime();
              resetGame();
            }}
            className="text-xs font-serif text-ink-400 hover:text-chinese-cinnabar transition-colors"
          >
            返回飞花大厅
          </button>
        </div>
      </div>
    </div>
  );
};
