import React from 'react';
import { Settings, Sun, Type, RotateCcw, ShieldCheck } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-2.5">
          <Settings className="w-7 h-7 sm:w-8 h-8 text-chinese-ochre" />
          <span>系统与阅读偏好</span>
        </h1>
        <p className="text-xs sm:text-sm text-ink-400">
          定制专属于您的东方古典排版、沉浸阅读参数与主题风格
        </p>
      </div>

      <div className="space-y-8">
        {/* 1. Theme Configuration */}
        <section className="bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder rounded-3xl p-6 sm:p-8 space-y-5 shadow-oriental">
          <h3 className="font-serif font-bold text-lg text-ink-800 dark:text-ink-100 flex items-center space-x-2">
            <Sun className="w-5 h-5 text-chinese-ochre" />
            <span>界面配色主题</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'light', label: '宣纸暖白', desc: '米白温润，古朴优雅' },
              { id: 'sepia', label: '复古竹简', desc: '雅致茶褐，护眼宁静' },
              { id: 'dark', label: '玄青夜读', desc: '深沉暗黑，夜间舒适' },
              { id: 'system', label: '跟随系统', desc: '依据设备偏好自动切换' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  theme === t.id
                    ? 'border-chinese-ochre bg-chinese-ochre/10 ring-2 ring-chinese-ochre/20'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="font-serif font-bold text-sm text-ink-800 dark:text-ink-100 mb-1">
                  {t.label}
                </div>
                <div className="text-[11px] text-ink-400 font-sans">
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Reading Typography Defaults */}
        <section className="bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder rounded-3xl p-6 sm:p-8 space-y-6 shadow-oriental">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-ink-800 dark:text-ink-100 flex items-center space-x-2">
              <Type className="w-5 h-5 text-chinese-celadon" />
              <span>诗词正文排版习惯</span>
            </h3>

            <button
              onClick={resetSettings}
              className="text-xs text-chinese-ochre hover:underline flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>恢复默认</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Font Family */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-500 dark:text-ink-400">
                默认字体
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSettings({ fontFamily: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-ink-800 dark:text-ink-100"
              >
                <option value="serif">思源宋体 (Noto Serif SC) - 典雅端庄</option>
                <option value="kaiti">华文楷体 (KaiTi) - 行云流水</option>
                <option value="sans">思源黑体 (Noto Sans SC) - 现代清爽</option>
              </select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-500 dark:text-ink-400">
                默认字号
              </label>
              <select
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-ink-800 dark:text-ink-100"
              >
                <option value="sm">小 (Small)</option>
                <option value="base">中 (Regular)</option>
                <option value="lg">大 (Large · 推荐)</option>
                <option value="xl">特大 (Extra Large)</option>
                <option value="2xl">尊享巨幕 (Huge)</option>
              </select>
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-500 dark:text-ink-400">
                行间距 (行律空灵度)
              </label>
              <select
                value={settings.lineHeight}
                onChange={(e) => updateSettings({ lineHeight: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-ink-800 dark:text-ink-100"
              >
                <option value="normal">紧凑 (Normal)</option>
                <option value="relaxed">舒展 (Relaxed · 推荐)</option>
                <option value="loose">空灵 (Loose)</option>
              </select>
            </div>

            {/* Text Alignment */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-500 dark:text-ink-400">
                诗词对齐方式
              </label>
              <select
                value={settings.textAlign}
                onChange={(e) => updateSettings({ textAlign: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-ink-800 dark:text-ink-100"
              >
                <option value="center">居中对齐 (古典意境 · 推荐)</option>
                <option value="left">居左对齐 (长篇阅读)</option>
              </select>
            </div>
          </div>
        </section>

        {/* 3. Cloudflare & AI Architecture Notes */}
        <section className="bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder rounded-3xl p-6 sm:p-8 space-y-4 shadow-oriental">
          <h3 className="font-serif font-bold text-lg text-ink-800 dark:text-ink-100 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>安全与 Cloudflare 部署架构说明</span>
          </h3>

          <div className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 space-y-3 leading-relaxed font-sans">
            <p>
              • <strong>数据源接入</strong>：本项目严格遵循诗泉 API 规范（<code>poetry.palemoky.com</code>），完整收录 37万+ 首古籍正文，并保持古籍原貌展示。
            </p>
            <p>
              • <strong>AI 密钥安全</strong>：AI 智能赏析服务通过 Cloudflare Pages / Worker Functions 服务端安全读取 <code>AI_API_KEY</code> / <code>GEMINI_API_KEY</code> 密钥环境变量，绝不泄露到前端浏览器。
            </p>
            <p>
              • <strong>离线与免 Key 兼容</strong>：在未配置云端密钥或本地离线环境下，系统将自动启用内置名篇辞章解析引擎，保证全功能随时可用。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
