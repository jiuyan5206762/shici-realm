import { apiClient } from './client';
import { ApiResponse, PoemType } from '@/types';

export const typeApi = {
  // Get all poem types/genres
  getTypes: async () => {
    return apiClient<ApiResponse<PoemType[]>>('/api/types', {
      cacheTtlMs: 60 * 60 * 1000, // 1 hour cache
    });
  },
};
