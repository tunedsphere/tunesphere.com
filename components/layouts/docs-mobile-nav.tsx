"use client";
import * as React from "react";
import Link from "next/link";

import { MainNavItem } from "types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { SidebarNavItem } from "types";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
  sideItems: SidebarNavItem[];
  closeMobileMenu: () => void;
}

export function DocsMobileNav({
  items,
  sideItems,
  closeMobileMenu,
}: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 top-0 z-50 grid grid-flow-row auto-rows-max overflow-auto shadow-md animate-in slide-in-from-bottom-80 backdrop-blur-sm"
      )}
    >
      <div
        onClick={closeMobileMenu}
        className="fixed inset-0 backdrop-blur-sm opacity-100 transition-opacity"
      ></div>
      <div className="relative w-[19rem] min-h-full">
        <div className="relative z-20 grid gap-6 bg-background p-4 shadow-md">
          <button
            type="button"
            onClick={closeMobileMenu}
            className="z-10 absolute top-5 right-5 w-8 h-8 flex items-center justify-center"
          >
            <Icon
              name="close"
              className="text-muted-foreground hover:text-primary z-10 w-4 h-4"
            />
          </button>
          <nav className="grid grid-flow-row auto-rows-max text-sm">
            {items.map((item, index) => (
              <Link
                onClick={closeMobileMenu}
                key={`DocsMobile-${index}`}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex w-full items-center rounded-md p-2 text-xl font-semibold hover:underline",
                  item.disabled && "cursor-not-allowed opacity-60",
                  pathname === item.href &&
                    "text-cyan-600  dark:text-violet-500"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          {sideItems.length ? (
            <div className="w-full">
              {sideItems.map((item, index) => (
                <div key={index} className={cn("pb-8")}>
                  <h4 className="mb-1 rounded-md px-2 py-1 text-base font-semibold">
                    {item.title}
                  </h4>
                  {item.items ? (
                    <div className="grid grid-flow-row auto-rows-max text-sm mr-4">
                      {item.items.map((subItem, subIndex) =>
                        !subItem.disabled && subItem.href ? (
                          <Link
                            onClick={closeMobileMenu}
                            key={`DocsMobile-${subIndex}`}
                            href={subItem.href}
                            className={cn(
                              "flex w-full items-center rounded-md p-2 text-textlow hover:text-texthigh",
                              {
                                "bg-cyan-100 p-2.5 text-cyan-600 dark:border-violet-900 dark:bg-violet-900 dark:text-texthigh":
                                  pathname === subItem.href,
                              }
                            )}
                            target={subItem.external ? "_blank" : ""}
                            rel={subItem.external ? "noreferrer" : ""}
                          >
                            {subItem.title}
                          </Link>
                        ) : (
                          <span
                            key={`DocsMobile-${subIndex}`}
                            className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60"
                          >
                            {subItem.title}
                          </span>
                        )
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
