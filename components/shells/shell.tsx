import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const shellVariants = cva("grid gap-8 pb-8", {
  variants: {
    variant: {
      default: "container max-w-screen-2xl mx-auto justify-center",
      full: "mx-auto gap-12",
      auth: "max-w-lg mx-auto sm:py-8 pb-0",
      shop: "py-8 px-2 mx-auto max-w-screen-2xl",
      storeId: "pb-8 px-2 mx-auto max-w-screen-xl",
      dashboard: "py-8 gap-8 md:px-8 xl:px-10 px-4",
      sidebar: "pt-0 md:py-0",
      centered: "mx-auto mb-16 mt-20 max-w-md justify-center",
      markdown: "relative grow py-6 lg:gap-10 xl:grid xl:grid-cols-[1fr_100px] max-w-7xl mx-auto",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

function Shell({
  className,
  as: Comp = "section",
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

export { Shell, shellVariants }
