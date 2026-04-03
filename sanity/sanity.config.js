import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'aurespedia',
  title: 'AuresPédia Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.documentTypeListItem('article').title('Articles'),
            S.documentTypeListItem('actualite').title('Actualités'),
            S.documentTypeListItem('activite').title('Activités'),
            S.documentTypeListItem('teamMember').title('Équipe'),
            S.divider(),
            S.listItem()
              .title('Configuration du site')
              .child(
                S.document()
                  .schemaType('siteConfig')
                  .documentId('siteConfig')
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
