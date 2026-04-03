import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import ContactForm from '@/components/ContactForm'
import { getActiviteBySlug, getAllActivites } from '@/lib/sanity'

export async function generateStaticParams() {
  const items = await getAllActivites('fr')
  return ['fr', 'ar'].flatMap((locale) =>
    items.filter((item) => item.slug?.current).map((item) => ({ locale, slug: item.slug.current }))
  )
}

export async function generateMetadata({ params: { locale, slug } }) {
  const item = await getActiviteBySlug(locale, slug)
  if (!item) return {}
  return { title: item.title }
}

export default async function ActiviteDetailPage({ params: { locale, slug } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'activities' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const item = await getActiviteBySlug(locale, slug)
  if (!item) notFound()

  const dateStr = item.date
    ? new Date(item.date).toLocaleDateString(locale === 'ar' ? 'ar-DZ' : 'fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  return (
    <>
      <div className="w-[88%] mx-auto py-12">
        <Breadcrumb items={[
          { label: tc('home'), href: `/${locale}` },
          { label: 'Activités', href: `/${locale}/activites` },
          { label: item.title },
        ]} />

        <div className="flex flex-col lg:flex-row gap-10 mt-8">

          {/* ── Left — content ── */}
          <div className="flex-1 min-w-0">
            {/* Meta pills */}
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                {t('eventLabel')}
              </span>
              {item.location && (
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold bg-primary/10 px-4 py-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </span>
              )}
              {dateStr && (
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold bg-primary/10 px-4 py-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {dateStr}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 leading-snug">
              {item.title}
            </h1>

            <div className="prose prose-base max-w-none text-gray-700 leading-relaxed prose-p:text-justify prose-p:text-gray-700">
              {item.body ? <PortableText value={item.body} /> : null}
            </div>
          </div>

          {/* ── Right — image ── */}
          {item.image && (
            <div className="lg:w-[40%] flex-shrink-0">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ height: '420px' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ContactForm />
    </>
  )
}
