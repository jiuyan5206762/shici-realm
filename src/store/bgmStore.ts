import { create } from 'zustand';

interface BgmState {
  isPlaying: boolean;
  volume: number; // 0 to 1
  isMuted: boolean;
  title: string;
  artist: string;
  audioElement: HTMLAudioElement | null;

  // Actions
  initAudio: () => void;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
}

const STORAGE_KEY_PLAYING = 'shici_bgm_playing';
const STORAGE_KEY_VOLUME = 'shici_bgm_volume';

export const useBgmStore = create<BgmState>((set, get) => ({
  isPlaying: false,
  volume: (() => {
    const saved = localStorage.getItem(STORAGE_KEY_VOLUME);
    return saved !== null ? Math.max(0, Math.min(1, parseFloat(saved))) : 0.35;
  })(),
  isMuted: false,
  title: '春江花月夜',
  artist: '古筝名曲',
  audioElement: null,

  initAudio: () => {
    if (get().audioElement) return;

    const audio = new Audio('/audio/chunjianghuayueye.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = get().volume;

    audio.addEventListener('play', () => set({ isPlaying: true }));
    audio.addEventListener('pause', () => set({ isPlaying: false }));
    audio.addEventListener('ended', () => set({ isPlaying: false }));

    set({ audioElement: audio });
  },

  play: async () => {
    const { audioElement, initAudio, volume } = get();
    let audio = audioElement;
    if (!audio) {
      initAudio();
      audio = get().audioElement;
    }
    if (!audio) return;

    try {
      audio.volume = volume;
      await audio.play();
      set({ isPlaying: true });
      localStorage.setItem(STORAGE_KEY_PLAYING, 'true');
    } catch (e) {
      console.warn('Audio autoplay blocked or failed:', e);
      set({ isPlaying: false });
    }
  },

  pause: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      set({ isPlaying: false });
      localStorage.setItem(STORAGE_KEY_PLAYING, 'false');
    }
  },

  togglePlay: async () => {
    const { isPlaying, play, pause } = get();
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  },

  setVolume: (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = clamped;
    }
    set({ volume: clamped, isMuted: clamped === 0 });
    localStorage.setItem(STORAGE_KEY_VOLUME, String(clamped));
  },

  toggleMute: () => {
    const { isMuted, setVolume } = get();
    if (isMuted) {
      setVolume(0.35);
    } else {
      setVolume(0);
    }
  },
}));
