import Link from "next/link";
import chapters from "@/data/chapters.json";
import vocabulary from "@/data/vocabulary.json";
import diagramTitles from "@/data/diagramTitles";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ChapterLayout({ chapter, children }) {
  const currentIndex = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  // Get related concept entries
  const relatedConcepts = (chapter.concepts || [])
    .map((slug) => vocabulary.find((v) => v.slug === slug))
    .filter(Boolean)
    .slice(0, 8);

  // Chapters in same part
  const siblingChapters = chapters
    .filter((c) => c.part === chapter.part && c.slug !== chapter.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Layer color bar — top */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: chapter.layerColor }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/chapters" className="hover:text-gray-700 transition-colors">
            Chapters
          </Link>
          <span>›</span>
          <span
            className="font-medium"
            className="text-purple-600"
          >
            {chapter.partTitle}
          </span>
        </nav>

        <div className="flex gap-12">
          {/* Left: vertical layer bar + chapter number */}
          <div className="hidden lg:flex flex-col items-center w-8 shrink-0 pt-2">
            <div
              className="w-1 rounded-full flex-1"
              style={{
                backgroundColor: chapter.layerColor,
                opacity: 0.3,
                maxHeight: "100%",
              }}
            />
          </div>

          {/* Center: content */}
          <main className="flex-1 max-w-[700px]">
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-gray-400">
                  {chapter.readingTimeMinutes} min read
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {chapter.title}
              </h1>
              {chapter.summary && (
                <p className="text-lg text-gray-500 leading-relaxed">
                  {chapter.summary}
                </p>
              )}
            </header>

            {/* MDX content */}
            <article className="prose prose-lg prose-gray max-w-none font-sans
              prose-headings:font-sans prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:font-sans prose-p:leading-relaxed prose-p:text-gray-700
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-hr:border-gray-200 prose-hr:my-10
              prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
            ">
              {children}
            </article>

            {/* Chapter navigation */}
            <nav className="mt-16 pt-8 border-t border-gray-200 flex justify-between gap-4">
              {prev ? (
                <Link
                  href={`/chapters/${prev.slug}`}
                  className="group flex flex-col gap-1 max-w-[240px]"
                >
                  <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                    ← Previous
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors leading-snug">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link
                  href={`/chapters/${next.slug}`}
                  className="group flex flex-col gap-1 max-w-[240px] text-right"
                >
                  <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                    Next →
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors leading-snug">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          </main>

          {/* Right sidebar */}
          <aside className="hidden xl:flex flex-col gap-8 w-64 shrink-0 pt-2">
            {/* Key concepts */}
            {relatedConcepts.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Key Concepts
                </h3>
                <div className="flex flex-col gap-2">
                  {relatedConcepts.map((concept) => (
                    <Link
                      key={concept.slug}
                      href={`/concepts/${concept.slug}`}
                      className="group block rounded-lg border border-gray-200 bg-white p-3 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="font-medium text-sm text-gray-800 group-hover:text-blue-700 transition-colors leading-snug">
                        {concept.term}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 leading-snug line-clamp-2">
                        {concept.shortDef}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Diagrams in this chapter */}
            {chapter.diagramIds && chapter.diagramIds.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Diagrams
                </h3>
                <div className="flex flex-col gap-2">
                  {chapter.diagramIds.map((id) => (
                    <Link
                      key={id}
                      href={`/diagrams#${id}`}
                      className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 hover:border-blue-300 transition-all"
                    >
                      <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0">
                        <img
                          src={`${BASE}/diagrams/${id}.png`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors leading-snug">
                        {diagramTitles[id] || id}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other chapters in this part */}
            {siblingChapters.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Also in {chapter.partTitle?.split(" — ")[1]}
                </h3>
                <div className="flex flex-col gap-1.5">
                  {siblingChapters.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/chapters/${c.slug}`}
                      className="text-sm text-gray-500 hover:text-blue-600 transition-colors leading-snug py-1"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
