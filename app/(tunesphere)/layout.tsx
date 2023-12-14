import { SiteGlobalNav } from '@/components/layouts/site-global-nav'
import { SiteIndexFooter } from '@/components/layouts/site-index-footer'
interface TunedLayoutProps {
  children: React.ReactNode
}
export default function TunedLayout({ children }: TunedLayoutProps) {
  return (
    <>
      <SiteGlobalNav />
      <main className="min-h-screen flex-1 bg-background-index">
        {children}
        <SiteIndexFooter />
      </main>
    </>
  )
}
