import './globals.css'
import Nav from '@/components/layout/Nav'
import SearchOverlay from '@/components/layout/SearchOverlay'

export const metadata = {
  title: 'US Healthcare Explained',
  description: 'An interactive reference for professionals navigating Medicare, value-based care, risk, and the organizations that shape American healthcare.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAF8] text-[#111111]">
        <Nav />
        <SearchOverlay />
        <main>{children}</main>
      </body>
    </html>
  )
}
