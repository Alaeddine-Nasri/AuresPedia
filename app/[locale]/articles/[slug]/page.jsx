import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import ContactForm from '@/components/ContactForm'
import { getArticleBySlug, getAllArticles } from '@/lib/sanity'

export async function generateStaticParams() {
  const items = await getAllArticles('fr')
  return ['fr', 'ar'].flatMap((locale) =>
    items.filter((item) => item.slug?.current).map((item) => ({ locale, slug: item.slug.current }))
  )
}

export async function generateMetadata({ params: { locale, slug } }) {
  const item = await getArticleBySlug(locale, slug)
  if (!item) return {}
  return {
    title: item.title,
    description: typeof item.body === 'string' ? item.body.slice(0, 160) : undefined,
  }
}

export default async function ArticleDetailPage({ params: { locale, slug } }) {
  setRequestLocale(locale)
  const tc = await getTranslations({ locale, namespace: 'common' })
  const item = await getArticleBySlug(locale, slug)
  if (!item) notFound()

  const dateStr = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-DZ' : 'fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  return (
    <>
      <div className="w-[88%] mx-auto py-12">
        <Breadcrumb items={[
          { label: tc('home'), href: `/${locale}` },
          { label: 'Articles', href: `/${locale}/articles` },
          { label: item.category || 'Article' },
        ]} />

        <div className="flex flex-col lg:flex-row gap-10 mt-8">

          {/* ── Left — content ── */}
          <div className="flex-1 min-w-0">
            {item.category && (
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {item.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3 leading-snug">
              {item.title}
            </h1>
            {(dateStr || item.author) && (
              <p className="text-gray-500 text-sm mb-6">
                {dateStr && <span>{dateStr}</span>}
                {dateStr && item.author && <span className="mx-2">·</span>}
                {item.author && <span>Pr. {item.author}</span>}
              </p>
            )}
            <div className="prose prose-base max-w-none text-gray-700 leading-relaxed prose-p:text-justify prose-p:text-gray-700">
              {item.body ? <PortableText value={item.body} /> : null}
            </div>
          </div>

          {/* ── Right — image (sticky) ── */}
          {item.image && (
            <div className="lg:w-[38%] flex-shrink-0">
              <div className="sticky top-24">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ height: '400px' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />
                </div>
                {item.author && (
                  <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                    <p className="text-xs text-gray-400 mb-1">Auteur</p>
                    <p className="font-semibold text-dark text-sm">Pr. {item.author}</p>
                    {item.category && <p className="text-primary text-xs mt-0.5">{item.category}</p>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ContactForm />
    </>
  )
}
