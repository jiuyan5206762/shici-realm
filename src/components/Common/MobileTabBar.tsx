import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Users, Bookmark, Search } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';

export const MobileTabBar: React.FC = () => {
  const favorites = useFavoriteStore((state) => state.favorites);

  const tabs = [
    { name: '首页', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: '古诗', path: '/poems', icon: <BookOpen className="w-5 h-5" /> },
    { name: '诗人', path: '/authors', icon: <Users className="w-5 h-5" /> },
    { name: '搜索', path: '/search', icon: <Search className="w-5 h-5" /> },
    {
      name: '收藏',
      path: '/favorites',
      icon: <Bookmark className="w-5 h-5" />,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#18181A]/95 backdrop-blur-md border-t border-stone-200/90 dark:border-stone-800 pb-[env(safe-area-inset-bottom)] shadow-lg transition-colors">
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-serif transition-all ${
                isActive
                  ? 'text-chinese-ochre font-bold'
                  : 'text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200'
              }`
            }
          >
            <div className="relative flex items-center justify-center">
              {tab.icon}
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-2 px-1 min-w-[16px] h-4 bg-chinese-cinnabar text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}
            </div>
            <span className="mt-1 leading-none">{tab.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
