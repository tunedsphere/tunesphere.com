import './layouts.css'
import Link from 'next/link'

import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
interface NavbarNavProps {}

export function GlobalNavbarBottom({}: NavbarNavProps) {
  return (
    <>
      <nav className="relative z-9999 hidden sm:block">
        <div className="navbar-container flex items-center justify-center py-4">
          <ul className="flex items-center divide-y text-base font-semibold leading-6 sm:divide-none">
            {siteConfig.navbarNav.map((item) => (
              <li key={item.title} className="px-3">
                <Link
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'text-foreground decoration-primary decoration-2 underline-offset-4 hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-80',
                    item.href, // Add a comma here
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
