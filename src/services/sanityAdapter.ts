import { ContentProvider, Post, Category, Tag, Author, PostFilterOptions, TableOfContentItem } from './types';
import { sanityClient, isSanityConfigured, urlFor } from './sanityClient';
import { MockContentAdapter } from './mockAdapter';

// Helper to calculate reading time from body blocks
export function calculateReadingTime(bodyBlocks: any[]): number {
  if (!bodyBlocks || !Array.isArray(bodyBlocks)) return 5;
  let wordCount = 0;
  for (const block of bodyBlocks) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        if (child.text) {
          wordCount += child.text.trim().split(/\s+/).length;
        }
      }
    }
  }
  const minutes = Math.ceil(wordCount / 200); // 200 words per minute average reading pace
  return Math.max(1, minutes);
}

// Helper to extract Table of Contents from PortableText
export function extractTableOfContents(bodyBlocks: any[]): TableOfContentItem[] {
  if (!bodyBlocks || !Array.isArray(bodyBlocks)) return [];
  const toc: TableOfContentItem[] = [];

  for (const block of bodyBlocks) {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      const text = block.children?.map((c: any) => c.text).join('') || '';
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      if (text && id) {
        toc.push({
          id,
          text,
          level: block.style === 'h2' ? 2 : 3,
        });
      }
    }
  }

  return toc;
}

// Transform raw Sanity post into domain Post
function mapSanityPost(doc: any): Post {
  let imageUrl = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85';
  try {
    if (doc.mainImage?.asset) {
      imageUrl = urlFor(doc.mainImage).width(1600).quality(85).auto('format').url() || imageUrl;
    }
  } catch (e) {}

  let authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  try {
    if (doc.author?.image?.asset) {
      authorAvatar = urlFor(doc.author.image).width(400).height(400).auto('format').url() || authorAvatar;
    }
  } catch (e) {}

  const categories: Category[] = (doc.categories || []).map((c: any) => ({
    id: c._id || c.slug?.current || 'cat',
    title: c.title || 'General',
    slug: c.slug?.current || 'general',
    description: c.description,
    accentColor: c.color || '#9E472A',
  }));

  const tags: Tag[] = (doc.tags || []).map((t: any) => ({
    id: t._id || t.slug?.current || 'tag',
    title: t.title || 'Topic',
    slug: t.slug?.current || 'topic',
  }));

  const author: Author = {
    id: doc.author?._id || 'author-default',
    name: doc.author?.name || 'Staff Writer',
    slug: doc.author?.slug?.current || 'staff',
    role: doc.author?.role || 'Contributing Essayist',
    bio: doc.author?.bio || 'Writer and researcher for Chronicle.',
    avatar: authorAvatar,
    social: doc.author?.social || {},
  };

  const body = doc.body || [];
  const readingTime = doc.readingTime || calculateReadingTime(body);
  const tableOfContents = extractTableOfContents(body);

  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug?.current || '',
    subtitle: doc.subtitle,
    excerpt: doc.excerpt || '',
    publishedAt: doc.publishedAt || new Date().toISOString(),
    readingTimeMinutes: readingTime,
    featured: Boolean(doc.featured),
    issueNumber: doc.issueNumber || 'Current Issue',
    coverImage: {
      url: imageUrl,
      alt: doc.mainImage?.alt || doc.title,
      caption: doc.mainImage?.caption,
      credit: doc.mainImage?.credit,
    },
    author,
    categories,
    tags,
    body,
    tableOfContents,
    seo: {
      metaTitle: doc.seo?.metaTitle || `${doc.title} — Chronicle`,
      metaDescription: doc.seo?.metaDescription || doc.excerpt,
      shareImage: imageUrl,
    },
  };
}

export class SanityContentAdapter implements ContentProvider {
  name = 'Sanity CMS Provider';
  isFallback = false;
  private fallbackAdapter = new MockContentAdapter();

  async getPosts(options?: PostFilterOptions): Promise<Post[]> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getPosts(options);
    }

    try {
      let filter = `*[_type == "post" && defined(slug.current)]`;
      const params: Record<string, any> = {};

      if (options?.categorySlug) {
        filter += ` && $categorySlug in categories[]->slug.current`;
        params.categorySlug = options.categorySlug;
      }

      if (options?.featuredOnly) {
        filter += ` && featured == true`;
      }

      if (options?.searchQuery) {
        filter += ` && (title match $query || excerpt match $query)`;
        params.query = `*${options.searchQuery}*`;
      }

      let query = `${filter} | order(publishedAt desc) {
        _id,
        title,
        slug,
        subtitle,
        excerpt,
        publishedAt,
        readingTime,
        featured,
        issueNumber,
        mainImage,
        author->{
          _id,
          name,
          slug,
          role,
          bio,
          image,
          social
        },
        categories[]->{
          _id,
          title,
          slug,
          description,
          color
        },
        tags[]->{
          _id,
          title,
          slug
        }
      }`;

      if (options?.limit) {
        const offset = options.offset || 0;
        query += `[${offset}...${offset + options.limit}]`;
      }

      const docs = await sanityClient.fetch(query, params);
      if (!docs || docs.length === 0) {
        return this.fallbackAdapter.getPosts(options);
      }
      return docs.map(mapSanityPost);
    } catch (err) {
      console.warn('[SanityContentAdapter] Query failed, using fallback data:', err);
      return this.fallbackAdapter.getPosts(options);
    }
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getPostBySlug(slug);
    }

    try {
      const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        subtitle,
        excerpt,
        publishedAt,
        readingTime,
        featured,
        issueNumber,
        mainImage,
        body,
        seo,
        author->{
          _id,
          name,
          slug,
          role,
          bio,
          image,
          social
        },
        categories[]->{
          _id,
          title,
          slug,
          description,
          color
        },
        tags[]->{
          _id,
          title,
          slug
        }
      }`;

      const doc = await sanityClient.fetch(query, { slug });
      if (!doc) {
        return this.fallbackAdapter.getPostBySlug(slug);
      }
      return mapSanityPost(doc);
    } catch (err) {
      console.warn('[SanityContentAdapter] Fetch by slug failed, using fallback:', err);
      return this.fallbackAdapter.getPostBySlug(slug);
    }
  }

  async getFeaturedPost(): Promise<Post | null> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getFeaturedPost();
    }
    const posts = await this.getPosts({ featuredOnly: true, limit: 1 });
    if (posts.length > 0) return posts[0];
    const anyPosts = await this.getPosts({ limit: 1 });
    return anyPosts[0] || null;
  }

  async getSecondarySpotlights(limit: number = 2): Promise<Post[]> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getSecondarySpotlights(limit);
    }
    const posts = await this.getPosts({ limit: limit + 1 });
    return posts.slice(1, limit + 1);
  }

  async getRelatedPosts(currentSlug: string, categorySlug?: string, limit: number = 3): Promise<Post[]> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getRelatedPosts(currentSlug, categorySlug, limit);
    }
    try {
      const query = `*[_type == "post" && slug.current != $currentSlug && ($categorySlug in categories[]->slug.current || !defined($categorySlug))] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        subtitle,
        excerpt,
        publishedAt,
        readingTime,
        mainImage,
        author->{ name, slug, role, image },
        categories[]->{ title, slug }
      }`;
      const docs = await sanityClient.fetch(query, { currentSlug, categorySlug, limit });
      if (!docs || docs.length === 0) {
        return this.fallbackAdapter.getRelatedPosts(currentSlug, categorySlug, limit);
      }
      return docs.map(mapSanityPost);
    } catch (err) {
      return this.fallbackAdapter.getRelatedPosts(currentSlug, categorySlug, limit);
    }
  }

  async getCategories(): Promise<Category[]> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getCategories();
    }
    try {
      const query = `*[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        description,
        color,
        "articleCount": count(*[_type == "post" && references(^._id)])
      }`;
      const docs = await sanityClient.fetch(query);
      if (!docs || docs.length === 0) return this.fallbackAdapter.getCategories();
      return docs.map((d: any) => ({
        id: d._id,
        title: d.title,
        slug: d.slug?.current || '',
        description: d.description,
        accentColor: d.color,
        articleCount: d.articleCount || 0,
      }));
    } catch (err) {
      return this.fallbackAdapter.getCategories();
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getCategoryBySlug(slug);
    }
    try {
      const query = `*[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        color
      }`;
      const doc = await sanityClient.fetch(query, { slug });
      if (!doc) return this.fallbackAdapter.getCategoryBySlug(slug);
      return {
        id: doc._id,
        title: doc.title,
        slug: doc.slug?.current || '',
        description: doc.description,
        accentColor: doc.color,
      };
    } catch (err) {
      return this.fallbackAdapter.getCategoryBySlug(slug);
    }
  }

  async getTags(): Promise<Tag[]> {
    if (!isSanityConfigured() || !sanityClient) {
      return this.fallbackAdapter.getTags();
    }
    try {
      const query = `*[_type == "tag"] | order(title asc) {
        _id,
        title,
        slug
      }`;
      const docs = await sanityClient.fetch(query);
      if (!docs || docs.length === 0) return this.fallbackAdapter.getTags();
      return docs.map((d: any) => ({
        id: d._id,
        title: d.title,
        slug: d.slug?.current || '',
      }));
    } catch (err) {
      return this.fallbackAdapter.getTags();
    }
  }

  async getAdjacentPosts(currentSlug: string): Promise<{
    prev: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
    next: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
  }> {
    return this.fallbackAdapter.getAdjacentPosts(currentSlug);
  }
}
