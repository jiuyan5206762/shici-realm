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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-3">
          <Layers className="w-8 h-8 text-chinese-celadon" />
          <span>体裁雅赏 · 格律体制</span>
        </h1>
        <p className="text-base text-ink-600 dark:text-ink-300 font-serif">
          涵盖绝句、律诗、长短句词体、散曲、乐府古乐与先秦雅颂等体制
        </p>
      </div>

      {/* Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type) => (
          <div
            key={type.id}
            className="bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 hover:border-chinese-celadon/60 rounded-3xl p-7 shadow-sm transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-xl text-base font-serif font-bold bg-stone-100 dark:bg-stone-800 text-chinese-celadon">
                  {type.category || '古典体制'}
                </span>
                {(type.lines || type.chars_per_line) && (
                  <span className="text-sm font-serif text-ink-500 dark:text-ink-400">
                    {type.lines ? `${type.lines}句` : '不限句'} ·{' '}
                    {type.chars_per_line ? `${type.chars_per_line}言` : '长短句'}
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-2xl text-ink-900 dark:text-ink-100 mb-2">
                {type.name}
              </h3>

              <p className="text-base text-ink-600 dark:text-ink-300 leading-relaxed mb-4 font-serif">
                {type.description || '中国古代韵文体制之一，声律严整，意境深邃。'}
              </p>
            </div>

            <div className="pt-5 mt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-sm font-serif">
              <span className="text-ink-500">韵律与格律规范</span>
              <Link
                to={`/poems?type=${encodeURIComponent(type.name)}`}
                className="inline-flex items-center space-x-1 text-chinese-celadon font-medium hover:underline"
              >
                <span>作品集录</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
