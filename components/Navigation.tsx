'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Overview' },
  { href: '/districts', label: 'Districts' },
  { href: '/compare', label: 'Compare' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/policy', label: 'Policy' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: 'rgba(247, 246, 242, 0.95)',
        borderBottom: '0.8px solid rgba(14, 14, 12, 0.09)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-10 h-14 flex items-center justify-between">
        
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#0e0e0c' }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="5" width="14" height="2.5" rx="1.25" fill="#9e7c44"/>
              <rect x="0" y="0" width="9" height="2" rx="1" fill="#f7f6f2"/>
              <rect x="0" y="10" width="11" height="2" rx="1" fill="#f7f6f2"/>
            </svg>
          </div>
          <span
            className="font-serif font-bold text-base tracking-tight"
            style={{ color: '#9e7c44', fontFamily: 'Libre Baskerville, serif' }}
          >
            Nepal Remittance Paradox
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-0.5">
          {links.map(({ href, label }) => {
            const isActive = href === '/'
              ? pathname === '/'
              : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded text-sm transition-all"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 500,
                  backgroundColor: isActive ? '#0e0e0c' : 'transparent',
                  color: isActive ? '#f7f6f2' : '#6a6860',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
