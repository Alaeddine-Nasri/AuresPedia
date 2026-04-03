// Server component — positions are deterministic (seeded RNG) to avoid hydration mismatch
function makeRng(seed) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 4294967296
  }
}

const CROSS_COUNT = 42

export default function BackgroundCrosses() {
  const rng = makeRng(0xa1a5)

  const crosses = Array.from({ length: CROSS_COUNT }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: 8 + rng() * 8,          // 8–16 px
    delay: rng() * 6,              // 0–6 s stagger
    duration: 4 + rng() * 3,      // 4–7 s cycle
  }))

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {crosses.map(({ id, x, y, size, delay, duration }) => (
        <span
          key={id}
          className="cross-icon"
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay.toFixed(2)}s`,
            animationDuration: `${duration.toFixed(2)}s`,
          }}
        >
          {/* vertical bar */}
          <span style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            width: '1.5px',
            height: '100%',
            background: '#14D095',
            borderRadius: '1px',
          }} />
          {/* horizontal bar */}
          <span style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            height: '1.5px',
            width: '100%',
            background: '#14D095',
            borderRadius: '1px',
          }} />
        </span>
      ))}
    </div>
  )
}
