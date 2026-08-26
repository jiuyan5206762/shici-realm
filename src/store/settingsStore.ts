import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ReaderSettings } from '@/types';

interface SettingsState {
  settings: ReaderSettings;
  updateSettings: (newSettings: Partial<ReaderSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: ReaderSettings = {
  fontSize: 'lg',
  lineHeight: 'relaxed',
  fontFamily: 'serif',
  theme: 'paper',
  zenMode: false,
  textAlign: 'center',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },
    }),
    {
      name: 'shici_settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
