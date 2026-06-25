'use client'
import { useState } from 'react'
import Link from 'next/link'
import { search } from '@/lib/search'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const results = query.length >= 2 ? search(query) : { concepts: [], chapters: [] }
  const total = results.concepts.length + results.chapters.length

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-sans">Search</h1>
      <input value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Search chapters, concepts, terms..." autoFocus
        className="w-full px-4 py-3 rounded-xl border border-[#E2E2DC] bg-white text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-300 shadow-sm mb-8 font-sans" />

      {query.length >= 2 && total === 0 && (
        <p className="text-gray-400 text-center py-8 font-sans">No results for &ldquo;{query}&rdquo;</p>
      )}
      {results.chapters.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 font-sans">Chapters</h2>
          <div className="flex flex-col gap-2">
            {results.chapters.map(r => (
              <Link key={r.slug} href={r.href}
                className="group block p-4 rounded-xl border border-[#E2E2DC] bg-white hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="font-semibold text-gray-900 group-hover:text-blue-700 font-sans text-sm">{r.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{r.subtitle}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {results.concepts.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 font-sans">Concepts</h2>
          <div className="flex flex-col gap-2">
            {results.concepts.map(r => (
              <Link key={r.slug} href={r.href}
                className="group block p-4 rounded-xl border border-[#E2E2DC] bg-white hover:border-blue-300 hover:shadow-sm transition-all">
                <div className="font-semibold text-gray-900 group-hover:text-blue-700 font-sans text-sm">{r.title}</div>
                <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{r.subtitle}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
