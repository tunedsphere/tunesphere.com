'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Product } from '@/db/schema'
import { toast } from 'sonner'
import { catchError, cn, formatPrice } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { slugify } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icon } from '@/components/icon'
import { addToCart } from '@/app/_actions/cart'
import { Badge } from '../ui/badge'
import { Rating } from '../rating'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  storeName: string | string[] | undefined
  product: Pick<
    Product,
    | 'id'
    | 'name'
    | 'price'
    | 'images'
    | 'category'
    | 'inventory'
    | 'storeId'
    | 'rating'
  >
  variant?: 'default' | 'switchable'
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function ProductCard({
  product,
  storeName,
  variant = 'default',
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition()
  const [isAddedToCart, setIsAddedToCart] = React.useState(false)
  console.log(storeName)
  return (
    <div className="group relative">
      <Card
        id="product-card"
        className={cn('border-none bg-transparent', className)}
        {...props}
      >
        <Link
          key={`${product.id}_link`}
          aria-label={product.name}
          href="/shop/product/[...productId]/page"
          as={`/shop/product/${product.id}/${slugify(product.name)}`}
        >
          <CardHeader className="relative p-0">
            <AspectRatio ratio={4 / 3}>
              <div className="absolute -inset-x-0.5 -inset-y-0.5 hidden rounded-lg blur-lg transition motion-reduce:transition-none lg:block lg:group-hover:bg-muted/80 "></div>
              {product?.images?.length ? (
                <Image
                  key={`${product.id}_image`}
                  src={product.images[0]?.url ?? '/images/placeholder.webp'}
                  alt={product.images[0]?.name ?? product.name}
                  className="absolute h-full w-full cursor-pointer rounded-t-sm"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                  fill
                  loading="lazy"
                />
              ) : (
                <div
                  aria-label="Placeholder"
                  role="img"
                  aria-roledescription="placeholder"
                  className="flex h-full w-full items-center justify-center bg-secondary"
                >
                  <Icon
                    name="placeholder"
                    className="h-9 w-9 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              )}
            </AspectRatio>
          </CardHeader>
        </Link>
        <CardContent className="grid gap-0.5 p-0">
          <CardTitle className="mt-2 cursor-pointer truncate text-sm font-medium leading-relaxed hover:text-foreground/80 sm:text-base">
            {product.name}
          </CardTitle>
          <div className="text-sm font-bold leading-snug sm:text-lg">
            <Rating rating={Math.round(product.rating / 5)} />
          </div>
          <div className="text-sm font-bold leading-snug sm:text-lg">
            {formatPrice(product.price)}
          </div>
          <div className="flex gap-x-1.5">
            <div className="text-sm font-bold leading-snug text-emerald-400 sm:text-lg">
              -{/* */}30{/* */}%
            </div>
            <div className="flex">
              <div className="text-sm leading-snug sm:text-sm">$</div>
              <div className="text-sm font-bold leading-snug sm:text-lg">
                204.4
              </div>
            </div>
            <div className="text-sm leading-snug text-muted-foreground line-through">
              {formatPrice(product.price)}
            </div>
          </div>
          <Link
            className="line-clamp-1  text-sm font-medium text-muted-foreground hover:text-foreground/80 hover:underline sm:text-base"
            key={product.storeId}
            aria-label={
              Array.isArray(storeName) ? storeName.join(', ') : storeName
            }
            href={`/shop/store/${product.storeId}/${slugify(storeName)}`}
          >
            {storeName}
          </Link>
        </CardContent>
        <CardFooter className="mb-2 mt-1 grid w-full grid-flow-col gap-2">
          <div className="">
            <div>
              <Badge className="shrink-0 self-start" variant="success">
                Free Delivery
              </Badge>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="hidden sm:block">
              <Link
                href={`/shop/preview/product/${product.id}`}
                title="Preview"
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                    className: 'h-8 w-8',
                  }),
                )}
              >
                <Icon name="scan-eye" className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Preview</span>
              </Link>
            </div>
            <Button
              className="rounded-sm"
              onClick={async () => {
                if (isPending) return

                startTransition(async () => {
                  try {
                    if (isAddedToCart) {
                      // Handle removing from cart if it's already added
                      // Implement your remove from cart logic here
                      toast.success('Removed from cart.')
                    } else {
                      // Handle adding to cart if it's not added yet
                      await addToCart({
                        productId: product.id,
                        quantity: 1,
                      })
                      toast.success('Added to cart.')
                    }

                    // Toggle isAddedToCart state
                    setIsAddedToCart((prevIsAdded) => !prevIsAdded)

                    // Call onSwitch if provided
                    onSwitch?.()
                  } catch (err) {
                    catchError(err)
                  }
                })
              }}
              disabled={isPending}
            >
              {isPending ? (
                <Icon
                  name="spinner"
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <>
                  {isAddedToCart ? (
                    <Icon
                      name="check"
                      className=" h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon
                      name="basket"
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
