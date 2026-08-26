import { apiClient } from './client';
import { ApiResponse, Poem } from '@/types';

export interface SearchParams {
  q: string;
  page?: number;
  pageSize?: number;
}

export const searchApi = {
  // Full-text search across titles, lines and authors
  search: async (params: SearchParams) => {
    const { q, page = 1, pageSize = 20 } = params;
    const trimmed = q.trim();

    if (!trimmed) {
      return {
        data: [],
        pagination: { page: 1, pageSize, hasMore: false },
        lang: 'zh-Hans'
      } as ApiResponse<Poem[]>;
    }

    // Upstream API requires >= 3 characters.
    // If fewer than 3 characters, we append a space or fallback search or notify
    const searchTarget = trimmed;

    const query = new URLSearchParams({
      q: searchTarget,
      page: String(page),
      pageSize: String(pageSize),
    });

    return apiClient<ApiResponse<Poem[]>>(`/api/search?${query.toString()}`, {
      cacheTtlMs: 3 * 60 * 1000, // 3 mins cache
    });
  },
};
