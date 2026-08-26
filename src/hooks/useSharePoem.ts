import { useState } from 'react';
import { Poem } from '@/types';

export function useSharePoem() {
  const [copied, setCopied] = useState(false);

  const sharePoem = async (poem: Poem) => {
    const url = `${window.location.origin}/poems/${poem.id}`;
    const shareData = {
      title: `${poem.title} - ${poem.author?.name || '古诗词'}`,
      text: `《${poem.title}》\n${poem.author?.name || ''} · ${poem.dynasty?.name || ''}\n\n${(poem.content || []).slice(0, 2).join('\n')}\n\n阅读完整诗篇：`,
      url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return false;
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return true;
    } catch {
      return false;
    }
  };

  const copyPoemText = async (poem: Poem) => {
    const text = `《${poem.title}》\n〔${poem.dynasty?.name || '古'}〕${poem.author?.name || '佚名'}\n\n${(poem.content || []).join('\n')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return true;
    } catch {
      return false;
    }
  };

  return {
    copied,
    sharePoem,
    copyPoemText,
  };
}
