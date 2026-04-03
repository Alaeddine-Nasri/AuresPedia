import { localized, localizedBody } from './helpers'

export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    localized('title', 'Titre'),
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr', maxLength: 96 },
      validation: (R) => R.required(),
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Nutrition', value: 'Nutrition' },
          { title: 'Vaccination', value: 'Vaccination' },
          { title: 'Développement', value: 'Développement' },
          { title: 'Maladies', value: 'Maladies' },
          { title: 'Santé générale', value: 'Santé' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    },
    localizedBody('body', 'Contenu'),
    {
      name: 'author',
      title: 'Auteur',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    },
  ],
  preview: {
    select: { title: 'title.fr', media: 'image' },
    prepare: ({ title, media }) => ({ title, media }),
  },
  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
}
