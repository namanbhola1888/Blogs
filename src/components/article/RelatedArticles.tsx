import React from 'react';
import { Post } from '../../services/types';
import { useNavigation } from '../../context/NavigationContext';
import { Clock } from 'lucide-react';

interface RelatedArticlesProps {
  posts: Post[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ posts }) => {
  const { openStory, openCategory } = useNavigation();

  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-16 pt-12 border-t-2 border-parchment-300 dark:border-obsidian-800">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark">
            Curated Selection
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-parchment-950 dark:text-parchment-50 mt-1">
            Further Inquiries & Essays
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => openStory(post.slug)}
            className="group cursor-pointer flex flex-col justify-between p-4 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50/50 dark:bg-obsidian-900/40 hover:border-parchment-400 dark:hover:border-obsidian-700 transition-all"
          >
            <div>
              {/* Image Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden rounded mb-4 bg-parchment-200 dark:bg-obsidian-800">
                <img
                  src={post.coverImage.url}
                  alt={post.coverImage.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Category */}
              {post.categories[0] && (
                <div className="text-[10px] uppercase tracking-wider font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark mb-1.5">
                  {post.categories[0].title}
                </div>
              )}

              {/* Title */}
              <h4 className="font-serif text-lg font-semibold text-parchment-950 dark:text-parchment-50 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors line-clamp-2 mb-2 leading-snug">
                {post.title}
              </h4>

              {/* Excerpt */}
              <p className="text-xs font-serif text-parchment-600 dark:text-obsidian-300 line-clamp-2 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Footer Metadata */}
            <div className="flex items-center justify-between text-[11px] text-parchment-500 dark:text-obsidian-400 pt-3 border-t border-parchment-200 dark:border-obsidian-800">
              <span>{post.author.name}</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                <span>{post.readingTimeMinutes} min</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
