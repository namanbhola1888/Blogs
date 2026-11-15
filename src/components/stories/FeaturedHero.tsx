import React from 'react';
import { Post } from '../../services/types';
import { useNavigation } from '../../context/NavigationContext';
import { useBookmarks } from '../../context/BookmarksContext';
import { format } from 'date-fns';
import { Clock, Calendar, ArrowRight, Bookmark } from 'lucide-react';

interface FeaturedHeroProps {
  post: Post;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({ post }) => {
  const { openStory, openCategory } = useNavigation();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(post.slug);

  const formattedDate = (() => {
    try {
      return format(new Date(post.publishedAt), 'MMMM d, yyyy');
    } catch (e) {
      return post.publishedAt;
    }
  })();

  return (
    <section className="mb-14 sm:mb-20">
      <div className="relative group rounded-xl overflow-hidden border border-parchment-300 dark:border-obsidian-800 bg-parchment-50 dark:bg-obsidian-950 transition-all hover:border-parchment-400 dark:hover:border-obsidian-700">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Visual Column */}
          <div
            onClick={() => openStory(post.slug)}
            className="lg:col-span-7 cursor-pointer overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[320px] lg:min-h-[460px] relative bg-parchment-200 dark:bg-obsidian-800"
          >
            <img
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-editorial-terracotta text-white">
                    Lead Essay
                  </span>
                  {post.categories[0] && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openCategory(post.categories[0].slug);
                      }}
                      className="text-xs uppercase tracking-wider font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark hover:underline"
                    >
                      {post.categories[0].title}
                    </button>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(post);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    bookmarked
                      ? 'text-editorial-terracotta'
                      : 'text-parchment-400 dark:text-obsidian-500 hover:text-parchment-800 dark:hover:text-parchment-200'
                  }`}
                  title={bookmarked ? 'Saved' : 'Save for later'}
                >
                  <Bookmark size={17} className={bookmarked ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Title */}
              <h2
                onClick={() => openStory(post.slug)}
                className="cursor-pointer font-serif text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-parchment-950 dark:text-parchment-50 leading-[1.2] mb-3 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors"
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="font-serif text-sm sm:text-base text-parchment-700 dark:text-obsidian-200 leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>
            </div>

            {/* Byline & Read Action */}
            <div className="pt-6 border-t border-parchment-200 dark:border-obsidian-800/80">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-parchment-300 dark:border-obsidian-700"
                  />
                  <div>
                    <div className="text-xs font-semibold text-parchment-900 dark:text-parchment-100">
                      {post.author.name}
                    </div>
                    <div className="text-[11px] text-parchment-500 dark:text-obsidian-400 flex items-center gap-2">
                      <time dateTime={post.publishedAt}>{formattedDate}</time>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock size={11} />
                        {post.readingTimeMinutes}m
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openStory(post.slug)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-parchment-900 text-parchment-50 dark:bg-parchment-100 dark:text-obsidian-950 hover:bg-editorial-terracotta dark:hover:bg-editorial-terracotta-dark dark:hover:text-white transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
