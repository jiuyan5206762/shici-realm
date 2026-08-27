import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight, Share2, Copy, Check } from 'lucide-react';
import { Poem } from '@/types';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useSharePoem } from '@/hooks/useSharePoem';
import { SealBadge } from '@/components/Common/SealBadge';

interface PoemCardProps {
  poem: Poem;
  onShare?: (poem: Poem) => void;
  className?: string;
}

export const PoemCard: React.FC<PoemCardProps> = ({ poem, onShare, className = '' }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const { sharePoem } = useSharePoem();
  const [copied, setCopied] = useState(false);
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

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const contentText = `${poem.title}\n〔${poem.dynasty?.name || '古'}〕${poem.author?.name || '佚名'}\n\n${(poem.content || []).join('\n')}`;
    navigator.clipboard.writeText(contentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const lines = poem.content || [];
  const previewLines = lines.slice(0, 4);

  return (
    <div
      className={`group relative xuan-card rounded-3xl p-6 sm:p-7 transition-transform duration-200 hover:-translate-y-0.5 gpu-layer flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Background Seal Watermark */}
      <div className="absolute right-3 top-3 opacity-5 pointer-events-none select-none font-serif text-6xl text-chinese-cinnabar">
        印
      </div>

      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <Link to={`/poems/${poem.id}`} className="block group-hover:text-chinese-cinnabar transition-colors">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-ink-900 dark:text-ink-50 tracking-wide truncate">
                {poem.title}
              </h3>
            </Link>

            {/* Author & Dynasty */}
            <div className="flex items-center gap-2 text-xs font-serif text-ink-500 dark:text-ink-400">
              <SealBadge text={poem.dynasty?.name || '唐'} size="sm" variant="cinnabar" />
              <Link
                to={`/authors?q=${encodeURIComponent(poem.author?.name || '')}`}
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-ink-700 dark:text-ink-200 hover:text-chinese-cinnabar transition-colors"
              >
                {poem.author?.name || '佚名'}
              </Link>
              {poem.type?.name && (
                <>
                  <span className="text-paper-400 dark:text-ink-700">·</span>
                  <span className="text-ink-400 dark:text-ink-400">{poem.type.name}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-full transition-all interactive-tap ${
              favorite
                ? 'text-chinese-cinnabar bg-chinese-cinnabar/10 dark:bg-chinese-cinnabar/20 shadow-sm'
                : 'text-ink-400 hover:text-chinese-cinnabar hover:bg-paper-200 dark:hover:bg-ink-800'
            }`}
            title={favorite ? '取消典藏' : '加入典藏'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-chinese-cinnabar' : ''}`} />
          </button>
        </div>

        {/* Poem Preview Verses */}
        <Link to={`/poems/${poem.id}`} className="block my-4">
          <div className="font-serif text-ink-800 dark:text-ink-100 text-base sm:text-lg leading-relaxed sm:leading-loose space-y-2 py-1 select-text">
            {previewLines.map((line, idx) => (
              <p key={idx} className="line-clamp-1 tracking-wider">
                {line}
              </p>
            ))}
            {lines.length > 4 && (
              <p className="text-xs text-ink-400 font-serif pt-1">
                …… (余 {lines.length - 4} 句)
              </p>
            )}
          </div>
        </Link>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-paper-300/60 dark:border-ink-800/80 flex items-center justify-between text-xs font-serif text-ink-500 dark:text-ink-400">
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="hover:text-chinese-cinnabar flex items-center gap-1 transition-colors"
            title="复制诗词内容"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-chinese-celadon" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制' : '复制'}</span>
          </button>

          <button
            onClick={handleShareClick}
            className="hover:text-chinese-cinnabar flex items-center gap-1 transition-colors"
            title="生成雅致长图"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>分享</span>
          </button>
        </div>

        <Link
          to={`/poems/${poem.id}`}
          className="inline-flex items-center gap-1 font-bold text-chinese-cinnabar hover:underline group-hover:translate-x-0.5 transition-transform"
        >
          <span>品读全文</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
