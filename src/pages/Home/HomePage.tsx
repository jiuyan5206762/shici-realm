import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Shuffle,
  Compass,
  Layers,
  Users,
  ArrowRight,
  Heart,
  BookOpen,
} from 'lucide-react';
import { statsApi } from '@/api/stats';
import { dynastyApi } from '@/api/dynasties';
import { typeApi } from '@/api/types';
import { poemApi } from '@/api/poems';
import { SearchBar } from '@/components/Search/SearchBar';
import { PoemCard } from '@/components/Poem/PoemCard';
import { useFavoriteStore } from '@/store/favoriteStore';

const MASTER_POETS = [
  { name: '李白', dynasty: '唐', title: '诗仙', desc: '盛唐浪漫巅峰，逸气凌云，豪迈超拔。' },
  { name: '杜甫', dynasty: '唐', title: '诗圣', desc: '沉郁顿挫，悲悯苍生，反映一代沧桑。' },
  { name: '苏轼', dynasty: '宋', title: '东坡居士', desc: '旷达超脱，词贯八荒，千古文章大家。' },
  { name: '李清照', dynasty: '宋', title: '易安居士', desc: '婉约正宗，深婉沉挚，词采冠绝千古。' },
  { name: '辛弃疾', dynasty: '宋', title: '稼轩居士', desc: '豪放悲壮，气吞万里如虎。' },
  { name: '王维', dynasty: '唐', title: '诗佛', desc: '诗中有画，空灵幽深，禅意悠远。' },
  { name: '白居易', dynasty: '唐', title: '香山居士', desc: '讽喻深切，雅俗共赏，平易近人。' },
  { name: '陶渊明', dynasty: '魏晋', title: '五柳先生', desc: '田园之祖，质朴冲淡，高洁超逸。' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();

  // 1. Fetch Stats
  const { data: statsRes } = useQuery({
    queryKey: ['stats'],
    queryFn: () => statsApi.getStats(),
  });

  // 2. Fetch Dynasties
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
  });

  // 3. Fetch Types
  const { data: typesRes } = useQuery({
    queryKey: ['types'],
    queryFn: () => typeApi.getTypes(),
  });

  // 4. Daily / Today's Recommended Poem
  const {
    data: dailyPoemRes,
    refetch: refetchDailyPoem,
    isFetching: isFetchingDaily,
  } = useQuery({
    queryKey: ['dailyPoem'],
    queryFn: () => poemApi.getRandom(),
    staleTime: 5 * 60 * 1000,
  });

  const dailyPoem = dailyPoemRes?.data;
  const isDailyFav = dailyPoem ? isFavorite(dailyPoem.id) : false;

  // 5. Random Explorer State
  const [randomFilter, setRandomFilter] = useState<'all' | 'tang' | 'song' | 'libai' | 'jueju'>('all');
  const {
    data: randomPoemRes,
    refetch: refetchRandomPoem,
    isFetching: isFetchingRandom,
  } = useQuery({
    queryKey: ['randomPoem', randomFilter],
    queryFn: () => {
      if (randomFilter === 'tang') return poemApi.getRandom({ dynasty: '唐' });
      if (randomFilter === 'song') return poemApi.getRandom({ dynasty: '宋' });
      if (randomFilter === 'libai') return poemApi.getRandom({ author: '李白' });
      if (randomFilter === 'jueju') return poemApi.getRandom({ type: '七言绝句' });
      return poemApi.getRandom();
    },
  });

  const stats = statsRes?.data || {
    poems: 371313,
    authors: 13577,
    dynasties: 11,
    types: 17,
  };

  const dynasties = dynastiesRes?.data || [];
  const types = typesRes?.data || [];
  const randomPoem = randomPoemRes?.data;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Classical Minimalist Hero Section */}
      <section className="relative pt-10 sm:pt-20 pb-4 text-center space-y-7 max-w-4xl mx-auto px-4">
        {/* Calligraphic Seal / Accent */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 text-sm font-serif border border-stone-200 dark:border-stone-700">
          <BookOpen className="w-4 h-4 text-chinese-ochre" />
          <span>中华古诗词数字文库</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-6xl font-serif font-bold tracking-wider text-ink-900 dark:text-ink-50 leading-tight">
          品读千年辞章 · 探寻华夏诗境
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-ink-600 dark:text-ink-300 max-w-2xl mx-auto font-serif leading-relaxed">
          汇萃历朝经典三十七万首，收录先贤名家万余人。
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-2xl mx-auto">
          <SearchBar onSearch={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)} autoFocus={false} />
        </div>

        {/* Clean Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-chinese-ochre">
              {stats.poems.toLocaleString()}
            </div>
            <div className="text-sm text-ink-500 dark:text-ink-400 mt-1 font-serif">收录诗篇</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-chinese-cinnabar">
              {stats.authors.toLocaleString()}
            </div>
            <div className="text-sm text-ink-500 dark:text-ink-400 mt-1 font-serif">历代先贤</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-chinese-celadon">
              {stats.dynasties}
            </div>
            <div className="text-sm text-ink-500 dark:text-ink-400 mt-1 font-serif">朝代纪元</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-ink-700 dark:text-ink-300">
              {stats.types}
            </div>
            <div className="text-sm text-ink-500 dark:text-ink-400 mt-1 font-serif">体裁分类</div>
          </div>
        </div>
      </section>

      {/* 2. Today's Recommended Masterpiece (诗笺风格) */}
      {dailyPoem && (
        <section className="max-w-3xl mx-auto px-4">
          <div className="bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-8 sm:p-12 shadow-sm relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-stone-800">
              <div className="font-serif font-bold text-base text-chinese-ochre tracking-wider">
                今日雅荐 · 每日一诗
              </div>

              <button
                onClick={() => refetchDailyPoem()}
                disabled={isFetchingDaily}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-sm font-serif text-ink-600 dark:text-ink-300 hover:text-chinese-ochre hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-50"
                title="换一首推荐"
              >
                <Shuffle className={`w-4 h-4 ${isFetchingDaily ? 'animate-spin' : ''}`} />
                <span>换一首</span>
              </button>
            </div>

            {/* Poem Core Content */}
            <div className="py-4 text-center space-y-4">
              <Link to={`/poems/${dailyPoem.id}`}>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 hover:text-chinese-ochre transition-colors tracking-wide">
                  {dailyPoem.title}
                </h2>
              </Link>

              <div className="text-base font-serif text-chinese-ochre flex items-center justify-center space-x-2">
                <span>〔{dailyPoem.dynasty?.name || '古'}〕</span>
                <span className="font-bold text-ink-800 dark:text-ink-200">{dailyPoem.author?.name || '佚名'}</span>
                {dailyPoem.type?.name && (
                  <>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="text-ink-500 dark:text-ink-400">{dailyPoem.type.name}</span>
                  </>
                )}
              </div>

              <div className="font-serif text-ink-900 dark:text-ink-100 text-lg sm:text-2xl leading-loose sm:leading-[2.4] max-w-xl mx-auto py-4 tracking-widest select-text">
                {(dailyPoem.content || []).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            {/* Action Bottom Bar */}
            <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={() =>
                  isDailyFav ? removeFavorite(dailyPoem.id) : addFavorite(dailyPoem)
                }
                className={`px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isDailyFav
                    ? 'bg-chinese-cinnabar text-white'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-ink-700 dark:text-ink-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isDailyFav ? 'fill-white' : ''}`} />
                <span>{isDailyFav ? '已收藏' : '收藏'}</span>
              </button>

              <Link
                to={`/poems/${dailyPoem.id}`}
                className="inline-flex items-center space-x-1.5 text-chinese-ochre hover:underline font-serif font-medium text-base"
              >
                <span>品读全篇与赏析</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. Random Poetry Explorer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Shuffle className="w-5 h-5 text-chinese-ochre" />
              <span>诗海漫游</span>
            </h2>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-0.5 font-serif">
              随心偶遇一首传世佳作
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-sm">
            {[
              { id: 'all', label: '随机全库' },
              { id: 'tang', label: '唐诗' },
              { id: 'song', label: '宋词' },
              { id: 'libai', label: '李白' },
              { id: 'jueju', label: '绝句' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRandomFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg font-serif transition-colors whitespace-nowrap ${
                  randomFilter === tab.id
                    ? 'bg-chinese-ochre text-white font-medium shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-ink-700 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => refetchRandomPoem()}
              disabled={isFetchingRandom}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-ink-600 dark:text-ink-300 hover:text-chinese-ochre transition-colors"
              title="再抽一首"
            >
              <Shuffle className={`w-4 h-4 ${isFetchingRandom ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {randomPoem && (
          <div className="max-w-2xl mx-auto">
            <PoemCard poem={randomPoem} />
          </div>
        )}
      </section>

      {/* 4. Famous Poets Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Users className="w-5 h-5 text-chinese-cinnabar" />
              <span>千古名家</span>
            </h2>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-0.5 font-serif">
              历代先贤文采风流
            </p>
          </div>

          <Link
            to="/authors"
            className="inline-flex items-center space-x-1 text-sm font-serif text-chinese-ochre hover:underline"
          >
            <span>全部诗人</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {MASTER_POETS.map((poet) => (
            <Link
              key={poet.name}
              to={`/poems?author=${encodeURIComponent(poet.name)}`}
              className="p-6 rounded-2xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 hover:border-chinese-ochre/60 transition-all hover:shadow-md space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-xl text-ink-900 dark:text-ink-100 group-hover:text-chinese-ochre transition-colors">
                  {poet.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded font-serif bg-stone-100 dark:bg-stone-800 text-ink-500 dark:text-ink-400">
                  {poet.dynasty} · {poet.title}
                </span>
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-400 font-serif line-clamp-2 leading-relaxed">
                {poet.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Dynasties and Genres Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dynasties */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-serif font-bold text-xl text-ink-900 dark:text-ink-100 flex items-center space-x-2">
                <Compass className="w-5 h-5 text-chinese-ochre" />
                <span>朝代历史</span>
              </h3>
              <Link to="/poems" className="text-sm font-serif text-chinese-ochre hover:underline">
                进入库览
              </Link>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {dynasties.map((d) => (
                <Link
                  key={d.id}
                  to={`/poems?dynasty=${encodeURIComponent(d.name)}`}
                  className="px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-chinese-ochre hover:text-white border border-stone-200/80 dark:border-stone-800 text-ink-800 dark:text-ink-200 font-serif text-sm transition-all"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-serif font-bold text-xl text-ink-900 dark:text-ink-100 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-chinese-celadon" />
                <span>诗词体裁</span>
              </h3>
              <Link to="/poems" className="text-sm font-serif text-chinese-ochre hover:underline">
                进入库览
              </Link>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {types.slice(0, 10).map((t) => (
                <Link
                  key={t.id}
                  to={`/poems?type=${encodeURIComponent(t.name)}`}
                  className="px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-chinese-celadon hover:text-white border border-stone-200/80 dark:border-stone-800 text-ink-800 dark:text-ink-200 font-serif text-sm transition-all"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
