import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ZenState {
  isZenMode: boolean;
  toggleZenMode: () => void;
  setZenMode: (val: boolean) => void;
}

export const useZenStore = create<ZenState>()(
  persist(
    (set) => ({
      isZenMode: false,
      toggleZenMode: () => set((state) => ({ isZenMode: !state.isZenMode })),
      setZenMode: (isZenMode) => set({ isZenMode }),
    }),
    {
      name: 'shici_zen_mode',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
