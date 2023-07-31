
import '@styles/globals.css';
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils";

const sidebarVariants = cva(
  "flex flex-col shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        musicgrid: "overflow-x-hidden overflow-auto border-accent4 border-y-2 px-1",
        dashboard: "w-[var(--sidebar-dashboard-width)] flex flex-col overflow-hidden border-r-2 border-accent4 pt-4 items-center justify-stretch sticky left-0 hidden shrink-0 overflow-y-auto border-r md:sticky md:block",
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
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        className={cn(sidebarVariants({ size, className, variant, }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar, sidebarVariants };