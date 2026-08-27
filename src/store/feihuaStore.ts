import { create } from 'zustand';
import {
  FeihuaPersona,
  FeihuaService,
  FEIHUA_PERSONAS,
} from '@/api/feihuaService';
import { guqinAudio } from '@/services/audio/guqinAudio';

export interface DuelMessage {
  sender: 'user' | 'ai';
  verse: string;
  author?: string;
  poemTitle?: string;
  timestamp: number;
}

export interface FeihuaState {
  currentKeyword: string;
  selectedPersona: FeihuaPersona;
  status: 'idle' | 'playing' | 'gameover';
  playerTurn: boolean;
  history: DuelMessage[];
  playerScore: number;
  aiScore: number;
  streak: number;
  playerRank: string;
  timeLeft: number;
  errorMessage: string | null;
  winner: 'user' | 'ai' | null;

  // Actions
  setKeyword: (kw: string) => void;
  setPersona: (p: FeihuaPersona) => void;
  startGame: () => void;
  submitVerse: (verseText: string) => boolean;
  aiPlayTurn: () => void;
  endGame: (winner: 'user' | 'ai') => void;
  resetGame: () => void;
  decrementTimer: () => void;
}

const ROUND_TIME_LIMIT = 30; // 30 seconds

export const useFeihuaStore = create<FeihuaState>((set, get) => ({
  currentKeyword: '春',
  selectedPersona: FEIHUA_PERSONAS[0],
  status: 'idle',
  playerTurn: true,
  history: [],
  playerScore: 0,
  aiScore: 0,
  streak: 0,
  playerRank: '书院童生',
  timeLeft: ROUND_TIME_LIMIT,
  errorMessage: null,
  winner: null,

  setKeyword: (kw) => set({ currentKeyword: kw.trim() }),
  setPersona: (p) => set({ selectedPersona: p }),

  startGame: () => {
    const { currentKeyword } = get();
    if (!currentKeyword) return;

    guqinAudio.playChime();
    set({
      status: 'playing',
      playerTurn: true,
      history: [],
      playerScore: 0,
      aiScore: 0,
      streak: 0,
      playerRank: '书院童生',
      timeLeft: ROUND_TIME_LIMIT,
      errorMessage: null,
      winner: null,
    });
  },

  decrementTimer: () => {
    const { timeLeft, status, playerTurn } = get();
    if (status !== 'playing' || !playerTurn) return;

    if (timeLeft <= 1) {
      guqinAudio.playMutedError();
      get().endGame('ai');
    } else {
      if (timeLeft <= 5) {
        guqinAudio.playTick();
      }
      set({ timeLeft: timeLeft - 1 });
    }
  },

  submitVerse: (verseText: string) => {
    const { currentKeyword, history, playerScore, streak } = get();
    const usedVerses = history.map((h) => h.verse);

    const validation = FeihuaService.validateVerse(verseText, currentKeyword, usedVerses);

    if (!validation.valid) {
      guqinAudio.playMutedError();
      set({ errorMessage: validation.reason || '诗句不符合飞花令规则' });
      return false;
    }

    const matchedVerse = validation.match!;
    guqinAudio.playGuqinPluck();

    const newStreak = streak + 1;
    const addedScore = 10 + newStreak * 2;
    const newPlayerScore = playerScore + addedScore;
    const rankInfo = FeihuaService.getRankTitle(newPlayerScore);

    const newMsg: DuelMessage = {
      sender: 'user',
      verse: matchedVerse.line,
      author: matchedVerse.author,
      poemTitle: matchedVerse.title,
      timestamp: Date.now(),
    };

    set({
      history: [...history, newMsg],
      playerScore: newPlayerScore,
      streak: newStreak,
      playerRank: rankInfo.badge,
      errorMessage: null,
      playerTurn: false,
      timeLeft: ROUND_TIME_LIMIT,
    });

    // Trigger AI turn after brief poetic thinking delay
    setTimeout(() => {
      get().aiPlayTurn();
    }, 1100);

    return true;
  },

  aiPlayTurn: () => {
    const { currentKeyword, history, selectedPersona, aiScore } = get();
    const usedVerses = history.map((h) => h.verse);

    const aiVerse = FeihuaService.getAiVerse(currentKeyword, usedVerses, selectedPersona.id);

    if (!aiVerse) {
      // AI cannot find more verses, User Wins!
      guqinAudio.playVictory();
      get().endGame('user');
      return;
    }

    guqinAudio.playChime();

    const newMsg: DuelMessage = {
      sender: 'ai',
      verse: aiVerse.line,
      author: aiVerse.author,
      poemTitle: aiVerse.title,
      timestamp: Date.now(),
    };

    set({
      history: [...history, newMsg],
      aiScore: aiScore + 10,
      playerTurn: true,
      timeLeft: ROUND_TIME_LIMIT,
    });
  },

  endGame: (winner) => {
    if (winner === 'user') {
      guqinAudio.playVictory();
    } else {
      guqinAudio.playMutedError();
    }

    set({
      status: 'gameover',
      winner,
    });
  },

  resetGame: () => {
    set({
      status: 'idle',
      playerTurn: true,
      history: [],
      playerScore: 0,
      aiScore: 0,
      streak: 0,
      timeLeft: ROUND_TIME_LIMIT,
      errorMessage: null,
      winner: null,
    });
  },
}));
