import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchHistoryState {
  searches: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearSearches: () => void;
}

const MAX_SEARCH_HISTORY = 12;

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      searches: ['静夜思', '李白', '苏轼', '明月', '春风', '水调歌头'],

      addSearch: (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return;

        const filtered = get().searches.filter((s) => s !== trimmed);
        set({
          searches: [trimmed, ...filtered].slice(0, MAX_SEARCH_HISTORY),
        });
      },

      removeSearch: (query: string) => {
        set({
          searches: get().searches.filter((s) => s !== query),
        });
      },

      clearSearches: () => {
        set({ searches: [] });
      },
    }),
    {
      name: 'shici_search_history',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
