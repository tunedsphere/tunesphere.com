
import { siteConfig } from "@/configs/site"

import { ShopSearchBar} from "@/components/shop-search-bar"

import { ShopMainNav } from "@components/layouts/shop-main-nav"
import { ShopMobileNav } from "@components/layouts/shop-mobile-nav"

import { Shell } from "@components/shells/shell"
import { dashboardConfig } from "@/configs/dashboard"
export function ShopHeader() {

  return (
    <header className="relative z-50 mt-[--headerHeight] w-full border-b bg-white">
      <Shell className="justify-between flex items-center">
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
