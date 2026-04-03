'use client'

const BALLOONS = [
  { emoji: '🎈', size: 28, x: 7,  delay: '0s',   duration: 18 },
  { emoji: '🎀', size: 20, x: 22, delay: '-10s', duration: 20 },
  { emoji: '🎈', size: 32, x: 40, delay: '-5s',  duration: 19 },
  { emoji: '⭐', size: 16, x: 58, delay: '-14s', duration: 21 },
  { emoji: '🎈', size: 24, x: 75, delay: '-7s',  duration: 18 },
  { emoji: '🎀', size: 20, x: 88, delay: '-3s',  duration: 20 },
]

export default function BalloonsBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
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
            opacity: 0.25,
            animation: `floatUp ${b.duration}s ${b.delay} linear infinite`,
          }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  )
}
