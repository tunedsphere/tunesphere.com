import type { Metadata } from "next"
import { type Product } from "@/db/schema"
import { env } from "@/env.mjs"

import { toTitleCase } from "@/lib/utils"

import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { 
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
 } from "@/components/page-header"
import { Products } from "@/components/products/products"
import { Shell } from "@/components/shells/shell"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

interface CategoryPageProps {
  params: {
    category: Product["category"]
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: toTitleCase(params.category),
    description: `Buy products from the ${params.category} category`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = params
  const {
    page,
    per_page,
    sort,
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
    categories: category,
    subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    store_ids: typeof store_ids === "string" ? store_ids : null,
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
    sort: "productCount.desc",
  })

  const storePageCount = Math.ceil(storesTransaction.count / storesLimit)

  return (
    <>
    <div className="grid gap-4 pb-8 py-8 px-2 mx-auto bg-primary/10">
    <Breadcrumbs
    segments={[
      {
        title: "Products",
        href: "/shop/products",
      },
      {
        title: toTitleCase(category),
        href: `/shop/${category}`,
      },
    ]}
  />
   <PageHeader
    variant="shopProducts"
    id="category-page-header"
    aria-labelledby="category-page-header-heading"
  >
    <PageHeaderHeading variant="shop" size="xl" className="font-mono">
      {toTitleCase(category)}
      </PageHeaderHeading>
    <PageHeaderDescription size="sm" className="font-mono">
      {`Choose ${category} that is the best for you`}
    </PageHeaderDescription>
  </PageHeader>
  </div>
    <Shell variant="shop">
     
      <Products
        id="category-page-products"
        aria-labelledby="category-page-products-heading"
        products={productsTransaction.items}
        pageCount={pageCount}
        category={category}
        stores={storesTransaction.items}
        storePageCount={storePageCount}
      />
    </Shell>
    </>
  )
}
