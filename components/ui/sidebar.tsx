import "@/styles/globals.css"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sidebarVariants = cva("flex flex-col shrink-0 overflow-hidden", {
  variants: {
    variant: {
      default: "",
      musicgrid:
        "overflow-x-hidden overflow-auto border-muted border-t border-r border-b",
      dashboard:
        "w-[var(--sidebar-dashboard-width)] h-screen flex flex-col overflow-hidden border-r border-muted pt-4 items-center sticky left-0 hidden shrink-0 overflow-y-auto border-r md:sticky md:block",
    },

    size: {
      default: "",
      small: "w-56",
      large: "w-72",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        className={cn(sidebarVariants({ size, className, variant }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Sidebar.displayName = "Sidebar"

export { Sidebar, sidebarVariants }
