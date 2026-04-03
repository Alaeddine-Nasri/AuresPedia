'use client'

import { useState, useEffect } from 'react'

const FALLBACK = [
  {
    quote: "Prendre soin de nos enfants aujourd'hui, c'est investir dans un avenir meilleur pour toute la société, car chaque enfant épanoui devient un adulte porteur de changement. 🧸",
    author: 'Dr. Ahmed',
    role: 'Professeur en pédiatrie générale',
  },
  {
    quote: "La santé de l'enfant est le fondement de toute société prospère. Notre mission est d'offrir les meilleurs soins et les meilleures ressources aux familles algériennes. 💙",
    author: 'Pr. Noureddine',
    role: 'Chef de service – Pédiatrie',
  },
]

export default function HeroQuotes({ quotes = [] }) {
  const items = quotes.length >= 2 ? quotes : FALLBACK
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (items.length < 2) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(i => (i + 1) % items.length)
        setVisible(true)
      }, 400)
    }, 10000)
    return () => clearInterval(timer)
  }, [items.length])

  function go(i) {
    if (i === current) return
    setVisible(false)
    setTimeout(() => { setCurrent(i); setVisible(true) }, 400)
  }

  const q = items[current]

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Dots */}
      <div className="flex gap-2 mb-4 justify-center">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-primary scale-125' : 'bg-gray-200 hover:bg-gray-300'}`}
          />
        ))}
      </div>

      {/* Quote */}
      <div className={`transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'} flex-1`}>
        <p className="text-gray-700 text-[0.75rem] leading-relaxed text-justify font-medium">
          <span className="text-primary text-4xl font-serif leading-none select-none align-bottom mr-0.5">&ldquo;</span>{q.quote}
        </p>
        <div className="mt-5">
          <p className="font-bold text-dark text-xs">{q.author}</p>
          <p className="text-gray-500 text-[0.65rem] mt-0.5">{q.role}</p>
        </div>
      </div>
    </div>
  )
}
