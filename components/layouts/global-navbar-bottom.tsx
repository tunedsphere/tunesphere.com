import "@/styles/globals.css"

import Link from "next/link"
import type { NavbarNavItem } from "@/types"

import { siteConfig } from "@/configs/site"

interface NavbarNavProps {
  items?: NavbarNavItem[]
}

export function GlobalNavbarBottom({ items }: NavbarNavProps) {
  return (
    <>
      <nav className="relative hidden sm:block">
        <div className="navbar-container flex items-center justify-center py-4">
          <ul className="navbar-list items-center divide-y sm:divide-none leading-6 font-semibold">
            {siteConfig.navbarNav.map((item) => (
              <li key={item.title} className="px-3">
                <Link
                  href={item.href}
                  className="text-texthigh hover:text-theme-500"
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
