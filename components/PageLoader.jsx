'use client'

import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [phase, setPhase] = useState('balloon') // balloon → burst → out → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('burst'),  1200)
    const t2 = setTimeout(() => setPhase('out'),    1550)
    const t3 = setTimeout(() => setPhase('done'),   2050)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'white',
        overflow: 'hidden',
        pointerEvents: phase === 'out' ? 'none' : 'all',
        animation: phase === 'out' ? 'loaderFadeOut 0.5s ease forwards' : 'none',
      }}
    >
      {/* Balloon */}
      {phase === 'balloon' && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-60px',
            fontSize: '48px',
            lineHeight: 1,
            animation: 'loaderBalloonRise 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        >
          🎈
        </span>
      )}

      {/* Green burst */}
      {(phase === 'burst' || phase === 'out') && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#14D095',
            animation: 'loaderBurst 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      )}
    </div>
  )
}
