'use client'

import { useBalloons } from './BalloonsContext'

const BALLOONS = [
  { emoji: '🎈', x:  4, size: 18, duration: 16, delay:   0 },
  { emoji: '🌸', x: 10, size: 14, duration: 21, delay:  -6 },
  { emoji: '🎀', x: 17, size: 16, duration: 18, delay: -13 },
  { emoji: '✨', x: 24, size: 13, duration: 14, delay:  -3 },
  { emoji: '💕', x: 31, size: 15, duration: 20, delay: -17 },
  { emoji: '🦋', x: 38, size: 17, duration: 17, delay:  -8 },
  { emoji: '🌷', x: 45, size: 14, duration: 22, delay:  -1 },
  { emoji: '🌟', x: 52, size: 16, duration: 15, delay: -11 },
  { emoji: '🎈', x: 59, size: 20, duration: 19, delay:  -5 },
  { emoji: '💫', x: 66, size: 13, duration: 16, delay: -14 },
  { emoji: '🎀', x: 72, size: 15, duration: 21, delay:  -9 },
  { emoji: '🌸', x: 79, size: 18, duration: 13, delay:  -2 },
  { emoji: '✨', x: 85, size: 12, duration: 18, delay: -16 },
  { emoji: '💕', x: 91, size: 16, duration: 20, delay:  -7 },
  { emoji: '🎈', x: 96, size: 14, duration: 15, delay: -12 },
  { emoji: '🦋', x:  7, size: 13, duration: 19, delay: -18 },
  { emoji: '🌟', x: 28, size: 15, duration: 22, delay: -10 },
  { emoji: '🌷', x: 63, size: 16, duration: 16, delay:  -4 },
]

export default function BalloonsFloat() {
  const { enabled } = useBalloons()

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {BALLOONS.map((b, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${b.x}%`,
            bottom: '-40px',
            fontSize: `${b.size}px`,
            lineHeight: 1,
            animation: `balloonFloat ${b.duration}s ${b.delay}s linear infinite`,
          }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  )
}
