import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium leading-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        shopPagination: 'border border-muted/30 shadow-sm hover:bg-theme-100',
        default: 'bg-primary text-texthigh hover:text-texthigh/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline:
          'border border-input shadow-sm hover:bg-accent hover:text-accent-foreground',
        outlineTheme:
          'border border-theme text-primary hover:bg-primary/30 hover:text-texthigh',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        ghostline:
          'outline outline-1 outline-theme hover:bg-accent hover:outline-offset-1',
        nav: 'rounded-md px-2 text-primary hover:bg-primary/30 hover:text-texthigh',
        link: 'text-primary underline-offset-4 hover:underline',
        logInButton:
          'rounded-full bg-primary/70 text-texthigh hover:bg-primary/50',
        logInModal:
          'text_texthigh hidden shrink-0 border-2 border-theme px-2 font-semibold leading-6 text-texthigh hover:bg-primary/30 hover:text-primary sm:block',
      },
      size: {
        icon: 'h-9 w-9',
        default: 'px-2 py-1',
        xs: 'h-8 rounded-md px-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-12 rounded-md px-8',
      },
      border: {
        default: '',
        transparent: 'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

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
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
