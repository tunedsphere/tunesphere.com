'use client'

import * as React from 'react'
import { toast } from 'sonner'

import { generateProducts } from '@/app/_actions/product'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Icon } from '@/components/icon'

interface SeedProductsProps extends ButtonProps {
  storeId: number
  count?: number
}

export function GenerateProducts({
  storeId,
  count,
  className,
  ...props
}: SeedProductsProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Button
      className={cn(className)}
      size="sm"
      onClick={() => {
        startTransition(async () => {
          await generateProducts({
            storeId,
            count,
          })
          toast.success('Products seeded successfully.')
        })
      }}
      {...props}
      disabled={isPending}
    >
      {isPending && (
        <Icon name="spinner" className="mr-2 h-4 w-4 animate-spin" />
      )}
      Generate products
    </Button>
  )
}
