
import { siteConfig } from "@/configs/site"

import { Combobox } from "@/components/combobox"

import { ShopMainNav } from "@components/layouts/shop-main-nav"
import { ShopMobileNav } from "@components/layouts/shop-mobile-nav"


import { dashboardConfig } from "@/configs/dashboard"
export function ShopHeader() {

  return (
    <header className="relative z-50 mt-[--headerHeight] w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <ShopMainNav items={siteConfig.shopNav} />
        <ShopMobileNav
          shopMainNavItems={siteConfig.shopNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Combobox />
          </nav>
        </div>
      </div>
    </header>
  )
}
