import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Sparkles,
  Copy,
  Check,
  Maximize2,
  Shuffle,
  Type,
  AlignLeft,
  AlignCenter,
} from 'lucide-react';
import { Poem } from '@/types';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useSharePoem } from '@/hooks/useSharePoem';
import { ZenReadingMode } from './ZenReadingMode';
import { PoemShareModal } from './PoemShareModal';
import { AiAnalysisDrawer } from './AiAnalysisDrawer';
import { SealBadge } from '@/components/Common/SealBadge';
import { VerticalPoemView } from './VerticalPoemView';
import { guqinAudio } from '@/services/audio/guqinAudio';

interface PoemReaderProps {
  poem: Poem;
  onRandomNext?: () => void;
}

export const PoemReader: React.FC<PoemReaderProps> = ({ poem, onRandomNext }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const { settings, updateSettings } = useSettingsStore();
  const { copied, copyPoemText } = useSharePoem();

  const [isZenOpen, setIsZenOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isVerticalView, setIsVerticalView] = useState(false);

  const favorite = isFavorite(poem.id);

  const handleFavoriteToggle = () => {
    guqinAudio.playGuqinPluck();
    if (favorite) {
      removeFavorite(poem.id);
    } else {
      addFavorite(poem);
    }
  };

  const fontClass =
    settings.fontFamily === 'kaiti'
      ? 'font-kaiti'
      : settings.fontFamily === 'sans'
      ? 'font-sans'
      : 'font-serif';

  const sizeClass =
    settings.fontSize === 'sm'
      ? 'text-lg sm:text-xl'
      : settings.fontSize === 'base'
      ? 'text-xl sm:text-2xl'
      : settings.fontSize === 'lg'
      ? 'text-2xl sm:text-3xl'
      : settings.fontSize === 'xl'
      ? 'text-3xl sm:text-4xl'
      : 'text-4xl sm:text-5xl';

  const lineSpacingClass =
    settings.lineHeight === 'normal'
      ? 'leading-relaxed space-y-3 sm:space-y-4'
      : settings.lineHeight === 'loose'
      ? 'leading-[2.6] space-y-5 sm:space-y-7'
      : 'leading-[2.2] space-y-4 sm:space-y-5';

  const alignClass = settings.textAlign === 'left' ? 'text-left' : 'text-center';

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-2 sm:my-8 px-2 sm:px-0">
      {/* View Mode Switcher Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <SealBadge text={poem.dynasty?.name || '唐'} size="sm" variant="cinnabar" />
          <span className="text-xs font-serif text-ink-400">诗境 · 典籍正文</span>
        </div>

        <button
          onClick={() => {
            guqinAudio.playChime();
            setIsVerticalView(!isVerticalView);
          }}
          className="text-xs font-serif text-chinese-cinnabar px-3 py-1.5 rounded-xl border border-chinese-cinnabar/30 hover:bg-chinese-cinnabar/10 transition-colors"
        >
          {isVerticalView ? '切换现代横排版式' : '切换传统竖排古卷'}
        </button>
      </div>

      {isVerticalView ? (
        <VerticalPoemView poem={poem} />
      ) : (
        /* Main Poem Reading Canvas */
        <div className="relative xuan-card rounded-3xl p-6 sm:p-14 shadow-oriental transition-all border border-paper-400/50">
          {/* Top Typography & Customization Strip */}
          <div className="flex flex-wrap items-center justify-between pb-5 mb-6 border-b border-paper-300/80 dark:border-ink-800/80 gap-3">
            {/* Metadata */}
            <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300 font-serif">
              <span>〔{poem.dynasty?.name || '古'}〕</span>
              <span className="font-bold text-ink-900 dark:text-ink-100">
                {poem.author?.name || '佚名'}
              </span>
              {poem.type?.name && (
                <>
                  <span className="text-paper-400 dark:text-ink-700">·</span>
                  <span>{poem.type.name}</span>
                </>
              )}
            </div>

            {/* Typography Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-ink-700 dark:text-ink-300 font-serif">
              {/* Font Size decrease */}
              <button
                onClick={() => {
                  const sizes: ('sm' | 'base' | 'lg' | 'xl' | '2xl')[] = ['sm', 'base', 'lg', 'xl', '2xl'];
                  const idx = sizes.indexOf(settings.fontSize);
                  if (idx > 0) updateSettings({ fontSize: sizes[idx - 1] });
                }}
                className="px-2.5 py-1 rounded-lg border border-paper-300 dark:border-ink-700 hover:bg-paper-200 dark:hover:bg-ink-800"
                title="缩小字号"
              >
                A-
              </button>

              {/* Font Size increase */}
              <button
                onClick={() => {
                  const sizes: ('sm' | 'base' | 'lg' | 'xl' | '2xl')[] = ['sm', 'base', 'lg', 'xl', '2xl'];
                  const idx = sizes.indexOf(settings.fontSize);
                  if (idx < sizes.length - 1) updateSettings({ fontSize: sizes[idx + 1] });
                }}
                className="px-2.5 py-1 rounded-lg border border-paper-300 dark:border-ink-700 hover:bg-paper-200 dark:hover:bg-ink-800"
                title="放大字号"
              >
                A+
              </button>

              {/* Font switcher */}
              <button
                onClick={() => {
                  const next =
                    settings.fontFamily === 'serif' ? 'kaiti' : settings.fontFamily === 'kaiti' ? 'sans' : 'serif';
                  updateSettings({ fontFamily: next });
                }}
                className="p-1.5 rounded-lg border border-paper-300 dark:border-ink-700 hover:bg-paper-200 dark:hover:bg-ink-800"
                title="切换字体 (宋体/楷体/黑体)"
              >
                <Type className="w-3.5 h-3.5" />
              </button>

              {/* Alignment */}
              <button
                onClick={() =>
                  updateSettings({
                    textAlign: settings.textAlign === 'center' ? 'left' : 'center',
                  })
                }
                className="p-1.5 rounded-lg border border-paper-300 dark:border-ink-700 hover:bg-paper-200 dark:hover:bg-ink-800"
                title="切换排版对齐方式"
              >
                {settings.textAlign === 'center' ? (
                  <AlignLeft className="w-3.5 h-3.5" />
                ) : (
                  <AlignCenter className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Zen Fullscreen */}
              <button
                onClick={() => {
                  guqinAudio.playChime();
                  setIsZenOpen(true);
                }}
                className="px-3 py-1 rounded-lg border border-paper-300 dark:border-ink-700 hover:bg-paper-200 dark:hover:bg-ink-800 flex items-center gap-1 font-medium"
                title="进入全屏禅意阅读"
              >
                <Maximize2 className="w-3 h-3" />
                <span>禅意</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-3">
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-ink-900 dark:text-ink-50 tracking-widest">
              {poem.title}
            </h1>
          </div>

          {/* Author Link */}
          <div className="text-center mb-8 sm:mb-12">
            <Link
              to={`/authors?q=${encodeURIComponent(poem.author?.name || '')}`}
              className="inline-flex items-center gap-2 font-serif text-sm sm:text-lg text-chinese-cinnabar hover:underline font-medium"
            >
              <span>〔{poem.dynasty?.name || '古'}〕</span>
              <span>{poem.author?.name || '佚名'}</span>
            </Link>
          </div>

          {/* Poem Verses (Main Center Canvas) */}
          <div className={`py-4 sm:py-6 px-1 sm:px-12 ${fontClass} ${sizeClass} ${lineSpacingClass} ${alignClass} text-ink-900 dark:text-ink-100 tracking-widest select-text`}>
            {(poem.content || []).map((line, idx) => (
              <p key={idx} className="transition-colors hover:text-chinese-cinnabar">
                {line}
              </p>
            ))}
          </div>

          {/* Bottom Toolbar */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-paper-300/80 dark:border-ink-800/80 space-y-3">
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-3 gap-2.5">
              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                className={`h-11 flex items-center justify-center gap-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-medium transition-all active:scale-95 ${
                  favorite
                    ? 'bg-chinese-cinnabar text-white shadow-sm'
                    : 'bg-paper-200 dark:bg-ink-800 hover:bg-chinese-cinnabar/10 hover:text-chinese-cinnabar text-ink-700 dark:text-ink-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
                <span>{favorite ? '已典藏' : '典藏'}</span>
              </button>

              {/* AI Analysis Button */}
              <button
                onClick={() => {
                  guqinAudio.playChime();
                  setIsAiDrawerOpen(true);
                }}
                className="h-11 flex items-center justify-center gap-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-medium bg-chinese-celadon/15 hover:bg-chinese-celadon/25 text-chinese-celadon transition-all active:scale-95 shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI 赏析</span>
              </button>

              {/* Share Card Button */}
              <button
                onClick={() => {
                  guqinAudio.playChime();
                  setIsShareModalOpen(true);
                }}
                className="h-11 flex items-center justify-center gap-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-medium bg-paper-200 dark:bg-ink-800 hover:bg-paper-300 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>分享卡片</span>
              </button>

              {/* Copy Full Text */}
              <button
                onClick={() => {
                  guqinAudio.playChime();
                  copyPoemText(poem);
                }}
                className="h-11 flex items-center justify-center gap-2 px-4 rounded-xl text-xs sm:text-sm font-serif font-medium bg-paper-200 dark:bg-ink-800 hover:bg-paper-300 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '已复制' : '复制诗文'}</span>
              </button>
            </div>

            {/* Random Next Button */}
            {onRandomNext && (
              <button
                onClick={() => {
                  guqinAudio.playChime();
                  onRandomNext();
                }}
                className="w-full sm:w-auto h-11 flex items-center justify-center gap-2 px-5 rounded-xl text-xs sm:text-sm font-serif font-medium border border-paper-300 dark:border-ink-700 hover:bg-paper-200 dark:hover:bg-ink-800 text-ink-700 dark:text-ink-200 transition-colors"
              >
                <Shuffle className="w-4 h-4" />
                <span>偶遇下一首</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <ZenReadingMode
        poem={poem}
        isOpen={isZenOpen}
        onClose={() => setIsZenOpen(false)}
        onOpenAiAnalysis={() => setIsAiDrawerOpen(true)}
      />

      <PoemShareModal
        poem={poem}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      <AiAnalysisDrawer
        poem={poem}
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />
    </div>
  );
};
