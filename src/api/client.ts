// Unified High-Performance API Client with In-memory LRU Cache, LocalStorage Persistence, In-flight Request Deduplication & Exponential Backoff

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://poetry.palemoky.com';

// 1. In-memory LRU Cache with Max Entries
const MAX_CACHE_ENTRIES = 200;
const memoryCache = new Map<string, { data: unknown; expiry: number }>();

// 2. In-flight Promise deduplication map
const inFlightRequests = new Map<string, Promise<unknown>>();

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
  cacheTtlMs?: number; // Cache time-to-live in ms (0 = no cache, >0 = cached)
  persistLocal?: boolean; // Persist in localStorage for instant offline access
  retries?: number;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    timeout = 10000,
    cacheTtlMs = 0,
    persistLocal = false,
    retries = 1,
    ...fetchOptions
  } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const method = fetchOptions.method || 'GET';
  const cacheKey = `${method}:${url}`;

  // 1. Check L1 in-memory cache
  if (method === 'GET' && cacheTtlMs > 0) {
    const cached = memoryCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T;
    }
  }

  // 2. Check L2 LocalStorage persistence
  if (method === 'GET' && persistLocal) {
    try {
      const localStr = localStorage.getItem('shici_cache_' + cacheKey);
      if (localStr) {
        const localObj = JSON.parse(localStr);
        if (localObj.expiry > Date.now()) {
          // Warm up L1 memory cache
          memoryCache.set(cacheKey, localObj);
          return localObj.data as T;
        }
      }
    } catch {}
  }

  // 3. Deduplicate in-flight requests for identical GET queries
  if (method === 'GET' && inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey) as Promise<T>;
  }

  const executionPromise = (async () => {
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
          } catch {}
          throw new ApiError(errorMessage, errorCode, response.status);
        }

        const json = await response.json();

        // Store in L1 Memory Cache with LRU eviction
        if (method === 'GET' && cacheTtlMs > 0) {
          if (memoryCache.size >= MAX_CACHE_ENTRIES) {
            const oldestKey = memoryCache.keys().next().value;
            if (oldestKey) memoryCache.delete(oldestKey);
          }
          const cacheEntry = {
            data: json,
            expiry: Date.now() + cacheTtlMs,
          };
          memoryCache.set(cacheKey, cacheEntry);

          // Store in L2 LocalStorage if requested
          if (persistLocal) {
            try {
              localStorage.setItem('shici_cache_' + cacheKey, JSON.stringify(cacheEntry));
            } catch {}
          }
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
          await new Promise((resolve) => setTimeout(resolve, 400 * Math.pow(2, attempt)));
          continue;
        }

        break;
      }
    }

    throw lastError || new ApiError('未知网络异常');
  })();

  if (method === 'GET') {
    inFlightRequests.set(cacheKey, executionPromise);
    executionPromise.finally(() => {
      inFlightRequests.delete(cacheKey);
    });
  }

  return executionPromise;
}

export function clearApiCache() {
  memoryCache.clear();
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('shici_cache_'))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
}
