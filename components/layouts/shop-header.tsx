import { ShopMainNav } from "@/components/layouts/shop-main-nav"
import { ShopMobileNav } from "@/components/layouts/shop-mobile-nav"
import { Shell } from "@/components/shells/shell"

import { dashboardConfig } from "@/configs/dashboard"
import { siteConfig } from "@/configs/site"
import { ShopSearchBar } from "@/components/searchs/shop-search-bar"

export function ShopHeader() {
  return (
    <header className="relative z-50 mt-[--headerHeight] w-full border-b border-muted bg-background-navbartop">
      <Shell className="flex items-center justify-between py-6">
        <ShopMainNav items={siteConfig.shopNav} />
        <ShopMobileNav
          shopMainNavItems={siteConfig.shopNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <ShopSearchBar />
      </Shell>
    </header>
  )
}
