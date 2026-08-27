import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useFeihuaStore } from '@/store/feihuaStore';
import { guqinAudio } from '@/services/audio/guqinAudio';
import { SealBadge } from '@/components/Common/SealBadge';

export const FeihuaArena: React.FC = () => {
  const [inputVerse, setInputVerse] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    currentKeyword,
    history,
    playerTurn,
    status,
    selectedPersona,
    errorMessage,
    submitVerse,
  } = useFeihuaStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (playerTurn && status === 'playing') {
      inputRef.current?.focus();
    }
  }, [playerTurn, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVerse.trim() || !playerTurn || status !== 'playing') return;

    submitVerse(inputVerse.trim());
    setInputVerse('');
  };

  const renderHighlightedVerse = (verse: string, keyword: string) => {
    const parts = verse.split(new RegExp(`(${keyword})`, 'g'));
    return (
      <span>
        {parts.map((part, i) =>
          part === keyword ? (
            <span
              key={i}
              className="text-chinese-cinnabar font-bold px-1 py-0.5 rounded-sm bg-chinese-cinnabar/10 ring-1 ring-chinese-cinnabar/30 inline-block mx-0.5"
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="xuan-card rounded-3xl p-4 sm:p-8 flex flex-col h-[560px] border border-paper-400/50 shadow-oriental">
      {/* Duel Arena Header Note */}
      <div className="flex items-center justify-between pb-3 border-b border-paper-300/80 dark:border-ink-800 text-xs font-serif text-ink-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>与【{selectedPersona.name}】对诗切磋中</span>
        </div>
        <div className="flex items-center gap-1">
          <span>令字：</span>
          <SealBadge text={currentKeyword} size="sm" variant="cinnabar" />
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-ink-400">
            <div className="w-14 h-14 rounded-full bg-paper-200 dark:bg-ink-800 flex items-center justify-center text-2xl font-serif text-chinese-cinnabar">
              令
            </div>
            <p className="font-serif text-sm">
              飞花令开启！请说出一句含有「{currentKeyword}」字的诗句。
            </p>
            <p className="font-serif text-xs text-ink-400">
              提示：例如「春眠不觉晓」、「明月几时有」
            </p>
          </div>
        ) : (
          history.map((msg, index) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={index}
                className={`flex gap-3 items-start ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                } animate-fade-in`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-serif font-bold shadow-xs flex-shrink-0 ${
                    isUser
                      ? 'bg-chinese-cinnabar text-white'
                      : 'bg-chinese-celadon text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[78%] rounded-2xl p-4 space-y-1.5 shadow-xs ${
                    isUser
                      ? 'bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-ink-900 dark:text-ink-50'
                      : 'bg-paper-50 dark:bg-ink-900 border border-chinese-celadon/30 text-ink-900 dark:text-ink-50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[11px] font-serif text-ink-400">
                    <span className="font-bold">
                      {isUser ? '我方应令' : selectedPersona.name}
                    </span>
                    {msg.poemTitle && <span>《{msg.poemTitle}》</span>}
                    {msg.author && <span>· {msg.author}</span>}
                  </div>

                  <div className="font-serif text-base sm:text-lg tracking-wide select-text">
                    {renderHighlightedVerse(msg.verse, currentKeyword)}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Error / Validation alert */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-serif animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="pt-3 border-t border-paper-300/80 dark:border-ink-800">
        <div className="relative flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputVerse}
            onChange={(e) => setInputVerse(e.target.value)}
            disabled={!playerTurn || status !== 'playing'}
            placeholder={
              status !== 'playing'
                ? '对局未开始或已结束'
                : playerTurn
                ? `请输入含「${currentKeyword}」字的诗句，回车应令...`
                : `${selectedPersona.name} 正在搜肠刮肚中...`
            }
            className="flex-1 px-4 py-3 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-2xl font-serif text-sm sm:text-base text-ink-900 dark:text-ink-50 focus:outline-hidden focus:border-chinese-cinnabar disabled:opacity-60 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputVerse.trim() || !playerTurn || status !== 'playing'}
            onClick={() => guqinAudio.playGuqinPluck()}
            className="px-5 py-3 rounded-2xl bg-chinese-cinnabar hover:bg-chinese-rouge disabled:opacity-50 text-white font-serif font-bold text-sm flex items-center gap-1.5 shadow-xs transition-all interactive-tap flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">应令</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-2 text-[11px] font-serif text-ink-400 px-1">
          <span>规则：诗句必须包含令字「{currentKeyword}」，不可重复对局中已用过的诗句</span>
          <span className="hidden sm:inline flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>千首古典绝句严谨校验</span>
          </span>
        </div>
      </form>
    </div>
  );
};
