import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BookOpen, Users } from 'lucide-react';
import { dynastyApi } from '@/api/dynasties';
import { formatYearRange } from '@/utils/formatters';
import { SealBadge } from '@/components/Common/SealBadge';

export const DynastiesPage: React.FC = () => {
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
    staleTime: 60 * 60 * 1000,
  });

  const dynasties = dynastiesRes?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in pb-20">
      {/* Header Banner */}
      <div className="space-y-2 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div className="flex items-center gap-2">
          <SealBadge text="编年史" size="sm" variant="cinnabar" />
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
            朝代纪元 · 华夏诗史
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif">
          自先秦源起，历经汉唐盛世、两宋词鼎至明清遗风。体味不同历史维度的文心风骨。
        </p>
      </div>

      {/* Dynasty Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dynasties.map((dynasty) => {
          const years = formatYearRange(dynasty.start_year, dynasty.end_year);

          return (
            <div
              key={dynasty.id}
              className="xuan-card rounded-3xl p-7 shadow-oriental transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-paper-400/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <SealBadge text={`${dynasty.name}代`} size="md" variant="cinnabar" />
                  {years && (
                    <span className="text-xs font-serif text-ink-400">
                      {years}
                    </span>
                  )}
                </div>

                <div className="space-y-1 my-2">
                  <h3 className="font-serif font-bold text-2xl text-ink-900 dark:text-ink-50">
                    {dynasty.name} · {dynasty.name_en || ''}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed my-3 font-serif">
                  {dynasty.name === '唐'
                    ? '大唐气象，千古风华。李白、杜甫、王维开创了中国诗歌最辉煌灿烂的黄金时代。'
                    : dynasty.name === '宋'
                    ? '理学蔚起，词绝古今。苏轼旷达、辛弃疾豪迈、李清照深婉，长短句大放异彩。'
                    : dynasty.name === '先秦'
                    ? '华夏文脉源头，《诗经》采风、《楚辞》九歌，开启了浪漫主义与现实主义之滥觞。'
                    : `${dynasty.name}代文学独具风采，承前启后，留存了丰硕动人的经典辞章。`}
                </p>
              </div>

              <div className="pt-5 mt-3 border-t border-paper-300/60 dark:border-ink-800 flex items-center justify-between text-xs font-serif">
                <Link
                  to={`/authors?dynasty=${encodeURIComponent(dynasty.name)}`}
                  className="text-ink-500 hover:text-chinese-cinnabar flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{dynasty.name}代诗人</span>
                </Link>

                <Link
                  to={`/poems?dynasty=${encodeURIComponent(dynasty.name)}`}
                  className="inline-flex items-center gap-1 text-chinese-cinnabar font-bold hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>诗库作品</span>
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
