import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AppTheme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: AppTheme;
  isDark: boolean;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

const applyThemeToDOM = (theme: AppTheme): boolean => {
  const root = document.documentElement;
  root.classList.remove('dark', 'sepia');

  let isDarkMode = false;

  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
      isDarkMode = true;
    }
  } else if (theme === 'dark') {
    root.classList.add('dark');
    isDarkMode = true;
  }

  // Update theme-color meta tag
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDarkMode ? '#131316' : '#FAF6EE');
  }

  return isDarkMode;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      isDark: false,

      setTheme: (theme: AppTheme) => {
        const isDark = applyThemeToDOM(theme);
        set({ theme, isDark });
      },

      toggleTheme: () => {
        const { theme } = get();
        const nextTheme: AppTheme = theme === 'dark' ? 'light' : 'dark';
        const isDark = applyThemeToDOM(nextTheme);
        set({ theme: nextTheme, isDark });
      },

      initTheme: () => {
        const { theme } = get();
        const isDark = applyThemeToDOM(theme);
        set({ isDark });
      },
    }),
    {
      name: 'shici_theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
