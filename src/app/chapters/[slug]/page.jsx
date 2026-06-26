import { readFile } from 'fs/promises'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ChapterLayout from '@/components/chapter/ChapterLayout'
import Tooltip from '@/components/ui/Tooltip'
import DiagramViewer from '@/components/ui/DiagramViewer'
import YouTube from '@/components/ui/YouTube'
import chapters from '@/data/chapters.json'
import { notFound } from 'next/navigation'

const mdxComponents = {
  T: ({ children, term }) => <Tooltip term={term}>{children}</Tooltip>,
  Tooltip: ({ children, term }) => <Tooltip term={term}>{children}</Tooltip>,
  Diagram: ({ id, caption, alt }) => <DiagramViewer id={id} caption={caption} alt={alt} />,
  YouTube: (props) => <YouTube {...props} />,
}

export async function generateStaticParams() {
  return chapters.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const chapter = chapters.find(c => c.slug === params.slug)
  if (!chapter) return {}
  return {
    title: `${chapter.title} — US Healthcare Explained`,
    description: chapter.summary,
  }
}

export default async function ChapterPage({ params }) {
  const chapter = chapters.find(c => c.slug === params.slug)
  if (!chapter) notFound()

  const mdxPath = path.join(process.cwd(), 'content', 'chapters', `${params.slug}.mdx`)

  let source
  try {
    source = await readFile(mdxPath, 'utf8')
  } catch {
    source = '*Content coming soon.*'
  }

  return (
    <ChapterLayout chapter={chapter}>
      <MDXRemote source={source} components={mdxComponents} />
    </ChapterLayout>
  )
}
