import { apiClient } from './client';
import { ApiResponse, Stats } from '@/types';

export const statsApi = {
  // Get platform live stats
  getStats: async () => {
    return apiClient<ApiResponse<Stats>>('/api/stats', {
      cacheTtlMs: 30 * 60 * 1000, // 30 mins cache
    });
  },
};
