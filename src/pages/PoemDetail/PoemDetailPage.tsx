import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BookOpen, Feather } from 'lucide-react';
import { poemApi } from '@/api/poems';
import { useHistoryStore } from '@/store/historyStore';
import { PoemReader } from '@/components/Poem/PoemReader';
import { PoemDetailSkeleton } from '@/components/Common/LoadingSkeleton';
import { ErrorState } from '@/components/Common/ErrorState';

export const PoemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addHistory = useHistoryStore((state) => state.addHistory);

  // 1. Fetch Current Poem
  const {
    data: poemRes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['poem', id],
    queryFn: () => (id ? poemApi.getById(id) : Promise.reject('No ID')),
    enabled: Boolean(id),
  });

  const poem = poemRes?.data;

  // Add to reading history once loaded
  useEffect(() => {
    if (poem) {
      addHistory(poem);
      // Update document title
      document.title = `${poem.title} - ${poem.author?.name || '古诗词'} - 诗境`;
    }
    return () => {
      document.title = '诗境 · 中国古诗词智能阅读与检索平台';
    };
  }, [poem, addHistory]);

  // Handle Random Next Poem
  const handleRandomNext = async () => {
    try {
      const res = await poemApi.getRandom();
      if (res.data?.id) {
        navigate(`/poems/${res.data.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to get random poem', err);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PoemDetailSkeleton />
      </div>
    );
  }

  if (isError || !poem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorState
          title="诗词详情加载失败"
          message="未能找到该编号的诗词典籍，可能已被归档或不存在"
          onRetry={() => refetch()}
        />
        <div className="text-center mt-6">
          <Link
            to="/poems"
            className="inline-flex items-center space-x-2 text-chinese-ochre hover:underline text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回古诗总库</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Breadcrumb & Back Nav */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-ink-400">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-1.5 hover:text-chinese-ochre transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回上一页</span>
        </button>

        <div className="flex items-center space-x-2">
          <Link to="/poems" className="hover:text-chinese-ochre">
            古诗库
          </Link>
          <span>/</span>
          <Link
            to={`/poems?dynasty=${encodeURIComponent(poem.dynasty?.name || '')}`}
            className="hover:text-chinese-ochre"
          >
            {poem.dynasty?.name || ''}代
          </Link>
          <span>/</span>
          <span className="text-ink-700 dark:text-ink-200 font-medium truncate max-w-[120px] sm:max-w-[200px]">
            {poem.title}
          </span>
        </div>
      </div>

      {/* Main Poem Reading Canvas */}
      <PoemReader poem={poem} onRandomNext={handleRandomNext} />

      {/* Related Actions & Author Exploration Card */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Author Link Box */}
        <div className="p-5 rounded-2xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-ink-400">
              <Feather className="w-3.5 h-3.5 text-chinese-ochre" />
              <span>诗人专页</span>
            </div>
            <h4 className="font-serif font-bold text-base text-ink-800 dark:text-ink-100">
              {poem.author?.name || '古人'}
            </h4>
            <p className="text-xs text-ink-400">
              浏览 {poem.author?.name} 的全部代表作品与生平
            </p>
          </div>

          <Link
            to={`/authors?q=${encodeURIComponent(poem.author?.name || '')}`}
            className="px-4 py-2 rounded-xl bg-chinese-ochre/10 hover:bg-chinese-ochre/20 text-chinese-ochre text-xs font-semibold transition-colors"
          >
            诗人主页
          </Link>
        </div>

        {/* Same Genre / Dynasty Box */}
        <div className="p-5 rounded-2xl bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-ink-400">
              <BookOpen className="w-3.5 h-3.5 text-chinese-celadon" />
              <span>同体裁作品</span>
            </div>
            <h4 className="font-serif font-bold text-base text-ink-800 dark:text-ink-100">
              {poem.type?.name || '经典'}选粹
            </h4>
            <p className="text-xs text-ink-400">
              探索更多 {poem.dynasty?.name}代 · {poem.type?.name} 名篇
            </p>
          </div>

          <Link
            to={`/poems?dynasty=${encodeURIComponent(poem.dynasty?.name || '')}&type=${encodeURIComponent(poem.type?.name || '')}`}
            className="px-4 py-2 rounded-xl bg-chinese-celadon/10 hover:bg-chinese-celadon/20 text-chinese-celadon text-xs font-semibold transition-colors"
          >
            浏览同类
          </Link>
        </div>
      </div>
    </div>
  );
};
