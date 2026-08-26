import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, MessageSquare, BookOpen, Quote, RefreshCw } from 'lucide-react';
import { Poem, AiAnalysis, AiChatMessage } from '@/types';
import { aiApi } from '@/api/ai';

interface AiAnalysisDrawerProps {
  poem: Poem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AiAnalysisDrawer: React.FC<AiAnalysisDrawerProps> = ({ poem, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'chat'>('analysis');
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<AiChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Quick prompt questions
  const quickPrompts = [
    '这首诗表达了什么核心情感？',
    '诗中有哪些精妙的艺术手法？',
    '为什么本篇能成为千古流传的名作？',
    '能否为我逐句通俗剖析诗中意境？',
  ];

  useEffect(() => {
    if (isOpen && poem) {
      setIsLoading(true);
      setChatMessages([
        {
          role: 'assistant',
          content: `您好！我是您的 AI 古诗词研析助手。关于《${poem.title}》（${poem.dynasty?.name || ''} · ${poem.author?.name || ''}），您可以随时向我提问创作背景、字词意象、情感主旨或艺术手法。`,
          timestamp: Date.now(),
        },
      ]);

      aiApi
        .explainPoem(poem)
        .then((res) => setAnalysis(res))
        .catch((err) => console.error('Failed to load analysis', err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, poem?.id]);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  if (!isOpen || !poem) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputMessage.trim();
    if (!message || isSending) return;

    const userMsg: AiChatMessage = {
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsSending(true);

    try {
      const reply = await aiApi.chatPoem(poem, chatMessages, message);
      const assistantMsg: AiChatMessage = {
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '解析时发生了一点小问题，请稍后再试。',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-2xl bg-paper-50 dark:bg-chinese-nightCard border-l border-stone-200 dark:border-chinese-nightBorder h-full flex flex-col shadow-2xl animate-slideLeft">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-chinese-nightBorder flex items-center justify-between bg-white dark:bg-chinese-night">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-chinese-ochre/15 text-chinese-ochre flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-ink-800 dark:text-ink-50">
                AI 智能诗境赏析
              </h3>
              <p className="text-xs text-ink-400">
                《{poem.title}》 · {poem.author?.name || '古人'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 dark:border-chinese-nightBorder px-6 bg-stone-100/60 dark:bg-stone-900/40">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'analysis'
                ? 'border-chinese-ochre text-chinese-ochre font-semibold'
                : 'border-transparent text-ink-500 hover:text-ink-800 dark:hover:text-ink-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>深度赏析</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'chat'
                ? 'border-chinese-ochre text-chinese-ochre font-semibold'
                : 'border-transparent text-ink-500 hover:text-ink-800 dark:hover:text-ink-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>诗词问答</span>
          </button>
        </div>

        {/* Tab 1: Deep Analysis */}
        {activeTab === 'analysis' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isLoading ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-10 h-10 border-3 border-chinese-ochre border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="font-serif text-sm text-ink-500">正在研读古籍辞章、提炼诗韵意境…</p>
              </div>
            ) : analysis ? (
              <>
                {/* Sentiment & Features Tag banner */}
                {analysis.sentiment && (
                  <div className="p-4 rounded-2xl bg-chinese-ochre/10 dark:bg-chinese-ochre/15 border border-chinese-ochre/20 space-y-2">
                    <div className="text-xs font-semibold text-chinese-ochre flex items-center space-x-1.5">
                      <Quote className="w-3.5 h-3.5" />
                      <span>情感基调与意象特色</span>
                    </div>
                    <p className="text-sm font-serif text-ink-800 dark:text-ink-100 leading-relaxed">
                      {analysis.sentiment}
                    </p>
                    {analysis.artisticFeatures && analysis.artisticFeatures.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {analysis.artisticFeatures.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[11px] bg-white/80 dark:bg-stone-800 text-chinese-ochre font-medium border border-chinese-ochre/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Section 1: 白话译文 */}
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-ink-800 dark:text-ink-100 font-serif font-bold text-base">
                    <div className="w-2 h-4 bg-chinese-ochre rounded-full" />
                    <h4>白话译文</h4>
                  </div>
                  <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-sm text-ink-700 dark:text-ink-200 leading-relaxed font-sans whitespace-pre-line">
                    {analysis.translation}
                  </div>
                </div>

                {/* Section 2: 创作背景 */}
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-ink-800 dark:text-ink-100 font-serif font-bold text-base">
                    <div className="w-2 h-4 bg-chinese-celadon rounded-full" />
                    <h4>创作背景</h4>
                  </div>
                  <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-sm text-ink-700 dark:text-ink-200 leading-relaxed font-sans">
                    {analysis.background}
                  </div>
                </div>

                {/* Section 3: 作品赏析 */}
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-ink-800 dark:text-ink-100 font-serif font-bold text-base">
                    <div className="w-2 h-4 bg-chinese-cinnabar rounded-full" />
                    <h4>作品赏析</h4>
                  </div>
                  <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-sm text-ink-700 dark:text-ink-200 leading-relaxed font-sans">
                    {analysis.appreciation}
                  </div>
                </div>

                {/* Section 4: 名句精讲 */}
                {analysis.keyLines && analysis.keyLines.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-2 text-ink-800 dark:text-ink-100 font-serif font-bold text-base">
                      <div className="w-2 h-4 bg-indigo-500 rounded-full" />
                      <h4>名句点睛</h4>
                    </div>
                    <div className="space-y-3">
                      {analysis.keyLines.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1.5"
                        >
                          <div className="font-serif font-bold text-chinese-ochre text-sm">
                            « {item.line} »
                          </div>
                          <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}

        {/* Tab 2: Interactive AI Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={index}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? 'bg-chinese-ochre text-white font-medium rounded-br-none'
                          : 'bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-ink-800 dark:text-ink-100 rounded-bl-none font-sans'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {isSending && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-ink-400 text-xs flex items-center space-x-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>AI 正在研思作答…</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts & Input */}
            <div className="p-4 bg-white dark:bg-chinese-night border-t border-stone-200 dark:border-chinese-nightBorder space-y-3">
              {/* Quick Prompt Chips */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="flex-shrink-0 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-chinese-ochre/10 hover:text-chinese-ochre text-ink-600 dark:text-ink-300 border border-stone-200/60 dark:border-stone-700 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`向 AI 助手提问关于《${poem.title}》...`}
                  disabled={isSending}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm text-ink-800 dark:text-ink-100 focus:outline-none focus:ring-1 focus:ring-chinese-ochre disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="p-2.5 rounded-xl bg-chinese-ochre hover:bg-chinese-ochre/90 disabled:opacity-40 text-white transition-all active:scale-95 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
