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
        "grid",
        layout === "default",
        layout === "auth" && "max-w-lg mx-auto",
        layout === "dashboard" && "mx-auto w-full gap-0",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
