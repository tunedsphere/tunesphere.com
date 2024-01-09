import { ShopNavbar } from '@/components/layouts/shop-navbar'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteNavbar } from '@/components/layouts/site-navbar'
import { ThemeProvider } from '@/components/theme-provider'
interface ShopLayoutProps {
  children: React.ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <SiteNavbar />
        <ShopNavbar />
        <main className="flex-1 bg-background">{children}</main>
        <SiteFooter />
      </ThemeProvider>
    </>
  )
}
