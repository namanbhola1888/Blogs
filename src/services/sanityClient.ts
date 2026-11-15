import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
};

export const isSanityConfigured = (): boolean => {
  const pid = sanityConfig.projectId?.trim() || '';
  return Boolean(
    pid &&
    pid !== 'YOUR_SANITY_PROJECT_ID' &&
    pid !== 'your_sanity_project_id' &&
    pid !== 'your_project_id'
  );
};

// Safe client instantiation: Never call createClient with an empty projectId (which throws an unhandled error)
export const sanityClient: SanityClient | null = isSanityConfigured()
  ? createClient(sanityConfig)
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (builder && source) {
    try {
      return builder.image(source);
    } catch (e) {
      // Fall through to chainable fallback
    }
  }

  // Safe fallback chainable builder for when Sanity is not connected or source is local URL
  const fallbackUrl =
    typeof source === 'string'
      ? source
      : source?.asset?.url || source?.url || '';

  const chainable: any = {
    width: () => chainable,
    height: () => chainable,
    quality: () => chainable,
    auto: () => chainable,
    fit: () => chainable,
    url: () => fallbackUrl,
  };

  return chainable;
}
