'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function formatDate(d, locale) {
  if (!d) return ''
  return new Date(d).toLocaleDateString(locale === 'ar' ? 'ar-DZ' : 'fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function getExcerpt(body) {
  if (!body) return ''
  if (typeof body === 'string') return body
  if (Array.isArray(body))
    return body.filter(b => b._type === 'block').map(b => b.children?.map(c => c.text).join('') || '').join(' ')
  return ''
}

export default function HomeActualites({ items, locale }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (items.length < 2) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(i => (i + 1) % items.length)
        setVisible(true)
      }, 400)
    }, 20000)
    return () => clearInterval(timer)
  }, [items.length])

  function go(i) {
    if (i === current) return
    setVisible(false)
    setTimeout(() => { setCurrent(i); setVisible(true) }, 400)
  }

  if (!items.length) return null
  const item = items[current]
  const summary = getExcerpt(item.summary) || getExcerpt(item.body)

  return (
    <div className="relative w-full flex flex-col md:flex-row" style={{ minHeight: 'clamp(320px, 48vw, 620px)' }}>

      {/* Green left panel — full bleed left */}
      <div className="flex-1 bg-primary flex items-stretch">
        {/* Inner content aligned to page width */}
        <div
          className="ml-auto w-full px-6 md:pl-8 md:pr-10 2xl:pr-16 py-8 md:py-12 2xl:py-16 flex flex-col justify-between"
          style={{ maxWidth: 'clamp(320px, 45vw, 640px)' }}
        >
          <div className={`transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'} flex flex-col gap-5 2xl:gap-7 flex-1`}>
            <h2 className="text-white text-2xl md:text-4xl 2xl:text-5xl font-bold">{locale === 'ar' ? 'الأخبار' : 'Actualités'}</h2>

            <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4 2xl:gap-6">
              <h3 className="text-white text-xl md:text-3xl 2xl:text-4xl font-bold leading-snug">
                {item.title}
              </h3>
              <p className="text-white/90 text-sm md:text-lg 2xl:text-xl leading-relaxed text-justify line-clamp-4 md:line-clamp-5">
                {summary}
              </p>
              <p className="text-white/70 text-base 2xl:text-lg text-right">{formatDate(item.date, locale)}</p>
            </div>

            {item.slug?.current && (
              <Link
                href={`/${locale}/actualites/${item.slug.current}`}
                className="self-start bg-white text-primary font-semibold px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-xl text-sm 2xl:text-base hover:bg-neutral transition-colors"
              >
                {locale === 'ar' ? 'اقرأ المزيد' : 'Voir plus...'}
              </Link>
            )}
          </div>

          {/* Dots */}
          {items.length > 1 && (
            <div className="flex gap-2.5 mt-8">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo right panel — full bleed right */}
      <div className="flex-1 relative overflow-hidden min-h-52 md:min-h-0">
        <div className={`absolute inset-0 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
        </div>
      </div>
    </div>
  )
}
