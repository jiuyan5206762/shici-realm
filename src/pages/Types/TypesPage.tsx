import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BookOpen } from 'lucide-react';
import { typeApi } from '@/api/types';
import { SealBadge } from '@/components/Common/SealBadge';
import { guqinAudio } from '@/services/audio/guqinAudio';

export const TypesPage: React.FC = () => {
  const { data: typesRes } = useQuery({
    queryKey: ['types'],
    queryFn: () => typeApi.getTypes(),
    staleTime: 60 * 60 * 1000,
  });

  const types = typesRes?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in pb-20">
      {/* Header Banner */}
      <div className="space-y-2 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div className="flex items-center gap-2">
          <SealBadge text="格律篇" size="sm" variant="bamboo" />
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
            体裁雅赏 · 格律体制
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif">
          涵盖绝句、律诗、长短句词体、散曲、乐府古乐与先秦雅颂等体制
        </p>
      </div>

      {/* Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type) => (
          <div
            key={type.id}
            className="xuan-card rounded-3xl p-7 shadow-oriental transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-paper-400/40"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <SealBadge text={type.category || '古典体制'} size="md" variant="bamboo" />
                {(type.lines || type.chars_per_line) && (
                  <span className="text-xs font-serif text-ink-400">
                    {type.lines ? `${type.lines}句` : '不限句'} ·{' '}
                    {type.chars_per_line ? `${type.chars_per_line}言` : '长短句'}
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-2xl text-ink-900 dark:text-ink-50 mb-2">
                {type.name}
              </h3>

              <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed mb-4 font-serif">
                {type.description || '中国古代韵文体制之一，声律严整，意境深邃。'}
              </p>
            </div>

            <div className="pt-5 mt-2 border-t border-paper-300/60 dark:border-ink-800 flex items-center justify-between text-xs font-serif">
              <span className="text-ink-400">韵律与格律规范</span>
              <Link
                to={`/poems?type=${encodeURIComponent(type.name)}`}
                onClick={() => guqinAudio.playChime()}
                className="inline-flex items-center gap-1 text-chinese-celadon font-bold hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>作品集录</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
