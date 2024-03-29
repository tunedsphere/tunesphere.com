import { ShopMainNav } from '@/components/layouts/shop-main-nav'
import { ShopMobileNav } from '@/components/layouts/shop-mobile-nav'

import { dashboardConfig } from '@/configs/dashboard'
import { siteConfig } from '@/configs/site'
import { ShopSearchBar } from '@/components/searchs/shop-search-bar'
import { Shell } from '../shells/shell'
export function ShopNavbar() {
  return (
    <div className="relative z-50 mt-[--headerHeight] w-full border-b bg-background-navbartop">
      <Shell className="5xl:max-w-[66.66666666666666%] flex max-w-9xl items-center justify-start gap-2 py-2.5 align-middle lg:px-8">
        <ShopMainNav items={siteConfig.shopNav} />
        <ShopMobileNav
          shopMainNavItems={siteConfig.shopNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />

        <ShopSearchBar />
      </Shell>
    </div>
  )
}
