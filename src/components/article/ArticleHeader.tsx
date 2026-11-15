import React from 'react';
import { Post } from '../../services/types';
import { format } from 'date-fns';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ArticleHeaderProps {
  post: Post;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ post }) => {
  const { goHome, openCategory } = useNavigation();

  const formattedDate = (() => {
    try {
      return format(new Date(post.publishedAt), 'MMMM d, yyyy');
    } catch (e) {
      return post.publishedAt;
    }
  })();

  return (
    <header className="mb-8 sm:mb-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 text-xs uppercase tracking-widest text-parchment-600 dark:text-obsidian-300">
        <button
          onClick={goHome}
          className="inline-flex items-center gap-1.5 hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Journal</span>
        </button>

        <div className="flex items-center gap-2">
          {post.issueNumber && (
            <span className="font-serif italic capitalize tracking-normal text-parchment-500 dark:text-obsidian-400">
              {post.issueNumber}
            </span>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {post.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => openCategory(category.slug)}
            className="text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded bg-parchment-200 dark:bg-obsidian-800 text-parchment-800 dark:text-parchment-200 hover:bg-parchment-300 dark:hover:bg-obsidian-700 transition-colors"
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-semibold text-parchment-950 dark:text-parchment-50 leading-[1.15] tracking-tight mb-4 sm:mb-6">
        {post.title}
      </h1>

      {/* Subtitle / Deck */}
      {post.subtitle && (
        <p className="text-lg sm:text-xl md:text-2xl font-serif text-parchment-700 dark:text-obsidian-200 leading-relaxed font-normal mb-8 max-w-3xl">
          {post.subtitle}
        </p>
      )}

      {/* Author Byline & Publication Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-parchment-300 dark:border-obsidian-800 text-sm">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-11 h-11 rounded-full object-cover border border-parchment-300 dark:border-obsidian-700"
          />
          <div>
            <div className="font-medium text-parchment-900 dark:text-parchment-100">
              {post.author.name}
            </div>
            <div className="text-xs text-parchment-600 dark:text-obsidian-300">
              {post.author.role}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm text-parchment-600 dark:text-obsidian-300">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="opacity-70" />
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </span>
          <span className="text-parchment-400 dark:text-obsidian-600">·</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="opacity-70" />
            <span>{post.readingTimeMinutes} min read</span>
          </span>
        </div>
      </div>
    </header>
  );
};
