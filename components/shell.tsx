import * as React from "react"

import { cn } from "@/lib/utils"

interface ShellProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode
  layout?: "default" | "dashboard" | "auth"
}

export function Shell({
  children,
  layout = "default",
  className,
  ...props
}: ShellProps) {
  return (
    <section
      className={cn(
        "grid gap-8 pb-8 pt-6 md:py-8",
        layout === "default",
        layout === "auth" && "container max-w-lg",
        layout === "dashboard" && "mx-auto w-full px-8 gap-0",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
