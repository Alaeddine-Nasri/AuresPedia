'use client'

import { useState } from 'react'

function VisionIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none"
      className="absolute top-1/2 -translate-y-1/2 right-[5%] opacity-[0.18] text-primary pointer-events-none"
      style={{ width: '40%', height: '80%' }}
      stroke="currentColor" strokeWidth="3">
      <circle cx="50" cy="50" r="22" />
      <circle cx="50" cy="50" r="36" />
      <circle cx="50" cy="50" r="10" fill="currentColor" stroke="none" />
      <line x1="50" y1="4" x2="50" y2="16" />
      <line x1="50" y1="84" x2="50" y2="96" />
      <line x1="4" y1="50" x2="16" y2="50" />
      <line x1="84" y1="50" x2="96" y2="50" />
    </svg>
  )
}

function MissionIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none"
      className="absolute top-1/2 -translate-y-1/2 right-[5%] opacity-[0.18] text-primary pointer-events-none"
      style={{ width: '40%', height: '80%' }}
      stroke="currentColor" strokeWidth="3">
      {/* Flag on a pole */}
      <line x1="20" y1="10" x2="20" y2="90" strokeLinecap="round" />
      <path d="M20 12 L75 25 L20 48 Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

const FALLBACK = {
  fr: {
    vision: "Notre vision est de faire d'AuresPédia la référence en ressources pédiatriques en Algérie — accessible à tous, partout, en français et en arabe.",
    mission: "Notre mission est de partager des connaissances médicales fiables, validées par nos experts, pour accompagner professionnels et familles dans la prise en charge de l'enfant.",
  },
  ar: {
    vision: "رؤيتنا هي جعل أوريسبيديا المرجع في الموارد الطبية للأطفال في الجزائر — متاحًا للجميع، في كل مكان، بالفرنسية والعربية.",
    mission: "مهمتنا هي مشاركة المعرفة الطبية الموثوقة، المُعتمدة من خبرائنا، لمرافقة المختصين والعائلات في رعاية الطفل.",
  },
}

export default function VisionMission({ vision, mission, locale = 'fr' }) {
  const [tab, setTab] = useState('vision')
  const [animate, setAnimate] = useState(true)

  const lang = locale === 'ar' ? 'ar' : 'fr'
  const fallback = FALLBACK[lang]

  function switchTab(t) {
    if (t === tab) return
    setAnimate(false)
    setTimeout(() => { setTab(t); setAnimate(true) }, 250)
  }

  const text = tab === 'vision' ? (vision || fallback.vision) : (mission || fallback.mission)
  const slideClass = animate ? 'opacity-100 translate-x-0' : (tab === 'vision' ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4')

  const labels = {
    fr: { vision: 'Vision', mission: 'Mission' },
    ar: { vision: 'رؤيتنا', mission: 'مهمتنا' },
  }

  return (
    <div className="relative bg-white rounded-xl border border-gray-100 shadow-md px-6 py-3 overflow-hidden" style={{ height: '110px' }}>
      {tab === 'vision' ? <VisionIcon /> : <MissionIcon />}

      {/* Tabs */}
      <div className="flex gap-6 mb-2 relative z-10">
        {['vision', 'mission'].map(t => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            className={`text-sm font-semibold pb-1.5 border-b-2 transition-all duration-300 ${
              tab === t ? 'border-primary text-dark' : 'border-transparent text-gray-300 hover:text-gray-500'
            }`}
          >
            {labels[lang][t]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={`transition-all duration-300 relative z-10 ${slideClass}`}>
        <p className="text-gray-600 text-sm leading-relaxed text-justify line-clamp-3">
          {text}
        </p>
      </div>
    </div>
  )
}
