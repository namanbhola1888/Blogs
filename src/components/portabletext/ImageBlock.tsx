import React from 'react';
import { urlFor } from '../../services/sanityClient';

interface ImageBlockProps {
  value: {
    asset?: any;
    url?: string;
    alt: string;
    caption?: string;
    credit?: string;
    layout?: 'normal' | 'wide' | 'full';
  };
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ value }) => {
  // Resolve image URL from either raw sanity asset or direct URL
  let src = value.url || '';
  if (!src && value.asset) {
    try {
      src = urlFor(value).width(1200).quality(85).auto('format').url();
    } catch (e) {
      src = '';
    }
  }

  if (!src) return null;

  return (
    <figure className="my-10 -mx-2 sm:mx-0">
      <div className="overflow-hidden rounded-md border border-parchment-300 dark:border-obsidian-700 bg-parchment-200 dark:bg-obsidian-800">
        <img
          src={src}
          alt={value.alt || 'Editorial visual'}
          loading="lazy"
          className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 hover:scale-[1.01]"
        />
      </div>
      {(value.caption || value.credit) && (
        <figcaption className="mt-2.5 px-1 text-center sm:text-left text-xs font-serif text-parchment-600 dark:text-obsidian-300 italic flex flex-wrap items-center justify-between gap-2">
          {value.caption && <span>{value.caption}</span>}
          {value.credit && (
            <span className="not-italic font-sans text-[11px] uppercase tracking-wider text-parchment-500 dark:text-obsidian-400">
              {value.credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
