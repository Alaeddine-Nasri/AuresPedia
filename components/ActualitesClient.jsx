'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function getExcerpt(body) {
  if (!body) return ''
  if (typeof body === 'string') return body
  if (Array.isArray(body))
    return body.filter((b) => b._type === 'block').map((b) => b.children?.map((c) => c.text).join('') || '').join(' ')
  return ''
}

function formatDate(d, locale) {
  if (!d) return ''
  return new Date(d).toLocaleDateString(locale === 'ar' ? 'ar-DZ' : 'fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ActualitesClient({ items, locale, introText, introHighlight, introBody }) {
  const [selected, setSelected]   = useState(0)
  const [animKey, setAnimKey]     = useState(0)
  const [cardStart, setCardStart] = useState(0)
  const [perPage, setPerPage]     = useState(3)
  const [slideWidth, setSlideWidth] = useState(0)
  const containerRef = useRef(null)
  const gap = 16

  useEffect(() => {
    const update = () => {
      const pp = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
      setPerPage(pp)
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setSlideWidth((w - gap * (pp - 1)) / pp)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!items.length) {
    return (
      <div className="w-[88%] mx-auto bg-neutral rounded-2xl h-48 flex items-center justify-center">
        <p className="text-gray-400">Aucune actualité pour le moment.</p>
      </div>
    )
  }

  const item = items[selected]
  const summary = getExcerpt(item.summary) || getExcerpt(item.body)
  const max = Math.max(0, items.length - perPage)
  const clampedStart = Math.min(cardStart, max)

  function handleSelect(i) {
    if (i === selected) return
    setSelected(i)
    setAnimKey((k) => k + 1)
  }

  return (
    <div className="w-[88%] mx-auto space-y-8">

      {/* ── Featured — MOBILE: stacked, DESKTOP: overlapping ── */}

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-md">
          {item.image ? (
            <Image src={item.image} alt={item.title} fill className="object-cover" priority sizes="100vw" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/15 to-primary/5" />
          )}
        </div>
        <div key={animKey} className="news-reveal-ltr bg-white rounded-2xl border border-primary/40 px-6 py-5 flex flex-col gap-3">
          <p className="text-primary font-semibold text-xs uppercase tracking-wide">{formatDate(item.date, locale)}</p>
          <h1 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2">{item.title}</h1>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 text-justify">{summary}</p>
          {item.slug?.current && (
            <Link
              href={`/${locale}/actualites/${item.slug.current}`}
              className="btn-read-more inline-block bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors w-fit"
            >
              Lire la suite <span className="arrow">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative" style={{ height: '400px' }}>
        <div className="absolute right-0 top-0 w-[50%] h-full rounded-2xl overflow-hidden shadow-md">
          {item.image ? (
            <Image src={item.image} alt={item.title} fill className="object-cover" priority sizes="50vw" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/15 to-primary/5" />
          )}
          {item.videoUrl && (
            <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                <svg className="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </a>
          )}
        </div>
        <div
          key={animKey}
          className="news-reveal-ltr relative z-10 bg-white rounded-2xl border border-primary/40 flex flex-col justify-between px-10"
          style={{ width: '58%', height: '80%', paddingTop: '2.25rem', paddingBottom: '2.25rem' }}
        >
          <div>
            <p className="text-primary font-semibold text-xs mb-3 uppercase tracking-wide">{formatDate(item.date, locale)}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug line-clamp-2">{item.title}</h1>
            <p className="text-gray-700 text-[0.9375rem] leading-relaxed line-clamp-4 text-justify">{summary}</p>
          </div>
          {item.slug?.current && (
            <Link
              href={`/${locale}/actualites/${item.slug.current}`}
              className="btn-read-more mt-4 inline-block bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors w-fit"
            >
              Lire la suite <span className="arrow">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* ── Section intro ── */}
      {introText && (
        <div className="text-center space-y-1">
          <p className="text-lg md:text-3xl font-bold text-dark leading-snug">
            {introText}<span className="text-primary">{introHighlight}</span>
          </p>
          <p className="text-lg md:text-3xl font-bold text-dark leading-snug">{introBody}</p>
        </div>
      )}

      {/* ── Cards carousel ── */}
      <div className="relative">
        <div ref={containerRef} className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${clampedStart * (slideWidth + gap)}px)`,
            }}
          >
            {items.map((n, i) => (
              <div
                key={n._id}
                style={{ width: `${slideWidth}px`, minWidth: `${slideWidth}px` }}
                className="flex-shrink-0"
              >
                <NewsPickCard item={n} locale={locale} isSelected={i === selected} onClick={() => handleSelect(i)} />
              </div>
            ))}
          </div>
        </div>

        {items.length > perPage && (
          <div className="flex items-center justify-center gap-3 mt-5">
            <NavBtn onClick={() => setCardStart((s) => Math.max(0, s - 1))} disabled={clampedStart === 0} dir="prev" />
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button key={i} onClick={() => setCardStart(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === clampedStart ? 'bg-primary scale-125' : 'bg-gray-200 hover:bg-gray-300'}`}
              />
            ))}
            <NavBtn onClick={() => setCardStart((s) => Math.min(max, s + 1))} disabled={clampedStart >= max} dir="next" />
          </div>
        )}
      </div>
    </div>
  )
}

function NewsPickCard({ item, locale, isSelected, onClick }) {
  const excerpt = getExcerpt(item.summary) || getExcerpt(item.body)
  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'bg-white shadow-md border border-gray-200' : 'bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-md'
      }`}
      style={{ minHeight: '220px' }}
    >
      {isSelected && <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary rounded-t-xl" />}
      {!isSelected && <div className="absolute top-0 left-0 h-[3px] w-0 bg-primary/60 rounded-t-xl transition-all duration-500 ease-in-out group-hover:w-full" />}
      <div className="px-5 pt-6 pb-5 flex flex-col flex-1">
        <p className="text-primary text-[11px] font-semibold mb-2 uppercase tracking-wide">{formatDate(item.date, locale)}</p>
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 text-justify flex-1">{excerpt}</p>
        <span className="text-primary text-xs font-semibold mt-3 inline-block">Voir plus →</span>
      </div>
    </button>
  )
}

function NavBtn({ onClick, disabled, dir }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-dark transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}
