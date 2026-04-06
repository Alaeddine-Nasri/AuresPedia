import Image from 'next/image'
import Link from 'next/link'

/** Extract plain text from Portable Text blocks or plain string */
function getExcerpt(body) {
  if (!body) return ''
  if (typeof body === 'string') return body
  if (Array.isArray(body)) {
    return body
      .filter((b) => b._type === 'block')
      .map((b) => b.children?.map((c) => c.text).join('') || '')
      .join(' ')
  }
  return ''
}

function HighlightTitle({ title }) {
  if (!title) return null
  const words = title.split(' ')
  if (words.length < 4) return <>{title}</>
  const splitAt = Math.ceil(words.length * 0.45)
  return (
    <>
      {words.slice(0, splitAt).join(' ')}{' '}
      <span className="text-primary">{words.slice(splitAt, splitAt + 2).join(' ')}</span>{' '}
      {words.slice(splitAt + 2).join(' ')}
    </>
  )
}

function CategoryTag({ category, locale, href }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
      <span>🏠</span>
      <Link href={`/${locale}/articles`} className="hover:text-primary transition-colors">Articles</Link>
      {category && (
        <>
          <span>/</span>
          <span className="text-primary font-semibold">{category}</span>
        </>
      )}
    </div>
  )
}

export default function ArticleCard({
  item,
  locale,
  variant = 'compact',
  imageRight = false,
}) {
  const href = item.slug?.current
    ? `/${locale}/articles/${item.slug.current}`
    : null

  const excerpt = getExcerpt(item.body) || item.summary || ''

  // ── Featured (home page) ──────────────────────────────────────────────────
  if (variant === 'featured') {
    return (
      <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8 flex flex-col justify-center">
            <CategoryTag category={item.category} locale={locale} />
            <h2 className="text-2xl font-bold text-dark mb-3 leading-snug">
              <HighlightTitle title={item.title} />
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 mb-6">
              {excerpt}
            </p>
            {href && (
              <Link
                href={href}
                className="inline-block bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors w-fit"
              >
                Lire la suite
              </Link>
            )}
            {item.author && (
              <p className="text-gray-400 text-xs mt-4">Pr. {item.author}</p>
            )}
          </div>
          <div className="flex-1 relative min-h-64 md:min-h-0 bg-neutral">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
            )}
          </div>
        </div>
      </article>
    )
  }

  // ── Horizontal (articles list page) ──────────────────────────────────────
  if (variant === 'horizontal') {
    return (
      <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 w-full">
        <div className={`flex flex-col md:flex-row ${imageRight ? '' : 'md:flex-row-reverse'}`}>

          {/* Text side */}
          <div className="flex-1 px-6 py-8 md:px-12 md:py-12 flex flex-col justify-center min-w-0">
            <CategoryTag category={item.category} locale={locale} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
              <HighlightTitle title={item.title} />
            </h2>
            <p className="text-gray-700 text-[0.9375rem] leading-relaxed line-clamp-5 mb-6 text-justify">
              {excerpt || 'Contenu de l\'article disponible en cliquant sur "Lire la suite".'}
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              {href && (
                <Link
                  href={href}
                  className="btn-read-more bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  Lire la suite <span className="arrow">→</span>
                </Link>
              )}
              {item.author && (
                <p className="text-gray-600 text-sm font-medium">Pr. {item.author}</p>
              )}
            </div>
          </div>

          {/* Image side — 47% width */}
          <div className="relative w-full md:w-[47%] flex-shrink-0 min-h-64 md:min-h-0 bg-neutral">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
            )}
          </div>
        </div>
      </article>
    )
  }

  // ── Compact (grid cards) ──────────────────────────────────────────────────
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-neutral flex-shrink-0">
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
      <div className="p-5 flex flex-col flex-1">
        {item.category && (
          <span className="text-primary text-xs font-semibold">{item.category}</span>
        )}
        <h3 className="font-bold text-dark text-sm mt-1 mb-2 line-clamp-2 flex-1">
          {item.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>
        {href && (
          <Link
            href={href}
            className="text-primary text-xs font-semibold hover:underline mt-auto"
          >
            Lire la suite
          </Link>
        )}
      </div>
    </article>
  )
}
