import React from 'react';
import { Post } from '../services/types';
import { useNavigation } from '../context/NavigationContext';
import { format } from 'date-fns';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface ArchivePageProps {
  posts: Post[];
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ posts }) => {
  const { openStory, goHome } = useNavigation();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <button
        onClick={goHome}
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-parchment-600 dark:text-obsidian-300 hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        <span>Return to Journal</span>
      </button>

      <header className="mb-12 pb-8 border-b border-parchment-300 dark:border-obsidian-800">
        <span className="text-xs uppercase tracking-widest font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark">
          Complete Inventory
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-parchment-950 dark:text-parchment-50 mt-1 mb-3">
          Chronological Archive
        </h1>
        <p className="font-serif text-sm sm:text-base text-parchment-700 dark:text-obsidian-300 max-w-xl">
          An exhaustive register of all published essays, inquiries, and field notes across all volumes.
        </p>
      </header>

      <div className="divide-y divide-parchment-300 dark:divide-obsidian-800">
        {posts.map((post) => {
          const dateStr = (() => {
            try {
              return format(new Date(post.publishedAt), 'MMMM d, yyyy');
            } catch (e) {
              return post.publishedAt;
            }
          })();

          return (
            <article
              key={post.id}
              onClick={() => openStory(post.slug)}
              className="py-6 group cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hover:bg-parchment-200/30 dark:hover:bg-obsidian-900/40 px-3 rounded transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 text-xs">
                  <span className="text-[11px] font-mono text-parchment-500 dark:text-obsidian-400">
                    {dateStr}
                  </span>
                  <span className="text-parchment-300 dark:text-obsidian-700">·</span>
                  <span className="text-[11px] uppercase tracking-wider text-editorial-terracotta dark:text-editorial-terracotta-dark font-medium">
                    {post.categories[0]?.title || 'Essay'}
                  </span>
                </div>

                <h3 className="font-serif font-semibold text-lg sm:text-xl text-parchment-950 dark:text-parchment-50 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="font-serif text-xs sm:text-sm text-parchment-600 dark:text-obsidian-300 line-clamp-1 mt-1">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs text-parchment-500 dark:text-obsidian-400">
                <span className="font-medium text-parchment-700 dark:text-obsidian-200">
                  {post.author.name}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock size={12} />
                  {post.readingTimeMinutes} min read
                </span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-editorial-terracotta" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
