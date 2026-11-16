import React, { useState, useEffect } from 'react';
import { Category, Post } from '../services/types';
import { getPosts, getCategoryBySlug } from '../services';
import { StoryGrid } from '../components/stories/StoryGrid';
import { useNavigation } from '../context/NavigationContext';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug }) => {
  const { goHome } = useNavigation();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    Promise.all([
      getCategoryBySlug(categorySlug),
      getPosts({ categorySlug }),
      getPosts(),
    ]).then(([catData, postsData, allPosts]) => {
      let resolvedCategory = catData;

      // If category wasn't found directly, try finding it from all posts
      if (!resolvedCategory && allPosts && allPosts.length > 0) {
        const clean = categorySlug.toLowerCase().trim();
        for (const p of allPosts) {
          const found = p.categories.find(
            (c) => c.slug.toLowerCase().trim() === clean || c.title.toLowerCase().trim() === clean
          );
          if (found) {
            resolvedCategory = found;
            break;
          }
        }
      }

      setCategory(resolvedCategory);

      if (postsData && postsData.length > 0) {
        setPosts(postsData);
      } else if (allPosts && allPosts.length > 0) {
        // Fallback: filter from all loaded posts
        const clean = categorySlug.toLowerCase().trim();
        const matched = allPosts.filter((p) =>
          p.categories.some(
            (c) =>
              c.slug.toLowerCase().trim() === clean ||
              c.title.toLowerCase().trim() === clean ||
              (resolvedCategory && (c.id === resolvedCategory.id || c.slug.toLowerCase().trim() === resolvedCategory.slug.toLowerCase().trim()))
          )
        );
        setPosts(matched);
      } else {
        setPosts([]);
      }

      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-8 h-8 mx-auto border-2 border-editorial-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb Back */}
      <button
        onClick={goHome}
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-parchment-600 dark:text-obsidian-300 hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        <span>Return to Full Index</span>
      </button>

      {/* Category Masthead */}
      <header className="mb-12 pb-8 border-b border-parchment-300 dark:border-obsidian-800">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark mb-2">
          <BookOpen size={14} />
          <span>Section Inquiry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-parchment-950 dark:text-parchment-50 mb-4">
          {category?.title || categorySlug}
        </h1>
        {category?.description && (
          <p className="font-serif text-base sm:text-lg text-parchment-700 dark:text-obsidian-200 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        )}
        <div className="mt-4 text-xs font-mono text-parchment-500 dark:text-obsidian-400">
          Showing {posts.length} published dispatch{posts.length === 1 ? '' : 'es'}
        </div>
      </header>

      {/* Grid */}
      <StoryGrid posts={posts} />
    </div>
  );
};
