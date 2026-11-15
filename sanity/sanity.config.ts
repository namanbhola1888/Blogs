import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Chronicle Editorial Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Editorial Content')
          .items([
            S.listItem()
              .title('Featured Stories')
              .child(
                S.documentList()
                  .title('Featured Lead Stories')
                  .filter('_type == "post" && featured == true')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['featured'].includes(item.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
