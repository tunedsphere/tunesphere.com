import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, serial, varchar, timestamp, text, mysqlEnum, int, json, tinyint, decimal, mediumtext } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const addresses = mysqlTable("addresses", {
	id: serial("id").notNull(),
	line1: varchar("line1", { length: 191 }),
	line2: varchar("line2", { length: 191 }),
	city: varchar("city", { length: 191 }),
	state: varchar("state", { length: 191 }),
	postalCode: varchar("postalCode", { length: 191 }),
	country: varchar("country", { length: 191 }),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		addressesIdPk: primaryKey({ columns: [table.id], name: "addresses_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const albums = mysqlTable("albums", {
	id: serial("id").notNull(),
	title: text("title"),
	genre: mysqlEnum("genre", ['ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech']).default('ambient').notNull(),
	style: text("style"),
	releaseDate: text("release_date"),
	recordLabel: text("record_label"),
	format: text("format"),
	country: text("country"),
	distributor: text("distributor"),
	artwork: text("artwork"),
	masteredBy: text("mastered_by"),
	writtenBy: text("written_by"),
	producer: text("producer"),
	artistId: int("artistId").notNull(),
},
(table) => {
	return {
		albumsIdPk: primaryKey({ columns: [table.id], name: "albums_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const artists = mysqlTable("artists", {
	id: serial("id").notNull(),
	name: text("name"),
	genre: mysqlEnum("genre", ['ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech']).default('ambient').notNull(),
},
(table) => {
	return {
		artistsIdPk: primaryKey({ columns: [table.id], name: "artists_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const carts = mysqlTable("carts", {
	id: serial("id").notNull(),
	paymentIntentId: varchar("paymentIntentId", { length: 191 }),
	clientSecret: varchar("clientSecret", { length: 191 }),
	items: json("items").default('null'),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	closed: tinyint("closed").default(0).notNull(),
},
(table) => {
	return {
		cartsIdPk: primaryKey({ columns: [table.id], name: "carts_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const djs = mysqlTable("djs", {
	id: serial("id").notNull(),
	name: text("name"),
	genre: mysqlEnum("genre", ['ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech']).default('ambient').notNull(),
},
(table) => {
	return {
		djsIdPk: primaryKey({ columns: [table.id], name: "djs_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const emailPreferences = mysqlTable("email_preferences", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 191 }),
	email: varchar("email", { length: 191 }).notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	newsletter: tinyint("newsletter").default(0).notNull(),
	marketing: tinyint("marketing").default(0).notNull(),
	transactional: tinyint("transactional").default(0).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		emailPreferencesIdPk: primaryKey({ columns: [table.id], name: "email_preferences_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const orders = mysqlTable("orders", {
	id: serial("id").notNull(),
	storeId: int("storeId").notNull(),
	items: json("items").default('null'),
	stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 191 }).notNull(),
	stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }),
	email: varchar("email", { length: 191 }),
	addressId: int("addressId"),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	quantity: int("quantity"),
	amount: decimal("amount", { precision: 10, scale: 2 }).default('0.00').notNull(),
},
(table) => {
	return {
		ordersIdPk: primaryKey({ columns: [table.id], name: "orders_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const payments = mysqlTable("payments", {
	id: serial("id").notNull(),
	storeId: int("storeId").notNull(),
	stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
	stripeAccountCreatedAt: int("stripeAccountCreatedAt"),
	stripeAccountExpiresAt: int("stripeAccountExpiresAt"),
	detailsSubmitted: tinyint("detailsSubmitted").default(0).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		paymentsIdPk: primaryKey({ columns: [table.id], name: "payments_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const products = mysqlTable("products", {
	id: serial("id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	images: json("images").default('null'),
	category: mysqlEnum("category", ['art','clothing','decorations','accessories','plants','literature','music','tools','education']).default('art').notNull(),
	subcategory: varchar("subcategory", { length: 24 }),
	price: decimal("price", { precision: 10, scale: 2 }).default('0.00').notNull(),
	inventory: int("inventory").default(0).notNull(),
	rating: int("rating").default(0).notNull(),
	tags: json("tags").default('null'),
	storeId: int("storeId").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).onUpdateNow(),
},
(table) => {
	return {
		productsIdPk: primaryKey({ columns: [table.id], name: "products_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const recordLabels = mysqlTable("recordLabels", {
	id: serial("id").notNull(),
	name: text("name"),
	country: text("country"),
	images: json("images").default('null'),
	foundingYear: text("founding_year"),
	genre: mysqlEnum("genre", ['ambient','Downtempo','Psybreaks','Zenon','Natural Trance','Progressive','Goa','Full-On Morning','Full-On Twilight','Forest','Dark','Hi-Tech']).default('ambient').notNull(),
	description: text("description"),
},
(table) => {
	return {
		recordLabelsIdPk: primaryKey({ columns: [table.id], name: "recordLabels_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const stores = mysqlTable("stores", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 34 }).notNull(),
	name: varchar("name", { length: 110 }).notNull(),
	description: mediumtext("description"),
	slug: text("slug"),
	active: tinyint("active").default(0).notNull(),
	stripeAccountId: varchar("stripeAccountId", { length: 191 }),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	storeBanner: json("storeBanner").default('null'),
	storeIcon: json("storeIcon").default('null'),
	headline: varchar("headline", { length: 100 }),
},
(table) => {
	return {
		storesIdPk: primaryKey({ columns: [table.id], name: "stores_id_pk"}),
		id: unique("id").on(table.id),
	}
});

export const tracklist = mysqlTable("tracklist", {
	id: serial("id").notNull(),
	albumId: text("album_id"),
	title: text("title"),
	duration: text("duration"),
	remixers: text("remixers"),
},
(table) => {
	return {
		tracklistIdPk: primaryKey({ columns: [table.id], name: "tracklist_id_pk"}),
		id: unique("id").on(table.id),
	}
});