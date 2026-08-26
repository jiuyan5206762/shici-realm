import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FavoriteItem, Poem } from '@/types';

interface FavoriteState {
  favorites: FavoriteItem[];
  addFavorite: (poem: Poem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
  importFavorites: (items: FavoriteItem[]) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (poem: Poem) => {
        const { favorites } = get();
        if (favorites.some((item) => item.id === poem.id)) {
          return;
        }

        const newFavorite: FavoriteItem = {
          id: poem.id,
          title: poem.title,
          author: poem.author,
          dynasty: poem.dynasty,
          type: poem.type,
          content: poem.content,
          createdAt: Date.now(),
        };

        set({ favorites: [newFavorite, ...favorites] });
      },

      removeFavorite: (id: number) => {
        set({
          favorites: get().favorites.filter((item) => item.id !== id),
        });
      },

      isFavorite: (id: number) => {
        return get().favorites.some((item) => item.id === id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      importFavorites: (items: FavoriteItem[]) => {
        const current = get().favorites;
        const currentIds = new Set(current.map((i) => i.id));
        const newItems = items.filter((i) => !currentIds.has(i.id));
        set({ favorites: [...newItems, ...current] });
      },
    }),
    {
      name: 'shici_favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
