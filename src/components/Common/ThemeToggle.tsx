import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore, AppTheme } from '@/store/themeStore';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: AppTheme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: '宣纸暖白', icon: <Sun className="w-4 h-4 text-amber-600" /> },
    { value: 'dark', label: '玄青夜读', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { value: 'system', label: '跟随系统', icon: <Monitor className="w-4 h-4 text-stone-500" /> },
  ];

  const currentIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5 text-amber-600" />;
      case 'dark':
        return <Moon className="w-5 h-5 text-indigo-400" />;
      default:
        return <Monitor className="w-5 h-5 text-stone-600 dark:text-stone-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-chinese-nightCard transition-colors flex items-center justify-center text-ink-600 dark:text-ink-300"
        title="切换主题配色"
        aria-label="切换主题配色"
      >
        {currentIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1 bg-white dark:bg-chinese-nightCard border border-stone-200 dark:border-chinese-nightBorder rounded-xl shadow-oriental z-50 animate-fadeIn">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setTheme(opt.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm flex items-center space-x-2 transition-colors ${
                theme === opt.value
                  ? 'bg-chinese-ochre/10 text-chinese-ochre font-medium'
                  : 'text-ink-600 dark:text-ink-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
