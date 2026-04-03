import { getTranslations, setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import ActualitesClient from '@/components/ActualitesClient'
import { getAllActualites } from '@/lib/sanity'

export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar'
  return {
    title: isAr ? 'الأخبار' : 'Actualités',
    description: isAr
      ? 'آخر أخبار طب الأطفال من جامعة باتنة 2.'
      : "Découvrez les dernières actualités en pédiatrie de l'Université de Batna 2.",
    openGraph: {
      title: isAr ? 'الأخبار | أوريسبيديا' : 'Actualités | AuresPédia',
    },
  }
}

export default async function ActualitesPage({ params: { locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'news' })
  const allNews = await getAllActualites(locale)

  const introText = `${t('introIcon')} ${t('introText')} `
  const introHighlight = t('introHighlight')
  const introBody = ` ${t('introBody')}`

  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <ActualitesClient
          items={allNews}
          locale={locale}
          introText={introText}
          introHighlight={introHighlight}
          introBody={introBody}
        />
      </section>
      <ContactForm />
    </>
  )
}
