import { useState, useEffect, useCallback } from 'react';
import { Poem } from '@/types';

export function usePoemSpeech(poem?: Poem | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  // Stop playback when unmounting or changing poems
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [poem?.id]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [isSupported]);

  const play = useCallback(() => {
    if (!isSupported || !poem) return;

    window.speechSynthesis.cancel();

    // Prepare recital script: Title -> Author and Dynasty -> Lines
    const textToRead = `${poem.title}。${poem.dynasty?.name || ''}代，${poem.author?.name || ''}。${(poem.content || []).join('。')}。`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85; // Slightly slower, dignified poetic rhythm
    utterance.pitch = 1.0;

    // Find Chinese voice if available
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find((v) => v.lang.includes('zh') || v.lang.includes('cmn'));
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported, poem]);

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
