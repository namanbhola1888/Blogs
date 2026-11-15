import React, { useState, useMemo } from 'react';
import { Post, Category } from '../services/types';
import { Masthead } from '../components/layout/Masthead';
import { FeaturedHero } from '../components/stories/FeaturedHero';
import { SecondarySpotlight } from '../components/stories/SecondarySpotlight';
import { CategoryFilter } from '../components/stories/CategoryFilter';
import { StoryGrid } from '../components/stories/StoryGrid';
import { NewsletterSection } from '../components/stories/NewsletterSection';

interface HomePageProps {
  posts: Post[];
  categories: Category[];
  featuredPost: Post | null;
  spotlights: Post[];
}

export const HomePage: React.FC<HomePageProps> = ({
  posts,
  categories,
  featuredPost,
  spotlights,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude lead story from grid if no filters are active
      if (!selectedCategory && !searchQuery && featuredPost && post.id === featuredPost.id) {
        return false;
      }

      if (selectedCategory) {
        const hasCategory = post.categories.some(
          (c) => c.slug.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!hasCategory) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchesAuthor = post.author.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt && !matchesAuthor) return false;
      }

      return true;
    });
  }, [posts, selectedCategory, searchQuery, featuredPost]);

  const isFiltering = Boolean(selectedCategory || searchQuery);

  return (
    <div>
      <Masthead
        categories={categories}
        selectedCategorySlug={selectedCategory}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* If not searching/filtering, show the curated Hero and Secondary Spotlights */}
        {!isFiltering && featuredPost && (
          <>
            <FeaturedHero post={featuredPost} />
            {spotlights.length > 0 && <SecondarySpotlight posts={spotlights} />}
          </>
        )}

        {/* Section Heading & Filter Bar */}
        <div className="mt-8 mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-parchment-950 dark:text-parchment-50">
              {isFiltering ? 'Filtered Dispatches' : 'Recent Inquiries & Essays'}
            </h3>
            <span className="text-xs uppercase tracking-wider text-parchment-500 dark:text-obsidian-400 font-mono">
              {filteredPosts.length} pieces
            </span>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={posts.length}
          />
        </div>

        {/* The Story Grid */}
        <StoryGrid
          posts={filteredPosts}
          onResetFilters={() => {
            setSelectedCategory('');
            setSearchQuery('');
          }}
        />

        {/* Newsletter Callout */}
        <NewsletterSection />
      </main>
    </div>
  );
};
