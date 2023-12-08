"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarNavItem } from "@/types";

import { cn } from "@/lib/utils";
import { Icon } from "../icon";

export interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  if (!items?.length) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((item, index) => {
        if (item.title === "Separator") {
          // Add a separator element between "Settings" and "Purchases"
          return (
            <div key={`${index}-separator`} className="border-t border-muted" />
          );
        }
        return item.href ? (
          <Link
            key={`${index}-${item.title}`}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-full items-center rounded-md px-2 py-1 hover:text-primary leading-6 font-medium",
                pathname === item.href
                  ? "font-medium text-primary"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              {item.icon ? (
                <div className="mr-2 h-4 w-4">
                  {(() => {
                    return (
                      <Icon
                        name={item.icon}
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    );
                  })()}
                </div>
              ) : null}
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={`${index}-${item.title}`}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
}
