import { create } from 'zustand';

interface BgmState {
  isPlaying: boolean;
  volume: number; // 0 to 1
  isMuted: boolean;
  title: string;
  artist: string;
  audioElement: HTMLAudioElement | null;
  autoplayPending: boolean;

  // Actions
  initAudio: () => void;
  autoPlayOnEntry: () => void;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
}

const STORAGE_KEY_VOLUME = 'shici_bgm_volume';

// 有效的浏览器手势激活事件（必须是真实的交互手势）
const GESTURE_EVENTS = ['pointerdown', 'touchstart', 'click', 'keydown'] as const;

let audioInstance: HTMLAudioElement | null = null;
let gestureListenersAttached = false;

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
  autoplayPending: false,

  initAudio: () => {
    if (audioInstance) {
      if (!get().audioElement) {
        set({ audioElement: audioInstance });
      }
      return;
    }

    const audio = new Audio('/audio/chunjianghuayueye.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = get().volume;

    audio.addEventListener('play', () => set({ isPlaying: true, autoplayPending: false }));
    audio.addEventListener('pause', () => set({ isPlaying: false }));
    audio.addEventListener('ended', () => set({ isPlaying: false }));
    audio.addEventListener('error', (e) => console.error('Audio load error:', e));

    audioInstance = audio;
    set({ audioElement: audio });
  },

  autoPlayOnEntry: () => {
    const { initAudio, play } = get();
    initAudio();

    // 1. 尝试直接自动播放（若用户此前访问过或浏览器策略允许，则直接进入播放）
    play().catch(() => {
      set({ autoplayPending: true });

      if (gestureListenersAttached) return;
      gestureListenersAttached = true;

      // 2. 若浏览器策略拦截了零手势播放，则在页面任意真实手势（点击/轻触/按键）时无缝启动
      const handleUserGesture = async () => {
        try {
          await get().play();
          // 播放成功后才解绑事件监听
          gestureListenersAttached = false;
          GESTURE_EVENTS.forEach((evt) => {
            window.removeEventListener(evt, handleUserGesture, true);
            document.removeEventListener(evt, handleUserGesture, true);
          });
        } catch (e) {
          console.warn('Gesture playback retry pending next interaction:', e);
        }
      };

      GESTURE_EVENTS.forEach((evt) => {
        window.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
        document.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
      });
    });
  },

  play: async () => {
    const { initAudio, volume } = get();
    if (!audioInstance) {
      initAudio();
    }
    const audio = audioInstance;
    if (!audio) return;

    audio.volume = get().isMuted ? 0 : volume;
    try {
      await audio.play();
      set({ isPlaying: true, autoplayPending: false });
    } catch (e) {
      set({ isPlaying: false });
      throw e;
    }
  },

  pause: () => {
    if (audioInstance) {
      audioInstance.pause();
      set({ isPlaying: false });
    }
  },

  togglePlay: async () => {
    const { isPlaying, play, pause } = get();
    if (isPlaying) {
      pause();
    } else {
      await play().catch(() => {});
    }
  },

  setVolume: (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    if (audioInstance) {
      audioInstance.volume = clamped;
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
