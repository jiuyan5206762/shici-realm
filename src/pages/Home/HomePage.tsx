import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Sparkles,
  Shuffle,
  Compass,
  Layers,
  Users,
  ArrowRight,
  Bookmark,
  History,
  Volume2,
  Heart,
} from 'lucide-react';
import { statsApi } from '@/api/stats';
import { dynastyApi } from '@/api/dynasties';
import { typeApi } from '@/api/types';
import { poemApi } from '@/api/poems';
import { SearchBar } from '@/components/Search/SearchBar';
import { PoemCard } from '@/components/Poem/PoemCard';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useHistoryStore } from '@/store/historyStore';
import { usePoemSpeech } from '@/hooks/usePoemSpeech';
import { getDynastyColorClass } from '@/utils/formatters';

const MASTER_POETS = [
  { name: '李白', dynasty: '唐', title: '诗仙', desc: '盛唐浪漫主义诗歌巅峰，豪迈奔放，逸气凌云。' },
  { name: '杜甫', dynasty: '唐', title: '诗圣', desc: '沉郁顿挫，悲悯苍生，反映唐代由盛转衰的时代画卷。' },
  { name: '苏轼', dynasty: '宋', title: '东坡居士', desc: '豪放词开创者，词贯八荒，旷达超脱，文绝千古。' },
  { name: '李清照', dynasty: '宋', title: '易安居士', desc: '宋代婉约词宗，词采清拔，深婉细腻，千古第一才女。' },
  { name: '辛弃疾', dynasty: '宋', title: '稼轩居士', desc: '豪放派巨擘，气吞万里如虎，沉雄悲壮。' },
  { name: '王维', dynasty: '唐', title: '诗佛', desc: '诗中有画，画中有诗，空灵幽邃，禅意盎然。' },
  { name: '白居易', dynasty: '唐', title: '诗魔', desc: '文章合为时而著，歌诗合为事而作，雅俗共赏。' },
  { name: '陶渊明', dynasty: '魏晋', title: '五柳先生', desc: '田园诗派鼻祖，质朴冲淡，高洁隐逸。' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const { history } = useHistoryStore();

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

  // 4. Daily / Today's Recommended Poem (Random on load, or specific random)
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
  const { isPlaying: isDailyPlaying, toggle: toggleDailySpeech } = usePoemSpeech(dailyPoem);

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
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-6 text-center space-y-6 max-w-4xl mx-auto px-4">
        {/* Oriental Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-chinese-ochre/10 dark:bg-chinese-ochre/20 text-chinese-ochre text-xs sm:text-sm font-serif font-medium border border-chinese-ochre/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>中华千古文脉 · 数字时代的诗意栖居</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-6xl font-serif font-black tracking-wide text-ink-900 dark:text-ink-50 leading-tight">
          品读千年辞章，<br className="hidden sm:inline" />
          探寻华夏诗境之美
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-ink-500 dark:text-ink-300 max-w-2xl mx-auto font-sans leading-relaxed">
          收录历朝历代 <span className="font-semibold text-chinese-ochre font-serif">37万+</span> 首经典古诗词与 <span className="font-semibold text-chinese-ochre font-serif">1.3万+</span> 位先贤名家。支持多维检索、沉浸阅读、诗词收藏与 AI 智能解析。
        </p>

        {/* Global Search Bar in Hero */}
        <div className="pt-4 max-w-2xl mx-auto">
          <SearchBar onSearch={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)} autoFocus={false} />
        </div>

        {/* Stats Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-chinese-nightCard/70 border border-stone-200/80 dark:border-chinese-nightBorder backdrop-blur-xs text-center shadow-oriental">
            <div className="text-xl sm:text-3xl font-serif font-bold text-chinese-ochre">
              {stats.poems.toLocaleString()}
            </div>
            <div className="text-xs text-ink-400 mt-1">诗词典籍</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-chinese-nightCard/70 border border-stone-200/80 dark:border-chinese-nightBorder backdrop-blur-xs text-center shadow-oriental">
            <div className="text-xl sm:text-3xl font-serif font-bold text-chinese-cinnabar">
              {stats.authors.toLocaleString()}
            </div>
            <div className="text-xs text-ink-400 mt-1">历代诗人</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-chinese-nightCard/70 border border-stone-200/80 dark:border-chinese-nightBorder backdrop-blur-xs text-center shadow-oriental">
            <div className="text-xl sm:text-3xl font-serif font-bold text-chinese-celadon">
              {stats.dynasties}
            </div>
            <div className="text-xs text-ink-400 mt-1">朝代纪元</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-chinese-nightCard/70 border border-stone-200/80 dark:border-chinese-nightBorder backdrop-blur-xs text-center shadow-oriental">
            <div className="text-xl sm:text-3xl font-serif font-bold text-indigo-600 dark:text-indigo-400">
              {stats.types}
            </div>
            <div className="text-xs text-ink-400 mt-1">体裁分类</div>
          </div>
        </div>
      </section>

      {/* 2. Today's Recommended Masterpiece Card */}
      {dailyPoem && (
        <section className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-paper-50 to-paper-200/80 dark:from-chinese-nightCard dark:to-stone-900 border border-stone-300/80 dark:border-chinese-nightBorder rounded-3xl p-6 sm:p-10 shadow-oriental">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-chinese-cinnabar animate-pulse" />
                <span className="font-serif font-bold text-sm tracking-wider text-chinese-ochre">
                  今日雅荐 · 每日一诗
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => refetchDailyPoem()}
                  disabled={isFetchingDaily}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-medium text-ink-500 hover:text-chinese-ochre hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors disabled:opacity-50"
                  title="换一首推荐"
                >
                  <Shuffle className={`w-3.5 h-3.5 ${isFetchingDaily ? 'animate-spin' : ''}`} />
                  <span>换一首</span>
                </button>
              </div>
            </div>

            {/* Poem Core Content */}
            <div className="py-8 text-center space-y-4">
              <Link to={`/poems/${dailyPoem.id}`}>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 hover:text-chinese-ochre transition-colors tracking-wide">
                  {dailyPoem.title}
                </h2>
              </Link>

              <div className="text-sm sm:text-base font-serif text-chinese-ochre flex items-center justify-center space-x-2">
                <span>〔{dailyPoem.dynasty?.name || '古'}〕</span>
                <span className="font-bold">{dailyPoem.author?.name || '佚名'}</span>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span>{dailyPoem.type?.name || '诗词'}</span>
              </div>

              <div className="font-serif text-ink-700 dark:text-ink-200 text-base sm:text-xl leading-loose sm:leading-[2.2] max-w-xl mx-auto py-2 tracking-wider">
                {(dailyPoem.content || []).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            {/* Action Bottom Bar */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleDailySpeech}
                  className={`px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center space-x-1 ${
                    isDailyPlaying
                      ? 'bg-chinese-ochre text-white'
                      : 'hover:bg-stone-200/50 dark:hover:bg-stone-800 text-ink-700 dark:text-ink-200'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isDailyPlaying ? '停止' : '朗读'}</span>
                </button>

                <button
                  onClick={() =>
                    isDailyFav ? removeFavorite(dailyPoem.id) : addFavorite(dailyPoem)
                  }
                  className={`px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center space-x-1 ${
                    isDailyFav
                      ? 'bg-chinese-cinnabar text-white'
                      : 'hover:bg-stone-200/50 dark:hover:bg-stone-800 text-ink-700 dark:text-ink-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isDailyFav ? 'fill-white' : ''}`} />
                  <span>{isDailyFav ? '已收藏' : '收藏'}</span>
                </button>
              </div>

              <Link
                to={`/poems/${dailyPoem.id}`}
                className="inline-flex items-center space-x-1 text-chinese-ochre hover:text-chinese-ochre/80 font-medium text-sm"
              >
                <span>深度阅读与 AI 赏析</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. Random Poetry Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Shuffle className="w-6 h-6 text-chinese-ochre" />
              <span>诗海漫游 · 随心偶遇</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-400">
              支持按朝代、名家、律绝随机抽取一首诗篇
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {[
              { id: 'all', label: '随机全库' },
              { id: 'tang', label: '随机唐诗' },
              { id: 'song', label: '随机宋词' },
              { id: 'libai', label: '李白作品' },
              { id: 'jueju', label: '七言绝句' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRandomFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  randomFilter === tab.id
                    ? 'bg-chinese-ochre text-white shadow-sm font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => refetchRandomPoem()}
              disabled={isFetchingRandom}
              className="p-1.5 rounded-xl bg-chinese-ochre/15 text-chinese-ochre hover:bg-chinese-ochre/25 transition-colors"
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

      {/* 4. Dynasty Timeline Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Compass className="w-6 h-6 text-chinese-ochre" />
              <span>朝代通览 · 历史沿革</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-400">
              收录先秦、两汉、魏晋、南北朝、隋、唐、五代、宋、元、清 11 大纪元
            </p>
          </div>

          <Link
            to="/dynasties"
            className="text-xs sm:text-sm text-chinese-ochre hover:underline inline-flex items-center space-x-1"
          >
            <span>全部朝代</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {dynasties.slice(0, 11).map((dynasty) => {
            const color = getDynastyColorClass(dynasty.name);
            return (
              <Link
                key={dynasty.id}
                to={`/poems?dynasty=${encodeURIComponent(dynasty.name)}`}
                className="group p-4 rounded-2xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-ochre/60 dark:hover:border-chinese-ochre/60 transition-all duration-300 hover:shadow-oriental-hover hover:-translate-y-1 text-center flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color.bg} ${color.text} ${color.border}`}>
                    {dynasty.name}
                  </span>
                  <div className="text-xs text-ink-400 font-sans pt-1">
                    {dynasty.name_en || ''}
                  </div>
                </div>
                <div className="pt-3 text-[11px] text-chinese-ochre font-medium flex items-center justify-center space-x-0.5 group-hover:translate-x-0.5 transition-transform">
                  <span>浏览作品</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Poetic Genres Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Layers className="w-6 h-6 text-chinese-celadon" />
              <span>体裁雅赏 · 格律词牌</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-400">
              涵盖绝句、律诗、宋词、元曲、乐府、楚辞等 17 种经典文体
            </p>
          </div>

          <Link
            to="/types"
            className="text-xs sm:text-sm text-chinese-ochre hover:underline inline-flex items-center space-x-1"
          >
            <span>全部体裁</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {types.slice(0, 12).map((type) => (
            <Link
              key={type.id}
              to={`/poems?type=${encodeURIComponent(type.name)}`}
              className="group p-4 rounded-2xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-celadon/60 dark:hover:border-chinese-celadon/60 transition-all duration-300 hover:shadow-oriental-hover hover:-translate-y-1 text-center flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="font-serif font-bold text-base text-ink-800 dark:text-ink-100 group-hover:text-chinese-celadon transition-colors">
                  {type.name}
                </div>
                <div className="text-[11px] text-ink-400 line-clamp-1 font-sans">
                  {type.description || '古典诗词经典体式'}
                </div>
              </div>
              <div className="pt-3 text-[11px] text-chinese-celadon font-medium flex items-center justify-center space-x-0.5 group-hover:translate-x-0.5 transition-transform">
                <span>体裁选粹</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Master Poets Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-100 flex items-center space-x-2">
              <Users className="w-6 h-6 text-chinese-cinnabar" />
              <span>千古风流 · 先贤名家</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-400">
              太白放歌、东坡旷达、易安清雅、少陵沉郁
            </p>
          </div>

          <Link
            to="/authors"
            className="text-xs sm:text-sm text-chinese-ochre hover:underline inline-flex items-center space-x-1"
          >
            <span>诗人字典</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {MASTER_POETS.map((poet) => (
            <Link
              key={poet.name}
              to={`/poems?author=${encodeURIComponent(poet.name)}`}
              className="group p-5 rounded-2xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-cinnabar/60 dark:hover:border-chinese-cinnabar/60 transition-all duration-300 hover:shadow-oriental-hover hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-chinese-cinnabar/10 text-chinese-cinnabar font-serif font-bold text-lg flex items-center justify-center">
                      {poet.name[0]}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-ink-800 dark:text-ink-100 group-hover:text-chinese-cinnabar transition-colors">
                        {poet.name}
                      </h3>
                      <span className="text-[11px] text-ink-400">
                        {poet.dynasty}代 · {poet.title}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed font-sans line-clamp-2">
                  {poet.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-chinese-cinnabar font-medium">
                <span>浏览作品</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Personal Bookmarks & Reading Footprints Preview (if any) */}
      {(favorites.length > 0 || history.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bookmarks Preview */}
            {favorites.length > 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bookmark className="w-4 h-4 text-chinese-cinnabar" />
                    <h3 className="font-serif font-bold text-base text-ink-800 dark:text-ink-100">
                      我的诗词珍藏 ({favorites.length})
                    </h3>
                  </div>
                  <Link
                    to="/favorites"
                    className="text-xs text-chinese-ochre hover:underline flex items-center space-x-0.5"
                  >
                    <span>查看全部</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2">
                  {favorites.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      to={`/poems/${item.id}`}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-chinese-ochre/10 transition-colors flex items-center justify-between text-sm"
                    >
                      <span className="font-serif font-medium text-ink-800 dark:text-ink-100">
                        {item.title}
                      </span>
                      <span className="text-xs text-ink-400">
                        {item.author?.name} · {item.dynasty?.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* History Preview */}
            {history.length > 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <History className="w-4 h-4 text-chinese-ochre" />
                    <h3 className="font-serif font-bold text-base text-ink-800 dark:text-ink-100">
                      最近浏览足迹 ({history.length})
                    </h3>
                  </div>
                  <Link
                    to="/history"
                    className="text-xs text-chinese-ochre hover:underline flex items-center space-x-0.5"
                  >
                    <span>查看全部</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2">
                  {history.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      to={`/poems/${item.id}`}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-chinese-ochre/10 transition-colors flex items-center justify-between text-sm"
                    >
                      <span className="font-serif font-medium text-ink-800 dark:text-ink-100">
                        {item.title}
                      </span>
                      <span className="text-xs text-ink-400">
                        {item.author?.name} · {item.dynasty?.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
