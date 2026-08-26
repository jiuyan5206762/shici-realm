import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight, Share2 } from 'lucide-react';
import { Poem } from '@/types';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useSharePoem } from '@/hooks/useSharePoem';

interface PoemCardProps {
  poem: Poem;
  onShare?: (poem: Poem) => void;
  className?: string;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem, onShare, className = '' }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const { sharePoem } = useSharePoem();
  const favorite = isFavorite(poem.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(poem.id);
    } else {
      addFavorite(poem);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare(poem);
    } else {
      sharePoem(poem);
    }
  };

  // Preview content lines (up to 4 lines for comfortable reading)
  const lines = poem.content || [];
  const previewLines = lines.slice(0, 4);

  return (
    <div
      className={`group relative bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 hover:border-chinese-ochre/70 dark:hover:border-chinese-ochre/60 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top Header: Title & Favorite Button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-1.5 flex-1 min-w-0">
            <Link to={`/poems/${poem.id}`} className="block group-hover:text-chinese-ochre transition-colors">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink-900 dark:text-ink-50 tracking-wide truncate">
                {poem.title}
              </h3>
            </Link>

            {/* Author & Dynasty Meta */}
            <div className="flex items-center space-x-2 text-sm text-ink-500 dark:text-ink-400 font-serif">
              <span>〔{poem.dynasty?.name || '古'}〕</span>
              <Link
                to={`/authors?q=${encodeURIComponent(poem.author?.name || '')}`}
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-ink-700 dark:text-ink-200 hover:text-chinese-ochre transition-colors"
              >
                {poem.author?.name || '佚名'}
              </Link>
              {poem.type?.name && (
                <>
                  <span className="text-stone-300 dark:text-stone-700">·</span>
                  <span className="text-xs text-ink-400 dark:text-ink-400">{poem.type.name}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-full transition-all active:scale-90 ${
              favorite
                ? 'text-chinese-cinnabar bg-chinese-cinnabar/10 dark:bg-chinese-cinnabar/20'
                : 'text-stone-400 hover:text-chinese-cinnabar hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title={favorite ? '取消收藏' : '加入收藏'}
            aria-label={favorite ? '取消收藏' : '加入收藏'}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-chinese-cinnabar' : ''}`} />
          </button>
        </div>

        {/* Poem Verses Preview */}
        <Link to={`/poems/${poem.id}`} className="block my-5">
          <div className="font-serif text-ink-800 dark:text-ink-100 text-base sm:text-lg leading-relaxed sm:leading-loose space-y-2 py-1 select-text">
            {previewLines.map((line, idx) => (
              <p key={idx} className="line-clamp-1 tracking-wide">
                {line}
              </p>
            ))}
            {lines.length > 4 && (
              <p className="text-sm text-ink-400 dark:text-ink-400 font-sans pt-1">
                …… (余 {lines.length - 4} 句)
              </p>
            )}
          </div>
        </Link>
      </div>

      {/* Clean Bottom Action Bar */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-sm">
        <button
          onClick={handleShareClick}
          className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 hover:text-chinese-ochre flex items-center space-x-1.5 transition-colors"
          title="生成雅致分享卡片"
        >
          <Share2 className="w-4 h-4" />
          <span>分享</span>
        </button>

        <Link
          to={`/poems/${poem.id}`}
          className="inline-flex items-center space-x-1 text-sm font-medium text-chinese-ochre hover:underline group-hover:translate-x-0.5 transition-transform"
        >
          <span>品读全文</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
