"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products, type Product } from "@/db/schema"
import type { StoredFile } from "@/types"
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
} from "drizzle-orm"
import { type z } from "zod"
import { faker } from "@faker-js/faker"
import type {
  getProductSchema,
  getProductsSchema,
  productSchema,
  updateProductRatingSchema,
} from "@/lib/validations/product"
import { getSubcategories, productTags } from "@/configs/products"
export async function generateProducts({
  storeId,
  count,
}: {
  storeId: number
  count?: number
}) {
  const productCount = count ?? 100

  const data: Product[] = []

  for (let i = 0; i < productCount; i++) {
    const category =
      faker.helpers.shuffle(products.category.enumValues)[0] ?? "art"

    const subcategories = getSubcategories(category)
    

    data.push({
      id: new Date().getTime() + new Date().getMilliseconds() + i,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      images: Array.from({ length: 3 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.system.fileName(),
        url: faker.image.urlLoremFlickr({
          category,
          width: 640,
          height: 480,
        }),
      })),
      category,
      subcategory:
        faker.helpers.shuffle(subcategories)[0]?.value ??
        subcategories[0]?.value ??
        "",
      storeId,
      inventory: faker.number.float({ min: 50, max: 100 }),
      rating: faker.number.float({ min: 0, max: 5 }),
      tags: productTags.slice(0, faker.number.float({ min: 0, max: 5 })),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    })
  }

  await db.delete(products).where(eq(products.storeId, storeId))

  await db.insert(products).values(data)
}


export async function filterProductsAction(query: string) {
  if (query.length === 0) return null

  const filteredProducts = await db
    .select({
      id: products.id,
      name: products.name,
      category: products.category,
    })
    .from(products)
    .where(like(products.name, `%${query}%`))
    .orderBy(desc(products.createdAt))
    .limit(10)

  const productsByCategory = Object.values(products.category.enumValues).map(
    (category) => ({
      category,
      products: filteredProducts.filter(
        (product) => product.category === category
      ),
    })
  )

  return productsByCategory
}

export async function getProductsAction(
  input: z.infer<typeof getProductsSchema>
) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Product | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const categories =
    (input.categories?.split(".") as Product["category"][]) ?? []
  const subcategories = input.subcategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map(Number) ?? []

  const { items, count } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(products)
      .limit(input.limit)
      .offset(input.offset)
      .where(
        and(
          categories.length
            ? inArray(products.category, categories)
            : undefined,
          subcategories.length
            ? inArray(products.subcategory, subcategories)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
          storeIds.length ? inArray(products.storeId, storeIds) : undefined
        )
      )
      .groupBy(products.id)
      .orderBy(
        column && column in products
          ? order === "asc"
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt)
      )

    const count = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(products)
      .where(
        and(
          categories.length
            ? inArray(products.category, categories)
            : undefined,
          subcategories.length
            ? inArray(products.subcategory, subcategories)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
          storeIds.length ? inArray(products.storeId, storeIds) : undefined
        )
      )
      .execute()
      .then((res) => res[0]?.count ?? 0)

    return {
      items,
      count,
    }
  })

  return {
    items,
    count,
  }
}

export async function checkProductAction(input: { name: string; id?: number }) {
  const productWithSameName = await db.query.products.findFirst({
    where: input.id
      ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
      : eq(products.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("Product name already taken.")
  }
}

export async function addProductAction(
  input: z.infer<typeof productSchema> & {
    storeId: number
    images: StoredFile[] | null
  }
) {
  const productWithSameName = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: eq(products.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("Product name already taken.")
  }

  await db.insert(products).values({
    ...input,
    storeId: input.storeId,
    images: input.images,
  })

  revalidatePath(`/dashboard/stores/${input.storeId}/products.`)
}

export async function updateProductAction(
  input: z.infer<typeof productSchema> & {
    storeId: number
    id: number
    images: StoredFile[] | null
  }
) {
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, input.id), eq(products.storeId, input.storeId)),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  await db.update(products).set(input).where(eq(products.id, input.id))

  revalidatePath(`/dashboard/stores/${input.storeId}/products/${input.id}`)
}

export async function deleteProductAction(
  input: z.infer<typeof getProductSchema>
) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(products.id, input.id), eq(products.storeId, input.storeId)),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  await db.delete(products).where(eq(products.id, input.id))

  revalidatePath(`/dashboard/stores/${input.storeId}/products`)
}

export async function getNextProductIdAction(
  input: z.infer<typeof getProductSchema>
) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(products.storeId, input.storeId), gt(products.id, input.id)),
    orderBy: asc(products.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}

export async function getPreviousProductIdAction(
  input: z.infer<typeof getProductSchema>
) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(products.storeId, input.storeId), lt(products.id, input.id)),
    orderBy: desc(products.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}

export async function updateProductRating(
  input: z.infer<typeof updateProductRatingSchema>
) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      rating: true,
    },
    where: eq(products.id, input.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  await db
    .update(products)
    .set({ rating: input.rating })
    .where(eq(products.id, input.id))

  revalidatePath("/")
}