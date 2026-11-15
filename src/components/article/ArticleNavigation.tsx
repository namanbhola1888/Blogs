import React from 'react';
import { Post } from '../../services/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ArticleNavigationProps {
  prev: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
  next: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
}

export const ArticleNavigation: React.FC<ArticleNavigationProps> = ({ prev, next }) => {
  const { openStory } = useNavigation();

  if (!prev && !next) return null;

  return (
    <nav className="my-12 pt-8 border-t border-parchment-300 dark:border-obsidian-800" aria-label="Adjacent Articles">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prev ? (
          <button
            onClick={() => openStory(prev.slug)}
            className="group text-left p-5 rounded-lg border border-parchment-300 dark:border-obsidian-800 hover:border-parchment-400 dark:hover:border-obsidian-700 bg-parchment-200/40 dark:bg-obsidian-900/40 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-parchment-600 dark:text-obsidian-300 mb-2">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              <span>Previous Dispatch</span>
            </div>
            <h4 className="font-serif text-lg font-medium text-parchment-900 dark:text-parchment-100 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors line-clamp-2">
              {prev.title}
            </h4>
          </button>
        ) : (
          <div className="hidden md:block" />
        )}

        {next && (
          <button
            onClick={() => openStory(next.slug)}
            className="group text-right p-5 rounded-lg border border-parchment-300 dark:border-obsidian-800 hover:border-parchment-400 dark:hover:border-obsidian-700 bg-parchment-200/40 dark:bg-obsidian-900/40 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-wider text-parchment-600 dark:text-obsidian-300 mb-2">
              <span>Next Dispatch</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-serif text-lg font-medium text-parchment-900 dark:text-parchment-100 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors line-clamp-2">
              {next.title}
            </h4>
          </button>
        )}
      </div>
    </nav>
  );
};
