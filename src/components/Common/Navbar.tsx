import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Users,
  Bookmark,
  History,
  Compass,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useFavoriteStore } from '@/store/favoriteStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favorites = useFavoriteStore((state) => state.favorites);

  const navLinks = [
    { name: '首页', path: '/', icon: <BookOpen className="w-4 h-4" /> },
    { name: '古诗', path: '/poems', icon: <BookOpen className="w-4 h-4" /> },
    { name: '诗人', path: '/authors', icon: <Users className="w-4 h-4" /> },
    { name: '朝代', path: '/dynasties', icon: <Compass className="w-4 h-4" /> },
    { name: '体裁', path: '/types', icon: <Layers className="w-4 h-4" /> },
    {
      name: '收藏',
      path: '/favorites',
      icon: <Bookmark className="w-4 h-4" />,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
    { name: '历史', path: '/history', icon: <History className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-[#18181A]/90 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-chinese-cinnabar text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              诗
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-wider text-ink-900 dark:text-ink-50">
                诗境
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-serif text-ink-400 dark:text-ink-400 border-l border-stone-300 dark:border-stone-700 pl-2">
                中华古籍文库
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 rounded-xl text-sm font-serif font-medium transition-all flex items-center space-x-1.5 ${
                    active
                      ? 'text-chinese-ochre font-semibold bg-chinese-ochre/10 dark:bg-chinese-ochre/15'
                      : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 bg-chinese-cinnabar text-white text-xs rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search Button */}
            <button
              onClick={() => navigate('/search')}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#1E1E22] border border-stone-200 dark:border-stone-700 text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200 shadow-sm transition-all hover:border-chinese-ochre/50 text-sm font-serif"
              title="搜索古诗词"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">搜索诗词、诗人...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs font-mono text-ink-400 bg-stone-100 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                /
              </kbd>
            </button>

            {/* Dark/Light Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800 md:hidden"
              aria-label="切换菜单"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#18181A] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-serif font-medium ${
                  active
                    ? 'bg-chinese-ochre text-white shadow-sm'
                    : 'text-ink-700 dark:text-ink-200 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 bg-chinese-cinnabar text-white text-xs rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
