import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';
import { PoemCard } from '@/components/Poem/PoemCard';
import { EmptyState } from '@/components/Common/EmptyState';
import { SealBadge } from '@/components/Common/SealBadge';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, clearFavorites, importFavorites } = useFavoriteStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDynasty, setSelectedDynasty] = useState<string | null>(null);

  // Extract available unique dynasties from favorites
  const dynasties = useMemo(() => {
    const set = new Set<string>();
    favorites.forEach((f) => {
      if (f.dynasty?.name) set.add(f.dynasty.name);
    });
    return Array.from(set);
  }, [favorites]);

  // Filtered favorites list
  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      if (selectedDynasty && item.dynasty?.name !== selectedDynasty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inAuthor = item.author?.name.toLowerCase().includes(q);
        const inLines = (item.content || []).some((l) => l.toLowerCase().includes(q));
        if (!inTitle && !inAuthor && !inLines) return false;
      }
      return true;
    });
  }, [favorites, selectedDynasty, searchQuery]);

  // Export favorites as JSON
  const handleExport = () => {
    const jsonStr = JSON.stringify(favorites, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `诗境_典藏文录_${new Date().toISOString().slice(0, 10)}.json`;
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
    if (window.confirm('确定要清空全部典藏记录吗？此操作不可撤销。')) {
      clearFavorites();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-fade-in pb-20">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper-300 dark:border-ink-800">
        <div>
          <div className="flex items-center gap-2">
            <SealBadge text="典藏" size="sm" variant="cinnabar" />
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-ink-900 dark:text-ink-50">
              我的诗词典藏本
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 font-serif mt-1">
            共珍藏 {favorites.length} 首古典名篇佳作
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Export JSON */}
          <button
            onClick={handleExport}
            disabled={favorites.length === 0}
            className="px-3.5 py-2 rounded-xl bg-paper-100 dark:bg-ink-800 hover:bg-paper-200 border border-paper-300 dark:border-ink-700 text-xs font-serif font-bold text-ink-700 dark:text-ink-200 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            title="导出全部典藏数据为 JSON 文件"
          >
            <Download className="w-3.5 h-3.5" />
            <span>导出藏本</span>
          </button>

          {/* Import JSON */}
          <label
            className="cursor-pointer px-3.5 py-2 rounded-xl bg-paper-100 dark:bg-ink-800 hover:bg-paper-200 border border-paper-300 dark:border-ink-700 text-xs font-serif font-bold text-ink-700 dark:text-ink-200 flex items-center gap-1.5 transition-colors"
            title="从本地 JSON 导入典藏数据"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>导入藏本</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          {/* Clear All */}
          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="p-2 rounded-xl hover:bg-red-500/10 text-ink-400 hover:text-red-500 transition-colors"
              title="清空全部典藏"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="尚无典藏诗篇"
          description="在诗库或首页品读诗词时，点击红心图标即可将名篇加入专属典藏本"
          actionText="前往诗库寻诗"
          onAction={() => navigate('/poems')}
        />
      ) : (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 xuan-card rounded-2xl p-4 border border-paper-400/40">
            {/* Search within favorites */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="在典藏中搜索篇名、诗人或诗句..."
                className="w-full pl-9 pr-4 py-2 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-xl text-xs sm:text-sm text-ink-900 dark:text-ink-50 focus:outline-hidden focus:border-chinese-cinnabar transition-colors"
              />
            </div>

            {/* Dynasty Chips */}
            {dynasties.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedDynasty(null)}
                  className={`px-3 py-1 rounded-lg text-xs font-serif transition-colors ${
                    selectedDynasty === null
                      ? 'bg-chinese-cinnabar text-white font-bold'
                      : 'bg-paper-200 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-300'
                  }`}
                >
                  全部
                </button>
                {dynasties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDynasty(d)}
                    className={`px-3 py-1 rounded-lg text-xs font-serif transition-colors ${
                      selectedDynasty === d
                        ? 'bg-chinese-cinnabar text-white font-bold'
                        : 'bg-paper-200 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-paper-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favorites List */}
          {filteredFavorites.length === 0 ? (
            <div className="text-center py-12 text-ink-400 font-serif text-sm">
              未找到匹配的典藏诗篇
            </div>
          ) : (
            <div className="space-y-4">
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
