import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const shellVariants = cva("grid gap-8 pb-8", {
  variants: {
    variant: {
      default: "container max-w-8xl mx-auto justify-center",
      full: "mx-auto gap-12",
      auth: "max-w-lg mx-auto sm:py-8 pb-0",
      shop: "py-8 px-0 xs:px-4 sm:px-6 md:px-8 mx-auto max-w-8xl",
      dashboard: "py-8 gap-8 px-4 sm:px-6 md:px-8",
      sidebar: "pt-0 md:py-0",
      centered: "mx-auto mb-16 mt-20 max-w-md justify-center",
      markdown: "relative z-20 py-6",
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
