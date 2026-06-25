// Client-side search using Fuse.js
// Safe for SSR — Fuse is only instantiated in the browser

import vocabulary from "@/data/vocabulary.json";
import chapters from "@/data/chapters.json";

let _fuse = null;

async function buildIndex() {
  if (_fuse) return _fuse;
  const Fuse = (await import("fuse.js")).default;

  const items = [
    ...vocabulary.map((v) => ({
      type: "concept",
      title: v.term,
      subtitle: v.shortDef,
      href: `/concepts/${v.slug}`,
      slug: v.slug,
      body: [v.term, v.shortDef, ...(v.seeAlso || [])].join(" "),
    })),
    ...chapters.map((c) => ({
      type: "chapter",
      title: c.title,
      subtitle: c.summary || c.partTitle,
      href: `/chapters/${c.slug}`,
      slug: c.slug,
      body: [c.title, c.summary, c.partTitle, ...(c.concepts || [])].join(" "),
    })),
  ];

  _fuse = new Fuse(items, {
    keys: [
      { name: "title", weight: 3 },
      { name: "subtitle", weight: 1.5 },
      { name: "body", weight: 1 },
    ],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
  });

  return _fuse;
}

export function search(query, limit = 12) {
  if (typeof window === "undefined") return { concepts: [], chapters: [] };
  if (!query || query.trim().length < 2) return { concepts: [], chapters: [] };

  // Return empty synchronously if index not ready; SearchOverlay triggers async build
  if (!_fuse) {
    buildIndex(); // kick off in background
    return { concepts: [], chapters: [] };
  }

  const results = _fuse.search(query.trim()).slice(0, limit);
  return {
    concepts: results.filter((r) => r.item.type === "concept").map((r) => r.item),
    chapters: results.filter((r) => r.item.type === "chapter").map((r) => r.item),
  };
}

export function initSearch() {
  return buildIndex();
}
