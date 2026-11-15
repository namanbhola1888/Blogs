import React, { createContext, useContext, useEffect, useState } from 'react';
import { Post } from '../services/types';

interface BookmarksContextType {
  bookmarks: Post[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (post: Post) => void;
  removeBookmark: (slug: string) => void;
  clearAllBookmarks: () => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

const STORAGE_KEY = 'chronicle_reading_list';

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Post[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load bookmarks', e);
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  const isBookmarked = (slug: string) => {
    return bookmarks.some((p) => p.slug === slug);
  };

  const toggleBookmark = (post: Post) => {
    setBookmarks((prev) => {
      const exists = prev.some((p) => p.slug === post.slug);
      if (exists) {
        return prev.filter((p) => p.slug !== post.slug);
      } else {
        return [post, ...prev];
      }
    });
  };

  const removeBookmark = (slug: string) => {
    setBookmarks((prev) => prev.filter((p) => p.slug !== slug));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearAllBookmarks }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = (): BookmarksContextType => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};
