"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import vocabulary from "@/data/vocabulary.json";

// Normalise a term string to a lookup slug
function termToSlug(term) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Find entry by slug or by term text
function findEntry(term) {
  const slug = termToSlug(term);
  return (
    vocabulary.find((v) => v.slug === slug) ||
    vocabulary.find((v) => termToSlug(v.term) === slug) ||
    vocabulary.find((v) => v.term.toLowerCase() === term.toLowerCase())
  );
}

export default function Tooltip({ children, term }) {
  const lookupTerm = term || (typeof children === "string" ? children : "");
  const entry = findEntry(lookupTerm);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("bottom"); // "bottom" | "top"
  const triggerRef = useRef(null);
  const cardRef = useRef(null);

  // Reposition card if it would go off-screen
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setPosition(spaceBelow < 240 ? "top" : "bottom");
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        cardRef.current &&
        !cardRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // No entry found — render plain text
  if (!entry) {
    return <span className="text-inherit">{children}</span>;
  }

  const categoryColors = {
    "organization-type": "bg-blue-100 text-blue-800",
    program: "bg-green-100 text-green-800",
    concept: "bg-orange-100 text-orange-800",
    "payment-model": "bg-purple-100 text-purple-800",
    metric: "bg-pink-100 text-pink-800",
    technology: "bg-cyan-100 text-cyan-800",
    legal: "bg-red-100 text-red-800",
    billing: "bg-yellow-100 text-yellow-800",
    company: "bg-indigo-100 text-indigo-800",
    standard: "bg-teal-100 text-teal-800",
    function: "bg-lime-100 text-lime-800",
    legislation: "bg-rose-100 text-rose-800",
    data: "bg-sky-100 text-sky-800",
  };

  const badgeClass =
    categoryColors[entry.category] || "bg-gray-100 text-gray-700";

  return (
    <span className="relative inline">
      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={(e) => {
          // Keep open if moving into card
          const related = e.relatedTarget;
          if (cardRef.current && cardRef.current.contains(related)) return;
          setOpen(false);
        }}
        className={[
          "inline cursor-pointer border-b border-dashed pb-px transition-colors",
          "border-blue-400 text-inherit hover:border-blue-600 hover:text-blue-700",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
        ].join(" ")}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <strong className="font-semibold">{children}</strong>
      </button>

      {/* Tooltip card */}
      {open && (
        <span
          ref={cardRef}
          role="tooltip"
          onMouseLeave={() => setOpen(false)}
          className={[
            "absolute z-50 w-72 rounded-xl border border-gray-200 bg-white shadow-xl",
            "text-sm text-gray-800 p-4",
            "left-0",
            position === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
          ].join(" ")}
          style={{ minWidth: "17rem" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="font-semibold text-gray-900 leading-tight">
              {entry.term}
            </span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass}`}
            >
              {entry.category.replace(/-/g, " ")}
            </span>
          </div>

          {/* Definition */}
          <p className="text-gray-600 leading-snug mb-3">{entry.shortDef}</p>

          {/* See also */}
          {entry.seeAlso && entry.seeAlso.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Related
              </p>
              <div className="flex flex-wrap gap-1">
                {entry.seeAlso.slice(0, 5).map((slug) => {
                  const related = vocabulary.find((v) => v.slug === slug);
                  return related ? (
                    <Link
                      key={slug}
                      href={`/concepts/${slug}`}
                      onClick={() => setOpen(false)}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {related.term}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Chapters */}
          {entry.chapters && entry.chapters.length > 0 && (
            <p className="text-xs text-gray-400 mb-3">
              Covered in{" "}
              {entry.chapters.length === 1
                ? "1 chapter"
                : `${entry.chapters.length} chapters`}
            </p>
          )}

          {/* Read more */}
          <Link
            href={`/concepts/${entry.slug}`}
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Full definition →
          </Link>
        </span>
      )}
    </span>
  );
}
