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

export const AUTHOR_NAME_TO_ID: Record<string, number> = {
  '李白': 2045,
  '杜甫': 3911,
  '白居易': 9057,
  '苏轼': 11678,
  '陆游': 7513,
  '王维': 7756,
  '李商隐': 5871,
  '杜牧': 9679,
  '王勃': 3286,
  '柳宗元': 1331,
  '辛弃疾': 8618,
  '屈原': 9619,
  '纳兰性德': 3074,
  '曹操': 8228,
  '李煜': 6029,
  '马致远': 4799,
};

export const AUTHOR_TOTAL_COUNTS: Record<number, number> = {
  2045: 1640,   // 李白: 82 页 (1,640 首)
  3911: 2340,   // 杜甫: 117 页 (2,340 首)
  9057: 4820,   // 白居易: 241 页 (4,820 首)
  11678: 2900,  // 苏轼: 145 页 (2,900 首)
  7513: 6640,   // 陆游: 332 页 (6,640 首)
  7756: 400,    // 王维: 20 页 (400 首)
  5871: 400,    // 李商隐: 20 页 (400 首)
  9679: 300,    // 杜牧: 15 页 (300 首)
  3286: 40,     // 王勃: 2 页 (40 首)
  1331: 40,     // 柳宗元: 2 页 (40 首)
  8618: 40,     // 辛弃疾: 2 页 (40 首)
  9619: 20,     // 屈原: 1 页 (20 首)
  3074: 20,     // 纳兰性德: 1 页 (20 首)
  8228: 20,     // 曹操: 1 页 (20 首)
  6029: 20,     // 李煜: 1 页 (20 首)
  4799: 20,     // 马致远: 1 页 (20 首)
};

// Precise total counts discovered from database pagination inspection
export const DYNASTY_TOTAL_COUNTS: Record<number, number> = {
  1: 404,       // 先秦: 21 页 (404 首)
  2: 20,        // 两汉: 1 页 (20 首经典)
  3: 20,        // 魏晋: 1 页 (20 首经典)
  4: 12,        // 南北朝: 1 页 (12 首经典)
  5: 8,         // 隋: 1 页 (8 首经典)
  6: 199940,    // 唐: 9,997 页 (20 万首)
  7: 420,       // 五代: 21 页 (420 首)
  8: 199780,    // 宋: 9,989 页 (20 万首)
  9: 20,        // 元: 1 页 (20 首元曲)
  10: 20,       // 清: 1 页 (20 首清代名作)
  11: 20,       // 其他: 1 页 (20 首蒙学典籍)
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

    // Resolve authorId
    let authorId = params.authorId;
    if (!authorId && params.author) {
      authorId = AUTHOR_NAME_TO_ID[params.author];
    }
    if (authorId) {
      query.append('authorId', String(authorId));
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
