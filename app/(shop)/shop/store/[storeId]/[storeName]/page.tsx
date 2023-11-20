import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { eq } from "drizzle-orm"

import { Products } from "@/components/products/products"
import { Shell } from "@/components/shells/shell"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"
import { StoreBanner } from "@/components/store-banner"
import { StoreIcon } from "@/components/store.icon"
interface StorePageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}
async function getStoreFromParams(params: StorePageProps["params"]) {
  const storeId = Number(params.storeId)

  return await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
  })
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const store = await getStoreFromParams(params)

  if (!store) {
    return {}
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: store.name,
    description: store.description,
  }
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {
  const store = await getStoreFromParams(params)

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
    store_ids: String(store.id),
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

      <section id="store-home-header" className="relative flex-1">
        <div className="flex w-full h-[3.5rem] bg-primary/20"></div>
        {/* <StoreBanner
        key={store.id}
        className="object-contain " 
          images={store.storeBanner ?? []}/>  */}
        <div className="flex w-full bg-muted/10">
          <div className="flex max-w-7xl mx-auto w-full p-4 space-y-2">
            <div className="flex w-1/2">
              <div className="items-center justify-center p-2">
                <StoreIcon className="w-[120px] h-[120px]"
                  images={store.storeIcon ?? []} />
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
      </section>
      <Shell className="py-8">
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex w-full flex-col gap-4">
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
