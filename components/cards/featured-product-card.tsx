"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Product, type Store } from "@/db/schema"

import { cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import {Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"

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
      id="featured-product-card"
        className={cn(
          "group h-full overflow-hidden",
          className
        )}
        {...props}
      >
        <Link
          key={`${product.id}_link`}
          aria-label={`View ${product.name} details`}
          href={`/shop/product/${product.id}`}
        >
          <AspectRatio ratio={4 / 3}>
            {product?.images?.length ? (
              <Image
                key={`${product.id}_image`}
                src={
                  product.images[0]?.url ?? "/images/product-placeholder.webp"
                }
                alt={product.images[0]?.name ?? product.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover group-hover:scale-105"
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
        <div className="absolute left-0 top-2 z-20 ml-2 line-clamp-2 rounded-full bg-white text-black px-4 font-semibold align-middle content-center shadow-sm">
          {formatPrice(product.price)}
        </div>
      </Card>
    </div>
  )
}
