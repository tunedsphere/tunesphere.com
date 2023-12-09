import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UpdateCart } from "@/components/cart/update-cart";
import { Icon } from "@/components/icon";
import { getCartAction } from "@/app/_actions/cart";

interface CartSheetProps {
  className?: string;
}

export async function CartSheet({ className }: CartSheetProps) {
  const cartLineItems = await getCartAction();

  const itemCount = cartLineItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const cartTotal = cartLineItems.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.price),
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="nav"
          size="xs"
          className={`px-2 ${className}`}
        >
          {itemCount > 0 && (
            <Badge
              variant="success"
              className="absolute -translate-y-1/2 translate-x-1/2 transform"
            >
              {itemCount}
            </Badge>
          )}
          <Icon name="basket" className="transition-all" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-10000 flex w-full flex-col pr-0 sm:max-w-lg bg-background">
        <div className="absolute w-full flex h-full items-center justify-center">
          <Icon
            name="logo"
            className="absolute h-80 w-80 -z-10 text-primary opacity-30"
          />
        </div>
        <SheetHeader className="px-1">
          <SheetTitle className="">
            Your Basket {itemCount > 0 && `(${itemCount})`}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {itemCount > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {cartLineItems.map((item) => (
                    <div key={item.id} className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          {item?.images?.length ? (
                            <Image
                              src={
                                item.images[0]?.url ??
                                "/images/product-placeholder.webp"
                              }
                              alt={item.images[0]?.name ?? item.name}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              fill
                              className="absolute object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="bg-destructive-500 flex h-full items-center justify-center">
                              <Icon
                                name="placeholder"
                                className="h-6 w-6 text-muted-foreground"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                          <span className="line-clamp-1">{item.name}</span>
                          <span className="line-clamp-1 text-muted-foreground">
                            {formatPrice(item.price)} x {item.quantity} ={" "}
                            {formatPrice(
                              (
                                Number(item.price) * Number(item.quantity)
                              ).toFixed(2)
                            )}
                          </span>
                          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                            {`${item.category} ${
                              item.subcategory ? `/ ${item.subcategory}` : ""
                            }`}
                          </span>
                        </div>
                        <UpdateCart cartLineItem={item} />
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <Separator className="mb-2" />
              <div className="flex">
                <span className="flex-1">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex">
                <span className="flex-1">Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="mt-2" />
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <SheetFooter className="mt-1.5">
                <Button
                  aria-label="Proceed to checkout"
                  size="sm"
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <Icon
              name="cart"
              className="h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              We understand Inflation but your Basket is empty
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
