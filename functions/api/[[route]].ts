// Cloudflare Pages Function: API Reverse Proxy with Edge Caching & CORS

interface Env {
  UPSTREAM_API?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const upstreamBase = env.UPSTREAM_API || 'https://poetry.palemoky.com';

  const url = new URL(request.url);
  const targetPath = url.pathname.replace(/^\/api/, '');
  const targetUrl = `${upstreamBase}/api${targetPath}${url.search}`;

  // Handle CORS Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ShiciRealm/1.0.0 (Cloudflare Pages Function)',
      },
    });

    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    // Apply Edge caching headers for static resources
    if (targetPath.startsWith('/dynasties') || targetPath.startsWith('/types') || targetPath.startsWith('/stats')) {
      responseHeaders.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    } else if (targetPath.startsWith('/authors')) {
      responseHeaders.set('Cache-Control', 'public, max-age=900, s-maxage=3600');
    } else if (targetPath.startsWith('/search')) {
      responseHeaders.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    } else if (targetPath.startsWith('/poems/random')) {
      responseHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        error: {
          code: 'PROXY_ERROR',
          message: (err as Error)?.message || 'Failed to fetch from upstream poetry API',
        },
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};
