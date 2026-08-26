import React, { useEffect } from 'react';
import { X, Type, AlignCenter, AlignLeft, Sparkles } from 'lucide-react';
import { Poem } from '@/types';
import { useSettingsStore } from '@/store/settingsStore';

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
      ? 'text-xl sm:text-2xl'
      : settings.fontSize === 'base'
      ? 'text-2xl sm:text-3xl'
      : settings.fontSize === 'lg'
      ? 'text-3xl sm:text-4xl'
      : settings.fontSize === 'xl'
      ? 'text-4xl sm:text-5xl'
      : 'text-5xl sm:text-6xl';

  const lineSpacingClass =
    settings.lineHeight === 'normal'
      ? 'leading-relaxed space-y-4'
      : settings.lineHeight === 'loose'
      ? 'leading-[2.8] space-y-8'
      : 'leading-[2.4] space-y-6';

  const alignClass = settings.textAlign === 'left' ? 'text-left' : 'text-center';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FDFBF7] dark:bg-[#141416] text-ink-900 dark:text-ink-100 flex flex-col justify-between p-6 sm:p-12 transition-colors">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full pb-6 border-b border-stone-200/60 dark:border-stone-800/60">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-ink-400">
          <span className="font-serif font-medium">禅意纯享</span>
          <span>·</span>
          <span>ESC 退出</span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* AI Analysis shortcut */}
          {onOpenAiAnalysis && (
            <button
              onClick={() => {
                onClose();
                onOpenAiAnalysis();
              }}
              className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-chinese-ochre hover:bg-chinese-ochre/10 transition-colors text-xs font-serif flex items-center space-x-1"
              title="AI 诗词解析"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 赏析</span>
            </button>
          )}

          {/* Font switcher */}
          <button
            onClick={() => {
              const next =
                settings.fontFamily === 'serif'
                  ? 'kaiti'
                  : settings.fontFamily === 'kaiti'
                  ? 'sans'
                  : 'serif';
              updateSettings({ fontFamily: next });
            }}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
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
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
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
            className="p-2 rounded-xl bg-stone-200/80 dark:bg-stone-800 text-ink-700 dark:text-ink-200 hover:bg-rose-500 hover:text-white transition-colors"
            title="退出纯享模式"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Center Poem Text */}
      <div className="max-w-3xl mx-auto w-full my-auto py-12 sm:py-20 text-center select-text">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink-900 dark:text-ink-50 mb-3 tracking-widest">
          {poem.title}
        </h1>

        <div className="font-serif text-base sm:text-lg text-chinese-ochre mb-12 sm:mb-16">
          <span>〔{poem.dynasty?.name || '古'}〕</span>
          <span className="font-bold">{poem.author?.name || '佚名'}</span>
        </div>

        <div className={`${fontClass} ${sizeClass} ${lineSpacingClass} ${alignClass} tracking-widest text-ink-900 dark:text-ink-50`}>
          {(poem.content || []).map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>

      {/* Bottom Subtle Footer */}
      <div className="text-center text-xs text-ink-400 dark:text-ink-400 py-4 font-serif">
        <span>静心品读 · 诗意栖居</span>
      </div>
    </div>
  );
};
