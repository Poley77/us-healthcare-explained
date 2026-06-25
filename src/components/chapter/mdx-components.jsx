import Tooltip from "@/components/ui/Tooltip";
import DiagramViewer from "@/components/ui/DiagramViewer";

// MDX component registry
// Usage in .mdx files:
//   <T>ACO</T>              → tooltip for "ACO"
//   <T term="aco">text</T>  → tooltip with explicit slug lookup
//   <Diagram id="diagram11_aco_structure" />

export const mdxComponents = {
  // Shorthand tooltip — wraps any term
  T: ({ children, term }) => <Tooltip term={term}>{children}</Tooltip>,

  // Full tooltip alias
  Tooltip: ({ children, term }) => <Tooltip term={term}>{children}</Tooltip>,

  // Diagram viewer
  Diagram: ({ id, caption, alt }) => (
    <DiagramViewer id={id} caption={caption} alt={alt} />
  ),
};
