'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const Ctx = createContext({ enabled: true, toggle: () => {} })

export function BalloonsProvider({ children }) {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('balloons-enabled')
    if (saved !== null) setEnabled(saved !== 'false')
  }, [])

  const toggle = () =>
    setEnabled(prev => {
      const next = !prev
      localStorage.setItem('balloons-enabled', String(next))
      return next
    })

  return <Ctx.Provider value={{ enabled, toggle }}>{children}</Ctx.Provider>
}

export const useBalloons = () => useContext(Ctx)
