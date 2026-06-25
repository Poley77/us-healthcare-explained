// Static import map for all chapter MDX files.
// @next/mdx (configured in next.config.js) handles compilation.
// Each import returns a React component that accepts a `components` prop.

const chapterModules = {
  'chapter-01-the-system-that-was-never-designed': () => import('../../content/chapters/chapter-01-the-system-that-was-never-designed.mdx'),
  'chapter-02-who-pays-for-healthcare': () => import('../../content/chapters/chapter-02-who-pays-for-healthcare.mdx'),
  'chapter-03-who-delivers-healthcare': () => import('../../content/chapters/chapter-03-who-delivers-healthcare.mdx'),
  'chapter-04-fee-for-service': () => import('../../content/chapters/chapter-04-fee-for-service.mdx'),
  'chapter-05-value-based-care': () => import('../../content/chapters/chapter-05-value-based-care.mdx'),
  'chapter-06-understanding-risk': () => import('../../content/chapters/chapter-06-understanding-risk.mdx'),
  'chapter-07-acos': () => import('../../content/chapters/chapter-07-acos.mdx'),
  'chapter-08-ipas': () => import('../../content/chapters/chapter-08-ipas.mdx'),
  'chapter-09-msos': () => import('../../content/chapters/chapter-09-msos.mdx'),
  'chapter-10-aco-ipa-mso': () => import('../../content/chapters/chapter-10-aco-ipa-mso.mdx'),
  'chapter-11-cms-federal-programs': () => import('../../content/chapters/chapter-11-cms-federal-programs.mdx'),
  'chapter-13-health-plans': () => import('../../content/chapters/chapter-13-health-plans.mdx'),
  'chapter-14-medicare-advantage': () => import('../../content/chapters/chapter-14-medicare-advantage.mdx'),
  'chapter-15-how-contracts-flow': () => import('../../content/chapters/chapter-15-how-contracts-flow.mdx'),
  'chapter-16-how-money-flows': () => import('../../content/chapters/chapter-16-how-money-flows.mdx'),
  'chapter-17-how-data-flows': () => import('../../content/chapters/chapter-17-how-data-flows.mdx'),
  'chapter-18-physician-led-models': () => import('../../content/chapters/chapter-18-physician-led-models.mdx'),
  'chapter-19-risk-bearing-platforms': () => import('../../content/chapters/chapter-19-risk-bearing-platforms.mdx'),
  'chapter-21-integrated-models': () => import('../../content/chapters/chapter-21-integrated-models.mdx'),
  'chapter-economics-incentives': () => import('../../content/chapters/chapter-economics-incentives.mdx'),
}

export default chapterModules
