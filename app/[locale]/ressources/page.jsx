import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata() {
  return { title: 'Ressources' }
}

export default async function RessourcesPage({ params: { locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'resources' })

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <h1 className="text-5xl font-bold text-white">{t('comingSoon')}</h1>
    </div>
  )
}
