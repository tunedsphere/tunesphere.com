"use client"
import '@/styles/globals.css';
import './globalnavbarapp.css';

import * as React from "react";
import NavbarItems from "./NavbarItems";
import Link from "next/link";

interface NavbarItem {
  id: string;
  href: string;
  label: string;
}

interface NavbarBottomProps {
  isOpen: boolean;
}

const NavbarBottom: React.FC<NavbarBottomProps> = () => {


    return (
      <nav className="navbar navbarbottom relative hidden sm:block">
        <div className="flex justify-center navbar-container h-[80px] items-center">
          <ul className="navbar-list items-center divide-y sm:divide-none">
            {NavbarItems.map((item) => (
              <li key={item.id} className="navbar-item px-3">
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
    );
};

export default NavbarBottom;