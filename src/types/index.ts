// Unified TypeScript Definitions for Shici Realm

export interface AuthorRef {
  id: number;
  name: string;
}

export interface DynastyRef {
  id: number;
  name: string;
}

export interface PoemTypeRef {
  id: number;
  name: string;
}

export interface Poem {
  id: number;
  title: string;
  content: string[];
  author: AuthorRef;
  dynasty: DynastyRef;
  type: PoemTypeRef;
}

export interface Author {
  id: number;
  name: string;
  description: string | null;
  dynasty: DynastyRef;
  poemCount?: number;
}

export interface Dynasty {
  id: number;
  name: string;
  name_en?: string;
  start_year?: number | null;
  end_year?: number | null;
}

export interface PoemType {
  id: number;
  name: string;
  category?: string;
  lines?: number | null;
  chars_per_line?: number | null;
  description?: string;
}

export interface Stats {
  poems: number;
  authors: number;
  dynasties: number;
  types: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
  lang?: string;
  error?: {
    code: string;
    message: string;
  };
}

export interface FavoriteItem {
  id: number;
  title: string;
  author: AuthorRef;
  dynasty: DynastyRef;
  type: PoemTypeRef;
  content: string[];
  createdAt: number;
}

export interface HistoryItem {
  id: number;
  title: string;
  author: AuthorRef;
  dynasty: DynastyRef;
  type?: PoemTypeRef;
  snippet?: string;
  viewedAt: number;
}

export interface KeyLineExplanation {
  line: string;
  explanation: string;
}

export interface AiAnalysis {
  translation: string;
  background: string;
  appreciation: string;
  keyLines: KeyLineExplanation[];
  sentiment?: string;
  artisticFeatures?: string[];
}

export interface AiChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export type ThemePalette = 'paper' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type LineHeight = 'normal' | 'relaxed' | 'loose';
export type TextFont = 'serif' | 'sans' | 'kaiti';
export type TextAlign = 'center' | 'left';

export interface ReaderSettings {
  fontSize: FontSize;
  lineHeight: LineHeight;
  fontFamily: TextFont;
  theme: ThemePalette;
  zenMode: boolean;
  textAlign: TextAlign;
}
