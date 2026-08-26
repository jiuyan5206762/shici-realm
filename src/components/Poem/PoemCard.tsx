import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Share2, Volume2 } from 'lucide-react';
import { Poem } from '@/types';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useSharePoem } from '@/hooks/useSharePoem';
import { usePoemSpeech } from '@/hooks/usePoemSpeech';
import { getDynastyColorClass } from '@/utils/formatters';

interface PoemCardProps {
  poem: Poem;
  onShare?: (poem: Poem) => void;
  className?: string;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem, onShare, className = '' }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const { isPlaying, toggle: toggleSpeech } = usePoemSpeech(poem);
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

  const handleSpeechClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSpeech();
  };

  const dynastyColor = getDynastyColorClass(poem.dynasty?.name || '');

  // Preview content lines (up to 2-4 lines)
  const lines = poem.content || [];
  const previewLines = lines.slice(0, 4);

  return (
    <div
      className={`group relative bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-ochre/60 dark:hover:border-chinese-ochre/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-oriental-hover hover:-translate-y-1 flex flex-col justify-between ${className}`}
    >
      {/* Top Meta info & Favorite button */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="space-y-1 flex-1">
            <Link to={`/poems/${poem.id}`} className="block group-hover:text-chinese-ochre transition-colors">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-ink-800 dark:text-ink-100 tracking-wide line-clamp-1">
                {poem.title}
              </h3>
            </Link>
            <div className="flex items-center space-x-2 text-xs">
              <Link
                to={`/authors?q=${encodeURIComponent(poem.author?.name || '')}`}
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-ink-600 dark:text-ink-300 hover:text-chinese-ochre transition-colors"
              >
                {poem.author?.name || '佚名'}
              </Link>
              <span className="text-stone-300 dark:text-stone-700">·</span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${dynastyColor.bg} ${dynastyColor.text} ${dynastyColor.border}`}>
                {poem.dynasty?.name || '未知朝代'}
              </span>
              {poem.type?.name && (
                <span className="px-2 py-0.5 rounded-md text-[11px] bg-stone-100 dark:bg-stone-800 text-ink-500 dark:text-ink-400">
                  {poem.type.name}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-all active:scale-90 ${
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

        {/* Content Snippet */}
        <Link to={`/poems/${poem.id}`} className="block my-4">
          <div className="font-serif text-ink-700 dark:text-ink-200 text-sm sm:text-base leading-relaxed sm:leading-loose space-y-1 py-1">
            {previewLines.map((line, idx) => (
              <p key={idx} className="line-clamp-1">
                {line}
              </p>
            ))}
            {lines.length > 4 && (
              <p className="text-xs text-ink-400 dark:text-ink-400 italic pt-1">
                …… (共 {lines.length} 句)
              </p>
            )}
          </div>
        </Link>
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 mt-2 border-t border-stone-100 dark:border-chinese-nightBorder/60 flex items-center justify-between text-xs text-ink-400">
        <div className="flex items-center space-x-1">
          <button
            onClick={handleSpeechClick}
            className={`p-1.5 rounded-lg transition-colors flex items-center space-x-1 ${
              isPlaying
                ? 'text-chinese-ochre bg-chinese-ochre/10'
                : 'hover:text-ink-700 dark:hover:text-ink-200 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title={isPlaying ? '停止诵读' : '朗读诗词'}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">{isPlaying ? '播放中' : '朗读'}</span>
          </button>

          <button
            onClick={handleShareClick}
            className="p-1.5 rounded-lg hover:text-ink-700 dark:hover:text-ink-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center space-x-1"
            title="分享诗词"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">分享</span>
          </button>
        </div>

        <Link
          to={`/poems/${poem.id}`}
          className="inline-flex items-center space-x-1 text-chinese-ochre hover:text-chinese-ochre/80 font-medium group-hover:translate-x-0.5 transition-transform"
        >
          <span>查看全文</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
