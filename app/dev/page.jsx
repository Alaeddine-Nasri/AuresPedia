import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import NewsCard from '@/components/NewsCard'
import EventCard from '@/components/EventCard'
import TeamCard from '@/components/TeamCard'
import SectionIntro from '@/components/SectionIntro'
import Breadcrumb from '@/components/Breadcrumb'

export default function DevPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  const locale = 'fr'

  const article = {
    _id: '1',
    title: "L'importance de la nutrition infantile en Algérie",
    slug: { current: 'nutrition-infantile' },
    category: 'Santé',
    image: null,
    body: "Une alimentation équilibrée dès le plus jeune âge est essentielle pour assurer une croissance saine et prévenir de nombreuses maladies. En Algérie, les pédiatres insistent de plus en plus sur la sensibilisation des familles à l'importance de l'alimentation.",
    author: 'HAMIDI Brahim',
    publishedAt: '2024-10-14',
  }

  const newsItem = {
    _id: '2',
    title: 'Journée sportive pour enfants organisée à Batna',
    slug: { current: 'journee-sportive-batna' },
    date: '2024-10-14',
    summary: 'Prendre soin de nos enfants aujourd\'hui, c\'est investir dans un avenir meilleur pour toute la société.',
    image: null,
  }

  const event = {
    _id: '3',
    title: 'Atelier ludique et éducatif en pédiatrie',
    slug: { current: 'atelier-ludique' },
    date: '2025-01-13',
    location: 'Batna, Algérie',
    body: 'Notre vision est de promouvoir l\'égalité d\'accès à des soins de rhumatologie pédiatrique de qualité.',
    image: null,
  }

  const member = {
    _id: '4',
    name: 'Dr. HAMIDI Brahim',
    jobTitle: 'Associate Professor Pediatrics',
    university: 'Faculty of Medicine Batna 2 University',
    location: 'Batna, Algérie',
    photo: null,
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div>
        <h1 className="text-3xl font-bold text-dark mb-2">
          🛠️ Dev Component Showcase
        </h1>
        <p className="text-gray-500 text-sm">
          Only visible in development. Visit{' '}
          <code className="bg-neutral px-1.5 py-0.5 rounded text-xs">
            /dev
          </code>{' '}
          to preview all components.
        </p>
      </div>

      {/* Breadcrumb */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">Breadcrumb</h2>
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/fr' },
            { label: 'Articles', href: '/fr/articles' },
            { label: 'Santé' },
          ]}
        />
      </section>

      {/* SectionIntro */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">SectionIntro</h2>
        <div className="space-y-6">
          <SectionIntro
            emoji="📢"
            text="Découvrez les"
            highlight="dernières actualités"
            body="en pédiatrie et les projets organisés pour les familles."
          />
          <SectionIntro
            emoji="🎯"
            text="Participez à des"
            highlight="Activités"
            body="ludiques et éducatives pensées pour le bien-être des enfants."
          />
          <SectionIntro
            emoji="📗"
            text="Parce qu'une bonne information est essentielle, retrouvez ici des"
            highlight="Articles"
            body="pratiques sur la santé infantile."
          />
        </div>
      </section>

      {/* NewsCard */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">NewsCard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[newsItem, newsItem, newsItem].map((item, i) => (
            <NewsCard key={i} item={item} locale={locale} />
          ))}
        </div>
      </section>

      {/* EventCard */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">EventCard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[event, event].map((item, i) => (
            <EventCard key={i} item={item} locale={locale} />
          ))}
        </div>
      </section>

      {/* TeamCard */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">TeamCard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <TeamCard member={member} />
          <TeamCard member={member} highlighted />
          <TeamCard member={member} />
        </div>
      </section>

      {/* ArticleCard — compact */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">
          ArticleCard — <span className="text-primary">compact</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[article, article, article].map((item, i) => (
            <ArticleCard key={i} item={item} locale={locale} variant="compact" />
          ))}
        </div>
      </section>

      {/* ArticleCard — featured */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">
          ArticleCard — <span className="text-primary">featured</span>
        </h2>
        <ArticleCard item={article} locale={locale} variant="featured" />
      </section>

      {/* ArticleCard — horizontal (image right) */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">
          ArticleCard — <span className="text-primary">horizontal</span> (image right)
        </h2>
        <ArticleCard item={article} locale={locale} variant="horizontal" imageRight />
      </section>

      {/* ArticleCard — horizontal (image left) */}
      <section>
        <h2 className="text-lg font-bold text-dark mb-4">
          ArticleCard — <span className="text-primary">horizontal</span> (image left)
        </h2>
        <ArticleCard item={article} locale={locale} variant="horizontal" imageRight={false} />
      </section>
    </div>
  )
}
