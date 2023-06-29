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
        "grid items-center",
        layout === "default",
        layout === "auth" ,
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
