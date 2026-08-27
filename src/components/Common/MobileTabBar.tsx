import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Users, Bookmark, Sword } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';

export const MobileTabBar: React.FC = () => {
  const favorites = useFavoriteStore((state) => state.favorites);

  const tabs = [
    { name: '文苑', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: '诗库', path: '/poems', icon: <BookOpen className="w-4 h-4" /> },
    { name: '飞花令', path: '/feihua', icon: <Sword className="w-4 h-4 text-chinese-cinnabar" />, isAccent: true },
    { name: '名家', path: '/authors', icon: <Users className="w-4 h-4" /> },
    {
      name: '典藏',
      path: '/favorites',
      icon: <Bookmark className="w-4 h-4" />,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper-50/95 dark:bg-ink-900/95 backdrop-blur-xl border-t border-paper-300/80 dark:border-ink-800 pb-[env(safe-area-inset-bottom)] shadow-2xl transition-colors">
      <div className="flex items-center justify-around h-15 px-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-serif transition-all ${
                isActive
                  ? 'text-chinese-cinnabar font-bold scale-105'
                  : 'text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100'
              }`
            }
          >
            <div className="relative flex items-center justify-center">
              {tab.icon}
              {tab.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 px-1 min-w-[15px] h-3.5 bg-chinese-cinnabar text-white text-[9px] font-mono rounded-full flex items-center justify-center font-bold">
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
