import { apiClient } from './client';
import { ApiResponse, Poem } from '@/types';
import { findPoemById } from '@/utils/poetDirectory';

export interface PoemListParams {
  page?: number;
  pageSize?: number;
}

export interface RandomPoemParams {
  author?: string;
  dynasty?: string;
  type?: string;
  char?: string;
}

export const poemApi = {
  // Get poems list with pagination
  getPoems: async (params: PoemListParams = {}) => {
    const { page = 1, pageSize = 20 } = params;
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    return apiClient<ApiResponse<Poem[]>>(`/api/poems?${query.toString()}`, {
      cacheTtlMs: 2 * 60 * 1000, // 2 mins cache
    });
  },

  // Get poem detail by ID (checks curated database first, then remote API)
  getById: async (id: number | string) => {
    const localMatch = findPoemById(id);
    if (localMatch) {
      return {
        data: localMatch,
        lang: 'zh-Hans',
      };
    }

    return apiClient<ApiResponse<Poem>>(`/api/poems/${id}`, {
      cacheTtlMs: 10 * 60 * 1000, // 10 mins cache
    });
  },

  // Get random poem
  getRandom: async (params: RandomPoemParams = {}) => {
    const query = new URLSearchParams();
    if (params.author) query.append('author', params.author);
    if (params.dynasty) query.append('dynasty', params.dynasty);
    if (params.type) query.append('type', params.type);
    if (params.char) query.append('char', params.char);

    const queryString = query.toString();
    const endpoint = queryString ? `/api/poems/random?${queryString}` : '/api/poems/random';
    
    // No long-term caching for random, to preserve randomness
    return apiClient<ApiResponse<Poem>>(endpoint, {
      cacheTtlMs: 0,
    });
  },
};
