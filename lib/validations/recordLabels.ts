import { recordLabels } from "@/db/schema"
import * as z from "zod"

export const recordLabelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  genre: z.string(), // Assuming genre is a required field in the database
  country: z.string(), // Assuming country is a required field in the database
  founding_year: z.string(), // Assuming founding_year is a required field in the database
  genres: z.array(z.string()), // Assuming genres is a required field in the database
  notable_artists: z.array(z.string()), // Assuming notable_artists is a required field in the database
  image: z.string(), // Assuming image is a required field in the database
  description: z.string().optional(),
});

export const filterRecordLabelsSchema = z.object({
  query: z.string(),
})

export const getRecordLabelSchema = z.object({
  id: z.number(),
  storeId: z.number(),
})

export const getRecordLabelInventorySchema = z.object({
  id: z.number(),
})

export const getRecordLabelsSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  categories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  subcategories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  price_range: z
    .string()
    .regex(/^\d+-\d+$/)
    .optional()
    .nullable(),
  store_ids: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
})
