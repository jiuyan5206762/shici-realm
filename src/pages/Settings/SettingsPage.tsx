import React, { useState } from 'react';
import { Sun, Type, RotateCcw, ShieldCheck, Volume2, Trash2, Check } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';
import { SealBadge } from '@/components/Common/SealBadge';
import { guqinAudio } from '@/services/audio/guqinAudio';
import { clearApiCache } from '@/api/client';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { theme, setTheme } = useThemeStore();
  const [soundEnabled, setSoundEnabled] = useState(guqinAudio.isEnabled());
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleSoundToggle = (enabled: boolean) => {
    guqinAudio.setEnabled(enabled);
    setSoundEnabled(enabled);
    if (enabled) {
      guqinAudio.playChime();
    }
  };

  const handleClearCache = () => {
    guqinAudio.playChime();
    clearApiCache();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div className="flex items-center gap-2">
          <SealBadge text="设置" size="sm" variant="cinnabar" />
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
            系统与阅读偏好
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif">
          定制专属于您的东方古典排版、宣纸质感底色与交互音效
        </p>
      </div>

      <div className="space-y-8">
        {/* 1. Theme Configuration */}
        <section className="xuan-card rounded-3xl p-6 sm:p-8 space-y-5 border border-paper-400/40 shadow-oriental">
          <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50 flex items-center gap-2">
            <Sun className="w-5 h-5 text-chinese-cinnabar" />
            <span>宣纸底色与配色主题</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'light', label: '澄心宣纸', desc: '米白温润，古朴优雅' },
              { id: 'sepia', label: '复古竹简', desc: '雅致茶褐，护眼宁静' },
              { id: 'dark', label: '玄青夜读', desc: '深沉水墨，夜间舒适' },
              { id: 'system', label: '跟随系统', desc: '依据设备偏好自动切换' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  guqinAudio.playChime();
                  setTheme(t.id as any);
                }}
                className={`p-4 rounded-2xl border text-left transition-all interactive-tap ${
                  theme === t.id
                    ? 'border-chinese-cinnabar bg-chinese-cinnabar/10 ring-1 ring-chinese-cinnabar'
                    : 'border-paper-300 dark:border-ink-700 bg-paper-100/60 dark:bg-ink-800/40 hover:bg-paper-200 dark:hover:bg-ink-700'
                }`}
              >
                <div className="font-serif font-bold text-sm text-ink-900 dark:text-ink-50 mb-1">
                  {t.label}
                </div>
                <div className="text-[11px] text-ink-400 font-serif">
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Guqin & Chime Audio System */}
        <section className="xuan-card rounded-3xl p-6 sm:p-8 space-y-5 border border-paper-400/40 shadow-oriental">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-chinese-celadon" />
              <span>古琴与编钟交互音效 (Web Audio 实时合成)</span>
            </h3>
            <button
              onClick={() => handleSoundToggle(!soundEnabled)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                soundEnabled
                  ? 'bg-chinese-celadon text-white shadow-xs'
                  : 'bg-paper-200 dark:bg-ink-800 text-ink-500'
              }`}
            >
              {soundEnabled ? '已开启音效' : '已静音'}
            </button>
          </div>

          <p className="text-xs font-serif text-ink-500 leading-relaxed">
            操作点击、飞花令应令、典藏及第均采用 W3C Web Audio API 纯程序化实时振荡合成（0KB 静态文件、0 版权风险），为您带来沉浸式古风交互质感。
          </p>
        </section>

        {/* 3. Reading Typography Defaults */}
        <section className="xuan-card rounded-3xl p-6 sm:p-8 space-y-6 border border-paper-400/40 shadow-oriental">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50 flex items-center gap-2">
              <Type className="w-5 h-5 text-amber-600" />
              <span>诗词正文排版习惯</span>
            </h3>

            <button
              onClick={() => {
                guqinAudio.playChime();
                resetSettings();
              }}
              className="text-xs font-serif text-chinese-cinnabar hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>恢复默认</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Font Family */}
            <div className="space-y-2">
              <label className="text-xs font-serif text-ink-500">
                默认字体
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSettings({ fontFamily: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-serif text-ink-800 dark:text-ink-100"
              >
                <option value="serif">思源宋体 (Noto Serif SC) - 典雅端庄</option>
                <option value="kaiti">华文楷体 (KaiTi) - 行云流水</option>
                <option value="sans">思源黑体 (Noto Sans SC) - 现代清爽</option>
              </select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-xs font-serif text-ink-500">
                默认字号
              </label>
              <select
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-serif text-ink-800 dark:text-ink-100"
              >
                <option value="sm">小 (Small)</option>
                <option value="base">中 (Regular)</option>
                <option value="lg">大 (Large · 推荐)</option>
                <option value="xl">特大 (Extra Large)</option>
                <option value="2xl">尊享巨幕 (Huge)</option>
              </select>
            </div>
          </div>
        </section>

        {/* 4. Cache & Performance Management */}
        <section className="xuan-card rounded-3xl p-6 sm:p-8 space-y-4 border border-paper-400/40 shadow-oriental">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <span>本地缓存与性能优化</span>
            </h3>
            <button
              onClick={handleClearCache}
              className="px-3.5 py-1.5 rounded-xl border border-paper-300 dark:border-ink-700 hover:bg-red-500/10 hover:text-red-600 text-xs font-serif flex items-center gap-1.5 transition-colors"
            >
              {cacheCleared ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Trash2 className="w-3.5 h-3.5" />}
              <span>{cacheCleared ? '已清理完毕' : '清理本地诗词缓存'}</span>
            </button>
          </div>

          <p className="text-xs font-serif text-ink-500 leading-relaxed">
            诗境内置 L1 内存 LRU 缓存与 L2 LocalStorage 本地持久化引擎，已缓存的热点诗词与朝代索引可在断网或弱网环境下实现极速毫秒级秒开。
          </p>
        </section>
      </div>
    </div>
  );
};
