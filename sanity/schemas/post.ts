/**
 * Sanity Studio Schema: post (Reusable Publishing Template)
 */
export const postSchema = {
  name: 'post',
  title: 'Article / Essay',
  type: 'document',
  fieldsets: [
    { name: 'editorial', title: 'Editorial Metadata', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: 'Featured Imagery', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: 'Search & Social Meta (SEO)', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      description: 'The primary headline. Keep concise and impactful.',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle / Deck',
      type: 'string',
      description: 'Secondary line displayed beneath the headline to contextualize the piece.',
      fieldset: 'editorial',
    },
    {
      name: 'excerpt',
      title: 'Editorial Excerpt',
      type: 'text',
      rows: 3,
      description: 'Appears in article cards, search results, and feed previews (140-180 characters recommended).',
      validation: (Rule: any) => Rule.required().max(280),
    },
    {
      name: 'author',
      title: 'Author / Contributor',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: any) => Rule.required(),
      fieldset: 'editorial',
    },
    {
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Photo Caption',
          type: 'string',
        },
        {
          name: 'credit',
          title: 'Photographer / Archive Credit',
          type: 'string',
        },
      ],
      fieldset: 'media',
    },
    {
      name: 'categories',
      title: 'Sections / Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule: any) => Rule.required().min(1),
      fieldset: 'editorial',
    },
    {
      name: 'tags',
      title: 'Topic Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      fieldset: 'editorial',
    },
    {
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
      fieldset: 'editorial',
    },
    {
      name: 'featured',
      title: 'Feature as Lead Cover Story',
      type: 'boolean',
      description: 'Highlight prominently in the hero section on the homepage.',
      initialValue: false,
      fieldset: 'editorial',
    },
    {
      name: 'issueNumber',
      title: 'Publication Volume / Issue',
      type: 'string',
      description: 'e.g. "Vol. 14 — Autumn / Winter"',
      fieldset: 'editorial',
    },
    {
      name: 'readingTime',
      title: 'Estimated Reading Time (Minutes)',
      type: 'number',
      description: 'Leave blank to auto-calculate from word count.',
      fieldset: 'editorial',
    },
    {
      name: 'body',
      title: 'Article Body',
      type: 'blockContent',
      description: 'The core prose content with support for headings, pull quotes, code blocks, and inline imagery.',
      validation: (Rule: any) => Rule.required(),
    },
    // SEO Fields
    {
      name: 'seo',
      title: 'SEO & Social Metadata',
      type: 'object',
      fieldset: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Overrides standard title tag if specified.',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'shareImage',
          title: 'Social Share Image (OpenGraph)',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection: any) {
      const { author, date } = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Unpublished';
      return {
        ...selection,
        subtitle: `${author || 'Unknown'} · ${formattedDate}`,
      };
    },
  },
};
