import React, { useState, useEffect } from 'react';
import { Post } from '../services/types';
import { getRelatedPosts, getAdjacentPosts } from '../services';
import { ReadingProgressBar } from '../components/article/ReadingProgressBar';
import { ArticleHeader } from '../components/article/ArticleHeader';
import { ArticleToC } from '../components/article/ArticleToC';
import { ArticleShareBar } from '../components/article/ArticleShareBar';
import { ArticleAuthorBio } from '../components/article/ArticleAuthorBio';
import { ArticleNavigation } from '../components/article/ArticleNavigation';
import { RelatedArticles } from '../components/article/RelatedArticles';
import { PortableTextRenderer } from '../components/portabletext/PortableTextRenderer';

interface ArticlePageProps {
  post: Post;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ post }) => {
  const [fontSize, setFontSize] = useState<number>(18);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [adjacent, setAdjacent] = useState<{
    prev: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
    next: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
  }>({ prev: null, next: null });

  useEffect(() => {
    // Scroll smoothly to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title for SEO
    if (post.seo?.metaTitle) {
      document.title = post.seo.metaTitle;
    } else {
      document.title = `${post.title} — Chronicle`;
    }

    // Load related & adjacent posts
    const primaryCat = post.categories[0]?.slug;
    getRelatedPosts(post.slug, primaryCat, 3).then(setRelatedPosts);
    getAdjacentPosts(post.slug).then(setAdjacent);

    return () => {
      document.title = 'CHRONICLE — An Independent Journal of Ideas, Art & Technology';
    };
  }, [post]);

  return (
    <article className="min-h-screen">
      {/* Sticky Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Editorial Article Header */}
        <div className="max-w-4xl mx-auto">
          <ArticleHeader post={post} />
        </div>

        {/* Hero Photographic Cover */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-16">
          <div className="overflow-hidden rounded-xl border border-parchment-300 dark:border-obsidian-800 bg-parchment-200 dark:bg-obsidian-800 aspect-[16/9] sm:aspect-[21/9]">
            <img
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
          {(post.coverImage.caption || post.coverImage.credit) && (
            <div className="mt-3 px-1 text-center sm:text-left text-xs font-serif text-parchment-600 dark:text-obsidian-300 italic flex flex-wrap items-center justify-between gap-2">
              {post.coverImage.caption && <span>{post.coverImage.caption}</span>}
              {post.coverImage.credit && (
                <span className="not-italic font-mono text-[10px] uppercase tracking-wider text-parchment-500 dark:text-obsidian-400">
                  {post.coverImage.credit}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 2-Column Reading Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sticky Sidebar on Desktop (TOC + Actions) */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-24 space-y-6">
              <ArticleToC items={post.tableOfContents} />
              <ArticleShareBar
                post={post}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
              />
            </aside>

            {/* Main Reading Column */}
            <main
              className="lg:col-span-8 max-w-[68ch] mx-auto lg:mx-0 w-full"
              style={{ fontSize: `${fontSize}px` }}
            >
              {/* PortableText Body Renderer */}
              <PortableTextRenderer value={post.body} enableDropCap={true} />

              {/* Mobile Share & Reading Controls Bar */}
              <div className="lg:hidden mt-8 pt-6 border-t border-parchment-300 dark:border-obsidian-800">
                <ArticleShareBar
                  post={post}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                />
              </div>

              {/* Author Bio Box */}
              <ArticleAuthorBio author={post.author} />

              {/* Adjacent Previous / Next Dispatch Navigation */}
              <ArticleNavigation prev={adjacent.prev} next={adjacent.next} />
            </main>
          </div>
        </div>

        {/* Related Articles Strip */}
        <div className="max-w-5xl mx-auto">
          <RelatedArticles posts={relatedPosts} />
        </div>
      </div>
    </article>
  );
};
