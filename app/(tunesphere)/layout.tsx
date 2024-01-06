import { SiteIndexNavbar } from '@/components/layouts/site-index-navbar'
import { SiteIndexFooter } from '@/components/layouts/site-index-footer'
import { SiteFooter } from '@/components/layouts/site-footer'
interface TunedLayoutProps {
  children: React.ReactNode
}
export default function TunedLayout({ children }: TunedLayoutProps) {
  return (
    <>
      <SiteIndexNavbar />
      <main className="relative flex-1 bg-background">
        {children}
        <SiteFooter />
      </main>
    </>
  )
}
