import { currentUser } from "@clerk/nextjs"

import { ShopHeader } from "@/components/layouts/shop-header"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface ShopLayoutProps {
  children: React.ReactNode
}

export default async function ShopLayout({ children }: ShopLayoutProps) {
  const user = await currentUser()
  return (
    <>
      <SiteHeader user={user} />
      <ShopHeader />
      <main className="flex-1 bg-background">{children}</main>
      <SiteFooter />
    </>
  )
}
