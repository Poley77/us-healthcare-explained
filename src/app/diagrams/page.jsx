'use client'
import { useState } from 'react'
import chapters from '@/data/chapters.json'
import diagramTitles from '@/data/diagramTitles'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

function getAllDiagrams() {
  const seen = new Set()
  const diagrams = []
  chapters.forEach(chapter => {
    (chapter.diagramIds || []).forEach(id => {
      if (!seen.has(id)) {
        seen.add(id)
        diagrams.push({ id, chapter, label: diagramTitles[id] || id })
      }
    })
  })
  return diagrams
}

export default function DiagramsPage() {
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [lightboxLabel, setLightboxLabel] = useState('')
  const diagrams = getAllDiagrams()

  const openLightbox = (id, label) => {
    setLightboxSrc(`${BASE}/diagrams/${id}.png`)
    setLightboxLabel(label)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Diagrams</h1>
        <p className="text-gray-500 font-sans">{diagrams.length} diagrams across all chapters</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {diagrams.map(({ id, chapter, label }) => (
          <div key={id} onClick={() => openLightbox(id, label)}
            className="group rounded-xl border border-[#E2E2DC] bg-white overflow-hidden hover:border-blue-300 hover:shadow-md transition-all cursor-zoom-in">
            <div className="aspect-video bg-gray-50 flex items-center justify-center overflow-hidden relative">
              <img
                src={`${BASE}/diagrams/${id}.png`}
                alt={label}
                className="w-full h-full object-cover"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
              />
              <div className="hidden absolute inset-0 items-center justify-center text-gray-300 text-xs font-sans p-4 text-center">
                {label}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-800 font-sans mb-0.5 leading-snug">{label}</div>
              <div className="text-xs text-gray-400 flex items-center gap-1.5 font-sans">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: chapter.layerColor }} />
                {chapter.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxSrc && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 lg:p-8"
          onClick={() => setLightboxSrc(null)}>
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-sm font-sans">{lightboxLabel}</span>
              <button onClick={() => setLightboxSrc(null)}
                className="text-white/70 hover:text-white font-sans text-sm">✕ Close</button>
            </div>
            <img src={lightboxSrc} alt={lightboxLabel} className="w-full h-auto rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  )
}
