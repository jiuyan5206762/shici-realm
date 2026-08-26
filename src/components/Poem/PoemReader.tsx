import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Maximize2,
  Shuffle,
  Info,
  Type,
  AlignLeft,
  AlignCenter,
} from 'lucide-react';
import { Poem } from '@/types';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useSharePoem } from '@/hooks/useSharePoem';
import { usePoemSpeech } from '@/hooks/usePoemSpeech';
import { getDynastyColorClass } from '@/utils/formatters';
import { ZenReadingMode } from './ZenReadingMode';
import { PoemShareModal } from './PoemShareModal';
import { AiAnalysisDrawer } from './AiAnalysisDrawer';

interface PoemReaderProps {
  poem: Poem;
  onRandomNext?: () => void;
}

export const PoemReader: React.FC<PoemReaderProps> = ({ poem, onRandomNext }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const { settings, updateSettings } = useSettingsStore();
  const { copied, copyPoemText } = useSharePoem();
  const { isPlaying, toggle: toggleSpeech } = usePoemSpeech(poem);

  const [isZenOpen, setIsZenOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  const favorite = isFavorite(poem.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(poem.id);
    } else {
      addFavorite(poem);
    }
  };

  const dynastyColor = getDynastyColorClass(poem.dynasty?.name || '');

  const fontClass =
    settings.fontFamily === 'kaiti'
      ? 'font-kaiti'
      : settings.fontFamily === 'sans'
      ? 'font-sans'
      : 'font-serif';

  const sizeClass =
    settings.fontSize === 'sm'
      ? 'text-base sm:text-lg'
      : settings.fontSize === 'base'
      ? 'text-lg sm:text-xl'
      : settings.fontSize === 'lg'
      ? 'text-xl sm:text-2xl'
      : settings.fontSize === 'xl'
      ? 'text-2xl sm:text-3xl'
      : 'text-3xl sm:text-4xl';

  const lineSpacingClass =
    settings.lineHeight === 'normal'
      ? 'leading-relaxed space-y-2.5 sm:space-y-3'
      : settings.lineHeight === 'loose'
      ? 'leading-[2.5] space-y-4 sm:space-y-6'
      : 'leading-[2.1] space-y-3 sm:space-y-4';

  const alignClass = settings.textAlign === 'left' ? 'text-left' : 'text-center';

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-4 sm:my-8 px-2 sm:px-0">
      {/* Ancient Edition Disclaimer Alert */}
      <div className="flex items-center space-x-2.5 p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-300/60 dark:border-amber-700/40 text-xs sm:text-sm text-amber-800 dark:text-amber-300">
        <Info className="w-4 h-4 flex-shrink-0" />
        <span>
          当前内容来自古籍数据源，不同版本之间可能存在文字差异（如部分古籍中保留古拙原貌），文意以古籍原刻为准。
        </span>
      </div>

      {/* Main Poem Reading Canvas Card */}
      <div className="relative bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder rounded-3xl p-6 sm:p-12 shadow-oriental transition-all">
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-stone-100 dark:border-stone-800/80 gap-3">
          {/* Tags */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${dynastyColor.bg} ${dynastyColor.text} ${dynastyColor.border}`}>
              {poem.dynasty?.name || '未知'}代
            </span>
            {poem.type?.name && (
              <span className="px-2.5 py-1 rounded-lg text-xs bg-stone-100 dark:bg-stone-800 text-ink-500 dark:text-ink-400 font-medium">
                {poem.type.name}
              </span>
            )}
          </div>

          {/* Typography Toolbar */}
          <div className="flex items-center space-x-1.5 text-xs text-ink-500">
            {/* Font Size decrease */}
            <button
              onClick={() => {
                const sizes: ('sm' | 'base' | 'lg' | 'xl' | '2xl')[] = ['sm', 'base', 'lg', 'xl', '2xl'];
                const idx = sizes.indexOf(settings.fontSize);
                if (idx > 0) updateSettings({ fontSize: sizes[idx - 1] });
              }}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
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
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
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
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
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
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
              title="切换对齐方式"
            >
              {settings.textAlign === 'center' ? (
                <AlignLeft className="w-3.5 h-3.5" />
              ) : (
                <AlignCenter className="w-3.5 h-3.5" />
              )}
            </button>
            {/* Zen Fullscreen */}
            <button
              onClick={() => setIsZenOpen(true)}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center space-x-1"
              title="进入禅意纯享模式"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">沉浸</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 tracking-wider">
            {poem.title}
          </h1>
        </div>

        {/* Author Link */}
        <div className="text-center mb-10">
          <Link
            to={`/authors?q=${encodeURIComponent(poem.author?.name || '')}`}
            className="inline-flex items-center space-x-1.5 font-serif text-base sm:text-lg text-chinese-ochre hover:underline font-medium"
          >
            <span>〔{poem.dynasty?.name || '古'}〕</span>
            <span>{poem.author?.name || '佚名'}</span>
          </Link>
        </div>

        {/* Poem Content Lines */}
        <div className={`py-6 px-2 sm:px-8 ${fontClass} ${sizeClass} ${lineSpacingClass} ${alignClass} text-ink-800 dark:text-ink-100 tracking-wider select-text`}>
          {(poem.content || []).map((line, idx) => (
            <p key={idx} className="transition-colors hover:text-chinese-ochre">
              {line}
            </p>
          ))}
        </div>

        {/* Bottom Interactive Action Bar */}
        <div className="mt-12 pt-8 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Primary Action Buttons */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                favorite
                  ? 'bg-chinese-cinnabar text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-chinese-cinnabar/10 hover:text-chinese-cinnabar text-ink-700 dark:text-ink-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
              <span>{favorite ? '已收藏' : '收藏'}</span>
            </button>

            {/* AI Analysis Button */}
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-chinese-ochre/15 hover:bg-chinese-ochre/25 text-chinese-ochre transition-all active:scale-95 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI 深度赏析</span>
            </button>

            {/* Speech Recite Button */}
            <button
              onClick={toggleSpeech}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                isPlaying
                  ? 'bg-chinese-ochre text-white'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-ink-700 dark:text-ink-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlaying ? '暂停诵读' : '朗读'}</span>
            </button>

            {/* Share / Card Export Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-ink-700 dark:text-ink-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>分享卡片</span>
            </button>

            {/* Copy Full Text */}
            <button
              onClick={() => copyPoemText(poem)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-ink-700 dark:text-ink-200 transition-colors"
              title="复制诗词全文"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '已复制' : '复制全文'}</span>
            </button>
          </div>

          {/* Random Next Button */}
          {onRandomNext && (
            <button
              onClick={onRandomNext}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-ink-700 dark:text-ink-200 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>随机下一首</span>
            </button>
          )}
        </div>
      </div>

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
