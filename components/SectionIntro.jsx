/**
 * Reusable section heading with emoji + bold text + green highlight + gray body.
 * @param {{ emoji: string, text: string, highlight: string, body: string }} props
 */
export default function SectionIntro({ emoji, text, highlight, body }) {
  return (
    <div className="max-w-3xl">
      <p className="text-2xl md:text-3xl font-bold leading-relaxed text-dark">
        {emoji && (
          <span className="ltr:mr-2 rtl:ml-2" aria-hidden="true">
            {emoji}
          </span>
        )}
        {text && <span>{text} </span>}
        {highlight && <span className="text-primary">{highlight} </span>}
        {body && <span className="text-gray-400 font-normal">{body}</span>}
      </p>
    </div>
  )
}
