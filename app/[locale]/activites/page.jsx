import { getTranslations, setRequestLocale } from 'next-intl/server'
import EventCard from '@/components/EventCard'
import ActivitesCarousel from '@/components/ActivitesCarousel'
import ContactForm from '@/components/ContactForm'
import { getUpcomingActivites, getPastActivites } from '@/lib/sanity'

export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar'
  return {
    title: isAr ? 'الأنشطة' : 'Activités',
    description: isAr
      ? 'الفعاليات القادمة والماضية التي ينظمها قسم طب الأطفال.'
      : 'Découvrez les événements à venir et passés organisés par le département de pédiatrie.',
    openGraph: {
      title: isAr ? 'الأنشطة | أوريسبيديا' : 'Activités | AuresPédia',
    },
  }
}

export default async function ActivitesPage({ params: { locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'activities' })

  const [upcoming, past] = await Promise.all([
    getUpcomingActivites(locale),
    getPastActivites(locale, 4),
  ])

  return (
    <>
      {/* ── Événement à venir ── */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-xl md:text-3xl font-bold text-dark text-center mb-8">
          {t('upcomingTitle')}
        </h1>

        {upcoming.length > 0 ? (
          <ActivitesCarousel items={upcoming} locale={locale} />
        ) : (
          <div className="w-[88%] mx-auto bg-neutral rounded-2xl p-12 text-center">
            <p className="text-gray-400">Aucun événement à venir.</p>
          </div>
        )}
      </section>

      {/* ── Événements passés ── */}
      <section className="bg-neutral py-16">
        <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-3xl font-bold text-dark text-center mb-10">
          {t('pastTitle')}
        </h2>

        <div className="w-[88%] mx-auto">
          {past.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {past.map((item) => (
                <EventCard key={item._id} item={item} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-gray-400">Aucun événement passé.</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors">
              {t('viewAll')}
            </button>
          </div>
        </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}
