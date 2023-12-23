'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type z } from 'zod'

import { catchError, cn } from '@/lib/utils'
import { updateCartItemSchema } from '@/lib/validations/cart'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/icon'
import { addToCart } from '@/app/_actions/cart'

interface AddToCartFromProps {
  productId: number
  showBuyNow?: boolean
}

type Inputs = z.infer<typeof updateCartItemSchema>

export function AddToCartForm({ productId, showBuyNow }: AddToCartFromProps) {
  const id = React.useId()
  const router = useRouter()
  const [isBuyingNow, startBuyingNow] = React.useTransition()
  const [isAddingToCart, startAddingToCart] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
    },
  })
  function onSubmit(data: Inputs) {
    startAddingToCart(async () => {
      try {
        await addToCart({
          productId,
          quantity: data.quantity,
        })
        toast.success('Added to cart.')
      } catch (err) {
        catchError(err)
      }
    })
  }
  return (
    <Form {...form}>
      <form
        className={cn(
          'flex max-w-[260px] gap-4',
          showBuyNow ? 'flex-col' : 'flex-row',
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <Button
            id={`${id}-decrement`}
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-r-none"
            onClick={() =>
              form.setValue(
                'quantity',
                Math.max(1, form.getValues('quantity') - 1),
              )
            }
            disabled={isAddingToCart}
          >
            <Icon name="remove" className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Remove one item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    className="h-8 w-16 rounded-none border-x-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      const parsedValue = parseInt(value, 10)
                      if (isNaN(parsedValue)) return
                      field.onChange(parsedValue)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${id}-increment`}
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-l-none"
            onClick={() =>
              form.setValue('quantity', form.getValues('quantity') + 1)
            }
            disabled={isAddingToCart}
          >
            <Icon name="plus" className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2.5">
          {showBuyNow ? (
            <Button
              type="button"
              aria-label="Buy now"
              size="sm"
              className="w-full"
              onClick={() => {
                startBuyingNow(async () => {
                  try {
                    await addToCart({
                      productId,
                      quantity: form.getValues('quantity'),
                    })
                    router.push('/cart')
                  } catch (err) {
                    catchError(err)
                  }
                })
              }}
              disabled={isBuyingNow}
            >
              {isBuyingNow && (
                <Icon
                  name="spinner"
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Buy now
            </Button>
          ) : null}
          <Button
            aria-label="Add to cart"
            type="submit"
            variant={showBuyNow ? 'outline' : 'default'}
            size="sm"
            className="w-full"
            disabled={isAddingToCart}
          >
            {isAddingToCart && (
              <Icon
                name="spinner"
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Add to cart
          </Button>
        </div>
      </form>
    </Form>
  )
}
