import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../../services/types';
import { useNavigation } from '../../context/NavigationContext';
import { Search, X, Clock, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, posts }) => {
  const [query, setQuery] = useState('');
  const { openStory } = useNavigation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPosts = query.trim() === ''
    ? []
    : posts.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.subtitle?.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.author.name.toLowerCase().includes(q) ||
          post.categories.some((c) => c.title.toLowerCase().includes(q)) ||
          post.tags.some((t) => t.title.toLowerCase().includes(q))
        );
      });

  const handleSelectStory = (slug: string) => {
    openStory(slug);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-parchment-900/60 dark:bg-black/70 backdrop-blur-sm flex justify-center items-start">
      <div
        className="w-full max-w-2xl rounded-xl border border-parchment-300 dark:border-obsidian-700 bg-parchment-100 dark:bg-obsidian-900 shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-parchment-300 dark:border-obsidian-800 gap-3">
          <Search size={18} className="text-parchment-500 dark:text-obsidian-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dispatches, authors, concepts, or categories..."
            className="flex-1 bg-transparent text-sm sm:text-base text-parchment-950 dark:text-parchment-50 placeholder-parchment-500 dark:placeholder-obsidian-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-parchment-200 dark:hover:bg-obsidian-800 text-parchment-500 dark:text-obsidian-400"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-parchment-200 dark:bg-obsidian-800 text-parchment-600 dark:text-obsidian-300 hover:text-parchment-900 dark:hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-parchment-500 dark:text-obsidian-400">
              <p className="font-serif italic text-sm mb-2">Type to explore our archive of essays and dispatches.</p>
              <p className="font-mono text-[11px]">Search by keyword, author name, or topic like "silence", "typography", or "local-first".</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-8 text-center text-xs text-parchment-500 dark:text-obsidian-400">
              <p className="font-serif italic text-base mb-1">No dispatches found matching "{query}"</p>
              <p>Try searching for broader terms or exploring sections from the masthead.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-parchment-500 dark:text-obsidian-400">
                Found {filteredPosts.length} dispatch{filteredPosts.length === 1 ? '' : 'es'}
              </div>
              {filteredPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handleSelectStory(post.slug)}
                  className="w-full text-left p-3 rounded-lg hover:bg-parchment-200/70 dark:hover:bg-obsidian-800/80 transition-colors flex items-start justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {post.categories[0] && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark">
                          {post.categories[0].title}
                        </span>
                      )}
                      <span className="text-parchment-400 dark:text-obsidian-600 text-xs">·</span>
                      <span className="text-[11px] text-parchment-600 dark:text-obsidian-400">
                        {post.author.name}
                      </span>
                    </div>

                    <h4 className="font-serif font-semibold text-base text-parchment-950 dark:text-parchment-100 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors line-clamp-1">
                      {post.title}
                    </h4>

                    <p className="text-xs font-serif text-parchment-600 dark:text-obsidian-300 line-clamp-1 mt-0.5">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 text-xs text-parchment-500 dark:text-obsidian-400">
                    <span className="hidden sm:flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readingTimeMinutes}m</span>
                    </span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-editorial-terracotta" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
