"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Product, type Store } from "@/db/schema"

import { productsRelations } from "@/db/schema"
import { storesRelations } from "@/db/schema"
import { toast } from "sonner"

import { catchError, cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { addToCartAction } from "@/app/_actions/cart"
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Pick<
    Product,
    "id" | "name" | "price" | "images" | "category" | "inventory" | "storeId"
  >
  stores?: Pick<Store, "id" | "name">[]
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}



export function ProductCard({
  stores,
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Card
      className={cn(
        "h-full overflow-hidden rounded-none border-0 bg-background-shop sm:rounded-lg sm:border border-muted/10 shadow-xl",
        className
      )}
      {...props}
    >
      <Link href={`/shop/product/${product.id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
          {product?.images?.length ? (
              <Image
                src={
                  product.images[0]?.url ?? "/images/product-placeholder.webp"
                }
                alt={product.images[0]?.name ?? product.name}
                className="object-cover"
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
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link href={`/product/${product.id}`} tabIndex={-1}>
        <CardContent className="grid pb-4">
          <CardTitle className="line-clamp-1 text-textdark py-2">
            {product.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-textdark">
            {formatPrice(product.price)}
          </CardDescription>
          <CardTitle as="h6" className="line-clamp-1 text-muted-foreground pt-2">
          {product.storeId}
          </CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row align-middle">
            <Link
              aria-label="Preview product"
              href={`/shop/product-preview/${product.id}`}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
                className: "h-8 w-full rounded-sm font-semibold ",
              })}
            >
              PREVIEW
            </Link>
            {variant === "default" ? (
              
          <Button
            aria-label="Add to cart"
            size="sm"
            className="w-full rounded-sm flex"
            onClick={() => {
              startTransition(async () => {
                try {
                  await addToCartAction({
                    productId: product.id,
                    quantity: 1,
                  })
                  toast.success("Added to cart.")
                } catch (err) {
                  catchError(err)
                }
              })
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}

            <span><Icons.add className="sm:hidden xl:block"/></span>
            <span><Icons.basket className="hidden sm:block lg:hidden"/></span>
            <span className="w-full font-semibold sm:hidden block lg:block">Add to cart</span>
          </Button>
        ) : (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isAddedToCart ? "Added" : "Add to cart"}
          </Button>
        )}
        </div>
      </CardFooter>
    </Card>
  )
}
