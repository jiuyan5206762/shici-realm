export interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  UPSTREAM_API?: string;
  AI_API_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Handle AI Explain endpoint
    if (url.pathname === '/api/ai/explain') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      const apiKey = env.AI_API_KEY;
      if (!apiKey) {
        return new Response(
          JSON.stringify({
            translation: '春眠不知不觉天已破晓，处处可以听到清脆悦耳的鸟鸣。回想昨夜听到的阵阵风雨之声，不知道吹落了多少娇艳的花朵。',
            background: '本诗为作者隐居鹿门山时所作，借写春晓时的所见所闻所感，表达了对春天由衷的喜爱与惜春之情。',
            analysis: '全诗语言平易自然，却意境幽远。诗人抓住春天清晨典型的景致，将视觉、听觉与心灵感悟融为一体，神韵超妙。',
            highlight: '“夜来风雨声，花落知多少”，平中见奇，看似随笔写出，实则深情缱绻，韵味悠长。',
            isFallback: true,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
      }

      try {
        const body: any = await request.json();
        const { title, author, content } = body;
        const prompt = `你是一位深谙中国古典诗词的著名学者。请对以下诗词进行深度研读与专业解析：\n\n诗题：《${title}》\n作者：${author || '佚名'}\n正文：\n${content}\n\n请严格返回如下 JSON 格式（不要包含任何 markdown 代码块标记，直接返回纯 JSON 字符串）：\n{\n  "translation": "现代汉语优雅通俗的逐句全篇白话译文",\n  "background": "该诗创作历史背景与诗人此时心境脉络",\n  "analysis": "艺术特色、修辞手法、意象营造与诗学美感赏析",\n  "highlight": "最经典千古名句点睛精讲"\n}`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const aiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        });

        const aiData: any = await aiRes.json();
        const text = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return new Response(JSON.stringify(parsed), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
      } catch (err: any) {
        return new Response(
          JSON.stringify({
            translation: '古诗意境深远，辞章温雅。',
            background: '典籍名作，收录于历代诗词汇编。',
            analysis: '融情于景，虚实相生，尽显华夏文脉风骨。',
            highlight: '意存笔先，言有尽而意无穷。',
            isFallback: true,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
      }
    }

    // 2. Handle general /api proxy to upstream poetry API
    if (url.pathname.startsWith('/api/')) {
      const upstream = env.UPSTREAM_API || 'https://poetry.palemoky.com';
      const targetUrl = new URL(url.pathname + url.search, upstream);

      try {
        const response = await fetch(targetUrl.toString(), {
          method: request.method,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'ShiciRealm-Cloudflare-Worker',
          },
        });

        const headers = new Headers(response.headers);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');

        return new Response(response.body, {
          status: response.status,
          headers,
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: 'Upstream gateway error' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // 3. Serve static single-page app assets from dist
    return env.ASSETS.fetch(request);
  },
};
