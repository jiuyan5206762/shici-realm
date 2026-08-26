import { apiClient } from './client';
import { ApiResponse, Author } from '@/types';

export interface AuthorListParams {
  page?: number;
  pageSize?: number;
  dynasty?: string;
}

export const authorApi = {
  // Get authors list with pagination
  getAuthors: async (params: AuthorListParams = {}) => {
    const { page = 1, pageSize = 20, dynasty } = params;
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (dynasty) {
      query.append('dynasty', dynasty);
    }
    return apiClient<ApiResponse<Author[]>>(`/api/authors?${query.toString()}`, {
      cacheTtlMs: 15 * 60 * 1000, // 15 mins cache for authors
    });
  },
};
