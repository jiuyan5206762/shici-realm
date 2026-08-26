import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Compass, ArrowRight } from 'lucide-react';
import { dynastyApi } from '@/api/dynasties';
import { formatYearRange, getDynastyColorClass } from '@/utils/formatters';

export const DynastiesPage: React.FC = () => {
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
  });

  const dynasties = dynastiesRes?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-2.5">
          <Compass className="w-7 h-7 sm:w-8 h-8 text-chinese-ochre" />
          <span>朝代纪元 · 华夏诗史</span>
        </h1>
        <p className="text-xs sm:text-sm text-ink-400">
          自先秦源起，历经汉唐盛世、宋词鼎盛至明清遗风。穿越千年时光长河，体味不同历史维度的文心风骨。
        </p>
      </div>

      {/* Dynasty Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dynasties.map((dynasty, index) => {
          const color = getDynastyColorClass(dynasty.name);
          const years = formatYearRange(dynasty.start_year, dynasty.end_year);

          return (
            <div
              key={dynasty.id}
              className="bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-ochre/60 dark:hover:border-chinese-ochre/60 rounded-3xl p-6 shadow-oriental hover:shadow-oriental-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-xl text-sm font-serif font-bold border ${color.bg} ${color.text} ${color.border}`}>
                    {dynasty.name}代
                  </span>
                  <span className="text-xs font-mono text-ink-400">
                    序号 #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="space-y-1 my-2">
                  <h3 className="font-serif font-bold text-xl text-ink-800 dark:text-ink-100">
                    {dynasty.name} · {dynasty.name_en || ''}
                  </h3>
                  {years && (
                    <p className="text-xs font-serif text-chinese-ochre font-medium">
                      {years}
                    </p>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 line-clamp-2 leading-relaxed my-3 font-sans">
                  {dynasty.name === '唐'
                    ? '大唐气象，千古风华。诗仙李白、诗圣杜甫、诗佛王维开创了中国诗歌最辉煌灿烂的黄金时代。'
                    : dynasty.name === '宋'
                    ? '理学蔚起，词绝古今。苏轼旷达、辛弃疾豪迈、李清照深婉，长短句词体大放异彩。'
                    : dynasty.name === '先秦'
                    ? '华夏文脉源头，《诗经》采风、《楚辞》九歌，开启了浪漫主义与现实主义之滥觞。'
                    : `${dynasty.name}代文学独具风采，承前启后，留存了丰硕动人的经典辞章。`}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-chinese-nightBorder/60 flex items-center justify-between text-xs">
                <Link
                  to={`/authors?dynasty=${encodeURIComponent(dynasty.name)}`}
                  className="text-ink-400 hover:text-chinese-ochre"
                >
                  查看{dynasty.name}代诗人
                </Link>

                <Link
                  to={`/poems?dynasty=${encodeURIComponent(dynasty.name)}`}
                  className="inline-flex items-center space-x-1 text-chinese-ochre font-medium hover:underline"
                >
                  <span>浏览全部作品</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
