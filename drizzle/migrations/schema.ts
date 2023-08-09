import { sql } from "drizzle-orm"
import {
  AnyMySqlColumn,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlSchema,
  mysqlTable,
  serial,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core"

export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey().notNull(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").default("null"),
  createdAt: timestamp("createdAt", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const emailPreferences = mysqlTable("email_preferences", {
  id: serial("id").primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: tinyint("newsletter").default(0).notNull(),
  marketing: tinyint("marketing").default(0).notNull(),
  transactional: tinyint("transactional").default(0).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }),
  storeId: int("storeId").notNull(),
  items: json("items").default("null"),
  total: decimal("total", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 191,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 191,
  }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: int("addressId"),
  createdAt: timestamp("createdAt", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }),
  storeId: int("storeId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt").notNull(),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt").notNull(),
  detailsSubmitted: tinyint("detailsSubmitted").default(0).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const products = mysqlTable("products", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").default("null"),
  category: mysqlEnum("category", [
    "clothing",
    "accessories",
    "art",
    "decorations",
  ])
    .default("clothing")
    .notNull(),
  subcategory: varchar("subcategory", { length: 191 }),
  price: decimal("price", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  inventory: int("inventory").default(0).notNull(),
  rating: int("rating").default(0).notNull(),
  tags: json("tags").default("null"),
  storeId: int("storeId").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  slug: text("slug"),
  active: tinyint("active").default(1).notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }),
  createdAt: timestamp("createdAt", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})
