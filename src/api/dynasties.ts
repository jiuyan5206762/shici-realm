import { apiClient } from './client';
import { ApiResponse, Dynasty } from '@/types';

export const dynastyApi = {
  // Get all dynasties
  getDynasties: async () => {
    return apiClient<ApiResponse<Dynasty[]>>('/api/dynasties', {
      cacheTtlMs: 60 * 60 * 1000, // 1 hour cache
    });
  },
};
