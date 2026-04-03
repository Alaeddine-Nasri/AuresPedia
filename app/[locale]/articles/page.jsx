import { getTranslations, setRequestLocale } from 'next-intl/server'
import ArticleCard from '@/components/ArticleCard'
import ContactForm from '@/components/ContactForm'
import { getAllArticles } from '@/lib/sanity'

export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar'
  return {
    title: isAr ? 'المقالات' : 'Articles',
    description: isAr
      ? 'مقالات علمية حول صحة الطفل من قسم طب الأطفال، جامعة باتنة 2.'
      : 'Articles pratiques sur la santé infantile par le département de pédiatrie de Batna 2.',
    openGraph: {
      title: isAr ? 'المقالات | أوريسبيديا' : 'Articles | AuresPédia',
    },
  }
}

export default async function ArticlesPage({ params: { locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'articles' })
  const articles = await getAllArticles(locale)

  // Alternate image side: even = image right, odd = image left
  const getVariant = (i) => ({ variant: 'horizontal', imageRight: i % 2 === 0 })

  return (
    <>
      <section className="container mx-auto px-4 py-12">
        {articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article, i) => {
              const { variant, imageRight } = getVariant(i)
              return (
                <ArticleCard
                  key={article._id}
                  item={article}
                  locale={locale}
                  variant={variant}
                  imageRight={imageRight}
                />
              )
            })}
          </div>
        ) : (
          /* Placeholder articles for dev */
          <div className="space-y-6">
            {[0, 1, 2].map((i) => {
              const { variant, imageRight } = getVariant(i)
              return (
                <ArticleCard
                  key={i}
                  item={{
                    _id: String(i),
                    title: "L'importance de la nutrition infantile en Algérie",
                    slug: { current: 'placeholder' },
                    category: 'Santé',
                    body: "Une alimentation équilibrée dès le plus jeune âge est essentielle pour assurer une croissance saine et prévenir de nombreuses maladies. En Algérie, les pédiatres insistent de plus en plus sur la sensibilisation des familles à l'importance de l'alimentation riche en fruits, légumes, céréales complètes et protéines adaptées aux besoins des enfants.",
                    author: 'HAMIDI Brahim',
                  }}
                  locale={locale}
                  variant={variant}
                  imageRight={imageRight}
                />
              )
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors">
            {t('viewAll')}
          </button>
        </div>
      </section>

      <ContactForm />
    </>
  )
}
