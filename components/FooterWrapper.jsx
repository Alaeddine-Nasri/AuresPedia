'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  const isRessources = pathname.includes('/ressources')

  if (isRessources) {
    return (
      <footer className="bg-primary py-5 px-4">
        <div className="container mx-auto text-center">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} AuresPédia — Tous droits réservés. · Créé par{' '}
            <span className="text-white/80 font-medium">Ala Eddine Nasri</span>
          </p>
        </div>
      </footer>
    )
  }

  return <Footer />
}
