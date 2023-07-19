
import '@/styles/globals.css';
import '@/styles/globalnav.css';

import Link from "next/link";
import { siteConfig } from "@/configs/site";

  export function NavbarBottom () {

  return (
    <>
    <nav className="navbar bg-backgroundNavbarBottom relative hidden sm:block">
    <div className="flex justify-center navbar-container py-4 items-center">
      <ul className="navbar-list items-center divide-y sm:divide-none">
        {siteConfig.navbarBottom.map((item) => (
          <li key={item.title} className="navbar-item px-3">
            <Link
              href={item.href}
              className="text-texthigh hover:text-colortheme"
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

