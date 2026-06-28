import Link from 'next/link'
import chapters from '@/data/chapters.json'
import vocabulary from '@/data/vocabulary.json'

const featuredSlugs = ['aco', 'medicare-advantage', 'raf-score', 'value-based-care', 'mso', 'ipa']

export default function HomePage() {
  const featuredConcepts = featuredSlugs.map(s => vocabulary.find(v => v.slug === s)).filter(Boolean)
  const totalReadingTime = chapters.reduce((sum, c) => sum + (c.readingTimeMinutes || 0), 0)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-sans">
          Understanding the<br className="hidden sm:block" /> U.S. Healthcare System
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-3xl mx-auto">
          A complete reference for professionals navigating Medicare, value-based care, risk,{' '}
          <br className="hidden sm:block" />and the organizations that shape American healthcare.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chapters"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors font-sans shadow-sm">
            Start Reading →
          </Link>
          <Link href="/concepts"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-purple-600 bg-white text-gray-700 font-semibold text-sm hover:bg-purple-50 transition-colors font-sans">
            Browse Concepts
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-[#E2E2DC] py-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-8 justify-center text-center font-sans">
          {[
            [String(chapters.length), 'Chapters'],
            [String(vocabulary.length), 'Concepts'],
            ['40+', 'Diagrams'],
            [`~${totalReadingTime}m`, 'Reading Time'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-gray-900">{num}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Concepts */}
      <section className="bg-white border-t border-[#E2E2DC] py-16">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-sans">Key concepts</h2>
              <p className="text-gray-500 mt-1">Hover any underlined term in chapters for instant definitions.</p>
            </div>
            <Link href="/concepts" className="text-sm text-blue-600 hover:text-blue-800 font-medium font-sans hidden sm:block">
              All {vocabulary.length} concepts →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredConcepts.map(concept => (
              <Link key={concept.slug} href={`/concepts/${concept.slug}`}
                className="group block rounded-xl border border-[#E2E2DC] bg-[#FAFAF8] p-4 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all">
                <div className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-700 transition-colors font-sans">
                  {concept.term}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{concept.shortDef}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E2E2DC] py-8 text-center text-xs text-gray-400 font-sans">
        US Healthcare Explained — An interactive knowledge base
      </footer>
    </div>
  )
}
