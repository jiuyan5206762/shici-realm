import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Compass, ArrowRight } from 'lucide-react';
import { dynastyApi } from '@/api/dynasties';
import { formatYearRange } from '@/utils/formatters';

export const DynastiesPage: React.FC = () => {
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
  });

  const dynasties = dynastiesRes?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-3">
          <Compass className="w-8 h-8 text-chinese-ochre" />
          <span>朝代纪元 · 华夏诗史</span>
        </h1>
        <p className="text-base text-ink-600 dark:text-ink-300 font-serif">
          自先秦源起，历经汉唐盛世、宋词鼎盛至明清遗风。体味不同历史维度的文心风骨。
        </p>
      </div>

      {/* Dynasty Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dynasties.map((dynasty) => {
          const years = formatYearRange(dynasty.start_year, dynasty.end_year);

          return (
            <div
              key={dynasty.id}
              className="bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 hover:border-chinese-ochre/60 rounded-3xl p-7 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-xl text-base font-serif font-bold bg-stone-100 dark:bg-stone-800 text-chinese-ochre">
                    {dynasty.name}代
                  </span>
                  {years && (
                    <span className="text-sm font-serif text-ink-500 dark:text-ink-400">
                      {years}
                    </span>
                  )}
                </div>

                <div className="space-y-1 my-2">
                  <h3 className="font-serif font-bold text-2xl text-ink-900 dark:text-ink-100">
                    {dynasty.name} · {dynasty.name_en || ''}
                  </h3>
                </div>

                <p className="text-base text-ink-600 dark:text-ink-300 leading-relaxed my-3 font-serif">
                  {dynasty.name === '唐'
                    ? '大唐气象，千古风华。李白、杜甫、王维开创了中国诗歌最辉煌灿烂的黄金时代。'
                    : dynasty.name === '宋'
                    ? '理学蔚起，词绝古今。苏轼旷达、辛弃疾豪迈、李清照深婉，长短句大放异彩。'
                    : dynasty.name === '先秦'
                    ? '华夏文脉源头，《诗经》采风、《楚辞》九歌，开启了浪漫主义与现实主义之滥觞。'
                    : `${dynasty.name}代文学独具风采，承前启后，留存了丰硕动人的经典辞章。`}
                </p>
              </div>

              <div className="pt-5 mt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-sm font-serif">
                <Link
                  to={`/authors?dynasty=${encodeURIComponent(dynasty.name)}`}
                  className="text-ink-500 hover:text-chinese-ochre"
                >
                  {dynasty.name}代诗人 →
                </Link>

                <Link
                  to={`/poems?dynasty=${encodeURIComponent(dynasty.name)}`}
                  className="inline-flex items-center space-x-1 text-chinese-ochre font-medium hover:underline"
                >
                  <span>诗库作品</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
