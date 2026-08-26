import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { HistoryItem, Poem } from '@/types';

interface HistoryState {
  history: HistoryItem[];
  addHistory: (poem: Poem) => void;
  removeHistory: (id: number) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 100;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],

      addHistory: (poem: Poem) => {
        const { history } = get();
        // Remove existing if already present to put it at the front
        const filtered = history.filter((item) => item.id !== poem.id);

        const newHistoryItem: HistoryItem = {
          id: poem.id,
          title: poem.title,
          author: poem.author,
          dynasty: poem.dynasty,
          type: poem.type,
          snippet: poem.content?.[0] || '',
          viewedAt: Date.now(),
        };

        // Keep at most MAX_HISTORY items
        const updated = [newHistoryItem, ...filtered].slice(0, MAX_HISTORY);
        set({ history: updated });
      },

      removeHistory: (id: number) => {
        set({
          history: get().history.filter((item) => item.id !== id),
        });
      },

      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'shici_history',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
