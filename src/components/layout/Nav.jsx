'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/chapters', label: 'Learn' },
    { href: '/concepts', label: 'Concepts' },
    { href: '/diagrams', label: 'Diagrams' },
    { href: '/glossary', label: 'Glossary' },
  ]

  const openSearch = () => window.dispatchEvent(new CustomEvent('open-search'))

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[#E2E2DC] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="font-bold text-sm tracking-tight text-gray-900 shrink-0 font-sans">
          US Healthcare Explained
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={[
                'text-sm font-medium transition-colors font-sans',
                pathname?.startsWith(l.href) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              ].join(' ')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openSearch}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg border border-[#E2E2DC] bg-[#FAFAF8] font-sans"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden sm:inline text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>
          <button className="md:hidden p-2 text-gray-500" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E2DC] bg-white px-4 py-3 flex flex-col gap-3">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-gray-700 py-1 font-sans">{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
