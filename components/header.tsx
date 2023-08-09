import { cn } from "@/lib/utils"

interface HeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string
  description?: string | null
  size?: "default" | "sm" | "auth" | "shop"
  variant?: "default" | "dashboard" | "auth" | "shop"
}

export function Header({
  title,
  description,
  size = "default",
  variant = "default",
  className,
  ...props
}: HeaderProps) {
  return (
    <div
      className={cn(
        "grid gap-1",
        variant === "dashboard" && "bg-muted p-8",
        variant === "auth" && "",
        variant === "default" && "",
        variant === "shop" && "justify-center text-center",
        className
      )}
      {...props}
    >
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          size === "default" && "md:text-4xl",
          size === "auth" && "text-4xl",
          size === "shop" && "text-4xl text-textdark"
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "text-muted-foreground",
            size === "default" && "text-lg",
            size === "shop" && "text-lg "
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
