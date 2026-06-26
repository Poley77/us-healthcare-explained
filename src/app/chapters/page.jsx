import Link from 'next/link'
import chapters from '@/data/chapters.json'

function groupByPart(chapters) {
  const parts = {}
  chapters.forEach(c => {
    if (!parts[c.part]) parts[c.part] = { title: c.partTitle, chapters: [] }
    parts[c.part].chapters.push(c)
  })
  return Object.values(parts)
}

export default function ChaptersPage() {
  const parts = groupByPart(chapters)
  const totalTime = chapters.reduce((s, c) => s + (c.readingTimeMinutes || 0), 0)

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Chapters</h1>
        <p className="text-gray-500 font-sans">{chapters.length} chapters · ~{totalTime} minutes total reading time</p>
      </div>
      <div className="flex flex-col gap-12">
        {parts.map(part => (
          <div key={part.title}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-4 font-sans border-b border-[#E2E2DC] pb-2">
              {part.title}
            </h2>
            <div className="flex flex-col gap-1">
              {part.chapters.map(chapter => (
                <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-[#E2E2DC] hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-gray-900" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors font-sans text-sm leading-snug mb-1">
                      {chapter.title}
                    </div>
                    {chapter.summary && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{chapter.summary}</p>
                    )}
                    <div className="mt-2 text-xs text-gray-400 font-sans">{chapter.readingTimeMinutes} min read</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
