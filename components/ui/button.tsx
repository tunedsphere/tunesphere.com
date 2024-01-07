import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium leading-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border text-texthigh hover:text-texthigh/80',
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        secondary:
          'bg-secondary/50 text-secondary-foreground shadow-sm hover:bg-secondary/60 hover:text-secondary-foreground',
        soft: 'bg-soft/20 font-semibold text-soft-foreground shadow-sm hover:bg-soft/50',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
        success:
          'bg-success font-bold text-success-foreground hover:bg-success/80',
        outline:
          'border border-input hover:bg-theme-100 hover:text-accent-foreground',
        outlineColor:
          'border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        ghostColor:
          'rounded-md text-primary hover:bg-primary/30 hover:text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        rounded:
          'rounded-full bg-primary text-primary-foreground hover:bg-primary/50',
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
