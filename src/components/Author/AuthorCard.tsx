import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, ArrowRight } from 'lucide-react';
import { Author } from '@/types';
import { getDynastyColorClass } from '@/utils/formatters';

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, className = '' }) => {
  const dynastyColor = getDynastyColorClass(author.dynasty?.name || '');

  // Extract initial / first char of author name for avatar
  const firstChar = author.name.charAt(0);

  return (
    <div
      className={`group bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder hover:border-chinese-ochre/60 dark:hover:border-chinese-ochre/60 rounded-2xl p-5 transition-all duration-300 hover:shadow-oriental-hover hover:-translate-y-1 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center space-x-4 mb-3">
          {/* Avatar Stamp */}
          <div className="w-12 h-12 rounded-2xl bg-paper-200 dark:bg-stone-800 text-chinese-ochre font-serif font-bold text-xl flex items-center justify-center border border-stone-300/60 dark:border-stone-700 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
            {firstChar}
          </div>

          <div className="flex-1 min-w-0">
            <Link
              to={`/authors/${author.id}?name=${encodeURIComponent(author.name)}&dynasty=${encodeURIComponent(author.dynasty?.name || '')}`}
              className="block group-hover:text-chinese-ochre transition-colors"
            >
              <h3 className="font-serif font-bold text-lg text-ink-800 dark:text-ink-100 truncate">
                {author.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${dynastyColor.bg} ${dynastyColor.text} ${dynastyColor.border}`}>
                {author.dynasty?.name || '古'}代
              </span>
              {author.poemCount && (
                <span className="text-xs text-ink-400">
                  收录 {author.poemCount} 首
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio / Description */}
        <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 line-clamp-2 leading-relaxed my-2 font-sans">
          {author.description || `${author.dynasty?.name || ''}代文学名家，作品气韵典雅，辞采斐然。`}
        </p>
      </div>

      {/* Card Action Link */}
      <div className="pt-3 mt-2 border-t border-stone-100 dark:border-chinese-nightBorder/60 flex items-center justify-between text-xs">
        <Link
          to={`/poems?author=${encodeURIComponent(author.name)}`}
          className="text-ink-400 hover:text-chinese-ochre flex items-center space-x-1"
        >
          <Feather className="w-3.5 h-3.5" />
          <span>浏览相关诗篇</span>
        </Link>

        <Link
          to={`/authors/${author.id}?name=${encodeURIComponent(author.name)}&dynasty=${encodeURIComponent(author.dynasty?.name || '')}`}
          className="inline-flex items-center space-x-1 text-chinese-ochre font-medium group-hover:translate-x-0.5 transition-transform"
        >
          <span>诗人主页</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
