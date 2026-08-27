import React, { useState } from 'react';
import {
  Swords,
  BookOpen,
  HelpCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useFeihuaStore } from '@/store/feihuaStore';
import { FEIHUA_DEFAULT_KEYWORDS, FEIHUA_PERSONAS } from '@/api/feihuaService';
import { FeihuaScoreBoard } from '@/components/Feihua/FeihuaScoreBoard';
import { FeihuaArena } from '@/components/Feihua/FeihuaArena';
import { FeihuaResultModal } from '@/components/Feihua/FeihuaResultModal';
import { SealBadge } from '@/components/Common/SealBadge';
import { guqinAudio } from '@/services/audio/guqinAudio';

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
  const [showRules, setShowRules] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(guqinAudio.isEnabled());

  const handleToggleAudio = () => {
    const next = !isAudioEnabled;
    guqinAudio.setEnabled(next);
    setIsAudioEnabled(next);
    if (next) {
      guqinAudio.playGuqinPluck();
    }
  };

  const handleCustomKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customKeywordInput.trim()) return;
    const char = customKeywordInput.trim().charAt(0);
    guqinAudio.playChime();
    setKeyword(char);
    setCustomKeywordInput('');
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
          {/* Sound toggle */}
          <button
            onClick={handleToggleAudio}
            className="p-2.5 rounded-2xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:text-chinese-cinnabar transition-colors"
            title={isAudioEnabled ? '关闭古琴音效' : '开启古琴音效'}
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 text-chinese-celadon" /> : <VolumeX className="w-4 h-4 text-ink-400" />}
          </button>

          {/* Rules modal trigger */}
          <button
            onClick={() => {
              guqinAudio.playChime();
              setShowRules(!showRules);
            }}
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
            <li><strong>令字规定</strong>：双方轮流吟诵含有指定令字（如「春」、「花」、「月」）的传世古典名句。</li>
            <li><strong>不可重出</strong>：单局对决内双方吟诵过的诗句不可重复出现。</li>
            <li><strong>限时应令</strong>：每回合限时 30 秒，超时或未能对出将判负。</li>
            <li><strong>考据严谨</strong>：内置 1200+ 传世名篇精选绝句，自动校验诗句出处与诗人名讳。</li>
          </ul>
        </div>
      )}

      {/* Game Lobby or Active Battle */}
      {status === 'idle' ? (
        <div className="space-y-8">
          {/* 1. Keyword Selection Grid */}
          <div className="xuan-card rounded-3xl p-6 sm:p-8 space-y-5 border border-paper-400/40 shadow-oriental">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center gap-2">
                  <span>第一步：拣选飞花令字</span>
                </h3>
                <p className="text-xs font-serif text-ink-400 mt-0.5">
                  精选华夏诗词最负盛名之意象，亦可自定义任意令字
                </p>
              </div>

              {/* Custom Keyword Input */}
              <form onSubmit={handleCustomKeywordSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={1}
                  value={customKeywordInput}
                  onChange={(e) => setCustomKeywordInput(e.target.value)}
                  placeholder="自定单字..."
                  className="w-24 px-3 py-2 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-xl text-center font-serif text-sm text-ink-900 dark:text-ink-50 focus:outline-hidden focus:border-chinese-cinnabar"
                />
                <button
                  type="submit"
                  disabled={!customKeywordInput.trim()}
                  className="px-3.5 py-2 bg-paper-200 dark:bg-ink-700 hover:bg-chinese-cinnabar hover:text-white rounded-xl text-xs font-serif disabled:opacity-50 transition-colors"
                >
                  设定
                </button>
              </form>
            </div>

            {/* Default Keyword Chips */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {FEIHUA_DEFAULT_KEYWORDS.map((kw) => {
                const isSelected = currentKeyword === kw;
                return (
                  <button
                    key={kw}
                    onClick={() => {
                      guqinAudio.playGuqinPluck();
                      setKeyword(kw);
                    }}
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
                    onClick={() => {
                      guqinAudio.playGuqinPluck();
                      setPersona(persona);
                    }}
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
              onClick={() => {
                guqinAudio.playVictory();
                startGame();
              }}
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
                  onClick={() => {
                    guqinAudio.playChime();
                    resetGame();
                  }}
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
