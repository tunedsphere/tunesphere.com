import type { CartItem, CheckoutItem, StoredFile } from "@/types"
import { relations } from "drizzle-orm"
import {
  boolean,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  mediumtext,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 34 }).notNull(),
  name: varchar("name", { length: 110 }).notNull(),
  headline: varchar("headline", { length: 100 }),
  description: mediumtext("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(false),
  storeBanner: json("storeBanner").$type<StoredFile[] | null>().default(null),
  storeIcon: json("storeIcon").$type<StoredFile[] | null>().default(null),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type Store = typeof stores.$inferSelect
export type NewStore = typeof stores.$inferInsert

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  payments: many(payments),
}))

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: mysqlEnum("category", [
    "art",
    "clothing",
    "decorations",
    "accessories",
    "plants",
    "literature",
    "music",
    "tools",
    "education",
    "cds_and_vinyls"
  ])
    .notNull()
    .default("art"),
  subcategory: varchar("subcategory", { length: 24 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: int("inventory").notNull().default(0),
  rating: int("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  storeId: int("storeId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))


// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type Cart = typeof carts.$inferSelect
export type NewCart = typeof carts.$inferInsert

export const emailPreferences = mysqlTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type EmailPreference = typeof emailPreferences.$inferSelect
export type NewEmailPreference = typeof emailPreferences.$inferInsert

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  storeId: int("storeId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt"),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] }),
}))

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  storeId: int("storeId").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: int("quantity"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 191,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 191,
  }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: int("addressId"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type Address = typeof addresses.$inferSelect
export type NewAddress = typeof addresses.$inferInsert
// Define the 'artist' table
export const artists = mysqlTable("artists", {
  id: serial("id").autoincrement().primaryKey(),
  name: text("name"),
  genre: mysqlEnum("genre", [
    "ambient",
    "Downtempo",
    "Psybreaks",
    "Zenon",
    "Natural Trance",
    "Progressive",
    "Goa",
    "Full-On Morning",
    "Full-On Twilight",
    "Forest",
    "Dark",
    "Hi-Tech",
  ])
  .notNull()
  .default("ambient"),
});
export type Artist = typeof artists.$inferSelect

export const djs = mysqlTable("djs", {
  id: serial("id").autoincrement().primaryKey(),
  name: text("name"),
  genre: mysqlEnum("genre", [
    "ambient",
    "Downtempo",
    "Psybreaks",
    "Zenon",
    "Natural Trance",
    "Progressive",
    "Goa",
    "Full-On Morning",
    "Full-On Twilight",
    "Forest",
    "Dark",
    "Hi-Tech",
  ])
  .notNull()
  .default("ambient"),
});
export type Dj = typeof djs.$inferSelect
// Define the 'album' table
export const albums = mysqlTable("albums", {
  id: serial("id").autoincrement().primaryKey(),
  artistId: int("artist_id").notNull(),
  title: text("title"),
  genre: mysqlEnum("genre", [
    "ambient",
    "Downtempo",
    "Psybreaks",
    "Zenon",
    "Natural Trance",
    "Progressive",
    "Goa",
    "Full-On Morning",
    "Full-On Twilight",
    "Forest",
    "Dark",
    "Hi-Tech",
  ])
  .notNull()
  .default("ambient"),
  style: text("style"),
  release_date: text("release_date"),
  record_label: text("record_label"),
  format: text("format"),
  country: text("country"),
  distributor: text("distributor"),
  artwork: text("artwork"),
  mastered_by: text("mastered_by"),
  written_by: text("written_by"),
  producer: text("producer"),
  // Add other album attributes as needed
});

export type Album = typeof albums.$inferSelect
// Define the 'albums_to_artists' table for the many-to-many relationship
export const albumsRelations = relations(albums, ({ one }) => ({
  artist: one(artists, { fields: [albums.artistId], references: [artists.id] }),
}))
// Define the 'tracklist' table for album track details
export const tracklist = mysqlTable("tracklist", {
  id: serial("id").autoincrement().primaryKey(),
  albumId: text("album_id"),
  title: text("title"),
  duration: text("duration"),
  remixers: text("remixers"), // Store remixers as a comma-separated string
});
export const recordLabels = mysqlTable("recordLabels", {
  id: serial("id").autoincrement().primaryKey(),
  name: text("name"),
  country: text("country"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  founding_year: text("founding_year"), 
  genre: mysqlEnum("genre", [
      "ambient",
      "Downtempo",
      "Psybreaks",
      "Zenon",
      "Natural Trance",
      "Progressive",
      "Goa",
      "Full-On Morning",
      "Full-On Twilight",
      "Forest",
      "Dark",
      "Hi-Tech",
    ])
    .notNull()
    .default("ambient"),
  description: text("description"), 
});
export type RecordLabel = typeof recordLabels.$inferSelect