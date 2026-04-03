import { getAllArticles, getAllActualites, getAllActivites } from '@/lib/sanity'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aurespedia.univ-batna2.dz'

export default async function sitemap() {
  const locales = ['fr', 'ar']

  // Static routes
  const staticRoutes = [
    '',
    '/a-propos',
    '/actualites',
    '/activites',
    '/articles',
    '/ressources',
  ]

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    }))
  )

  // Dynamic routes — fetch slugs for FR locale (same slugs across both)
  let dynamicEntries = []
  try {
    const [articles, actualites, activites] = await Promise.all([
      getAllArticles('fr'),
      getAllActualites('fr'),
      getAllActivites('fr'),
    ])

    const toEntries = (items, segment) =>
      locales.flatMap((locale) =>
        items
          .filter((item) => item.slug?.current)
          .map((item) => ({
            url: `${BASE_URL}/${locale}/${segment}/${item.slug.current}`,
            lastModified: new Date(item.publishedAt || item.date || Date.now()),
            changeFrequency: 'monthly',
            priority: 0.6,
          }))
      )

    dynamicEntries = [
      ...toEntries(articles, 'articles'),
      ...toEntries(actualites, 'actualites'),
      ...toEntries(activites, 'activites'),
    ]
  } catch {
    // Sanity not configured — skip dynamic routes
  }

  return [...staticEntries, ...dynamicEntries]
}
