import { Post, Category, Author, Tag, ContentProvider, PostFilterOptions } from './types';

export const MOCK_AUTHORS: Record<string, Author> = {};

export const MOCK_CATEGORIES: Category[] = [];

export const MOCK_TAGS: Tag[] = [];

export const MOCK_POSTS: Post[] = [];

export class MockContentAdapter implements ContentProvider {
  name = 'Mock Editorial Provider (Fallback)';
  isFallback = true;

  async getPosts(options?: PostFilterOptions): Promise<Post[]> {
    return [];
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return null;
  }

  async getFeaturedPost(): Promise<Post | null> {
    return null;
  }

  async getSecondarySpotlights(limit: number = 2): Promise<Post[]> {
    return [];
  }

  async getRelatedPosts(currentSlug: string, categorySlug?: string, limit: number = 3): Promise<Post[]> {
    return [];
  }

  async getCategories(): Promise<Category[]> {
    return [];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return null;
  }

  async getTags(): Promise<Tag[]> {
    return [];
  }

  async getAdjacentPosts(currentSlug: string): Promise<{
    prev: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
    next: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
  }> {
    return { prev: null, next: null };
  }
}
