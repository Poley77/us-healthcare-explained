'use client'
import { useState, useEffect, useRef } from 'react'
import glossary, { letters } from '@/data/glossary'

export default function GlossaryPage() {
  const [query, setQuery] = useState('')
  const sectionRefs = useRef({})

  const filtered = query
    ? glossary.filter(t =>
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase())
      )
    : glossary

  const groupedLetters = query
    ? [...new Set(filtered.map(t => t.letter))].sort()
    : letters

  const grouped = groupedLetters.reduce((acc, letter) => {
    acc[letter] = filtered.filter(t => t.letter === letter)
    return acc
  }, {})

  const scrollTo = (letter) => {
    const el = sectionRefs.current[letter]
    if (el) {
      const offset = 80 // sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Glossary</h1>
        <p className="text-gray-500 font-sans">{glossary.length} terms from across the US healthcare ecosystem</p>
      </div>

      {/* Search */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search terms and definitions..."
        className="w-full max-w-sm px-4 py-2 rounded-lg border border-[#E2E2DC] bg-white text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-300 font-sans mb-6"
      />

      {/* A–Z Nav */}
      {!query && (
        <div className="sticky top-14 z-30 bg-white border-b border-[#E2E2DC] -mx-4 px-4 lg:-mx-8 lg:px-8 py-2 mb-8 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {letters.map(letter => (
              <button
                key={letter}
                onClick={() => scrollTo(letter)}
                className="w-8 h-8 rounded text-sm font-semibold font-sans text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-center"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terms */}
      {groupedLetters.length === 0 && (
        <p className="text-center text-gray-400 py-12 font-sans">No terms match your search.</p>
      )}

      <div className="space-y-12">
        {groupedLetters.map(letter => (
          <section
            key={letter}
            ref={el => { sectionRefs.current[letter] = el }}
          >
            <h2 className="text-2xl font-bold text-gray-200 font-sans mb-4 border-b border-[#E2E2DC] pb-2">
              {letter}
            </h2>
            <div className="space-y-6">
              {grouped[letter].map(term => (
                <div key={term.slug} id={term.slug} className="scroll-mt-24">
                  <h3 className="text-base font-semibold text-gray-900 font-sans mb-1">
                    {term.term}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans leading-relaxed">
                    {term.definition}
                  </p>
                  {term.seeAlso && term.seeAlso.length > 0 && (
                    <p className="text-xs text-gray-400 font-sans mt-1.5">
                      <span className="font-medium">See also:</span>{' '}
                      {term.seeAlso.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
