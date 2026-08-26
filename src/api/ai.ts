import { Poem, AiAnalysis, AiChatMessage } from '@/types';
import { generateLocalPoemAnalysis, generateLocalPoemChatResponse } from '@/utils/localAiFallback';

export const aiApi = {
  // Analyze poem (translation, background, appreciation, key lines)
  explainPoem: async (poem: Poem): Promise<AiAnalysis> => {
    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          return result.data as AiAnalysis;
        }
      }
    } catch {
      // Fallback to local intelligent analysis engine
    }

    // High quality built-in classical analysis fallback
    return generateLocalPoemAnalysis(poem);
  },

  // Interactive AI conversation about a poem
  chatPoem: async (poem: Poem, history: AiChatMessage[], message: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem, history, message }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.reply) {
          return result.reply;
        }
      }
    } catch {
      // Fallback to local conversational responder
    }

    return generateLocalPoemChatResponse(poem, message);
  },
};
