"use client";

import { useState, useEffect } from "react";
import diagramTitles from "@/data/diagramTitles";

export default function DiagramViewer({ id, caption, alt }) {
  const [open, setOpen] = useState(false);
  const src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/diagrams/${id}.png`;
  const displayCaption = caption || diagramTitles[id] || null;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Inline thumbnail */}
      <figure className="my-8 not-prose">
        <button
          onClick={() => setOpen(true)}
          className="group w-full block rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-zoom-in"
          aria-label={`View diagram: ${displayCaption}`}
        >
          <img
            src={src}
            alt={alt || displayCaption}
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
            <span className="text-sm text-gray-500 italic">{displayCaption || ''}</span>
            <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
              Click to expand ↗
            </span>
          </div>
        </button>
      </figure>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 lg:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                {displayCaption}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={src}
                  download={`${id}.png`}
                  className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download ↓
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Full image */}
            <div className="overflow-auto max-h-[80vh] p-4">
              <img
                src={src}
                alt={alt || displayCaption}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
