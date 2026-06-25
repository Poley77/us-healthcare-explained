# US Healthcare Explained — Interactive Reference Site

## What This Is

A Next.js website that turns a full-length book on US healthcare into an interactive, cross-referenced knowledge base. Readers can explore concepts non-linearly, hover over terms for instant definitions, click through to deep-dive concept pages, and navigate by topic, organization, or stakeholder.

The book has ~22 chapters, a 120-term glossary, diagrams for every major concept, and an economics reference covering 8 major stakeholder types. All content already exists as Markdown files and PNG diagrams.

---

## Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS
- **Content:** MDX files for chapters, JSON for structured data (vocabulary, organizations, diagrams)
- **Search:** Fuse.js (client-side full-text)
- **Diagrams:** PNG files served from `/public/diagrams/`
- **Deployment:** Vercel (or static export to any host)

---

## Design Direction

**Tone:** Authoritative but accessible. This is a reference work for professionals — think McKinsey Knowledge Center meets Wikipedia meets a modern editorial publication.

**Palette:**
- Background: `#FAFAF8` (warm off-white)
- Text: `#111111`
- Accent blue (payer/CMS layer): `#2A5298`
- Accent green (VBC/delivery): `#1E6B3C`
- Accent orange (contracts/risk): `#C05E0E`
- Accent purple (enablement/MSO): `#5B3D9E`
- Accent red (care delivery): `#B02020`
- Borders/subtle: `#E2E2DC`

**Typography:**
- Display / headings: `Inter` (tight, modern, legible at all sizes)
- Body: `Georgia` or `Lora` (readable serif for long-form reading)
- Code/data/labels: `JetBrains Mono` or `IBM Plex Mono`

**Signature element:** A persistent left-side layer indicator on chapter pages — a thin colored bar (matching the book's layer color coding: blue/green/orange/purple/red) that shows which section of the ecosystem the current chapter covers.

**Layout:** Wide left gutter for annotations/callouts, readable 700px content column, right sidebar for "See Also" links and related diagrams. Collapses to single column on mobile.

---

## Site Structure

```
/                          Landing — visual entry, reading paths
/map                       Interactive ecosystem diagram
/chapters                  Chapter index
/chapters/[slug]           Individual chapter pages with tooltips
/concepts/[term]           Glossary / concept detail pages
/organizations/[name]      Company profile pages
/stakeholders/[role]       Economics & incentives by stakeholder
/diagrams                  All diagrams browsable
/search                    Full-text search
```

---

## Key Components to Build

### 1. `<Tooltip term="ACO" />` — inline hover definition
Wraps any term in the chapter text. On hover/tap, shows a card with:
- Term name + short definition (from vocabulary.json)
- Chapter reference ("covered in Chapter 7")
- "Read more →" link to `/concepts/[term]`

Usage in MDX: `<T>ACO</T>` or `<Tooltip>risk adjustment</Tooltip>`

### 2. `<ChapterPage />` — chapter layout
- Left: colored layer bar (visual identity)
- Center: MDX content with tooltips auto-applied
- Right sidebar: Related concepts | Related diagrams | Related chapters
- Bottom: chapter nav (prev / next)

### 3. `<ConceptPage />` — glossary entry
- Term, full definition, category badge
- "Appears in" — list of chapters that reference this term
- "Related terms" — from seeAlso in vocabulary.json
- Diagram if one exists for this concept

### 4. `<DiagramViewer />` — lightbox
Full-screen diagram with caption. Keyboard navigable. Includes download link.

### 5. `<EcosystemMap />` — interactive diagram
SVG-based (convert from the master PNG). Click any box → navigate to that concept/organization page. Hover → tooltip with brief description.

### 6. `<SearchOverlay />` — ⌘K search
Opens on ⌘K or search icon click. Searches across chapter titles, concept terms, and organization names using Fuse.js. Results grouped by type (Chapter / Concept / Organization).

### 7. `<ReadingPath />` — landing page selector
4 suggested entry points based on reader background. Each path is a curated sequence of chapters with estimated reading time.

---

## Data Files (already written — in `/src/data/`)

| File | Contents |
|------|----------|
| `vocabulary.json` | 120+ terms: term, slug, shortDef, fullDef, category, seeAlso[], chapters[] |
| `chapters.json` | Chapter metadata: slug, title, part, layerColor, diagramIds[], concepts[] |
| `organizations.json` | Company profiles: name, slug, type, description, chapters[] |
| `stakeholders.json` | Economics data for 8 stakeholder types |
| `diagrams.json` | Diagram metadata: id, filename, title, caption, chapters[] |
| `readingPaths.json` | 4 curated reading paths |

---

## Content Files (in `/content/chapters/`)

Each chapter is an `.mdx` file. Terms that should be tooltipped are wrapped in `<T>` components. Example:

```mdx
---
title: "ACOs: Making Providers Accountable for Populations"
slug: "acos"
part: 3
layer: "risk"
layerColor: "#C05E0E"
diagrams: ["diagram11_aco_structure", "diagram12_aco_savings"]
concepts: ["aco", "mssp", "attribution", "benchmark", "shared-savings"]
---

An <T>ACO</T> is a network of doctors, hospitals, and other providers that
collectively agrees to be held accountable for the quality and
<T>total cost of care</T> for a defined population of patients.
```

---

## Build Order (recommended)

1. **Data layer** — finalize all JSON files, install Next.js + Tailwind
2. **Chapter pages** — MDX rendering, layout, layer color bar
3. **Tooltip component** — vocabulary lookup, hover card
4. **Concept pages** — auto-generated from vocabulary.json
5. **Diagram viewer** — lightbox for all PNG diagrams
6. **Search** — Fuse.js index across all content
7. **Landing page** — reading path selector + featured diagrams
8. **Interactive ecosystem map** — SVG click-through
9. **Organization profiles** — company pages
10. **Stakeholder economics** — interactive filter table

---

## File Naming Conventions

- Chapter slugs: `chapter-01-the-system-that-was-never-designed`
- Concept slugs: `aco`, `medicare-advantage`, `raf-score`, `hcc-coding`
- Diagram IDs: match filenames without extension (`diagram11_aco_structure`)
- Organization slugs: `aledade`, `unitedhealth-group`, `kaiser-permanente`

---

## Notes for Cowork

- All diagram PNGs already exist — copy from `/public/diagrams/` 
- Chapter text is already in Markdown — conversion to MDX is mostly adding `<T>` wrappers
- The glossary file (`glossary.md`) is the source of truth for vocabulary.json
- The economics chapter provides the data for stakeholders.json
- Color coding matches the book's layer system throughout — keep it consistent
