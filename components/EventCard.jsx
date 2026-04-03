import Image from 'next/image'
import Link from 'next/link'

function getBodyText(body) {
  if (!body) return ''
  if (typeof body === 'string') return body
  if (Array.isArray(body))
    return body
      .filter((b) => b._type === 'block')
      .map((b) => b.children?.map((c) => c.text).join('') || '')
      .join(' ')
  return ''
}

export default function EventCard({ item, locale }) {
  const dateStr = item.date
    ? new Date(item.date).toLocaleDateString(
        locale === 'ar' ? 'ar-DZ' : 'fr-FR',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : ''

  const body = getBodyText(item.body)

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-200">
      <div className="flex flex-col md:flex-row" style={{ minHeight: '220px' }}>

        {/* Image — left side, fixed width */}
        <div className="relative w-full md:w-64 flex-shrink-0 min-h-48 md:min-h-0 bg-neutral">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 208px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
          )}
        </div>

        {/* Content — right side */}
        <div className="flex-1 px-8 py-7 flex flex-col justify-between min-w-0">

          <div>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
              {dateStr && (
                <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {dateStr}
                </span>
              )}
              {item.location && (
                <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
              {item.title}
            </h3>

            {body && (
              <p className="text-gray-700 text-[0.9375rem] leading-relaxed line-clamp-3 text-justify">
                {body}
              </p>
            )}
          </div>

          {item.slug?.current && (
            <Link
              href={`/${locale}/activites/${item.slug.current}`}
              className="btn-read-more mt-5 inline-block bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors w-fit"
            >
              Lire la suite <span className="arrow">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
