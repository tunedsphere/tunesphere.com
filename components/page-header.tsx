// Modified from: https://github.com/shadcn-ui/ui/blob/main/apps/www/components/page-header.tsx

import { cva, type VariantProps } from 'class-variance-authority'
import { Balancer } from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}
const PageHeaderVariants = cva('grid gap-1', {
  variants: {
    variant: {
      default: '',
      dashboard: 'border-b  pb-8 pt-2',
      auth: 'justify-center text-center',
      shop: 'justify-center text-center',
      shopProducts: 'mb-4 justify-center text-center',
    },
  },
})
interface PageHeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof PageHeaderVariants> {}
function PageHeader({
  variant,
  className,
  children,
  as: Comp = 'section',
  ...props
}: PageHeaderProps) {
  return (
    <Comp className={cn(PageHeaderVariants({ variant, className }))} {...props}>
      {children}
    </Comp>
  )
}

const headingVariants = cva('font-bold leading-loose tracking-tight', {
  variants: {
    variant: {
      default: '',
      shop: '',
      shopProducts: 'justify-center',
    },
    size: {
      default: 'text-3xl md:text-4xl',
      xs: 'text-xl md:text-2xl',
      sm: 'text-2xl md:text-3xl',
      lg: 'text-4xl md:text-5xl',
      xl: 'text-4xl md:text-5xl lg:text-6xl',
      xxl: 'text-6xl md:text-7xl lg:text-8xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function PageHeaderHeading({
  className,
  size,
  variant,
  as: Comp = 'h1',

  ...props
}: PageHeaderHeadingProps) {
  return (
    <Comp
      className={cn(headingVariants({ size, className, variant }))}
      {...props}
    />
  )
}

const descriptionVariants = cva('max-w-[750px] leading-relaxed text-textlow', {
  variants: {
    size: {
      default: 'text-base sm:text-lg',
      sm: 'text-sm sm:text-base',
      lg: 'text-lg sm:text-xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface PageHeaderDescriptionProps
  extends React.ComponentProps<typeof Balancer>,
    VariantProps<typeof descriptionVariants> {}

function PageHeaderDescription({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <Balancer
      as="p"
      className={cn(descriptionVariants({ size, className }))}
      {...props}
    />
  )
}

export { PageHeader, PageHeaderDescription, PageHeaderHeading }
