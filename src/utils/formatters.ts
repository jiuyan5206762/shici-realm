// Formatting utilities

export function formatYearRange(startYear?: number | null, endYear?: number | null): string {
  if (startYear === null || startYear === undefined || endYear === null || endYear === undefined) {
    return '';
  }

  const formatYear = (y: number) => {
    if (y < 0) return `公元前${Math.abs(y)}年`;
    return `公元${y}年`;
  };

  return `${formatYear(startYear)} ~ ${formatYear(endYear)}`;
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`;
  if (diff < 7 * day) return `${Math.floor(diff / day)} 天前`;
  
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function groupHistoryByDate<T extends { viewedAt: number }>(items: T[]): { label: string; items: T[] }[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 24 * 60 * 60 * 1000;
  const lastWeek = today - 7 * 24 * 60 * 60 * 1000;

  const groups: { [key: string]: T[] } = {
    '今天': [],
    '昨天': [],
    '最近七天': [],
    '更早': [],
  };

  items.forEach((item) => {
    if (item.viewedAt >= today) {
      groups['今天'].push(item);
    } else if (item.viewedAt >= yesterday) {
      groups['昨天'].push(item);
    } else if (item.viewedAt >= lastWeek) {
      groups['最近七天'].push(item);
    } else {
      groups['更早'].push(item);
    }
  });

  return Object.entries(groups)
    .filter(([_, groupItems]) => groupItems.length > 0)
    .map(([label, groupItems]) => ({ label, items: groupItems }));
}

export function getDynastyColorClass(dynastyName: string): { bg: string; text: string; border: string } {
  switch (dynastyName) {
    case '唐':
      return { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700/50' };
    case '宋':
      return { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700/50' };
    case '两汉':
    case '先秦':
      return { bg: 'bg-rose-500/10 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-300 dark:border-rose-700/50' };
    case '魏晋':
    case '南北朝':
      return { bg: 'bg-indigo-500/10 dark:bg-indigo-500/20', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-300 dark:border-indigo-700/50' };
    case '元':
      return { bg: 'bg-sky-500/10 dark:bg-sky-500/20', text: 'text-sky-700 dark:text-sky-300', border: 'border-sky-300 dark:border-sky-700/50' };
    case '清':
      return { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-700/50' };
    default:
      return { bg: 'bg-stone-500/10 dark:bg-stone-500/20', text: 'text-stone-700 dark:text-stone-300', border: 'border-stone-300 dark:border-stone-700/50' };
  }
}
