import Link from 'next/link'
import { notFound } from 'next/navigation'
import vocabulary from '@/data/vocabulary.json'
import chapters from '@/data/chapters.json'

export async function generateStaticParams() {
  return vocabulary.map(v => ({ term: v.slug }))
}

export async function generateMetadata({ params }) {
  const concept = vocabulary.find(v => v.slug === params.term)
  if (!concept) return {}
  return {
    title: `${concept.term} — US Healthcare Explained`,
    description: concept.shortDef,
  }
}

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

export default function ConceptPage({ params }) {
  const concept = vocabulary.find(v => v.slug === params.term)
  if (!concept) notFound()

  const relatedConcepts = (concept.seeAlso || [])
    .map(slug => vocabulary.find(v => v.slug === slug))
    .filter(Boolean)

  const appearsIn = (concept.chapters || [])
    .map(slug => chapters.find(c => c.slug === slug))
    .filter(Boolean)

  const badgeClass = categoryColors[concept.category] || 'bg-gray-100 text-gray-600'

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 font-sans">
        <Link href="/concepts" className="hover:text-gray-700 transition-colors">Concepts</Link>
        <span>›</span>
        <span className="text-gray-600">{concept.term}</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide font-sans ${badgeClass}`}>
            {concept.category.replace(/-/g, ' ')}
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-sans leading-tight">
          {concept.term}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">{concept.shortDef}</p>
      </header>

      <div className="flex flex-col gap-10">
        {appearsIn.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 font-sans">
              Covered in {appearsIn.length === 1 ? '1 chapter' : `${appearsIn.length} chapters`}
            </h2>
            <div className="flex flex-col gap-2">
              {appearsIn.map(chapter => (
                <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-[#E2E2DC] bg-white hover:border-blue-300 hover:shadow-sm transition-all">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: chapter.layerColor }} />
                  <div>
                    <div className="font-medium text-sm text-gray-900 group-hover:text-blue-700 transition-colors font-sans">
                      {chapter.title}
                    </div>
                    <div className="text-xs text-gray-400 font-sans">{chapter.partTitle}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedConcepts.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 font-sans">Related Concepts</h2>
            <div className="flex flex-wrap gap-2">
              {relatedConcepts.map(related => (
                <Link key={related.slug} href={`/concepts/${related.slug}`}
                  className="group rounded-xl border border-[#E2E2DC] bg-white px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all block max-w-[280px]">
                  <div className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors font-sans mb-1">
                    {related.term}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2">{related.shortDef}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Link href="/concepts" className="text-sm text-blue-600 hover:text-blue-800 font-medium font-sans">
          ← All concepts
        </Link>
      </div>
    </div>
  )
}
