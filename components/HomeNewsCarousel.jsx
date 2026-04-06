'use client'

import { useState, useEffect } from 'react'
import NewsCard from './NewsCard'

export default function HomeNewsCarousel({ items, locale }) {
  const [index, setIndex] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const gap = 20

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setPerPage(w < 640 ? 1 : w < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const max = Math.max(0, items.length - perPage)
  const clampedIndex = Math.min(index, max)

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-${clampedIndex} * (100% / ${perPage} + ${gap / perPage}px)))`,
          }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              style={{ minWidth: `calc(100% / ${perPage} - ${gap * (perPage - 1) / perPage}px)` }}
              className="flex-shrink-0"
            >
              <NewsCard item={item} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      {items.length > perPage && (
        <div className="flex items-center justify-center gap-2 mt-5">
          <NavBtn onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={clampedIndex === 0} dir="prev" />
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === clampedIndex ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
          <NavBtn onClick={() => setIndex((i) => Math.min(max, i + 1))} disabled={clampedIndex >= max} dir="next" />
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}
