/**
 * Sanity Studio Schema: category
 */
export const categorySchema = {
  name: 'category',
  title: 'Category / Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Editorial Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'color',
      title: 'Accent Color (Hex)',
      type: 'string',
      description: 'e.g. #9E472A for Terracotta, #365347 for Olive',
    },
  ],
};

/**
 * Sanity Studio Schema: tag
 */
export const tagSchema = {
  name: 'tag',
  title: 'Tag / Topic',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tag Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
