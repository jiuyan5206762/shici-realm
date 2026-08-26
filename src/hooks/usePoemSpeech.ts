import { useState, useEffect, useCallback, useRef } from 'react';
import { Poem } from '@/types';

export function usePoemSpeech(poem?: Poem | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Synthesis and load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
        }
      };

      updateVoices();

      // Voices may load asynchronously in Chrome/Edge/Safari
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  // Stop playback when unmounting or switching poems
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        if ((window as any).__activeSpeechUtterance) {
          (window as any).__activeSpeechUtterance = null;
        }
      }
    };
  }, [poem?.id]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    try {
      window.speechSynthesis.cancel();
      if (typeof window !== 'undefined') {
        (window as any).__activeSpeechUtterance = null;
      }
      setIsPlaying(false);
    } catch {
      setIsPlaying(false);
    }
  }, [isSupported]);

  const play = useCallback(() => {
    if (!isSupported || !poem) return;

    try {
      // 1. Cancel previous speech
      window.speechSynthesis.cancel();

      // 2. Resume in case browser suspended speech engine
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // 3. Format poetic text for dignified recital
      const title = poem.title || '';
      const author = poem.author?.name ? `${poem.author.name}。` : '';
      const dynasty = poem.dynasty?.name ? `${poem.dynasty.name}代。` : '';
      const lines = (poem.content || []).join('，') + '。';
      const textToRead = `${title}。${dynasty}${author}${lines}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85; // Slightly slower, dignified poetic rhythm
      utterance.pitch = 1.0;

      // 4. Select best Chinese voice (prefer Mandarin Chinese zh-CN / zh-TW / cmn)
      const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      const zhVoice =
        currentVoices.find((v) => v.lang === 'zh-CN' || v.lang === 'zh_CN') ||
        currentVoices.find((v) => v.lang.startsWith('zh') || v.lang.startsWith('cmn')) ||
        currentVoices.find((v) => v.name.includes('Chinese') || v.name.includes('Mandarin') || v.name.includes('Xiaoxiao') || v.name.includes('Yunxi'));

      if (zhVoice) {
        utterance.voice = zhVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        if (typeof window !== 'undefined') {
          (window as any).__activeSpeechUtterance = null;
        }
      };

      utterance.onerror = (e) => {
        // Ignore interrupted/canceled errors
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        setIsPlaying(false);
        if (typeof window !== 'undefined') {
          (window as any).__activeSpeechUtterance = null;
        }
      };

      // Hold references to window object to prevent Chromium premature garbage collection
      utteranceRef.current = utterance;
      if (typeof window !== 'undefined') {
        (window as any).__activeSpeechUtterance = utterance;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis playback exception:', err);
      setIsPlaying(false);
    }
  }, [isSupported, poem, voices]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, play, stop]);

  return {
    isSupported,
    isPlaying,
    play,
    stop,
    toggle,
  };
}
