import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import EventCard from '@/components/EventCard'
import ArticleCard from '@/components/ArticleCard'
import SectionIntro from '@/components/SectionIntro'
import HomeNewsCarousel from '@/components/HomeNewsCarousel'
import HomeActualites from '@/components/HomeActualites'
import HeroQuotes from '@/components/HeroQuotes'
import VisionMission from '@/components/VisionMission'
import {
  getLatestActualites,
  getUpcomingActivites,
  getPastActivites,
  getLatestArticles,
  getSiteConfig,
} from '@/lib/sanity'

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: 'AuresPédia – Pédiatrie · Batna 2',
    description: t('heroSubtext'),
  }
}

export default async function HomePage({ params: { locale } }) {
  setRequestLocale(locale)

  const [config, news, upcoming, past, articles] = await Promise.all([
    getSiteConfig(locale),
    getLatestActualites(locale, 4),
    getUpcomingActivites(locale),
    getPastActivites(locale, 2),
    getLatestArticles(locale, 1),
  ])

  const t = await getTranslations({ locale, namespace: 'home' })
  const featuredNews = news[0]
  const restNews = news.slice(1)
  const activitiesPreview = [...upcoming.slice(0, 1), ...past].slice(0, 2)

  const aboutImg1 = config?.aboutImage1 || '/images/team-hero.jpg'
  const aboutImg2 = config?.aboutImage2 || '/images/history-building.jpg'

  return (
    <>
      {/* ── Hero ── */}
      <section className="container mx-auto px-4 pt-12 pb-8">
        <div className="w-[88%] mx-auto flex flex-col-reverse md:flex-row items-center gap-10">

          {/* Left — text (wider) */}
          <div className="flex-[1.2] w-full">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-dark mb-5 animate-fade-in-up">
              <span className="text-primary">AuresPédia</span>{' – '}
              {config?.heroHeadline || t('heroHeadline')}
            </h1>
            <p className="text-gray-500 leading-relaxed mb-8 text-[0.9375rem] text-justify animate-fade-in-up animate-delay-100">
              {config?.heroSubtext || t('heroSubtext')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up animate-delay-200">
              <StatPill icon="👨‍⚕️" label={t('statsDoctors')} />
              <StatPill icon="📚" label={t('statsResources')} />
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-in-up animate-delay-300">
              <Link
                href={`/${locale}/a-propos#contact`}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                {t('heroCta')}
              </Link>
              <Link
                href={`/${locale}/a-propos`}
                className="btn-read-more text-dark font-semibold text-sm px-3 py-3 hover:text-primary transition-colors"
              >
                {t('heroAbout')} <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          {/* Right — image + floating quote */}
          <div className="flex-1 relative w-full">
            <div className="relative h-56 sm:h-72 md:h-[420px] rounded-2xl overflow-hidden bg-neutral w-full">
              <Image
                src={config?.heroImage || '/images/hero-home.jpg'}
                alt="AuresPédia"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            {/* Floating quote card */}
            <div className="hidden sm:block absolute bottom-4 right-4 bg-white rounded-2xl shadow-xl p-4 w-72" style={{ minHeight: '140px' }}>
              <HeroQuotes quotes={config?.quotes || []} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission separator ── */}
      <section className="bg-primary py-8 px-4">
        <div className="container mx-auto text-center space-y-1">
          <p className="text-xl md:text-3xl font-bold text-dark leading-snug">
            👩‍⚕️ {locale === 'ar' ? 'من خلال تاريخنا وقيمنا,' : 'À travers notre histoire et nos valeurs,'}
          </p>
          <p className="text-xl md:text-3xl font-bold text-white leading-snug">
            {locale === 'ar'
              ? 'نضع صحة الطفل ورفاهيته في صميم كل أعمالنا.'
              : 'nous mettons la santé et le bien-être des enfants au cœur de toutes nos actions.'}
          </p>
          <div className="pt-4">
            <Link
              href={`/${locale}/a-propos`}
              className="btn-read-more inline-block bg-white text-primary font-semibold px-7 py-3 rounded-xl text-sm hover:bg-neutral transition-colors"
            >
              {locale === 'ar' ? 'من نحن' : 'À propos de nous'} <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About preview (overlapping images + vision/mission) ── */}
      <section className="container mx-auto px-4 py-10">
        <div className="w-[88%] mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Left — overlapping photos (swapped) */}
          <div className="relative flex-shrink-0 w-full md:w-[42%]" style={{ height: '380px' }}>
            {/* Back image — bottom-right */}
            <div className="absolute right-0 bottom-0 w-[80%] h-[85%] rounded-lg overflow-hidden shadow-md">
              <Image
                src={aboutImg2}
                alt="AuresPédia campus"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 35vw"
              />
            </div>
            {/* Front image — floating top-left with white border */}
            <div className="absolute left-0 top-0 w-[55%] h-[65%] rounded-xl overflow-hidden shadow-xl ring-4 ring-white">
              <Image
                src={aboutImg1}
                alt="AuresPédia équipe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 55vw, 25vw"
              />
            </div>
          </div>

          {/* Right — text + vision/mission */}
          <div className="flex-1 space-y-5">
            <h2 className="text-4xl font-bold leading-tight text-dark">
              {locale === 'ar'
                ? <><span className="text-primary">من نحن</span> — أوريسبيديا</>
                : <><span className="text-primary">À propos</span> de nous</>}
            </h2>
            <p className="text-gray-500 text-[0.9375rem] leading-relaxed text-justify">
              {locale === 'ar'
                ? 'أوريسبيديا هي المنصة الطبية لقسم طب الأطفال بجامعة باتنة 2، تجمع بين الخبرة الأكاديمية والالتزام بصحة الطفل لتقديم موارد موثوقة للمختصين والعائلات الجزائرية.'
                : "AuresPédia est la plateforme médicale du département de pédiatrie de l'Université de Batna 2. Elle réunit expertise académique et engagement pour la santé de l'enfant."}
            </p>
            <VisionMission vision={config?.vision} mission={config?.mission} locale={locale} />
          </div>
        </div>
      </section>

      {/* ── Actualités ── */}
      <section className="w-full overflow-hidden">
        <HomeActualites items={news.slice(0, 3)} locale={locale} />
      </section>

      {/* ── Activités ── */}
      <section className="bg-neutral py-14 2xl:py-20 px-4">
        <div className="container mx-auto">
          <div className="w-[88%] mx-auto">
            <div className="mb-8 text-center space-y-1">
              <p className="text-xl md:text-3xl 2xl:text-4xl font-bold text-dark leading-snug">
                🎯 {locale === 'ar' ? 'شاركوا في أنشطة ترفيهية وتعليمية' : 'Participez à des Activités ludiques et éducatives'}
              </p>
              <p className="text-xl md:text-3xl 2xl:text-4xl font-bold text-primary leading-snug">
                {locale === 'ar' ? 'مصممة لصحة الطفل وازدهاره.' : 'pensées pour le bien-être et l\'épanouissement des enfants.'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {activitiesPreview.map((item) => (
                <EventCard key={item._id} item={item} locale={locale} />
              ))}
              {activitiesPreview.length === 0 && (
                <p className="text-gray-400 text-sm col-span-2 text-center py-8">
                  Aucune activité pour le moment.
                </p>
              )}
            </div>
            <div className="mt-8">
              <Link
                href={`/${locale}/activites`}
                className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                {t('activitiesMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="container mx-auto px-4 py-14 2xl:py-20">
        <div className="w-[88%] mx-auto">
          <div className="mb-8 text-center space-y-1">
            <p className="text-xl md:text-3xl 2xl:text-4xl font-bold text-dark leading-snug">
              📗 {locale === 'ar' ? 'لأن المعلومة الجيدة ضرورية، اطلع على' : 'Parce qu\'une bonne information est essentielle, retrouvez ici des'}
            </p>
            <p className="text-xl md:text-3xl 2xl:text-4xl font-bold text-primary leading-snug">
              {locale === 'ar' ? 'مقالات عملية حول صحة الطفل.' : 'Articles pratiques sur la santé infantile.'}
            </p>
          </div>
          <ArticleCard
            item={articles[0] || {
              _id: 'placeholder',
              title: locale === 'ar' ? 'الحمى عند الطفل: متى تقلق؟' : "Fièvre chez l'enfant : quand s'inquiéter ?",
              body: locale === 'ar'
                ? 'الحمى عند الطفل ليست دائماً خطيرة، لكنها تستدعي الانتباه. تعرّف على متى يجب استشارة الطبيب، وكيف تعتني بطفلك في المنزل بطريقة آمنة وفعّالة.'
                : "La fièvre est l'un des motifs de consultation les plus fréquents en pédiatrie. Elle peut être impressionnante mais n'est pas toujours dangereuse. Découvrez quand consulter un médecin et comment prendre soin de votre enfant à domicile.",
              image: '/images/hero-home.jpg',
              author: 'Pr. Noureddine Aouissi',
              category: locale === 'ar' ? 'صحة الطفل' : 'Santé infantile',
              slug: { current: null },
            }}
            locale={locale}
            variant="horizontal"
            imageRight={true}
          />
          <div className="mt-8">
            <Link href={`/${locale}/articles`} className="text-primary font-semibold text-sm hover:underline">
              {t('articlesMore')}
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}

function StatPill({ icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-neutral px-4 py-2 rounded-xl">
      <span className="text-lg">{icon}</span>
      <span className="text-dark font-semibold text-sm">{label}</span>
    </div>
  )
}
