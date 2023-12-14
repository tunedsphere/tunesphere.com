'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'
import { Skeleton } from '@/components/ui/skeleton'
import { Icon } from '@/components/icon'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/70',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        outlineTheme:
          'border border-theme hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const { pending } = useFormStatus()
    const mounted = useMounted()

    const Comp = asChild ? Slot : 'button'

    if (!mounted)
      return (
        <Skeleton
          className={cn(
            buttonVariants({ variant, size, className }),
            'bg-muted text-muted-foreground',
          )}
        >
          {props.children}
        </Skeleton>
      )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={pending ?? props.disabled}
        {...props}
      >
        {pending && (
          <Icon
            name="spinner"
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {props.children}
      </Comp>
    )
  },
)
LoadingButton.displayName = 'LoadingButton'

export { LoadingButton }
