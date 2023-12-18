'use client'

import * as React from 'react'
import { toast } from 'sonner'

import { updateProductRating } from '@/app/_actions/product'
import { catchError, cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Icon } from '@/components/icon'

interface UpdateProductRatingButtonProps extends ButtonProps {
  productId: number
  rating: number
}

export function UpdateProductRatingButton({
  productId,
  rating,
  className,
  ...props
}: UpdateProductRatingButtonProps) {
  const [isFavoriting, startFavoriting] = React.useTransition()

  return (
    <Button
      title="Favorite"
      variant="outline"
      size="icon"
      className={cn('h-8 w-8 shrink-0', className)}
      onClick={() => {
        startFavoriting(async () => {
          try {
            await updateProductRating({
              id: productId,
              rating: rating + 1,
            })
            toast.success('Favorited product.')
          } catch (err) {
            catchError(err)
          }
        })
      }}
      disabled={isFavoriting}
      {...props}
    >
      {isFavoriting ? (
        <Icon
          name="spinner"
          className="h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      ) : (
        <Icon name="heart" className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="sr-only">Favorite</span>
    </Button>
  )
}
