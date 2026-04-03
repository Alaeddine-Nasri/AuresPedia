'use client'

import { useState } from 'react'
import NewsCard from './NewsCard'

export default function NewsCarousel({ items, locale }) {
  const [index, setIndex] = useState(0)
  const visible = 3
  const max = Math.max(0, items.length - visible)

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(max, i + 1))

  return (
    <div className="relative px-4">
      <div className="container mx-auto overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-300"
          style={{ transform: `translateX(calc(-${index} * (100% / ${visible} + 20px / ${visible})))` }}
        >
          {items.map((item) => (
            <div key={item._id} className="min-w-[calc(33.333%-14px)] flex-shrink-0">
              <NewsCard item={item} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      {items.length > visible && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            disabled={index === 0}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-dark transition-colors"
            aria-label="Précédent"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={index >= max}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-dark transition-colors"
            aria-label="Suivant"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
