import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { Products } from "@/components/products/products"
import { Shell } from "@/components/shells/shell"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"

import { slugify } from "@/lib/utils"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Store",
  description: "Store description",
}

interface StorePageProps {
  params: {
    storeId: string
    storeName: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {
  const storeId = Number(params.storeId)

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
  })

  if (!store) {
    notFound()
  }

  const { page, per_page, store_page } = searchParams

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const productsTransaction = await getProductsAction({
    limit: limit,
    offset: offset,
    store_ids: String(storeId),
  })

  const pageCount = Math.ceil(productsTransaction.count / limit)

  // Stores transaction
  const storesLimit = 25
  const storesOffset =
    typeof store_page === "string"
      ? (parseInt(store_page) - 1) * storesLimit
      : 0

  const storesTransaction = await getStoresAction({
    limit: storesLimit,
    offset: storesOffset,
    sort: "name.asc",
  })

  const storePageCount = Math.ceil(storesTransaction.count / storesLimit)

  return (
    <>
     <div className="min-h-400px max-w-screen">
          <Image src="/bggenre/test-banner.jpg"
          width={800}
          height={400}           
          alt=""
          className="min-w-full"></Image>
      </div>
      <div className="space-y-2 bg-muted/10 h-52">

  {/* Image on the left */}
  <div className="max-w-screen-xl mx-auto flex flex-wrap items-center p-4">
      {/* Image on the left */}
      <div className="w-120 h-120 rounded-md overflow-hidden mr-4">
        <Image
          src="/bggenre/test-banner.jpg" // Replace with the actual image source
          width={120}
          height={120}
          alt=""
          className="rounded-md"
        />
      </div>

  {/* Text content on the right */}
  <div className="w-1/2 p-4">
    <h2 className="line-clamp-1 text-2xl font-bold text-textdark">{store.name}</h2>
    <p className="text-base text-muted-foreground">
      {store.description}
    </p>
  </div>
</div>
</div>
    <Shell variant="storeId">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex w-full flex-col gap-4">
          <Separator className="my-1.5" />
          <Products
            products={productsTransaction.items}
            pageCount={pageCount}
            categories={Object.values(products.category.enumValues)}
            stores={storesTransaction.items}
            storePageCount={storePageCount}
          />
        </div>
      </div>
    </Shell>
    </>
  )
}
