'use client'
import { useState } from 'react'
import chapters from '@/data/chapters.json'

const diagramTitles = {
  'ch02_img01': 'Who Pays for Healthcare — The Four Sources',
  'ch02_img02': 'How Medicare Is Funded',
  'ch02_img03': 'How Self-Insured Employers Work',
  'ch02_img04': 'The ACA Marketplace',
  'ch03_img01': 'Who Delivers Healthcare',
  'ch04_img01': 'How Fee-for-Service Billing Works',
  'ch04_img02': 'The Claims Lifecycle',
  'ch05_img01': 'The Triple Aim',
  'ch05_img02': 'Value-Based Care Models',
  'ch06_img01': 'The Risk Spectrum — FFS to Full Capitation',
  'ch07_img01': 'How ACOs Work — MSSP Structure',
  'ch07_img02': 'Attribution, Benchmarks, and Shared Savings',
  'ch08_img01': 'How an IPA Is Structured',
  'ch08_img02': 'IPA Network Aggregation',
  'ch09_img01': 'What MSOs Do — Eight Core Services',
  'ch09_img02': 'The PC / MSO Legal Structure',
  'ch10_img01': 'ACO vs. IPA vs. MSO — Key Differences',
  'ch10_img02': 'How the Three Layers Work Together',
  'ch10_img03': 'The Full VBC Stack',
  'ch11_img01': 'The CMS Program Landscape',
  'ch12_img01': 'Health Plan Types — Commercial, MA, Medicaid MCO',
  'ch14_img01': 'How Medicare Advantage Is Funded',
  'ch14_img02': 'How RAF Scores Are Calculated',
  'ch14_img03': 'The Stars Rating System',
  'ch15_img01': 'The Contract Chain — CMS to Physician',
  'ch15_img02': 'Key Contract Terms in VBC',
  'ch15_img03': 'The Timeline Problem in VBC Contracts',
  'ch16_img01': 'How Money Flows — FFS vs. Capitation',
  'ch16_img02': 'How a PMPM Breaks Down',
  'ch16_img03': 'Five Revenue Streams in a VBC Practice',
  'ch17_img01': 'The Five Sources of Clinical Data',
  'ch17_img02': 'From Data to Intelligence — The Analytics Platform',
  'ch18_img01': 'The Aledade Model',
  'ch18_img02': 'The Privia Health Model',
  'ch18_img03': 'Aledade vs. Privia — Two Philosophies',
  'ch19_img01': 'The agilon Health Joint Venture Model',
  'ch19_img02': 'The Alignment Health Payvider Model',
  'ch19_img03': 'The Risk Spectrum — Four Models in Context',
  'ch21_img01': 'Kaiser Permanente — Three Interlocking Parts',
  'ch21_img02': 'UnitedHealth Group — Integration by Acquisition',
  'ch21_img03': 'Kaiser vs. UnitedHealth — Two Integration Paths',
  'ch_econ_img01': 'Stakeholder Economics — Who Does What and Why',
  'ch_ecosystem_img01': 'The US Healthcare Ecosystem — A Complete Map',
}

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
