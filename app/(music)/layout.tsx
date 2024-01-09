import { ReducedFooter } from '@/components/layouts/reduced-footer'
import { SiteNavbar } from '@/components/layouts/site-navbar'
import { ThemeProvider } from '@/components/theme-provider'
interface RootMusicLayoutProps {
  children: React.ReactNode
}

export default function RootMusicLayout({ children }: RootMusicLayoutProps) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <SiteNavbar />
        <main className="flex-1 bg-background">{children}</main>
        <ReducedFooter />
      </ThemeProvider>
    </>
  )
}
