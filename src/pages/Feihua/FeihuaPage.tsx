import React, { useState } from 'react';
import {
  Swords,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { useFeihuaStore } from '@/store/feihuaStore';
import { FEIHUA_DEFAULT_KEYWORDS, FEIHUA_PERSONAS } from '@/api/feihuaService';
import { FeihuaScoreBoard } from '@/components/Feihua/FeihuaScoreBoard';
import { FeihuaArena } from '@/components/Feihua/FeihuaArena';
import { FeihuaResultModal } from '@/components/Feihua/FeihuaResultModal';
import { SealBadge } from '@/components/Common/SealBadge';

export const FeihuaPage: React.FC = () => {
  const {
    status,
    currentKeyword,
    selectedPersona,
    setKeyword,
    setPersona,
    startGame,
    resetGame,
  } = useFeihuaStore();

  const [customKeywordInput, setCustomKeywordInput] = useState('');
  const [customKeywordError, setCustomKeywordError] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);

  const handleCustomKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept Chinese character, max 1 char
    const raw = e.target.value;
    const chineseOnly = raw.replace(/[^\u4e00-\u9fa5]/g, '');
    const char = chineseOnly.slice(0, 1);
    setCustomKeywordInput(char);
    setCustomKeywordError(null);
  };

  const handleCustomKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customKeywordInput.trim();
    if (!trimmed) {
      setCustomKeywordError('请输入一个汉字');
      return;
    }
    if (!/^[\u4e00-\u9fa5]$/.test(trimmed)) {
      setCustomKeywordError('只允许输入单个汉字');
      return;
    }
    setKeyword(trimmed);
    setCustomKeywordInput('');
    setCustomKeywordError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-fade-in pb-20">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SealBadge text="雅令" size="sm" variant="cinnabar" />
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50 flex items-center gap-2.5">
              <span>飞花令 · 诗词对决</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif">
            春城无处不飞花。与千古先贤 AI 对诗斗智，品位古典行令之乐。
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Rules modal trigger */}
          <button
            onClick={() => setShowRules(!showRules)}
            className="px-3.5 py-2 rounded-2xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-serif text-ink-700 dark:text-ink-300 hover:bg-paper-200 flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-chinese-cinnabar" />
            <span>行令规则</span>
          </button>
        </div>
      </div>

      {/* Rules Collapsible Drawer */}
      {showRules && (
        <div className="xuan-card rounded-3xl p-6 border border-chinese-gold/50 shadow-oriental space-y-3 animate-slide-down">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-50 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-chinese-cinnabar" />
              <span>飞花令雅规</span>
            </h3>
            <button
              onClick={() => setShowRules(false)}
              className="text-xs text-ink-400 hover:text-ink-700"
            >
              收起
            </button>
          </div>
          <ul className="text-xs font-serif text-ink-600 dark:text-ink-300 space-y-1.5 list-disc list-inside leading-relaxed">
            <li><strong>令字规定</strong>：双方轮流吟诵含有指定令字（如「春」、「花」、「月」或任意自定单字）的古典名句。</li>
            <li><strong>不可重出</strong>：单局对决内双方吟诵过的诗句不可重复出现。</li>
            <li><strong>限时应令</strong>：每回合限时 30 秒，超时或未能对出将判负。</li>
            <li><strong>考据严谨</strong>：内置万首传世古典精选诗词，自动校验诗句出处与诗人名讳。</li>
          </ul>
        </div>
      )}

      {/* Game Lobby or Active Battle */}
      {status === 'idle' ? (
        <div className="space-y-8">
          {/* 1. Keyword Selection Grid */}
          <div className="xuan-card rounded-3xl p-6 sm:p-8 space-y-5 border border-paper-400/40 shadow-oriental">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center gap-2">
                  <span>第一步：拣选飞花令字</span>
                </h3>
                <p className="text-xs font-serif text-ink-400 mt-0.5">
                  精选华夏诗词常见令字，亦可自定义任意单个汉字（如：梅、江、心、天）
                </p>
              </div>

              {/* Custom Keyword Input with 1-char limit */}
              <div className="flex flex-col items-end gap-1">
                <form onSubmit={handleCustomKeywordSubmit} className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={1}
                      value={customKeywordInput}
                      onChange={handleCustomKeywordChange}
                      placeholder="自定单字"
                      className="w-24 px-3 py-2 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-xl text-center font-serif text-base font-bold text-ink-900 dark:text-ink-50 focus:outline-hidden focus:border-chinese-cinnabar"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!customKeywordInput.trim()}
                    className="px-4 py-2 bg-chinese-cinnabar hover:bg-chinese-rouge text-white rounded-xl text-xs font-serif font-bold disabled:opacity-50 transition-colors shadow-xs"
                  >
                    设定令字
                  </button>
                </form>
                {customKeywordError && (
                  <span className="text-[11px] text-red-500 font-serif">{customKeywordError}</span>
                )}
              </div>
            </div>

            {/* Custom Keyword Active Notification */}
            {!FEIHUA_DEFAULT_KEYWORDS.includes(currentKeyword) && (
              <div className="flex items-center gap-3 p-3.5 bg-chinese-cinnabar/10 border border-chinese-cinnabar/30 rounded-2xl animate-fade-in">
                <span className="text-xs font-serif text-chinese-cinnabar font-bold">已启用自定义令字：</span>
                <span className="w-10 h-10 rounded-xl bg-chinese-cinnabar text-white font-serif text-xl font-bold flex items-center justify-center shadow-seal">
                  {currentKeyword}
                </span>
                <span className="text-xs font-serif text-ink-600 dark:text-ink-300">
                  （已从经典诗库中智能匹配「{currentKeyword}」字所有名句）
                </span>
              </div>
            )}

            {/* Default Keyword Chips */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {FEIHUA_DEFAULT_KEYWORDS.map((kw) => {
                const isSelected = currentKeyword === kw;
                return (
                  <button
                    key={kw}
                    onClick={() => setKeyword(kw)}
                    className={`h-14 rounded-2xl font-serif text-xl font-bold flex items-center justify-center transition-all duration-200 interactive-tap ${
                      isSelected
                        ? 'bg-chinese-cinnabar text-white shadow-seal scale-105 ring-2 ring-chinese-cinnabar/30'
                        : 'bg-paper-100 dark:bg-ink-800/80 hover:bg-paper-200 dark:hover:bg-ink-700 text-ink-800 dark:text-ink-200 border border-paper-300 dark:border-ink-700'
                    }`}
                  >
                    {kw}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Persona Selection */}
          <div className="xuan-card rounded-3xl p-6 sm:p-8 space-y-5 border border-paper-400/40 shadow-oriental">
            <div>
              <h3 className="text-lg font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center gap-2">
                <span>第二步：延请对诗名宿</span>
              </h3>
              <p className="text-xs font-serif text-ink-400 mt-0.5">
                历朝文宗个性鲜明，难度与风格各有千秋
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {FEIHUA_PERSONAS.map((persona) => {
                const isSelected = selectedPersona.id === persona.id;
                return (
                  <div
                    key={persona.id}
                    onClick={() => setPersona(persona)}
                    className={`cursor-pointer rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 interactive-tap ${
                      isSelected
                        ? 'bg-chinese-cinnabar/10 border-2 border-chinese-cinnabar ring-1 ring-chinese-cinnabar/30'
                        : 'bg-paper-100 dark:bg-ink-800/60 border border-paper-300 dark:border-ink-700 hover:bg-paper-200/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif font-black text-lg text-ink-900 dark:text-ink-50">
                          {persona.name}
                        </span>
                        <SealBadge
                          text={
                            persona.difficulty === 'easy'
                              ? '初试'
                              : persona.difficulty === 'medium'
                              ? '中选'
                              : persona.difficulty === 'hard'
                              ? '精熟'
                              : '登峰'
                          }
                          size="sm"
                          variant={
                            persona.difficulty === 'easy'
                              ? 'bamboo'
                              : persona.difficulty === 'medium'
                              ? 'gold'
                              : 'cinnabar'
                          }
                        />
                      </div>
                      <div className="text-xs font-serif text-chinese-cinnabar font-medium">
                        〔{persona.dynasty}〕{persona.title}
                      </div>
                      <p className="text-[11px] font-serif text-ink-500 mt-2 leading-relaxed line-clamp-2">
                        {persona.intro}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-paper-200 dark:border-ink-700 text-[10px] font-serif text-ink-400">
                      风格：{persona.style}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Start Battle CTA */}
          <div className="text-center pt-2">
            <button
              onClick={() => startGame()}
              className="px-10 py-4 rounded-3xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white font-serif font-black text-lg sm:text-xl shadow-seal hover:scale-102 transition-all flex items-center gap-3 mx-auto interactive-tap"
            >
              <Swords className="w-5 h-5 text-chinese-gold" />
              <span>开启【{currentKeyword}】字飞花令 · 迎战{selectedPersona.name}</span>
            </button>
          </div>
        </div>
      ) : (
        /* In Battle Arena */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left: Scoreboard */}
            <div className="lg:col-span-1 space-y-4">
              <FeihuaScoreBoard />

              <div className="xuan-card rounded-3xl p-5 border border-paper-400/40 space-y-3 text-xs font-serif text-ink-500">
                <div className="font-bold text-ink-800 dark:text-ink-200">
                  行令锦囊：
                </div>
                <p>
                  1. 每句需含「<strong>{currentKeyword}</strong>」字。<br />
                  2. 连对成功可获得连胜乘数积分。<br />
                  3. 超时或重出诗句将判定本局告负。
                </p>
                <button
                  onClick={() => resetGame()}
                  className="text-chinese-cinnabar hover:underline pt-2 block"
                >
                  认输并退出对决
                </button>
              </div>
            </div>

            {/* Right: Dialogue Arena */}
            <div className="lg:col-span-2">
              <FeihuaArena />
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      <FeihuaResultModal />
    </div>
  );
};
