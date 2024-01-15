import type { Metadata } from 'next'
import { type Product } from '@/db/schema'
import { env } from '@/env.mjs'

import { toTitleCase } from '@/lib/utils'
import { formatTitleWithUnderscores } from '@/lib/utils'
import { Breadcrumbs } from '@/components/pagers/breadcrumbs'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Products } from '@/components/products/products'
import { Shell } from '@/components/shells/shell'
import { getProductsAction } from '@/app/_actions/product'
import { getStoresAction } from '@/app/_actions/store'
import { SubCategoryCard } from '@/components/cards/sub-category-card'
import { productCategories } from '@/configs/products'

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

interface CategoryPageProps {
  params: {
    category: Product['category']
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
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 8
  const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0

  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === 'string' ? sort : null,
    categories: category,
    subcategories: typeof subcategories === 'string' ? subcategories : null,
    price_range: typeof price_range === 'string' ? price_range : null,
    store_ids: typeof store_ids === 'string' ? store_ids : null,
  })

  const pageCount = Math.ceil(productsTransaction.count / limit)

  // Stores transaction
  const storesLimit = 25
  const storesOffset =
    typeof store_page === 'string'
      ? (parseInt(store_page) - 1) * storesLimit
      : 0

  const storesTransaction = await getStoresAction({
    limit: storesLimit,
    offset: storesOffset,
    sort: 'productCount.desc',
  })

  const storePageCount = Math.ceil(storesTransaction.count / storesLimit)

  return (
    <>
      <div className="mx-auto grid gap-4 bg-primary/10 px-2 py-8 pb-8">
        <Breadcrumbs
          segments={[
            {
              title: 'Products',
              href: '/shop/products',
            },
            {
              title: formatTitleWithUnderscores(toTitleCase(category)),
              href: `/shop/${formatTitleWithUnderscores(
                toTitleCase(category),
              )}`,
            },
          ]}
        />
        <PageHeader
          variant="shopProducts"
          id="category-page-header"
          aria-labelledby="category-page-header-heading"
        >
          <PageHeaderHeading variant="shop" size="lg" className="font-mono">
            {formatTitleWithUnderscores(toTitleCase(category))}
          </PageHeaderHeading>
          <PageHeaderDescription size="sm" className="font-mono">
            {`Choose ${formatTitleWithUnderscores(
              toTitleCase(category),
            )} that is the best for you`}
          </PageHeaderDescription>
        </PageHeader>
        <div className="mx-auto grid grid-flow-col gap-1.5 px-4 sm:gap-8">
          {productCategories
            .find((categoryItem) => categoryItem.title === category)
            ?.subcategories.map((subCategory) => (
              <SubCategoryCard
                key={subCategory.title}
                subCategory={subCategory}
                category={category}
              />
            ))}
        </div>
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
