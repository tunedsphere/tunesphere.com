import { SiteIndexNavbar } from '@/components/layouts/site-index-navbar'
import { SiteIndexFooter } from '@/components/layouts/site-index-footer'
interface TunedLayoutProps {
  children: React.ReactNode
}
export default function TunedLayout({ children }: TunedLayoutProps) {
  return (
    <>
      <SiteIndexNavbar />
      <main className="relative flex-1 bg-background-index">
        {children}
        <SiteIndexFooter />
      </main>
    </>
  )
}
