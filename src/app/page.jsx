import Link from 'next/link'
import chapters from '@/data/chapters.json'
import vocabulary from '@/data/vocabulary.json'

const readingPaths = [
  {
    label: 'New to Healthcare',
    desc: 'Start with the fundamentals — who pays, who delivers, and how the system is structured.',
    chapters: ['chapter-01-the-system-that-was-never-designed', 'chapter-02-who-pays-for-healthcare', 'chapter-03-who-delivers-healthcare'],
    color: '#2A5298',
  },
  {
    label: 'VBC Practitioner',
    desc: 'Master risk, ACOs, IPAs, and MSOs — the full value-based care stack.',
    chapters: ['chapter-06-understanding-risk', 'chapter-07-acos', 'chapter-08-ipas', 'chapter-09-msos'],
    color: '#C05E0E',
  },
  {
    label: 'Payer / Health Plan',
    desc: 'Deep dive into CMS programs, health plan economics, and Medicare Advantage.',
    chapters: ['chapter-11-cms-federal-programs', 'chapter-13-health-plans', 'chapter-14-medicare-advantage'],
    color: '#1E6B3C',
  },
  {
    label: 'Executive / Investor',
    desc: 'Real-world organizations, integration models, and stakeholder economics.',
    chapters: ['chapter-18-physician-led-models', 'chapter-19-risk-bearing-platforms', 'chapter-21-integrated-models', 'chapter-economics-incentives'],
    color: '#5B3D9E',
  },
]

const featuredSlugs = ['aco', 'medicare-advantage', 'raf-score', 'value-based-care', 'mso', 'ipa']

export default function HomePage() {
  const featuredConcepts = featuredSlugs.map(s => vocabulary.find(v => v.slug === s)).filter(Boolean)
  const totalReadingTime = chapters.reduce((sum, c) => sum + (c.readingTimeMinutes || 0), 0)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-50 text-blue-700 font-sans">
          Interactive Reference
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-sans">
          Understanding the<br className="hidden sm:block" /> U.S. Healthcare System
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
          A complete reference for professionals navigating Medicare, value-based care, risk, and the organizations that shape American healthcare.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chapters"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2A5298] text-white font-semibold text-sm hover:bg-blue-800 transition-colors font-sans shadow-sm">
            Start Reading →
          </Link>
          <Link href="/concepts"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#E2E2DC] bg-white text-gray-700 font-semibold text-sm hover:border-blue-300 hover:text-blue-700 transition-colors font-sans">
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
            ['8', 'Stakeholder Profiles'],
            [`~${totalReadingTime}m`, 'Reading Time'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold text-gray-900">{num}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reading Paths */}
      <section className="max-w-5xl mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-sans">Choose your path</h2>
        <p className="text-gray-500 mb-8">Start where it matters most for your role.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {readingPaths.map(path => {
            const pathChapters = path.chapters.map(s => chapters.find(c => c.slug === s)).filter(Boolean)
            return (
              <Link key={path.label} href={`/chapters/${path.chapters[0]}`}
                className="group block rounded-2xl border border-[#E2E2DC] bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: path.color }} />
                  <span className="font-bold text-gray-900 font-sans group-hover:text-blue-700 transition-colors text-sm">
                    {path.label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{path.desc}</p>
                <div className="flex flex-col gap-1">
                  {pathChapters.slice(0, 3).map(c => (
                    <div key={c.slug} className="text-xs text-gray-400">→ {c.title}</div>
                  ))}
                  {path.chapters.length > 3 && (
                    <div className="text-xs text-gray-400">+ {path.chapters.length - 3} more</div>
                  )}
                </div>
              </Link>
            )
          })}
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
