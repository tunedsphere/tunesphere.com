import { ShopNavbar } from '@/components/layouts/shop-navbar'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteNavbar } from '@/components/layouts/site-navbar'

interface ShopLayoutProps {
  children: React.ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <SiteNavbar />
      <ShopNavbar />
      <main className="flex-1 bg-background">{children}</main>
      <SiteFooter />
    </>
  )
}
