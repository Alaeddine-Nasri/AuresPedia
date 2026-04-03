import { localized } from './helpers'

export default {
  name: 'siteConfig',
  title: 'Configuration du site',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'phone1',
      title: 'Téléphone 1',
      type: 'string',
    },
    {
      name: 'phone2',
      title: 'Téléphone 2',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email de contact',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'string',
    },
    {
      name: 'facebookUrl',
      title: 'URL Facebook',
      type: 'url',
    },
    {
      name: 'instagramUrl',
      title: 'URL Instagram',
      type: 'url',
    },
    {
      name: 'youtubeUrl',
      title: 'URL YouTube',
      type: 'url',
    },
    localized('heroHeadline', 'Titre hero'),
    localized('heroSubtext', 'Sous-titre hero', 'text'),
    {
      name: 'heroImage',
      title: 'Image hero',
      type: 'image',
      options: { hotspot: true },
    },
    // ── Quotes carousel ──
    {
      name: 'quotes',
      title: 'Citations du hero',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            localized('quote', 'Citation', 'text'),
            { name: 'author', title: 'Auteur', type: 'string' },
            localized('role', 'Rôle / Titre'),
          ],
          preview: {
            select: { title: 'author', subtitle: 'quote.fr' },
          },
        },
      ],
    },
    // ── About section ──
    {
      name: 'aboutImage1',
      title: 'Image À propos 1 (arrière-plan)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'aboutImage2',
      title: 'Image À propos 2 (avant-plan flottante)',
      type: 'image',
      options: { hotspot: true },
    },
    localized('vision', 'Vision', 'text'),
    localized('mission', 'Mission', 'text'),
  ],
  preview: {
    prepare: () => ({ title: 'Configuration du site' }),
  },
}
