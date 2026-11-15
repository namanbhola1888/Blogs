import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useBookmarks } from '../../context/BookmarksContext';
import { useNavigation } from '../../context/NavigationContext';
import { Sun, Moon, Search, Bookmark, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenBookmarks }) => {
  const { theme, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const { goHome, navigate, route } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-parchment-100/90 dark:bg-obsidian-900/90 backdrop-blur-md border-b border-parchment-300 dark:border-obsidian-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand Identity */}
          <div className="flex items-center gap-6">
            <button
              onClick={goHome}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-8 h-8 rounded bg-parchment-900 dark:bg-parchment-100 flex items-center justify-center text-parchment-50 dark:text-obsidian-950 font-serif font-bold text-lg italic transition-transform group-hover:scale-105">
                C
              </div>
              <div>
                <span className="font-serif font-bold text-xl tracking-wider text-parchment-950 dark:text-parchment-50 block leading-tight">
                  CHRONICLE
                </span>
                <span className="text-[10px] uppercase tracking-widest text-parchment-500 dark:text-obsidian-400 block -mt-0.5">
                  Journal of Ideas
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 pl-4 border-l border-parchment-300 dark:border-obsidian-800 text-xs font-medium uppercase tracking-wider text-parchment-700 dark:text-obsidian-200">
              <button
                onClick={goHome}
                className={`px-3 py-1.5 rounded transition-colors ${
                  route.view === 'home'
                    ? 'text-editorial-terracotta dark:text-editorial-terracotta-dark font-semibold'
                    : 'hover:text-parchment-950 dark:hover:text-white'
                }`}
              >
                Dispatches
              </button>
              <button
                onClick={() => navigate('/archive')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  route.view === 'archive'
                    ? 'text-editorial-terracotta dark:text-editorial-terracotta-dark font-semibold'
                    : 'hover:text-parchment-950 dark:hover:text-white'
                }`}
              >
                Index & Archive
              </button>
              <button
                onClick={() => navigate('/about')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  route.view === 'about'
                    ? 'text-editorial-terracotta dark:text-editorial-terracotta-dark font-semibold'
                    : 'hover:text-parchment-950 dark:hover:text-white'
                }`}
              >
                Masthead & Manifesto
              </button>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs text-parchment-600 dark:text-obsidian-300 hover:bg-parchment-200 dark:hover:bg-obsidian-800 transition-colors border border-parchment-300/60 dark:border-obsidian-700/60"
              title="Search articles (Ctrl+K / ⌘K)"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-parchment-200 dark:bg-obsidian-800 text-parchment-500 dark:text-obsidian-400 border border-parchment-300 dark:border-obsidian-700">
                ⌘K
              </kbd>
            </button>

            {/* Reading List Drawer Trigger */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-full text-parchment-700 dark:text-obsidian-200 hover:bg-parchment-200 dark:hover:bg-obsidian-800 transition-colors"
              title="Saved Reading List"
            >
              <Bookmark size={18} />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-editorial-terracotta text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-parchment-700 dark:text-obsidian-200 hover:bg-parchment-200 dark:hover:bg-obsidian-800 transition-colors"
              title={theme === 'dark' ? 'Switch to warm light mode' : 'Switch to charcoal dark mode'}
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded text-parchment-700 dark:text-obsidian-200 hover:bg-parchment-200 dark:hover:bg-obsidian-800"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-parchment-300 dark:border-obsidian-800 space-y-2 text-sm font-serif">
            <button
              onClick={() => {
                goHome();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded hover:bg-parchment-200 dark:hover:bg-obsidian-800 text-parchment-900 dark:text-parchment-100"
            >
              Dispatches & Essays
            </button>
            <button
              onClick={() => {
                navigate('/archive');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded hover:bg-parchment-200 dark:hover:bg-obsidian-800 text-parchment-900 dark:text-parchment-100"
            >
              Index & Archive
            </button>
            <button
              onClick={() => {
                navigate('/about');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded hover:bg-parchment-200 dark:hover:bg-obsidian-800 text-parchment-900 dark:text-parchment-100"
            >
              Editorial Manifesto
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
