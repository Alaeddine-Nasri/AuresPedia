import { localized, localizedBody } from './helpers'

export default {
  name: 'actualite',
  title: 'Actualité',
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
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (R) => R.required(),
    },
    localized('summary', 'Résumé', 'text'),
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'videoUrl',
      title: 'URL Vidéo (optionnel)',
      type: 'url',
    },
    localizedBody('body', 'Contenu complet'),
  ],
  preview: {
    select: { title: 'title.fr', subtitle: 'date', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle,
      media,
    }),
  },
  orderings: [
    {
      title: 'Date (récent)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
}
