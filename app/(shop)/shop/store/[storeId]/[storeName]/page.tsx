import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"

import { Separator } from "@/components/ui/separator"

import { Products } from "@/components/products/products"
import { Shell } from "@/components/shells/shell"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"
import { StoreBanner } from "@/components/store-banner"
import { StoreIcon } from "@/components/store.icon"


export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Store",
  description: "Store description",
}

interface StorePageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {

  const storeId = Number(params.storeId);

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

    <div id="store-home-header" className="relative">
      <div className="flex-1">
      <div className="relative border-0">
      <div className="">
        <StoreBanner
        key={store.id}
        className="object-contain " 
          images={store.storeBanner ?? []}/> 
          </div>
          </div>
          <div className="flex w-full h-52">
  <div className="flex max-w-7xl mx-auto w-full p-4 space-y-2 bg-muted/30">
    <div className="flex w-1/2">
    <div className="items-center justify-center p-2">
      <StoreIcon className="min-w-full"
      images={store.storeIcon ?? []}/> 
  </div>
  <div className="pt-4 flex flex-col">
    <h2 className="flex flex-start line-clamp-1 text-2xl font-bold">{store.name}</h2>
    <p className="text-base text-muted-foreground">
      {store.headline}
    </p>
  </div>
  </div>
</div>
</div>

    <Shell variant="storeId" className="">
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
    </div>
    </div>
    </>
  )
}
