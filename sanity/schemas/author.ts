/**
 * Sanity Studio Schema: author
 */
export const authorSchema = {
  name: 'author',
  title: 'Author / Essayist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Masthead Title',
      type: 'string',
      description: 'e.g. "Senior Contributing Editor", "Architectural Theorist"',
    },
    {
      name: 'image',
      title: 'Portrait / Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Author Biography',
      type: 'text',
      rows: 4,
    },
    {
      name: 'social',
      title: 'Social & Web Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter / X Profile URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn Profile URL', type: 'url' },
        { name: 'github', title: 'GitHub Profile URL', type: 'url' },
        { name: 'website', title: 'Personal Website URL', type: 'url' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
};
