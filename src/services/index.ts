import { ContentProvider } from './types';
import { SanityContentAdapter } from './sanityAdapter';
import { isSanityConfigured } from './sanityClient';

// Pluggable Content Service Architecture
let currentProvider: ContentProvider = new SanityContentAdapter();

/**
 * Allows swapping the content provider at runtime (e.g. Sanity, Django/Python REST API, GraphQL, or Mock)
 */
export function setContentProvider(provider: ContentProvider) {
  currentProvider = provider;
}

export function getCurrentProvider(): ContentProvider {
  return currentProvider;
}

export function getProviderInfo(): { name: string; isConfigured: boolean; isFallback: boolean } {
  return {
    name: currentProvider.name,
    isConfigured: isSanityConfigured(),
    isFallback: !isSanityConfigured(),
  };
}

// Proxied service methods
export const getPosts = (options?: Parameters<ContentProvider['getPosts']>[0]) =>
  currentProvider.getPosts(options);

export const getPostBySlug = (slug: string) =>
  currentProvider.getPostBySlug(slug);

export const getFeaturedPost = () =>
  currentProvider.getFeaturedPost();

export const getSecondarySpotlights = (limit?: number) =>
  currentProvider.getSecondarySpotlights(limit);

export const getRelatedPosts = (currentSlug: string, categorySlug?: string, limit?: number) =>
  currentProvider.getRelatedPosts(currentSlug, categorySlug, limit);

export const getCategories = () =>
  currentProvider.getCategories();

export const getCategoryBySlug = (slug: string) =>
  currentProvider.getCategoryBySlug(slug);

export const getTags = () =>
  currentProvider.getTags();

export const getAdjacentPosts = (currentSlug: string) =>
  currentProvider.getAdjacentPosts(currentSlug);

export * from './types';
