import React from 'react';
import { Post } from '../../services/types';
import { useNavigation } from '../../context/NavigationContext';
import { useBookmarks } from '../../context/BookmarksContext';
import { format } from 'date-fns';
import { Clock, Bookmark } from 'lucide-react';

interface StoryCardProps {
  post: Post;
  priority?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({ post }) => {
  const { openStory, openCategory } = useNavigation();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(post.slug);

  const formattedDate = (() => {
    try {
      return format(new Date(post.publishedAt), 'MMM d, yyyy');
    } catch (e) {
      return post.publishedAt;
    }
  })();

  return (
    <article className="group flex flex-col justify-between rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50/70 dark:bg-obsidian-950/70 hover:border-parchment-400 dark:hover:border-obsidian-700 transition-all duration-300 p-4 sm:p-5">
      <div>
        {/* Cover Image */}
        <div
          onClick={() => openStory(post.slug)}
          className="relative aspect-[16/10] overflow-hidden rounded-md mb-4 bg-parchment-200 dark:bg-obsidian-800 cursor-pointer"
        >
          <img
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(post);
            }}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-editorial-terracotta text-white'
                : 'bg-parchment-900/40 text-white hover:bg-parchment-900/70'
            }`}
            title={bookmarked ? 'Saved' : 'Save for later'}
          >
            <Bookmark size={14} className={bookmarked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Section Pill */}
        <div className="flex items-center gap-2 mb-2">
          {post.categories[0] && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                openCategory(post.categories[0].slug);
              }}
              className="text-[10px] uppercase tracking-wider font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark hover:underline"
            >
              {post.categories[0].title}
            </button>
          )}
          {post.issueNumber && (
            <>
              <span className="text-parchment-300 dark:text-obsidian-700">·</span>
              <span className="text-[10px] font-mono text-parchment-500 dark:text-obsidian-400">
                {post.issueNumber}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => openStory(post.slug)}
          className="cursor-pointer font-serif font-bold text-lg sm:text-xl text-parchment-950 dark:text-parchment-50 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors line-clamp-2 leading-snug mb-2.5"
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-serif text-xs sm:text-sm text-parchment-600 dark:text-obsidian-300 line-clamp-3 leading-relaxed mb-6">
          {post.excerpt}
        </p>
      </div>

      {/* Footer Author & Metadata */}
      <div className="pt-3 border-t border-parchment-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-6 h-6 rounded-full object-cover border border-parchment-300 dark:border-obsidian-700"
          />
          <span className="font-medium text-parchment-800 dark:text-parchment-200 text-xs truncate max-w-[120px]">
            {post.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-parchment-500 dark:text-obsidian-400 font-mono">
          <span>{formattedDate}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5">
            <Clock size={11} />
            <span>{post.readingTimeMinutes}m</span>
          </span>
        </div>
      </div>
    </article>
  );
};
