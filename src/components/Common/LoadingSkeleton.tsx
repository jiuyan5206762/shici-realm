import React from 'react';

export const PoemCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder rounded-2xl animate-pulse space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
          <div className="h-4 bg-stone-100 dark:bg-stone-800/60 rounded w-1/4" />
        </div>
        <div className="w-8 h-8 bg-stone-100 dark:bg-stone-800 rounded-full" />
      </div>

      <div className="space-y-2 py-2">
        <div className="h-4 bg-stone-200/70 dark:bg-stone-800/70 rounded w-4/5" />
        <div className="h-4 bg-stone-200/70 dark:bg-stone-800/70 rounded w-3/4" />
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-stone-100 dark:border-stone-800/40">
        <div className="h-5 bg-stone-100 dark:bg-stone-800 rounded w-16" />
        <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded w-20" />
      </div>
    </div>
  );
};

export const PoemDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-chinese-nightCard border border-stone-200 dark:border-chinese-nightBorder rounded-3xl animate-pulse space-y-8 my-6">
      <div className="text-center space-y-4">
        <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-lg w-1/2 mx-auto" />
        <div className="h-5 bg-stone-100 dark:bg-stone-800/60 rounded w-1/3 mx-auto" />
      </div>

      <div className="space-y-4 py-8 max-w-lg mx-auto">
        <div className="h-6 bg-stone-200/80 dark:bg-stone-800/80 rounded w-full" />
        <div className="h-6 bg-stone-200/80 dark:bg-stone-800/80 rounded w-full" />
        <div className="h-6 bg-stone-200/80 dark:bg-stone-800/80 rounded w-4/5 mx-auto" />
        <div className="h-6 bg-stone-200/80 dark:bg-stone-800/80 rounded w-4/5 mx-auto" />
      </div>

      <div className="flex justify-center space-x-4 pt-6 border-t border-stone-100 dark:border-stone-800">
        <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl w-24" />
        <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl w-24" />
        <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl w-24" />
      </div>
    </div>
  );
};

export const AuthorCardSkeleton: React.FC = () => {
  return (
    <div className="p-5 bg-white dark:bg-chinese-nightCard border border-stone-200/80 dark:border-chinese-nightBorder rounded-2xl animate-pulse flex items-center space-x-4">
      <div className="w-14 h-14 bg-stone-200 dark:bg-stone-800 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
        <div className="h-4 bg-stone-100 dark:bg-stone-800/60 rounded w-1/2" />
      </div>
    </div>
  );
};
