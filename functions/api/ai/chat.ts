// Cloudflare Pages Function: AI Poem Interactive Chat Service

interface Env {
  AI_API_KEY?: string;
  GEMINI_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const apiKey = env.AI_API_KEY || env.GEMINI_API_KEY;

  try {
    const { poem, history, message } = (await request.json()) as any;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: { message: 'AI_API_KEY not configured on server' } }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const systemPrompt = `你是一位学识渊博、温文尔雅的古典文学导师。当前用户正在研读这首古诗词：
《${poem.title}》
作者：〔${poem.dynasty?.name || ''}〕${poem.author?.name || ''}
体裁：${poem.type?.name || ''}
原文：
${(poem.content || []).join('\n')}

请围绕这首诗词，以纯正典雅又通俗易懂的现代汉语回答用户的问题。解答要切中诗词字句、意象背景与文学价值，言简意赅，富于文采。`;

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: `好的，我已深刻理解《${poem.title}》的原文辞章与艺术意蕴，随时准备为您解答各类诗学与赏析问题。` }] },
    ];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((h: any) => {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
        },
      }),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: { message: 'Upstream LLM error' } }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const jsonRes = (await res.json()) as any;
    const replyText = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(JSON.stringify({ reply: replyText }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: { message: (err as Error)?.message || 'Internal server error' } }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
