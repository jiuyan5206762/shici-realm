import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Search,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';
import { PoemCard } from '@/components/Poem/PoemCard';
import { EmptyState } from '@/components/Common/EmptyState';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, clearFavorites, importFavorites } = useFavoriteStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDynasty, setSelectedDynasty] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Extract available unique dynasties & types from favorites
  const dynasties = useMemo(() => {
    const set = new Set<string>();
    favorites.forEach((f) => {
      if (f.dynasty?.name) set.add(f.dynasty.name);
    });
    return Array.from(set);
  }, [favorites]);

  const types = useMemo(() => {
    const set = new Set<string>();
    favorites.forEach((f) => {
      if (f.type?.name) set.add(f.type.name);
    });
    return Array.from(set);
  }, [favorites]);

  // Filtered favorites list
  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      if (selectedDynasty && item.dynasty?.name !== selectedDynasty) return false;
      if (selectedType && item.type?.name !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inAuthor = item.author?.name.toLowerCase().includes(q);
        const inLines = (item.content || []).some((l) => l.toLowerCase().includes(q));
        if (!inTitle && !inAuthor && !inLines) return false;
      }
      return true;
    });
  }, [favorites, selectedDynasty, selectedType, searchQuery]);

  // Export favorites as JSON
  const handleExport = () => {
    const jsonStr = JSON.stringify(favorites, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `诗境_收藏古诗_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON favorites
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          importFavorites(parsed);
          alert(`成功导入 ${parsed.length} 首古诗`);
        }
      } catch {
        alert('文件格式解析失败，请确保导入标准 JSON 备份文件');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    if (window.confirm('确定要清空全部收藏记录吗？此操作不可撤销。')) {
      clearFavorites();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-900 dark:text-ink-50 flex items-center space-x-3">
            <Bookmark className="w-8 h-8 text-chinese-cinnabar" />
            <span>我的诗词典藏</span>
          </h1>
          <p className="text-base text-ink-600 dark:text-ink-300 mt-2 font-serif">
            共珍藏 {favorites.length} 首传世佳作
          </p>
        </div>

        {/* Action Group */}
        {favorites.length > 0 && (
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Export JSON */}
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#1E1E22] border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-medium text-ink-700 dark:text-ink-200 flex items-center space-x-1.5 transition-colors shadow-sm"
              title="导出收藏为 JSON 文件"
            >
              <Download className="w-4 h-4" />
              <span>导出</span>
            </button>

            {/* Import JSON */}
            <label className="px-4 py-2 rounded-xl bg-white dark:bg-[#1E1E22] border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-medium text-ink-700 dark:text-ink-200 flex items-center space-x-1.5 transition-colors shadow-sm cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>导入</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            {/* Clear All */}
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center space-x-1.5 transition-colors"
              title="清空全部收藏"
            >
              <Trash2 className="w-4 h-4" />
              <span>清空</span>
            </button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="w-10 h-10 text-stone-400" />}
          title="您还没有收藏任何诗词"
          description="在浏览古诗或阅读详情时点击心形图标即可永久保存在您的设备中"
          actionText="前往发现喜欢的诗篇"
          onAction={() => navigate('/poems')}
        />
      ) : (
        <div className="space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-white dark:bg-[#1E1E22] border border-stone-200/90 dark:border-stone-800 rounded-2xl shadow-sm">
            {/* Search within favorites */}
            <div className="relative w-full md:max-w-xs">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索收藏的诗名、作者..."
                className="w-full pl-10 pr-3 py-2 text-sm bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-1 focus:ring-chinese-ochre font-serif"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center space-x-3 overflow-x-auto w-full md:w-auto text-sm no-scrollbar font-serif">
              {/* Dynasty Filter */}
              {dynasties.length > 1 && (
                <div className="flex items-center space-x-1.5">
                  <span className="text-ink-500">朝代:</span>
                  <select
                    value={selectedDynasty || ''}
                    onChange={(e) => setSelectedDynasty(e.target.value || null)}
                    className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-1.5 text-sm text-ink-800 dark:text-ink-200"
                  >
                    <option value="">全部朝代</option>
                    {dynasties.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Type Filter */}
              {types.length > 1 && (
                <div className="flex items-center space-x-1.5">
                  <span className="text-ink-500">体裁:</span>
                  <select
                    value={selectedType || ''}
                    onChange={(e) => setSelectedType(e.target.value || null)}
                    className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-1.5 text-sm text-ink-800 dark:text-ink-200"
                  >
                    <option value="">全部体裁</option>
                    {types.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(selectedDynasty || selectedType || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedDynasty(null);
                    setSelectedType(null);
                    setSearchQuery('');
                  }}
                  className="text-chinese-ochre hover:underline text-sm font-medium"
                >
                  重置
                </button>
              )}
            </div>
          </div>

          {/* Favorites List */}
          {filteredFavorites.length === 0 ? (
            <EmptyState
              title="未找到匹配的收藏记录"
              description="尝试调整搜索关键词或朝代/体裁筛选"
              actionText="清空筛选"
              onAction={() => {
                setSelectedDynasty(null);
                setSelectedType(null);
                setSearchQuery('');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
