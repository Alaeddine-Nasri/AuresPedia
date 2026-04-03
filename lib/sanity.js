import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const configured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.length > 0

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

const pick = (field, locale) => {
  if (!field) return ''
  return field[locale] || field.fr || ''
}

function localizeDoc(doc, locale, fields) {
  if (!doc) return null
  const result = { ...doc }
  fields.forEach((field) => {
    if (result[field]) {
      result[field] = pick(result[field], locale)
    }
  })
  if (result.image?.asset) {
    result.image = urlFor(result.image).width(800).url()
  }
  return result
}

async function safeFetch(query, params = {}) {
  if (!configured) return []
  try {
    return await client.fetch(query, params)
  } catch {
    return []
  }
}

async function safeFetchOne(query, params = {}) {
  if (!configured) return null
  try {
    return await client.fetch(query, params)
  } catch {
    return null
  }
}

// ─── Articles ────────────────────────────────────────────────────────────────

export async function getAllArticles(locale) {
  const data = await safeFetch(`*[_type == "article"] | order(publishedAt desc)`)
  return data.map((d) => localizeDoc(d, locale, ['title', 'body']))
}

export async function getLatestArticles(locale, limit = 3) {
  const data = await safeFetch(
    `*[_type == "article"] | order(publishedAt desc)[0..$limit]`,
    { limit: limit - 1 }
  )
  return data.map((d) => localizeDoc(d, locale, ['title', 'body']))
}

export async function getArticleBySlug(locale, slug) {
  const data = await safeFetchOne(
    `*[_type == "article" && slug.current == $slug][0]`,
    { slug }
  )
  return localizeDoc(data, locale, ['title', 'body'])
}

// ─── Actualités ──────────────────────────────────────────────────────────────

export async function getAllActualites(locale) {
  const data = await safeFetch(`*[_type == "actualite"] | order(date desc)`)
  return data.map((d) => localizeDoc(d, locale, ['title', 'summary', 'body']))
}

export async function getLatestActualites(locale, limit = 3) {
  const data = await safeFetch(
    `*[_type == "actualite"] | order(date desc)[0...$limit]`,
    { limit: limit - 1 }
  )
  return data.map((d) => localizeDoc(d, locale, ['title', 'summary', 'body']))
}

export async function getActualiteBySlug(locale, slug) {
  const data = await safeFetchOne(
    `*[_type == "actualite" && slug.current == $slug][0]`,
    { slug }
  )
  return localizeDoc(data, locale, ['title', 'summary', 'body'])
}

// ─── Activités ───────────────────────────────────────────────────────────────

export async function getAllActivites(locale) {
  const data = await safeFetch(`*[_type == "activite"] | order(date desc)`)
  return data.map((d) => localizeDoc(d, locale, ['title', 'location', 'body']))
}

export async function getUpcomingActivites(locale) {
  const data = await safeFetch(
    `*[_type == "activite" && type == "upcoming"] | order(date asc)`
  )
  return data.map((d) => localizeDoc(d, locale, ['title', 'location', 'body']))
}

export async function getPastActivites(locale, limit = 4) {
  const data = await safeFetch(
    `*[_type == "activite" && type == "past"] | order(date desc)[0...$limit]`,
    { limit: limit - 1 }
  )
  return data.map((d) => localizeDoc(d, locale, ['title', 'location', 'body']))
}

export async function getActiviteBySlug(locale, slug) {
  const data = await safeFetchOne(
    `*[_type == "activite" && slug.current == $slug][0]`,
    { slug }
  )
  return localizeDoc(data, locale, ['title', 'location', 'body'])
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers(locale) {
  const data = await safeFetch(`*[_type == "teamMember"] | order(order asc)`)
  return data.map((d) => {
    const result = { ...d }
    if (result.jobTitle) result.jobTitle = pick(result.jobTitle, locale)
    if (result.photo?.asset) result.photo = urlFor(result.photo).width(400).url()
    return result
  })
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export async function getSiteConfig(locale) {
  const data = await safeFetchOne(`*[_type == "siteConfig"][0]`)
  if (!data) return null
  return {
    ...data,
    heroHeadline: pick(data.heroHeadline, locale),
    heroSubtext: pick(data.heroSubtext, locale),
    heroImage: data.heroImage?.asset ? urlFor(data.heroImage).width(1200).url() : null,
    vision: pick(data.vision, locale),
    mission: pick(data.mission, locale),
    aboutImage1: data.aboutImage1?.asset ? urlFor(data.aboutImage1).width(600).url() : null,
    aboutImage2: data.aboutImage2?.asset ? urlFor(data.aboutImage2).width(400).url() : null,
    quotes: (data.quotes || []).map(q => ({
      quote: pick(q.quote, locale),
      author: q.author || '',
      role: pick(q.role, locale),
    })),
  }
}
