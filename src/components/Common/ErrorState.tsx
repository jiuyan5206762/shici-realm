import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = '数据加载异常',
  message = '网络连接不稳定或接口繁忙，请稍后重新尝试',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 my-8 rounded-3xl bg-rose-500/5 border border-rose-200 dark:border-rose-900/30 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-serif font-bold text-ink-700 dark:text-ink-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-ink-400 dark:text-ink-400 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink-700 dark:bg-ink-100 hover:bg-ink-800 dark:hover:bg-white text-white dark:text-ink-800 rounded-xl text-sm font-medium transition-transform active:scale-95 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>重新加载</span>
        </button>
      )}
    </div>
  );
};
