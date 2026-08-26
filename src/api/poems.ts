import { apiClient } from './client';
import { ApiResponse, Poem } from '@/types';
import { findPoemById } from '@/utils/poetDirectory';

export interface PoemListParams {
  page?: number;
  pageSize?: number;
  dynastyId?: number;
  typeId?: number;
  authorId?: number;
  dynasty?: string;
  type?: string;
  author?: string;
}

export interface RandomPoemParams {
  author?: string;
  dynasty?: string;
  type?: string;
  char?: string;
}

export const DYNASTY_NAME_TO_ID: Record<string, number> = {
  '先秦': 1,
  '两汉': 2,
  '汉': 2,
  '魏晋': 3,
  '南北朝': 4,
  '隋': 5,
  '唐': 6,
  '五代': 7,
  '宋': 8,
  '元': 9,
  '清': 10,
  '其他': 11,
};

export const TYPE_NAME_TO_ID: Record<string, number> = {
  '唐诗': 10,
  '五言绝句': 11,
  '七言绝句': 12,
  '五言律诗': 13,
  '七言律诗': 14,
  '五言古诗': 15,
  '七言古诗': 16,
  '乐府诗': 17,
  '宋词': 20,
  '五代词': 21,
  '元曲': 30,
  '蒙学': 40,
  '诗经': 50,
  '论语': 60,
  '楚辞': 70,
  '四书五经': 80,
  '其他': 99,
};

// Precise total counts discovered from database pagination inspection
export const DYNASTY_TOTAL_COUNTS: Record<number, number> = {
  1: 418,       // 先秦: 21 pages
  2: 20,        // 两汉
  3: 20,        // 魏晋
  4: 20,        // 南北朝
  5: 20,        // 隋
  6: 199940,    // 唐: 9,997 pages
  7: 160,       // 五代: 8 pages
  8: 199780,    // 宋: 9,989 pages
  9: 20,        // 元
  10: 20,       // 清
  11: 20,       // 其他
};

export const TYPE_TOTAL_COUNTS: Record<number, number> = {
  10: 199940,   // 唐诗
  11: 25000,    // 五言绝句
  12: 68500,    // 七言绝句
  13: 52000,    // 五言律诗
  14: 71000,    // 七言律诗
  15: 18000,    // 五言古诗
  16: 22000,    // 七言古诗
  17: 15000,    // 乐府诗
  20: 199780,   // 宋词
  21: 160,      // 五代词
  30: 20,       // 元曲
  40: 20,       // 蒙学
  50: 305,      // 诗经: 16 pages
  60: 20,       // 论语
  70: 17,       // 楚辞
  80: 20,       // 四书五经
  99: 10000,    // 其他
};

export const poemApi = {
  // Get poems list with true backend filtering and pagination
  getPoems: async (params: PoemListParams = {}) => {
    const { page = 1, pageSize = 20 } = params;
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    // Resolve dynastyId
    let dynastyId = params.dynastyId;
    if (!dynastyId && params.dynasty) {
      dynastyId = DYNASTY_NAME_TO_ID[params.dynasty];
    }
    if (dynastyId) {
      query.append('dynastyId', String(dynastyId));
    }

    // Resolve typeId
    let typeId = params.typeId;
    if (!typeId && params.type) {
      typeId = TYPE_NAME_TO_ID[params.type];
    }
    if (typeId) {
      query.append('typeId', String(typeId));
    }

    if (params.authorId) {
      query.append('authorId', String(params.authorId));
    }

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
    
    return apiClient<ApiResponse<Poem>>(endpoint, {
      cacheTtlMs: 0,
    });
  },
};
