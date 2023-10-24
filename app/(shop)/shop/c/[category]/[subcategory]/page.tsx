import type { Metadata } from "next"
import { type Product } from "@/db/schema"
import { env } from "@/env.mjs"

import { toTitleCase, unslugify } from "@/lib/utils"

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

interface SubcategoryPageProps {
  params: {
    category: Product["category"]
    subcategory: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export function generateMetadata({ params }: SubcategoryPageProps): Metadata {
  const subcategory = unslugify(params.subcategory)

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: toTitleCase(subcategory),
    description: `Buy the best ${subcategory}`,
  }
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProps) {
  const { category, subcategory } = params
  const { page, per_page, sort, price_range, store_ids, store_page } =
    searchParams

  // Products transaction

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: category,
    subcategories: subcategory,
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
    <Shell variant="shop">
      <Breadcrumbs
        segments={[
          {
            title: "Products",
            href: "/shop/products",
          },
          {
            title: toTitleCase(category),
            href: `/shop/c/${category}`,
          },
          {
            title: toTitleCase(subcategory),
            href: `/shop/c/${category}/${subcategory}`,
          },
        ]}
      />
        <PageHeader
        variant="shopProducts"
        id="subcategory-page-header"
        aria-labelledby="subcategory-page-header-heading"
      >
        <PageHeaderHeading size="sm" variant="shopProducts">
          {toTitleCase(unslugify(subcategory))}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Buy the best ${unslugify(subcategory)}`}
        </PageHeaderDescription>
      </PageHeader>
      <Products
        id="subcategory-page-products"
        aria-labelledby="subcategory-page-products-heading"
        products={productsTransaction.items}
        pageCount={pageCount}
        stores={storesTransaction.items}
        storePageCount={storePageCount}
      />
    </Shell>
  )
}
