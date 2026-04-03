import Image from 'next/image'
import Link from 'next/link'

export default function NewsCard({ item, locale }) {
  const dateStr = item.date
    ? new Date(item.date).toLocaleDateString(
        locale === 'ar' ? 'ar-DZ' : 'fr-FR',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : ''

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-neutral flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {dateStr && (
          <p className="text-primary text-xs font-semibold mb-2">{dateStr}</p>
        )}
        <h3 className="font-bold text-dark text-sm leading-snug mb-2 line-clamp-2 flex-1">
          {item.title}
        </h3>
        {item.summary && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">
            {item.summary}
          </p>
        )}
        {item.slug?.current && (
          <Link
            href={`/${locale}/actualites/${item.slug.current}`}
            className="text-primary text-xs font-semibold hover:underline mt-auto"
          >
            Voir plus
          </Link>
        )}
      </div>
    </article>
  )
}
