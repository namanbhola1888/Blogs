import React from 'react';
import { useBookmarks } from '../../context/BookmarksContext';
import { useNavigation } from '../../context/NavigationContext';
import { X, Trash2, ArrowRight, BookOpen, Clock } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({ isOpen, onClose }) => {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks();
  const { openStory } = useNavigation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-parchment-900/50 dark:bg-black/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md h-full bg-parchment-100 dark:bg-obsidian-900 border-l border-parchment-300 dark:border-obsidian-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-parchment-300 dark:border-obsidian-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-editorial-terracotta dark:text-editorial-terracotta-dark" />
            <h3 className="font-serif font-semibold text-lg text-parchment-950 dark:text-parchment-50">
              Personal Reading List
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-200 dark:bg-obsidian-800 text-parchment-700 dark:text-obsidian-300 font-mono">
              {bookmarks.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-parchment-200 dark:hover:bg-obsidian-800 text-parchment-600 dark:text-obsidian-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-parchment-500 dark:text-obsidian-400">
              <BookOpen size={36} className="opacity-30 mb-3" />
              <p className="font-serif text-base italic mb-1 text-parchment-700 dark:text-obsidian-200">
                Your reading list is empty.
              </p>
              <p className="text-xs max-w-xs">
                Click the "Save for Later" icon on any essay to queue articles for distraction-free reading.
              </p>
            </div>
          ) : (
            bookmarks.map((post) => (
              <div
                key={post.id}
                className="group p-3.5 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50/70 dark:bg-obsidian-950/60 hover:border-parchment-400 dark:hover:border-obsidian-700 transition-all"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden bg-parchment-200 dark:bg-obsidian-800 shrink-0">
                    <img
                      src={post.coverImage.url}
                      alt={post.coverImage.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-parchment-500 dark:text-obsidian-400 mb-1">
                      <span>{post.categories[0]?.title || 'Essay'}</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock size={10} />
                        {post.readingTimeMinutes}m
                      </span>
                    </div>

                    <h4
                      onClick={() => {
                        openStory(post.slug);
                        onClose();
                      }}
                      className="font-serif text-sm font-semibold text-parchment-950 dark:text-parchment-100 line-clamp-2 cursor-pointer hover:text-editorial-terracotta transition-colors leading-snug"
                    >
                      {post.title}
                    </h4>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-parchment-200 dark:border-obsidian-800/80 text-xs text-parchment-600 dark:text-obsidian-400">
                      <span className="text-[11px] truncate">{post.author.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeBookmark(post.slug)}
                          className="p-1 text-parchment-400 hover:text-editorial-terracotta transition-colors"
                          title="Remove from list"
                        >
                          <Trash2 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            openStory(post.slug);
                            onClose();
                          }}
                          className="flex items-center gap-0.5 text-xs font-medium text-editorial-terracotta hover:underline"
                        >
                          <span>Read</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-parchment-300 dark:border-obsidian-800 flex justify-between items-center text-xs">
            <button
              onClick={clearAllBookmarks}
              className="text-parchment-500 dark:text-obsidian-400 hover:text-editorial-terracotta transition-colors"
            >
              Clear reading list
            </button>
            <span className="text-parchment-400 dark:text-obsidian-500 font-mono text-[11px]">
              Stored locally on device
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
