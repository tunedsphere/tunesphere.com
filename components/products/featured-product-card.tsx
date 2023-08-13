"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Product, type Store } from "@/db/schema"
import { toast } from "sonner"

import { cn, formatPrice } from "@/lib/utils"
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

interface FeaturedProductCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  stores?: Pick<Store, "id" | "name">[]
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function FeaturedProductCard({
  stores,
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: FeaturedProductCardProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <div className="relative">
      <Card
        className={cn(
          "h-full overflow-hidden rounded-none border-0 bg-theme-100 sm:border-2 lg:rounded-md",
          className
        )}
        {...props}
      >
        <Link
          aria-label={`View ${product.name} details`}
          href={`/shop/product/${product.id}`}
        >
          <AspectRatio ratio={4 / 3}>
            {product?.images?.length ? (
              <Image
                src={
                  product.images[0]?.url ?? "/images/product-placeholder.webp"
                }
                alt={product.images[0]?.name ?? product.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-transparent"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </Link>
        <div className="absolute left-0 top-2 z-20 ml-2 line-clamp-2 rounded-full bg-theme-50 px-2 font-semibold text-textdark">
          {formatPrice(product.price)}
        </div>
      </Card>
    </div>
  )
}
