import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // `true` gives fast, cached response (recommended for production read-only blogs)
};

export const isSanityConfigured = (): boolean => {
  return Boolean(
    sanityConfig.projectId &&
    sanityConfig.projectId.trim() !== '' &&
    sanityConfig.projectId !== 'YOUR_SANITY_PROJECT_ID'
  );
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
