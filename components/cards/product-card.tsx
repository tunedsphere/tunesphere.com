"use client"
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/db/schema";
import { toast } from "sonner";
import { catchError, cn, formatPrice } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { addToCartAction } from "@/app/_actions/cart";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Pick<
    Product,
    "id" | "name" | "price" | "images" | "category" | "inventory"
  >;
  variant?: "default" | "switchable";
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  product,
  variant = "default",
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition();
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  return (
    <>
      <Card
        className={cn(
          "group rounded-none border-0 bg-background-shop sm:rounded-lg sm:border border-muted/10 relative z-20",
          className
        )}
        {...props}
      >
        <Link className="" href={`/shop/product/${product.id}`}>
          <div className="absolute -inset-1 group-hover:bg-muted/20 rounded-lg blur-sm -z-10" />
          <CardHeader className="p-0 relative">
            <AspectRatio ratio={4 / 3}>
              {product?.images?.length ? (
                <div>
                  <Image
                    src={
                      product.images[0]?.url ?? "/images/product-placeholder.webp"
                    }
                    alt={product.images[0]?.name ?? product.name}
                    className="object-cover rounded-sm"
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                    fill
                    loading="lazy"
                  />
                </div>
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
        <Link href={`shop/product/${product.id}`} tabIndex={-1}>
          <CardContent className="grid pb-4 bg-background-shop">
            <CardTitle className="line-clamp-1 text-textdark py-2 text-2xl">
              {product.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-textdark">
              {formatPrice(product.price)}
            </CardDescription>
            <CardTitle
              as="h6"
              className="line-clamp-1 text-muted-foreground pt-2 cursor-pointer"
            >
              Store:
            </CardTitle>
          </CardContent>
        </Link>
        <CardFooter className="p-4 bg-background-shop">
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
    </>
  );
}