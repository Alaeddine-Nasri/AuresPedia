import Image from 'next/image'

export default function TeamCard({ member, highlighted = false }) {
  return (
    <div
      className="relative rounded-2xl flex-shrink-0"
      style={{ height: 320, background: highlighted ? 'transparent' : '#ffffff', overflow: 'visible' }}
    >
      {/* Clip only the image, not the floating card */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        {member.photo ? (
          <div className="absolute left-0 right-0 top-0" style={{ height: highlighted ? '100%' : '68%' }}>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="absolute left-0 right-0 top-0 bg-gray-200 flex items-center justify-center" style={{ height: highlighted ? '100%' : '68%' }}>
            <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Floating details card — 3px below photo for normal, near bottom for highlighted */}
      <div
        className="absolute rounded-xl bg-white shadow-sm px-5 py-4"
        style={
          highlighted
            ? { left: '4%', right: '4%', bottom: 6 }
            : { left: '4%', right: '4%', top: 'calc(68% + 3px)' }
        }
      >
        <h3 className="font-bold text-dark text-base leading-snug">{member.name}</h3>
        {member.jobTitle && (
          <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-1 hover:line-clamp-none transition-all duration-200">{member.jobTitle}</p>
        )}
        {member.university && (
          <p className="text-gray-400 text-sm mt-0.5">{member.university}</p>
        )}
        {member.location && (
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-gray-500 text-sm">{member.location}</span>
            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
