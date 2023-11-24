"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { productsRelations } from "@/db/schema";
import { type Product } from "@/db/schema";
import { toast } from "sonner"
import { catchError, cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { slugify } from "@/lib/utils";
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
  storeName: string | string[] | undefined;
  product: Pick<
    Product,
    "id" | "name" | "price" | "images" | "category" | "inventory" | "storeId"
  >;
  variant?: "default" | "switchable";
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  product,
  storeName,
  variant = "default",
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition();
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  console.log(storeName);
  return (
      <div className="relative">   
       
      <Card
      id="product-card"
        className={cn(
          "group rounded-noneborder-none border-muted bg-card sm:rounded-lg sm:border",
          className
        )}
        {...props}
      >
        <Link 
        key={`${product.id}_link`}  
        aria-label={product.name} 
        href="/shop/product/[...productId]/page"
        as={`/shop/product/${product.id}/${slugify(product.name)}`}
        className="group cursor-default">

          <CardHeader className="p-0 relative">
            <AspectRatio ratio={4 / 3}>
            <div className="absolute inset-0 z-10 bg-muted/20 transition-color group-hover:bg-zinc-950/30" />
              {product?.images?.length ? (
                  <Image
                    key={`${product.id}_image`}
                    src={
                      product.images[0]?.url ?? "/images/product-placeholder.webp"
                    }
                    alt={product.images[0]?.name ?? product.name}
                    className="absolute h-full w-full object-cover rounded-md cursor-default group-hover:bg-zinc-950/50"
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
          <CardContent className="grid pb-4">
            <CardTitle className="truncate py-2 text-base cursor-pointer group-hover:font-semibold group-hover:underline underline-offset-2 decoration-2 decoration-primary">
              {product.name}
            </CardTitle>
            <div className="text-lg font-bold leading-snug">
              {formatPrice(product.price)}
            </div>
            <div className="flex gap-x-1.5">
  <div className="text-lg font-bold leading-snug text-emerald-400">
    -{/* */}30{/* */}%
  </div>
  <div className="flex">
    <div className="text-sm leading-snug">$</div>
    <div className="text-lg font-bold leading-snug">204.4</div>
  </div>
  <div className="text-sm leading-snug text-muted-foreground line-through">
   {formatPrice(product.price)}
  </div>
</div>   
         <Link    
            className="line-clamp-1 text-muted-foreground"        
            key={product.storeId}
            aria-label={Array.isArray(storeName) ? storeName.join(', ') : storeName}
            href={`/shop/store/${product.storeId}/${slugify(storeName)}`}>

                 {storeName}
                 </Link>  
          </CardContent>
        <CardFooter className="p-4">
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row align-middle">
            <Button
              aria-label={isAddedToCart ? "Remove from cart" : "Add to Basket"}
              size="sm"
              className="w-full rounded-sm flex"
              onClick={async () => {
                if (isPending) return;

                startTransition(async () => {
                  try {
                    if (isAddedToCart) {
                      // Handle removing from cart if it's already added
                      // Implement your remove from cart logic here
                      toast.success("Removed from cart.");
                    } else {
                      // Handle adding to cart if it's not added yet
                      await addToCartAction({
                        productId: product.id,
                        quantity: 1,
                      });
                      toast.success("Added to cart.");
                    }

                    // Toggle isAddedToCart state
                    setIsAddedToCart((prevIsAdded) => !prevIsAdded);

                    // Call onSwitch if provided
                    onSwitch?.();
                  } catch (err) {
                    catchError(err);
                  }
                });
              }}
              disabled={isPending}
            >
              {isPending ? (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <>
                  {isAddedToCart ? (
                    <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
                  {/* Consistent label */}
                  <span className="w-full font-semibold">
                    {isAddedToCart ? "Added" : "Add to Basket"}
                  </span>
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
      </div>
  );
}

