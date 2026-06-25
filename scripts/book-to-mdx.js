#!/usr/bin/env node
/**
 * Converts raw book text (exported from Google Docs) into chapter MDX files.
 * Usage: node scripts/book-to-mdx.js path/to/book_raw.txt
 */
const fs = require('fs')
const path = require('path')

const rawPath = process.argv[2]
if (!rawPath) { console.error('Usage: node scripts/book-to-mdx.js <path>'); process.exit(1) }

const raw = fs.readFileSync(rawPath, 'utf8')
const chapters = require('../src/data/chapters.json')
const vocabulary = require('../src/data/vocabulary.json')

function escapeRx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

// Find where each chapter starts in the doc
function splitIntoChapters(text) {
  const splits = []
  chapters.forEach(c => {
    // Match the chapter title as a standalone line (possibly after "Chapter N:")
    const rx = new RegExp(`^(?:Chapter\\s+\\d+[:\\s]+)?${escapeRx(c.title)}\\s*$`, 'im')
    const m = rx.exec(text)
    if (m) splits.push({ index: m.index, slug: c.slug, end: m.index + m[0].length })
  })
  splits.sort((a, b) => a.index - b.index)
  const result = {}
  splits.forEach((s, i) => {
    const start = s.end
    const end = i + 1 < splits.length ? splits[i + 1].index : text.length
    result[s.slug] = text.slice(start, end).trim()
  })
  return result
}

// Wrap glossary terms (longest first, first occurrence only per chapter)
function wrapTerms(text) {
  const done = new Set()
  const sorted = [...vocabulary].sort((a, b) => b.term.length - a.term.length)
  let out = text
  sorted.forEach(v => {
    if (done.has(v.slug)) return
    const rx = new RegExp(`\\b${escapeRx(v.term)}\\b`, 'i')
    const replaced = out.replace(rx, match => { done.add(v.slug); return `<T>${match}</T>` })
    if (replaced !== out) out = replaced
  })
  return out
}

function textToMDX(slug, rawContent, meta) {
  // Convert bullet points
  let content = rawContent.replace(/^\* (.+)$/gm, '- $1')
  // Wrap terms
  content = wrapTerms(content)
  // Insert diagrams evenly
  const diags = meta.diagramIds || []
  diags.forEach((id, i) => {
    const tag = `\n\n<Diagram id="${id}" />\n\n`
    const frac = (i + 1) / (diags.length + 1)
    const pos = Math.floor(content.length * frac)
    const br = content.indexOf('\n\n', pos)
    if (br > 0) content = content.slice(0, br + 2) + tag + content.slice(br + 2)
  })

  const fm = [
    '---',
    `title: "${meta.title.replace(/"/g, '\\"')}"`,
    `slug: "${slug}"`,
    `part: ${meta.part}`,
    `partTitle: "${meta.partTitle}"`,
    `layer: "${meta.layer}"`,
    `layerColor: "${meta.layerColor}"`,
    `order: ${meta.order}`,
    `diagrams: [${diags.map(d => `"${d}"`).join(', ')}]`,
    `concepts: [${(meta.concepts||[]).map(c => `"${c}"`).join(', ')}]`,
    `readingTimeMinutes: ${meta.readingTimeMinutes}`,
    '---',
    '',
  ].join('\n')
  return fm + content
}

const chapterTexts = splitIntoChapters(raw)
console.log(`Found ${Object.keys(chapterTexts).length} chapters in document`)

const outDir = path.join(__dirname, '../content/chapters')
fs.mkdirSync(outDir, { recursive: true })

let written = 0
chapters.forEach(meta => {
  const content = chapterTexts[meta.slug]
  if (!content) { console.warn(`  ⚠  No content found for: ${meta.slug}`); return }
  const outPath = path.join(outDir, `${meta.slug}.mdx`)
  if (fs.existsSync(outPath)) { console.log(`  ↷  Skipping (exists): ${meta.slug}`); return }
  fs.writeFileSync(outPath, textToMDX(meta.slug, content, meta), 'utf8')
  console.log(`  ✓  ${meta.slug}`)
  written++
})
console.log(`\nDone — wrote ${written} MDX files.`)
