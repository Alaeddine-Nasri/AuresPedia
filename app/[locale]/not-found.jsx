'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const translations = {
  fr: {
    title: '404',
    heading: 'Page introuvable',
    text: "La page que vous recherchez n'existe pas.",
    back: "Retour à l'accueil",
  },
  ar: {
    title: '404',
    heading: 'الصفحة غير موجودة',
    text: 'الصفحة التي تبحث عنها غير موجودة.',
    back: 'العودة إلى الرئيسية',
  },
}

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/ar') ? 'ar' : 'fr'
  const t = translations[locale]
  const isRTL = locale === 'ar'

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-neutral px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <h1 className="text-8xl font-bold text-primary mb-4">{t.title}</h1>
      <h2 className="text-2xl font-bold text-dark mb-2">{t.heading}</h2>
      <p className="text-gray-600 mb-8 text-center max-w-sm">{t.text}</p>
      <Link
        href={`/${locale}`}
        className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
      >
        {t.back}
      </Link>
    </div>
  )
}
