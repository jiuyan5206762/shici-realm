// Unified API Client with In-memory Cache, Retry & Error Handling

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://poetry.palemoky.com';

// Cache for static or slow-changing resources
const memoryCache = new Map<string, { data: unknown; expiry: number }>();

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = 'API_ERROR', status = 500) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  cacheTtlMs?: number; // Cache time-to-live in ms
  retries?: number;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 10000, cacheTtlMs = 0, retries = 1, ...fetchOptions } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const method = fetchOptions.method || 'GET';
  const cacheKey = `${method}:${url}`;

  // Check cache for GET requests
  if (method === 'GET' && cacheTtlMs > 0) {
    const cached = memoryCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T;
    }
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          'Accept': 'application/json',
          ...fetchOptions.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        let errorMessage = `请求失败: HTTP ${response.status}`;
        let errorCode = 'HTTP_' + response.status;
        try {
          const errJson = await response.json();
          if (errJson.error?.message) {
            errorMessage = errJson.error.message;
            errorCode = errJson.error.code || errorCode;
          }
        } catch {
          // ignore non-json error body
        }
        throw new ApiError(errorMessage, errorCode, response.status);
      }

      const json = await response.json();

      // Store in memory cache if specified
      if (method === 'GET' && cacheTtlMs > 0) {
        memoryCache.set(cacheKey, {
          data: json,
          expiry: Date.now() + cacheTtlMs,
        });
      }

      return json as T;
    } catch (err: unknown) {
      clearTimeout(timer);
      const isAbort = (err as Error)?.name === 'AbortError';
      const isRateLimit = (err as ApiError)?.status === 429;
      
      lastError = isAbort
        ? new ApiError('网络请求超时，请检查连接或稍后重试', 'TIMEOUT', 408)
        : (err as Error);

      if (attempt < retries && !isRateLimit) {
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, 500 * Math.pow(2, attempt)));
        continue;
      }

      break;
    }
  }

  throw lastError || new ApiError('未知网络异常', 'UNKNOWN', 500);
}
