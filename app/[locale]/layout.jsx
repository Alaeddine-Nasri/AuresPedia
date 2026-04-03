import { Manrope, Cairo } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import FooterWrapper from '@/components/FooterWrapper'
import BackgroundOrbs from '@/components/BackgroundOrbs'
import BalloonsFloat from '@/components/BalloonsFloat'
import { BalloonsProvider } from '@/components/BalloonsContext'
import PageLoader from '@/components/PageLoader'
import PageTransition from '@/components/PageTransition'
import '@/app/globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
})

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'ar' }]
}

export async function generateMetadata({ params: { locale } }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aurespedia.univ-batna2.dz'
  return {
    title: {
      template: '%s | AuresPédia',
      default: 'AuresPédia – Pédiatrie · Batna 2',
    },
    description:
      'Site informatif de pédiatrie du Département de Médecine, Université de Batna 2, Algérie.',
    metadataBase: new URL(baseUrl),
    openGraph: {
      siteName: 'AuresPédia',
      locale: locale === 'ar' ? 'ar_DZ' : 'fr_DZ',
      type: 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'AuresPédia' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AuresPedia',
    },
    alternates: {
      languages: {
        fr: `${baseUrl}/fr`,
        ar: `${baseUrl}/ar`,
      },
    },
  }
}

export default async function LocaleLayout({ children, params: { locale } }) {
  setRequestLocale(locale)
  const messages = await getMessages()
  const isRTL = locale === 'ar'

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${manrope.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${isRTL ? 'font-arabic' : 'font-sans'} antialiased text-dark`}
        style={{ position: 'relative' }}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <PageLoader />
          <BalloonsProvider>
            <BackgroundOrbs />
            <BalloonsFloat />
            <Navbar locale={locale} />
            <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
            <FooterWrapper />
          </BalloonsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
