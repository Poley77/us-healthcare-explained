'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { search, initSearch } from '@/lib/search'

export default function SearchOverlay() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ concepts: [], chapters: [] })
  const inputRef = useRef(null)

  // Pre-load search index
  useEffect(() => { initSearch() }, [])

  useEffect(() => {
    const openHandler = () => setOpen(true)
    const keydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('open-search', openHandler)
    window.addEventListener('keydown', keydown)
    return () => {
      window.removeEventListener('open-search', openHandler)
      window.removeEventListener('keydown', keydown)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setResults({ concepts: [], chapters: [] })
    }
  }, [open])

  useEffect(() => {
    if (query.length >= 2) {
      // Small delay to let async index build if needed
      const t = setTimeout(async () => {
        await initSearch()
        setResults(search(query))
      }, 50)
      return () => clearTimeout(t)
    } else {
      setResults({ concepts: [], chapters: [] })
    }
  }, [query])

  if (!open) return null

  const total = results.concepts.length + results.chapters.length

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2E2DC]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E2E2DC]">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search chapters, concepts..."
            className="flex-1 text-base text-gray-900 placeholder-gray-400 outline-none bg-transparent font-sans"
          />
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 text-sm font-sans">esc</button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.length < 2 && (
            <p className="text-center text-sm text-gray-400 py-10 font-sans">Type to search chapters and concepts</p>
          )}
          {query.length >= 2 && total === 0 && (
            <p className="text-center text-sm text-gray-400 py-10 font-sans">No results for &ldquo;{query}&rdquo;</p>
          )}
          {results.chapters.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-50 border-b border-[#E2E2DC] font-sans">Chapters</div>
              {results.chapters.map(r => (
                <Link key={r.slug} href={r.href} onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 px-4 py-3 hover:bg-blue-50 border-b border-[#E2E2DC] transition-colors">
                  <span className="text-sm font-medium text-gray-900 font-sans">{r.title}</span>
                  <span className="text-xs text-gray-500 line-clamp-1">{r.subtitle}</span>
                </Link>
              ))}
            </div>
          )}
          {results.concepts.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-50 border-b border-[#E2E2DC] font-sans">Concepts</div>
              {results.concepts.map(r => (
                <Link key={r.slug} href={r.href} onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 px-4 py-3 hover:bg-blue-50 border-b border-[#E2E2DC] transition-colors">
                  <span className="text-sm font-medium text-gray-900 font-sans">{r.title}</span>
                  <span className="text-xs text-gray-500 line-clamp-1">{r.subtitle}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
