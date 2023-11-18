import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, desc, eq, not } from "drizzle-orm"

import { formatPrice, toTitleCase, slugify } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { AddToCartForm } from "@/components/forms/add-to-cart-form"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductCard } from "@/components/cards/product-card"
import { ProductImageCarousel } from "@/components/products/product-image-carousel"
import { Shell } from "@/components/shells/shell"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"

interface ProductsFromStoreProps {
  params: {
    productId: string
  }
  }
  
export async function ProductsFromStore({ params }:ProductsFromStoreProps) {
  const productId = Number(params.productId)

  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      category: true,
      subcategory: true,
      storeId: true,
    },
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }

  const store = await db.query.stores.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(stores.id, product.storeId),
  })

  const moreProducts = store
    ? await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          images: products.images,
          category: products.category,
          inventory: products.inventory,
        })
        .from(products)
        .limit(4)
        .where(
          and(
            eq(products.storeId, product.storeId),
            not(eq(products.id, productId))
          )
        )
        .orderBy(desc(products.inventory))
    : []
    return (
      <section
      id="products-from-store"
      aria-labelledby="products-from-store-heading"
      className="space-y-6 px-0"
    >
  {store && moreProducts.length > 0 ? (
    <div className="overflow-hidden md:pt-6 pb-6">
      <PageHeader>
        <PageHeaderHeading size="xs" className="font-medium/80">
        More products from <span className="text-2xl font-semibold underline-offset-4 underline decoration-2 hover:decoration-4 cursor-pointer decoration-theme">{store.name}</span>
        </PageHeaderHeading>
        </PageHeader>

      <div className="pt-6 px-2 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
         {moreProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
       
    </div>
  ) : null}
  </section>
    )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function ProductSkeleton() {
  return (
    <div className="col-span-4 space-y-4 lg:col-span-1">
      <div className={`relative h-[167px] rounded-xl bg-gray-900 ${shimmer}`} />

      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-6 w-1/3 rounded-lg bg-gray-900" />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
    </div>
  );
}

export function ProductsFromStoreSkeleton() {
  return (
    <div className="space-y-6 pb-[5px]">
      <div className="space-y-2">
        <div className={`h-6 w-1/3 rounded-lg bg-gray-900 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-gray-900 ${shimmer}`} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    </div>
  );
}