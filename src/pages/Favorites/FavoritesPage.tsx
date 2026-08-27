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
import { guqinAudio } from '@/services/audio/guqinAudio';

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
    guqinAudio.playChime();
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
          guqinAudio.playVictory();
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
      guqinAudio.playChime();
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
          <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 mt-1 font-serif">
            共收录 {favorites.length} 篇心仪佳作 · 支持离线阅读与导出备份
          </p>
        </div>

        {/* Top Actions */}
        {favorites.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-3.5 py-2 rounded-xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-serif text-ink-700 dark:text-ink-300 hover:bg-paper-200 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出备份</span>
            </button>

            <label className="px-3.5 py-2 rounded-xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-serif text-ink-700 dark:text-ink-300 hover:bg-paper-200 flex items-center gap-1.5 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>导入</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={handleClearAll}
              className="p-2 rounded-xl border border-paper-300 dark:border-ink-700 text-ink-400 hover:text-chinese-cinnabar transition-colors"
              title="清空全部典藏"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* When Empty */}
      {favorites.length === 0 ? (
        <EmptyState
          title="尚无典藏诗篇"
          description="在品读诗词时点击心形图标，即可收入您的私享典藏本。"
          actionText="前往文苑品读"
          onAction={() => navigate('/poems')}
        />
      ) : (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="在典藏中搜索..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-serif focus:outline-hidden focus:border-chinese-cinnabar"
              />
            </div>

            {/* Quick Dynasty Filter */}
            {dynasties.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
                <button
                  onClick={() => setSelectedDynasty(null)}
                  className={`px-3 py-1 rounded-lg text-xs font-serif transition-colors ${
                    !selectedDynasty
                      ? 'bg-chinese-cinnabar text-white font-bold'
                      : 'bg-paper-100 dark:bg-ink-800 text-ink-600'
                  }`}
                >
                  全部朝代
                </button>
                {dynasties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDynasty(selectedDynasty === d ? null : d)}
                    className={`px-3 py-1 rounded-lg text-xs font-serif transition-colors ${
                      selectedDynasty === d
                        ? 'bg-chinese-cinnabar text-white font-bold'
                        : 'bg-paper-100 dark:bg-ink-800 text-ink-600'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
