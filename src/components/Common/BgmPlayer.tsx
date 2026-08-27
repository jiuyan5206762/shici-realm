import React, { useEffect, useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Disc3, ChevronUp, ChevronDown } from 'lucide-react';
import { useBgmStore } from '@/store/bgmStore';
import { SealBadge } from './SealBadge';

export const BgmPlayer: React.FC = () => {
  const {
    isPlaying,
    volume,
    isMuted,
    title,
    artist,
    initAudio,
    togglePlay,
    setVolume,
    toggleMute,
  } = useBgmStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initAudio();
  }, [initAudio]);

  // Click outside to collapse volume slider
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    togglePlay();
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end select-none animate-fade-in"
    >
      {/* Expanded Control Box */}
      {isExpanded && (
        <div className="mb-2 xuan-card rounded-2xl p-3 sm:p-4 border border-paper-400/50 shadow-2xl space-y-3 w-56 animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SealBadge text="雅乐" size="sm" variant="cinnabar" />
              <span className="text-xs font-serif font-bold text-ink-900 dark:text-ink-50">
                古风背景音律
              </span>
            </div>
            <span className="text-[10px] font-mono text-ink-400">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <div className="text-[11px] font-serif text-ink-500 truncate">
            曲目：古筝曲《{title}》
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={toggleMute}
              className="text-ink-500 hover:text-chinese-cinnabar transition-colors"
              title={isMuted ? '恢复音量' : '静音'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-chinese-celadon" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-paper-300 dark:bg-ink-700 rounded-lg appearance-none cursor-pointer accent-chinese-cinnabar"
            />
          </div>
        </div>
      )}

      {/* Main Floating Pill */}
      <div className="flex items-center gap-1.5 p-1.5 pr-3.5 rounded-full xuan-card border border-paper-400/60 dark:border-ink-700 shadow-oriental backdrop-blur-md transition-all hover:scale-102 group">
        {/* Spinning Disc / Play-Pause Icon */}
        <button
          onClick={handleToggle}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs ${
            isPlaying
              ? 'bg-chinese-cinnabar text-white ring-2 ring-chinese-cinnabar/30'
              : 'bg-paper-200 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-chinese-cinnabar hover:text-white'
          }`}
          title={isPlaying ? '暂停古筝曲《春江花月夜》' : '播放古筝曲《春江花月夜》'}
        >
          {isPlaying ? (
            <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        {/* Music Meta Text */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-col cursor-pointer max-w-[130px] sm:max-w-[160px]"
        >
          <div className="flex items-center gap-1">
            <span className="text-xs font-serif font-bold text-ink-900 dark:text-ink-50 truncate">
              {title}
            </span>
            {isPlaying && (
              <span className="flex gap-0.5 items-end h-2.5">
                <span className="w-0.5 h-full bg-chinese-cinnabar animate-pulse" />
                <span className="w-0.5 h-2/3 bg-chinese-cinnabar animate-pulse delay-75" />
                <span className="w-0.5 h-4/5 bg-chinese-cinnabar animate-pulse delay-150" />
              </span>
            )}
          </div>
          <span className="text-[10px] font-serif text-ink-400 truncate">
            {isPlaying ? '悠扬古筝演奏中' : artist}
          </span>
        </div>

        {/* Expand / Volume button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full text-ink-400 hover:text-chinese-cinnabar hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors ml-0.5"
          title="调整背景音乐音量"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
