import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Search, Bookmark, History } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';

export const MobileTabBar: React.FC = () => {
  const favorites = useFavoriteStore((state) => state.favorites);

  const tabs = [
    { name: '首页', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: '古诗', path: '/poems', icon: <BookOpen className="w-5 h-5" /> },
    { name: '搜索', path: '/search', icon: <Search className="w-5 h-5" /> },
    {
      name: '收藏',
      path: '/favorites',
      icon: <Bookmark className="w-5 h-5" />,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
    { name: '历史', path: '/history', icon: <History className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-chinese-nightCard/95 backdrop-blur-md border-t border-stone-200/80 dark:border-chinese-nightBorder safe-area-pb">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
                isActive
                  ? 'text-chinese-ochre font-semibold'
                  : 'text-ink-400 dark:text-ink-400 hover:text-ink-600'
              }`
            }
          >
            <div className="relative">
              {tab.icon}
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] bg-chinese-cinnabar text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}
            </div>
            <span className="mt-0.5">{tab.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
