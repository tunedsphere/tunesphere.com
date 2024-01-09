import { SiteIndexNavbar } from '@/components/layouts/site-index-navbar'
import { SiteFooter } from '@/components/layouts/site-footer'
import { ThemeProvider } from '@/components/theme-provider'
interface TunedLayoutProps {
  children: React.ReactNode
}
export default function TunedLayout({ children }: TunedLayoutProps) {
  return (
    <>
      <ThemeProvider attribute="class" forcedTheme="dark">
        <SiteIndexNavbar />
        <main className="relative flex-1 bg-background">
          {children}
          <SiteFooter />
        </main>
      </ThemeProvider>
    </>
  )
}
