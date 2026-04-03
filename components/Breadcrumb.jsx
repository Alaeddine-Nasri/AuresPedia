import Link from 'next/link'

/**
 * @param {{ items: Array<{label: string, href?: string}> }} props
 */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
      <span aria-hidden="true">🏠</span>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <span className="text-gray-200" aria-hidden="true">/</span>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-primary font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
