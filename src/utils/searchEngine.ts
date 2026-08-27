import { Poem, ApiResponse } from '@/types';
import { FAMOUS_POETS_DIRECTORY, findPoetByName } from './poetDirectory';
import { AUTHOR_NAME_TO_ID, poemApi } from '@/api/poems';
import { apiClient } from '@/api/client';

export interface SmartSearchOptions {
  q: string;
  page?: number;
  pageSize?: number;
  dynasty?: string;
  type?: string;
  author?: string;
}

// Clean and normalize Chinese text for accurate matching
function normalize(str?: string): string {
  if (!str) return '';
  return str
    .replace(/[，。？！、；：“”‘’《》（）()·\s]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Calculate multi-dimensional relevance score between poem and search query
 */
export function calculatePoemRelevance(poem: Poem, rawQuery: string, isCurated = false): number {
  const q = rawQuery.trim();
  const normQ = normalize(q);
  if (!normQ) return 100; // Base score when no text query (filtering only)

  let score = 0;
  const normTitle = normalize(poem.title);
  const normAuthor = normalize(poem.author?.name);
  const contentLines = poem.content || [];

  // 1. Exact Title Match (Highest Priority: e.g. 搜「静夜思」，必须排第一)
  if (normTitle === normQ) {
    score += 20000;
  } else if (normTitle.startsWith(normQ)) {
    score += 12000;
  } else if (normTitle.includes(normQ)) {
    score += 8000;
  }

  // 2. Exact Author Match (e.g. 搜「李白」，李白的名作排最前)
  if (normAuthor === normQ) {
    score += 10000;
  } else if (normAuthor.includes(normQ)) {
    score += 5000;
  }

  // 3. Exact Verse / Line Match (e.g. 搜「明月几时有」或「床前明月光」)
  for (const line of contentLines) {
    const normLine = normalize(line);
    if (normLine === normQ) {
      score += 15000;
      break;
    } else if (normLine.startsWith(normQ)) {
      score += 9000;
    } else if (normLine.includes(normQ)) {
      score += 6000;
    }
  }

  // 4. Curated Canonical Masterpiece Bonus (优先呈现传世名篇，防止生僻杂诗排在前列)
  if (isCurated) {
    score += 3000;
  }

  // 5. Query character overlap ratio (Jaccard token matching)
  const queryChars = Array.from(normQ);
  if (queryChars.length > 0) {
    const matchedCharsInTitle = queryChars.filter((c) => normTitle.includes(c)).length;
    score += (matchedCharsInTitle / queryChars.length) * 1500;

    let matchedInContent = 0;
    const fullContent = normTitle + normAuthor + contentLines.map(normalize).join('');
    for (const char of queryChars) {
      if (fullContent.includes(char)) matchedInContent++;
    }
    score += (matchedInContent / queryChars.length) * 1000;
  }

  // 6. Dynasty & Type alignment
  if (poem.dynasty?.name && normQ.includes(normalize(poem.dynasty.name))) {
    score += 1000;
  }
  if (poem.type?.name && normQ.includes(normalize(poem.type.name))) {
    score += 1000;
  }

  return score;
}

/**
 * Deduplicate poems list by title + author
 */
export function deduplicatePoems(poems: Poem[]): Poem[] {
  const seen = new Set<string>();
  const result: Poem[] = [];

  for (const p of poems) {
    const key = `${normalize(p.title)}::${normalize(p.author?.name)}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(p);
    }
  }

  return result;
}

/**
 * High-Performance Smart Hybrid Search Engine
 */
export async function smartSearchPoems(options: SmartSearchOptions): Promise<ApiResponse<Poem[]> & { totalCount?: number }> {
  const { q, page = 1, pageSize = 20, dynasty, type, author } = options;
  const query = q.trim();

  if (!query && !dynasty && !type && !author) {
    return {
      data: [],
      pagination: { page: 1, pageSize, hasMore: false },
      lang: 'zh-Hans',
      totalCount: 0,
    };
  }

  const allCandidates: { poem: Poem; isCurated: boolean }[] = [];

  // A. Search in Local Curated Masterpieces
  for (const poet of FAMOUS_POETS_DIRECTORY) {
    for (const p of poet.poems) {
      if (dynasty && p.dynasty?.name !== dynasty) continue;
      if (type && p.type?.name !== type) continue;
      if (author && p.author?.name !== author) continue;

      if (!query) {
        allCandidates.push({ poem: p, isCurated: true });
        continue;
      }

      const score = calculatePoemRelevance(p, query, true);
      if (score > 0) {
        allCandidates.push({ poem: p, isCurated: true });
      }
    }
  }

  // B. Check if query is a poet's name or matches known Author ID
  const matchedAuthorId = AUTHOR_NAME_TO_ID[query] || (findPoetByName(query)?.id);
  if (matchedAuthorId) {
    try {
      const authorRes = await poemApi.getPoems({ authorId: matchedAuthorId, page: 1, pageSize: 50 });
      if (authorRes.data) {
        for (const p of authorRes.data) {
          allCandidates.push({ poem: p, isCurated: false });
        }
      }
    } catch {}
  }

  // C. Query Remote API when query has content
  if (query.length >= 2) {
    try {
      // If query is >= 3 chars, send directly to remote fulltext
      // If query is 2 chars, try sending exact term or expanded
      const queryToSend = query.length >= 3 ? query : `${query}诗`;
      const searchUrlParams = new URLSearchParams({
        q: queryToSend,
        page: '1',
        pageSize: '50',
      });

      const remoteRes = await apiClient<ApiResponse<Poem[]>>(`/api/search?${searchUrlParams.toString()}`, {
        cacheTtlMs: 5 * 60 * 1000,
      });

      if (remoteRes.data) {
        for (const p of remoteRes.data) {
          allCandidates.push({ poem: p, isCurated: false });
        }
      }
    } catch (e) {
      console.warn('Remote search fallback to local index:', e);
    }
  }

  // D. Deduplicate and Score
  const uniqueMap = new Map<string, { poem: Poem; isCurated: boolean }>();
  for (const item of allCandidates) {
    const key = `${normalize(item.poem.title)}::${normalize(item.poem.author?.name)}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    } else if (item.isCurated) {
      // Prioritize curated version if available
      uniqueMap.set(key, item);
    }
  }

  const scoredList = Array.from(uniqueMap.values())
    .map((item) => {
      let score = calculatePoemRelevance(item.poem, query, item.isCurated);
      // Filter criteria checks
      if (dynasty && item.poem.dynasty?.name !== dynasty) score = -1;
      if (type && item.poem.type?.name !== type) score = -1;
      if (author && item.poem.author?.name !== author) score = -1;
      return {
        poem: item.poem,
        score,
      };
    })
    .filter((item) => item.score > 0);

  // E. Sort strictly by relevance score descending
  scoredList.sort((a, b) => b.score - a.score);

  const sortedPoems = scoredList.map((item) => item.poem);
  const totalCount = sortedPoems.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagePoems = sortedPoems.slice(startIndex, endIndex);

  return {
    data: pagePoems,
    pagination: {
      page,
      pageSize,
      hasMore: page < totalPages,
    },
    totalCount,
    lang: 'zh-Hans',
  };
}
