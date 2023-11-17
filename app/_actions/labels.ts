"use server"

import { revalidatePath } from "next/cache"
import { recordLabelsData } from "@/public/recordLabelsData"
import { recordLabels, type RecordLabel } from "@/db/schema"
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

import type {
  getRecordLabelSchema,
  getRecordLabelsSchema,
  recordLabelSchema,
} from "@/lib/validations/recordLabels"
export async function filterRecordLabelsAction(query: string) {
  if (query.length === 0) return null

  const filteredRecordLabels = await recordLabelsData
    .select({
      id: recordLabels.id,
      name: recordLabels.name,
      genre: recordLabels.genres,
    })
    .from(recordLabels)
    .where(like(recordLabels.name, `%${query}%`))
    .orderBy(desc(recordLabels.founding_year))
    .limit(10)

  const recordLabelsByGenre = Object.values(recordLabels.genres.enumValues).map(
    (genre) => ({
      genre,
      recordLabels: filteredRecordLabels.filter(
        (recordLabel) => recordLabel.genre === genre
      ),
    })
  )

  return recordLabelsByGenre
}

export async function getRecordLabelsAction(
  input: z.infer<typeof getRecordLabelsSchema>
) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof RecordLabel | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const genres =
    (input.genres?.split(".") as RecordLabel["genre"][]) ?? []
  const subcategories = input.subcategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map(Number) ?? []

  const { items, count } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(recordLabels)
      .limit(input.limit)
      .offset(input.offset)
      .where(
        and(
          genres.length
            ? inArray(recordLabels.genre, genres)
            : undefined,
        )
      )
      .groupBy(recordLabels.id)
      .orderBy(
        column && column in recordLabels
          ? order === "asc"
            ? asc(recordLabels[column])
            : desc(recordLabels[column])
          : desc(recordLabels.founding_year)
      )

    const count = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(recordLabels)
      .where(
        and(
          genres.length
            ? inArray(recordLabels.genre, genres)
            : undefined,
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

export async function checkRecordLabelAction(input: { name: string; id?: number }) {
  const productWithSameName = await db.query.recordLabels.findFirst({
    where: input.id
      ? and(not(eq(recordLabels.id, input.id)), eq(recordLabels.name, input.name))
      : eq(recordLabels.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("RecordLabel name already taken.")
  }
}

