import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Author } from '@/types';
import { SealBadge } from '@/components/Common/SealBadge';

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, className = '' }) => {
  const firstChar = author.name.charAt(0);

  return (
    <div
      className={`group xuan-card rounded-3xl p-6 transition-transform duration-200 hover:-translate-y-0.5 gpu-layer flex flex-col justify-between border border-paper-400/40 shadow-oriental ${className}`}
    >
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          {/* Avatar Stamp */}
          <div className="w-12 h-12 rounded-2xl bg-chinese-celadon/15 text-chinese-celadon font-serif font-bold text-xl flex items-center justify-center border border-chinese-celadon/20 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
            {firstChar}
          </div>

          <div className="flex-1 min-w-0">
            <Link
              to={`/authors/${author.id}?name=${encodeURIComponent(author.name)}&dynasty=${encodeURIComponent(author.dynasty?.name || '')}`}
              className="block group-hover:text-chinese-cinnabar transition-colors"
            >
              <h3 className="font-serif font-bold text-lg sm:text-xl text-ink-900 dark:text-ink-50 truncate">
                {author.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-400 font-serif">
              <SealBadge text={author.dynasty?.name || '古'} size="sm" variant="bamboo" />
              <span>文学名家</span>
            </div>
          </div>
        </div>

        {/* Bio / Description */}
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 line-clamp-2 leading-relaxed my-2 font-serif">
          {author.description || `${author.dynasty?.name || ''}代文学大家，作品气韵典雅，辞采斐然。`}
        </p>
      </div>

      {/* Card Action Link */}
      <div className="pt-4 mt-3 border-t border-paper-300/60 dark:border-ink-800 flex items-center justify-between text-xs font-serif">
        <Link
          to={`/authors/${author.id}?name=${encodeURIComponent(author.name)}&dynasty=${encodeURIComponent(author.dynasty?.name || '')}`}
          className="text-ink-500 dark:text-ink-400 hover:text-chinese-cinnabar transition-colors"
        >
          名家传略
        </Link>

        <Link
          to={`/poems?author=${encodeURIComponent(author.name)}`}
          className="inline-flex items-center gap-1 font-bold text-chinese-cinnabar hover:underline group-hover:translate-x-0.5 transition-transform"
        >
          <BookOpen className="w-3 h-3" />
          <span>作品全帙</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

interface AuthorCardProps {
  author: Author;
  className?: string;
}
