// Domain Entities & Models for the Editorial Platform

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  accentColor?: string;
  articleCount?: number;
}

export interface Tag {
  id: string;
  title: string;
  slug: string;
}

export interface CoverImage {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  aspectRatio?: string;
}

export interface TableOfContentItem {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  featured?: boolean;
  coverImage: CoverImage;
  author: Author;
  categories: Category[];
  tags: Tag[];
  body: any[]; // Portable Text blocks (or structured content)
  tableOfContents?: TableOfContentItem[];
  seo?: SEOData;
  issueNumber?: string;
}

export interface PostFilterOptions {
  categorySlug?: string;
  tagSlug?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
  excludeSlug?: string;
  featuredOnly?: boolean;
}

export interface ContentProvider {
  name: string;
  isFallback: boolean;
  getPosts(options?: PostFilterOptions): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getFeaturedPost(): Promise<Post | null>;
  getSecondarySpotlights(limit?: number): Promise<Post[]>;
  getRelatedPosts(currentSlug: string, categorySlug?: string, limit?: number): Promise<Post[]>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getTags(): Promise<Tag[]>;
  getAdjacentPosts(currentSlug: string): Promise<{
    prev: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
    next: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
  }>;
}
