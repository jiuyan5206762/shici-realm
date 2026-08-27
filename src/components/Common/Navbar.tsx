import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bookmark,
  History,
  Settings,
  Shuffle,
  Sun,
  Moon,
  Swords,
} from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { poemApi } from '@/api/poems';
import { SealBadge } from '@/components/Common/SealBadge';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const [isRandomLoading, setIsRandomLoading] = useState(false);

  const navLinks = [
    { path: '/', label: '文华殿' },
    { path: '/poems', label: '诗库' },
    { path: '/feihua', label: '飞花令', badge: '热门' },
    { path: '/authors', label: '先贤' },
    { path: '/dynasties', label: '纪元' },
    { path: '/types', label: '格律' },
  ];

  const handleRandomPoem = async () => {
    try {
      setIsRandomLoading(true);
      const res = await poemApi.getRandom();
      if (res.data?.id) {
        navigate(`/poems/${res.data.id}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRandomLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-paper-50/85 dark:bg-ink-950/85 border-b border-paper-300/80 dark:border-ink-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Seal */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-2xl bg-chinese-cinnabar text-white font-serif font-bold text-lg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              诗
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl tracking-wider text-ink-900 dark:text-ink-50 leading-none">
                诗境
              </span>
              <span className="text-[10px] font-serif text-ink-400 tracking-widest uppercase mt-0.5">
                Shici Realm
              </span>
            </div>
          </Link>
          <div className="hidden sm:block">
            <SealBadge text="宋韵" size="sm" variant="cinnabar" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-paper-100/60 dark:bg-ink-900/60 p-1.5 rounded-full border border-paper-300/60 dark:border-ink-800/60 shadow-xs">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 rounded-full text-xs font-serif font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-chinese-cinnabar text-white shadow-xs'
                    : 'text-ink-700 dark:text-ink-300 hover:text-chinese-cinnabar dark:hover:text-chinese-cinnabar hover:bg-paper-200/50 dark:hover:bg-ink-800/50'
                }`}
              >
                {link.path === '/feihua' && <Swords className="w-3.5 h-3.5 text-chinese-gold" />}
                <span>{link.label}</span>
                {link.badge && !isActive && (
                  <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-chinese-cinnabar text-white font-mono font-bold leading-tight">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search */}
          <Link
            to="/search"
            className="p-2 rounded-full text-ink-600 dark:text-ink-300 hover:text-chinese-cinnabar hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors"
            title="搜索诗词 (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Random Poem Button */}
          <button
            onClick={handleRandomPoem}
            disabled={isRandomLoading}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-medium border border-paper-300 dark:border-ink-700 hover:border-chinese-cinnabar hover:text-chinese-cinnabar transition-all interactive-tap text-ink-700 dark:text-ink-200 bg-paper-100/40 dark:bg-ink-900/40"
            title="偶遇一首古诗 (R键)"
          >
            <Shuffle className={`w-3.5 h-3.5 ${isRandomLoading ? 'animate-spin' : ''}`} />
            <span>偶遇</span>
          </button>

          {/* Favorites */}
          <Link
            to="/favorites"
            className="p-2 rounded-full text-ink-600 dark:text-ink-300 hover:text-chinese-cinnabar hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors"
            title="典藏"
          >
            <Bookmark className="w-4 h-4" />
          </Link>

          {/* History */}
          <Link
            to="/history"
            className="hidden sm:flex p-2 rounded-full text-ink-600 dark:text-ink-300 hover:text-chinese-cinnabar hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors"
            title="足迹"
          >
            <History className="w-4 h-4" />
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => toggleTheme()}
            className="p-2 rounded-full text-ink-600 dark:text-ink-300 hover:text-chinese-cinnabar hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors"
            title="切换昼夜主题"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-chinese-celadon" />
            ) : (
              <Sun className="w-4 h-4 text-chinese-gold" />
            )}
          </button>

          {/* Settings */}
          <Link
            to="/settings"
            className="p-2 rounded-full text-ink-600 dark:text-ink-300 hover:text-chinese-cinnabar hover:bg-paper-200 dark:hover:bg-ink-800 transition-colors"
            title="偏好设置"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
