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
import { ProductsFromStore, ProductsFromStoreSkeleton } from "@/components/products-from-store"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {

  const productId = Number(params.productId)

  const product = await db.query.products.findFirst({
    columns: {
      name: true,
      description: true,
    },
    where: eq(products.id, productId),
  })

  if (!product) {
    return {}
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: toTitleCase(product.name),
    description: product.description
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
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
    where: product.storeId ? eq(stores.id, product.storeId) : undefined,
  })


 
 
  return (
    <Shell variant="shop">
    <Breadcrumbs
        segments={[
          {
            title: "Products",
            href: "/shop/products",
          },
          {
            title: toTitleCase(product.category),
            href: `/shop/c/${product.category}`,
          },
          {
            title: toTitleCase(product.subcategory || ''),
            href: `/shop/c/${product.category}/${product.subcategory || ''}`,
          },
          {
            title: product.name,
            href: `/shop/product/${product.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16 px-2">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">
              {product.name}
            </h2>
            <p className="text-xl font-semibold">
              {formatPrice(product.price)}
            </p>
            {store ? (
              <Link
              href={`/shop/store/${store.id}/${slugify(store.name)}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground underline decoration-primary hover:underline hover:decoration-2 underline-offset-4"
              >
                {store.name}
              </Link>
            ) : null}
          </div>
          <Separator className="my-1.5" />
          <AddToCartForm productId={productId} />
          <Separator className="mt-5" />
          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="description" className="border-muted pb-5">
              <AccordionTrigger className="text-base underline underline-offset-4 decoration-primary hover:decoration-2">
                Description
              </AccordionTrigger>
              <AccordionContent className="">
                {product.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Suspense fallback={<ProductsFromStoreSkeleton />}>

      <ProductsFromStore params={params}/>

      </Suspense>
    </Shell>
  )
}
