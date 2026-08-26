import { useEffect } from 'react';

interface ShortcutOptions {
  onSearchFocus?: () => void;
  onEscape?: () => void;
  onFavorite?: () => void;
  onRandomPoem?: () => void;
}

export function useKeyboardShortcuts(options: ShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input, textarea or contenteditable element
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (e.key === 'Escape') {
        options.onEscape?.();
        return;
      }

      if (isInput) {
        return;
      }

      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        options.onSearchFocus?.();
      } else if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) {
        options.onFavorite?.();
      } else if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey) {
        options.onRandomPoem?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options]);
}
