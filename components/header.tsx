import { cn } from "@/lib/utils"

interface HeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string
  description?: string | null
  size?: "default" | "sm"
  variant?: "dashboard"
}

export function Header({
  title,
  description,
  size = "default",
  variant = "dashboard",
  className,
  ...props
}: HeaderProps) {
  return (
    <div className={cn("grid gap-1",
      variant === "dashboard" && "bg-accent2 p-8", className)} {...props}>
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          size === "default" && "md:text-4xl",

        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "text-textlow",
            size === "default" && "text-lg"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
