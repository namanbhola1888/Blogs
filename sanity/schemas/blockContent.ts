/**
 * Sanity Studio Schema: blockContent
 * Defines the rich portable text capabilities for editorial articles
 */
export const blockContentSchema = {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote / Pullquote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            title: 'URL Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule: any) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
    // Inline Image Block with Caption & Credit
    {
      type: 'image',
      name: 'inlineImage',
      title: 'Inline Photographic Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and screen readers.',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Displayed directly beneath the image.',
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Photo Credit / Source',
        },
        {
          name: 'layout',
          type: 'string',
          title: 'Layout Display',
          options: {
            list: [
              { title: 'Normal Reading Width', value: 'normal' },
              { title: 'Wide / Breakout', value: 'wide' },
              { title: 'Full Screen Bleed', value: 'full' },
            ],
          },
          initialValue: 'normal',
        },
      ],
    },
    // Code Snippet with Syntax & Filename
    {
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'TypeScript / JavaScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'CSS / HTML', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash / Shell', value: 'bash' },
              { title: 'Plain Text', value: 'text' },
            ],
          },
          initialValue: 'typescript',
        },
        {
          name: 'filename',
          title: 'Filename or Header (Optional)',
          type: 'string',
        },
        {
          name: 'code',
          title: 'Code Content',
          type: 'text',
          rows: 10,
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    // Editorial Callout / Aside
    {
      type: 'object',
      name: 'callout',
      title: 'Editorial Callout Box',
      fields: [
        {
          name: 'type',
          title: 'Callout Tone',
          type: 'string',
          options: {
            list: [
              { title: 'Editorial Insight', value: 'editorial' },
              { title: 'Note / Context', value: 'note' },
              { title: 'Important Warning', value: 'warning' },
            ],
          },
          initialValue: 'editorial',
        },
        {
          name: 'title',
          title: 'Callout Title',
          type: 'string',
        },
        {
          name: 'text',
          title: 'Content Text',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
  ],
};
