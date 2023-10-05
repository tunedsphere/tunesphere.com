import { ShopMainNav } from "@/components/layouts/shop-main-nav"
import { ShopMobileNav } from "@/components/layouts/shop-mobile-nav"
import { Shell } from "@/components/shells/shell"

import { dashboardConfig } from "@/configs/dashboard"
import { siteConfig } from "@/configs/site"
import { ShopCombobox } from "../searchs/shop-combobox"
import { ShopSearchBar } from "../searchs/shop-search-bar"

export function ShopHeader() {
  return (
    <header className="relative z-50 mt-[--headerHeight] w-full border-b bg-white">
      <Shell className="flex items-center justify-between py-6">
        <ShopMainNav items={siteConfig.shopNav} />
        <ShopMobileNav
          mainNavItems={siteConfig.shopNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <ShopSearchBar />
      </Shell>
    </header>
  )
}
