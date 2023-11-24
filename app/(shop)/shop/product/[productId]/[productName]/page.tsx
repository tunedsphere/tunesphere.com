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
import { ProductImageCarousel } from "@/components/products/product-image-carousel"
import { Shell } from "@/components/shells/shell"
import { ProductsFromStore, ProductsFromStoreSkeleton } from "@/components/products-from-store"

interface ProductPageProps {
  params: {
    productId: String
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
  console.log('params.productId:', params.productId);
  const productId = Number(params.productId);
  console.log('ProductId (After Conversion):', productId);
  console.log('ProductId (Before Query):', productId);
  if (isNaN(productId)) {
    console.error('Invalid productId:', params.productId);
    notFound();
    return;
  }
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
  });

  console.log('Product:', product);

  if (!product) {
    console.error('Product not found for productId:', productId);
    notFound();
    return;
  }

  console.log('Product ID:', product.id);
  console.log('Product Name:', product.name);
  console.log('Product Description:', product.description);
  console.log('Product Price:', product.price);
  console.log('Product Images:', product.images);
  console.log('Product Category:', product.category);
  console.log('Product Subcategory:', product.subcategory);
  console.log('Product StoreId:', product.storeId);


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
{/* 
      <ProductsFromStore params={params}/> */}

      </Suspense>
    </Shell>
  )
}
