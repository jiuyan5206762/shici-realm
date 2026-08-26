// Cloudflare Pages Function: AI Poem Deep Explanation Service

interface Env {
  AI_API_KEY?: string;
  GEMINI_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const apiKey = env.AI_API_KEY || env.GEMINI_API_KEY;

  try {
    const { poem } = (await request.json()) as any;
    if (!poem) {
      return new Response(JSON.stringify({ error: { message: 'Missing poem object' } }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If no API key configured on Cloudflare, return status 503 so client uses built-in local engine
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: { message: 'AI_API_KEY not configured on server' } }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const prompt = `你是一位精通中国古典诗词、中国文学批评与文论的资深学者。请针对以下古籍诗词进行系统赏析与学术解读：
诗题：《${poem.title}》
朝代：${poem.dynasty?.name || '未知'}代
作者：${poem.author?.name || '佚名'}
体裁：${poem.type?.name || '古典诗词'}
诗词原文：
${(poem.content || []).join('\n')}

请以严格的 JSON 格式输出解读结果，字段必须包含：
{
  "translation": "现代白话优美译文，逐联连贯通俗晓畅",
  "background": "本诗的历史创作背景与作者时下境遇",
  "appreciation": "全面而精当的文学艺术赏析（意象、章法、情感与主旨）",
  "keyLines": [
    { "line": "最具代表性的一句诗", "explanation": "对该句诗眼、修辞与意蕴的精析" }
  ],
  "sentiment": "核心情感基调与意象特色（如：沉郁苍凉、旷达超然）",
  "artisticFeatures": ["艺术手法1", "艺术手法2", "艺术手法3"]
}`;

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      }),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: { message: 'AI upstream call failed' } }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const jsonRes = (await res.json()) as any;
    const rawText = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedData = JSON.parse(rawText);

    return new Response(JSON.stringify({ data: parsedData }), {
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
