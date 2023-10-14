import { ShopHeader } from "@/components/layouts/shop-header"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface ShopLayoutProps {
  children: React.ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <SiteHeader />
      <ShopHeader />
      <main className="flex-1 bg-background">{children}</main>
      <SiteFooter />
    </>
  )
}
