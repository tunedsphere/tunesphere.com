import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        shopPagination: "border border-muted/30 shadow-sm hover:bg-theme-100",
        default: "bg-primary text-texthigh hover:text-texthigh/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
        outlineTheme:
          "text-primary border border-theme hover:bg-primary/30 hover:text-texthigh",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        ghostline:
          "hover:bg-accent outline-theme outline outline-1 hover:outline-offset-1",
        nav: "text-primary hover:bg-primary/30 hover:text-texthigh",
        link: "underline-offset-4 hover:underline text-primary",
        logInButton:
          "rounded-full text-texthigh bg-primary/70 hover:bg-primary/50",
        logInModal:
          "text-texthigh hover:text-primary border-2 border-theme hover:bg-primary/30 hidden shrink-0 px-2 font-semibold sm:block leading-6 text_texthigh",
      },
      size: {
        icon: "h-9 w-9",
        default: "py-1 px-4",
        xs: "h-8 px-2 rounded-md",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        xg: "h-12 px-8 rounded-md",
      },
      border: {
        default: "",
        transparent: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
