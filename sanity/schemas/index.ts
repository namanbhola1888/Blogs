import { postSchema } from './post';
import { authorSchema } from './author';
import { categorySchema, tagSchema } from './taxonomy';
import { blockContentSchema } from './blockContent';

export const schemaTypes = [
  postSchema,
  authorSchema,
  categorySchema,
  tagSchema,
  blockContentSchema,
];
