
import Link from "next/link"
import { db } from "@/db"
import { products, stores, type Product } from "@/db/schema"
import { FeaturedProductCard } from "@/components/cards/featured-product-card"

import { desc, eq, sql } from "drizzle-orm"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription
} from "@/components/page-header"

import { delayRecentlyAddedProducts } from "@/lib/delays"
export async function RecentlyAddedProducts() {
    await new Promise((resolve) => setTimeout(resolve, delayRecentlyAddedProducts));
    const allProducts = await db
      .select()
      .from(products)
      .limit(8)
      .groupBy(products.id)
      .orderBy(desc(products.createdAt))


        return (

<section
id="recently-Added-products"
aria-label="Recently Added Products"
className="space-y-6 px-0 overflow-hidden py-8 md:pt-12 lg:pt-24"
>
<div className="flex w-full items-center px-2">
  <PageHeaderHeading size="xs" className="flex-1 /90 underline-offset-4 underline decoration-primary font-semibold">
    Recently Added
  </PageHeaderHeading>
  <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 overflow-visible text-center">
<h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl"></h2></div>
  <Link href="/shop/products">
    <div
    role="button"
      className={cn(
        buttonVariants({
          size: "sm",
        })
      )}
    >
      View all
      <span className="sr-only">View all products</span>
    </div>
  </Link>
</div>

<div className="grid w-full grid-cols-2 gap-1.5 px-0 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {allProducts.map((product) => (
    <FeaturedProductCard 
    key={product.id}
    product={product} />
  ))}
</div>
</section>
)
  }

  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme/10 before:to-transparent`;

function ProductSkeleton() {
  return (
    <div className="col-span-4 space-y-4 lg:col-span-1">
      <div className={`relative h-[167px] rounded-xl bg-card ${shimmer}`} />
    </div>
  );
}

export function RecentlyAddedProductsSkeleton() {
  return (
    <section
id="recently-added-products"
aria-labelledby="Recently-Added-products-heading"
className="space-y-6 px-0 overflow-hidden py-8 md:pt-12 lg:pt-24"
>
<div className="flex w-full items-center px-2">
  <PageHeaderHeading size="xs" className="flex-1 underline-offset-4 underline decoration-primary font-semibold">
    Recently Added
  </PageHeaderHeading>
  <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 overflow-visible text-center">
<h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl"></h2></div>
  <Link href="/shop/products">
    <div
      className={cn(
        buttonVariants({
          size: "sm",
        })
      )}
    >
      View all
      <span className="sr-only">View all products</span>
    </div>
  </Link>
</div>
      <div className="grid grid-cols-2 gap-1.5 px-0 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    </section>
  );
}