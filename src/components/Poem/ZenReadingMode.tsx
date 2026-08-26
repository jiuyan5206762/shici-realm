import React, { useEffect } from 'react';
import { X, Type, AlignCenter, AlignLeft, Volume2, Sparkles } from 'lucide-react';
import { Poem } from '@/types';
import { useSettingsStore } from '@/store/settingsStore';
import { usePoemSpeech } from '@/hooks/usePoemSpeech';

interface ZenReadingModeProps {
  poem: Poem;
  isOpen: boolean;
  onClose: () => void;
  onOpenAiAnalysis?: () => void;
}

export const ZenReadingMode: React.FC<ZenReadingModeProps> = ({
  poem,
  isOpen,
  onClose,
  onOpenAiAnalysis,
}) => {
  const { settings, updateSettings } = useSettingsStore();
  const { isPlaying, toggle: toggleSpeech } = usePoemSpeech(poem);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      ? 'leading-relaxed space-y-3'
      : settings.lineHeight === 'loose'
      ? 'leading-[2.6] space-y-6'
      : 'leading-[2.2] space-y-4';

  const alignClass = settings.textAlign === 'left' ? 'text-left' : 'text-center';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper-100 dark:bg-chinese-night text-ink-800 dark:text-ink-100 flex flex-col justify-between p-6 sm:p-12 transition-colors">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full pb-6 border-b border-stone-200/60 dark:border-stone-800/60">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-ink-400">
          <span className="font-serif">禅意纯享阅读</span>
          <span>·</span>
          <span>按 ESC 键退出</span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audio Speech */}
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-xl border border-stone-200 dark:border-stone-800 transition-colors ${
              isPlaying
                ? 'text-chinese-ochre bg-chinese-ochre/10 border-chinese-ochre/40'
                : 'text-ink-600 dark:text-ink-300 hover:bg-stone-200/50 dark:hover:bg-stone-800'
            }`}
            title="朗读"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* AI Analysis shortcut */}
          {onOpenAiAnalysis && (
            <button
              onClick={() => {
                onClose();
                onOpenAiAnalysis();
              }}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-chinese-ochre hover:bg-chinese-ochre/10 transition-colors"
              title="AI 诗词解析"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          {/* Font Size decrease */}
          <button
            onClick={() => {
              const sizes: ('sm' | 'base' | 'lg' | 'xl' | '2xl')[] = ['sm', 'base', 'lg', 'xl', '2xl'];
              const idx = sizes.indexOf(settings.fontSize);
              if (idx > 0) updateSettings({ fontSize: sizes[idx - 1] });
            }}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 text-xs font-serif"
            title="字号调小"
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
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 text-xs font-serif"
            title="字号调大"
          >
            A+
          </button>

          {/* Font Family Toggle */}
          <button
            onClick={() => {
              const next =
                settings.fontFamily === 'serif' ? 'kaiti' : settings.fontFamily === 'kaiti' ? 'sans' : 'serif';
              updateSettings({ fontFamily: next });
            }}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200/50 dark:hover:bg-stone-800"
            title="切换字体"
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Text Alignment */}
          <button
            onClick={() =>
              updateSettings({
                textAlign: settings.textAlign === 'center' ? 'left' : 'center',
              })
            }
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200/50 dark:hover:bg-stone-800"
            title="切换对齐方式"
          >
            {settings.textAlign === 'center' ? (
              <AlignLeft className="w-4 h-4" />
            ) : (
              <AlignCenter className="w-4 h-4" />
            )}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-200/80 dark:bg-stone-800 text-ink-700 dark:text-ink-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
            title="退出禅意模式 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Poem Display in Zen Mode */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 max-w-3xl mx-auto w-full">
        {/* Title */}
        <h1 className={`text-3xl sm:text-5xl font-serif font-black tracking-widest text-ink-900 dark:text-ink-50 mb-6 ${alignClass}`}>
          {poem.title}
        </h1>

        {/* Author & Dynasty */}
        <div className="text-base sm:text-xl font-serif text-chinese-ochre mb-12 tracking-wide flex items-center space-x-3">
          <span>〔{poem.dynasty?.name || '古'}〕</span>
          <span className="font-bold">{poem.author?.name || '佚名'}</span>
          <span className="text-stone-300 dark:text-stone-700">·</span>
          <span>{poem.type?.name || '诗词'}</span>
        </div>

        {/* Content */}
        <div className={`w-full ${fontClass} ${sizeClass} ${lineSpacingClass} ${alignClass} text-ink-800 dark:text-ink-100 tracking-wider`}>
          {(poem.content || []).map((line, idx) => (
            <p key={idx} className="transition-all hover:text-chinese-ochre select-text">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="max-w-4xl mx-auto w-full pt-6 border-t border-stone-200/60 dark:border-stone-800/60 text-center text-xs text-ink-400">
        诗境 · 古典数字化阅读 · 沉心品味千古绝唱
      </div>
    </div>
  );
};
