import { ShopMainNav } from '@/components/layouts/shop-main-nav'
import { ShopMobileNav } from '@/components/layouts/shop-mobile-nav'

import { dashboardConfig } from '@/configs/dashboard'
import { siteConfig } from '@/configs/site'
import { ShopSearchBar } from '@/components/searchs/shop-search-bar'
import { Shell } from '../shells/shell'
export function ShopHeader() {
  return (
    <div className="relative z-50 mt-[--headerHeight] w-full border-b border-muted bg-background-navbartop">
      {/* <div className="mx-auto flex w-full max-w-9xl items-center justify-between gap-2 overflow-clip px-4 py-2 align-middle lg:px-8 5xl:max-w-[66.66666666666666%]"> */}
      <Shell className="flex max-w-9xl items-center justify-between gap-2 py-2 align-middle lg:px-8 5xl:max-w-[66.66666666666666%]">
        <ShopMainNav items={siteConfig.shopNav} />
        <ShopMobileNav
          shopMainNavItems={siteConfig.shopNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />

        <ShopSearchBar />
      </Shell>
      {/* </div> */}
    </div>
  )
}
