import type { SidebarNavItem } from "@/types"


export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}


export const dashboardConfig: DashboardConfig = {

  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user" , 
      items: [],
    },
    {
      title: "Separator",
      href: "#",
      items: [],
    },
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: "store",
      items: [],
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
      items: [],
    },
    {
      title: "Purchases",
      href: "/dashboard/purchases",
      icon: "dollar-sign",
      items: [],
    },
    {
      title: "Separator",
      href: "#",
      items: [],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "gear",
      items: [],
    },
  ],
}
