const orbs = [
  {
    id: 1,
    style: {
      width: '500px',
      height: '500px',
      top: '-100px',
      left: '-150px',
      background: 'radial-gradient(circle, #14D095 0%, transparent 70%)',
      animation: 'orbDrift1 22s ease-in-out infinite',
    },
  },
  {
    id: 2,
    style: {
      width: '420px',
      height: '420px',
      top: '30%',
      right: '-100px',
      background: 'radial-gradient(circle, #14D095 0%, transparent 70%)',
      animation: 'orbDrift2 28s ease-in-out infinite',
    },
  },
  {
    id: 3,
    style: {
      width: '360px',
      height: '360px',
      bottom: '10%',
      left: '20%',
      background: 'radial-gradient(circle, #a7f3d0 0%, transparent 70%)',
      animation: 'orbDrift3 20s ease-in-out infinite',
    },
  },
  {
    id: 4,
    style: {
      width: '300px',
      height: '300px',
      top: '55%',
      left: '-80px',
      background: 'radial-gradient(circle, #a7f3d0 0%, transparent 70%)',
      animation: 'orbDrift4 25s ease-in-out infinite',
    },
  },
]

export default function BackgroundOrbs() {
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
      {orbs.map(({ id, style }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.25,
            ...style,
          }}
        />
      ))}
    </div>
  )
}
