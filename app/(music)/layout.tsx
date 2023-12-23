import { ReducedFooter } from '@/components/layouts/reduced-footer'
import { SiteNavbar } from '@/components/layouts/site-navbar'

interface RootMusicLayoutProps {
  children: React.ReactNode
}

export default function RootMusicLayout({ children }: RootMusicLayoutProps) {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1 bg-background">{children}</main>
      <ReducedFooter />
    </>
  )
}
