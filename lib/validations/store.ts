import * as z from "zod"
import { StoredFile } from "@/types"

export const storeSchema = z.object({
  name: z.string().min(3).max(110, {
    message: "Name can not be more than 110 characters long",
  }),
  headline: z.string().max(100, {
    message: "Headline can not be more than 100 characters long",
  })
  .optional(),
  description: z.string().max(300, {
    message: "Description can not be more than 300 characters long",
  })
  .optional(),
  storeBanner: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
  }))
  .nullable()
  .optional(),
  storeIcon: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
  }))
  .nullable()
  .optional(),
})

export const getStoreSchema = z.object({
  id: z.number(),
  userId: z.string(),
})

export const getStoresSchema = z.object({
  description: z.string().optional(),
  limit: z.number().default(10).optional(),
  offset: z.number().default(0).optional(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  statuses: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  userId: z.string().optional(),
})
