/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Layer palette — matches the book's color system
        "layer-payer":      "#2A5298",
        "layer-vbc":        "#1E6B3C",
        "layer-risk":       "#C05E0E",
        "layer-enablement": "#5B3D9E",
        "layer-delivery":   "#B02020",
        "layer-data":       "#1E6B3C",
        "layer-synthesis":  "#111111",
        "surface":          "#FAFAF8",
        "border-subtle":    "#E2E2DC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.700"),
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-links": theme("colors.blue.600"),
            fontFamily: theme("fontFamily.serif").join(", "),
            fontSize: "1.0625rem",
            lineHeight: "1.75",
            maxWidth: "none",
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
