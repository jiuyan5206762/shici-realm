import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { History, Trash2, X, Clock } from 'lucide-react';
import { useHistoryStore } from '@/store/historyStore';
import { groupHistoryByDate, formatRelativeTime } from '@/utils/formatters';
import { EmptyState } from '@/components/Common/EmptyState';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, removeHistory, clearHistory } = useHistoryStore();

  const handleClearAll = () => {
    if (window.confirm('确定要清空全部浏览足迹吗？')) {
      clearHistory();
    }
  };

  const groups = groupHistoryByDate(history);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-3">
            <History className="w-8 h-8 text-chinese-ochre" />
            <span>浏览足迹</span>
          </h1>
          <p className="text-base text-ink-600 dark:text-ink-300 mt-2 font-serif">
            记录您研读过的诗篇，最多保留 100 条
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>清空足迹</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyState
          icon={<History className="w-10 h-10 text-stone-400" />}
          title="暂无阅读历史"
          description="当您浏览与品读古诗词时，系统将自动在此为您记录足迹"
          actionText="前往浏览诗词"
          onAction={() => navigate('/poems')}
        />
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.label} className="space-y-3">
              {/* Group Date Header */}
              <div className="flex items-center space-x-2 text-sm font-serif font-bold text-chinese-ochre">
                <Clock className="w-4 h-4" />
                <span>{group.label}</span>
                <span className="text-ink-500 dark:text-ink-400 font-normal">
                  ({group.items.length} 首)
                </span>
              </div>

              {/* Items List */}
              <div className="bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 rounded-2xl divide-y divide-stone-100 dark:divide-stone-800 shadow-sm overflow-hidden">
                {group.items.map((item) => (
                  <div
                    key={`${item.id}-${item.viewedAt}`}
                    className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50/80 dark:hover:bg-stone-800/50 transition-colors group"
                  >
                    <Link
                      to={`/poems/${item.id}`}
                      className="flex-1 min-w-0 pr-4 block"
                    >
                      <div className="flex items-center space-x-3">
                        <h4 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100 group-hover:text-chinese-ochre transition-colors truncate">
                          {item.title}
                        </h4>
                        <span className="text-sm text-ink-500 dark:text-ink-400 font-serif flex-shrink-0">
                          〔{item.dynasty?.name || '古'}〕{item.author?.name || '佚名'}
                        </span>
                      </div>

                      {item.snippet && (
                        <p className="text-sm text-ink-600 dark:text-ink-300 font-serif truncate mt-1">
                          « {item.snippet} »
                        </p>
                      )}
                    </Link>

                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <span className="text-xs text-ink-400 font-serif hidden sm:inline">
                        {formatRelativeTime(item.viewedAt)}
                      </span>

                      <button
                        onClick={() => removeHistory(item.id)}
                        className="p-2 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                        title="删除此条记录"
                        aria-label="删除"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
