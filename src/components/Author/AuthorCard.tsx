import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, className = '' }) => {
  const firstChar = author.name.charAt(0);

  return (
    <div
      className={`group bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 hover:border-chinese-ochre/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center space-x-4 mb-4">
          {/* Avatar Stamp */}
          <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 text-chinese-ochre font-serif font-bold text-xl flex items-center justify-center border border-stone-200 dark:border-stone-700 flex-shrink-0">
            {firstChar}
          </div>

          <div className="flex-1 min-w-0">
            <Link
              to={`/authors/${author.id}?name=${encodeURIComponent(author.name)}&dynasty=${encodeURIComponent(author.dynasty?.name || '')}`}
              className="block group-hover:text-chinese-ochre transition-colors"
            >
              <h3 className="font-serif font-bold text-xl text-ink-900 dark:text-ink-50 truncate">
                {author.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-2 mt-0.5 text-sm text-ink-500 dark:text-ink-400 font-serif">
              <span>〔{author.dynasty?.name || '古'}〕</span>
              <span>文学名家</span>
            </div>
          </div>
        </div>

        {/* Bio / Description */}
        <p className="text-sm text-ink-600 dark:text-ink-300 line-clamp-2 leading-relaxed my-2 font-serif">
          {author.description || `${author.dynasty?.name || ''}代文学大家，作品气韵典雅，辞采斐然。`}
        </p>
      </div>

      {/* Card Action Link */}
      <div className="pt-4 mt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-sm">
        <Link
          to={`/authors/${author.id}?name=${encodeURIComponent(author.name)}&dynasty=${encodeURIComponent(author.dynasty?.name || '')}`}
          className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 hover:text-chinese-ochre transition-colors font-serif"
        >
          诗人传略
        </Link>

        <Link
          to={`/poems?author=${encodeURIComponent(author.name)}`}
          className="inline-flex items-center space-x-1 text-sm font-medium text-chinese-ochre hover:underline group-hover:translate-x-0.5 transition-transform"
        >
          <span>作品集</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
