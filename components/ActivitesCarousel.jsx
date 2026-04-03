'use client'

import { useState } from 'react'
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

export default function ActivitesCarousel({ items, locale }) {
  const [index, setIndex] = useState(0)
  const item = items[index]
  if (!item) return null

  const dateStr = item.date
    ? new Date(item.date).toLocaleDateString(
        locale === 'ar' ? 'ar-DZ' : 'fr-FR',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : ''

  const body = getBodyText(item.body)

  return (
    <div className="mx-auto w-[88%]">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row" style={{ minHeight: '340px' }}>

          {/* ── Left — text block ── */}
          <div className="flex-1 p-8 flex flex-col justify-between min-w-0">

            {/* Meta row */}
            <div className="inline-flex items-start justify-between gap-6 mb-7">
              {/* Type pill */}
              <span className="bg-primary text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 mt-0.5 tracking-wide uppercase">
                Événement
              </span>

              {/* Date + Location stacked — right aligned */}
              <div className="flex flex-col gap-1.5 items-end text-right">
                {dateStr && (
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold">
                    {dateStr}
                    <svg className="w-3.5 h-3.5 shrink-0 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                )}
                {item.location && (
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold">
                    {item.location}
                    <svg className="w-3.5 h-3.5 shrink-0 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
              {item.title}
            </h2>

            {/* Body */}
            <p className="text-gray-700 text-[0.9375rem] leading-relaxed line-clamp-5 flex-1 text-justify">
              {body || 'Détails disponibles en cliquant sur "Voir plus".'}
            </p>

            {/* Link */}
            {item.slug?.current && (
              <div className="mt-6">
                <Link
                  href={`/${locale}/activites/${item.slug.current}`}
                  className="btn-read-more text-primary text-sm font-semibold hover:underline"
                >
                  Voir plus <span className="arrow">→</span>
                </Link>
              </div>
            )}
          </div>

          {/* ── Right — image ── */}
          <div className="relative w-full md:w-[45%] flex-shrink-0 min-h-64 md:min-h-0 bg-neutral">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/15 to-primary/5" />
            )}
            {item.videoUrl && (
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                  <svg className="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Dots navigation */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5">
          <NavBtn onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0} dir="prev" />
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === index ? 'bg-primary scale-125' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
          <NavBtn onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))} disabled={index === items.length - 1} dir="next" />
        </div>
      )}
    </div>
  )
}

function NavBtn({ onClick, disabled, dir }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-dark transition-colors"
      aria-label={dir === 'prev' ? 'Précédent' : 'Suivant'}
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
          d={dir === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  )
}
