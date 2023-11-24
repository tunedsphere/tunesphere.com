import "./layouts.css"
import Link from "next/link"
import type { MainNavItem } from "@/types"

import { siteConfig } from "@/configs/site"
import { cn } from "@/lib/utils"
interface NavbarNavProps {
  items?: MainNavItem[]
}

export function NavbarBottom({}: NavbarNavProps) {
  return (
    <>
      <nav className="relative hidden bg-background-navbarbottom sm:block">
        <div className="navbar-container flex items-center justify-center py-4">
          <ul className="flex text-base items-center divide-y sm:divide-none leading-6 font-semibold">
          {siteConfig.navbarNav.map((item) => (
  <li key={item.title} className="px-3">
    <Link
      href={item.disabled ? "#" : item.href}
      className={cn(
        "text-texthigh hover:text-theme-500",
        item.disabled && "cursor-not-allowed opacity-80",
        item.href  // Add a comma here
      )}
    >
      {item.label}
    </Link>
  </li>
))}
          </ul>
        </div>
      </nav>
    </>
  )
}
