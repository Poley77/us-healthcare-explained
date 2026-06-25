'use client'
import { useState } from 'react'
import Link from 'next/link'
import vocabulary from '@/data/vocabulary.json'

const categoryColors = {
  'organization-type': 'bg-blue-100 text-blue-800',
  'program': 'bg-green-100 text-green-800',
  'concept': 'bg-orange-100 text-orange-800',
  'payment-model': 'bg-purple-100 text-purple-800',
  'metric': 'bg-pink-100 text-pink-800',
  'technology': 'bg-cyan-100 text-cyan-800',
  'legal': 'bg-red-100 text-red-800',
  'billing': 'bg-yellow-100 text-yellow-800',
  'company': 'bg-indigo-100 text-indigo-800',
  'standard': 'bg-teal-100 text-teal-800',
  'function': 'bg-lime-100 text-lime-800',
  'legislation': 'bg-rose-100 text-rose-800',
  'data': 'bg-sky-100 text-sky-800',
  'organization': 'bg-blue-100 text-blue-800',
  'contract-type': 'bg-amber-100 text-amber-800',
}

const allCategories = ['all', ...Array.from(new Set(vocabulary.map(v => v.category))).sort()]

export default function ConceptsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = vocabulary.filter(v => {
    const matchCat = activeCategory === 'all' || v.category === activeCategory
    const matchQ = !query || v.term.toLowerCase().includes(query.toLowerCase()) || v.shortDef.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Concepts</h1>
        <p className="text-gray-500 font-sans">{vocabulary.length} terms covering the full US healthcare ecosystem</p>
      </div>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Filter concepts..."
        className="w-full max-w-sm px-4 py-2 rounded-lg border border-[#E2E2DC] bg-white text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-300 font-sans mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={[
              'px-3 py-1 rounded-full text-xs font-medium transition-colors font-sans capitalize',
              activeCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-[#E2E2DC] text-gray-600 hover:border-gray-400'
            ].join(' ')}>
            {cat === 'all' ? `All (${vocabulary.length})` : cat.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(concept => (
          <Link key={concept.slug} href={`/concepts/${concept.slug}`}
            className="group block rounded-xl border border-[#E2E2DC] bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors font-sans leading-snug">
                {concept.term}
              </span>
              <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium font-sans ${categoryColors[concept.category] || 'bg-gray-100 text-gray-600'}`}>
                {concept.category.replace(/-/g, ' ')}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{concept.shortDef}</p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12 font-sans">No concepts match your filter.</p>
      )}
    </div>
  )
}
