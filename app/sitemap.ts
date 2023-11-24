import { type MetadataRoute } from "next"
import { allPosts, allDocs } from "contentlayer/generated"

import { productCategories } from "@/configs/products"
import { absoluteUrl } from "@/lib/utils"
import { getProductsAction } from "@/app/_actions/product"
import { getStoresAction } from "@/app/_actions/store"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const storesTransaction = await getStoresAction({
    limit: 10,
    offset: 0,
    sort: "createdAt.desc",
  })

  const stores = storesTransaction.items.map((store) => ({
    url: absoluteUrl(`/shop/products?store_ids=${store.id}`),
    lastModified: new Date().toISOString(),
  }))

  const productsTransaction = await getProductsAction({
    limit: 10,
    offset: 0,
    sort: "createdAt.desc",
  })

  const products = productsTransaction.items.map((product) => ({
    url: absoluteUrl(`/shop/product/${product.id}/${product.name}`),
    lastModified: new Date().toISOString(),
  }))

  const categories = productCategories.map((category) => ({
    url: absoluteUrl(`/shop/c/${category.title}`),
    lastModified: new Date().toISOString(),
  }))

  const subcategories = productCategories
    .map((category) =>
      category.subcategories.map((subcategory) => ({
        url: absoluteUrl(`/shop/c/${category.title}/${subcategory.slug}`),
        lastModified: new Date().toISOString(),
      }))
    )
    .flat()

  const posts = allPosts.map((post) => ({
    url: absoluteUrl(`${post.slug}`),
    lastModified: new Date().toISOString(),
  }))

  const docs = allDocs.map((doc) => ({
    url: absoluteUrl(`${doc.slug}`),
    lastModified: new Date().toISOString(),
  }));

  const routes = [
    "",
    "/shop/products",
    "/shop/stores",
    "/blog",
    "/docs",
    "/festivals",
    "/dashboard/account",
    "/dashboard/billing",
    "/dashboard/purchases",
    "/dashboard/stores",
    "/dashboard/settings",
    "/music/artists",
    "/music/albums",
    "/music/djs",
    "/music/labels",
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  return [
    ...routes,
    ...stores,
    ...products,
    ...categories,
    ...subcategories,
    ...posts,
    ...docs,
  ]
}
