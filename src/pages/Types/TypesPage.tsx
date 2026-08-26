import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layers, ArrowRight } from 'lucide-react';
import { typeApi } from '@/api/types';

export const TypesPage: React.FC = () => {
  const { data: typesRes } = useQuery({
    queryKey: ['types'],
    queryFn: () => typeApi.getTypes(),
  });

  const types = typesRes?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-2.5">
          <Layers className="w-7 h-7 sm:w-8 h-8 text-chinese-celadon" />
          <span>体裁雅赏 · 格律词牌</span>
        </h1>
        <p className="text-xs sm:text-sm text-ink-400">
          涵盖绝句、律诗、长短句词体、散曲、乐府古乐与先秦雅颂等 17 种经典体制
        </p>
      </div>

      {/* Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type) => (
          <div
            key={type.id}
            className="bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-celadon/60 dark:hover:border-chinese-celadon/60 rounded-3xl p-6 shadow-oriental hover:shadow-oriental-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-chinese-celadon/10 text-chinese-celadon border border-chinese-celadon/30">
                  {type.category || '古典诗词'}
                </span>
                {(type.lines || type.chars_per_line) && (
                  <span className="text-xs font-mono text-ink-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg">
                    {type.lines ? `${type.lines}句` : '不限句'} ·{' '}
                    {type.chars_per_line ? `${type.chars_per_line}言` : '长短句'}
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-xl text-ink-800 dark:text-ink-100 mb-2">
                {type.name}
              </h3>

              <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 line-clamp-3 leading-relaxed mb-4 font-sans">
                {type.description || '中国古代韵文体制之一，声律严整，意境深邃。'}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-chinese-nightBorder/60 flex items-center justify-between text-xs">
              <span className="text-ink-400 font-serif">韵律与格律规范</span>
              <Link
                to={`/poems?type=${encodeURIComponent(type.name)}`}
                className="inline-flex items-center space-x-1 text-chinese-celadon font-medium hover:underline"
              >
                <span>浏览本类诗作</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
