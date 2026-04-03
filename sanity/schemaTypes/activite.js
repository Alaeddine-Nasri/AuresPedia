import { localized, localizedBody } from './helpers'

export default {
  name: 'activite',
  title: 'Activité',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Événement à venir', value: 'upcoming' },
          { title: 'Événement passé', value: 'past' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    localized('location', 'Lieu'),
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
    localizedBody('body', 'Contenu'),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'type',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle === 'upcoming' ? '🟢 À venir' : '⚫ Passé',
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
