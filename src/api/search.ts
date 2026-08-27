import { ApiResponse, Poem } from '@/types';
import { smartSearchPoems } from '@/utils/searchEngine';

export interface SearchParams {
  q: string;
  page?: number;
  pageSize?: number;
  dynasty?: string;
  type?: string;
  author?: string;
}

export const searchApi = {
  // Intelligent Hybrid full-text search with exact title, author & verse relevance reranking
  search: async (params: SearchParams): Promise<ApiResponse<Poem[]> & { totalCount?: number }> => {
    return smartSearchPoems(params);
  },
};
