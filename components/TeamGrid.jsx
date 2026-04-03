'use client'

import { useState } from 'react'
import TeamCard from './TeamCard'

export default function TeamGrid({ members, btnLabel }) {
  const [expanded, setExpanded] = useState(false)
  const [start, setStart] = useState(0)
  const perPage = 3

  const visible = members.slice(start, start + perPage)
  const canPrev = start > 0
  const canNext = start + perPage < members.length

  return (
    <>
      {expanded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {members.map((member, i) => (
            <TeamCard key={member._id} member={member} highlighted={i % 3 === 1} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5 mt-8">
            {visible.map((member, i) => (
              <TeamCard key={member._id} member={member} highlighted={i === 1} />
            ))}
          </div>

          {members.length > perPage && (
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => setStart(s => Math.max(0, s - 1))}
                disabled={!canPrev}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-dark transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {Array.from({ length: Math.ceil(members.length / perPage) }).map((_, i) => (
                <button key={i} onClick={() => setStart(i * perPage)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${Math.round(start / perPage) === i ? 'bg-primary scale-125' : 'bg-gray-200 hover:bg-gray-300'}`}
                />
              ))}
              <button
                onClick={() => setStart(s => Math.min(members.length - perPage, s + 1))}
                disabled={!canNext}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-dark transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-6">
        <button
          onClick={() => { setExpanded(v => !v); setStart(0) }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
        >
          {expanded ? '← Réduire' : (btnLabel || 'Voir plus...')}
        </button>
      </div>
    </>
  )
}
