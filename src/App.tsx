import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Common/Navbar';
import { Footer } from '@/components/Common/Footer';
import { MobileTabBar } from '@/components/Common/MobileTabBar';
import { BgmPlayer } from '@/components/Common/BgmPlayer';
import { HomePage } from '@/pages/Home/HomePage';
import { PoemsPage } from '@/pages/Poems/PoemsPage';
import { PoemDetailPage } from '@/pages/PoemDetail/PoemDetailPage';
import { AuthorsPage } from '@/pages/Authors/AuthorsPage';
import { AuthorDetailPage } from '@/pages/AuthorDetail/AuthorDetailPage';
import { DynastiesPage } from '@/pages/Dynasties/DynastiesPage';
import { TypesPage } from '@/pages/Types/TypesPage';
import { SearchPage } from '@/pages/Search/SearchPage';
import { FavoritesPage } from '@/pages/Favorites/FavoritesPage';
import { HistoryPage } from '@/pages/History/HistoryPage';
import { SettingsPage } from '@/pages/Settings/SettingsPage';
import { FeihuaPage } from '@/pages/Feihua/FeihuaPage';
import { useThemeStore } from '@/store/themeStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { poemApi } from '@/api/poems';
import { guqinAudio } from '@/services/audio/guqinAudio';

// Scroll to top helper component
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

export const App: React.FC = () => {
  const navigate = useNavigate();
  const initTheme = useThemeStore((state) => state.initTheme);

  // Initialize theme on mount
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Global keyboard shortcuts
  useKeyboardShortcuts({
    onSearchFocus: () => navigate('/search'),
    onRandomPoem: async () => {
      try {
        guqinAudio.playChime();
        const res = await poemApi.getRandom();
        if (res.data?.id) {
          navigate(`/poems/${res.data.id}`);
        }
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-chinese-cinnabar/20 selection:text-chinese-cinnabar">
      <ScrollToTop />
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/poems" element={<PoemsPage />} />
          <Route path="/poems/:id" element={<PoemDetailPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/authors/:id" element={<AuthorDetailPage />} />
          <Route path="/dynasties" element={<DynastiesPage />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/feihua" element={<FeihuaPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Fallback 404 route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Background Music Floating Player */}
      <BgmPlayer />

      {/* Desktop Footer */}
      <Footer />

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar />
    </div>
  );
};

export default App;
