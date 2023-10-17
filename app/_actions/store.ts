"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products, stores, type Store } from "@/db/schema"
import { and, asc, desc, eq, isNull, not, sql } from "drizzle-orm"
import { type z } from "zod"

import type { StoredFile } from "@/types"
import { slugify } from "@/lib/utils"
import type { getStoresSchema, getStoreSchema, storeSchema } from "@/lib/validations/store"

export async function getStoresAction(input: z.infer<typeof getStoresSchema>) {
  const limit = input.limit ?? 10
  const offset = input.offset ?? 0
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Store | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const statuses = input.statuses?.split(".") ?? []

  const { items, count } = await db.transaction(async (tx) => {
    const items = await tx
      .select({
        id: stores.id,
        name: stores.name,
        description: stores.description,
        stripeAccountId: stores.stripeAccountId,
        userId: stores.userId, // Add missing properties
        headline: stores.headline, // Add missing properties
        storeBanner: stores.storeBanner, // Add missing properties
        storeIcon: stores.storeIcon, // Add missing properties
        slug: stores.slug, // Add missing properties
        active: stores.active, // Add missing properties
        createdAt: stores.createdAt,
      })
      .from(stores)
      .limit(limit)
      .offset(offset)
      .leftJoin(products, eq(stores.id, products.storeId))
      .where(
        and(
          input.userId ? eq(stores.userId, input.userId) : undefined,
          statuses.includes("active") && !statuses.includes("inactive")
            ? not(isNull(stores.stripeAccountId))
            : undefined,
          statuses.includes("inactive") && !statuses.includes("active")
            ? isNull(stores.stripeAccountId)
            : undefined
        )
      )
      .groupBy(stores.id)
      .orderBy(
        desc(stores.stripeAccountId),
        input.sort === "productCount.asc"
          ? asc(sql<number>`count(*)`)
          : input.sort === "productCount.desc"
          ? desc(sql<number>`count(*)`)
          : column && column in stores
          ? order === "asc"
            ? asc(stores[column])
            : desc(stores[column])
          : desc(stores.createdAt)
      )

    const count = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(stores)
      .where(input.userId ? eq(stores.userId, input.userId) : undefined)
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

export async function addStoreAction(
  input: z.infer<typeof storeSchema> & { 
    userId: string,
    storeBanner: StoredFile[] | null,
    storeIcon: StoredFile[] | null}
) {
  const storeWithSameName = await db.query.stores.findFirst({
    where: eq(stores.name, input.name),
  })

  if (storeWithSameName) {
    throw new Error("Store name already taken.")
  }

  await db.insert(stores).values({
    name: input.name,
    headline: input.headline,
    description: input.description,
    storeBanner: input.storeBanner,
    storeIcon: input.storeIcon,
    userId: input.userId,
    slug: slugify(input.name),
  })

  revalidatePath("/dashboard/stores")
}

export async function checkStoreAction(input: { name: string; id?: number }) {
  const storeWithSameName = await db.query.stores.findFirst({
    where: input.id
      ? and(not(eq(stores.id, input.id)), eq(stores.name, input.name))
      : eq(stores.name, input.name),
  })

  if (storeWithSameName) {
    throw new Error("Store name already taken.")
  }
}


export async function updateStoreAction(
  input: z.infer<typeof storeSchema> & {
    userId: string;
    id: number;
    storeBanner: StoredFile[] | null;
    storeIcon: StoredFile[] | null;
    name?: string; // Add properties to update
    description?: string; // Add properties to update
    headline?: string; // Add properties to update
  }
) {
  const store = await db.query.stores.findFirst({
    where: and(eq(stores.id, input.id), eq(stores.userId, input.userId)),
  });

  if (!store) {
    throw new Error("Store not found.");
  }

  await db.update(stores).set(input).where(eq(stores.id, input.id));

  revalidatePath(`/dashboard/stores/${input.id}`);
}

export async function deleteStoreAction(input: z.infer<typeof getStoreSchema>) {
  const store = await db.query.stores.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(stores.id, input.id), eq(stores.userId, input.userId)),
  });

  if (!store) {
    throw new Error("Store not found.");
  }

  await db.delete(stores).where(eq(stores.id, input.id));

  revalidatePath("/dashboard/stores");
}
