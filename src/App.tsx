import React, { useState, useEffect } from 'react';
import { Post, Category } from './services/types';
import { getPosts, getCategories, getFeaturedPost, getSecondarySpotlights, getPostBySlug } from './services';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarksProvider } from './context/BookmarksContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { BookmarksDrawer } from './components/layout/BookmarksDrawer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArchivePage } from './pages/ArchivePage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { route } = useNavigation();

  // Global state
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [spotlights, setSpotlights] = useState<Post[]>([]);
  const [activeStoryPost, setActiveStoryPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  // Fetch initial journal data
  useEffect(() => {
    Promise.all([
      getPosts(),
      getCategories(),
      getFeaturedPost(),
      getSecondarySpotlights(2),
    ])
      .then(([allPosts, allCats, featured, spots]) => {
        setPosts(allPosts);
        setCategories(allCats);
        setFeaturedPost(featured);
        setSpotlights(spots);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load journal dispatches:', err);
        setLoading(false);
      });
  }, []);

  // When route changes to a story, fetch/set active post
  useEffect(() => {
    if (route.view === 'story' && route.params.slug) {
      const existing = posts.find((p) => p.slug === route.params.slug);
      if (existing) {
        setActiveStoryPost(existing);
      } else {
        getPostBySlug(route.params.slug).then((fetched) => {
          setActiveStoryPost(fetched);
        });
      }
    } else if (route.view === 'home') {
      document.title = 'Chronicle';
    } else if (route.view === 'about') {
      document.title = 'About — Chronicle';
    } else if (route.view === 'archive') {
      document.title = 'Archive — Chronicle';
    } else if (route.view === 'category' && route.params.slug) {
      const catName = route.params.slug.charAt(0).toUpperCase() + route.params.slug.slice(1);
      document.title = `${catName} — Chronicle`;
    }
  }, [route, posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-100 dark:bg-obsidian-900 flex flex-col items-center justify-center p-6 transition-colors">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 mx-auto rounded bg-parchment-900 dark:bg-parchment-100 text-parchment-50 dark:text-obsidian-950 font-serif font-bold text-xl italic flex items-center justify-center animate-pulse">
            C
          </div>
          <div className="font-serif text-lg tracking-widest uppercase text-parchment-800 dark:text-parchment-200">
            Chronicle
          </div>
          <p className="text-xs font-mono text-parchment-500 dark:text-obsidian-400">
            Opening archives...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-parchment-100 text-parchment-900 dark:bg-obsidian-900 dark:text-parchment-100 transition-colors duration-200">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />

      <div className="flex-1">
        {route.view === 'home' && (
          <HomePage
            posts={posts}
            categories={categories}
            featuredPost={featuredPost}
            spotlights={spotlights}
          />
        )}

        {route.view === 'story' && (
          activeStoryPost ? (
            <ArticlePage post={activeStoryPost} />
          ) : (
            <div className="max-w-2xl mx-auto py-24 px-4 text-center">
              <h2 className="font-serif text-2xl font-bold mb-2">Dispatch not found</h2>
              <p className="text-xs text-parchment-600 dark:text-obsidian-400">
                The article you requested could not be located in the archives.
              </p>
            </div>
          )
        )}

        {route.view === 'category' && route.params.slug && (
          <CategoryPage categorySlug={route.params.slug} />
        )}

        {route.view === 'archive' && (
          <ArchivePage posts={posts} />
        )}

        {route.view === 'about' && (
          <AboutPage />
        )}
      </div>

      <Footer categories={categories} />

      {/* Global Overlays */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        posts={posts}
      />

      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BookmarksProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </BookmarksProvider>
    </ThemeProvider>
  );
};

export default App;
