
import { products } from "@/db/schema"
import { env } from "@/env.mjs"

import { Products } from "@components/products/products"
import { Shell } from "@components/shells/shell"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"


import { Breadcrumbs } from "@/components/pagers/breadcrumbs"

import type { Metadata } from "next"

import { and, desc, eq, not, sql } from "drizzle-orm"

import { formatPrice, toTitleCase } from "@/lib/utils"




export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Buy products from our stores",
}


// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ProductsPage({
  searchParams, 
}: ProductsPageProps) {
  const {
    page,
    per_page,
    sort,
    categories,
    subcategories,
    price_range,
    store_ids,
    store_page,
  } = searchParams

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: typeof categories === "string" ? categories : null,
    subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    store_ids: typeof store_ids === "string" ? store_ids : null,
  })

  const pageCount = Math.ceil(productsTransaction.total / limit)

  // Stores transaction
  const storesLimit = 25
  const storesOffset =
    typeof store_page === "string"
      ? (parseInt(store_page) - 1) * storesLimit
      : 0

  const storesTransaction = await getStoresAction({
    limit: storesLimit,
    offset: storesOffset,
    sort: "productCount.desc",
  })

  const storePageCount = Math.ceil(storesTransaction.total / storesLimit)

  return (
    <section className="section-max-width py-8">
    <Shell>
    <Breadcrumbs
        segments={[
          {
            title: "Products",
            href: "/shop/products",
          },
          {
            title: toTitleCase(products.category.name),
            href: `/shop/products?category=${products.category}`,
          },
        ]}
      />
      <Products
        products={productsTransaction.items}
        pageCount={pageCount}
        categories={Object.values(products.category.enumValues)}
        stores={storesTransaction.items}
        storePageCount={storePageCount}
      />
    </Shell>
    </section>
  )
}
