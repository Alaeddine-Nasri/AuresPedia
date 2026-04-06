import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="relative">

      {/* Floating contact info card — overlaps green section */}
      <div className="hidden md:block absolute top-0 right-[6%] -translate-y-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-64 space-y-3.5 z-10">
        <ContactItem icon="phone" text="+213 7 44 47 99 99" href="tel:+213744479999" />
        <ContactItem icon="fax" text="+213 33 44 47 99" href="tel:+21333444799" />
        <ContactItem icon="mail" text="info@aurespedia.dz" href="mailto:info@aurespedia.dz" />
        <ContactItem icon="pin" text="Faculté De médecine Batna, G5JP+JQG, Batna, Algérie" />
      </div>

      {/* ── Green block ── */}
      <div className="bg-primary pt-10 md:pt-16 pb-10 px-4">
        <div className="container mx-auto">
          <div className="w-[88%] mx-auto">
            <h3 className="text-white font-bold text-2xl mb-3 flex items-center gap-2">
              <span>💬</span>
              {t('question')}
            </h3>
            <p className="text-white/85 text-sm leading-relaxed max-w-sm">
              {t('questionBody')}
            </p>

            {/* Contact details — visible on mobile only (desktop uses floating card) */}
            <div className="md:hidden mt-6 space-y-3 bg-white/10 rounded-2xl p-4">
              <ContactItem icon="phone" text="+213 7 44 47 99 99" href="tel:+213744479999" light />
              <ContactItem icon="fax" text="+213 33 44 47 99" href="tel:+21333444799" light />
              <ContactItem icon="mail" text="info@aurespedia.dz" href="mailto:info@aurespedia.dz" light />
              <ContactItem icon="pin" text="Faculté De médecine Batna, G5JP+JQG, Batna, Algérie" light />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom block ── */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-7">
          <div className="w-[88%] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            {/* Brand */}
            <div>
              <p className="text-white font-bold text-3xl">AuresPédia</p>
              <p className="text-white/80 text-base mt-1">{t('dept')}</p>
              <p className="text-white/80 text-base">{t('university')}</p>
              <p className="text-white/50 text-xs mt-3">© {new Date().getFullYear()} AuresPédia — Tous droits réservés. · Créé par <span className="text-white/70 font-medium">Ala Eddine Nasri</span></p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <SocialLink href="https://facebook.com" label="Facebook" icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              } />
              <SocialLink href="https://instagram.com" label="Instagram" icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              } />
              <SocialLink href="https://youtube.com" label="YouTube" icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              } />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function ContactItem({ icon, text, href, light = false }) {
  const icons = {
    phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    fax: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    pin: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
  }

  const content = (
    <div className={`flex items-start gap-3 ${light ? 'text-white' : 'text-dark'}`}>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${light ? 'bg-white/20' : 'bg-primary/10'}`}>
        <svg className={`w-4 h-4 ${light ? 'text-white' : 'text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icons[icon]}
        </svg>
      </span>
      <span className={`text-sm leading-relaxed pt-1 ${light ? 'text-white/90' : ''}`}>{text}</span>
    </div>
  )

  if (!href) return content
  return <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a>
}

function SocialLink({ href, label, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors duration-200">
      {icon}
    </a>
  )
}
