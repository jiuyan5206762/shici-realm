import { create } from 'zustand';

interface BgmState {
  isPlaying: boolean;
  isBuffering: boolean;
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
const GESTURE_EVENTS = ['pointerdown', 'touchstart', 'click', 'keydown'] as const;
const AUDIO_SRC = '/audio/chunjianghuayueye.mp3';

let audioInstance: HTMLAudioElement | null = null;
let gestureListenersAttached = false;
let userWantsPlayback = false;
let watchdogTimer: any = null;
let autoRetryTimer: any = null;

export const useBgmStore = create<BgmState>((set, get) => ({
  isPlaying: false,
  isBuffering: false,
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

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = get().isMuted ? 0 : get().volume;

    // 1. Play & Playing State Handlers
    audio.addEventListener('play', () => {
      set({ isPlaying: true, isBuffering: false, autoplayPending: false });
    });

    audio.addEventListener('playing', () => {
      set({ isPlaying: true, isBuffering: false });
    });

    // 2. Pause Handler (Distinguish deliberate pause from buffer underruns)
    audio.addEventListener('pause', () => {
      if (!userWantsPlayback) {
        set({ isPlaying: false, isBuffering: false });
      }
    });

    // 3. Seamless Loop Guard (Safeguard in case browser loop gets stuck on EOF)
    audio.addEventListener('ended', () => {
      if (userWantsPlayback) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.warn('BGM loop restart note:', err));
      } else {
        set({ isPlaying: false });
      }
    });

    // 4. Stalling / Waiting / Buffer Recovery
    audio.addEventListener('waiting', () => {
      if (userWantsPlayback) {
        set({ isBuffering: true });
      }
    });

    audio.addEventListener('canplay', () => {
      set({ isBuffering: false });
      if (userWantsPlayback && audio.paused) {
        audio.play().catch(() => {});
      }
    });

    audio.addEventListener('canplaythrough', () => {
      set({ isBuffering: false });
      if (userWantsPlayback && audio.paused) {
        audio.play().catch(() => {});
      }
    });

    audio.addEventListener('stalled', () => {
      if (userWantsPlayback && audio.paused) {
        if (autoRetryTimer) clearTimeout(autoRetryTimer);
        autoRetryTimer = setTimeout(() => {
          if (userWantsPlayback && audio.paused) {
            audio.play().catch(() => {});
          }
        }, 1000);
      }
    });

    // 5. Auto-Heal from Network or Decoder Errors
    audio.addEventListener('error', (e) => {
      console.warn('BGM stream encountered transient glitch, auto-healing:', e);
      if (userWantsPlayback) {
        set({ isBuffering: true });
        if (autoRetryTimer) clearTimeout(autoRetryTimer);
        autoRetryTimer = setTimeout(() => {
          if (userWantsPlayback) {
            const currentPos = audio.currentTime || 0;
            audio.load();
            audio.currentTime = currentPos;
            audio.play().catch(() => {});
          }
        }, 1500);
      }
    });

    // 6. Tab Visibility Change Auto-Resume (Prevent background freeze)
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && userWantsPlayback && audio.paused) {
          audio.play().catch(() => {});
        }
      });
    }

    // 7. Active Watchdog Heartbeat (Checks every 3s to guarantee unbroken playback)
    if (!watchdogTimer && typeof window !== 'undefined') {
      watchdogTimer = setInterval(() => {
        if (userWantsPlayback && audioInstance) {
          if (audioInstance.paused && !get().autoplayPending) {
            audioInstance.play().catch(() => {});
          }
        }
      }, 3000);
    }

    audioInstance = audio;
    set({ audioElement: audio });
  },

  autoPlayOnEntry: () => {
    const { initAudio, play } = get();
    initAudio();
    userWantsPlayback = true;

    // 1. Try immediate autoplay
    play().catch(() => {
      set({ autoplayPending: true });

      if (gestureListenersAttached) return;
      gestureListenersAttached = true;

      // 2. Seamless gesture fallback (Trigger on first natural user interaction)
      const handleUserGesture = async () => {
        try {
          userWantsPlayback = true;
          await get().play();
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
    userWantsPlayback = true;

    if (!audioInstance) {
      initAudio();
    }
    const audio = audioInstance;
    if (!audio) return;

    audio.volume = get().isMuted ? 0 : volume;
    try {
      await audio.play();
      set({ isPlaying: true, isBuffering: false, autoplayPending: false });
    } catch (e) {
      if (!gestureListenersAttached) {
        set({ isPlaying: false });
      }
      throw e;
    }
  },

  pause: () => {
    userWantsPlayback = false;
    if (audioInstance) {
      audioInstance.pause();
      set({ isPlaying: false, isBuffering: false, autoplayPending: false });
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
