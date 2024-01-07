import '@/styles/globals.css'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const sidebarVariants = cva('flex shrink-0 flex-col overflow-hidden', {
  variants: {
    variant: {
      default: '',
      musicgrid: 'overflow-auto overflow-x-hidden  border-b border-r border-t',
      dashboard:
        'sticky left-0 flex hidden h-screen w-[var(--sidebar-dashboard-width)]  shrink-0 flex-col items-center overflow-hidden overflow-y-auto border-r border-r pt-4 md:sticky md:block',
    },

    size: {
      default: '',
      small: 'w-56',
      large: 'w-72',
    },
  },
  defaultVariants: {
    size: 'default',
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
  },
)

Sidebar.displayName = 'Sidebar'

export { Sidebar, sidebarVariants }
