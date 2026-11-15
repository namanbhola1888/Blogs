import React from 'react';
import { Post } from '../../services/types';
import { useNavigation } from '../../context/NavigationContext';
import { Clock } from 'lucide-react';

interface SecondarySpotlightProps {
  posts: Post[];
}

export const SecondarySpotlight: React.FC<SecondarySpotlightProps> = ({ posts }) => {
  const { openStory, openCategory } = useNavigation();

  if (!posts || posts.length === 0) return null;

  return (
    <section className="mb-14 sm:mb-20">
      <div className="flex items-center gap-3 mb-6 pb-2 border-b border-parchment-300 dark:border-obsidian-800">
        <span className="w-2 h-2 rounded-full bg-editorial-terracotta dark:bg-editorial-terracotta-dark" />
        <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-parchment-700 dark:text-obsidian-300">
          Editorial Spotlights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => openStory(post.slug)}
            className="group cursor-pointer rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50 dark:bg-obsidian-950 p-5 sm:p-6 hover:border-parchment-400 dark:hover:border-obsidian-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] overflow-hidden rounded mb-4 bg-parchment-200 dark:bg-obsidian-800">
                <img
                  src={post.coverImage.url}
                  alt={post.coverImage.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {post.categories[0] && (
                <div className="text-[10px] uppercase tracking-wider font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark mb-1.5">
                  {post.categories[0].title}
                </div>
              )}

              <h4 className="font-serif font-bold text-xl sm:text-2xl text-parchment-950 dark:text-parchment-50 group-hover:text-editorial-terracotta dark:group-hover:text-editorial-terracotta-dark transition-colors line-clamp-2 leading-snug mb-2">
                {post.title}
              </h4>

              <p className="font-serif text-sm text-parchment-700 dark:text-obsidian-200 line-clamp-2 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-parchment-200 dark:border-obsidian-800 flex items-center justify-between text-xs text-parchment-600 dark:text-obsidian-300">
              <span className="font-medium">{post.author.name}</span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
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
