
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface ShopLayoutProps {
  children: React.ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-32">{children}</main>
    </>
  )
}
