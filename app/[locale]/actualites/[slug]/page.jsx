import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import ContactForm from '@/components/ContactForm'
import { getActualiteBySlug, getAllActualites } from '@/lib/sanity'

export async function generateStaticParams() {
  const items = await getAllActualites('fr')
  return ['fr', 'ar'].flatMap((locale) =>
    items.filter((item) => item.slug?.current).map((item) => ({ locale, slug: item.slug.current }))
  )
}

export async function generateMetadata({ params: { locale, slug } }) {
  const item = await getActualiteBySlug(locale, slug)
  if (!item) return {}
  return { title: item.title, description: item.summary }
}

export default async function ActualiteDetailPage({ params: { locale, slug } }) {
  setRequestLocale(locale)
  const tc = await getTranslations({ locale, namespace: 'common' })
  const item = await getActualiteBySlug(locale, slug)
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
          { label: 'Actualités', href: `/${locale}/actualites` },
          { label: item.title },
        ]} />

        <div className="flex flex-col lg:flex-row gap-10 mt-8">

          {/* ── Left — content ── */}
          <div className="flex-1 min-w-0">
            {dateStr && (
              <p className="text-primary font-semibold text-base mb-4">{dateStr}</p>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6 leading-snug">
              {item.title}
            </h1>
            <div className="prose prose-base max-w-none text-gray-700 leading-relaxed prose-p:text-justify prose-p:text-gray-700">
              {item.body ? <PortableText value={item.body} /> : <p>{item.summary}</p>}
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
