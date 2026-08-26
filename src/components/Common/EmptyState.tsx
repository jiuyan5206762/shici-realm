import React from 'react';
import { Scroll, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 my-8 rounded-3xl bg-stone-500/5 border border-dashed border-stone-300 dark:border-chinese-nightBorder ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-chinese-ochre/10 text-chinese-ochre flex items-center justify-center mb-4">
        {icon || <Scroll className="w-8 h-8 stroke-[1.5]" />}
      </div>
      <h3 className="text-lg sm:text-xl font-serif font-bold text-ink-700 dark:text-ink-100 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-ink-400 dark:text-ink-400 max-w-md mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-chinese-ochre hover:bg-chinese-ochre/90 text-white rounded-xl text-sm font-medium shadow-sm transition-transform active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
