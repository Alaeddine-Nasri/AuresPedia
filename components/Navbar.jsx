'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useBalloons } from './BalloonsContext'

export default function Navbar({ locale }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const closeTimer = useRef(null)
  const pathname = usePathname()
  const t = useTranslations('nav')
  const dropdownRef = useRef(null)

  const openDropdown = (key) => {
    clearTimeout(closeTimer.current)
    setActiveDropdown(key)
  }

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  const { enabled: balloonsEnabled, toggle: toggleBalloons } = useBalloons()
  const otherLocale = locale === 'fr' ? 'ar' : 'fr'
  const switchLocaleHref = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const navLinks = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/a-propos` },
    {
      key: 'news',
      href: `/${locale}/actualites`,
      dropdown: [
        { label: 'Toutes les actualités', href: `/${locale}/actualites` },
      ],
    },
    {
      key: 'activities',
      href: `/${locale}/activites`,
      dropdown: [
        { label: 'Événements à venir', href: `/${locale}/activites` },
        { label: 'Événements passés', href: `/${locale}/activites` },
      ],
    },
    {
      key: 'articles',
      href: `/${locale}/articles`,
      dropdown: [
        { label: 'Tous les articles', href: `/${locale}/articles` },
      ],
    },
  ]

  const isActive = (href) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-shadow duration-300">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-0.5 font-bold text-xl shrink-0"
        >
          <span className="text-primary">Aures</span>
          <span className="text-dark">Pédia</span>
        </Link>

        {/* Desktop nav links */}
        <div
          ref={dropdownRef}
          className="hidden md:flex items-center gap-0.5"
        >
          {navLinks.map((link) => (
            <div key={link.key} className="relative">
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-dark hover:text-primary hover:bg-primary/5'
                }`}
                onMouseEnter={() => link.dropdown && openDropdown(link.key)}
                onMouseLeave={closeDropdown}
              >
                <Link href={link.href} className="contents" onClick={() => setActiveDropdown(null)}>
                  {t(link.key)}
                </Link>
                {link.dropdown && (
                  <svg
                    className={`w-3 h-3 transition-transform duration-150 ${
                      activeDropdown === link.key ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    isActive(link.href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
                  }`}
                  style={{ transformOrigin: 'left' }}
                />
              </button>

              {/* Dropdown */}
              {link.dropdown && (
                <div
                  className={`absolute top-full ltr:left-0 rtl:right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 min-w-48 transition-all duration-200 ${
                    activeDropdown === link.key
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  onMouseEnter={() => openDropdown(link.key)}
                  onMouseLeave={closeDropdown}
                >
                  {link.dropdown.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-dark hover:text-primary hover:bg-primary/5 transition-all duration-150 hover:pl-5"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side — desktop */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* Language switcher */}
          <Link
            href={switchLocaleHref}
            className="text-sm font-semibold text-dark px-2 py-1 hover:text-primary transition-colors"
          >
            {locale === 'fr' ? 'ع' : 'FR'}
          </Link>

          {/* Contactez-nous */}
          <Link
            href={`/${locale}/a-propos#contact`}
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-150"
          >
            {t('contact')}
          </Link>

          {/* Balloons toggle */}
          <button
            onClick={toggleBalloons}
            title={balloonsEnabled ? 'Désactiver les ballons' : 'Activer les ballons'}
            className={`w-9 h-9 border rounded-xl flex items-center justify-center text-base transition-all duration-200 ${
              balloonsEnabled
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 grayscale opacity-50 hover:opacity-75'
            }`}
          >
            🎈
          </button>

          {/* Resources / Stats icon */}
          <Link
            href={`/${locale}/ressources`}
            className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center hover:border-primary hover:text-primary text-dark transition-colors"
            title={t('resources')}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-dark hover:bg-neutral transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          mobileOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="border-t border-gray-100 px-4 py-3 space-y-0.5 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-primary bg-primary/5'
                  : 'text-dark hover:text-primary hover:bg-neutral'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}

          <div className="pt-3 pb-1 flex items-center gap-2 border-t border-gray-100 mt-2">
            <Link
              href={`/${locale}/a-propos#contact`}
              className="flex-1 text-center bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('contact')}
            </Link>
            <Link
              href={switchLocaleHref}
              className="border border-gray-200 text-dark px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {locale === 'fr' ? 'ع' : 'FR'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
