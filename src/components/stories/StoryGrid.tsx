import React from 'react';
import { Post } from '../../services/types';
import { StoryCard } from './StoryCard';
import { Inbox } from 'lucide-react';

interface StoryGridProps {
  posts: Post[];
  onResetFilters?: () => void;
}

export const StoryGrid: React.FC<StoryGridProps> = ({ posts, onResetFilters }) => {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center rounded-xl border border-dashed border-parchment-300 dark:border-obsidian-800 p-8 my-8">
        <Inbox size={36} className="mx-auto text-parchment-400 dark:text-obsidian-600 mb-3" />
        <h3 className="font-serif text-xl font-semibold text-parchment-900 dark:text-parchment-100 mb-1">
          No dispatches match your query
        </h3>
        <p className="text-xs font-serif text-parchment-600 dark:text-obsidian-400 max-w-sm mx-auto mb-6">
          We could not find any essays under this specific combination of criteria.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-parchment-900 text-white dark:bg-parchment-100 dark:text-obsidian-950 hover:bg-editorial-terracotta dark:hover:bg-editorial-terracotta-dark dark:hover:text-white transition-colors"
          >
            Show All Dispatches
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {posts.map((post) => (
        <StoryCard key={post.id} post={post} />
      ))}
    </div>
  );
};
