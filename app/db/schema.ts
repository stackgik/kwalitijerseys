import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// 2. Register it as an official native Postgres Enum type
export const productTypeEnum = pgEnum("product_type", [
  "modern",
  "current",
  "retro",
] as const);

export const leagueTypeEnum = pgEnum("league_type", [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "National Teams",
  "Others",
] as const);

const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description").notNull(),
  team: varchar("team").notNull(),
  league: leagueTypeEnum("league").notNull(),
  season: varchar("season", { length: 20 }).notNull(),
  stock: integer("stock").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  type: productTypeEnum("type").notNull(),
  priceInKobo: integer("price_in_kobo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  url: varchar("url").notNull(),
  order: integer("order").notNull(),
});

const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Internal Reference (e.g., KJ-63820)
  reference: varchar("reference", { length: 255 }).notNull().unique(),

  // Customer Profile Bundle
  customerName: varchar("customer_name").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  address: text("address").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  orderNotes: text("order_notes"), // 💡 Great for customer delivery specifications

  // Operational Money Matrix (Saved in Kobo)
  itemsSubtotal: integer("items_subtotal").notNull(), // Cost of all jerseys combined
  deliveryFee: integer("delivery_fee").notNull(), // 💡 Vital for historic financial reporting
  total: integer("total").notNull(), // Total absolute amount charged (subtotal + shipping)

  // State Machine Decoupling
  paymentStatus: varchar("payment_status").default("pending").notNull(), // "pending", "paid", "failed", "refunded", "fraud_audit_flagged"

  deliveryStatus: varchar("delivery_status").default("pending").notNull(), // "pending", "dispatched", "delivered", "returned"

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  size: varchar("size").notNull(),
  version: varchar("version").default("stadium"),
  // customization details if any
  customName: varchar("custom_name"),
  customNumber: varchar("custom_number"),
  customPrice: integer("custom_price"),
});

const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

const accounts = pgTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

const verifications = pgTable(
  "verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

const wishlistItems = pgTable("wishlists", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages), // ← "images" key maps to productImages table
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId], // The foreign key column in your images table
    references: [products.id], // The primary key column it points to in products
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export {
  products,
  productImages,
  orders,
  orderItems,
  users,
  sessions,
  verifications,
  accounts,
  wishlistItems,
};
