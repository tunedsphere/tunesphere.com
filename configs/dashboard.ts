import type { SidebarNavItem } from "@/types"
import type { IconName } from "@/components/icon";

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}


export const dashboardConfig: DashboardConfig = {

  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user" as IconName, 
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
      icon: "store" as IconName,
      items: [],
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing" as IconName,
      items: [],
    },
    {
      title: "Purchases",
      href: "/dashboard/purchases",
      icon: "dollar-sign" as IconName,
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
      icon: "gear" as IconName,
      items: [],
    },
  ],
}
