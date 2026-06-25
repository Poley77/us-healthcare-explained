import Tooltip from './src/components/ui/Tooltip'
import DiagramViewer from './src/components/ui/DiagramViewer'

export function useMDXComponents(components) {
  return {
    // <T>term</T> — inline tooltip
    T: ({ children, term }) => (
      <Tooltip term={term}>{children}</Tooltip>
    ),
    // <Tooltip term="...">text</Tooltip>
    Tooltip: ({ children, term }) => (
      <Tooltip term={term}>{children}</Tooltip>
    ),
    // <Diagram id="..." />
    Diagram: ({ id, caption, alt }) => (
      <DiagramViewer id={id} caption={caption} alt={alt} />
    ),
    ...components,
  }
}
