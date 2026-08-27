import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Shuffle,
  Compass,
  Layers,
  Heart,
  Sword,
  ChevronRight,
} from 'lucide-react';
import { dynastyApi } from '@/api/dynasties';
import { typeApi } from '@/api/types';
import { poemApi } from '@/api/poems';
import { SearchBar } from '@/components/Search/SearchBar';
import { PoemCard } from '@/components/Poem/PoemCard';
import { VerticalPoemView } from '@/components/Poem/VerticalPoemView';
import { SealBadge } from '@/components/Common/SealBadge';
import { useFavoriteStore } from '@/store/favoriteStore';
import { guqinAudio } from '@/services/audio/guqinAudio';

const MASTER_POETS = [
  { name: '李白', dynasty: '唐', title: '诗仙', quote: '天生我材必有用，千金散尽还复来。', id: 2045 },
  { name: '杜甫', dynasty: '唐', title: '诗圣', quote: '会当凌绝顶，一览众山小。', id: 3911 },
  { name: '苏轼', dynasty: '宋', title: '东坡居士', quote: '但愿人长久，千里共婵娟。', id: 11678 },
  { name: '李清照', dynasty: '宋', title: '易安居士', quote: '生当作人杰，死亦为鬼雄。', id: 3074 },
  { name: '辛弃疾', dynasty: '宋', title: '稼轩居士', quote: '明月别枝惊鹊，清风半夜鸣蝉。', id: 8618 },
  { name: '王维', dynasty: '唐', title: '诗佛', quote: '行到水穷处，坐看云起时。', id: 7756 },
  { name: '白居易', dynasty: '唐', title: '香山居士', quote: '乱花渐欲迷人眼，浅草才能没马蹄。', id: 9057 },
  { name: '陶渊明', dynasty: '魏晋', title: '五柳先生', quote: '采菊东篱下，悠然见南山。', id: 8228 },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const [dailyViewMode, setDailyViewMode] = useState<'horizontal' | 'vertical'>('horizontal');

  // 1. Fetch Dynasties
  const { data: dynastiesRes } = useQuery({
    queryKey: ['dynasties'],
    queryFn: () => dynastyApi.getDynasties(),
    staleTime: 60 * 60 * 1000,
  });

  // 2. Fetch Types
  const { data: typesRes } = useQuery({
    queryKey: ['types'],
    queryFn: () => typeApi.getTypes(),
    staleTime: 60 * 60 * 1000,
  });

  // 3. Daily Featured Masterpiece
  const { data: dailyPoemRes } = useQuery({
    queryKey: ['dailyPoem'],
    queryFn: async () => {
      const featuredId = 23908; // 水调歌头 · 明月几时有
      const res = await poemApi.getById(featuredId);
      return res;
    },
    staleTime: 24 * 60 * 60 * 1000,
  });

  // 5. Random Poem Explorer
  const [randomFilter, setRandomFilter] = useState<'all' | 'tang' | 'song'>('all');
  const {
    data: randomPoemRes,
    refetch: refetchRandom,
    isFetching: isFetchingRandom,
  } = useQuery({
    queryKey: ['randomPoem', randomFilter],
    queryFn: async () => {
      const dynastyParam = randomFilter === 'tang' ? '唐' : randomFilter === 'song' ? '宋' : undefined;
      return poemApi.getRandom({ dynasty: dynastyParam });
    },
  });

  const dailyPoem = dailyPoemRes?.data;
  const randomPoem = randomPoemRes?.data;
  const dynasties = dynastiesRes?.data || [];
  const types = typesRes?.data || [];

  const handleRandomRefresh = () => {
    guqinAudio.playChime();
    refetchRandom();
  };

  const handleDailyFavorite = () => {
    if (!dailyPoem) return;
    guqinAudio.playGuqinPluck();
    if (isFavorite(dailyPoem.id)) {
      removeFavorite(dailyPoem.id);
    } else {
      addFavorite(dailyPoem);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-fade-in pb-20">
      {/* 1. Hero Minimalist Section */}
      <section className="text-center space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-100 dark:bg-ink-900 border border-paper-300 dark:border-ink-800 shadow-xs">
          <SealBadge text="宋韵" size="sm" variant="cinnabar" />
          <span className="text-xs font-serif text-ink-600 dark:text-ink-300">
            收录华夏 37万+ 传世诗词名篇 · 经典宣纸风雅
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-widest text-ink-900 dark:text-ink-50 leading-tight">
            粗缯大布裹生涯
            <br />
            <span className="text-chinese-cinnabar">腹有诗书气自华</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-ink-500 dark:text-ink-400 max-w-lg mx-auto">
            品读唐诗宋词、先秦雅颂，寻访历代名家风骨，开启飞花令对诗博弈。
          </p>
        </div>

        {/* Hero Search Bar */}
        <div className="pt-2 max-w-2xl mx-auto">
          <SearchBar
            placeholder="输入诗句、篇名或诗人（如：将进酒、李白、春风又绿）"
            onSearch={(q) => {
              guqinAudio.playChime();
              navigate(`/search?q=${encodeURIComponent(q)}`);
            }}
          />
        </div>
      </section>

      {/* 2. Feihua Duel Banner Feature */}
      <section className="xuan-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-chinese-cinnabar/30 shadow-oriental">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-chinese-cinnabar/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <SealBadge text="新玩法" size="sm" variant="cinnabar" />
              <span className="text-xs font-serif font-bold text-chinese-cinnabar">飞花令 AI 对诗竞技场</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-900 dark:text-ink-50">
              春城无处不飞花 · 与李白苏轼同席对令
            </h2>
            <p className="text-xs sm:text-sm font-serif text-ink-500 dark:text-ink-400 max-w-xl">
              选择令字，30 秒轮流应令赋诗。智能诗律核验、连对连击计分、殿试状元封号等你摘取！
            </p>
          </div>

          <Link
            to="/feihua"
            onClick={() => guqinAudio.playChime()}
            className="flex-shrink-0 px-8 py-3.5 rounded-2xl bg-chinese-cinnabar hover:bg-chinese-rouge text-white font-serif font-bold text-sm flex items-center gap-2 shadow-lg shadow-chinese-cinnabar/25 transition-all interactive-tap"
          >
            <Sword className="w-4 h-4 text-chinese-gold" />
            <span>立即赴令切磋</span>
          </Link>
        </div>
      </section>

      {/* 3. Daily Featured Masterpiece (Handscroll View) */}
      {dailyPoem && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-5 bg-chinese-cinnabar rounded-full" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50 tracking-wider">
                今日名篇 · 经典雅鉴
              </h2>
              <SealBadge text="必读" size="sm" variant="cinnabar" />
            </div>

            <div className="flex items-center gap-2">
              {/* Layout switcher */}
              <button
                onClick={() => {
                  guqinAudio.playChime();
                  setDailyViewMode(dailyViewMode === 'horizontal' ? 'vertical' : 'horizontal');
                }}
                className="text-xs font-serif text-chinese-cinnabar px-3 py-1.5 rounded-xl border border-chinese-cinnabar/30 hover:bg-chinese-cinnabar/10 transition-colors"
              >
                {dailyViewMode === 'horizontal' ? '切换竖排古卷' : '切换现代横排'}
              </button>

              <button
                onClick={handleDailyFavorite}
                className={`p-2 rounded-xl border transition-all ${
                  isFavorite(dailyPoem.id)
                    ? 'bg-chinese-cinnabar text-white border-chinese-cinnabar'
                    : 'border-paper-300 dark:border-ink-700 hover:bg-paper-200 text-ink-600'
                }`}
                title="典藏此篇"
              >
                <Heart className={`w-4 h-4 ${isFavorite(dailyPoem.id) ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {dailyViewMode === 'vertical' ? (
            <VerticalPoemView poem={dailyPoem} />
          ) : (
            <PoemCard poem={dailyPoem} />
          )}
        </section>
      )}

      {/* 4. Master Poets Gallery */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-5 bg-chinese-celadon rounded-full" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50 tracking-wider">
              千古先贤 · 宗师风骨
            </h2>
            <SealBadge text="先贤" size="sm" variant="bamboo" />
          </div>

          <Link
            to="/authors"
            onClick={() => guqinAudio.playChime()}
            className="text-xs font-serif text-ink-500 hover:text-chinese-cinnabar flex items-center gap-0.5 transition-colors"
          >
            <span>览尽历代百家</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MASTER_POETS.map((poet) => (
            <Link
              key={poet.name}
              to={`/authors?q=${encodeURIComponent(poet.name)}`}
              onClick={() => guqinAudio.playChime()}
              className="xuan-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:-translate-y-1 transition-all duration-300 border border-paper-400/40 group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif font-bold text-base sm:text-lg text-ink-900 dark:text-ink-50 group-hover:text-chinese-cinnabar transition-colors">
                    {poet.name}
                  </span>
                  <SealBadge text={poet.dynasty} size="sm" variant="bamboo" />
                </div>
                <div className="text-[11px] font-serif text-ink-400">
                  {poet.title}
                </div>
              </div>

              <p className="text-xs font-serif text-ink-600 dark:text-ink-300 line-clamp-2 italic pt-1 border-t border-paper-300/40 dark:border-ink-800">
                “{poet.quote}”
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Dynasties & Formats Bento Scroll */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dynasties */}
        <div className="xuan-card rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50 flex items-center gap-2">
              <Compass className="w-4 h-4 text-chinese-cinnabar" />
              <span>历代纪年长卷</span>
            </h3>
            <Link to="/dynasties" className="text-xs font-serif text-ink-400 hover:text-chinese-cinnabar">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {dynasties.slice(0, 11).map((d) => (
              <Link
                key={d.id}
                to={`/dynasties`}
                onClick={() => guqinAudio.playChime()}
                className="py-2.5 px-3 rounded-xl bg-paper-100 dark:bg-ink-800/80 hover:bg-chinese-cinnabar/10 hover:text-chinese-cinnabar border border-paper-300/60 dark:border-ink-700/60 font-serif text-xs font-bold text-center transition-all"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Types */}
        <div className="xuan-card rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50 flex items-center gap-2">
              <Layers className="w-4 h-4 text-chinese-celadon" />
              <span>诗词曲赋体裁</span>
            </h3>
            <Link to="/types" className="text-xs font-serif text-ink-400 hover:text-chinese-cinnabar">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {types.slice(0, 12).map((t) => (
              <Link
                key={t.id}
                to={`/types`}
                onClick={() => guqinAudio.playChime()}
                className="py-2.5 px-3 rounded-xl bg-paper-100 dark:bg-ink-800/80 hover:bg-chinese-celadon/10 hover:text-chinese-celadon border border-paper-300/60 dark:border-ink-700/60 font-serif text-xs font-bold text-center transition-all"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Random Discovery Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-5 bg-amber-600 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink-900 dark:text-ink-50 tracking-wider">
              偶得佳句 · 随心漫游
            </h2>
            <SealBadge text="漫步" size="sm" variant="gold" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-paper-200 dark:bg-ink-800 p-1 rounded-xl text-xs font-serif">
              <button
                onClick={() => setRandomFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  randomFilter === 'all' ? 'bg-paper-50 dark:bg-ink-900 text-chinese-cinnabar font-bold shadow-xs' : 'text-ink-600'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setRandomFilter('tang')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  randomFilter === 'tang' ? 'bg-paper-50 dark:bg-ink-900 text-chinese-cinnabar font-bold shadow-xs' : 'text-ink-600'
                }`}
              >
                唐诗
              </button>
              <button
                onClick={() => setRandomFilter('song')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  randomFilter === 'song' ? 'bg-paper-50 dark:bg-ink-900 text-chinese-cinnabar font-bold shadow-xs' : 'text-ink-600'
                }`}
              >
                宋词
              </button>
            </div>

            <button
              onClick={handleRandomRefresh}
              disabled={isFetchingRandom}
              className="px-3.5 py-1.5 rounded-xl bg-paper-200 dark:bg-ink-800 hover:bg-chinese-cinnabar hover:text-white font-serif text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isFetchingRandom ? 'animate-spin' : ''}`} />
              <span>随心换一篇</span>
            </button>
          </div>
        </div>

        {randomPoem && <PoemCard poem={randomPoem} />}
      </section>
    </div>
  );
};
