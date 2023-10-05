import * as z from "zod"

export const storeSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
  storeBanner: z
  .unknown()
  .refine((val) => {
    if (!Array.isArray(val)) return false
    if (val.some((file) => !(file instanceof File))) return false
    return true
  }, "Must be an array of File")
  .optional()
  .nullable()
  .default(null),
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
