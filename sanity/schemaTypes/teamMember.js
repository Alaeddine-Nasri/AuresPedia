import { localized } from './helpers'

export default {
  name: 'teamMember',
  title: 'Membre de l\'équipe',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (R) => R.required(),
    },
    localized('jobTitle', 'Titre / Fonction'),
    {
      name: 'university',
      title: 'Université',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Localisation',
      type: 'string',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus petit = affiché en premier',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'jobTitle.fr', media: 'photo' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
