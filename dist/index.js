var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  coupons: () => coupons,
  downloads: () => downloads,
  insertCouponSchema: () => insertCouponSchema,
  insertDownloadSchema: () => insertDownloadSchema,
  insertOrderItemSchema: () => insertOrderItemSchema,
  insertOrderSchema: () => insertOrderSchema,
  insertPaymentTransactionSchema: () => insertPaymentTransactionSchema,
  insertProductSchema: () => insertProductSchema,
  insertShippingRateSchema: () => insertShippingRateSchema,
  insertSubscriptionHistorySchema: () => insertSubscriptionHistorySchema,
  insertSubscriptionPlanSchema: () => insertSubscriptionPlanSchema,
  insertUserSchema: () => insertUserSchema,
  orderItems: () => orderItems,
  orders: () => orders,
  paymentTransactions: () => paymentTransactions,
  products: () => products,
  sessions: () => sessions,
  shippingRates: () => shippingRates,
  subscriptionHistory: () => subscriptionHistory,
  subscriptionPlans: () => subscriptionPlans,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, json, boolean, timestamp, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // Keep default for migration compatibility
  // Replit Auth fields
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Legacy fields (kept for compatibility)
  username: text("username").unique(),
  password: text("password"),
  // Stripe subscription fields
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  subscriptionStatus: text("subscription_status").$type(),
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  subscriptionPlanId: text("subscription_plan_id").default("horat_keva_99"),
  isSubscriber: boolean("is_subscriber").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true
});
var subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  nameHebrew: text("name_hebrew").notNull(),
  description: text("description").notNull(),
  descriptionHebrew: text("description_hebrew").notNull(),
  price: integer("price").notNull(),
  // in agorot (shekels * 100)
  currency: text("currency").notNull().default("ILS"),
  intervalType: text("interval_type").$type().notNull().default("month"),
  intervalCount: integer("interval_count").notNull().default(1),
  stripePriceId: text("stripe_price_id").unique(),
  features: json("features").$type(),
  featuresHebrew: json("features_hebrew").$type(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
var subscriptionHistory = pgTable("subscription_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  subscriptionId: text("subscription_id").notNull(),
  eventType: text("event_type").$type().notNull(),
  stripeEventId: text("stripe_event_id").unique(),
  eventData: json("event_data"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertSubscriptionHistorySchema = createInsertSchema(subscriptionHistory);
var products = pgTable("products", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  nameEnglish: text("name_english"),
  nameFrench: text("name_french"),
  nameSpanish: text("name_spanish"),
  nameRussian: text("name_russian"),
  description: text("description").notNull(),
  descriptionEnglish: text("description_english"),
  descriptionFrench: text("description_french"),
  descriptionSpanish: text("description_spanish"),
  descriptionRussian: text("description_russian"),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  author: text("author").default("\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1"),
  publisher: text("publisher").default("\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC"),
  language: text("language").default("\u05E2\u05D1\u05E8\u05D9\u05EA"),
  languageGroupId: text("language_group_id"),
  // Groups same book in different languages
  pages: integer("pages"),
  isbn: text("isbn"),
  images: json("images").$type(),
  variants: json("variants").$type(),
  features: json("features").$type(),
  tags: json("tags").$type(),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false)
});
var insertProductSchema = createInsertSchema(products);
var downloads = pgTable("downloads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  titleEnglish: text("title_english"),
  description: text("description"),
  author: text("author"),
  category: text("category").notNull(),
  language: text("language").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"),
  downloadCount: integer("download_count").default(0),
  isActive: boolean("is_active").default(true)
});
var insertDownloadSchema = createInsertSchema(downloads);
var orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  email: text("email").notNull(),
  status: text("status").$type().default("pending"),
  // Order totals (in agorot - Israeli cents)
  subtotal: integer("subtotal").notNull(),
  // Before taxes and shipping
  vatAmount: integer("vat_amount").notNull(),
  // 17% VAT in Israel
  shippingAmount: integer("shipping_amount").notNull(),
  discountAmount: integer("discount_amount").default(0),
  // Subscriber discount, coupons, etc.
  totalAmount: integer("total_amount").notNull(),
  // Final amount charged
  // Shipping information
  shippingMethod: text("shipping_method").notNull(),
  // standard, express, pickup
  shippingAddress: json("shipping_address").$type(),
  billingAddress: json("billing_address").$type(),
  // Payment information
  paymentMethod: text("payment_method").notNull(),
  // stripe, paypal, cash_on_delivery
  stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
  stripeChargeId: text("stripe_charge_id").unique(),
  paymentStatus: text("payment_status").$type().default("pending"),
  // Order tracking
  trackingNumber: text("tracking_number"),
  estimatedDelivery: timestamp("estimated_delivery"),
  deliveredAt: timestamp("delivered_at"),
  // Customer notes
  customerNotes: text("customer_notes"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertOrderSchema = createInsertSchema(orders);
var orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id),
  productId: varchar("product_id").notNull(),
  variantId: text("variant_id").notNull(),
  // Product details at time of order (for historical accuracy)
  productName: text("product_name").notNull(),
  productNameEnglish: text("product_name_english"),
  variantDetails: json("variant_details").$type(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  // Price per item in agorot
  totalPrice: integer("total_price").notNull(),
  // quantity * unitPrice
  createdAt: timestamp("created_at").defaultNow()
});
var insertOrderItemSchema = createInsertSchema(orderItems);
var paymentTransactions = pgTable("payment_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id),
  // Payment provider details
  provider: text("provider").notNull(),
  // stripe, paypal, etc.
  providerTransactionId: text("provider_transaction_id").unique(),
  providerCustomerId: text("provider_customer_id"),
  // Transaction details
  amount: integer("amount").notNull(),
  // in agorot
  currency: text("currency").default("ILS"),
  status: text("status").$type().notNull(),
  // Failure/success details
  failureCode: text("failure_code"),
  failureMessage: text("failure_message"),
  // Refund information
  refundAmount: integer("refund_amount").default(0),
  refundReason: text("refund_reason"),
  refundedAt: timestamp("refunded_at"),
  // Metadata for debugging and tracking
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertPaymentTransactionSchema = createInsertSchema(paymentTransactions);
var shippingRates = pgTable("shipping_rates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameHebrew: text("name_hebrew").notNull(),
  description: text("description"),
  descriptionHebrew: text("description_hebrew"),
  // Geographic coverage
  country: text("country").notNull().default("IL"),
  // Israel by default
  regions: json("regions").$type(),
  // Specific regions/cities if applicable
  // Rate calculation
  baseRate: integer("base_rate").notNull(),
  // Base shipping cost in agorot
  freeShippingThreshold: integer("free_shipping_threshold"),
  // Minimum order value for free shipping
  // Delivery timeframe
  estimatedDaysMin: integer("estimated_days_min").default(1),
  estimatedDaysMax: integer("estimated_days_max").default(7),
  // Weight/size restrictions
  maxWeight: integer("max_weight"),
  // in grams
  maxDimensions: text("max_dimensions"),
  // e.g., "30x20x15cm"
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertShippingRateSchema = createInsertSchema(shippingRates);
var coupons = pgTable("coupons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  // Coupon code (e.g., BRESLEV10, SUMMER20)
  discountType: text("discount_type").$type().notNull(),
  // percentage or fixed amount
  discountValue: integer("discount_value").notNull(),
  // 10 for 10%, or 1000 for 10 ILS fixed discount (in agorot)
  minOrderValue: integer("min_order_value"),
  // Minimum order value to apply coupon (in agorot)
  maxUses: integer("max_uses"),
  // Maximum number of times this coupon can be used (null = unlimited)
  usedCount: integer("used_count").default(0),
  // Track how many times it's been used
  expiresAt: timestamp("expires_at"),
  // Expiration date (null = never expires)
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertCouponSchema = createInsertSchema(coupons);

// server/storage.ts
import { randomUUID } from "crypto";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
var _pool = null;
var _db = null;
if (!process.env.DATABASE_URL) {
  console.warn("\u26A0\uFE0F  DATABASE_URL not set - User authentication features will be disabled");
  console.warn("\u26A0\uFE0F  Product browsing and store features will work normally");
} else {
  _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  _db = drizzle({ client: _pool, schema: schema_exports });
}
var db = _db;

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  // In-memory Maps for fast data access (temporary storage until DB is ready)
  subscriptionPlans = /* @__PURE__ */ new Map();
  products = /* @__PURE__ */ new Map();
  shippingRates = /* @__PURE__ */ new Map();
  subscriptionHistory = /* @__PURE__ */ new Map();
  orders = /* @__PURE__ */ new Map();
  orderItems = /* @__PURE__ */ new Map();
  paymentTransactions = /* @__PURE__ */ new Map();
  constructor() {
    this.initializeDefaultData();
  }
  async initializeDefaultData() {
    try {
      const existingPlans = await this.getAllSubscriptionPlans();
      if (existingPlans.length === 0) {
        await this.initializeDefaultPlans();
        await this.initializeDefaultShippingRates();
        await this.initializeDefaultProducts();
      }
    } catch (error) {
      console.log("Database not ready yet, will initialize later");
    }
  }
  initializeDefaultPlans() {
    const horatKevaBasic = {
      id: "horat_keva_99",
      name: "HoRaat Keva Basic",
      nameHebrew: "\u05D4\u05D5\u05E8\u05D0\u05EA \u05E7\u05D1\u05E2 \u05D1\u05E1\u05D9\u05E1\u05D9",
      description: "Monthly subscription with access to all digital books and 5% discount on physical books",
      descriptionHebrew: "\u05DE\u05E0\u05D5\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9 \u05E2\u05DD \u05D2\u05D9\u05E9\u05D4 \u05DC\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD \u05D5-5% \u05D4\u05E0\u05D7\u05D4 \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9\u05DD \u05E4\u05D9\u05D6\u05D9\u05D9\u05DD",
      price: 9900,
      // 99 shekels in agorot
      currency: "ILS",
      intervalType: "month",
      intervalCount: 1,
      stripePriceId: null,
      features: [
        "Free access to all digital books",
        "5% discount on all physical orders",
        "Premium member status",
        "Early access to new releases"
      ],
      featuresHebrew: [
        "\u05D2\u05D9\u05E9\u05D4 \u05D7\u05D5\u05E4\u05E9\u05D9\u05EA \u05DC\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD",
        "5% \u05D4\u05E0\u05D7\u05D4 \u05E2\u05DC \u05DB\u05DC \u05D4\u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05D4\u05E4\u05D9\u05D6\u05D9\u05D5\u05EA",
        "\u05E1\u05D8\u05D8\u05D5\u05E1 \u05D7\u05D1\u05E8 \u05E4\u05E8\u05D9\u05DE\u05D9\u05D5\u05DD",
        "\u05D2\u05D9\u05E9\u05D4 \u05DE\u05D5\u05E7\u05D3\u05DE\u05EA \u05DC\u05E9\u05D7\u05E8\u05D5\u05E8\u05D9\u05DD \u05D7\u05D3\u05E9\u05D9\u05DD"
      ],
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    const horatKevaSilver = {
      id: "horat_keva_299",
      name: "HoRaat Keva Silver",
      nameHebrew: "\u05D4\u05D5\u05E8\u05D0\u05EA \u05E7\u05D1\u05E2 - \u05DE\u05E0\u05D5\u05D9 \u05DB\u05E1\u05E3",
      description: "Monthly subscription with 10% discount and preferential shipping rates for dedicated supporters",
      descriptionHebrew: "\u05DE\u05E0\u05D5\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9 \u05E2\u05DD 10% \u05D4\u05E0\u05D7\u05D4 \u05D5\u05EA\u05E2\u05E8\u05D9\u05E4\u05D9 \u05DE\u05E9\u05DC\u05D5\u05D7 \u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD \u05DC\u05EA\u05D5\u05DE\u05DB\u05D9\u05DD \u05DE\u05E1\u05D5\u05E8\u05D9\u05DD",
      price: 29900,
      // 299 shekels in agorot
      currency: "ILS",
      intervalType: "month",
      intervalCount: 1,
      stripePriceId: null,
      features: [
        "Free access to all digital books",
        "10% discount on all physical orders",
        "Preferential shipping rates in Israel",
        "Priority customer support",
        "Monthly spiritual newsletter",
        "Tax-deductible receipt for donations"
      ],
      featuresHebrew: [
        "\u05D2\u05D9\u05E9\u05D4 \u05DE\u05DC\u05D0\u05D4 \u05DC\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD",
        "10% \u05D4\u05E0\u05D7\u05D4 \u05E2\u05DC \u05DB\u05DC \u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05E4\u05D9\u05D6\u05D9\u05D9\u05DD",
        "\u05EA\u05E2\u05E8\u05D9\u05E4\u05D9 \u05DE\u05E9\u05DC\u05D5\u05D7 \u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD \u05D1\u05D9\u05E9\u05E8\u05D0\u05DC",
        "\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DE\u05D5\u05E2\u05D3\u05E3",
        "\u05E2\u05DC\u05D5\u05DF \u05E8\u05D5\u05D7\u05E0\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9",
        "\u05E7\u05D1\u05DC\u05D4 \u05DC\u05D4\u05E7\u05DC\u05D4 \u05D1\u05DE\u05E1 \u05E2\u05DC \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA"
      ],
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    const horatKevaGold = {
      id: "horat_keva_499",
      name: "HoRaat Keva Gold",
      nameHebrew: "\u05D4\u05D5\u05E8\u05D0\u05EA \u05E7\u05D1\u05E2 - \u05DE\u05E0\u05D5\u05D9 \u05D6\u05D4\u05D1",
      description: "Premium monthly subscription with free shipping once per month in Israel and 10% discount",
      descriptionHebrew: "\u05DE\u05E0\u05D5\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9 \u05DE\u05EA\u05E7\u05D3\u05DD \u05E2\u05DD \u05DE\u05E9\u05DC\u05D5\u05D7 \u05D7\u05D9\u05E0\u05DD \u05E4\u05E2\u05DD \u05D1\u05D7\u05D5\u05D3\u05E9 \u05D1\u05D9\u05E9\u05E8\u05D0\u05DC \u05D5-10% \u05D4\u05E0\u05D7\u05D4",
      price: 49900,
      // 499 shekels in agorot
      currency: "ILS",
      intervalType: "month",
      intervalCount: 1,
      stripePriceId: null,
      features: [
        "Free access to all digital books",
        "10% discount on all physical orders",
        "Free shipping in Israel once per month",
        "Gold supporter status",
        "Priority customer support",
        "Monthly spiritual newsletter",
        "Exclusive Breslov content",
        "Tax-deductible receipt for donations"
      ],
      featuresHebrew: [
        "\u05D2\u05D9\u05E9\u05D4 \u05DE\u05DC\u05D0\u05D4 \u05DC\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD",
        "10% \u05D4\u05E0\u05D7\u05D4 \u05E2\u05DC \u05DB\u05DC \u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05E4\u05D9\u05D6\u05D9\u05D9\u05DD",
        "\u05DE\u05E9\u05DC\u05D5\u05D7 \u05D7\u05D9\u05E0\u05DD \u05D1\u05D9\u05E9\u05E8\u05D0\u05DC \u05E4\u05E2\u05DD \u05D1\u05D7\u05D5\u05D3\u05E9",
        "\u05DE\u05E2\u05DE\u05D3 \u05EA\u05D5\u05DE\u05DA \u05D6\u05D4\u05D1",
        "\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DE\u05D5\u05E2\u05D3\u05E3",
        "\u05E2\u05DC\u05D5\u05DF \u05E8\u05D5\u05D7\u05E0\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9",
        "\u05EA\u05DB\u05E0\u05D9\u05DD \u05D1\u05DC\u05E2\u05D3\u05D9\u05D9\u05DD \u05DE\u05E2\u05D5\u05DC\u05DD \u05D1\u05E8\u05E1\u05DC\u05D1",
        "\u05E7\u05D1\u05DC\u05D4 \u05DC\u05D4\u05E7\u05DC\u05D4 \u05D1\u05DE\u05E1 \u05E2\u05DC \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA"
      ],
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    const horatKevaPlatinum = {
      id: "horat_keva_999",
      name: "HoRaat Keva Platinum",
      nameHebrew: "\u05D4\u05D5\u05E8\u05D0\u05EA \u05E7\u05D1\u05E2 - \u05DE\u05E0\u05D5\u05D9 \u05E4\u05DC\u05D8\u05D9\u05E0\u05D5\u05DD",
      description: "Ultimate monthly subscription with free shipping 3x per month, complimentary books and 20% discount",
      descriptionHebrew: "\u05DE\u05E0\u05D5\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9 \u05DE\u05E2\u05D5\u05DC\u05D4 \u05E2\u05DD \u05DE\u05E9\u05DC\u05D5\u05D7 \u05D7\u05D9\u05E0\u05DD 3 \u05E4\u05E2\u05DE\u05D9\u05DD \u05D1\u05D7\u05D5\u05D3\u05E9, \u05E1\u05E4\u05E8\u05D9\u05DD \u05D1\u05DE\u05EA\u05E0\u05D4 \u05D5-20% \u05D4\u05E0\u05D7\u05D4",
      price: 99900,
      // 999 shekels in agorot
      currency: "ILS",
      intervalType: "month",
      intervalCount: 1,
      stripePriceId: null,
      features: [
        "Free access to all digital books",
        "20% discount on all physical orders",
        "Free shipping in Israel up to 3 times per month",
        "Monthly complimentary book selection",
        "Platinum supporter status",
        "VIP customer support",
        "Monthly spiritual newsletter",
        "Exclusive Breslov content and teachings",
        "Personal blessing certificate",
        "Annual recognition in supporter list",
        "Tax-deductible receipt for donations"
      ],
      featuresHebrew: [
        "\u05D2\u05D9\u05E9\u05D4 \u05DE\u05DC\u05D0\u05D4 \u05DC\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD",
        "20% \u05D4\u05E0\u05D7\u05D4 \u05E2\u05DC \u05DB\u05DC \u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05E4\u05D9\u05D6\u05D9\u05D9\u05DD",
        "\u05DE\u05E9\u05DC\u05D5\u05D7 \u05D7\u05D9\u05E0\u05DD \u05D1\u05D9\u05E9\u05E8\u05D0\u05DC \u05E2\u05D3 3 \u05E4\u05E2\u05DE\u05D9\u05DD \u05D1\u05D7\u05D5\u05D3\u05E9",
        "\u05D1\u05D7\u05D9\u05E8\u05EA \u05E1\u05E4\u05E8 \u05D7\u05D5\u05D3\u05E9\u05D9\u05EA \u05D1\u05DE\u05EA\u05E0\u05D4",
        "\u05DE\u05E2\u05DE\u05D3 \u05EA\u05D5\u05DE\u05DA \u05E4\u05DC\u05D8\u05D9\u05E0\u05D5\u05DD",
        "\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA VIP",
        "\u05E2\u05DC\u05D5\u05DF \u05E8\u05D5\u05D7\u05E0\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9",
        "\u05EA\u05DB\u05E0\u05D9\u05DD \u05D5\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD \u05D1\u05DC\u05E2\u05D3\u05D9\u05D9\u05DD \u05DE\u05E2\u05D5\u05DC\u05DD \u05D1\u05E8\u05E1\u05DC\u05D1",
        "\u05EA\u05E2\u05D5\u05D3\u05EA \u05D1\u05E8\u05DB\u05D4 \u05D0\u05D9\u05E9\u05D9\u05EA",
        "\u05D4\u05DB\u05E8\u05D4 \u05E9\u05E0\u05EA\u05D9\u05EA \u05D1\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05EA\u05D5\u05DE\u05DB\u05D9\u05DD",
        "\u05E7\u05D1\u05DC\u05D4 \u05DC\u05D4\u05E7\u05DC\u05D4 \u05D1\u05DE\u05E1 \u05E2\u05DC \u05EA\u05E8\u05D5\u05DE\u05D5\u05EA"
      ],
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.subscriptionPlans.set(horatKevaBasic.id, horatKevaBasic);
    this.subscriptionPlans.set(horatKevaSilver.id, horatKevaSilver);
    this.subscriptionPlans.set(horatKevaGold.id, horatKevaGold);
    this.subscriptionPlans.set(horatKevaPlatinum.id, horatKevaPlatinum);
  }
  initializeDefaultShippingRates() {
    const israelStandard = {
      id: "israel_standard",
      name: "Standard Shipping (Israel)",
      nameHebrew: "\u05DE\u05E9\u05DC\u05D5\u05D7 \u05E8\u05D2\u05D9\u05DC (\u05D9\u05E9\u05E8\u05D0\u05DC)",
      description: "Standard delivery within Israel",
      descriptionHebrew: "\u05DE\u05E9\u05DC\u05D5\u05D7 \u05E8\u05D2\u05D9\u05DC \u05D1\u05EA\u05D5\u05DA \u05D9\u05E9\u05E8\u05D0\u05DC",
      country: "IL",
      regions: null,
      baseRate: 3e3,
      // 30 shekels in agorot
      freeShippingThreshold: 39900,
      // 399 shekels - matches the free shipping threshold from UI
      estimatedDaysMin: 3,
      estimatedDaysMax: 7,
      maxWeight: null,
      maxDimensions: null,
      isActive: true,
      sortOrder: 1,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    const israelExpress = {
      id: "israel_express",
      name: "Express Shipping (Israel)",
      nameHebrew: "\u05DE\u05E9\u05DC\u05D5\u05D7 \u05DE\u05D4\u05D9\u05E8 (\u05D9\u05E9\u05E8\u05D0\u05DC)",
      description: "Express delivery within Israel",
      descriptionHebrew: "\u05DE\u05E9\u05DC\u05D5\u05D7 \u05DE\u05D4\u05D9\u05E8 \u05D1\u05EA\u05D5\u05DA \u05D9\u05E9\u05E8\u05D0\u05DC",
      country: "IL",
      regions: null,
      baseRate: 4500,
      // 45 shekels in agorot
      freeShippingThreshold: 59900,
      // 599 shekels for express
      estimatedDaysMin: 1,
      estimatedDaysMax: 3,
      maxWeight: null,
      maxDimensions: null,
      isActive: true,
      sortOrder: 2,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.shippingRates.set(israelStandard.id, israelStandard);
    this.shippingRates.set(israelExpress.id, israelExpress);
  }
  initializeDefaultProducts() {
    const products3 = [
      {
        id: "likutei-moharan",
        name: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
        nameEnglish: "Likutei Moharan",
        nameFrench: null,
        nameSpanish: null,
        nameRussian: null,
        description: '\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05D2\u05D3\u05D5\u05DC, \u05D4\u05E7\u05D3\u05D5\u05E9 \u05D5\u05D4\u05E0\u05D5\u05E8\u05D0, \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1. \u05DE\u05DB\u05D9\u05DC \u05DE\u05D0\u05D5\u05EA "\u05EA\u05D5\u05E8\u05D5\u05EA" - \u05DE\u05D0\u05DE\u05E8\u05D9 \u05E7\u05D5\u05D3\u05E9 \u05E9\u05E0\u05D0\u05DE\u05E8\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D1\u05E9\u05D1\u05EA\u05D5\u05EA, \u05D1\u05D7\u05D2\u05D9\u05DD \u05D5\u05D1\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD \u05E9\u05D5\u05E0\u05D9\u05DD.',
        descriptionEnglish: 'The great, holy and awesome work of our teacher Rabbi Nachman of Breslov. Contains hundreds of "teachings" - holy discourses given by Rabbenu on Sabbaths, holidays and various occasions.',
        category: "\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
        subcategory: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
        author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
        publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
        language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
        pages: 960,
        isbn: "978-965-7023-01-1",
        images: [
          "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 1_1757275910545.jpg",
          "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 1_1757278339720.jpg"
        ],
        variants: [
          {
            id: "giant-skai-with-commentaries",
            format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05DE\u05E4\u05E8\u05E9\u05D9\u05DD",
            binding: "\u05E7\u05E9\u05D4",
            size: "\u05E2\u05E0\u05E7",
            dimensions: "32*22",
            volumes: 1,
            price: 9500,
            // Convert to agorot (95 * 100)
            inStock: true,
            stockQuantity: 15
          },
          {
            id: "giant-skai",
            format: "\u05E1\u05E7\u05D0\u05D9",
            binding: "\u05E7\u05E9\u05D4",
            size: "\u05E2\u05E0\u05E7",
            dimensions: "32*22",
            volumes: 1,
            price: 5500,
            // Convert to agorot (55 * 100)
            inStock: true,
            stockQuantity: 20
          },
          {
            id: "large-skai",
            format: "\u05E1\u05E7\u05D0\u05D9",
            binding: "\u05E7\u05E9\u05D4",
            size: "\u05D2\u05D3\u05D5\u05DC",
            dimensions: "24*17",
            volumes: 1,
            price: 3500,
            // Convert to agorot (35 * 100)
            inStock: true,
            stockQuantity: 40
          }
        ],
        features: [
          "\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05D2\u05D3\u05D5\u05DC \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
          "\u05DE\u05D0\u05D5\u05EA \u05EA\u05D5\u05E8\u05D5\u05EA \u05E7\u05D3\u05D5\u05E9\u05D5\u05EA",
          "\u05E0\u05D3\u05E4\u05E1 \u05E2\u05D5\u05D3 \u05D1\u05D7\u05D9\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5"
        ],
        tags: ['\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF', "\u05EA\u05D5\u05E8\u05D5\u05EA", "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF"],
        isActive: true,
        isFeatured: true
      },
      {
        id: "likutei-tefilot",
        name: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
        nameEnglish: "Likutei Tefilot",
        nameFrench: null,
        nameSpanish: null,
        nameRussian: null,
        description: '\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA\u05D9\u05D5 \u05D4\u05E0\u05E4\u05DC\u05D0\u05D5\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E9\u05D7\u05D5\u05D1\u05E8\u05D5 \u05E2\u05DC \u05D1\u05E1\u05D9\u05E1 \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF.',
        descriptionEnglish: "The wonderful prayers of Rabbi Nathan, composed based on Rabbi Nachman's teachings from Likutei Moharan.",
        category: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
        subcategory: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
        author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
        publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
        language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
        pages: 1152,
        isbn: "978-965-7023-12-7",
        images: [
          "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA 1_1757275910545.jpg"
        ],
        variants: [
          {
            id: "large-skai",
            format: "\u05E1\u05E7\u05D0\u05D9",
            binding: "\u05E7\u05E9\u05D4",
            size: "\u05D2\u05D3\u05D5\u05DC",
            dimensions: "24*17",
            volumes: 1,
            price: 4e3,
            // Convert to agorot (40 * 100)
            inStock: true,
            stockQuantity: 35
          },
          {
            id: "medium-skai",
            format: "\u05E1\u05E7\u05D0\u05D9",
            binding: "\u05E7\u05E9\u05D4",
            size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
            dimensions: "17*12",
            volumes: 1,
            price: 3500,
            // Convert to agorot (35 * 100)
            inStock: true,
            stockQuantity: 40
          }
        ],
        features: [
          "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DE\u05D9\u05D5\u05E1\u05D3\u05D5\u05EA \u05E2\u05DC \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
          "\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05E0\u05E4\u05DC\u05D0 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF"
        ],
        tags: ["\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF", "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA"],
        isActive: true,
        isFeatured: true
      }
    ];
    products3.forEach((productData) => {
      const product = productData;
      this.products.set(product.id, product);
    });
  }
  // Product methods
  async getProduct(id) {
    return this.products.get(id);
  }
  async getAllProducts() {
    return Array.from(this.products.values());
  }
  async getActiveProducts() {
    return Array.from(this.products.values()).filter((product) => product.isActive);
  }
  async getFeaturedProducts() {
    return Array.from(this.products.values()).filter((product) => product.isActive && product.isFeatured);
  }
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter(
      (product) => product.isActive && product.category === category
    );
  }
  async createProduct(insertProduct) {
    const product = {
      ...insertProduct,
      nameEnglish: insertProduct.nameEnglish || null,
      nameFrench: insertProduct.nameFrench || null,
      nameSpanish: insertProduct.nameSpanish || null,
      nameRussian: insertProduct.nameRussian || null,
      descriptionEnglish: insertProduct.descriptionEnglish || null,
      subcategory: insertProduct.subcategory || null,
      author: insertProduct.author || "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
      publisher: insertProduct.publisher || "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
      language: insertProduct.language || "\u05E2\u05D1\u05E8\u05D9\u05EA",
      pages: insertProduct.pages || null,
      isbn: insertProduct.isbn || null,
      images: Array.isArray(insertProduct.images) ? insertProduct.images : null,
      variants: Array.isArray(insertProduct.variants) ? insertProduct.variants : null,
      features: Array.isArray(insertProduct.features) ? insertProduct.features : null,
      tags: Array.isArray(insertProduct.tags) ? insertProduct.tags : null,
      isActive: insertProduct.isActive !== false,
      isFeatured: insertProduct.isFeatured || false
    };
    this.products.set(product.id, product);
    return product;
  }
  async updateProduct(id, updates) {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  async getProductVariant(productId, variantId) {
    const product = await this.getProduct(productId);
    if (!product || !product.variants) {
      return null;
    }
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) {
      return null;
    }
    return { product, variant };
  }
  // User methods - Database implementation for Replit Auth
  async getUser(id) {
    if (!db) {
      console.warn("Database not available - user features disabled");
      return void 0;
    }
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0] || void 0;
    } catch (error) {
      console.error("Error fetching user:", error);
      return void 0;
    }
  }
  async getUserByUsername(username) {
    if (!db) {
      console.warn("Database not available - user features disabled");
      return void 0;
    }
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0] || void 0;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      return void 0;
    }
  }
  async getUserByEmail(email) {
    if (!db) {
      console.warn("Database not available - user features disabled");
      return void 0;
    }
    try {
      const result = await db.select().from(users).where(eq(users.email, email));
      return result[0] || void 0;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return void 0;
    }
  }
  async createUser(insertUser) {
    if (!db) {
      throw new Error("Database not available - user features disabled");
    }
    try {
      const result = await db.insert(users).values({
        ...insertUser,
        email: insertUser.email || null,
        subscriptionPlanId: "horat_keva_99",
        isSubscriber: false
      }).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async updateUser(id, updates) {
    if (!db) {
      throw new Error("Database not available - user features disabled");
    }
    try {
      const result = await db.update(users).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
      if (result.length === 0) {
        throw new Error(`User with id ${id} not found`);
      }
      return result[0];
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  // REQUIRED for Replit Auth - upsertUser method
  async upsertUser(userData) {
    if (!db) {
      throw new Error("Database not available - user features disabled");
    }
    try {
      const result = await db.insert(users).values(userData).onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: /* @__PURE__ */ new Date()
        }
      }).returning();
      return result[0];
    } catch (error) {
      console.error("Error upserting user:", error);
      throw error;
    }
  }
  // Subscription user methods
  async updateUserStripeInfo(id, stripeCustomerId, stripeSubscriptionId) {
    return this.updateUser(id, {
      stripeCustomerId,
      stripeSubscriptionId: stripeSubscriptionId || null
    });
  }
  async updateUserSubscriptionStatus(id, status, startDate, endDate) {
    const updates = {
      subscriptionStatus: status,
      isSubscriber: status === "active" || status === "trialing"
    };
    if (startDate) updates.subscriptionStartDate = startDate;
    if (endDate) updates.subscriptionEndDate = endDate;
    return this.updateUser(id, updates);
  }
  async setUserAsSubscriber(id, isSubscriber) {
    return this.updateUser(id, { isSubscriber });
  }
  // Subscription plans methods
  async getSubscriptionPlan(id) {
    return this.subscriptionPlans.get(id);
  }
  async getAllSubscriptionPlans() {
    return Array.from(this.subscriptionPlans.values()).filter((plan) => plan.isActive);
  }
  async createSubscriptionPlan(plan) {
    const id = plan.id || randomUUID();
    const subscriptionPlan = {
      ...plan,
      id,
      currency: plan.currency || "ILS",
      // Handle undefined -> default currency
      intervalType: plan.intervalType || "month",
      // Handle undefined -> default interval
      intervalCount: plan.intervalCount ?? 1,
      // Handle undefined -> default count of 1
      stripePriceId: plan.stripePriceId || null,
      // Handle undefined -> null conversion
      features: Array.isArray(plan.features) ? plan.features : null,
      featuresHebrew: Array.isArray(plan.featuresHebrew) ? plan.featuresHebrew : null,
      isActive: plan.isActive !== false,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.subscriptionPlans.set(id, subscriptionPlan);
    return subscriptionPlan;
  }
  // Subscription history methods
  async createSubscriptionHistory(history) {
    const id = randomUUID();
    const subscriptionHistoryRecord = {
      ...history,
      id,
      eventType: history.eventType,
      // Type assertion for enum
      stripeEventId: history.stripeEventId || null,
      // Handle undefined -> null conversion
      eventData: history.eventData || null,
      // Handle undefined -> null conversion
      createdAt: /* @__PURE__ */ new Date()
    };
    this.subscriptionHistory.set(id, subscriptionHistoryRecord);
    return subscriptionHistoryRecord;
  }
  async getSubscriptionHistoryByUser(userId) {
    return Array.from(this.subscriptionHistory.values()).filter((history) => history.userId === userId).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  // Order methods
  async createOrder(insertOrder) {
    const id = randomUUID();
    const order = {
      ...insertOrder,
      id,
      userId: insertOrder.userId || null,
      status: insertOrder.status || "pending",
      discountAmount: insertOrder.discountAmount || 0,
      paymentStatus: insertOrder.paymentStatus || "pending",
      stripePaymentIntentId: insertOrder.stripePaymentIntentId || null,
      stripeChargeId: insertOrder.stripeChargeId || null,
      shippingAddress: insertOrder.shippingAddress,
      billingAddress: insertOrder.billingAddress,
      trackingNumber: insertOrder.trackingNumber || null,
      estimatedDelivery: insertOrder.estimatedDelivery || null,
      deliveredAt: insertOrder.deliveredAt || null,
      customerNotes: insertOrder.customerNotes || null,
      adminNotes: insertOrder.adminNotes || null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.orders.set(id, order);
    return order;
  }
  async getOrder(id) {
    return this.orders.get(id);
  }
  async getOrdersByUser(userId) {
    return Array.from(this.orders.values()).filter((order) => order.userId === userId).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  async updateOrder(id, updates) {
    const order = this.orders.get(id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    const updatedOrder = { ...order, ...updates, updatedAt: /* @__PURE__ */ new Date() };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  async updateOrderStatus(id, status) {
    return this.updateOrder(id, { status });
  }
  // Order items methods
  async createOrderItem(insertOrderItem) {
    const id = randomUUID();
    const orderItem = {
      ...insertOrderItem,
      id,
      productNameEnglish: insertOrderItem.productNameEnglish || null,
      variantDetails: insertOrderItem.variantDetails,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
  async getOrderItems(orderId) {
    return Array.from(this.orderItems.values()).filter((item) => item.orderId === orderId).sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }
  // Payment transaction methods
  async createPaymentTransaction(insertTransaction) {
    const id = randomUUID();
    const transaction = {
      ...insertTransaction,
      id,
      providerTransactionId: insertTransaction.providerTransactionId || null,
      providerCustomerId: insertTransaction.providerCustomerId || null,
      currency: insertTransaction.currency || "ILS",
      status: insertTransaction.status,
      failureCode: insertTransaction.failureCode || null,
      failureMessage: insertTransaction.failureMessage || null,
      refundAmount: insertTransaction.refundAmount || 0,
      refundReason: insertTransaction.refundReason || null,
      refundedAt: insertTransaction.refundedAt || null,
      metadata: insertTransaction.metadata,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.paymentTransactions.set(id, transaction);
    return transaction;
  }
  async getPaymentTransactionsByOrder(orderId) {
    return Array.from(this.paymentTransactions.values()).filter((transaction) => transaction.orderId === orderId).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  async updatePaymentTransaction(id, updates) {
    const transaction = this.paymentTransactions.get(id);
    if (!transaction) {
      throw new Error(`Payment transaction with id ${id} not found`);
    }
    const updatedTransaction = { ...transaction, ...updates, updatedAt: /* @__PURE__ */ new Date() };
    this.paymentTransactions.set(id, updatedTransaction);
    return updatedTransaction;
  }
  // Shipping rates methods
  async getShippingRates(country = "IL") {
    return Array.from(this.shippingRates.values()).filter((rate) => rate.isActive && rate.country === country).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }
  async createShippingRate(insertRate) {
    const id = randomUUID();
    const rate = {
      ...insertRate,
      id,
      description: insertRate.description || null,
      descriptionHebrew: insertRate.descriptionHebrew || null,
      country: insertRate.country || "IL",
      regions: Array.isArray(insertRate.regions) ? insertRate.regions : null,
      freeShippingThreshold: insertRate.freeShippingThreshold || null,
      estimatedDaysMin: insertRate.estimatedDaysMin || 1,
      estimatedDaysMax: insertRate.estimatedDaysMax || 7,
      maxWeight: insertRate.maxWeight || null,
      maxDimensions: insertRate.maxDimensions || null,
      isActive: insertRate.isActive !== false,
      sortOrder: insertRate.sortOrder || 0,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.shippingRates.set(id, rate);
    return rate;
  }
  async calculateShipping(subtotal, country = "IL", weight) {
    const rates = await this.getShippingRates(country);
    for (const rate of rates) {
      if (rate.freeShippingThreshold && subtotal >= rate.freeShippingThreshold) {
        return { rate, cost: 0 };
      }
      if (weight && rate.maxWeight && weight > rate.maxWeight) {
        continue;
      }
      return { rate, cost: rate.baseRate };
    }
    return null;
  }
  // ====================
  // Coupon methods
  // ====================
  async getCouponByCode(code) {
    const result = await db.select().from(coupons).where(eq(coupons.code, code.toUpperCase())).limit(1);
    return result[0];
  }
  async getAllCoupons() {
    return await db.select().from(coupons);
  }
  async createCoupon(coupon) {
    const result = await db.insert(coupons).values({
      ...coupon,
      code: coupon.code.toUpperCase()
    }).returning();
    return result[0];
  }
  async incrementCouponUsage(id) {
    const coupon = await db.select().from(coupons).where(eq(coupons.id, id)).limit(1);
    if (!coupon[0]) {
      throw new Error("Coupon not found");
    }
    const result = await db.update(coupons).set({
      usedCount: (coupon[0].usedCount || 0) + 1,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(coupons.id, id)).returning();
    return result[0];
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import express from "express";
import path from "path";
import Stripe from "stripe";

// server/emailService.ts
import { MailService } from "@sendgrid/mail";
if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set. Email functionality will be disabled.");
}
var mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}
async function sendEmail(params) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SendGrid API key not configured. Email would be sent to:", params.to);
    return false;
  }
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      ...params.text && { text: params.text },
      ...params.html && { html: params.html },
      ...params.templateId && { templateId: params.templateId },
      ...params.dynamicTemplateData && { dynamicTemplateData: params.dynamicTemplateData }
    });
    return true;
  } catch (error) {
    console.error("SendGrid email error:", error);
    return false;
  }
}
function generateOrderConfirmationHTML(orderData) {
  const formatPrice = (amount) => `\u20AA${(amount / 100).toFixed(2)}`;
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D6\u05DE\u05E0\u05D4 - \u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .header-subtitle { font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .order-info { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .order-number { font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { padding: 12px; text-align: right; border-bottom: 1px solid #e2e8f0; }
        .items-table th { background-color: #f1f5f9; font-weight: bold; }
        .summary-table { width: 100%; margin-top: 20px; }
        .summary-table td { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .total-row { font-weight: bold; font-size: 16px; color: #1e40af; }
        .subscriber-badge { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin: 10px 0; }
        .keren-badge { background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin: 10px 0; }
        .spiritual-mission { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .address-section { background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .footer { background-color: #1f2937; color: white; padding: 30px; text-align: center; }
        .footer a { color: #60a5fa; text-decoration: none; }
        .policies { background-color: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">\u{1F525} \u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9</div>
            <div class="header-subtitle">\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D1\u05E8 \u05D0\u05D5\u05D3\u05E1\u05E8</div>
            <div class="header-subtitle">\u05EA\u05D5\u05E7\u05E3 \u05E2\u05D3 \u05D1\u05D9\u05D0\u05EA \u05D4\u05DE\u05E9\u05D9\u05D7</div>
        </div>
        
        <div class="content">
            <div class="order-info">
                <div class="order-number">\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D6\u05DE\u05E0\u05D4 #${orderData.orderId}</div>
                <p>\u05E9\u05DC\u05D5\u05DD ${orderData.customerName},</p>
                <p>\u05EA\u05D5\u05D3\u05D4 \u05DC\u05DA \u05E2\u05DC \u05D4\u05D6\u05DE\u05E0\u05EA\u05DA \u05DE\u05D7\u05E0\u05D5\u05EA "\u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9"! \u05D6\u05D5 \u05D4\u05D6\u05DE\u05E0\u05EA\u05DA \u05DE\u05E1' <strong>${orderData.orderId}</strong></p>
                ${orderData.isSubscriber ? '<div class="subscriber-badge">\u2728 \u05DE\u05E0\u05D5\u05D9 \u05D4\u05D5\u05E8\u05D0\u05EA \u05E7\u05D1\u05E2 \u05E4\u05E2\u05D9\u05DC - \u05E7\u05D9\u05D1\u05DC\u05EA 5% \u05D4\u05E0\u05D7\u05D4!</div>' : ""}
                <div class="keren-badge">\u{1F48E} \u05DE\u05D7\u05D9\u05E8 \u05D4\u05E7\u05E8\u05DF - \u05EA\u05DE\u05D9\u05DB\u05D4 \u05D9\u05E9\u05D9\u05E8\u05D4 \u05D1\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA \u05E8\u05D5\u05D7\u05E0\u05D9\u05EA</div>
            </div>

            <div class="spiritual-mission">
                <h3>\u{1F64F} \u05D4\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D4\u05E8\u05D5\u05D7\u05E0\u05D9\u05EA \u05E9\u05DC\u05E0\u05D5</h3>
                <p>\u05DB\u05DC \u05E8\u05DB\u05D9\u05E9\u05D4 \u05EA\u05D5\u05DE\u05DB\u05EA \u05D1\u05D4\u05E4\u05E6\u05EA \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D5\u05D1\u05D7\u05D9\u05D6\u05D5\u05E7 \u05D4\u05E7\u05E9\u05E8 \u05DC\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9. \u05D4\u05DB\u05E1\u05E3 \u05E9\u05DC\u05DA \u05D4\u05D5\u05DC\u05DA \u05D9\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D4\u05E8\u05D5\u05D7\u05E0\u05D9\u05EA \u05E9\u05DC \u05D4\u05E4\u05E6\u05EA \u05D4\u05D0\u05DE\u05EA \u05D5\u05D4\u05D0\u05D5\u05E8 \u05D1\u05E2\u05D5\u05DC\u05DD.</p>
                <p><strong>\u05E0 \u05E0\u05D7 \u05E0\u05D7\u05DE \u05E0\u05D7\u05DE\u05DF \u05DE\u05D0\u05D5\u05DE\u05DF!</strong></p>
            </div>

            <h3>\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD \u05E9\u05D4\u05D5\u05D6\u05DE\u05E0\u05D5:</h3>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>\u05E4\u05E8\u05D9\u05D8</th>
                        <th>\u05DB\u05DE\u05D5\u05EA</th>
                        <th>\u05DE\u05D7\u05D9\u05E8 \u05D9\u05D7\u05D9\u05D3\u05D4</th>
                        <th>\u05E1\u05D4"\u05DB</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items.map((item) => `
                    <tr>
                        <td>
                            <strong>${item.name}</strong>
                            ${item.nameEnglish ? `<br><em>${item.nameEnglish}</em>` : ""}
                            ${item.variant ? `<br><small>\u05D2\u05E8\u05E1\u05D4: ${item.variant.format || ""} ${item.variant.size || ""}</small>` : ""}
                        </td>
                        <td>${item.quantity}</td>
                        <td>${formatPrice(item.price)}</td>
                        <td><strong>${formatPrice(item.price * item.quantity)}</strong></td>
                    </tr>
                    `).join("")}
                </tbody>
            </table>

            <table class="summary-table">
                <tr>
                    <td>\u05E1\u05DB\u05D5\u05DD \u05D1\u05D9\u05E0\u05D9\u05D9\u05DD:</td>
                    <td style="text-align: left;"><strong>${formatPrice(orderData.orderSummary.subtotal)}</strong></td>
                </tr>
                ${orderData.orderSummary.discount > 0 ? `
                <tr style="color: #10b981;">
                    <td>\u05D4\u05E0\u05D7\u05EA \u05DE\u05E0\u05D5\u05D9 (5%):</td>
                    <td style="text-align: left;"><strong>-${formatPrice(orderData.orderSummary.discount)}</strong></td>
                </tr>
                ` : ""}
                <tr>
                    <td>\u05DE\u05E2"\u05DD (17%):</td>
                    <td style="text-align: left;"><strong>${formatPrice(orderData.orderSummary.vatAmount)}</strong></td>
                </tr>
                <tr>
                    <td>\u05DE\u05E9\u05DC\u05D5\u05D7:</td>
                    <td style="text-align: left;"><strong>${orderData.orderSummary.shippingAmount > 0 ? formatPrice(orderData.orderSummary.shippingAmount) : "\u05D7\u05D9\u05E0\u05DD! \u{1F389}"}</strong></td>
                </tr>
                <tr class="total-row">
                    <td><strong>\u05E1\u05D4"\u05DB \u05DC\u05EA\u05E9\u05DC\u05D5\u05DD:</strong></td>
                    <td style="text-align: left;"><strong>${formatPrice(orderData.orderSummary.totalAmount)}</strong></td>
                </tr>
            </table>

            <div class="address-section">
                <h3>\u05DB\u05EA\u05D5\u05D1\u05EA \u05DC\u05DE\u05E9\u05DC\u05D5\u05D7:</h3>
                <p>
                    ${orderData.shippingAddress.fullName}<br>
                    ${orderData.shippingAddress.addressLine1}<br>
                    ${orderData.shippingAddress.addressLine2 ? orderData.shippingAddress.addressLine2 + "<br>" : ""}
                    ${orderData.shippingAddress.city}, ${orderData.shippingAddress.postalCode}<br>
                    ${orderData.shippingAddress.country}<br>
                    \u05D8\u05DC\u05E4\u05D5\u05DF: ${orderData.shippingAddress.phone}
                </p>
            </div>

            <div class="policies">
                <h3>\u{1F69A} \u05DE\u05D3\u05D9\u05E0\u05D9\u05D5\u05EA \u05DE\u05E9\u05DC\u05D5\u05D7 \u05D5\u05DE\u05D3\u05D9\u05E0\u05D9\u05D5\u05EA \u05D4\u05D7\u05D6\u05E8\u05D5\u05EA</h3>
                <ul>
                    <li><strong>\u05D6\u05DE\u05DF \u05DE\u05E9\u05DC\u05D5\u05D7:</strong> 3-7 \u05D9\u05DE\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD</li>
                    <li><strong>\u05DE\u05E9\u05DC\u05D5\u05D7 \u05D7\u05D9\u05E0\u05DD:</strong> \u05E2\u05DC \u05D4\u05D6\u05DE\u05E0\u05D5\u05EA \u05DE\u05E2\u05DC \u20AA399</li>
                    <li><strong>\u05D4\u05D7\u05D6\u05E8\u05D5\u05EA:</strong> \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05D7\u05D6\u05D9\u05E8 \u05EA\u05D5\u05DA 14 \u05D9\u05D5\u05DD \u05DE\u05E7\u05D1\u05DC\u05EA \u05D4\u05DE\u05D5\u05E6\u05E8</li>
                    <li><strong>\u05DE\u05D5\u05E6\u05E8 \u05E4\u05D2\u05D5\u05DD:</strong> \u05D4\u05D7\u05DC\u05E4\u05D4 \u05DE\u05D9\u05D9\u05D3\u05D9\u05EA \u05DC\u05DC\u05D0 \u05E2\u05DC\u05D5\u05EA</li>
                    <li><strong>\u05DE\u05E2\u05E7\u05D1 \u05D4\u05D6\u05DE\u05E0\u05D4:</strong> \u05EA\u05E7\u05D1\u05DC SMS \u05E2\u05DD \u05E7\u05D9\u05E9\u05D5\u05E8 \u05DE\u05E2\u05E7\u05D1 \u05DC\u05D0\u05D7\u05E8 \u05D4\u05DE\u05E9\u05DC\u05D5\u05D7</li>
                </ul>
                <p><strong>\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA:</strong> support@haesh-sheli.co.il | 02-123-4567</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>\u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9 - \u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D1\u05E8 \u05D0\u05D5\u05D3\u05E1\u05E8</strong></p>
            <p>\u05DE\u05E4\u05D9\u05E6\u05D9\u05DD \u05D0\u05EA \u05D0\u05D5\u05E8 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D1\u05DB\u05DC \u05D4\u05E2\u05D5\u05DC\u05DD</p>
            <p>
                <a href="https://haesh-sheli.co.il">\u05D4\u05D0\u05EA\u05E8 \u05E9\u05DC\u05E0\u05D5</a> | 
                <a href="mailto:support@haesh-sheli.co.il">\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8</a> | 
                <a href="https://haesh-sheli.co.il/returns">\u05DE\u05D3\u05D9\u05E0\u05D9\u05D5\u05EA \u05D4\u05D7\u05D6\u05E8\u05D5\u05EA</a>
            </p>
            <p style="font-size: 12px; margin-top: 20px; opacity: 0.8;">
                \u05EA\u05D5\u05E7\u05E3 \u05E2\u05D3 \u05D1\u05D9\u05D0\u05EA \u05D4\u05DE\u05E9\u05D9\u05D7 \u2022 \u05E0 \u05E0\u05D7 \u05E0\u05D7\u05DE \u05E0\u05D7\u05DE\u05DF \u05DE\u05D0\u05D5\u05DE\u05DF
            </p>
        </div>
    </div>
</body>
</html>
  `;
}
async function sendOrderConfirmation(orderData) {
  const html = generateOrderConfirmationHTML(orderData);
  const subject = `\u05D0\u05D9\u05E9\u05D5\u05E8 \u05D4\u05D6\u05DE\u05E0\u05D4 #${orderData.orderId} - \u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9 \u{1F525}`;
  const textVersion = `
\u05E9\u05DC\u05D5\u05DD ${orderData.customerName},

\u05EA\u05D5\u05D3\u05D4 \u05DC\u05DA \u05E2\u05DC \u05D4\u05D6\u05DE\u05E0\u05EA\u05DA \u05DE\u05D7\u05E0\u05D5\u05EA "\u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9"!
\u05DE\u05E1\u05E4\u05E8 \u05D4\u05D6\u05DE\u05E0\u05D4: ${orderData.orderId}

\u05E1\u05DB\u05D5\u05DD \u05DB\u05D5\u05DC\u05DC: \u20AA${(orderData.orderSummary.totalAmount / 100).toFixed(2)}

\u05E4\u05E8\u05D8\u05D9 \u05D4\u05DE\u05E9\u05DC\u05D5\u05D7 \u05D9\u05D9\u05E9\u05DC\u05D7\u05D5 \u05D0\u05DC\u05D9\u05DA \u05D1\u05D4\u05D5\u05D3\u05E2\u05EA SMS \u05E0\u05E4\u05E8\u05D3\u05EA.

\u05D1\u05D1\u05E8\u05DB\u05D4,
\u05E6\u05D5\u05D5\u05EA \u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9 - \u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D1\u05E8 \u05D0\u05D5\u05D3\u05E1\u05E8
\u05E0 \u05E0\u05D7 \u05E0\u05D7\u05DE \u05E0\u05D7\u05DE\u05DF \u05DE\u05D0\u05D5\u05DE\u05DF!
  `;
  return await sendEmail({
    to: orderData.email,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@haesh-sheli.co.il",
    subject,
    text: textVersion,
    html
  });
}

// server/geminiService.ts
import { GoogleGenAI } from "@google/genai";

// client/src/data/realProducts.ts
var realBreslovProducts = {
  "likutei-moharan": {
    id: "likutei-moharan",
    name: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
    nameEnglish: "Likutei Moharan",
    nameFrench: "Likout\xE9 Moharan",
    nameSpanish: "Likutei Moharan",
    nameRussian: "\u041B\u0438\u043A\u0443\u0442\u0435\u0439 \u041C\u043E\u0430\u0440\u0430\u043D",
    description: '\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05D2\u05D3\u05D5\u05DC, \u05D4\u05E7\u05D3\u05D5\u05E9 \u05D5\u05D4\u05E0\u05D5\u05E8\u05D0, \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1. \u05DE\u05DB\u05D9\u05DC \u05DE\u05D0\u05D5\u05EA "\u05EA\u05D5\u05E8\u05D5\u05EA" - \u05DE\u05D0\u05DE\u05E8\u05D9 \u05E7\u05D5\u05D3\u05E9 \u05E9\u05E0\u05D0\u05DE\u05E8\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D1\u05E9\u05D1\u05EA\u05D5\u05EA, \u05D1\u05D7\u05D2\u05D9\u05DD \u05D5\u05D1\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD \u05E9\u05D5\u05E0\u05D9\u05DD. \u05D7\u05DC\u05E7\u05DD \u05E0\u05DB\u05EA\u05D1 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E2\u05E6\u05DE\u05D5, \u05D5\u05D7\u05DC\u05E7\u05DD \u05D4\u05D2\u05D3\u05D5\u05DC \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E1\u05D5\u05E4\u05E8\u05D5 \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D5 \u05D4\u05E0\u05D0\u05DE\u05DF \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF.',
    descriptionEnglish: 'The great, holy and awesome work of our teacher Rabbi Nachman of Breslov. Contains hundreds of "teachings" - holy discourses given by Rabbenu on Sabbaths, holidays and various occasions.',
    category: "\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
    subcategory: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "likutei-moharan-group",
    // Groups all language versions together
    pages: 960,
    isbn: "978-965-7023-01-1",
    images: [
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 1_1757275910545.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 1_1757278339720.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 1_1757281125909.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 2_1757280401419.jpg"
    ],
    variants: [
      {
        id: "giant-skai-with-commentaries",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05DE\u05E4\u05E8\u05E9\u05D9\u05DD",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05E2\u05E0\u05E7",
        dimensions: "32*22",
        volumes: 1,
        price: 95,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: "giant-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05E2\u05E0\u05E7",
        dimensions: "32*22",
        volumes: 1,
        price: 55,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "large-skai-with-commentaries",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05DE\u05E4\u05E8\u05E9\u05D9\u05DD",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 55,
        inStock: true,
        stockQuantity: 12
      },
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 50
      },
      {
        id: "medium-leather-pearl",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8 \u05DC\u05D1\u05DF/\u05E4\u05E0\u05D9\u05E0\u05D4",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 45,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 25,
        inStock: true,
        stockQuantity: 60
      },
      {
        id: "small-nylon-3vol",
        format: "\u05E8\u05DA \u05E0\u05D9\u05DC\u05D5\u05DF",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 3,
        price: 40,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: "english-large-3vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05D0\u05E0\u05D2\u05DC\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 3,
        price: 165,
        inStock: true,
        stockQuantity: 8
      },
      {
        id: "english-giant",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05D0\u05E0\u05D2\u05DC\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05E2\u05E0\u05E7",
        dimensions: "32*22",
        volumes: 1,
        price: 160,
        inStock: true,
        stockQuantity: 6
      }
    ],
    features: [
      "\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05D2\u05D3\u05D5\u05DC \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
      "\u05DE\u05D0\u05D5\u05EA \u05EA\u05D5\u05E8\u05D5\u05EA \u05E7\u05D3\u05D5\u05E9\u05D5\u05EA",
      "\u05E0\u05D3\u05E4\u05E1 \u05E2\u05D5\u05D3 \u05D1\u05D7\u05D9\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05D1\u05E1\u05D9\u05E1 \u05DC\u05DB\u05DC \u05D7\u05E1\u05D9\u05D3\u05D5\u05EA \u05D1\u05E8\u05E1\u05DC\u05D1",
      "\u05D6\u05DE\u05D9\u05DF \u05D1\u05DE\u05D2\u05D5\u05D5\u05DF \u05D2\u05D3\u05DC\u05D9\u05DD \u05D5\u05DB\u05E8\u05D9\u05DB\u05D5\u05EA"
    ],
    tags: ['\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF', "\u05EA\u05D5\u05E8\u05D5\u05EA", "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF", "\u05D9\u05E1\u05D5\u05D3", "\u05E7\u05D3\u05D5\u05E9\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "kitzur-likutei-moharan": {
    id: "kitzur-likutei-moharan",
    name: '\u05E7\u05D9\u05E6\u05D5\u05E8 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
    nameEnglish: "Kitzur Likutei Moharan",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: `\u05E4\u05E1\u05E7\u05D0\u05D5\u05EA \u05DE\u05E7\u05D5\u05E6\u05E8\u05D5\u05EA \u05DE\u05EA\u05D5\u05E8\u05D5\u05EA\u05D9\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF, \u05D4\u05E1\u05E4\u05E8 \u05E0\u05E2\u05E8\u05DA \u05D1\u05E4\u05E7\u05D5\u05D3\u05EA\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF. \u05E2\u05DC \u05D4\u05E1\u05E4\u05E8 \u05DB\u05D5\u05EA\u05D1 \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05E7\u05E8\u05D3\u05D5\u05E0\u05E8 \u05D1\u05D0\u05D7\u05D3 \u05DE\u05DE\u05DB\u05EA\u05D1\u05D9\u05D5: "\u05D5\u05D4\u05E1\u05E4\u05E8 \u05D4\u05D6\u05D4 \u05D4\u05D9\u05D4 \u05D9\u05E7\u05E8 \u05DE\u05D0\u05D5\u05D3 \u05D1\u05E2\u05D9\u05E0\u05D9 \u05DE\u05D5\u05E8\u05E0\u05D5 \u05D4\u05E8\u05D1 \u05D4\u05E6\u05D3\u05D9\u05E7 \u05E8' \u05E0\u05EA\u05DF \u05D6\u05E6"\u05DC \u05D5\u05E4\u05E7\u05D3 \u05D5\u05E6\u05D9\u05D5\u05D5\u05D4 \u05DC\u05DB\u05DC \u05D0\u05E0\u05E9\u05D9\u05D5 \u05DC\u05E2\u05E1\u05D5\u05E7 \u05D5\u05DC\u05DC\u05DE\u05D5\u05D3 \u05D1\u05D5 \u05D1\u05DB\u05DC \u05D9\u05D5\u05DD"`,
    descriptionEnglish: "Shortened passages from the teachings of Rabbenu Rabbi Nachman, compiled under his direction by his student Rabbi Nathan.",
    category: "\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
    subcategory: "\u05E7\u05D9\u05E6\u05D5\u05E8\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "kitzur-likutei-moharan-group",
    pages: 416,
    isbn: "978-965-7023-02-8",
    images: [
      "/attached_assets/\u05E7\u05D9\u05E6\u05D5\u05E8 \u05DC\u05D9\u05E7\u05D5\u05DE 1_1757275910546.jpg",
      "/attached_assets/\u05E7\u05D9\u05E6\u05D5\u05E8 \u05DC\u05D9\u05E7\u05D5\u05DE 1_1757278339721.jpg",
      "/attached_assets/\u05E7\u05D9\u05E6\u05D5\u05E8 \u05DC\u05D9\u05E7\u05D5\u05DE 1_1757281125911.jpg",
      "/attached_assets/\u05E7\u05D9\u05E6\u05D5\u05E8 \u05DC\u05D9\u05E7\u05D5\u05DE_1757281085509.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 40,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 30
      }
    ],
    features: [
      "\u05E4\u05E1\u05E7\u05D0\u05D5\u05EA \u05DE\u05E7\u05D5\u05E6\u05E8\u05D5\u05EA",
      "\u05E0\u05E2\u05E8\u05DA \u05D1\u05E4\u05E7\u05D5\u05D3\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05D4\u05EA\u05D5\u05E8\u05D5\u05EA \u05D4\u05E7\u05D3\u05D5\u05E9\u05D5\u05EA",
      "\u05DE\u05EA\u05D0\u05D9\u05DD \u05DC\u05DC\u05D9\u05DE\u05D5\u05D3 \u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9",
      "\u05D9\u05E7\u05E8 \u05D1\u05E2\u05D9\u05E0\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF"
    ],
    tags: ["\u05E7\u05D9\u05E6\u05D5\u05E8", '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF', "\u05DC\u05D9\u05DE\u05D5\u05D3 \u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF"],
    isActive: true,
    isFeatured: true
  },
  "likutei-tefilot": {
    id: "likutei-tefilot",
    name: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    nameEnglish: "Likutei Tefilot",
    nameFrench: "Likout\xE9 T\xE9filot",
    nameSpanish: "Likutei Tefilot",
    nameRussian: "\u041B\u0438\u043A\u0443\u0442\u0435\u0439 \u0422\u0444\u0438\u043B\u043E\u0442",
    description: '\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA\u05D9\u05D5 \u05D4\u05E0\u05E4\u05DC\u05D0\u05D5\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E9\u05D7\u05D5\u05D1\u05E8\u05D5 \u05E2\u05DC \u05D1\u05E1\u05D9\u05E1 \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF. \u05E2\u05DC\u05D9\u05D4\u05DD \u05D0\u05DE\u05E8 \u05E8\u05D1\u05D9\u05E0\u05D5: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D4\u05E0\u05E2\u05E9\u05D5\u05EA \u05DE\u05D4\u05EA\u05D5\u05E8\u05D5\u05EA - \u05DE\u05E2\u05DC\u05D5\u05EA \u05E9\u05E2\u05E9\u05D5\u05E2\u05D9\u05DD \u05DC\u05DE\u05E2\u05DC\u05D4 \u05E9\u05DE\u05E2\u05D5\u05DC\u05DD \u05DC\u05D0 \u05E2\u05DC\u05D5!"',
    descriptionEnglish: `The wonderful prayers of Rabbi Nathan, composed based on Rabbi Nachman's teachings from Likutei Moharan. About them Rabbenu said: "Prayers made from the teachings - cause delights above that never existed before!"`,
    category: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    subcategory: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "likutei-tefilot-group",
    pages: 1152,
    isbn: "978-965-7023-12-7",
    images: [
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA 1_1757275910545.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA 1_1757278339720.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA 1_1757281125910.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA 2_1757280401419.jpg"
    ],
    variants: [
      {
        id: "large-leather",
        format: "\u05E2\u05D5\u05E8",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 120,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: "large-skai-with-prayers-2vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D5\u05EA\u05D7\u05E0\u05D5\u05E0\u05D9\u05DD",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 2,
        price: 80,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 40,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "medium-skai-with-prayers-3vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D5\u05EA\u05D7\u05E0\u05D5\u05E0\u05D9\u05DD",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 18
      },
      {
        id: "medium-leather-like",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 50,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: "small-leather-like",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 55,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 25,
        inStock: true,
        stockQuantity: 60
      },
      {
        id: "small-laminated-3vol",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 3,
        price: 40,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "medium-laminated-12vol",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 12,
        price: 60,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DE\u05D9\u05D5\u05E1\u05D3\u05D5\u05EA \u05E2\u05DC \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
      "\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05E0\u05E4\u05DC\u05D0 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05DE\u05E2\u05DC\u05D4 \u05E9\u05E2\u05E9\u05D5\u05E2\u05D9\u05DD \u05DC\u05DE\u05E2\u05DC\u05D4",
      "\u05D6\u05DE\u05D9\u05DF \u05D1\u05DE\u05D2\u05D5\u05D5\u05DF \u05DB\u05E8\u05D9\u05DB\u05D5\u05EA \u05D5\u05D2\u05D3\u05DC\u05D9\u05DD",
      "\u05D0\u05D9\u05DB\u05D5\u05EA \u05D4\u05D3\u05E4\u05E1\u05D4 \u05DE\u05E2\u05D5\u05DC\u05D4"
    ],
    tags: ["\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF", "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA", "\u05EA\u05D7\u05E0\u05D5\u05E0\u05D9\u05DD", "\u05E7\u05D3\u05D5\u05E9\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "alim-letrufah": {
    id: "alim-letrufah",
    name: "\u05E2\u05DC\u05D9\u05DD \u05DC\u05EA\u05E8\u05D5\u05E4\u05D4",
    nameEnglish: "Alim Letrufah",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05DE\u05D0\u05D5\u05EA \u05DE\u05DB\u05EA\u05D1\u05D9\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E9\u05E9\u05DC\u05D7 \u05DC\u05D1\u05E0\u05D9\u05D5 \u05D5\u05DC\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05D5 \u05E2\u05D3 \u05E1\u05DE\u05D5\u05DA \u05DC\u05E4\u05D8\u05D9\u05E8\u05EA\u05D5. \u05DE\u05DB\u05EA\u05D1\u05D9\u05DD \u05D0\u05DC\u05D5 \u05D4\u05DD \u05D0\u05D5\u05E6\u05E8 \u05D1\u05DC\u05D5\u05DD \u05E9\u05DC \u05D9\u05E8\u05D0\u05EA \u05E9\u05DE\u05D9\u05DD, \u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA, \u05E9\u05D9\u05D7\u05D5\u05EA \u05E7\u05D5\u05D3\u05E9, \u05E2\u05E6\u05D5\u05EA \u05DE\u05D0\u05D9\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD, \u05D5\u05E8\u05D5\u05D5\u05D9\u05D9\u05DD \u05D1\u05D3\u05D1\u05D9\u05E7\u05D5\u05EA \u05E2\u05D6\u05D4 \u05D1\u05E8\u05D1\u05D9\u05E0\u05D5.",
    descriptionEnglish: "Hundreds of letters from Rabbi Nathan, sent to his sons and students until close to his passing. These letters are a treasury of fear of Heaven, strengthening, holy conversations, and life-illuminating advice.",
    category: "\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD \u05D5\u05DB\u05EA\u05D1\u05D9\u05DD",
    subcategory: "\u05DE\u05DB\u05EA\u05D1\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "alim-letrufah-group",
    pages: 1088,
    isbn: "978-965-7023-13-4",
    images: [
      "/attached_assets/\u05E2\u05DC\u05D9\u05DD \u05DC\u05EA\u05E8\u05D5\u05E4\u05D4 1_1757275910546.jpg",
      "/attached_assets/\u05E2\u05DC\u05D9\u05DD \u05DC\u05EA\u05E8\u05D5\u05E4\u05D4 1_1757278339721.jpg",
      "/attached_assets/\u05E2\u05DC\u05D9\u05DD \u05DC\u05EA\u05E8\u05D5\u05E4\u05D4 1_1757281125910.jpg",
      "/attached_assets/\u05E2\u05DC\u05D9\u05DD_1757281085507.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 40,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "large-leather-pearl",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8 \u05DC\u05D1\u05DF/\u05E4\u05E0\u05D9\u05E0\u05D4",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 50,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: "medium-skai-3vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 30
      }
    ],
    features: [
      "\u05DE\u05DB\u05EA\u05D1\u05D9 \u05E7\u05D5\u05D3\u05E9 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05D0\u05D5\u05E6\u05E8 \u05E9\u05DC \u05D9\u05E8\u05D0\u05EA \u05E9\u05DE\u05D9\u05DD",
      "\u05E2\u05E6\u05D5\u05EA \u05DE\u05D0\u05D9\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD",
      "\u05D3\u05D1\u05D9\u05E7\u05D5\u05EA \u05E2\u05D6\u05D4 \u05D1\u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05E9\u05D9\u05D7\u05D5\u05EA \u05E7\u05D5\u05D3\u05E9 \u05D5\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA"
    ],
    tags: ["\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF", "\u05D9\u05E8\u05D0\u05EA \u05E9\u05DE\u05D9\u05DD", "\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA", "\u05E2\u05E6\u05D5\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "siporei-masiyot": {
    id: "siporei-masiyot",
    name: "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
    nameEnglish: "Stories of Rabbi Nachman",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05E9\u05DC\u05D5\u05E9 \u05E2\u05E9\u05E8\u05D4 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA, \u05D1\u05EA\u05D5\u05E1\u05E4\u05EA \u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05E7\u05E6\u05E8\u05D9\u05DD, \u05E9\u05E1\u05D9\u05E4\u05E8 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05D1\u05D0\u05E8\u05D1\u05E2 \u05E9\u05E0\u05D5\u05EA \u05D7\u05D9\u05D9\u05D5 \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA. \u05E0\u05E8\u05E9\u05DE\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05EA\u05DC\u05DE\u05D9\u05D3\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05D1\u05E9\u05E4\u05EA \u05D4\u05D0\u05D9\u05D3\u05D9\u05E9 \u05DB\u05E4\u05D9 \u05E9\u05E1\u05D5\u05E4\u05E8\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05D0\u05E3 \u05EA\u05D5\u05E8\u05D2\u05DE\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D5 \u05DC\u05DC\u05E9\u05D5\u05DF \u05D4\u05E7\u05D5\u05D3\u05E9.",
    descriptionEnglish: "Thirteen tales, plus short stories, told by Rabbi Nachman in the last four years of his life. Recorded by his student Rabbi Nathan in Yiddish as told by Rabbenu and translated by him into Hebrew.",
    category: "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05D5\u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
    subcategory: "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "siporei-masiyot-group",
    pages: 448,
    isbn: "978-965-7023-14-1",
    images: [
      "/attached_assets/\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA 1_1757275910546.jpg",
      "/attached_assets/\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA 1_1757278339721.jpg",
      "/attached_assets/\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA 2_1757280401419.jpg"
    ],
    variants: [
      {
        id: "large-skai-with-hints",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05E8\u05DE\u05D6\u05D9 \u05D4\u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "medium-skai-with-hints",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05E8\u05DE\u05D6\u05D9 \u05D4\u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "small-soft-leather",
        format: "\u05E2\u05D5\u05E8 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 25,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 60
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 80
      }
    ],
    features: [
      '\u05D9"\u05D2 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05E7\u05D3\u05D5\u05E9\u05D5\u05EA',
      "\u05E0\u05E8\u05E9\u05DD \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05E1\u05D2\u05D5\u05DC\u05D4 \u05DC\u05E4\u05E7\u05D9\u05D3\u05EA \u05E2\u05E7\u05E8\u05D5\u05EA",
      "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05E7\u05D5\u05D3\u05E9 \u05E2\u05DE\u05D5\u05E7\u05D9\u05DD",
      "\u05D6\u05DE\u05D9\u05DF \u05E2\u05DD \u05E8\u05DE\u05D6\u05D9 \u05D4\u05DE\u05E2\u05E9\u05D9\u05D5\u05EA"
    ],
    tags: ["\u05DE\u05E2\u05E9\u05D9\u05D5\u05EA", "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD", "\u05E7\u05D3\u05D5\u05E9\u05D4", "\u05E8\u05DE\u05D6\u05D9\u05DD", "\u05E1\u05D2\u05D5\u05DC\u05D5\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "sefer-hamidot": {
    id: "sefer-hamidot",
    name: "\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA",
    nameEnglish: "Sefer Hamidot",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DE\u05DB\u05D9\u05DC \u05E4\u05E1\u05E7\u05D0\u05D5\u05EA \u05E7\u05E6\u05E8\u05D5\u05EA \u05D5\u05EA\u05DE\u05E6\u05D9\u05EA\u05D9\u05D5\u05EA \u05D1\u05DE\u05E2\u05DC\u05EA \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA \u05D4\u05D8\u05D5\u05D1\u05D5\u05EA \u05D5\u05D1\u05D7\u05D5\u05D1\u05EA \u05D4\u05D4\u05EA\u05E8\u05D7\u05E7\u05D5\u05EA \u05DE\u05DE\u05D9\u05D3\u05D5\u05EA \u05E8\u05E2\u05D5\u05EA, \u05D4\u05E1\u05E4\u05E8 \u05E0\u05DB\u05EA\u05D1 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E2\u05D5\u05D3 \u05D1\u05D9\u05DC\u05D3\u05D5\u05EA\u05D5, \u05E8\u05D5\u05D1\u05D5 \u05E0\u05DC\u05E7\u05D8 \u05DE\u05DE\u05D0\u05DE\u05E8\u05D9 \u05D7\u05D6"\u05DC \u05D5\u05D7\u05DC\u05E7\u05D5 \u05D4\u05D9\u05E0\u05D5 \u05D4\u05E9\u05D2\u05D5\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E2\u05E6\u05DE\u05D5. \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05EA\u05D1\u05D8\u05D0 \u05E2\u05DC\u05D9\u05D5 "\u05D4\u05E1\u05E4\u05E8 \u05D4\u05D6\u05D4 - \u05E2\u05E9\u05D4 \u05D0\u05D5\u05EA\u05D9 \u05D9\u05D4\u05D5\u05D3\u05D9"',
    descriptionEnglish: "Contains short and concise passages about the excellence of good character traits and the obligation to distance oneself from bad ones. Written by Rabbenu in his youth, mostly collected from the sayings of our Sages.",
    category: "\u05DE\u05D5\u05E1\u05E8 \u05D5\u05D4\u05D3\u05E8\u05DB\u05D4",
    subcategory: "\u05DE\u05D9\u05D3\u05D5\u05EA \u05D8\u05D5\u05D1\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "sefer-hamidot-group",
    pages: 320,
    isbn: "978-965-7023-15-8",
    images: [
      "/attached_assets/\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA 1_1757275910546.jpg",
      "/attached_assets/\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA 1_1757278339721.jpg",
      "/attached_assets/\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA 1_1757281125910.jpg",
      "/attached_assets/\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA 2_1757280401419.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 60
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 80
      }
    ],
    features: [
      "\u05E0\u05DB\u05EA\u05D1 \u05D1\u05D9\u05DC\u05D3\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05DE\u05D9\u05D3\u05D5\u05EA \u05D8\u05D5\u05D1\u05D5\u05EA \u05D5\u05E8\u05E2\u05D5\u05EA",
      "\u05E4\u05E1\u05E7\u05D0\u05D5\u05EA \u05E7\u05E6\u05E8\u05D5\u05EA \u05D5\u05D7\u05D3\u05D5\u05EA",
      "\u05D1\u05E1\u05D9\u05E1 \u05DC\u05DE\u05D5\u05E1\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D9",
      "\u05D4\u05E1\u05E4\u05E8 \u05E9\u05E2\u05E9\u05D4 \u05D0\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D9\u05D4\u05D5\u05D3\u05D9"
    ],
    tags: ["\u05DE\u05D9\u05D3\u05D5\u05EA", "\u05DE\u05D5\u05E1\u05E8", "\u05D9\u05DC\u05D3\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5", '\u05D7\u05D6"\u05DC', "\u05D0\u05DC\u05E3 \u05D1\u05D9\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "hishtapchut-hanefesh": {
    id: "hishtapchut-hanefesh",
    name: "\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA \u05D4\u05E0\u05E4\u05E9 \u05D5\u05DE\u05E9\u05D9\u05D1\u05EA \u05E0\u05E4\u05E9",
    nameEnglish: "Outpouring of the Soul",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DC\u05E7\u05D8 \u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05E0\u05E4\u05DC\u05D0\u05D9\u05DD \u05D1\u05DE\u05E2\u05DC\u05EA \u05D4\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA \u05D5\u05D4\u05E9\u05D9\u05D7\u05D4 \u05E9\u05DC \u05D4\u05D9\u05D4\u05D5\u05D3\u05D9 \u05D1\u05D9\u05E0\u05D5 \u05DC\u05D1\u05D9\u05DF \u05E7\u05D5\u05E0\u05D5 - \u05D4\u05E2\u05E6\u05D4 \u05D4\u05E2\u05D9\u05E7\u05E8\u05D9\u05EA \u05D5\u05D4\u05DE\u05E8\u05DB\u05D6\u05D9\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF, \u05E9\u05D4\u05EA\u05D1\u05D8\u05D0: "\u05DE\u05E7\u05D8\u05DF \u05D5\u05E2\u05D3 \u05D2\u05D3\u05D5\u05DC, \u05D0\u05D9 \u05D0\u05E4\u05E9\u05E8 \u05DC\u05D4\u05D9\u05D5\u05EA \u05D9\u05D4\u05D5\u05D3\u05D9 \u05DB\u05E9\u05E8, \u05DB\u05D9 \u05D0\u05DD \u05E2\u05DC \u05D9\u05D3\u05D9 \u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA"',
    descriptionEnglish: "A collection of wonderful conversations and speeches about the excellence of seclusion and the conversation of the Jew between him and his Creator - the main and central advice of our holy Rebbe Nachman.",
    category: "\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA \u05D5\u05EA\u05E4\u05D9\u05DC\u05D4",
    subcategory: "\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA \u05D4\u05E0\u05E4\u05E9",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "hishtapchut-hanefesh-group",
    pages: 242,
    isbn: "978-965-7023-16-5",
    images: [
      "/attached_assets/\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA 1_1757275910544.jpg",
      "/attached_assets/\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA 1_1757278339719.jpg",
      "/attached_assets/\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA 2_1757275875791.jpg",
      "/attached_assets/\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA_1757281003111.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 50
      }
    ],
    features: [
      "\u05D4\u05E2\u05E6\u05D4 \u05D4\u05DE\u05E8\u05DB\u05D6\u05D9\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA \u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9\u05EA",
      "\u05E9\u05D9\u05D7\u05D4 \u05D1\u05D9\u05E0\u05D5 \u05DC\u05D1\u05D9\u05DF \u05E7\u05D5\u05E0\u05D5",
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05E0\u05E4\u05DC\u05D0 \u05DE\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD",
      "\u05D4\u05D3\u05E8\u05DB\u05D4 \u05DE\u05E2\u05E9\u05D9\u05EA"
    ],
    tags: ["\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA", "\u05EA\u05E4\u05D9\u05DC\u05D4", "\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA", "\u05DE\u05E9\u05D9\u05D1\u05EA \u05E0\u05E4\u05E9", "\u05E2\u05E6\u05D4 \u05DE\u05E8\u05DB\u05D6\u05D9\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "likutei-halakhot": {
    id: "likutei-halakhot",
    name: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA",
    nameEnglish: "Likutei Halakhot",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05D2\u05D3\u05D5\u05DC \u05D5\u05D4\u05DE\u05D5\u05E4\u05DC\u05D0 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05EA\u05DC\u05DE\u05D9\u05D3\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D4\u05E7 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D6\u05D9\u05E2"\u05D0, \u05DE\u05DB\u05D9\u05DC \u05D3\u05E8\u05D5\u05E9\u05D9\u05DD \u05E0\u05E4\u05DC\u05D0\u05D9\u05DD \u05D1\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4\u05E9\u05DD, \u05DE\u05E1\u05D5\u05D3\u05E8 \u05E2\u05DC \u05D0\u05E8\u05D1\u05E2\u05EA \u05D7\u05DC\u05E7\u05D9 \u05E9\u05D5\u05DC\u05D7\u05DF-\u05E2\u05E8\u05D5\u05DA, \u05DE\u05D7\u05D5\u05DC\u05E7 \u05DC\u05E9\u05DE\u05D5\u05E0\u05D4 \u05DB\u05E8\u05DB\u05D9\u05DD. \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05D4\u05EA\u05D1\u05D8\u05D0: "\u05D4\u05E2\u05D5\u05DC\u05DD \u05D0\u05D5\u05DE\u05E8\u05D9\u05DD \u05E2\u05DC \u05E1\u05E4\u05E8 \u05D4\u05E9\u05DC"\u05D4 \u05D4\u05E7\u05D3\u05D5\u05E9, \u05E9\u05D4\u05D5\u05D0 \u05D4\u05E9\u05E2\u05E8 \u05DC\u05D2\u05DF \u05E2\u05D3\u05DF, \u05D5\u05D0\u05E0\u05D9 \u05D0\u05D5\u05DE\u05E8 \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u2013 \u05E9\u05D4\u05D5\u05D0 \u05D4\u05D2\u05DF \u05E2\u05D3\u05DF \u05E9\u05DC \u05D4\u05E9\u05DD \u05D9\u05EA\u05D1\u05E8\u05DA \u05D1\u05E2\u05E6\u05DE\u05D5!"',
    descriptionEnglish: "The great and wonderful work of Rabbi Nathan, the outstanding student of our teacher Rabbi Nachman of Breslov, containing wonderful discourses on divine service, arranged according to the four sections of the Shulchan Aruch.",
    category: "\u05D4\u05DC\u05DB\u05D4 \u05D5\u05E2\u05D1\u05D5\u05D3\u05D4",
    subcategory: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "likutei-halakhot-group",
    pages: 2800,
    isbn: "978-965-7023-17-2",
    images: [
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA 1_1757280778288.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA 2_1757280778288.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA 3_1757280778288.jpg"
    ],
    variants: [
      {
        id: "large-8vol-illuminated",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05DE\u05D0\u05D9\u05E8\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 8,
        price: 380,
        inStock: true,
        stockQuantity: 5
      },
      {
        id: "large-8vol-standard",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "25*17",
        volumes: 8,
        price: 280,
        inStock: true,
        stockQuantity: 8
      },
      {
        id: "medium-20vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 20,
        price: 480,
        inStock: true,
        stockQuantity: 3
      },
      {
        id: "giant-8vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05E2\u05E0\u05E7",
        dimensions: "32*22",
        volumes: 8,
        price: 420,
        inStock: true,
        stockQuantity: 4
      }
    ],
    features: [
      "\u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05D4\u05D2\u05D3\u05D5\u05DC \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      `\u05DE\u05E1\u05D5\u05D3\u05E8 \u05E2\u05DC \u05D3' \u05D7\u05DC\u05E7\u05D9 \u05E9\u05D5"\u05E2`,
      "\u05D3\u05E8\u05D5\u05E9\u05D9\u05DD \u05E0\u05E4\u05DC\u05D0\u05D9\u05DD \u05D1\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4\u05E9\u05DD",
      "\u05D4\u05D2\u05DF \u05E2\u05D3\u05DF \u05E9\u05DC \u05D4\u05E9\u05DD \u05D9\u05EA\u05D1\u05E8\u05DA",
      "\u05D6\u05DE\u05D9\u05DF \u05D1\u05DE\u05E1\u05E4\u05E8 \u05DE\u05D4\u05D3\u05D5\u05E8\u05D5\u05EA"
    ],
    tags: ["\u05D4\u05DC\u05DB\u05D4", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF", "\u05E9\u05D5\u05DC\u05D7\u05DF \u05E2\u05E8\u05D5\u05DA", "\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4\u05E9\u05DD", "\u05D3\u05E8\u05D5\u05E9\u05D9\u05DD"],
    isActive: true,
    isFeatured: true
  },
  "likutei-etzot": {
    id: "likutei-etzot",
    name: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA",
    nameEnglish: "Likutei Etzot",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05E1\u05E4\u05E8\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1, \u05DE\u05DB\u05D9\u05DC \u05E2\u05E6\u05D5\u05EA \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05DC\u05D7\u05D9\u05D9 \u05D4\u05D9\u05D5\u05DE\u05D9\u05D5\u05DD \u05D4\u05DE\u05D5\u05D1\u05D0\u05D5\u05EA \u05DE\u05EA\u05D5\u05DA \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05E1\u05D5\u05D3\u05E8 \u05DC\u05E4\u05D9 \u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05D5\u05DE\u05D4\u05D5\u05D5\u05D4 \u05DE\u05D3\u05E8\u05D9\u05DA \u05E4\u05E8\u05E7\u05D8\u05D9 \u05DC\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4\u05E9\u05DD.",
    descriptionEnglish: "The book of Rabbi Nathan of Breslov, containing practical advice for daily life brought from Rabbenu's books. The book is organized by topics and serves as a practical guide for divine service.",
    category: "\u05E2\u05E6\u05D5\u05EA \u05D5\u05D4\u05D3\u05E8\u05DB\u05D4",
    subcategory: "\u05E2\u05E6\u05D5\u05EA \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "likutei-etzot-group",
    pages: 576,
    isbn: "978-965-7023-18-9",
    images: [
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA 1_1757275910545.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA 1_1757278339720.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA 1_1757281125909.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA_1757281003113.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: "large-skai-with-commentary-2vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05DB\u05D5\u05DC\u05DC \u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA \u05D5\u05DE\u05DB\u05EA\u05D1\u05D9 \u05E8\u05D1\u05D9 \u05E9\u05DE\u05E9\u05D5\u05DF",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 2,
        price: 80,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 60
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 80
      }
    ],
    features: [
      "\u05E2\u05E6\u05D5\u05EA \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05DC\u05D7\u05D9\u05D9 \u05D9\u05D5\u05DE\u05D9\u05D5\u05DD",
      "\u05DE\u05E1\u05D5\u05D3\u05E8 \u05DC\u05E4\u05D9 \u05E0\u05D5\u05E9\u05D0\u05D9\u05DD",
      "\u05DE\u05D3\u05E8\u05D9\u05DA \u05E4\u05E8\u05E7\u05D8\u05D9",
      '\u05DE\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
      "\u05D6\u05DE\u05D9\u05DF \u05E2\u05DD \u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA"
    ],
    tags: ["\u05E2\u05E6\u05D5\u05EA", "\u05D4\u05D3\u05E8\u05DB\u05D4", "\u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9", "\u05DE\u05E2\u05E9\u05D9", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF"],
    isActive: true,
    isFeatured: true
  },
  "etzot-hamevuarot": {
    id: "etzot-hamevuarot",
    name: "\u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA",
    nameEnglish: "Eitzos Mevu'arot",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05D7\u05D5\u05D1\u05E8 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E9\u05DE\u05E9\u05D5\u05DF \u05D1\u05D0\u05E8\u05E1\u05E7\u05D9 \u05E0\u05DB\u05D3 \u05E8\u05D1\u05D9\u05E0\u05D5, \u05D1\u05DE\u05E7\u05D5\u05E8 \u05D1\u05D0\u05D9\u05D3\u05D9\u05E9, \u05D4\u05E9\u05E4\u05D4 \u05D4\u05DE\u05D3\u05D5\u05D1\u05E8\u05EA \u05D1\u05D0\u05D5\u05EA\u05DF \u05E9\u05E0\u05D9\u05DD. \u05D4\u05E1\u05E4\u05E8 \u05D4\u05D5\u05D0 \u05D1\u05D9\u05D0\u05D5\u05E8 \u05DC\u05E1\u05E4\u05E8 '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA' \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E0\u05DB\u05EA\u05D1 \u05D1\u05E1\u05D2\u05E0\u05D5\u05DF \u05E4\u05E9\u05D5\u05D8 \u05D5\u05E7\u05D5\u05DC\u05D7 \u05D4\u05DE\u05EA\u05D0\u05D9\u05DD \u05DC\u05DB\u05DC \u05E9\u05DB\u05D1\u05D5\u05EA \u05D4\u05E6\u05D9\u05D1\u05D5\u05E8.",
    descriptionEnglish: "Compiled by Rabbi Shimshon Barsky, grandson of Rabbenu, originally in Yiddish. The book is an explanation of Rabbi Nathan's 'Likutei Etzot', written in a simple and flowing style suitable for all segments of the public.",
    category: "\u05E2\u05E6\u05D5\u05EA \u05D5\u05D4\u05D3\u05E8\u05DB\u05D4",
    subcategory: "\u05D1\u05D9\u05D0\u05D5\u05E8\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E9\u05DE\u05E9\u05D5\u05DF \u05D1\u05D0\u05E8\u05E1\u05E7\u05D9",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "etzot-hamevuarot-group",
    pages: 384,
    isbn: "978-965-7023-19-6",
    images: [
      "/attached_assets/\u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA 1_1757275910546.jpg",
      "/attached_assets/\u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA 1_1757278339721.jpg",
      "/attached_assets/\u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA 1_1757281125911.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      }
    ],
    features: [
      "\u05D1\u05D9\u05D0\u05D5\u05E8 \u05DC\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA",
      "\u05E0\u05DB\u05D3 \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05E1\u05D2\u05E0\u05D5\u05DF \u05E4\u05E9\u05D5\u05D8 \u05D5\u05E7\u05D5\u05DC\u05D7",
      "\u05DE\u05EA\u05D0\u05D9\u05DD \u05DC\u05DB\u05DC \u05E9\u05DB\u05D1\u05D5\u05EA \u05D4\u05E6\u05D9\u05D1\u05D5\u05E8",
      "\u05EA\u05D5\u05E8\u05D2\u05DD \u05DE\u05D0\u05D9\u05D3\u05D9\u05E9"
    ],
    tags: ["\u05E2\u05E6\u05D5\u05EA", "\u05D1\u05D9\u05D0\u05D5\u05E8", "\u05E0\u05DB\u05D3 \u05E8\u05D1\u05D9\u05E0\u05D5", "\u05E4\u05E9\u05D5\u05D8", "\u05DE\u05D1\u05D5\u05D0\u05E8"],
    isActive: true,
    isFeatured: false
  },
  "sichos-haran": {
    id: "sichos-haran",
    name: '\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8"\u05DF',
    nameEnglish: "Sichos Haran",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: `"\u05D1\u05EA\u05D7\u05D9\u05DC\u05D4 \u05E1\u05D1\u05D5\u05E8 \u05D4\u05D9\u05D9\u05EA\u05D9 \u05E9\u05E8\u05E7 \u05D0\u05EA \u05EA\u05D5\u05E8\u05D5\u05EA\u05D9\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E6\u05E8\u05D9\u05DA \u05DC\u05DB\u05EA\u05D5\u05D1", \u05E1\u05D9\u05E4\u05E8 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, "\u05D0\u05D5\u05DC\u05DD \u05DC\u05D9\u05DE\u05D9\u05DD \u05D4\u05D1\u05E0\u05EA\u05D9 \u05E9\u05DB\u05DC \u05E9\u05D9\u05D7\u05D4 \u05E9\u05DC\u05D5, \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05E2\u05DC\u05D5\u05EA \u05E2\u05DC \u05D4\u05DB\u05EA\u05D1". \u05D4\u05E1\u05E4\u05E8 '\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8"\u05DF' \u05DE\u05DB\u05D9\u05DC \u05E9\u05D9\u05D7\u05D5\u05EA \u05E9\u05E0\u05D0\u05DE\u05E8\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D1\u05E0\u05E1\u05D9\u05E2\u05D5\u05EA \u05D5\u05D1\u05D3\u05E8\u05DB\u05D9\u05DD, \u05D5\u05D1\u05D4\u05D6\u05D3\u05DE\u05E0\u05D5\u05D9\u05D5\u05EA \u05E9\u05D5\u05E0\u05D5\u05EA, \u05DC\u05D0\u05D5 \u05D3\u05D5\u05D5\u05E7\u05D0 \u05D1\u05E9\u05D5\u05DC\u05D7\u05DF \u05D4\u05E9\u05D1\u05EA \u05D0\u05D5 \u05D1\u05E6\u05D9\u05D1\u05D5\u05E8 \u05D7\u05E1\u05D9\u05D3\u05D9\u05DD.`,
    descriptionEnglish: `"At first I thought only Rabbenu's teachings needed to be written," Rabbi Nathan said, "but later I understood that every conversation of his needs to be put in writing." Sichos Haran contains conversations said by Rabbenu during travels and journeys.`,
    category: "\u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD",
    subcategory: "\u05E9\u05D9\u05D7\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "sichos-haran-group",
    pages: 446,
    isbn: "978-965-7023-20-2",
    images: [
      "/attached_assets/\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8\u05DF 1_1757281125911.jpg",
      "/attached_assets/\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8\u05DF_1757281085509.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 25,
        inStock: true,
        stockQuantity: 50
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 70
      }
    ],
    features: [
      "\u05E9\u05D9\u05D7\u05D5\u05EA \u05D1\u05E0\u05E1\u05D9\u05E2\u05D5\u05EA \u05D5\u05D3\u05E8\u05DB\u05D9\u05DD",
      "\u05DB\u05DC \u05E9\u05D9\u05D7\u05D4 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D7\u05E9\u05D5\u05D1\u05D4",
      "\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05D9\u05D5\u05DE\u05D9\u05D5\u05DE\u05D9\u05D9\u05DD",
      "\u05E0\u05E8\u05E9\u05DD \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05E9\u05D9\u05D7\u05D5\u05EA \u05DC\u05D3\u05E8\u05DA \u05D5\u05DC\u05D7\u05D9\u05D9\u05DD"
    ],
    tags: ["\u05E9\u05D9\u05D7\u05D5\u05EA", "\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD", "\u05E0\u05E1\u05D9\u05E2\u05D5\u05EA", "\u05D9\u05D5\u05DE\u05D9\u05D5\u05DD", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF"],
    isActive: true,
    isFeatured: true
  },
  "chayei-moharan": {
    id: "chayei-moharan",
    name: '\u05D7\u05D9\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
    nameEnglish: "Chayei Moharan",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05D1\u05D7\u05D9\u05D1\u05D5\u05E8 \u05D6\u05D4, \u05D4\u05E2\u05DC\u05D4 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05E2\u05DC \u05D4\u05DB\u05EA\u05D1 \u05DE\u05D0\u05DE\u05E8\u05D9\u05DD \u05D5\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05E9\u05E9\u05DE\u05E2 \u05DE\u05E4\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5, \u05D1\u05D4\u05DD \u05DE\u05EA\u05D2\u05DC\u05D4 \u05D8\u05E4\u05D7 \u05DE\u05D2\u05D3\u05D5\u05DC\u05EA\u05D5 \u05D4\u05E2\u05E6\u05D5\u05DE\u05D4 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5. \u05DE\u05D7\u05D5\u05DC\u05E7 \u05DC\u05E4\u05D9 \u05E0\u05D5\u05E9\u05D0\u05D9\u05DD: \u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E9\u05D9\u05D9\u05DB\u05D5\u05EA \u05DC\u05EA\u05D5\u05E8\u05D5\u05EA, \u05DE\u05D0\u05DE\u05E8\u05D9\u05DD \u05D1\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4', \u05D1\u05D2\u05D3\u05D5\u05DC\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5, \u05D1\u05DE\u05E2\u05DC\u05EA \u05EA\u05D5\u05E8\u05EA\u05D5 \u05D5\u05D1\u05DE\u05E2\u05DC\u05EA \u05D0\u05E0\u05E9\u05D9\u05D5 \u05D5\u05DE\u05E7\u05D5\u05E8\u05D1\u05D9\u05D5.",
    descriptionEnglish: "In this work, Rabbi Nathan put to writing statements and speeches he heard from Rabbenu, revealing a glimpse of Rabbenu's enormous greatness. Divided by topics: conversations related to teachings, articles on divine service, on Rabbenu's greatness.",
    category: "\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA \u05D5\u05D7\u05D9\u05D9\u05DD",
    subcategory: "\u05D7\u05D9\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "chayei-moharan-group",
    pages: 640,
    isbn: "978-965-7023-21-9",
    images: [
      "/attached_assets/\u05D7\u05D9\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 1_1757275910544.jpg",
      "/attached_assets/\u05D7\u05D9\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 1_1757278339719.jpg",
      "/attached_assets/\u05D7\u05D9\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF 2_1757280401417.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: false,
        stockQuantity: 0
      }
    ],
    features: [
      "\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05E9\u05E0\u05E9\u05DE\u05E2\u05D5 \u05DE\u05E4\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05D8\u05E4\u05D7 \u05DE\u05D2\u05D3\u05D5\u05DC\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05DE\u05D7\u05D5\u05DC\u05E7 \u05DC\u05E4\u05D9 \u05E0\u05D5\u05E9\u05D0\u05D9\u05DD",
      "\u05D2\u05D3\u05D5\u05DC\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05EA\u05D5\u05E8\u05EA\u05D5",
      "\u05DE\u05E2\u05DC\u05EA \u05D0\u05E0\u05E9\u05D9\u05D5 \u05D5\u05DE\u05E7\u05D5\u05E8\u05D1\u05D9\u05D5"
    ],
    tags: ["\u05D7\u05D9\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5", "\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA", "\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD", "\u05D2\u05D3\u05D5\u05DC\u05D4", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF"],
    isActive: true,
    isFeatured: true
  },
  "yimei-maharanat": {
    id: "yimei-maharanat",
    name: '\u05D9\u05DE\u05D9 \u05DE\u05D5\u05D4\u05E8\u05E0"\u05EA',
    nameEnglish: "Yimei Maharnat",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05D9\u05D5\u05DE\u05E0\u05D5 \u05D4\u05E0\u05E4\u05DC\u05D0 \u05E9\u05DC \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3 \u05D4\u05DE\u05D5\u05D1\u05D4\u05E7 \u05D5\u05D4\u05E0\u05D0\u05DE\u05DF \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF. \u05D1\u05D5 \u05D2\u05D5\u05DC\u05DC \u05D0\u05EA \u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05D5 \u05DE\u05D4\u05EA\u05E7\u05E8\u05D1\u05D5\u05EA\u05D5 \u05DC\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E2\u05D3 \u05DC\u05D0\u05D7\u05E8 \u05E0\u05E1\u05D9\u05E2\u05EA\u05D5 \u05DC\u05D0\u05E8\u05E5 \u05D9\u05E9\u05E8\u05D0\u05DC. \u05D4\u05E8\u05D3\u05D9\u05E4\u05D5\u05EA, \u05D4\u05D1\u05D9\u05D6\u05D9\u05D5\u05E0\u05D5\u05EA, \u05D4\u05E7\u05E9\u05D9\u05D9\u05DD \u05D5\u05D4\u05DE\u05E0\u05D9\u05E2\u05D5\u05EA, \u05DC\u05E6\u05D3 \u05D4\u05E2\u05E9\u05D9\u05D9\u05D4 \u05D4\u05D1\u05DC\u05EA\u05D9 \u05E4\u05D5\u05E1\u05E7\u05EA \u05DC\u05D4\u05E0\u05D7\u05DC\u05EA \u05DE\u05D5\u05E8\u05E9\u05EA\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DC\u05D3\u05D5\u05E8\u05D5\u05EA \u05E2\u05D5\u05DC\u05DD.",
    descriptionEnglish: "The wonderful diary of the outstanding and faithful student Rabbi Nathan. In it he unfolds the events of his life from his approach to Rabbenu until after his journey to the Land of Israel.",
    category: "\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA \u05D5\u05D7\u05D9\u05D9\u05DD",
    subcategory: "\u05D9\u05DE\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "yimei-maharanat-group",
    pages: 512,
    isbn: "978-965-7023-22-6",
    images: [
      "/attached_assets/\u05D9\u05DE\u05D9 \u05DE\u05D5\u05D4\u05E8\u05E0\u05EA 1_1757275910544.jpg",
      "/attached_assets/\u05D9\u05DE\u05D9 \u05DE\u05D5\u05D4\u05E8\u05E0\u05EA 1_1757278339719.jpg",
      "/attached_assets/\u05D9\u05DE\u05D9 \u05DE\u05D5\u05D4\u05E8\u05E0\u05EA 2_1757280401418.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 40
      }
    ],
    features: [
      "\u05D9\u05D5\u05DE\u05E0\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05DE\u05D4\u05EA\u05E7\u05E8\u05D1\u05D5\u05EA \u05DC\u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05E0\u05E1\u05D9\u05E2\u05D4 \u05DC\u05D0\u05E8\u05E5 \u05D9\u05E9\u05E8\u05D0\u05DC",
      "\u05E8\u05D3\u05D9\u05E4\u05D5\u05EA \u05D5\u05E7\u05E9\u05D9\u05D9\u05DD",
      "\u05D4\u05E0\u05D7\u05DC\u05EA \u05D4\u05DE\u05D5\u05E8\u05E9\u05EA"
    ],
    tags: ["\u05D9\u05D5\u05DE\u05DF", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF", "\u05D0\u05E8\u05E5 \u05D9\u05E9\u05E8\u05D0\u05DC", "\u05E8\u05D3\u05D9\u05E4\u05D5\u05EA", "\u05DE\u05D5\u05E8\u05E9\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "kochvei-ohr": {
    id: "kochvei-ohr",
    name: "\u05DB\u05D5\u05DB\u05D1\u05D9 \u05D0\u05D5\u05E8",
    nameEnglish: "Kochvei Ohr",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: `\u05E1\u05E4\u05E8\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D0\u05D1\u05E8\u05D4\u05DD \u05D7\u05D6\u05DF, \u05D1\u05E0\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05D5\u05DC\u05D8\u05E9\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF. \u05DE\u05DB\u05D9\u05DC \u05D0\u05E8\u05D1\u05E2\u05D4 \u05D7\u05DC\u05E7\u05D9\u05DD: '\u05D0\u05E0\u05E9\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF' \u2013\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05E2\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05D5, '\u05D0\u05DE\u05EA \u05D5\u05D0\u05DE\u05D5\u05E0\u05D4' \u2013 \u05E9\u05D9\u05D7\u05D5\u05EA \u05D1\u05DE\u05E2\u05DC\u05EA \u05D4\u05D0\u05DE\u05D5\u05E0\u05D4, '\u05D7\u05DB\u05DE\u05D4 \u05D5\u05D1\u05D9\u05E0\u05D4' \u05E8\u05DE\u05D6\u05D9\u05DD \u05D5\u05E1\u05D5\u05D3\u05D5\u05EA \u05D1\u05D2\u05D3\u05D5\u05DC\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5, '\u05E9\u05E9\u05D5\u05DF \u05D5\u05E9\u05DE\u05D7\u05D4' \u2013 \u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05E2\u05DC \u05DE\u05E2\u05DC\u05EA \u05D4\u05E9\u05DE\u05D7\u05D4.`,
    descriptionEnglish: "The book of Rabbi Avraham Chazan, son of Rabbi Nachman of Tulchyn, student of Rabbi Nathan. Contains four parts: 'People of Moharan' - stories about Rabbenu and his students, 'Truth and Faith' - conversations about the excellence of faith.",
    category: "\u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD",
    subcategory: "\u05DB\u05D5\u05DB\u05D1\u05D9 \u05D0\u05D5\u05E8",
    author: "\u05E8\u05D1\u05D9 \u05D0\u05D1\u05E8\u05D4\u05DD \u05D7\u05D6\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "kochvei-ohr-group",
    pages: 480,
    isbn: "978-965-7023-23-3",
    images: [
      "/attached_assets/\u05DB\u05D5\u05DB\u05D1\u05D9 \u05D0\u05D5\u05E8 1_1757275910545.jpg",
      "/attached_assets/\u05DB\u05D5\u05DB\u05D1\u05D9 \u05D0\u05D5\u05E8 1_1757278339720.jpg",
      "/attached_assets/\u05DB\u05D5\u05DB\u05D1\u05D9 \u05D0\u05D5\u05E8 2_1757280401418.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 50
      }
    ],
    features: [
      "\u05D0\u05E8\u05D1\u05E2\u05D4 \u05D7\u05DC\u05E7\u05D9\u05DD \u05E0\u05E4\u05DC\u05D0\u05D9\u05DD",
      "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05E2\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05D5",
      "\u05E9\u05D9\u05D7\u05D5\u05EA \u05D1\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D5\u05E9\u05DE\u05D7\u05D4",
      "\u05E8\u05DE\u05D6\u05D9\u05DD \u05D5\u05E1\u05D5\u05D3\u05D5\u05EA",
      "\u05D1\u05DF \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05D5\u05DC\u05D8\u05E9\u05D9\u05DF"
    ],
    tags: ["\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD", "\u05D0\u05DE\u05D5\u05E0\u05D4", "\u05E9\u05DE\u05D7\u05D4", "\u05E8\u05DE\u05D6\u05D9\u05DD", "\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD"],
    isActive: true,
    isFeatured: true
  },
  "tehilim": {
    id: "tehilim",
    name: "\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD",
    nameEnglish: "Tehilim (Psalms)",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '"\u05DE\u05D9 \u05E9\u05E8\u05D5\u05E6\u05D4 \u05DC\u05D6\u05DB\u05D5\u05EA \u05DC\u05EA\u05E9\u05D5\u05D1\u05D4 - \u05D9\u05D4\u05D9\u05D4 \u05E8\u05D2\u05D9\u05DC \u05D1\u05D0\u05DE\u05D9\u05E8\u05EA \u05EA\u05D4\u05DC\u05D9\u05DD, \u05DB\u05D9 \u05D0\u05DE\u05D9\u05E8\u05EA \u05EA\u05D4\u05DC\u05D9\u05DD \u05DE\u05E1\u05D5\u05D2\u05DC \u05DC\u05EA\u05E9\u05D5\u05D1\u05D4" \u05DE\u05D2\u05DC\u05D4 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF (\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05E2\u05D2) \u05DE\u05D4\u05D3\u05D5\u05E8\u05D4 \u05DE\u05D9\u05D5\u05D7\u05D3\u05EA, \u05D1\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05D2\u05D3\u05D5\u05DC\u05D5\u05EA \u05D5\u05DE\u05D0\u05D9\u05E8\u05D5\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD, \u05E2\u05DD \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u05DE\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E2\u05DC \u05D4\u05D3\u05E3, \u05DC\u05E4\u05D9 \u05E1\u05D3\u05E8 \u05D4\u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD.',
    descriptionEnglish: '"Whoever wants to merit repentance - should be regular in saying Tehilim, for saying Tehilim is conducive to repentance" reveals our holy Rebbe Nachman. Special edition with large, clear letters, with Likutei Halakhot from Rabbi Nathan on the page.',
    category: '\u05EA\u05E0"\u05DA \u05D5\u05EA\u05E4\u05D9\u05DC\u05D4',
    subcategory: "\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD",
    author: "\u05D3\u05D5\u05D3 \u05D4\u05DE\u05DC\u05DA",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    languageGroupId: "tehilim-group",
    pages: 350,
    isbn: "978-965-7023-24-0",
    images: [
      "/attached_assets/\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD 1_1757275910547.jpg",
      "/attached_assets/\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD 1_1757278339722.jpg",
      "/attached_assets/\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD 1_1757281125911.jpg"
    ],
    variants: [
      {
        id: "large-skai-with-halakhot",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "medium-skai-with-tzadikim",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05E9\u05DE\u05D5\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: "medium-leather-pearl",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8 \u05DC\u05D1\u05DF/\u05E4\u05E0\u05D9\u05E0\u05D4",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 40,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "small-laminated-tzadikim",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E2\u05DD \u05E9\u05DE\u05D5\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 50
      }
    ],
    features: [
      "\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05D2\u05D3\u05D5\u05DC\u05D5\u05EA \u05D5\u05DE\u05D0\u05D9\u05E8\u05D5\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD",
      "\u05E2\u05DD \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u05E2\u05DC \u05D4\u05D3\u05E3",
      "\u05DE\u05E1\u05D5\u05D2\u05DC \u05DC\u05EA\u05E9\u05D5\u05D1\u05D4",
      "\u05DC\u05E4\u05D9 \u05E1\u05D3\u05E8 \u05D4\u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD",
      "\u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E2\u05DC \u05D4\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD"
    ],
    tags: ["\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD", "\u05EA\u05E9\u05D5\u05D1\u05D4", "\u05EA\u05E4\u05D9\u05DC\u05D4", "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA", "\u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD"],
    isActive: true,
    isFeatured: true
  },
  "rosh-hashana-sheli": {
    id: "rosh-hashana-sheli",
    name: "\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05E9\u05DC\u05D9",
    nameEnglish: "My Rosh Hashanah",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DE\u05DB\u05D9\u05DC \u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5, \u05E2\u05DC \u05DE\u05E2\u05DC\u05EA \u05E7\u05D3\u05D5\u05E9\u05EA \u05D4\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4, \u05D5\u05D4\u05E0\u05E1\u05D9\u05E2\u05D4 \u05DC\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05DC\u05E6\u05D3\u05D9\u05E7 \u05D4\u05D0\u05DE\u05EA. \u05DB\u05DA \u05DB\u05D5\u05EA\u05D1 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05D1\u05E9\u05DD \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1: "\u05D0\u05DE\u05E8: \u05D4\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05E9\u05DC\u05D9 \u05E2\u05D5\u05DC\u05D4 \u05E2\u05DC \u05D4\u05DB\u05DC. \u05D5\u05D4\u05D9\u05D4 \u05E4\u05DC\u05D0 \u05D0\u05E6\u05DC\u05D9 \u05DE\u05D0\u05D7\u05E8 \u05E9\u05D4\u05DE\u05E7\u05D5\u05E8\u05D1\u05D9\u05DD \u05E9\u05DC\u05D9 \u05DE\u05D0\u05DE\u05D9\u05E0\u05D9\u05DD \u05DC\u05D9, \u05D5\u05DC\u05DE\u05D4 \u05DC\u05D0 \u05D9\u05D6\u05D4\u05E8\u05D5 \u05DB\u05DC \u05D4\u05D0\u05E0\u05E9\u05D9\u05DD \u05D4\u05DE\u05E7\u05D5\u05E8\u05D1\u05D9\u05DD \u05D0\u05DC\u05D9 \u05E9\u05D9\u05D4\u05D9\u05D5 \u05DB\u05D5\u05DC\u05DD \u05E2\u05DC \u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4, \u05D0\u05D9\u05E9 \u05DC\u05D0 \u05D9\u05E2\u05D3\u05E8."',
    descriptionEnglish: "Contains a collection from Rabbenu's books about the excellence and holiness of Rosh Hashanah, and traveling to the true Tzaddik for Rosh Hashanah.",
    category: "\u05DE\u05D5\u05E2\u05D3\u05D9 \u05D4\u05E9\u05E0\u05D4",
    subcategory: "\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 320,
    isbn: "978-965-7023-25-7",
    images: [
      "/attached_assets/\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05E9\u05DC\u05D9 1_1757275239936.jpg",
      "/attached_assets/\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05E9\u05DC\u05D9 2_1757275239936.jpg",
      "/attached_assets/\u05D4\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05E9\u05DC\u05D9 3_1757275239935.jpg"
    ],
    variants: [
      {
        id: "medium-skai-4vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 4,
        price: 120,
        inStock: true,
        stockQuantity: 25
      }
    ],
    features: [
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05E7\u05D3\u05D5\u05E9\u05EA \u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4",
      "\u05E0\u05E1\u05D9\u05E2\u05D4 \u05DC\u05E6\u05D3\u05D9\u05E7 \u05D4\u05D0\u05DE\u05EA",
      "\u05D4\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05E9\u05DC\u05D9 \u05E2\u05D5\u05DC\u05D4 \u05E2\u05DC \u05D4\u05DB\u05DC",
      "\u05DE\u05EA\u05D0\u05D9\u05DD \u05DC\u05D7\u05D5\u05D3\u05E9 \u05D0\u05DC\u05D5\u05DC \u05D5\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4"
    ],
    tags: ["\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4", "\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD", "\u05D0\u05DC\u05D5\u05DC", "\u05E6\u05D3\u05D9\u05E7", "\u05E0\u05E1\u05D9\u05E2\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "itzumo-shel-yom": {
    id: "itzumo-shel-yom",
    name: "\u05E2\u05D9\u05E6\u05D5\u05DE\u05D5 \u05E9\u05DC \u05D9\u05D5\u05DD",
    nameEnglish: "The Essence of the Day",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DE\u05DB\u05D9\u05DC \u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05E2\u05DC \u05DE\u05E2\u05DC\u05EA \u05D5\u05E7\u05D3\u05D5\u05E9\u05EA \u05D9\u05D5\u05DD \u05D4\u05DB\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD, \u05E9\u05DB\u05D3\u05D1\u05E8\u05D9 \u05D4\u05D2\u05DE\u05E8\u05D0 "\u05E2\u05D9\u05E6\u05D5\u05DE\u05D5 \u05E9\u05DC \u05D9\u05D5\u05DD \u05DE\u05DB\u05E4\u05E8" "\u05DB\u05D9 \u05D1\u05D9\u05D5\u05DD \u05D4\u05D6\u05D4 \u05D9\u05DB\u05E4\u05E8 \u05E2\u05DC\u05D9\u05DB\u05DD \u05DE\u05DB\u05DC \u05D7\u05D8\u05D0\u05EA\u05D9\u05DB\u05DD"',
    descriptionEnglish: `Contains a collection from all of Rabbenu and Rabbi Nathan's books about the excellence and holiness of Yom Kippur, as the Talmud says "the essence of the day atones".`,
    category: "\u05DE\u05D5\u05E2\u05D3\u05D9 \u05D4\u05E9\u05E0\u05D4",
    subcategory: "\u05D9\u05D5\u05DD \u05DB\u05D9\u05E4\u05D5\u05E8",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 250,
    isbn: "978-965-7023-26-4",
    images: [
      "/attached_assets/\u05D0\u05D5\u05E6\u05E8 \u05D4\u05D9\u05E8\u05D0\u05D4 1_1757275234154.jpg",
      "/attached_assets/\u05D0\u05D5\u05E6\u05E8 \u05D4\u05D9\u05E8\u05D0\u05D4 2_1757275234155.jpg",
      "/attached_assets/1_1757275751755.jpg"
    ],
    variants: [
      {
        id: "medium-skai-2vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 2,
        price: 70,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      "\u05E7\u05D3\u05D5\u05E9\u05EA \u05D9\u05D5\u05DD \u05DB\u05D9\u05E4\u05D5\u05E8",
      "\u05E2\u05D9\u05E6\u05D5\u05DE\u05D5 \u05E9\u05DC \u05D9\u05D5\u05DD \u05DE\u05DB\u05E4\u05E8",
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD",
      "\u05DB\u05E4\u05E8\u05D4 \u05D5\u05E1\u05DC\u05D9\u05D7\u05D4",
      "\u05D9\u05D5\u05DD \u05D4\u05D3\u05D9\u05DF \u05D4\u05D2\u05D3\u05D5\u05DC"
    ],
    tags: ["\u05D9\u05D5\u05DD \u05DB\u05D9\u05E4\u05D5\u05E8", "\u05DB\u05E4\u05E8\u05D4", "\u05E1\u05DC\u05D9\u05D7\u05D4", "\u05D3\u05D9\u05DF", "\u05E7\u05D3\u05D5\u05E9\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "ki-naar-yisrael": {
    id: "ki-naar-yisrael",
    name: "\u05DB\u05D9 \u05E0\u05E2\u05E8 \u05D9\u05E9\u05E8\u05D0\u05DC",
    nameEnglish: "For Israel is a Youth",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E2\u05DC \u05D7\u05D9\u05E0\u05D5\u05DA \u05D4\u05E0\u05E2\u05E8\u05D9\u05DD, \u05DB\u05D5\u05DC\u05DC \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DC\u05D6\u05DB\u05D5\u05EA \u05DC\u05D1\u05E0\u05D9\u05DD \u05D5\u05D1\u05E0\u05D5\u05EA \u05D9\u05E8\u05D0\u05D9 \u05D4\u05E9\u05DD. \u05E2\u05DC \u05E9\u05DD \u05D4\u05E4\u05E1\u05D5\u05E7 "\u05DB\u05D9 \u05E0\u05E2\u05E8 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D5\u05D0\u05D5\u05D4\u05D1\u05D4\u05D5 \u05D5\u05DE\u05DE\u05E6\u05E8\u05D9\u05DD \u05E7\u05E8\u05D0\u05EA\u05D9 \u05DC\u05D1\u05E0\u05D9" (\u05D4\u05D5\u05E9\u05E2 \u05D9\u05D0, \u05D0)',
    descriptionEnglish: "A collection from all of Rabbenu and Rabbi Nathan's books about educating children, including prayers for meriting God-fearing sons and daughters.",
    category: "\u05DE\u05D5\u05E2\u05D3\u05D9 \u05D4\u05E9\u05E0\u05D4",
    subcategory: "\u05E1\u05D5\u05DB\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 300,
    isbn: "978-965-7023-27-1",
    images: [
      "/attached_assets/\u05DB\u05DC \u05D1\u05D5 1_1757275910545.jpg",
      "/attached_assets/\u05DB\u05DC \u05D1\u05D5 2_1757280401418.jpg",
      "/attached_assets/2_1757275751756.jpg"
    ],
    variants: [
      {
        id: "medium-skai-3vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      "\u05D7\u05D9\u05E0\u05D5\u05DA \u05E0\u05E2\u05E8\u05D9\u05DD",
      "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DC\u05D1\u05E0\u05D9\u05DD \u05D9\u05E8\u05D0\u05D9 \u05D4\u05E9\u05DD",
      "\u05E2\u05DC \u05E9\u05DD \u05D4\u05E4\u05E1\u05D5\u05E7 \u05D1\u05D4\u05D5\u05E9\u05E2",
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD",
      "\u05D7\u05D2 \u05D4\u05E1\u05D5\u05DB\u05D5\u05EA"
    ],
    tags: ["\u05D7\u05D9\u05E0\u05D5\u05DA", "\u05E0\u05E2\u05E8\u05D9\u05DD", "\u05D1\u05E0\u05D9\u05DD", "\u05E1\u05D5\u05DB\u05D5\u05EA", "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "toda-vehodaa": {
    id: "toda-vehodaa",
    name: "\u05EA\u05D5\u05D3\u05D4 \u05D5\u05D4\u05D5\u05D3\u05D0\u05D4",
    nameEnglish: "Thanks and Gratitude",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: `\u05DE\u05DB\u05D9\u05DC \u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E2\u05DC \u05DE\u05E2\u05DC\u05EA \u05D4\u05EA\u05D5\u05D3\u05D4 \u05D5\u05D4\u05D4\u05D5\u05D3\u05D0\u05D4 \u05DC\u05D4\u05E9\u05DD \u05D9\u05EA\u05D1\u05E8\u05DA \u05E9\u05D1\u05DB\u05D5\u05D7\u05DD \u05DC\u05D4\u05D5\u05E6\u05D9\u05D0 \u05D0\u05EA \u05D4\u05D0\u05D3\u05DD \u05DE\u05E6\u05E8\u05D4 \u05DC\u05E8\u05D5\u05D5\u05D7\u05D4. \u05DE\u05D9\u05D5\u05E1\u05D3 \u05D1\u05E2\u05D9\u05E7\u05E8 \u05E2\u05DC \u05D4\u05EA\u05D5\u05E8\u05D4 '\u05D9\u05DE\u05D9 \u05D7\u05E0\u05D5\u05DB\u05D4 \u05D4\u05DD \u05D9\u05DE\u05D9 \u05D4\u05D5\u05D3\u05D0\u05D4' \u05D4\u05DE\u05D5\u05D1\u05D0\u05EA \u05D1\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05D7\u05DC\u05E7 \u05E9\u05E0\u05D9.`,
    descriptionEnglish: "Contains a collection from all of Rabbenu and Rabbi Nathan's books about the excellence of thanks and gratitude to God, which have the power to bring a person from distress to relief.",
    category: "\u05DE\u05D5\u05E2\u05D3\u05D9 \u05D4\u05E9\u05E0\u05D4",
    subcategory: "\u05D7\u05E0\u05D5\u05DB\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 220,
    isbn: "978-965-7023-28-8",
    images: [
      "/attached_assets/\u05EA\u05D5\u05D3\u05D4 \u05D5\u05D4\u05D5\u05D3\u05D0\u05D4 1_1757281336534.jpg",
      "/attached_assets/\u05EA\u05D5\u05D3\u05D4 \u05D5\u05D4\u05D5\u05D3\u05D0\u05D4 2_1757281336535.jpg",
      "/attached_assets/\u05EA\u05D5\u05D3\u05D4 \u05D5\u05D4\u05D5\u05D3\u05D0\u05D4 3_1757281336535.jpg"
    ],
    variants: [
      {
        id: "medium-skai-2vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05DB\u05D5\u05DC\u05DC \u05D4\u05D3\u05DC\u05E7\u05EA \u05E0\u05E8\u05D5\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 2,
        price: 60,
        inStock: true,
        stockQuantity: 22
      }
    ],
    features: [
      "\u05DE\u05E2\u05DC\u05EA \u05D4\u05EA\u05D5\u05D3\u05D4 \u05D5\u05D4\u05D4\u05D5\u05D3\u05D0\u05D4",
      "\u05D9\u05DE\u05D9 \u05D7\u05E0\u05D5\u05DB\u05D4 \u05D4\u05DD \u05D9\u05DE\u05D9 \u05D4\u05D5\u05D3\u05D0\u05D4",
      "\u05DC\u05D4\u05D5\u05E6\u05D9\u05D0 \u05DE\u05E6\u05E8\u05D4 \u05DC\u05E8\u05D5\u05D5\u05D7\u05D4",
      "\u05DB\u05D5\u05DC\u05DC \u05D4\u05D3\u05DC\u05E7\u05EA \u05E0\u05E8\u05D5\u05EA",
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD"
    ],
    tags: ["\u05D7\u05E0\u05D5\u05DB\u05D4", "\u05EA\u05D5\u05D3\u05D4", "\u05D4\u05D5\u05D3\u05D0\u05D4", "\u05D4\u05D3\u05DC\u05E7\u05EA \u05E0\u05E8\u05D5\u05EA", "\u05D9\u05E9\u05D5\u05E2\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "hatchalat-hathchlatot": {
    id: "hatchalat-hathchlatot",
    name: "\u05D4\u05EA\u05D7\u05DC\u05EA \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA",
    nameEnglish: "Beginning of Beginnings",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '"\u05D5\u05E2\u05DB\u05E9\u05D9\u05D5 - \u05DB\u05DC \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA \u05DE\u05E4\u05D5\u05E8\u05D9\u05DD" \u05D2\u05D9\u05DC\u05D4 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF (\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05E2\u05D3). \u05D4\u05E1\u05E4\u05E8 \u05DE\u05DB\u05D9\u05DC \u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E2\u05DC \u05DE\u05E2\u05DC\u05EA \u05D5\u05E7\u05D3\u05D5\u05E9\u05EA \u05D9\u05D5\u05DD \u05D4\u05E4\u05D5\u05E8\u05D9\u05DD, \u05E9\u05D4\u05D5\u05D0 \u05D4\u05D4\u05EA\u05D7\u05DC\u05D4 \u05E9\u05DC \u05DB\u05DC \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA. \u05DB\u05D5\u05DC\u05DC \u05DE\u05D2\u05D9\u05DC\u05EA \u05D0\u05E1\u05EA\u05E8, \u05D1\u05DE\u05D4\u05D3\u05D5\u05E8\u05D4 \u05DE\u05D0\u05D9\u05E8\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD.',
    descriptionEnglish: `"And now - all beginnings are from Purim" revealed our holy Rebbe Nachman. The book contains a collection from all of Rabbenu and Rabbi Nathan's books about the excellence and holiness of Purim day.`,
    category: "\u05DE\u05D5\u05E2\u05D3\u05D9 \u05D4\u05E9\u05E0\u05D4",
    subcategory: "\u05E4\u05D5\u05E8\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 380,
    isbn: "978-965-7023-29-5",
    images: [
      "/attached_assets/\u05D4\u05EA\u05D7\u05DC\u05EA \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA 1_1757275250997.jpg",
      "/attached_assets/\u05D4\u05EA\u05D7\u05DC\u05EA \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA 2_1757275250998.jpg",
      "/attached_assets/\u05D4\u05EA\u05D7\u05DC\u05EA \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA 3_1757275250998.jpg"
    ],
    variants: [
      {
        id: "medium-skai-4vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05DB\u05D5\u05DC\u05DC \u05DE\u05D2\u05D9\u05DC\u05EA \u05D0\u05E1\u05EA\u05E8",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 4,
        price: 120,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      "\u05DB\u05DC \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA \u05DE\u05E4\u05D5\u05E8\u05D9\u05DD",
      "\u05D4\u05D4\u05EA\u05D7\u05DC\u05D4 \u05E9\u05DC \u05DB\u05DC \u05D4\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA",
      "\u05DB\u05D5\u05DC\u05DC \u05DE\u05D2\u05D9\u05DC\u05EA \u05D0\u05E1\u05EA\u05E8 \u05DE\u05D0\u05D9\u05E8\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD",
      "\u05E7\u05D3\u05D5\u05E9\u05EA \u05D9\u05D5\u05DD \u05D4\u05E4\u05D5\u05E8\u05D9\u05DD",
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5"
    ],
    tags: ["\u05E4\u05D5\u05E8\u05D9\u05DD", "\u05D4\u05EA\u05D7\u05DC\u05D5\u05EA", "\u05DE\u05D2\u05D9\u05DC\u05EA \u05D0\u05E1\u05EA\u05E8", "\u05E9\u05DE\u05D7\u05D4", "\u05E7\u05D3\u05D5\u05E9\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "hitgalut-hadaat": {
    id: "hitgalut-hadaat",
    name: "\u05D4\u05EA\u05D2\u05DC\u05D5\u05EA \u05D4\u05D3\u05E2\u05EA",
    nameEnglish: "Revelation of Knowledge",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05DE\u05DB\u05D9\u05DC \u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E0\u05D7\u05DE\u05DF \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E2\u05DC \u05DE\u05E2\u05DC\u05EA \u05D5\u05E7\u05D3\u05D5\u05E9\u05EA \u05D7\u05D2 \u05D4\u05E4\u05E1\u05D7, \u05E9\u05D1\u05D5 \u05DE\u05EA\u05D2\u05DC\u05D4 \u05D0\u05D5\u05E8\u05D5 \u05E9\u05DC \u05D4\u05E8\u05D5\u05E2\u05D4 \u05D4\u05E0\u05D0\u05DE\u05DF, \u05DE\u05E9\u05D4 \u05E8\u05D1\u05D9\u05E0\u05D5, \u05D4\u05D7\u05D5\u05D6\u05E8 \u05D5\u05DE\u05EA\u05D2\u05DC\u05D4 \u05D1\u05DB\u05DC \u05D3\u05D5\u05E8. \u05DB\u05D5\u05DC\u05DC \u05D4\u05D2\u05D3\u05D4 \u05E9\u05DC \u05E4\u05E1\u05D7 \u05DE\u05D0\u05D9\u05E8\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD.",
    descriptionEnglish: "Contains a collection from all of Rabbenu Nachman and his student Rabbi Nathan's books about the excellence and holiness of Passover, when the light of the faithful shepherd, Moses our teacher, is revealed anew in every generation.",
    category: "\u05DE\u05D5\u05E2\u05D3\u05D9 \u05D4\u05E9\u05E0\u05D4",
    subcategory: "\u05E4\u05E1\u05D7",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 420,
    isbn: "978-965-7023-30-1",
    images: [
      "/attached_assets/\u05D4\u05EA\u05D2\u05DC\u05D5\u05EA \u05D4\u05D3\u05E2\u05EA 1_1757275244732.jpg",
      "/attached_assets/\u05D4\u05EA\u05D2\u05DC\u05D5\u05EA \u05D4\u05D3\u05E2\u05EA 2_1757275244733.jpg",
      "/attached_assets/\u05D4\u05EA\u05D2\u05DC\u05D5\u05EA \u05D4\u05D3\u05E2\u05EA 3_1757275244733.jpg",
      "/attached_assets/\u05D4\u05EA\u05D2\u05DC\u05D5\u05EA \u05D4\u05D3\u05E2\u05EA 4_1757275244733.jpg"
    ],
    variants: [
      {
        id: "medium-skai-5vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05DB\u05D5\u05DC\u05DC \u05D4\u05D2\u05D3\u05D4 \u05E9\u05DC \u05E4\u05E1\u05D7",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 5,
        price: 150,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      "\u05D4\u05EA\u05D2\u05DC\u05D5\u05EA \u05DE\u05E9\u05D4 \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05E7\u05D3\u05D5\u05E9\u05EA \u05D7\u05D2 \u05D4\u05E4\u05E1\u05D7",
      "\u05DB\u05D5\u05DC\u05DC \u05D4\u05D2\u05D3\u05D4 \u05E9\u05DC \u05E4\u05E1\u05D7 \u05DE\u05D0\u05D9\u05E8\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD",
      "\u05D4\u05E8\u05D5\u05E2\u05D4 \u05D4\u05E0\u05D0\u05DE\u05DF",
      "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF"
    ],
    tags: ["\u05E4\u05E1\u05D7", "\u05D4\u05D2\u05D3\u05D4", "\u05DE\u05E9\u05D4 \u05E8\u05D1\u05D9\u05E0\u05D5", "\u05D4\u05EA\u05D2\u05DC\u05D5\u05EA", "\u05D7\u05D9\u05E8\u05D5\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "otzer-hayirah": {
    id: "otzer-hayirah",
    name: "\u05D0\u05D5\u05E6\u05E8 \u05D4\u05D9\u05E8\u05D0\u05D4",
    nameEnglish: "Treasury of Fear of Heaven",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: `\u05E0\u05E7\u05E8\u05D0 \u05D1\u05DE\u05E7\u05D5\u05E8: \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA \u05D7\u05D3\u05E9. \u05EA\u05D5\u05DB\u05DF \u05D4\u05E1\u05E4\u05E8: \u05DC\u05D9\u05E7\u05D5\u05D8 \u05D5\u05E7\u05D9\u05E6\u05D5\u05E8 \u05DE\u05E1\u05E4\u05E8\u05D9 '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA' \u05DC\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05D6\u05E6"\u05DC, \u05DC\u05D4\u05D5\u05E6\u05D9\u05D0 \u05DE\u05D4\u05DD \u05D0\u05EA \u05DB\u05DC \u05D4\u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05EA\u05D1\u05D0\u05E8\u05D9\u05DD \u05D1\u05D3\u05E8\u05D5\u05E9\u05D9\u05D5 \u05D4\u05D0\u05E8\u05D5\u05DB\u05D9\u05DD \u05DC\u05E2\u05D5\u05D1\u05D3\u05D4 \u05D5\u05DC\u05DE\u05E2\u05E9\u05D4. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05D7\u05D5\u05DC\u05E7 \u05DC\u05D0\u05E8\u05D1\u05E2\u05D4 \u05D7\u05DC\u05E7\u05D9\u05DD: \u05D0\u05DE\u05EA \u05D5\u05E6\u05D3\u05E7. \u05DB\u05E0\u05E1\u05EA \u05E7\u05D4\u05DC \u05E6\u05D1\u05D0\u05D5\u05EA. \u05EA\u05E9\u05D5\u05D1\u05EA \u05D4\u05E9\u05E0\u05D4. \u05E2\u05E6\u05EA \u05E9\u05DC\u05D5\u05DD.`,
    descriptionEnglish: `Originally called: New Likutei Etzot. A collection and summary from Rabbi Nathan's "Likutei Halakhot" books, extracting all the practical advice from his lengthy discourses.`,
    category: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9\u05DD",
    subcategory: "\u05E2\u05E6\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 850,
    isbn: "978-965-7023-31-8",
    images: [
      "/attached_assets/\u05D0\u05D5\u05E6\u05E8 \u05D4\u05D9\u05E8\u05D0\u05D4 1_1757275234154.jpg",
      "/attached_assets/\u05D0\u05D5\u05E6\u05E8 \u05D4\u05D9\u05E8\u05D0\u05D4 2_1757275234155.jpg",
      "/attached_assets/\u05D0\u05D5\u05E6\u05E8 \u05D4\u05D9\u05E8\u05D0\u05D4 3_1757275234155.jpg",
      "/attached_assets/\u05D0\u05D5\u05E6\u05E8 \u05D4\u05D9\u05E8\u05D0\u05D4 4_1757275234156.jpg"
    ],
    variants: [
      {
        id: "large-skai-5vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 5,
        price: 200,
        inStock: true,
        stockQuantity: 10
      }
    ],
    features: [
      "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA \u05D7\u05D3\u05E9",
      "\u05DE\u05E1\u05E4\u05E8\u05D9 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA",
      "\u05E2\u05E6\u05D5\u05EA \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05DC\u05E2\u05D5\u05D1\u05D3\u05D4",
      "\u05D0\u05E8\u05D1\u05E2\u05D4 \u05D7\u05DC\u05E7\u05D9\u05DD \u05E2\u05D9\u05E7\u05E8\u05D9\u05D9\u05DD",
      "\u05D7\u05D5\u05D1\u05E8 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF"
    ],
    tags: ["\u05D9\u05E8\u05D0\u05EA \u05E9\u05DE\u05D9\u05DD", "\u05E2\u05E6\u05D5\u05EA", "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9\u05DD", "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF", "\u05D4\u05DC\u05DB\u05D5\u05EA"],
    isActive: true,
    isFeatured: true
  },
  "chumash-likutei-halakhot": {
    id: "chumash-likutei-halakhot",
    name: "\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA",
    nameEnglish: "Pentateuch with Likutei Halakhot",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05E1\u05D8 \u05D7\u05DE\u05D9\u05E9\u05D4 \u05D7\u05D5\u05DE\u05E9\u05D9 \u05EA\u05D5\u05E8\u05D4 \u05D1\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05DE\u05D0\u05D9\u05E8\u05D5\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD, \u05DB\u05D5\u05DC\u05DC \u05D1\u05EA\u05D5\u05DB\u05D5 \u05EA\u05E8\u05D2\u05D5\u05DD \u05D0\u05D5\u05E0\u05E7\u05DC\u05D5\u05E1 \u05D5\u05E4\u05D9\u05E8\u05D5\u05E9 \u05E8\u05E9"\u05D9, \u05D1\u05EA\u05D5\u05E1\u05E4\u05EA \u05DC\u05D9\u05E7\u05D5\u05D8 \u05E0\u05E4\u05DC\u05D0 \u05DE\u05DE\u05E9\u05E0\u05EA\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D6\u05D9\u05E2"\u05D0 \u05E2\u05DC \u05D4\u05E4\u05E8\u05E9\u05D4, \u05DE\u05E1\u05E4\u05E8 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u05DC\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D6\u05E6"\u05DC. \u05E2\u05E8\u05D5\u05DA \u05D5\u05DE\u05E1\u05D5\u05D3\u05E8 \u05E2\u05DC \u05D4\u05D3\u05E3, \u05D1\u05E6\u05D5\u05E8\u05D4 \u05E0\u05D5\u05D7\u05D4 \u05D5\u05E7\u05DC\u05D4 \u05DC\u05DC\u05DE\u05D9\u05D3\u05D4.',
    descriptionEnglish: "Set of five Torah volumes with illuminating letters, including Onkelos translation and Rashi commentary, plus a wonderful collection from Rabbi Nachman's teachings on the weekly portion, from Likutei Halakhot by Rabbi Nathan.",
    category: '\u05D7\u05D5\u05DE\u05E9\u05D9\u05DD \u05D5\u05EA\u05E0"\u05DA',
    subcategory: "\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05E4\u05D9\u05E8\u05D5\u05E9\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 1250,
    isbn: "978-965-7023-32-5",
    images: [
      "/attached_assets/\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9 1_1757275732701.jpg",
      "/attached_assets/\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9 2_1757275732701.jpg",
      "/attached_assets/\u05D7\u05D5\u05DE\u05E9 \u05E2\u05DD \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9 3_1757275732702.jpg"
    ],
    variants: [
      {
        id: "large-skai-5vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 5,
        price: 175,
        inStock: true,
        stockQuantity: 12
      },
      {
        id: "large-leather-5vol",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8 \u05D7\u05D5\u05DD",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 5,
        price: 225,
        inStock: true,
        stockQuantity: 8
      },
      {
        id: "medium-skai-5vol",
        format: "\u05E1\u05E7\u05D0\u05D9 \u05E2\u05DD \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05E9\u05D1\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 5,
        price: 150,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: "medium-leather-5vol",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 5,
        price: 175,
        inStock: true,
        stockQuantity: 10
      }
    ],
    features: [
      "\u05D7\u05DE\u05D9\u05E9\u05D4 \u05D7\u05D5\u05DE\u05E9\u05D9 \u05EA\u05D5\u05E8\u05D4",
      "\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05DE\u05D0\u05D9\u05E8\u05D5\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD",
      '\u05EA\u05E8\u05D2\u05D5\u05DD \u05D0\u05D5\u05E0\u05E7\u05DC\u05D5\u05E1 \u05D5\u05E8\u05E9"\u05D9',
      "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA \u05E2\u05DC \u05D4\u05E4\u05E8\u05E9\u05D4",
      "\u05E2\u05E8\u05D5\u05DA \u05D5\u05DE\u05E1\u05D5\u05D3\u05E8 \u05D1\u05E0\u05D5\u05D7\u05D5\u05EA"
    ],
    tags: ["\u05D7\u05D5\u05DE\u05E9", "\u05EA\u05D5\u05E8\u05D4", "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA", '\u05E8\u05E9"\u05D9', "\u05E4\u05E8\u05E9\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "kol-bo-leyeshuot": {
    id: "kol-bo-leyeshuot",
    name: "\u05DB\u05DC \u05D1\u05D5 \u05DC\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA",
    nameEnglish: "Kol Bo Leyeshuot",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05DB\u05E9\u05DE\u05D5 \u05DB\u05DF \u05D4\u05D5\u05D0. \u05DE\u05DB\u05D9\u05DC: \u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9, \u05EA\u05D9\u05E7\u05D5\u05DF \u05D7\u05E6\u05D5\u05EA, \u05DE\u05E0\u05D7\u05D4 \u05D5\u05E2\u05E8\u05D1\u05D9\u05EA, \u05E9\u05D9\u05E8 \u05D4\u05E9\u05D9\u05E8\u05D9\u05DD, \u05D0\u05DE\u05D9\u05E8\u05D5\u05EA \u05DC\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA, \u05D0\u05D5\u05E8 \u05E1\u05D2\u05D5\u05DC\u05D5\u05EA, \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DC\u05E7\u05D1\u05E8\u05D9 \u05E6\u05D3\u05D9\u05E7\u05D9\u05DD, \u05D5\u05E2\u05D5\u05D3. \u05D1\u05D4\u05D5\u05E6\u05D0\u05D4 \u05DE\u05D4\u05D5\u05D3\u05E8\u05EA \u05D5\u05DE\u05E4\u05D5\u05D0\u05E8\u05EA \u05D1\u05DB\u05E8\u05D9\u05DB\u05EA \u05E2\u05D5\u05E8 \u05D0\u05DE\u05D9\u05EA\u05D9 \u05DE\u05E9\u05D5\u05D1\u05D7.",
    descriptionEnglish: "As its name suggests, it contains everything for salvation: Tikkun HaKlali, Tikkun Chatzot, afternoon and evening prayers, Song of Songs, recitations for salvation, segulot, prayers for graves of tzaddikim, and more.",
    category: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D5\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA",
    subcategory: "\u05D0\u05D5\u05E1\u05E3 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 400,
    isbn: "978-965-7023-33-2",
    images: [
      "/attached_assets/\u05DB\u05DC \u05D1\u05D5 1_1757275910545.jpg",
      "/attached_assets/\u05DB\u05DC \u05D1\u05D5 1_1757278339720.jpg",
      "/attached_assets/\u05DB\u05DC \u05D1\u05D5 2_1757280401418.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: "medium-genuine-leather",
        format: "\u05E2\u05D5\u05E8 \u05D0\u05DE\u05D9\u05EA\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 80,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: "medium-leather-like",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 50,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "small-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 50
      },
      {
        id: "small-nylon",
        format: "\u05E8\u05DA \u05E0\u05D9\u05DC\u05D5\u05DF",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 70
      }
    ],
    features: [
      "\u05DB\u05DC \u05DE\u05D4 \u05E9\u05E6\u05E8\u05D9\u05DA \u05DC\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA",
      "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9 \u05D5\u05EA\u05D9\u05E7\u05D5\u05DF \u05D7\u05E6\u05D5\u05EA",
      "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DC\u05E7\u05D1\u05E8\u05D9 \u05E6\u05D3\u05D9\u05E7\u05D9\u05DD",
      "\u05D0\u05DE\u05D9\u05E8\u05D5\u05EA \u05D5\u05E1\u05D2\u05D5\u05DC\u05D5\u05EA",
      "\u05DB\u05E8\u05D9\u05DB\u05EA \u05E2\u05D5\u05E8 \u05D0\u05DE\u05D9\u05EA\u05D9 \u05DE\u05E9\u05D5\u05D1\u05D7"
    ],
    tags: ["\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA", "\u05EA\u05D9\u05E7\u05D5\u05DF", "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA", "\u05E1\u05D2\u05D5\u05DC\u05D5\u05EA", "\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD"],
    isActive: true,
    isFeatured: true
  },
  "tikkun-haklali": {
    id: "tikkun-haklali",
    name: "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9",
    nameEnglish: "Tikkun HaKlali",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05E2\u05E9\u05E8\u05EA \u05D4\u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD \u05E9\u05D2\u05D9\u05DC\u05D4 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DC\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05D1\u05E8\u05D9\u05EA. \u05D1\u05DE\u05D4\u05D3\u05D5\u05E8\u05EA \u05D4\u05E7\u05E8\u05DF \u05DE\u05D5\u05E4\u05D9\u05E2 \u05DB\u05DC \u05E4\u05E1\u05D5\u05E7 \u05D1\u05E4\u05E0\u05D9 \u05E2\u05E6\u05DE\u05D5 \u05D1\u05D2\u05D5\u05D3\u05DC \u05DE\u05D0\u05D9\u05E8 \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD, \u05DC\u05E4\u05D9 \u05D4\u05D5\u05E8\u05D0\u05EA\u05D5 \u05D5\u05E8\u05E6\u05D5\u05E0\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8 \u05D6\u05E6"\u05DC. \u05E7\u05D9\u05D9\u05DD \u05D1\u05E9\u05DC\u05D5\u05E9\u05D4 \u05D2\u05D3\u05DC\u05D9\u05DD, \u05DC\u05E4\u05D9 \u05D1\u05D7\u05D9\u05E8\u05D4.',
    descriptionEnglish: "The ten psalms that our holy Rebbe Nachman revealed for rectifying the covenant. In the Keren edition, each verse appears separately in illuminating size, according to the instruction and wish of Rabbi Israel Dov Odesser.",
    category: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D5\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA",
    subcategory: "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 80,
    isbn: "978-965-7023-34-9",
    images: [
      "/attached_assets/\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9_1757281158220.jpg"
    ],
    variants: [
      {
        id: "large-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 3,
        inStock: true,
        stockQuantity: 100
      },
      {
        id: "medium-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 2,
        inStock: true,
        stockQuantity: 150
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 1,
        inStock: true,
        stockQuantity: 200
      },
      {
        id: "small-gold-laminated",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05D6\u05D4\u05D1 \u05D0\u05DC \u05EA\u05D9\u05E8\u05D0",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 2,
        inStock: true,
        stockQuantity: 100
      },
      {
        id: "small-soft-leather",
        format: "\u05E2\u05D5\u05E8 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 18,
        inStock: true,
        stockQuantity: 40
      }
    ],
    features: [
      "\u05E2\u05E9\u05E8\u05EA \u05D4\u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD \u05D4\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD",
      "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05D1\u05E8\u05D9\u05EA",
      "\u05DB\u05DC \u05E4\u05E1\u05D5\u05E7 \u05D1\u05E4\u05E0\u05D9 \u05E2\u05E6\u05DE\u05D5",
      "\u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05DE\u05D0\u05D9\u05E8\u05D5\u05EA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD",
      "\u05DC\u05E4\u05D9 \u05E8\u05E6\u05D5\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8"
    ],
    tags: ["\u05EA\u05D9\u05E7\u05D5\u05DF", "\u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD", "\u05D1\u05E8\u05D9\u05EA", "\u05E7\u05D3\u05D5\u05E9\u05D4", "\u05D0\u05D5\u05D3\u05E1\u05E8"],
    isActive: true,
    isFeatured: true
  },
  "yekara-deshabbata": {
    id: "yekara-deshabbata",
    name: "\u05D9\u05E7\u05E8\u05D0 \u05D3\u05E9\u05D1\u05EA\u05D0",
    nameEnglish: "Yekara DeShabbata",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05D7\u05D5\u05D1\u05E8 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF. \u05EA\u05D5\u05DB\u05DF \u05D4\u05E1\u05E4\u05E8: \u05D2\u05D9\u05DC\u05D5\u05D9 \u05D4\u05E7\u05E9\u05E8 \u05D1\u05D9\u05DF \u05DE\u05D0\u05DE\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05D1"\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF", "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA" \u05D5"\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8"\u05DF", \u05DC\u05D9\u05E7\u05E8\u05EA \u05E7\u05D3\u05D5\u05E9\u05EA \u05E9\u05D1\u05EA. \u05D4\u05DE\u05D7\u05D1\u05E8 \u05DE\u05E6\u05D9\u05D9\u05DF: "\u05E9\u05DE\u05E2\u05EA\u05D9 \u05D1\u05E9\u05DD \u05D2\u05D3\u05D5\u05DC\u05D9 \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD \u05E7\u05D3\u05DE\u05D5\u05E0\u05D9\u05DD \u05E9\u05D4\u05D9\u05D5 \u05DE\u05E4\u05DC\u05D9\u05D2\u05D9\u05DF \u05DE\u05D0\u05D5\u05D3 \u05D1\u05E7\u05D3\u05D5\u05E9\u05EA \u05EA\u05D5\u05E8\u05EA\u05D5 \u05D5\u05DE\u05D0\u05DE\u05E8\u05D9\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05D0\u05DE\u05E8\u05D5 \u05E2\u05DC\u05D9\u05D4\u05DD \u05D1\u05E4\u05D9\u05E8\u05D5\u05E9 \u05E9\u05D4\u05DD \u05D1\u05D1\u05D7\u05D9\u05E0\u05EA \u05E7\u05D3\u05D5\u05E9\u05EA \u05E9\u05D1\u05EA"',
    descriptionEnglish: "Composed by Rabbi Nachman of Tchehrin, student of Rabbi Nathan. The book reveals the connection between Rabbenu's teachings in Likutei Moharan, Tales, and Sichos HaRan to the holiness of Shabbat.",
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05D7\u05D2\u05D9\u05DD \u05D5\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 320,
    isbn: "978-965-7023-45-5",
    images: [
      "/attached_assets/\u05D9\u05E7\u05E8\u05D0 \u05D3\u05E9\u05D1\u05EA\u05D0 1_1757281125909.jpg",
      "/attached_assets/\u05D9\u05E7\u05E8\u05D0 \u05D3\u05E9\u05D1\u05EA\u05D0 2_1757281003112.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      "\u05E7\u05E9\u05E8 \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05DC\u05E9\u05D1\u05EA \u05E7\u05D5\u05D3\u05E9",
      "\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD \u05E2\u05DC \u05E7\u05D3\u05D5\u05E9\u05EA \u05E9\u05D1\u05EA",
      "\u05DE\u05D1\u05D5\u05E1\u05E1 \u05E2\u05DC \u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05DE\u05D7\u05D1\u05E8 \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05D2\u05D9\u05DC\u05D5\u05D9 \u05E2\u05D5\u05DE\u05E7 \u05D4\u05EA\u05D5\u05E8\u05D5\u05EA"
    ],
    tags: ["\u05E9\u05D1\u05EA", "\u05E7\u05D3\u05D5\u05E9\u05D4", "\u05EA\u05D5\u05E8\u05D5\u05EA", "\u05D7\u05D2\u05D9\u05DD", "\u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF"],
    isActive: true,
    isFeatured: true
  },
  "yareach-haeitanim": {
    id: "yareach-haeitanim",
    name: "\u05D9\u05E8\u05D7 \u05D4\u05D0\u05D9\u05EA\u05E0\u05D9\u05DD",
    nameEnglish: "Yareach HaEitanim",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05D7\u05D5\u05D1\u05E8 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF. \u05D1\u05E1\u05E4\u05E8 \u05D4\u05D5\u05D0 \u05DE\u05E8\u05D0\u05D4 \u05DB\u05D9\u05E6\u05D3 \u05D1\u05DB\u05DC \u05EA\u05D5\u05E8\u05D5\u05EA\u05D9\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05DB\u05DC\u05D5\u05DC \u05E2\u05E0\u05D9\u05DF \u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4, \u05D9\u05D5\u05DD \u05D4\u05DB\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD, \u05E1\u05D5\u05DB\u05D5\u05EA \u05D5\u05E9\u05DE\u05D9\u05E0\u05D9 \u05E2\u05E6\u05E8\u05EA. \u05D4\u05E9\u05DD "\u05D9\u05E8\u05D7 \u05D4\u05D0\u05D9\u05EA\u05E0\u05D9\u05DD" \u05D4\u05D5\u05D0 \u05DB\u05D9\u05E0\u05D5\u05D9 \u05DC\u05D7\u05D5\u05D3\u05E9 \u05EA\u05E9\u05E8\u05D9 \u05D1\u05D2\u05DE\u05E8\u05D0, \u05E2\u05DC \u05E9\u05DD \u05E9\u05D4\u05D5\u05D0 "\u05D0\u05D9\u05EA\u05DF \u05D1\u05DE\u05E6\u05D5\u05D5\u05EA". \u05D4\u05E1\u05E4\u05E8 \u05E0\u05D3\u05E4\u05E1 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E0\u05DB\u05D3 \u05D4\u05DE\u05D7\u05D1\u05E8 \u05E8\u05D1\u05D9 \u05D0\u05D1\u05E8\u05D4\u05DD \u05E9\u05D8\u05E8\u05E0\u05D4\u05D0\u05E8\u05E5 \u05DB\u05D5\u05DB\u05D1-\u05DC\u05D1.',
    descriptionEnglish: `Composed by Rabbi Nachman of Tchehrin. Shows how all of Rabbenu's teachings contain the concepts of Rosh Hashana, Yom Kippur, Sukkot and Shemini Atzeret. "Yareach HaEitanim" refers to the month of Tishrei.`,
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05D7\u05D2\u05D9\u05DD \u05D5\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 280,
    isbn: "978-965-7023-46-2",
    images: [
      "/attached_assets/3_1757275751756.jpg",
      "/attached_assets/\u05D4\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05E9\u05DC\u05D9 3_1757275239935.jpg",
      "/attached_assets/\u05D0\u05D5\u05D9\u05E8\u05D4_1757280778285.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 25
      }
    ],
    features: [
      "\u05D7\u05D5\u05D3\u05E9 \u05EA\u05E9\u05E8\u05D9 \u05D4\u05DE\u05E7\u05D5\u05D3\u05E9",
      "\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05D5\u05D9\u05D5\u05DD \u05DB\u05D9\u05E4\u05D5\u05E8",
      "\u05E1\u05D5\u05DB\u05D5\u05EA \u05D5\u05E9\u05DE\u05D9\u05E0\u05D9 \u05E2\u05E6\u05E8\u05EA",
      "\u05D0\u05D9\u05EA\u05DF \u05D1\u05DE\u05E6\u05D5\u05D5\u05EA",
      "\u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E2\u05DC \u05D4\u05D7\u05D2\u05D9\u05DD"
    ],
    tags: ["\u05EA\u05E9\u05E8\u05D9", "\u05D7\u05D2\u05D9\u05DD", "\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4", "\u05D9\u05D5\u05DD \u05DB\u05D9\u05E4\u05D5\u05E8", "\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD"],
    isActive: true,
    isFeatured: false
  },
  "maafer-lefaar": {
    id: "maafer-lefaar",
    name: "\u05DE\u05D0\u05E4\u05E8 \u05DC\u05E4\u05D0\u05E8",
    nameEnglish: "Me'Afer LeFa'ar",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05E2\u05DC \u05D9\u05DE\u05D9 \u05D1\u05D9\u05DF \u05D4\u05DE\u05E6\u05E8\u05D9\u05DD, \u05D1\u05D4\u05DD \u05D0\u05E0\u05D5 \u05DE\u05D1\u05D9\u05E2\u05D9\u05DD \u05D2\u05E2\u05D2\u05D5\u05E2\u05D9\u05E0\u05D5 \u05D5\u05EA\u05E9\u05D5\u05E7\u05EA\u05E0\u05D5 \u05DC\u05D2\u05D0\u05D5\u05DC\u05D4 \u05D5\u05DC\u05D1\u05E0\u05D9\u05D9\u05DF \u05D1\u05D9\u05EA \u05D4\u05DE\u05E7\u05D3\u05E9, \u05E2\u05DC \u05E9\u05DD \u05D4\u05E4\u05E1\u05D5\u05E7: "\u05DC\u05E9\u05D5\u05DD \u05DC\u05D0\u05D1\u05DC\u05D9 \u05E6\u05D9\u05D5\u05DF, \u05DC\u05EA\u05EA \u05DC\u05D4\u05DD \u05E4\u05D0\u05E8 \u05EA\u05D7\u05EA \u05D0\u05E4\u05E8" (\u05D9\u05E9\u05E2\u05D9\u05D4). \u05E1\u05E4\u05E8 \u05DE\u05D9\u05D5\u05D7\u05D3 \u05DC\u05D9\u05DE\u05D9 \u05D4\u05E6\u05D5\u05DD \u05D5\u05D4\u05D0\u05D1\u05DC\u05D5\u05EA \u05E9\u05DE\u05D7\u05D6\u05E7 \u05D1\u05EA\u05E7\u05D5\u05D5\u05D4 \u05D5\u05D1\u05D0\u05DE\u05D5\u05E0\u05D4.',
    descriptionEnglish: `Collection from Rabbenu and Rabbi Nathan's books about the Three Weeks period, expressing our longing for redemption and rebuilding the Temple, based on the verse "to give them beauty for ashes" (Isaiah).`,
    category: "\u05D7\u05D2\u05D9\u05DD \u05D5\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD",
    subcategory: "\u05D1\u05D9\u05DF \u05D4\u05DE\u05E6\u05E8\u05D9\u05DD",
    author: "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 240,
    isbn: "978-965-7023-47-9",
    images: [
      "/attached_assets/\u05DE\u05D0\u05E4\u05E8 \u05DC\u05E4\u05D0\u05E8 1.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 30
      }
    ],
    features: [
      "\u05D9\u05DE\u05D9 \u05D1\u05D9\u05DF \u05D4\u05DE\u05E6\u05E8\u05D9\u05DD",
      "\u05D2\u05E2\u05D2\u05D5\u05E2\u05D9\u05DD \u05DC\u05D2\u05D0\u05D5\u05DC\u05D4",
      "\u05D1\u05E0\u05D9\u05D9\u05DF \u05D1\u05D9\u05EA \u05D4\u05DE\u05E7\u05D3\u05E9",
      "\u05D7\u05D9\u05D6\u05D5\u05E7 \u05D1\u05D0\u05DE\u05D5\u05E0\u05D4",
      "\u05E4\u05D0\u05E8 \u05EA\u05D7\u05EA \u05D0\u05E4\u05E8"
    ],
    tags: ["\u05D1\u05D9\u05DF \u05D4\u05DE\u05E6\u05E8\u05D9\u05DD", "\u05D2\u05D0\u05D5\u05DC\u05D4", "\u05D1\u05D9\u05EA \u05D4\u05DE\u05E7\u05D3\u05E9", "\u05D0\u05D1\u05DC\u05D5\u05EA", "\u05EA\u05E7\u05D5\u05D5\u05D4"],
    isActive: true,
    isFeatured: false
  },
  "mem-tet-shaarim": {
    id: "mem-tet-shaarim",
    name: "\u05DE\u05D8' \u05E9\u05E2\u05E8\u05D9\u05DD",
    nameEnglish: "Mem-Tet Sha'arim",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E2\u05DC \u05E7\u05D3\u05D5\u05E9\u05EA \u05D9\u05DE\u05D9 \u05E1\u05E4\u05D9\u05E8\u05EA \u05D4\u05E2\u05D5\u05DE\u05E8 \u05E9\u05D1\u05D9\u05DF \u05E4\u05E1\u05D7 \u05DC\u05D7\u05D2 \u05D4\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA, \u05D5\u05E2\u05E0\u05D9\u05D9\u05E0\u05D9\u05DD \u05D4\u05E7\u05E9\u05D5\u05E8\u05D9\u05DD \u05DC\u05D9\u05DE\u05D9\u05DD \u05D0\u05DC\u05D5. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05E8\u05D0\u05D4 \u05D0\u05EA \u05D4\u05E2\u05D5\u05DE\u05E7 \u05D4\u05E8\u05D5\u05D7\u05E0\u05D9 \u05E9\u05DC \u05E1\u05E4\u05D9\u05E8\u05EA \u05D4\u05E2\u05D5\u05DE\u05E8 \u05DB\u05D4\u05DB\u05E0\u05D4 \u05DC\u05E7\u05D1\u05DC\u05EA \u05D4\u05EA\u05D5\u05E8\u05D4, \u05D5\u05DE\u05D1\u05D0\u05E8 \u05D0\u05EA \u05DE\u05E2\u05DC\u05EA \u05DB\u05DC \u05D9\u05D5\u05DD \u05D5\u05D9\u05D5\u05DD \u05D1\u05E1\u05E4\u05D9\u05E8\u05D4 \u05E2\u05DC \u05E4\u05D9 \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5.",
    descriptionEnglish: "Collection from Rabbenu's books about the holiness of the Counting of the Omer period between Passover and Shavuot, and matters related to these days. Shows the spiritual depth of counting as preparation for receiving the Torah.",
    category: "\u05D7\u05D2\u05D9\u05DD \u05D5\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD",
    subcategory: "\u05E1\u05E4\u05D9\u05E8\u05EA \u05D4\u05E2\u05D5\u05DE\u05E8",
    author: "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 320,
    isbn: "978-965-7023-48-6",
    images: [
      "/attached_assets/\u05DE\u05D8 \u05E9\u05E2\u05E8\u05D9\u05DD 1_1757275840464.jpg",
      "/attached_assets/\u05DE\u05D8 \u05E9\u05E2\u05E8\u05D9\u05DD 2_1757275840465.jpg",
      "/attached_assets/\u05DE\u05D8 \u05E9\u05E2\u05E8\u05D9\u05DD 3_1757275840465.jpg",
      "/attached_assets/\u05DE\u05D8 \u05E9\u05E2\u05E8\u05D9\u05DD 4_1757275840466.jpg"
    ],
    variants: [
      {
        id: "medium-skai-2vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 2,
        price: 60,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      "\u05E1\u05E4\u05D9\u05E8\u05EA \u05D4\u05E2\u05D5\u05DE\u05E8",
      "\u05D4\u05DB\u05E0\u05D4 \u05DC\u05E7\u05D1\u05DC\u05EA \u05D4\u05EA\u05D5\u05E8\u05D4",
      '\u05DE"\u05D8 \u05E9\u05E2\u05E8\u05D9 \u05D1\u05D9\u05E0\u05D4',
      "\u05E7\u05D3\u05D5\u05E9\u05EA \u05D4\u05D9\u05DE\u05D9\u05DD",
      "\u05E2\u05D5\u05DE\u05E7 \u05E8\u05D5\u05D7\u05E0\u05D9"
    ],
    tags: ["\u05E1\u05E4\u05D9\u05E8\u05EA \u05D4\u05E2\u05D5\u05DE\u05E8", "\u05EA\u05D5\u05E8\u05D4", "\u05E7\u05D1\u05DC\u05D4", "\u05D1\u05D9\u05E0\u05D4", "\u05E7\u05D3\u05D5\u05E9\u05D4"],
    isActive: true,
    isFeatured: false
  },
  "sod-harashbi": {
    id: "sod-harashbi",
    name: '\u05E1\u05D5\u05D3 \u05D4\u05E8\u05E9\u05D1"\u05D9',
    nameEnglish: "Sod HaRashbi",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05D1\u05DE\u05E2\u05DC\u05EA \u05D4\u05EA\u05E0\u05D0 \u05D4\u05D0\u05DC\u05D5\u05E7\u05D9 \u05E8\u05D1\u05D9 \u05E9\u05DE\u05E2\u05D5\u05DF \u05D1\u05E8 \u05D9\u05D5\u05D7\u05D0\u05D9 \u05D5\u05D1\u05DE\u05E2\u05DC\u05EA \u05D9\u05D5\u05DD \u05D4\u05D4\u05D9\u05DC\u05D5\u05DC\u05D0 \u05E9\u05DC\u05D5 \u05D1\u05DC"\u05D2 \u05D1\u05E2\u05D5\u05DE\u05E8. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05D2\u05DC\u05D4 \u05D0\u05EA \u05D4\u05E7\u05E9\u05E8 \u05D4\u05E2\u05DE\u05D5\u05E7 \u05D1\u05D9\u05DF \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05DC\u05D1\u05D9\u05DF \u05E7\u05D3\u05D5\u05E9\u05EA\u05D5 \u05E9\u05DC \u05E8\u05E9\u05D1"\u05D9, \u05D5\u05D0\u05EA \u05DE\u05E2\u05DC\u05EA \u05D9\u05D5\u05DD \u05DC"\u05D2 \u05D1\u05E2\u05D5\u05DE\u05E8 \u05DB\u05D9\u05D5\u05DD \u05E9\u05DC \u05E9\u05DE\u05D7\u05D4 \u05D5\u05D7\u05D3\u05D5\u05D5\u05D4.',
    descriptionEnglish: "Collection from Rabbenu and Rabbi Nathan's books about the greatness of the divine Tanna Rabbi Shimon bar Yochai and the merit of his hillula on Lag Ba'Omer. Reveals the deep connection between Rabbenu's teachings and Rashbi's holiness.",
    category: "\u05D7\u05D2\u05D9\u05DD \u05D5\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD",
    subcategory: "\u05DC\u05D2 \u05D1\u05E2\u05D5\u05DE\u05E8",
    author: "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 220,
    isbn: "978-965-7023-49-3",
    images: [
      "/attached_assets/\u05E1\u05D5\u05D3 \u05D4\u05E8\u05E9\u05D1\u05D9 1_1757275910545.jpg",
      "/attached_assets/\u05E1\u05D5\u05D3 \u05D4\u05E8\u05E9\u05D1\u05D9 1_1757278339720.jpg",
      "/attached_assets/\u05E1\u05D5\u05D3 \u05D4\u05E8\u05E9\u05D1\u05D9 2_1757280401419.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      }
    ],
    features: [
      "\u05E8\u05D1\u05D9 \u05E9\u05DE\u05E2\u05D5\u05DF \u05D1\u05E8 \u05D9\u05D5\u05D7\u05D0\u05D9",
      "\u05DC\u05D2 \u05D1\u05E2\u05D5\u05DE\u05E8 \u05D4\u05D9\u05DC\u05D5\u05DC\u05D0",
      "\u05E1\u05D5\u05D3\u05D5\u05EA \u05D4\u05EA\u05D5\u05E8\u05D4",
      "\u05E9\u05DE\u05D7\u05D4 \u05D5\u05D7\u05D3\u05D5\u05D5\u05D4",
      "\u05E7\u05E9\u05E8 \u05DC\u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5"
    ],
    tags: ["\u05E8\u05E9\u05D1\u05D9", "\u05DC\u05D2 \u05D1\u05E2\u05D5\u05DE\u05E8", "\u05D4\u05D9\u05DC\u05D5\u05DC\u05D0", "\u05E7\u05D1\u05DC\u05D4", "\u05E9\u05DE\u05D7\u05D4"],
    isActive: true,
    isFeatured: false
  },
  "shaar-hachamishim": {
    id: "shaar-hachamishim",
    name: "\u05E9\u05E2\u05E8 \u05D4\u05D7\u05DE\u05D9\u05E9\u05D9\u05DD",
    nameEnglish: "Sha'ar HaChamishim",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05E2\u05DC \u05E7\u05D3\u05D5\u05E9\u05EA \u05D7\u05D2 \u05D4\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA \u05E9\u05D4\u05D5\u05D0 \u05DB\u05D9\u05D3\u05D5\u05E2 "\u05E9\u05E2\u05E8 \u05D4\u05D7\u05DE\u05D9\u05E9\u05D9\u05DD" \u05E9\u05DC \u05D4\u05E7\u05D3\u05D5\u05E9\u05D4, \u05DB\u05D5\u05DC\u05DC "\u05EA\u05D9\u05E7\u05D5\u05DF \u05DC\u05D9\u05DC \u05E9\u05D1\u05D5\u05E2\u05D5\u05EA" \u05D4\u05DE\u05E7\u05D5\u05D1\u05DC \u05DE\u05D4\u05D0\u05E8"\u05D9 \u05D6"\u05DC \u05D5\u05DE\u05D4\u05E9\u05DC"\u05D4 \u05D4\u05E7\u05D3\u05D5\u05E9. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05D2\u05DC\u05D4 \u05D0\u05EA \u05E2\u05D5\u05DE\u05E7 \u05E7\u05D3\u05D5\u05E9\u05EA \u05D7\u05D2 \u05DE\u05EA\u05DF \u05EA\u05D5\u05E8\u05D4 \u05D5\u05DE\u05E2\u05DC\u05EA \u05D4\u05DC\u05D9\u05DC\u05D4 \u05D4\u05E7\u05D3\u05D5\u05E9.',
    descriptionEnglish: `Collection from all of Rabbenu and Rabbi Nathan's books about the holiness of Shavuot, known as the "Fiftieth Gate" of holiness, including "Tikkun Leil Shavuot" from the Ari and Shelah. Reveals the depth of the Torah-giving holiday.`,
    category: "\u05D7\u05D2\u05D9\u05DD \u05D5\u05DE\u05D5\u05E2\u05D3\u05D9\u05DD",
    subcategory: "\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA",
    author: "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 380,
    isbn: "978-965-7023-50-9",
    images: [
      "/attached_assets/\u05E9\u05E2\u05E8 \u05D4\u05D7\u05DE\u05D9\u05E9\u05D9\u05DD 1_1757281267103.jpg",
      "/attached_assets/\u05E9\u05E2\u05E8 \u05D4\u05D7\u05DE\u05D9\u05E9\u05D9\u05DD 2_1757281267104.jpg"
    ],
    variants: [
      {
        id: "medium-skai-3vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      "\u05D7\u05D2 \u05D4\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA \u05E7\u05D3\u05D5\u05E9",
      "\u05E9\u05E2\u05E8 \u05D4\u05D7\u05DE\u05D9\u05E9\u05D9\u05DD",
      "\u05EA\u05D9\u05E7\u05D5\u05DF \u05DC\u05D9\u05DC \u05E9\u05D1\u05D5\u05E2\u05D5\u05EA",
      "\u05DE\u05EA\u05DF \u05EA\u05D5\u05E8\u05D4",
      '\u05D4\u05D0\u05E8"\u05D9 \u05D5\u05D4\u05E9\u05DC"\u05D4'
    ],
    tags: ["\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA", "\u05DE\u05EA\u05DF \u05EA\u05D5\u05E8\u05D4", "\u05EA\u05D9\u05E7\u05D5\u05DF \u05DC\u05D9\u05DC\u05D4", "\u05E7\u05D1\u05DC\u05D4", "\u05D7\u05DE\u05D9\u05E9\u05D9\u05DD"],
    isActive: true,
    isFeatured: false
  },
  "nachal-novea": {
    id: "nachal-novea",
    name: "\u05E0\u05D7\u05DC \u05E0\u05D5\u05D1\u05E2",
    nameEnglish: "Nachal Novea",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: `\u05E4\u05E8\u05E7\u05D9\u05DD \u05D1\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA \u05D7\u05D9\u05D9\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5, \u05D1\u05E6\u05D9\u05E8\u05D5\u05E3 \u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05E9\u05E1\u05D5\u05E4\u05E8\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05D5. \u05D9\u05E6\u05D0 \u05DC\u05D0\u05D5\u05E8 \u05D1\u05E9\u05E0\u05EA \u05EA\u05E9\u05DB"\u05D0 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E9\u05E8\u05D9\u05D3 \u05D4\u05E9\u05D5\u05D0\u05D4 \u05E8' \u05D9\u05E6\u05D7\u05E7 \u05D0\u05D9\u05D9\u05D6\u05D9\u05E7 \u05D6\u05D9\u05DC\u05D1\u05E8\u05DE\u05DF, \u05EA\u05DC\u05DE\u05D9\u05D3\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05DB\u05D9\u05DC \u05D7\u05D5\u05DE\u05E8 \u05E0\u05D3\u05D9\u05E8 \u05E2\u05DC \u05D7\u05D9\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05DE\u05E1\u05D5\u05E8\u05D5\u05EA \u05D0\u05DE\u05D9\u05EA\u05D9\u05D5\u05EA.`,
    descriptionEnglish: "Chapters in the life story of Rabbenu, with conversations and stories told by Rabbenu and his students. Published in 1961 by Holocaust survivor R. Yitzchak Eizik Zilberman, student of R. Yisrael Dov Odesser. Contains rare material about Rabbenu's life.",
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA",
    author: "\u05E8' \u05D9\u05E6\u05D7\u05E7 \u05D0\u05D9\u05D9\u05D6\u05D9\u05E7 \u05D6\u05D9\u05DC\u05D1\u05E8\u05DE\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 320,
    isbn: "978-965-7023-51-6",
    images: [
      "/attached_assets/\u05E0\u05D2'\u05DC \u05E0\u05D5\u05D1\u05E2_1757280778289.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "spanish",
        format: "\u05E1\u05E4\u05E8\u05D3\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 12
      }
    ],
    features: [
      "\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05E0\u05D3\u05D9\u05E8\u05D9\u05DD",
      "\u05DE\u05E1\u05D5\u05E8\u05D5\u05EA \u05D0\u05DE\u05D9\u05EA\u05D9\u05D5\u05EA",
      "\u05E9\u05E8\u05D9\u05D3 \u05D4\u05E9\u05D5\u05D0\u05D4",
      "\u05EA\u05DC\u05DE\u05D9\u05D3 \u05D0\u05D5\u05D3\u05E1\u05E8"
    ],
    tags: ["\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA", "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD", "\u05D0\u05D5\u05D3\u05E1\u05E8", "\u05D6\u05D9\u05DC\u05D1\u05E8\u05DE\u05DF", "\u05E0\u05D3\u05D9\u05E8"],
    isActive: true,
    isFeatured: false
  },
  "sichos-vehitorerut": {
    id: "sichos-vehitorerut",
    name: "\u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05D4\u05EA\u05E2\u05D5\u05E8\u05E8\u05D5\u05EA",
    nameEnglish: "Sichos VeHit'orrerut",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05DE\u05DB\u05D9\u05DC \u05D0\u05EA \u05D4\u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05D4\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05D5\u05D3\u05D1\u05E8\u05D9 \u05D4\u05D4\u05EA\u05E2\u05D5\u05E8\u05E8\u05D5\u05EA \u05D4\u05E9\u05D9\u05D9\u05DB\u05D9\u05DD \u05DC\u05DB\u05DC \u05DE\u05D0\u05DE\u05E8 \u05D5\u05DE\u05D0\u05DE\u05E8 \u05E9\u05D1\u05E1\u05E4\u05E8 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF, \u05D4\u05DE\u05D5\u05D1\u05D0\u05D9\u05DD \u05D1\u05E1\u05E4\u05E8\u05D9\u05DD "\u05D7\u05D9\u05D9 \u05D5\u05E9\u05D9\u05D7\u05D5\u05EA \u05DE\u05D5\u05D4\u05E8"\u05DF" "\u05D9\u05DE\u05D9 \u05DE\u05D5\u05D4\u05E8\u05E0"\u05EA" "\u05E2\u05DC\u05D9\u05DD \u05DC\u05EA\u05E8\u05D5\u05E4\u05D4". \u05E0\u05E1\u05D3\u05E8 \u05D5\u05E0\u05DC\u05E7\u05D8 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E9\u05DE\u05D5\u05D0\u05DC \u05D4\u05D5\u05E8\u05D1\u05D9\u05E5. \u05E1\u05E4\u05E8 \u05D9\u05E1\u05D5\u05D3 \u05DC\u05D4\u05D1\u05E0\u05EA \u05E2\u05D5\u05DE\u05E7 \u05D4\u05EA\u05D5\u05E8\u05D5\u05EA.',
    descriptionEnglish: 'Contains the conversations, stories and words of awakening related to each teaching in Likutei Moharan, taken from "Chayei Moharan," "Yemei Maharanat," and "Alim LeTerufah." Compiled by Rabbi Shmuel Horowitz. Fundamental for understanding the depth of the teachings.',
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05E9\u05D9\u05D7\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E9\u05DE\u05D5\u05D0\u05DC \u05D4\u05D5\u05E8\u05D1\u05D9\u05E5",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 450,
    isbn: "978-965-7023-52-3",
    images: [
      "/attached_assets/\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8\u05DF 1_1757281125911.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      "\u05E9\u05D9\u05D7\u05D5\u05EA \u05DC\u05DB\u05DC \u05EA\u05D5\u05E8\u05D4",
      "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05DE\u05E7\u05E9\u05E8\u05D9\u05DD",
      "\u05D4\u05EA\u05E2\u05D5\u05E8\u05E8\u05D5\u05EA \u05E8\u05D5\u05D7\u05E0\u05D9\u05EA",
      '\u05DE\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
      "\u05D4\u05D5\u05E8\u05D1\u05D9\u05E5 \u05DC\u05E7\u05D8"
    ],
    tags: ["\u05E9\u05D9\u05D7\u05D5\u05EA", "\u05D4\u05EA\u05E2\u05D5\u05E8\u05E8\u05D5\u05EA", "\u05EA\u05D5\u05E8\u05D5\u05EA", "\u05D4\u05D5\u05E8\u05D1\u05D9\u05E5", "\u05DC\u05E7\u05D8"],
    isActive: true,
    isFeatured: false
  },
  "mikhtavei-rabbi-natan-tiveria": {
    id: "mikhtavei-rabbi-natan-tiveria",
    name: "\u05DE\u05DB\u05EA\u05D1\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D8\u05D1\u05E8\u05D9\u05D4",
    nameEnglish: "Mikhtavei Rabbi Natan MeTiveria",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '\u05E1\u05E4\u05E8 \u05D4\u05DE\u05DB\u05D9\u05DC \u05E7\u05E8\u05D5\u05D1 \u05DC\u05DE\u05D0\u05EA\u05D9\u05D9\u05DD \u05DE\u05DB\u05EA\u05D1\u05D9\u05DD \u05E9\u05DB\u05EA\u05D1 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05D1"\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05DE\u05D8\u05D1\u05E8\u05D9\u05D4, \u05DE\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D4\u05E7\u05D9\u05DD \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05DC\u05D9\u05D3\u05D9\u05D3\u05D9\u05D5 \u05D1\u05D0\u05E8\u05E5 \u05D5\u05D1\u05D7\u05D5"\u05DC. \u05D2\u05D3\u05D5\u05E9 \u05D1\u05E9\u05D9\u05D7\u05D5\u05EA \u05D5\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05E0\u05DC\u05D4\u05D1\u05D9\u05DD \u05D1\u05D2\u05D3\u05D5\u05DC\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05DE\u05E2\u05DC\u05EA \u05DC\u05D9\u05DE\u05D5\u05D3 \u05E1\u05E4\u05E8\u05D9\u05D4\u05DD, \u05D5\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA \u05D1\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4\u05E9\u05DD.',
    descriptionEnglish: "Book containing nearly two hundred letters written by Rabbi Nathan bar Yehuda of Tiberias, one of Rabbi Nathan's distinguished students, to friends in Israel and abroad. Full of enthusiastic conversations about the greatness of Rabbenu and Rabbi Nathan.",
    category: "\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD",
    subcategory: "\u05DE\u05DB\u05EA\u05D1\u05D9 \u05E7\u05D5\u05D3\u05E9",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05D1\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05DE\u05D8\u05D1\u05E8\u05D9\u05D4",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 380,
    isbn: "978-965-7023-53-0",
    images: [
      "/attached_assets/\u05DE\u05DB\u05EA\u05D1\u05D9 \u05E8 \u05E0\u05EA\u05DF 1_1757281125910.jpg",
      "/attached_assets/\u05DE\u05DB\u05EA\u05D1\u05D9 \u05E8 \u05E0\u05EA\u05DF_1757281003113.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      "\u05DE\u05D0\u05EA\u05D9\u05D9\u05DD \u05DE\u05DB\u05EA\u05D1\u05D9\u05DD",
      "\u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05DE\u05D8\u05D1\u05E8\u05D9\u05D4 \u05D4\u05E7\u05D3\u05D5\u05E9\u05D4",
      "\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA \u05D1\u05D0\u05DE\u05D5\u05E0\u05D4",
      "\u05DC\u05D9\u05DE\u05D5\u05D3 \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5"
    ],
    tags: ["\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD", "\u05D8\u05D1\u05E8\u05D9\u05D4", "\u05EA\u05DC\u05DE\u05D9\u05D3", "\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA", "\u05D0\u05DE\u05D5\u05E0\u05D4"],
    isActive: true,
    isFeatured: false
  },
  "parparaot-al-hashas": {
    id: "parparaot-al-hashas",
    name: '\u05E4\u05E8\u05E4\u05E8\u05D0\u05D5\u05EA \u05E2\u05DC \u05D4\u05E9"\u05E1',
    nameEnglish: "Parparaot Al HaShas",
    nameFrench: "Parparaot Al HaShas",
    nameSpanish: "Parparaot Al HaShas",
    nameRussian: "\u041F\u0430\u0440\u043F\u0430\u0440\u0430\u043E\u0442 \u0430\u043B\u044C \u0430-\u0428\u0430\u0441",
    description: '\u05D7\u05D5\u05D1\u05E8 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05DE\u05DB\u05D9\u05DC \u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD \u05E2\u05DE\u05D5\u05E7\u05D9\u05DD \u05D5\u05E0\u05E4\u05DC\u05D0\u05D9\u05DD \u05D4\u05DE\u05E7\u05E9\u05E8\u05D9\u05DD \u05D0\u05EA \u05D3\u05D1\u05E8\u05D9 \u05D4\u05D2\u05DE\u05E8\u05D0 \u05DC\u05D9\u05E1\u05D5\u05D3\u05D5\u05EA \u05D4\u05DE\u05D5\u05D1\u05D0\u05D9\u05DD \u05D1\u05EA\u05D5\u05E8\u05D5\u05EA\u05D9\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E9\u05D1\u05E1\u05E4\u05E8 "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF". \u05D0\u05DC\u05D9\u05D5 \u05E0\u05D5\u05E1\u05E3 \u05D4\u05E1\u05E4\u05E8 "\u05D8\u05D5\u05D1\u05D5\u05EA \u05D6\u05D9\u05DB\u05E8\u05D5\u05E0\u05D5\u05EA" \u05DE\u05E0\u05DB\u05D3 \u05D4\u05DE\u05D7\u05D1\u05E8, \u05E8\u05D1\u05D9 \u05D0\u05D1\u05E8\u05D4\u05DD \u05E9\u05D8\u05E8\u05E0\u05D4\u05D0\u05E8\u05E5 - \u05DB\u05D5\u05DB\u05D1 \u05DC\u05D1, \u05D4\u05DE\u05DB\u05D9\u05DC \u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05DE\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA \u05D7\u05D9\u05D5 \u05E9\u05DC \u05E1\u05D1\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF.',
    descriptionEnglish: `Composed by Rabbi Nachman of Tchehrin, student of Rabbi Nathan. Contains deep and wondrous insights connecting the words of the Talmud to the foundations in Rabbenu's teachings in Likutei Moharan. Includes "Tovot Zichronot" with stories about Rabbi Nathan.`,
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05D4\u05DC\u05DB\u05D4 \u05D5\u05EA\u05DC\u05DE\u05D5\u05D3",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 420,
    isbn: "978-965-7023-54-7",
    images: [
      "/attached_assets/4_1757275751756.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA \u05D1\u05E0\u05E4\u05E8\u05D3_1757280401419.jpg",
      "/attached_assets/\u05DB\u05DC \u05D1\u05D5 \u05DC\u05D1\u05DF 2_1757280401418.jpg"
    ],
    variants: [
      {
        id: "large-skai-2vol",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 2,
        price: 75,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      "\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD \u05E2\u05DC \u05D4\u05D2\u05DE\u05E8\u05D0",
      '\u05E7\u05E9\u05E8 \u05DC\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
      "\u05E2\u05D5\u05DE\u05E7 \u05E8\u05D5\u05D7\u05E0\u05D9",
      "\u05D8\u05D5\u05D1\u05D5\u05EA \u05D6\u05D9\u05DB\u05E8\u05D5\u05E0\u05D5\u05EA",
      "\u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF \u05D7\u05D9\u05D1\u05E8"
    ],
    tags: ["\u05D2\u05DE\u05E8\u05D0", "\u05D4\u05DC\u05DB\u05D4", "\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD", "\u05DE\u05D8\u05E9\u05E2\u05D4\u05E8\u05D9\u05DF", "\u05EA\u05DC\u05DE\u05D5\u05D3"],
    isActive: true,
    isFeatured: false
  },
  "likutei-even": {
    id: "likutei-even",
    name: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D0\u05D1\u05DF",
    nameEnglish: "Likutei Even",
    nameFrench: "Likout\xE9 Even",
    nameSpanish: "Likutei Even",
    nameRussian: "\u041B\u0438\u043A\u0443\u0442\u0435\u0439 \u042D\u0432\u0435\u043D",
    description: `\u05D0\u05E8\u05D1\u05E2\u05D4 \u05E1\u05E4\u05E8\u05D9\u05DD \u05D1\u05DB\u05E8\u05DA \u05D0\u05D7\u05D3: \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D0\u05D1\u05DF - \u05D7\u05D9\u05D1\u05D5\u05E8\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D0\u05E4\u05E8\u05D9\u05DD \u05D1\u05DF \u05E8\u05D1\u05D9 \u05E0\u05E4\u05EA\u05DC\u05D9, \u05EA\u05DC\u05DE\u05D9\u05D3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05DE\u05D9\u05D5\u05E1\u05D3 \u05E2\u05DC \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E2\u05DC \u05D7\u05DC\u05E7 "\u05D0\u05D5\u05E8\u05D7 \u05D7\u05D9\u05D9\u05DD" \u05D1\u05E9\u05D5\u05DC\u05D7\u05DF \u05E2\u05E8\u05D5\u05DA. \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D4\u05D1\u05D5\u05E7\u05E8 - \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05E9\u05E0\u05DB\u05EA\u05D1\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05D0\u05E4\u05E8\u05D9\u05DD. \u05D0\u05DE\u05D5\u05E0\u05EA \u05E2\u05EA\u05D9\u05DA - \u05E1\u05E4\u05E8\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D0\u05DC\u05D8\u05E8 \u05DE\u05D8\u05E4\u05DC\u05D9\u05E7 \u05D1\u05DE\u05E2\u05DC\u05EA \u05E0\u05D9\u05E6\u05D5\u05DC \u05D4\u05D6\u05DE\u05DF \u05DC\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4'. \u05E2\u05E6\u05D5\u05EA \u05D9\u05E9\u05E8\u05D5\u05EA - \u05D4\u05D5\u05E1\u05E4\u05D5\u05EA \u05DC\u05E1\u05E4\u05E8 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA.`,
    descriptionEnglish: "Four books in one volume: Likutei Even by Rabbi Ephraim ben Rabbi Naftali based on Rabbenu's teachings and Orach Chaim; Morning Prayers; Emunat Itecha about utilizing time for divine service; and Etzot Yesharot - additions to Likutei Etzot.",
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05D4\u05DC\u05DB\u05D4 \u05D5\u05E2\u05D1\u05D5\u05D3\u05D4",
    author: '\u05E8\u05D1\u05D9 \u05D0\u05E4\u05E8\u05D9\u05DD \u05D1\u05DF \u05E0\u05E4\u05EA\u05DC\u05D9 \u05D5\u05D7\u05D1"\u05E8',
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 350,
    isbn: "978-965-7023-55-4",
    images: [
      "/attached_assets/5_1757275751756.jpg",
      "/attached_assets/\u05D0\u05D1\u05D9 \u05D4\u05E0\u05D7\u05DC_1757281003110.jpg",
      "/attached_assets/\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA_1757281003113.jpg"
    ],
    variants: [
      {
        id: "large-skai-with-additions",
        format: "\u05DB\u05D5\u05DC\u05DC \u05D0\u05DE\u05D5\u05E0\u05EA \u05E2\u05EA\u05D9\u05DA \u05D5\u05E2\u05E6\u05D5\u05EA \u05D9\u05E9\u05E8\u05D5\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 22
      }
    ],
    features: [
      "\u05D0\u05E8\u05D1\u05E2\u05D4 \u05E1\u05E4\u05E8\u05D9\u05DD \u05D1\u05DB\u05E8\u05DA",
      "\u05DE\u05D9\u05D5\u05E1\u05D3 \u05E2\u05DC \u05D0\u05D5\u05E8\u05D7 \u05D7\u05D9\u05D9\u05DD",
      "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D4\u05D1\u05D5\u05E7\u05E8",
      "\u05D0\u05DE\u05D5\u05E0\u05EA \u05E2\u05EA\u05D9\u05DA",
      "\u05E2\u05E6\u05D5\u05EA \u05D9\u05E9\u05E8\u05D5\u05EA"
    ],
    tags: ["\u05D4\u05DC\u05DB\u05D4", "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA", "\u05E2\u05D1\u05D5\u05D3\u05D4", "\u05D6\u05DE\u05DF", "\u05E2\u05E6\u05D5\u05EA"],
    isActive: true,
    isFeatured: false
  },
  "avi-hanachal": {
    id: "avi-hanachal",
    name: "\u05D0\u05D1'\u05D9 \u05D4\u05E0\u05D7\u05DC",
    nameEnglish: "Avi HaNachal",
    nameFrench: "Avi HaNahal",
    nameSpanish: "Avi HaNajal",
    nameRussian: "\u0410\u0432\u0438 \u0430-\u041D\u0430\u0445\u0430\u043B\u044C",
    description: "\u05DE\u05DB\u05EA\u05D1\u05D9\u05D5 \u05D4\u05E0\u05E4\u05DC\u05D0\u05D9\u05DD \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8, \u05D1\u05E2\u05D9\u05E7\u05E8 \u05D0\u05DC\u05D5 \u05E9\u05E0\u05E9\u05DC\u05D7\u05D5 \u05DC\u05D6\u05DC\u05DE\u05DF \u05E9\u05D6\u05E8. \u05D4\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD \u05DE\u05DB\u05D9\u05DC\u05D9\u05DD \u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05E7\u05D3\u05D5\u05E9\u05D9\u05DD, \u05DE\u05D7\u05D6\u05E7\u05D9\u05DD \u05D5\u05DE\u05E2\u05D5\u05D3\u05D3\u05D9\u05DD, \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05DC\u05D0\u05DE\u05E5 \u05D1\u05E8\u05DB\u05D9\u05D9\u05DD \u05DB\u05D5\u05E9\u05DC\u05D5\u05EA \u05D5\u05DC\u05D7\u05D6\u05E7 \u05D9\u05D3\u05D9\u05D9\u05DD \u05E8\u05E4\u05D5\u05EA. \u05DC\u05D4\u05D7\u05D3\u05D9\u05E8 \u05D1\u05DC\u05D1 \u05D4\u05E7\u05D5\u05E8\u05D0 \u05D0\u05DE\u05D5\u05E0\u05D4 \u05D1\u05D4' \u05D9\u05EA\u05D1\u05E8\u05DA \u05D5\u05D1\u05E6\u05D3\u05D9\u05E7 \u05D4\u05D0\u05DE\u05EA.",
    descriptionEnglish: "The wonderful letters of Rabbi Yisrael Dov Odesser, especially those sent to Zalman Shazar. The letters contain holy words, strengthening and encouraging, from Rabbenu and Rabbi Nathan's books, to strengthen weak knees and fortify drooping hands.",
    category: "\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD",
    subcategory: "\u05DE\u05DB\u05EA\u05D1\u05D9 \u05D0\u05D5\u05D3\u05E1\u05E8",
    author: "\u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 280,
    isbn: "978-965-7023-56-1",
    images: [
      "/attached_assets/\u05D0\u05D1\u05D9 \u05D4\u05E0\u05D7\u05DC_1757281003110.jpg",
      "/attached_assets/\u05D0\u05D1\u05D9 \u05D4\u05E0\u05D7\u05DC \u05D1\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA_1757280778284.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "large-leather-like-pearl",
        format: "\u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8 \u05DC\u05D1\u05DF/\u05E4\u05E0\u05D9\u05E0\u05D4",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 45,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: "small-laminated-soft",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4 \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 80
      },
      {
        id: "french-medium-2vol",
        format: "\u05E6\u05E8\u05E4\u05EA\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 2,
        price: 64,
        inStock: true,
        stockQuantity: 12
      }
    ],
    features: [
      "\u05DE\u05DB\u05EA\u05D1\u05D9 \u05D0\u05D5\u05D3\u05E1\u05E8 \u05D4\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD",
      "\u05DC\u05D6\u05DC\u05DE\u05DF \u05E9\u05D6\u05E8 \u05E0\u05DB\u05EA\u05D1\u05D5",
      "\u05D7\u05D9\u05D6\u05D5\u05E7 \u05D5\u05E2\u05D9\u05D3\u05D5\u05D3",
      "\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D1\u05E6\u05D3\u05D9\u05E7",
      "\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05E7\u05D3\u05D5\u05E9\u05D9\u05DD"
    ],
    tags: ["\u05D0\u05D5\u05D3\u05E1\u05E8", "\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD", "\u05D7\u05D9\u05D6\u05D5\u05E7", "\u05D0\u05DE\u05D5\u05E0\u05D4", "\u05E6\u05D3\u05D9\u05E7"],
    isActive: true,
    isFeatured: true
  },
  "yisrael-saba": {
    id: "yisrael-saba",
    name: "\u05D9\u05E9\u05E8\u05D0\u05DC \u05E1\u05D1\u05D0",
    nameEnglish: "Yisrael Saba",
    nameFrench: "Isra\xEBl Saba",
    nameSpanish: "Israel Saba",
    nameRussian: "\u0418\u0441\u0440\u0430\u044D\u043B\u044C \u0421\u0430\u0431\u0430",
    description: "\u05E9\u05D9\u05D7\u05D5\u05EA\u05D9\u05D5 \u05D4\u05D9\u05D5\u05E7\u05D3\u05D5\u05EA \u05D5\u05D4\u05E0\u05DC\u05D4\u05D1\u05D5\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8, \u05DE\u05EA\u05E7\u05D5\u05E4\u05EA \u05D7\u05D9\u05D9\u05D5 \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D4. \u05E0\u05E2\u05E8\u05DA \u05E2\u05DC \u05E4\u05D9 \u05E7\u05DC\u05D8\u05D5\u05EA \u05D1\u05D4\u05DF \u05D4\u05D5\u05E7\u05DC\u05D8\u05D5 \u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05D5 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05DE\u05E7\u05D5\u05E8\u05D1\u05D9\u05D5. \u05D4\u05E9\u05D9\u05D7\u05D5\u05EA \u05DE\u05DC\u05D0\u05D5\u05EA \u05D1\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA, \u05D9\u05E8\u05D0\u05EA \u05E9\u05DE\u05D9\u05DD, \u05D0\u05D4\u05D1\u05EA \u05D4' \u05D9\u05EA\u05D1\u05E8\u05DA, \u05D0\u05D4\u05D1\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7 \u05D5\u05D0\u05D4\u05D1\u05EA \u05D9\u05E9\u05E8\u05D0\u05DC. \u05D5\u05D3\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD \u05D1\u05DE\u05E2\u05DC\u05EA \u05D4\u05D4\u05EA\u05E7\u05E8\u05D1\u05D5\u05EA \u05DC\u05E8\u05D1\u05D9\u05E0\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF, \u05DC\u05D9\u05DE\u05D5\u05D3 \u05E1\u05E4\u05E8\u05D9\u05D5 \u05D5\u05D4\u05E4\u05E6\u05EA\u05DD \u05D1\u05E7\u05E8\u05D1 \u05E2\u05DD \u05D9\u05E9\u05E8\u05D0\u05DC.",
    descriptionEnglish: "The fiery and enthusiastic conversations of Rabbi Yisrael Dov Odesser from his later years. Compiled from recordings made by his close associates. Full of strengthening, fear of Heaven, love of God, love of the tzaddik and love of Israel.",
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05E9\u05D9\u05D7\u05D5\u05EA \u05D0\u05D5\u05D3\u05E1\u05E8",
    author: "\u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 320,
    isbn: "978-965-7023-57-8",
    images: [
      "/attached_assets/\u05D9\u05E9\u05E8\u05D0\u05DC \u05E1\u05D1\u05D0_1757281003112.jpg",
      "/attached_assets/\u05E1\u05D1\u05D0 \u05D9\u05E9\u05E8\u05D0\u05DC \u05DC\u05D9\u05DC\u05D3\u05D9\u05DD_1757280885979.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 40,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: "french-medium",
        format: "\u05E6\u05E8\u05E4\u05EA\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 32,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      "\u05E9\u05D9\u05D7\u05D5\u05EA \u05D0\u05D5\u05D3\u05E1\u05E8 \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA",
      "\u05E7\u05DC\u05D8\u05D5\u05EA \u05DE\u05E7\u05D5\u05E8\u05D9\u05D5\u05EA",
      "\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA \u05D5\u05D9\u05E8\u05D0\u05D4",
      "\u05D0\u05D4\u05D1\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7",
      "\u05D4\u05E4\u05E6\u05EA \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5"
    ],
    tags: ["\u05D0\u05D5\u05D3\u05E1\u05E8", "\u05E9\u05D9\u05D7\u05D5\u05EA", "\u05D4\u05EA\u05D7\u05D6\u05E7\u05D5\u05EA", "\u05D0\u05D4\u05D1\u05D4", "\u05D4\u05E4\u05E6\u05D4"],
    isActive: true,
    isFeatured: true
  },
  "maayen-hamitgaber": {
    id: "maayen-hamitgaber",
    name: "\u05DE\u05E2\u05D9\u05DF \u05D4\u05DE\u05EA\u05D2\u05D1\u05E8",
    nameEnglish: "Ma'ayan HaMitgaber",
    nameFrench: "Maayan HaMitgabert",
    nameSpanish: "Maayan HaMitgaber",
    nameRussian: "\u041C\u0430\u0430\u044F\u043D \u0430-\u041C\u0438\u0442\u0433\u0430\u0431\u0435\u0440",
    description: '\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD \u05E2\u05DE\u05D5\u05E7\u05D9\u05DD \u05D5\u05E0\u05E4\u05DC\u05D0\u05D9\u05DD \u05E2\u05DC \u05D4\u05E1\u05E4\u05E8 \u05D4\u05E7\u05D3\u05D5\u05E9 "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF", \u05E9\u05D4\u05D5\u05E2\u05DC\u05D5 \u05E2\u05DC \u05D4\u05DB\u05EA\u05D1 \u05D1\u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E2\u05DE\u05E8\u05DD \u05D9\u05D5\u05E1\u05E3 \u05D4\u05D5\u05E8\u05D1\u05D9\u05E5, \u05E0\u05DB\u05D3\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D5\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05D2\u05DC\u05D4 \u05E8\u05D1\u05D3\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD \u05D1\u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05DE\u05E2\u05DE\u05D9\u05E7 \u05D1\u05D4\u05D1\u05E0\u05EA \u05D4\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05D4\u05E8\u05D5\u05D7\u05E0\u05D9\u05D9\u05DD \u05E9\u05D1\u05D4\u05DD.',
    descriptionEnglish: `Deep and wondrous insights on the holy book "Likutei Moharan," written by Rabbi Amram Yosef Horowitz, grandson of Rabbi Yisrael Dov Odesser. The book reveals additional layers in Rabbenu's teachings and deepens understanding of spiritual matters.`,
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05E4\u05D9\u05E8\u05D5\u05E9\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E2\u05DE\u05E8\u05DD \u05D9\u05D5\u05E1\u05E3 \u05D4\u05D5\u05E8\u05D1\u05D9\u05E5",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 380,
    isbn: "978-965-7023-58-5",
    images: [
      "/attached_assets/\u05DE\u05E2\u05D9\u05DF \u05D4\u05DE\u05EA\u05D2\u05D1\u05E8 1_1757281125910.jpg",
      "/attached_assets/\u05DE\u05E2\u05D9\u05DF \u05D4\u05DE\u05EA\u05D2\u05D1\u05E8_1757281003114.jpg"
    ],
    variants: [
      {
        id: "large-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      '\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD \u05E2\u05DC \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
      "\u05E0\u05DB\u05D3 \u05D0\u05D5\u05D3\u05E1\u05E8 \u05D7\u05D9\u05D1\u05E8",
      "\u05E8\u05D1\u05D3\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD",
      "\u05E2\u05D5\u05DE\u05E7 \u05E8\u05D5\u05D7\u05E0\u05D9",
      "\u05D4\u05D1\u05E0\u05D4 \u05DE\u05E2\u05DE\u05D9\u05E7\u05D4"
    ],
    tags: ["\u05E4\u05D9\u05E8\u05D5\u05E9", '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF', "\u05D0\u05D5\u05D3\u05E1\u05E8", "\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD", "\u05E2\u05D5\u05DE\u05E7"],
    isActive: true,
    isFeatured: false
  },
  "shemot-hatzadikim": {
    id: "shemot-hatzadikim",
    name: "\u05E9\u05DE\u05D5\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD",
    nameEnglish: "Shemot HaTzadikim",
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: "\u05E9\u05E0\u05DC\u05E7\u05D8 \u05E2\u05DC \u05D9\u05D3\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF, \u05E9\u05D0\u05DE\u05D9\u05E8\u05EA\u05D5 \u05DE\u05E1\u05D5\u05D2\u05DC\u05EA \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05D4\u05D8\u05D1\u05E2 \u05D5\u05DC\u05D4\u05DE\u05E9\u05D9\u05DA \u05E0\u05D9\u05E1\u05D9\u05DD, \u05DB\u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05DB\u05D9\u05DC \u05E8\u05E9\u05D9\u05DE\u05EA \u05E9\u05DE\u05D5\u05EA \u05E6\u05D3\u05D9\u05E7\u05D9\u05DD \u05D5\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD \u05E9\u05D0\u05DE\u05D9\u05E8\u05EA\u05DD \u05D1\u05D3\u05D1\u05D9\u05E7\u05D5\u05EA \u05D5\u05D1\u05DB\u05D5\u05D5\u05E0\u05D4 \u05D9\u05DB\u05D5\u05DC\u05D4 \u05DC\u05D4\u05D1\u05D9\u05D0 \u05D9\u05E9\u05D5\u05E2\u05D5\u05EA \u05D5\u05E8\u05E4\u05D5\u05D0\u05D5\u05EA.",
    descriptionEnglish: "Compiled by Rabbi Nathan, whose recitation is capable of changing nature and drawing miracles, according to our holy Rabbenu. Contains a list of names of tzaddikim and holy ones whose recitation with devotion can bring salvation and healing.",
    category: "\u05E1\u05D2\u05D5\u05DC\u05D5\u05EA \u05D5\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA",
    subcategory: "\u05E9\u05DE\u05D5\u05EA \u05E7\u05D3\u05D5\u05E9\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 120,
    isbn: "978-965-7023-59-2",
    images: [
      "/attached_assets/\u05E9\u05DE\u05D5\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD 2_1757280885981.jpg",
      "/attached_assets/\u05E9\u05DE\u05D5\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD_1757280885981.jpg"
    ],
    variants: [
      {
        id: "medium-skai-divided-12vol",
        format: "\u05DE\u05D7\u05D5\u05DC\u05E7",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 12,
        price: 45,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: "small-soft-nylon",
        format: "\u05DC\u05E0\u05D9\u05DC\u05D5\u05DF \u05E8\u05DA",
        binding: "\u05E8\u05DA",
        size: "\u05E7\u05D8\u05DF",
        dimensions: "12*8",
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 100
      },
      {
        id: "medium-french",
        format: "\u05E6\u05E8\u05E4\u05EA\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 32,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      "\u05DC\u05E7\u05D8 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
      "\u05E9\u05D9\u05E0\u05D5\u05D9 \u05D4\u05D8\u05D1\u05E2",
      "\u05D4\u05DE\u05E9\u05DB\u05EA \u05E0\u05D9\u05E1\u05D9\u05DD",
      "\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA \u05D5\u05E8\u05E4\u05D5\u05D0\u05D5\u05EA",
      "\u05D0\u05DE\u05D9\u05E8\u05D4 \u05D1\u05D3\u05D1\u05D9\u05E7\u05D5\u05EA"
    ],
    tags: ["\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD", "\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA", "\u05E0\u05D9\u05E1\u05D9\u05DD", "\u05E8\u05E4\u05D5\u05D0\u05D5\u05EA", "\u05E1\u05D2\u05D5\u05DC\u05D5\u05EA"],
    isActive: true,
    isFeatured: false
  },
  "shema-yisrael": {
    id: "shema-yisrael",
    name: "\u05E9\u05DE\u05E2 \u05D9\u05E9\u05E8\u05D0\u05DC",
    nameEnglish: "Shema Yisrael",
    nameFrench: "Chema Isra\xEBl",
    nameSpanish: "Shema Israel",
    nameRussian: "\u0428\u043C\u0430 \u0418\u0441\u0440\u0430\u044D\u043B\u044C",
    description: "\u05E1\u05E4\u05E8 \u05E7\u05D8\u05DF \u05D5\u05D7\u05E9\u05D5\u05D1 \u05D4\u05DE\u05DB\u05D9\u05DC \u05D0\u05EA \u05D4\u05E7\u05E8\u05D9\u05D0\u05EA \u05E9\u05DE\u05E2 \u05D5\u05D1\u05E8\u05DB\u05D5\u05EA\u05D9\u05D4, \u05E2\u05DD \u05DB\u05D5\u05D5\u05E0\u05D5\u05EA \u05D5\u05D4\u05E1\u05D1\u05E8\u05D9\u05DD \u05DE\u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5. \u05DE\u05D9\u05D5\u05E2\u05D3 \u05DC\u05E0\u05E9\u05D9\u05D0\u05D4 \u05D1\u05DB\u05D9\u05E1 \u05D5\u05DC\u05D0\u05DE\u05D9\u05E8\u05D4 \u05D1\u05DB\u05DC \u05E2\u05EA \u05D5\u05DE\u05E7\u05D5\u05DD, \u05D1\u05DE\u05D9\u05D5\u05D7\u05D3 \u05D1\u05E9\u05E2\u05EA \u05E6\u05E8\u05D4 \u05D0\u05D5 \u05DC\u05E4\u05E0\u05D9 \u05E9\u05D9\u05E0\u05D4.",
    descriptionEnglish: "Small but important book containing the Shema prayer and its blessings, with intentions and explanations from Rabbenu's teachings. Designed for carrying in pocket and recitation at any time and place, especially in times of trouble or before sleep.",
    category: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    subcategory: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05D9\u05D5\u05DE\u05D9\u05D5\u05EA",
    author: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 64,
    isbn: "978-965-7023-60-8",
    images: [
      "/attached_assets/\u05E9\u05DE\u05E2 \u05D9\u05E9\u05E8\u05D0\u05DC \u05E6\u05E8\u05E4\u05EA\u05D9\u05EA_1757280885982.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "12*17",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 50
      },
      {
        id: "medium-skai-english",
        format: "\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: "medium-french",
        format: "\u05E6\u05E8\u05E4\u05EA\u05D9\u05EA",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 32,
        inStock: true,
        stockQuantity: 25
      }
    ],
    features: [
      "\u05E7\u05E8\u05D9\u05D0\u05EA \u05E9\u05DE\u05E2 \u05D5\u05D1\u05E8\u05DB\u05D5\u05EA\u05D9\u05D4",
      "\u05DB\u05D5\u05D5\u05E0\u05D5\u05EA \u05DE\u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5",
      "\u05E0\u05E9\u05D9\u05D0\u05D4 \u05D1\u05DB\u05D9\u05E1",
      "\u05DC\u05DB\u05DC \u05E2\u05EA \u05D5\u05DE\u05E7\u05D5\u05DD",
      "\u05E9\u05E2\u05EA \u05E6\u05E8\u05D4 \u05D5\u05E9\u05D9\u05E0\u05D4"
    ],
    tags: ["\u05E9\u05DE\u05E2 \u05D9\u05E9\u05E8\u05D0\u05DC", "\u05EA\u05E4\u05D9\u05DC\u05D4", "\u05DB\u05D5\u05D5\u05E0\u05D5\u05EA", "\u05DB\u05D9\u05E1", "\u05D9\u05D5\u05DE\u05D9"],
    isActive: true,
    isFeatured: false
  },
  "emunat-itecha": {
    id: "emunat-itecha",
    name: "\u05D0\u05DE\u05D5\u05E0\u05EA \u05E2\u05EA\u05D9\u05DA",
    nameEnglish: "Emunat Itecha",
    nameFrench: "Emounat It\xE9kha",
    nameSpanish: "Emunat Iteja",
    nameRussian: "\u042D\u043C\u0443\u043D\u0430\u0442 \u0418\u0442\u0435\u0445\u0430",
    description: "\u05E1\u05E4\u05E8\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05D0\u05DC\u05D8\u05E8 \u05DE\u05D8\u05E4\u05DC\u05D9\u05E7 \u05D1\u05DE\u05E2\u05DC\u05EA \u05E0\u05D9\u05E6\u05D5\u05DC \u05D4\u05D6\u05DE\u05DF \u05DC\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4'. \u05D4\u05E1\u05E4\u05E8 \u05DE\u05DC\u05DE\u05D3 \u05DB\u05D9\u05E6\u05D3 \u05DC\u05D4\u05E7\u05D3\u05D9\u05E9 \u05DB\u05DC \u05E8\u05D2\u05E2 \u05D5\u05E8\u05D2\u05E2 \u05DC\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4\u05D1\u05D5\u05E8\u05D0, \u05D5\u05D0\u05D9\u05DA \u05DC\u05D4\u05E4\u05D5\u05DA \u05D0\u05EA \u05D7\u05D9\u05D9 \u05D4\u05D9\u05D5\u05DD-\u05D9\u05D5\u05DD \u05DC\u05E2\u05D1\u05D5\u05D3\u05D4 \u05E8\u05D5\u05D7\u05E0\u05D9\u05EA \u05DE\u05EA\u05DE\u05D3\u05EA. \u05DE\u05D1\u05D5\u05E1\u05E1 \u05E2\u05DC \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D1\u05E2\u05E0\u05D9\u05DF \u05D6\u05DE\u05DF \u05D5\u05D6\u05DB\u05D9\u05E8\u05EA \u05D4\u05D1\u05D5\u05E8\u05D0.",
    descriptionEnglish: "Book by Rabbi Alter of Teplik about the virtue of utilizing time for divine service. Teaches how to dedicate every moment to serving the Creator and transform daily life into continuous spiritual work. Based on Rabbenu's teachings about time and remembering the Creator.",
    category: "\u05E1\u05E4\u05E8\u05D9 \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    subcategory: "\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4\u05E9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05D0\u05DC\u05D8\u05E8 \u05DE\u05D8\u05E4\u05DC\u05D9\u05E7",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 160,
    isbn: "978-965-7023-61-5",
    images: [
      "/attached_assets/\u05D0\u05DE\u05D5\u05E0\u05EA \u05E2\u05D9\u05EA\u05DA \u05E6\u05E8\u05E4\u05EA\u05D9\u05EA_1757280778286.jpg"
    ],
    variants: [
      {
        id: "medium-skai",
        format: "\u05E1\u05E7\u05D0\u05D9",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "12*17",
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: "medium-french-booklet",
        format: "\u05E7\u05D5\u05E0\u05D8\u05E8\u05E1 \u05E6\u05E8\u05E4\u05EA\u05D9\u05EA",
        binding: "\u05E8\u05DA",
        size: "\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9",
        dimensions: "17*12",
        volumes: 1,
        price: 6,
        inStock: true,
        stockQuantity: 60
      }
    ],
    features: [
      "\u05E0\u05D9\u05E6\u05D5\u05DC \u05D4\u05D6\u05DE\u05DF \u05D4\u05E7\u05D3\u05D5\u05E9",
      "\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4' \u05EA\u05DE\u05D9\u05D3\u05D9\u05EA",
      "\u05D7\u05D9\u05D9 \u05D9\u05D5\u05DD-\u05D9\u05D5\u05DD \u05E8\u05D5\u05D7\u05E0\u05D9\u05D9\u05DD",
      "\u05D6\u05DB\u05D9\u05E8\u05EA \u05D4\u05D1\u05D5\u05E8\u05D0",
      "\u05E8\u05D1\u05D9 \u05D0\u05DC\u05D8\u05E8 \u05D7\u05D9\u05D1\u05E8"
    ],
    tags: ["\u05D6\u05DE\u05DF", "\u05E2\u05D1\u05D5\u05D3\u05D4", "\u05E8\u05D5\u05D7\u05E0\u05D9\u05D5\u05EA", "\u05D8\u05E4\u05DC\u05D9\u05E7", "\u05D9\u05D5\u05DD \u05D9\u05D5\u05DD"],
    isActive: true,
    isFeatured: false
  },
  "rabbenu-hakadosh": {
    id: "rabbenu-hakadosh",
    name: "\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9",
    nameEnglish: "Rabbenu HaKadosh",
    nameFrench: "Rabb\xE9nou HaKadoch",
    nameSpanish: "Rabeinu HaKadosh",
    nameRussian: "\u0420\u0430\u0431\u0435\u0439\u043D\u0443 \u0430-\u041A\u0430\u0434\u043E\u0448",
    description: "\u05DB\u05DC \u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD \u05E9\u05DC \u05E8\u05D1\u05D9\u05E0\u05D5 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1, \u05D4\u05E0\u05E4\u05E8\u05E9\u05D9\u05DD \u05E2\u05DC \u05E4\u05E0\u05D9 \u05E7\u05E8\u05D5\u05D1 \u05DC\u05D0\u05E8\u05D1\u05E2\u05D9\u05DD \u05E9\u05E0\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD, \u05E2\u05E8\u05D5\u05DB\u05D9\u05DD \u05D1\u05D0\u05E8\u05D1\u05E2\u05D4 \u05DB\u05E8\u05DB\u05D9\u05DD \u05DE\u05D5\u05E9\u05E7\u05E2\u05D9\u05DD - \u05E1\u05D3\u05E8\u05D4 \u05DE\u05DC\u05D5\u05E7\u05D8\u05EA \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05D5 \u05D1\u05EA\u05D5\u05E1\u05E4\u05EA \u05DE\u05E1\u05D5\u05E8\u05D5\u05EA \u05D1\u05E2\u05DC \u05E4\u05D4 \u05E9\u05E2\u05D1\u05E8\u05D5 \u05DE\u05D3\u05D5\u05E8 \u05DC\u05D3\u05D5\u05E8 \u05D1\u05D9\u05DF \u05D6\u05E7\u05E0\u05D9 \u05D4\u05D7\u05E1\u05D9\u05D3\u05D9\u05DD. \u05E1\u05D3\u05E8\u05D4 \u05DE\u05E7\u05D9\u05E4\u05D4 \u05D5\u05DE\u05E4\u05D5\u05E8\u05D8\u05EA \u05E2\u05DC \u05D7\u05D9\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5.",
    descriptionEnglish: "The complete life story of our holy Rabbenu Rabbi Nachman of Breslov, spanning nearly forty years of life, arranged in four elaborate volumes - a series collected from Rabbenu and his students' books plus oral traditions passed down through generations of elderly Chassidim.",
    category: "\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA",
    subcategory: "\u05D7\u05D9\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
    author: "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D5\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05D5",
    publisher: "\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    pages: 1200,
    isbn: "978-965-7023-62-2",
    images: [
      "/attached_assets/\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 1_1757281260204.jpg",
      "/attached_assets/\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 2_1757281260206.jpg",
      "/attached_assets/\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 3_1757281260206.jpg",
      "/attached_assets/\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 4_1757281260206.jpg"
    ],
    variants: [
      {
        id: "large-laminated-4vol",
        format: "\u05DC\u05DE\u05E0\u05E6\u05D9\u05D4",
        binding: "\u05E7\u05E9\u05D4",
        size: "\u05D2\u05D3\u05D5\u05DC",
        dimensions: "24*17",
        volumes: 4,
        price: 150,
        inStock: true,
        stockQuantity: 12
      }
    ],
    features: [
      "\u05D0\u05E8\u05D1\u05E2\u05D9\u05DD \u05E9\u05E0\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD",
      "\u05D0\u05E8\u05D1\u05E2\u05D4 \u05DB\u05E8\u05DB\u05D9\u05DD \u05DE\u05D5\u05E9\u05E7\u05E2\u05D9\u05DD",
      "\u05DE\u05E1\u05D5\u05E8\u05D5\u05EA \u05D1\u05E2\u05DC \u05E4\u05D4",
      "\u05D6\u05E7\u05E0\u05D9 \u05D4\u05D7\u05E1\u05D9\u05D3\u05D9\u05DD",
      "\u05E1\u05D3\u05E8\u05D4 \u05DE\u05E7\u05D9\u05E4\u05D4 \u05D5\u05DE\u05E4\u05D5\u05E8\u05D8\u05EA"
    ],
    tags: ["\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA", "\u05D7\u05D9\u05D9\u05DD", "\u05DE\u05E1\u05D5\u05E8\u05EA", "\u05D7\u05E1\u05D9\u05D3\u05D9\u05DD", "\u05DE\u05E7\u05D9\u05E3"],
    isActive: true,
    isFeatured: true
  }
};
var featuredProducts = Object.values(realBreslovProducts).filter((product) => product.isFeatured);
var productsByCategory = Object.values(realBreslovProducts).reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});

// client/src/data/downloadLinks.ts
var breslovDownloadBooks = [
  {
    id: "alim-letrufah",
    title: "\u05E2\u05DC\u05D9\u05DD \u05DC\u05EA\u05E8\u05D5\u05E4\u05D4",
    titleEnglish: "Alim Letrufah",
    description: "\u05E1\u05E4\u05E8 \u05E8\u05E4\u05D5\u05D0\u05D5\u05EA \u05E8\u05D5\u05D7\u05E0\u05D9\u05D5\u05EA \u05D5\u05E4\u05D9\u05D6\u05D9\u05D5\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Alim Letrufah",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-alim-letrufa.pdf",
    pages: 1088
  },
  {
    id: "ashreinu",
    title: "\u05D0\u05E9\u05E8\u05E0\u05D5",
    titleEnglish: "Ashreinu",
    description: "\u05E1\u05E4\u05E8 \u05D7\u05D9\u05D6\u05D5\u05E7 \u05D5\u05E2\u05D9\u05D3\u05D5\u05D3 \u05DC\u05E0\u05E4\u05E9 \u05D4\u05D9\u05D4\u05D5\u05D3\u05D9\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Ashreinu",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-ashranue1.pdf",
    pages: 367
  },
  {
    id: "letter-from-heaven",
    title: "\u05DE\u05DB\u05EA\u05D1 \u05DE\u05DF \u05D4\u05E9\u05DE\u05D9\u05DD",
    titleEnglish: "A Letter From Heaven",
    description: "\u05DE\u05DB\u05EA\u05D1 \u05E8\u05D5\u05D7\u05E0\u05D9 \u05DE\u05D9\u05D5\u05D7\u05D3 \u05DE\u05D4\u05E9\u05DE\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-letter-from-heaven.pdf",
    pages: 64
  },
  {
    id: "azamra",
    title: "\u05D0\u05D6\u05DE\u05E8\u05D4",
    titleEnglish: "Azamra",
    description: "\u05DE\u05E6\u05D9\u05D0\u05EA \u05D4\u05D8\u05D5\u05D1 \u05D1\u05DB\u05DC \u05D0\u05D3\u05DD \u05D5\u05E0\u05E7\u05D5\u05D3\u05D4 \u05D8\u05D5\u05D1\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-azamra-15.pdf",
    pages: 32
  },
  {
    id: "emuna",
    title: "\u05D0\u05DE\u05D5\u05E0\u05D4",
    titleEnglish: "Emuna",
    description: "\u05D7\u05D9\u05D6\u05D5\u05E7 \u05D4\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D5\u05D4\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF \u05D1\u05D4' \u05D9\u05EA\u05D1\u05E8\u05DA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-emuna.pdf",
    pages: 71
  },
  {
    id: "eyshet-chayal",
    title: "\u05D0\u05E9\u05EA \u05D7\u05D9\u05DC",
    titleEnglish: "Eyshet Chayal",
    description: "\u05D4\u05D3\u05E8\u05DB\u05D4 \u05DC\u05D0\u05D9\u05E9\u05D4 \u05D9\u05D4\u05D5\u05D3\u05D9\u05D4 \u05D1\u05D7\u05D9\u05D9 \u05D4\u05E7\u05D3\u05D5\u05E9\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-eshet-chayil.pdf",
    pages: 64
  },
  {
    id: "hamtakas-din",
    title: "\u05D4\u05DE\u05EA\u05E7\u05EA \u05D3\u05D9\u05DF",
    titleEnglish: "Hamtakas Din",
    description: "\u05D4\u05DE\u05EA\u05E7\u05EA \u05D4\u05D3\u05D9\u05E0\u05D9\u05DD \u05D5\u05D4\u05D2\u05D6\u05D9\u05E8\u05D5\u05EA \u05D4\u05E7\u05E9\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-hamtakat-din.pdf",
    pages: 64
  },
  {
    id: "maalas-hadpasa",
    title: "\u05DE\u05E2\u05DC\u05EA \u05D4\u05D4\u05D3\u05E4\u05E1\u05D4",
    titleEnglish: "Maalas Hadpasa",
    description: "\u05DE\u05E2\u05DC\u05EA \u05D4\u05D3\u05E4\u05E1\u05EA \u05D5\u05D4\u05E4\u05E6\u05EA \u05E1\u05E4\u05E8\u05D9 \u05D4\u05E7\u05D5\u05D3\u05E9",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-maalas-hadpasa.pdf",
    pages: 64
  },
  {
    id: "peace",
    title: "\u05E9\u05DC\u05D5\u05DD",
    titleEnglish: "Peace",
    description: "\u05D3\u05E8\u05DB\u05D9 \u05D4\u05E9\u05DC\u05D5\u05DD \u05D5\u05D4\u05D0\u05D7\u05D3\u05D5\u05EA \u05D1\u05E2\u05D5\u05DC\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-peace.pdf",
    pages: 64
  },
  {
    id: "rebbe",
    title: "\u05E8\u05D1\u05D9",
    titleEnglish: "Rebbe",
    description: "\u05E2\u05DC \u05D2\u05D3\u05DC\u05D5\u05EA\u05D5 \u05D5\u05DE\u05E2\u05DC\u05EA\u05D5 \u05E9\u05DC \u05D4\u05E8\u05D1\u05D9 \u05D4\u05E7\u05D3\u05D5\u05E9",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-rebbe.pdf",
    pages: 64
  },
  {
    id: "rebbe-nachman-israel",
    title: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05E2\u05DC \u05D0\u05E8\u05E5 \u05D9\u05E9\u05E8\u05D0\u05DC",
    titleEnglish: "Rebbe Nachman on Israel",
    description: "\u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05E2\u05DC \u05E7\u05D3\u05D5\u05E9\u05EA \u05D0\u05E8\u05E5 \u05D9\u05E9\u05E8\u05D0\u05DC",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-eretz-yisroel.pdf",
    pages: 64
  },
  {
    id: "simcha",
    title: "\u05E9\u05DE\u05D7\u05D4",
    titleEnglish: "Simcha",
    description: "\u05D7\u05D9\u05D5\u05D1 \u05D4\u05E9\u05DE\u05D7\u05D4 \u05D5\u05D3\u05E8\u05DB\u05D9 \u05D4\u05E9\u05D2\u05EA\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-simcha.pdf",
    pages: 64
  },
  {
    id: "teshuva",
    title: "\u05EA\u05E9\u05D5\u05D1\u05D4",
    titleEnglish: "Teshuva",
    description: "\u05D3\u05E8\u05DB\u05D9 \u05D4\u05EA\u05E9\u05D5\u05D1\u05D4 \u05D5\u05D4\u05D7\u05D6\u05E8\u05D4 \u05D1\u05EA\u05E9\u05D5\u05D1\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-teshuva.pdf",
    pages: 64
  },
  {
    id: "tikun-chatzos",
    title: "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D7\u05E6\u05D5\u05EA",
    titleEnglish: "Tikun Chatzos",
    description: "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D7\u05E6\u05D5\u05EA \u05DC\u05D9\u05DC\u05D4 \u05D5\u05E7\u05E8\u05D9\u05D0\u05EA \u05EA\u05D9\u05E7\u05D5\u05E0\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-tikkun-chatzot.pdf",
    pages: 64
  },
  {
    id: "truth",
    title: "\u05D0\u05DE\u05EA",
    titleEnglish: "Truth",
    description: "\u05D7\u05E9\u05D9\u05D1\u05D5\u05EA \u05D4\u05D0\u05DE\u05EA \u05D5\u05D4\u05D9\u05DE\u05E0\u05E2\u05D5\u05EA \u05DE\u05D4\u05E9\u05E7\u05E8",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-emes.pdf",
    pages: 64
  },
  {
    id: "viduy-divarim",
    title: "\u05D5\u05D9\u05D3\u05D5\u05D9 \u05D3\u05D1\u05E8\u05D9\u05DD",
    titleEnglish: "Viduy Divarim",
    description: "\u05D5\u05D9\u05D3\u05D5\u05D9 \u05D5\u05EA\u05D9\u05E7\u05D5\u05DF \u05E2\u05DC \u05D3\u05D1\u05E8\u05D9\u05DD \u05E8\u05E2\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-viduy-divarim.pdf",
    pages: 64
  },
  {
    id: "wedding",
    title: "\u05D7\u05EA\u05D5\u05E0\u05D4",
    titleEnglish: "Wedding",
    description: "\u05D4\u05DC\u05DB\u05D5\u05EA \u05D5\u05D7\u05D9\u05D6\u05D5\u05E7\u05D9\u05DD \u05DC\u05D7\u05EA\u05D5\u05E0\u05D4 \u05D5\u05E0\u05D9\u05E9\u05D5\u05D0\u05D9\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Brochures H\xE9bra\xEFques",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-chatunah.pdf",
    pages: 80
  },
  {
    id: "chalukei-hanachal",
    title: "\u05D7\u05DC\u05D5\u05E7\u05D9 \u05D4\u05E0\u05D7\u05DC",
    titleEnglish: "Chalukei Hanachal",
    description: "\u05E4\u05D9\u05E8\u05D5\u05E9\u05D9\u05DD \u05D5\u05D1\u05D9\u05D0\u05D5\u05E8\u05D9\u05DD \u05E2\u05DC \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Chalukei Hanachal",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-pamphlet-chilukay-hanachal.pdf",
    pages: 24
  },
  {
    id: "chayei-moharan",
    title: '\u05D7\u05D9\u05D9 \u05DE\u05D4\u05E8"\u05DF',
    titleEnglish: "Chayei Moharan",
    description: "\u05E1\u05D9\u05E4\u05D5\u05E8 \u05D7\u05D9\u05D9\u05D5 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Chayei Moharan",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-chayi-maharan-version2.pdf",
    pages: 640
  },
  {
    id: "eitzos-mevuaros",
    title: "\u05E2\u05E6\u05D5\u05EA \u05D4\u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA",
    titleEnglish: "Eitzos Mevu'aros",
    description: "\u05E2\u05E6\u05D5\u05EA \u05DE\u05D1\u05D5\u05D0\u05E8\u05D5\u05EA \u05D5\u05DE\u05E4\u05D5\u05E8\u05D8\u05D5\u05EA \u05DC\u05D7\u05D9\u05D9 \u05D9\u05D5\u05DD \u05D9\u05D5\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Eitzos Mevu'aros",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-eitzot-hamevoarot.pdf",
    pages: 384
  },
  {
    id: "eitzos-yesharos",
    title: "\u05E2\u05E6\u05D5\u05EA \u05D9\u05E9\u05E8\u05D5\u05EA",
    titleEnglish: "Eitzos Yesharos",
    description: "\u05E2\u05E6\u05D5\u05EA \u05D9\u05E9\u05E8\u05D5\u05EA \u05D5\u05D8\u05D5\u05D1\u05D5\u05EA \u05DC\u05D7\u05D9\u05D9 \u05E7\u05D3\u05D5\u05E9\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Eitzos Yesharos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-eitzos-yisharos.pdf",
    pages: 256
  },
  {
    id: "kinat-hashem-tzvaos",
    title: "\u05E7\u05E0\u05D0\u05EA \u05D4' \u05E6\u05D1\u05D0\u05D5\u05EA",
    titleEnglish: "Kinat Hashem Tzva'os",
    description: "\u05E2\u05DC \u05E7\u05E0\u05D0\u05EA \u05D4' \u05D5\u05DE\u05DC\u05D7\u05DE\u05D4 \u05D1\u05E8\u05E2",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Hebrew Books",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-kinat-hashem-tzivakos.pdf",
    pages: 192
  },
  {
    id: "kuntress-hatzirufim",
    title: "\u05E7\u05D5\u05E0\u05D8\u05E8\u05E1 \u05D4\u05E6\u05D9\u05E8\u05D5\u05E4\u05D9\u05DD",
    titleEnglish: "Kuntress Hatzirufim",
    description: "\u05E6\u05D9\u05E8\u05D5\u05E4\u05D9 \u05D0\u05D5\u05EA\u05D9\u05D5\u05EA \u05D5\u05E7\u05DE\u05D9\u05E2\u05D5\u05EA \u05E7\u05D3\u05D5\u05E9\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Hebrew Books",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-kuntress-hatzirufim.pdf",
    pages: 48
  },
  {
    id: "ohr-haorot",
    title: "\u05D0\u05D5\u05E8 \u05D4\u05D0\u05D5\u05E8\u05D5\u05EA",
    titleEnglish: "Ohr Ha'oros",
    description: "\u05D0\u05D5\u05E8\u05D5\u05EA \u05D5\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD \u05E2\u05DC \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Hebrew Books",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-ohr-haorot.pdf",
    pages: 288
  },
  {
    id: "hishtapchus-hanefesh",
    title: "\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA \u05D4\u05E0\u05E4\u05E9",
    titleEnglish: "Outpouring of the Soul",
    description: "\u05D4\u05EA\u05E4\u05D9\u05DC\u05D4 \u05D4\u05D4\u05E9\u05EA\u05E4\u05DB\u05D5\u05EA \u05DC\u05E4\u05E0\u05D9 \u05D4\u05D1\u05D5\u05E8\u05D0",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Hishtapchs HaNefesh",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-hishtapchus-hanefesh.pdf",
    pages: 242
  },
  {
    id: "kochvei-ohr",
    title: "\u05DB\u05D5\u05DB\u05D1\u05D9 \u05D0\u05D5\u05E8",
    titleEnglish: "Kochvei Ohr",
    description: "\u05DC\u05D9\u05E7\u05D5\u05D8 \u05D0\u05D5\u05E8\u05D5\u05EA \u05D5\u05D7\u05D9\u05D3\u05D5\u05E9\u05D9\u05DD \u05DE\u05EA\u05D5\u05E8\u05EA \u05D4\u05E8\u05D1\u05D9",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Kochvei Ohr",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-kochvay-ohr-personal-use-only.pdf",
    pages: 480
  },
  {
    id: "likutey-eitzos",
    title: "\u05DC\u05E7\u05D5\u05D8\u05D9 \u05E2\u05E6\u05D5\u05EA",
    titleEnglish: "Likutey Eitzos",
    description: "\u05D0\u05D5\u05E1\u05E3 \u05E2\u05E6\u05D5\u05EA \u05E7\u05D3\u05D5\u05E9\u05D5\u05EA \u05DC\u05DB\u05DC \u05E2\u05E0\u05D9\u05D9\u05E0\u05D9 \u05D4\u05D7\u05D9\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Eitzos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-likutay-eitzot.pdf",
    pages: 576
  },
  {
    id: "likutey-halachos",
    title: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA",
    titleEnglish: "Likutey Halachos",
    description: "\u05D1\u05D9\u05D0\u05D5\u05E8 \u05D4\u05D4\u05DC\u05DB\u05D5\u05EA \u05DC\u05D0\u05D5\u05E8 \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Halachos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/likutay-halachos-part1.pdf",
    pages: 500
  },
  {
    id: "kitzur-likutey-moharan-2",
    title: '\u05E2\u05D5\u05D3 \u05E1\u05E4\u05E8 \u05E7\u05D9\u05E6\u05D5\u05E8 \u05DC\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF',
    titleEnglish: "Another Kitzur Likutey Moharan Book",
    description: "\u05E7\u05D9\u05E6\u05D5\u05E8 \u05E0\u05D5\u05E1\u05E3 \u05E9\u05DC \u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Moharan",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-kitzur-likutay-maharan-2.pdf",
    pages: 416
  },
  {
    id: "kitzur-likutey-moharan",
    title: '\u05E7\u05E6\u05D5\u05E8 \u05DC\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D4\u05E8"\u05DF',
    titleEnglish: "Kitzur Likutey Moharan",
    description: '\u05E7\u05D9\u05E6\u05D5\u05E8 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05DC\u05E2\u05D9\u05D5\u05DF \u05D9\u05D5\u05DE\u05D9',
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Moharan",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-kitzur-likutay-maharan.pdf",
    pages: 383
  },
  {
    id: "likutey-moharan-full",
    title: '\u05DC\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D4\u05E8"\u05DF \u05D4\u05E9\u05DC\u05DD \u05E2\u05DD \u05EA\u05E8\u05D2\u05D5\u05DD \u05D0\u05E8\u05DE\u05D9',
    titleEnglish: "Likutey Moharan The Complete with Aramaic Translation",
    description: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05D4\u05E9\u05DC\u05DD \u05E2\u05DD \u05EA\u05E8\u05D2\u05D5\u05DD \u05D0\u05E8\u05DE\u05D9 \u05DE\u05DC\u05D0',
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Moharan",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-likutey-moharan-full.pdf",
    pages: 1440
  },
  {
    id: "likutey-moharan-tanina",
    title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05D7\u05DC\u05E7 \u05D1',
    titleEnglish: "Likutey Moharan Vol. 2",
    description: "\u05D7\u05DC\u05E7 \u05E9\u05E0\u05D9 \u05E9\u05DC \u05D4\u05E1\u05E4\u05E8 \u05D4\u05E2\u05D9\u05E7\u05E8\u05D9 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Moharan",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-likutey-moharan-tanina.pdf",
    pages: 93
  },
  {
    id: "likutey-moharan-kamah",
    title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05D7\u05DC\u05E7 \u05D0',
    titleEnglish: "Likutey Moharan Volume 1",
    description: "\u05D7\u05DC\u05E7 \u05E8\u05D0\u05E9\u05D5\u05DF \u05E9\u05DC \u05D4\u05E1\u05E4\u05E8 \u05D4\u05E2\u05D9\u05E7\u05E8\u05D9 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Moharan",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-likutey-moharan-kamah.pdf",
    pages: 254
  },
  {
    id: "likutey-tefilos",
    title: "\u05DC\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    titleEnglish: "Likutey Tefilos",
    description: "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DE\u05D9\u05D5\u05D7\u05D3\u05D5\u05EA \u05D5\u05DE\u05DC\u05D0 \u05E8\u05D2\u05E9 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Likutey Tefilos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-likutay-tefilos.pdf",
    pages: 1152
  },
  {
    id: "megilat-koheles",
    title: "\u05DE\u05D2\u05DC\u05EA \u05E7\u05D4\u05DC\u05EA",
    titleEnglish: "Megilat Koheles",
    description: "\u05E4\u05D9\u05E8\u05D5\u05E9 \u05DE\u05D2\u05D9\u05DC\u05EA \u05E7\u05D4\u05DC\u05EA \u05DC\u05D0\u05D5\u05E8 \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Megilat Koheles",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-kohelet-likutay-halachos.pdf",
    pages: 352
  },
  {
    id: "meshivas-nefesh",
    title: "\u05DE\u05E9\u05D9\u05D1\u05EA \u05E0\u05E4\u05E9",
    titleEnglish: "Meshivas Nefesh",
    description: "\u05D4\u05E9\u05D1\u05EA \u05D4\u05E0\u05E4\u05E9 \u05DC\u05D8\u05D4\u05E8\u05EA\u05D4 \u05D5\u05DC\u05E7\u05D3\u05D5\u05E9\u05EA\u05D4",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Meshivas Nefesh",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-mishivas-nefesh.pdf",
    pages: 224
  },
  {
    id: "sefer-hamidos",
    title: "\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA",
    titleEnglish: "Sefer Hamidos",
    description: "\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D9\u05D3\u05D5\u05EA \u05D4\u05E7\u05D3\u05D5\u05E9 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Sefer Hamidos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-sefer-hamedos-(1).pdf",
    pages: 320
  },
  {
    id: "shemos-hatzadikim",
    title: "\u05E9\u05DE\u05D5\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD",
    titleEnglish: "Shemos Hatzadikim",
    description: "\u05E9\u05DE\u05D5\u05EA \u05D4\u05E6\u05D3\u05D9\u05E7\u05D9\u05DD \u05D5\u05EA\u05DB\u05D5\u05E0\u05D5\u05EA\u05D9\u05D4\u05DD \u05D4\u05E7\u05D3\u05D5\u05E9\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Shemos Hatzadikim",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-shemot-hatzadikim.pdf",
    pages: 72
  },
  {
    id: "shivchay-sichos-haran",
    title: '\u05E9\u05D1\u05D7\u05D9 \u05D5\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8"\u05DF',
    titleEnglish: "Shivchay & Sichos Haran",
    description: "\u05E9\u05D1\u05D7\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05D5\u05E9\u05D9\u05D7\u05D5\u05EA\u05D9\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9\u05D5\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Shivchay & Sichos Haran",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-shivchay-and-sichos-haran.pdf",
    pages: 446
  },
  {
    id: "siddur-breslov",
    title: "\u05E1\u05D9\u05D3\u05D5\u05E8 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05E9\u05D7\u05E8\u05D9\u05EA \u05DB\u05D5\u05DC\u05DC \u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9, \u05EA\u05D9\u05E7\u05D5\u05DF \u05D7\u05E6\u05D5\u05EA \u05D5\u05E2\u05D5\u05D3",
    titleEnglish: "Siddur Breslov Shacharis including Tikkun HaKlali, Tikkun Chatzos and more",
    description: "\u05E1\u05D9\u05D3\u05D5\u05E8 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DB\u05DE\u05E0\u05D4\u05D2 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05E2\u05DD \u05EA\u05D9\u05E7\u05D5\u05E0\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Siddur",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-breslov-siddur-shacharis.pdf",
    pages: 256
  },
  {
    id: "more-stories",
    title: "\u05E2\u05D5\u05D3 \u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
    titleEnglish: "More Stories",
    description: "\u05E2\u05D5\u05D3 \u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05DE\u05D5\u05E4\u05DC\u05D0\u05D9\u05DD \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Siporay Masiyos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-siporay-masiyos-version6.pdf",
    pages: 448
  },
  {
    id: "siporay-masiyos-v2",
    title: '\u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05E2\u05DD \u05D9"\u05D2 \u05E1\u05E4\u05D5\u05E8\u05D9\u05DD',
    titleEnglish: "Siporay Masiyos",
    description: "\u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05E2\u05DD \u05E9\u05DC\u05D5\u05E9\u05D4 \u05E2\u05E9\u05E8 \u05E1\u05E4\u05D5\u05E8\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Siporay Masiyos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-siporay-masiyos-version2.pdf",
    pages: 368
  },
  {
    id: "stories-parables-more",
    title: "\u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05D5\u05E2\u05D5\u05D3 \u05DE\u05E9\u05DC\u05D9\u05DD \u05D5\u05E1\u05E4\u05D5\u05E8\u05D9\u05DD",
    titleEnglish: "Stories and More Parables and Stories",
    description: "\u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05E2\u05DD \u05DE\u05E9\u05DC\u05D9\u05DD \u05D5\u05E1\u05E4\u05D5\u05E8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Siporay Masiyos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-siporay-masiyos.pdf",
    pages: 480
  },
  {
    id: "stories-parables-personal",
    title: "\u05DE\u05E9\u05DC\u05D9\u05DD \u05D5\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD (\u05DC\u05E9\u05DE\u05D5\u05E9 \u05E4\u05E8\u05D8\u05D9 \u05D1\u05DC\u05D1\u05D3)",
    titleEnglish: "Stories and Parables (For Personal Use Only)",
    description: "\u05DE\u05E9\u05DC\u05D9\u05DD \u05D5\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05DC\u05E9\u05D9\u05DE\u05D5\u05E9 \u05E4\u05E8\u05D8\u05D9 \u05D1\u05DC\u05D1\u05D3",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Siporay Masiyos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-siporim-umishalim.pdf",
    pages: 453
  },
  {
    id: "stories-sages-only",
    title: "\u05E1\u05E4\u05E8 \u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA- \u05E8\u05E7 \u05D4\u05E1\u05E4\u05D5\u05E8\u05D9\u05DD",
    titleEnglish: "Stories of Our Sages - Only the Stories",
    description: "\u05E1\u05E4\u05E8 \u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA - \u05E8\u05E7 \u05D4\u05E1\u05E4\u05D5\u05E8\u05D9\u05DD \u05E2\u05E6\u05DE\u05DD",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Siporay Masiyos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-siporay-masiyos-version4.pdf",
    pages: 350
  },
  {
    id: "stories-rabbi-nachman",
    title: "\u05E1\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
    titleEnglish: "Stories of Rabbi Nachman",
    description: "\u05E1\u05E4\u05D5\u05E8\u05D9 \u05D4\u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05D4\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Siporay Masiyos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-siporay-masiyos-version3.pdf",
    pages: 348
  },
  {
    id: "tikkun-haklali",
    title: "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9",
    titleEnglish: "Tikkun Haklali",
    description: "\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05DB\u05DC\u05DC\u05D9 - \u05E2\u05E9\u05E8\u05D4 \u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD \u05DC\u05EA\u05D9\u05E7\u05D5\u05DF \u05D4\u05D1\u05E8\u05D9\u05EA",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Tikkun HaKlali",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/english-tikkun-haklali.pdf",
    pages: 25
  },
  {
    id: "torahs-utefilos",
    title: "\u05EA\u05D5\u05E8\u05D5\u05EA \u05D5\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    titleEnglish: "Torahs Utefilos",
    description: "\u05EA\u05D5\u05E8\u05D5\u05EA \u05D5\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA \u05DE\u05D9\u05D5\u05D7\u05D3\u05D5\u05EA \u05DE\u05D0\u05D5\u05E1\u05E3 \u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF",
    author: "\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Torahs Utefilos",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-torah-utefila-2.pdf",
    pages: 928
  },
  {
    id: "yimay-maharant",
    title: '\u05D9\u05DE\u05D9 \u05DE\u05D5\u05D4\u05E8\u05E0"\u05EA - \u05D9\u05DE\u05D9 \u05D4\u05EA\u05DC\u05D0\u05D5\u05EA',
    titleEnglish: "Yimay Maharant - Yimay Hatlaos",
    description: '\u05D9\u05DE\u05D9 \u05DE\u05D5\u05D4\u05E8\u05E0"\u05EA - \u05EA\u05D9\u05D0\u05D5\u05E8 \u05D9\u05DE\u05D9 \u05D4\u05EA\u05DC\u05D0\u05D5\u05EA \u05D5\u05D4\u05D9\u05E1\u05D5\u05E8\u05D9\u05DD',
    author: "\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
    category: "Yimay Maharant",
    language: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    downloadUrl: "https://breslovbooks.com/uploads/files/hebrew-yemay-mornat-yemay-hatalos.pdf",
    pages: 512
  }
];

// server/ragContext.ts
var rabbiNachmanTeachings = [
  {
    id: "joy",
    title: "\u05DE\u05E6\u05D5\u05D4 \u05D2\u05D3\u05D5\u05DC\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA \u05D1\u05E9\u05DE\u05D7\u05D4 \u05EA\u05DE\u05D9\u05D3 - \u05D4\u05EA\u05D5\u05E8\u05D4 \u05D4\u05E9\u05DC\u05DE\u05D4",
    content: '"\u05DE\u05B4\u05E6\u05B0\u05D5\u05B8\u05D4 \u05D2\u05B0\u05BC\u05D3\u05D5\u05B9\u05DC\u05B8\u05D4 \u05DC\u05B4\u05D4\u05B0\u05D9\u05D5\u05B9\u05EA \u05D1\u05B0\u05BC\u05E9\u05B4\u05C2\u05DE\u05B0\u05D7\u05B8\u05D4 \u05EA\u05B8\u05BC\u05DE\u05B4\u05D9\u05D3"',
    verbatim: true,
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05EA\u05D5\u05E8\u05D4 \u05DB\u05F4\u05D3",
    description: '\u05D6\u05D5\u05D4\u05D9 \u05D4\u05EA\u05D5\u05E8\u05D4 \u05D4\u05DE\u05E4\u05D5\u05E8\u05E1\u05DE\u05EA \u05D1\u05D9\u05D5\u05EA\u05E8 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05E2\u05DC \u05D4\u05E9\u05DE\u05D7\u05D4. \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05DE\u05D2\u05DC\u05D4 \u05DB\u05D0\u05DF \u05E9\u05D4\u05E9\u05DE\u05D7\u05D4 \u05D0\u05D9\u05E0\u05D4 \u05E8\u05E7 "\u05DE\u05E6\u05D1 \u05E8\u05D5\u05D7 \u05E0\u05D7\u05DE\u05D3" \u05D0\u05DC\u05D0 \u05DE\u05E6\u05D5\u05D5\u05D4 \u05DE\u05DE\u05E9 - \u05D5\u05DB\u05DC\u05D9 \u05E8\u05E4\u05D5\u05D0\u05D9 \u05D7\u05D6\u05E7 \u05DC\u05E0\u05E4\u05E9 \u05D5\u05DC\u05D2\u05D5\u05E3. \u05DB\u05DC \u05DE\u05D7\u05DC\u05D4 \u05D1\u05D0\u05D4 \u05DE\u05E7\u05DC\u05E7\u05D5\u05DC \u05D4\u05E9\u05DE\u05D7\u05D4, \u05D5\u05DC\u05DB\u05DF \u05D4\u05E9\u05DE\u05D7\u05D4 \u05D4\u05D9\u05D0 \u05E8\u05E4\u05D5\u05D0\u05D4 \u05D2\u05D3\u05D5\u05DC\u05D4.',
    theme: "\u05E9\u05DE\u05D7\u05D4 \u05DB\u05D9\u05E1\u05D5\u05D3 \u05D4\u05E2\u05D1\u05D5\u05D3\u05D4"
  },
  {
    id: "prayer",
    title: "\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA - \u05D4\u05E9\u05D9\u05D7\u05D4 \u05D4\u05E0\u05E9\u05D2\u05D1\u05EA \u05E2\u05DD \u05D4\u05D1\u05D5\u05E8\u05D0",
    content: `\u05E2"\u05E4 \u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5: \u05E6\u05E8\u05D9\u05DA \u05DC\u05E7\u05D1\u05D5\u05E2 \u05D6\u05DE\u05DF \u05D1\u05DB\u05DC \u05D9\u05D5\u05DD \u05DC\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA \u05D5\u05DC\u05D4\u05E8\u05D7\u05D1\u05EA \u05D4\u05E9\u05D9\u05D7\u05D4 \u05D1\u05DC\u05E9\u05D5\u05DF \u05D0\u05E9\u05DB\u05E0\u05D6 \u05DC\u05E4\u05E0\u05D9 \u05D4' \u05D9\u05EA\u05D1\u05E8\u05DA`,
    verbatim: false,
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05D7\u05DC\u05E7 \u05D0, \u05EA\u05D5\u05E8\u05D4 \u05DB\u05F4\u05D4",
    description: "\u05D6\u05D5\u05D4\u05D9 \u05D4\u05EA\u05D5\u05E8\u05D4 \u05D4\u05DE\u05D9\u05D5\u05D7\u05D3\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05E2\u05DC \u05D4\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA - \u05D4\u05EA\u05E4\u05D9\u05DC\u05D4 \u05D4\u05D0\u05D9\u05E9\u05D9\u05EA \u05D1\u05DC\u05E9\u05D5\u05DF \u05E9\u05DC\u05E0\u05D5. \u05E8\u05D1\u05D9\u05E0\u05D5 \u05DE\u05DC\u05DE\u05D3 \u05E9\u05E6\u05E8\u05D9\u05DA \u05DC\u05E7\u05D1\u05D5\u05E2 \u05D6\u05DE\u05DF \u05E7\u05D1\u05D5\u05E2 \u05DE\u05D3\u05D9 \u05D9\u05D5\u05DD \u05DC\u05E9\u05D9\u05D7\u05D4 \u05E4\u05E8\u05D8\u05D9\u05EA \u05E2\u05DD \u05D4', \u05D3\u05D5\u05E7\u05D0 \u05D1\u05E9\u05E4\u05EA \u05D4\u05D0\u05DD \u05DB\u05D3\u05D9 \u05DC\u05E9\u05E4\u05D5\u05DA \u05D0\u05EA \u05D4\u05DC\u05D1 \u05DB\u05DE\u05D9\u05DD.",
    theme: "\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA \u05D5\u05EA\u05E4\u05D9\u05DC\u05D4"
  },
  {
    id: "faith",
    title: "\u05D0\u05DE\u05D5\u05E0\u05D4 \u05E4\u05E9\u05D5\u05D8\u05D4 - \u05D9\u05E1\u05D5\u05D3 \u05DB\u05DC \u05D4\u05D9\u05E1\u05D5\u05D3\u05D5\u05EA",
    content: `\u05E2"\u05E4 \u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5: \u05D4\u05E2\u05D9\u05E7\u05E8 \u05DC\u05D9\u05DC\u05DA \u05D1\u05D0\u05DE\u05D5\u05E0\u05D4 \u05E4\u05E9\u05D5\u05D8\u05D4 \u05EA\u05DE\u05D9\u05DE\u05D4 \u05D1\u05DC\u05D9 \u05D7\u05DB\u05DE\u05D5\u05EA \u05DB\u05DC\u05DC, \u05DB\u05D9 "\u05EA\u05DD \u05EA\u05D4\u05D9\u05D4 \u05E2\u05DD \u05D4' \u05D0\u05DC\u05D4\u05D9\u05DA"`,
    verbatim: false,
    source: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8"\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05E1\u05D9\u05DE\u05DF \u05DC\u05D2',
    description: "\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05DE\u05D2\u05DC\u05D4 \u05DB\u05D0\u05DF \u05D0\u05EA \u05D4\u05E1\u05D5\u05D3 \u05D4\u05E0\u05E2\u05DC\u05DD \u05E9\u05DC \u05D4\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D4\u05D0\u05DE\u05D9\u05EA\u05D9\u05EA. \u05D1\u05E2\u05D5\u05DC\u05DD \u05E9\u05D1\u05D5 \u05DB\u05D5\u05DC\u05DD \u05E8\u05D5\u05E6\u05D9\u05DD \u05DC\u05D4\u05D1\u05D9\u05DF \u05D4\u05DB\u05DC \u05D1\u05E9\u05DB\u05DC, \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05DC\u05DE\u05D3 \u05D0\u05D5\u05EA\u05E0\u05D5 \u05E9\u05D4\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D4\u05D0\u05DE\u05D9\u05EA\u05D9\u05EA \u05D4\u05D9\u05D0 \u05D3\u05D5\u05E7\u05D0 \u05D1\u05E4\u05E9\u05D8\u05D5\u05EA.",
    theme: "\u05D9\u05E1\u05D5\u05D3\u05D5\u05EA \u05D4\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D5\u05D4\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF"
  },
  {
    id: "tikkun",
    title: "\u05D0\u05D9\u05DF \u05E9\u05D5\u05DD \u05D9\u05D0\u05D5\u05E9 \u05D1\u05E2\u05D5\u05DC\u05DD \u05DB\u05DC\u05DC - \u05DE\u05E1\u05E8 \u05D4\u05EA\u05E7\u05D5\u05D5\u05D4 \u05D4\u05E0\u05E6\u05D7\u05D9",
    content: '"\u05D5\u05B0\u05D4\u05B8\u05E2\u05B4\u05E7\u05B8\u05BC\u05E8 \u2013 \u05DC\u05B0\u05D7\u05B7\u05D6\u05B5\u05BC\u05E7 \u05E2\u05B7\u05E6\u05B0\u05DE\u05D5\u05B9 \u05D1\u05B0\u05BC\u05DB\u05B8\u05DC \u05DE\u05B7\u05D4 \u05E9\u05B6\u05BC\u05C1\u05D0\u05B6\u05E4\u05B0\u05E9\u05B8\u05C1\u05E8, \u05DB\u05B4\u05BC\u05D9 \u05D0\u05B5\u05D9\u05DF \u05E9\u05C1\u05D5\u05BC\u05DD \u05D9\u05B5\u05D0\u05D5\u05BC\u05E9\u05C1 \u05D1\u05B8\u05BC\u05E2\u05D5\u05B9\u05DC\u05B8\u05DD \u05DB\u05B0\u05BC\u05DC\u05B8\u05DC"',
    verbatim: true,
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05EA\u05D5\u05E8\u05D4 \u05E2\u05F4\u05D7",
    description: "\u05D6\u05D5\u05D4\u05D9 \u05D0\u05D5\u05DC\u05D9 \u05D4\u05EA\u05D5\u05E8\u05D4 \u05D4\u05D7\u05D6\u05E7\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8 \u05E9\u05D0\u05DE\u05E8 \u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 - \u05D4\u05DE\u05E1\u05E8 \u05E9\u05DE\u05E6\u05D9\u05DC \u05DE\u05D9\u05DC\u05D9\u05D5\u05E0\u05D9 \u05E0\u05E9\u05DE\u05D5\u05EA \u05DE\u05D9\u05D9\u05D0\u05D5\u05E9. \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D2\u05DC\u05D4 \u05DB\u05D0\u05DF \u05D0\u05EA \u05D4\u05E1\u05D5\u05D3: \u05D4\u05D9\u05D9\u05D0\u05D5\u05E9 \u05E2\u05E6\u05DE\u05D5 \u05D4\u05D5\u05D0 \u05EA\u05D7\u05D1\u05D5\u05DC\u05EA \u05D4\u05E9\u05D8\u05DF!",
    theme: "\u05D9\u05E1\u05D5\u05D3\u05D5\u05EA \u05D4\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D5\u05D4\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF"
  },
  {
    id: "humility",
    title: "\u05E2\u05E0\u05D5\u05D5\u05D4 \u05D0\u05DE\u05D9\u05EA\u05D9\u05EA - \u05DE\u05D9 \u05D1\u05D0\u05DE\u05EA \u05D2\u05D3\u05D5\u05DC",
    content: '\u05E2"\u05E4 \u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5: \u05D4\u05E2\u05E0\u05D5\u05D5\u05D4 \u05D4\u05D0\u05DE\u05D9\u05EA\u05D9\u05EA \u05D4\u05D9\u05D0 \u05DC\u05D3\u05E2\u05EA \u05D0\u05EA \u05DE\u05E7\u05D5\u05DD \u05D4\u05D0\u05D3\u05DD - \u05DC\u05D0 \u05D2\u05D0\u05D5\u05D5\u05D4 \u05DB\u05E9\u05D9\u05E9 \u05DC\u05D5 \u05DE\u05E2\u05DC\u05D5\u05EA, \u05DC\u05D0 \u05E2\u05E6\u05D1\u05D5\u05EA \u05DB\u05E9\u05D0\u05D9\u05DF \u05DC\u05D5. \u05D4\u05DB\u05DC \u05DE\u05DF \u05D4\u05E9\u05DD \u05D9\u05EA\u05D1\u05E8\u05DA',
    verbatim: false,
    source: '\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8"\u05DF \u05D0\u05D5\u05EA \u05D6',
    description: '\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05DE\u05D2\u05DC\u05D4 \u05DB\u05D0\u05DF \u05D0\u05EA \u05D4\u05D0\u05DE\u05EA \u05D4\u05E4\u05E0\u05D9\u05DE\u05D9\u05EA \u05E2\u05DC \u05D4\u05E2\u05E0\u05D5\u05D5\u05D4. \u05E8\u05D1\u05D9\u05DD \u05D7\u05D5\u05E9\u05D1\u05D9\u05DD \u05E9\u05E2\u05E0\u05D5\u05D5\u05D4 \u05E4\u05D9\u05E8\u05D5\u05E9\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA "\u05E9\u05E4\u05DC \u05D5\u05E0\u05DB\u05E0\u05E2", \u05D0\u05D1\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05DC\u05DE\u05D3 \u05E9\u05D6\u05D5 \u05D0\u05D9\u05E0\u05D4 \u05E2\u05E0\u05D5\u05D5\u05D4 \u05D0\u05DC\u05D0 \u05E2\u05E6\u05D1\u05D5\u05EA!',
    theme: "\u05DE\u05D9\u05D3\u05D5\u05EA \u05D8\u05D5\u05D1\u05D5\u05EA"
  },
  {
    id: "truth",
    title: "\u05D0\u05DE\u05EA - \u05D9\u05E1\u05D5\u05D3 \u05DB\u05DC \u05D4\u05E7\u05D3\u05D5\u05E9\u05D4",
    content: '\u05E2"\u05E4 \u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5: \u05D4\u05E2\u05D9\u05E7\u05E8 \u05D4\u05DB\u05DC \u05DC\u05D4\u05D9\u05D5\u05EA \u05D0\u05DE\u05D9\u05EA\u05D9, \u05DC\u05D3\u05D1\u05E8 \u05D0\u05DE\u05EA \u05D5\u05DC\u05D7\u05D9\u05D5\u05EA \u05D0\u05DE\u05EA. \u05D4\u05E7\u05D3\u05D5\u05E9 \u05D1\u05E8\u05D5\u05DA \u05D4\u05D5\u05D0 \u05D0\u05DE\u05EA, \u05D5\u05DE\u05D9 \u05E9\u05E8\u05D5\u05E6\u05D4 \u05DC\u05D4\u05EA\u05E7\u05E8\u05D1 \u05D0\u05DC\u05D9\u05D5 \u05D9\u05EA\u05D1\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05D0\u05DE\u05D9\u05EA\u05D9',
    verbatim: false,
    source: '\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8"\u05DF \u05D0\u05D5\u05EA \u05D9\u05D1',
    description: "\u05E8\u05D1\u05D9\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9 \u05DE\u05D2\u05DC\u05D4 \u05DB\u05D0\u05DF \u05D0\u05EA \u05D4\u05D1\u05E1\u05D9\u05E1 \u05DC\u05DB\u05DC \u05E2\u05D1\u05D5\u05D3\u05EA \u05D4' - \u05D4\u05D0\u05DE\u05EA. \u05E8\u05D1\u05D9\u05DD \u05D7\u05D5\u05E9\u05D1\u05D9\u05DD \u05E9\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4' \u05D6\u05D4 \u05E8\u05E7 \u05DC\u05E7\u05D9\u05D9\u05DD \u05DE\u05E6\u05D5\u05D5\u05EA, \u05D0\u05D1\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05DC\u05DE\u05D3 \u05E9\u05D1\u05DC\u05D9 \u05D0\u05DE\u05EA \u05D4\u05DB\u05DC \u05E8\u05D9\u05E7.",
    theme: "\u05DE\u05D9\u05D3\u05D5\u05EA \u05D8\u05D5\u05D1\u05D5\u05EA"
  }
];
var dailyQuotes = [
  {
    id: 1,
    text: '\u05E2"\u05E4 \u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5: "\u05D5\u05B0\u05D4\u05B8\u05E2\u05B4\u05E7\u05B8\u05BC\u05E8 \u2013 \u05DC\u05B0\u05D7\u05B7\u05D6\u05B5\u05BC\u05E7 \u05E2\u05B7\u05E6\u05B0\u05DE\u05D5\u05B9 \u05D1\u05B0\u05BC\u05DB\u05B8\u05DC \u05DE\u05B7\u05D4 \u05E9\u05B6\u05BC\u05C1\u05D0\u05B6\u05E4\u05B0\u05E9\u05B8\u05C1\u05E8, \u05DB\u05B4\u05BC\u05D9 \u05D0\u05B5\u05D9\u05DF \u05E9\u05C1\u05D5\u05BC\u05DD \u05D9\u05B5\u05D0\u05D5\u05BC\u05E9\u05C1 \u05D1\u05B8\u05BC\u05E2\u05D5\u05B9\u05DC\u05B8\u05DD \u05DB\u05B0\u05BC\u05DC\u05B8\u05DC"',
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05EA\u05D5\u05E8\u05D4 \u05E2\u05F4\u05D7, \u05E1\u05E2\u05D9\u05E4\u05D9\u05DD \u05D6\u05F3-\u05D7\u05F3",
    explanation: "\u05D6\u05D5\u05D4\u05D9 \u05D0\u05D5\u05DC\u05D9 \u05D4\u05EA\u05D5\u05E8\u05D4 \u05D4\u05D7\u05D6\u05E7\u05D4 \u05D5\u05D4\u05DE\u05D5\u05E9\u05DC\u05DE\u05EA \u05D1\u05D9\u05D5\u05EA\u05E8 \u05E9\u05E0\u05D9\u05EA\u05E0\u05D4 \u05DC\u05E2\u05D5\u05DC\u05DD \u05E0\u05D2\u05D3 \u05DB\u05D7 \u05D4\u05D9\u05D9\u05D0\u05D5\u05E9 \u05D5\u05D4\u05DE\u05E8\u05D4 \u05E9\u05D7\u05D5\u05E8\u05D4. \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05E4\u05D5\u05EA\u05D7 \u05DB\u05D0\u05DF \u05D0\u05EA \u05E9\u05E2\u05E8\u05D9 \u05D4\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D4\u05D2\u05D3\u05D5\u05DC\u05D4 \u05D1\u05E6\u05D5\u05E8\u05D4 \u05E9\u05DC\u05D0 \u05E0\u05E9\u05DE\u05E2\u05D4 \u05DE\u05E2\u05D5\u05DC\u05DD.",
    theme: "\u05D9\u05E1\u05D5\u05D3\u05D5\u05EA \u05D4\u05D0\u05DE\u05D5\u05E0\u05D4 \u05D5\u05D4\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF",
    practicalApplication: '\u05D1\u05DB\u05DC \u05E8\u05D2\u05E2 \u05E9\u05DC \u05E7\u05D5\u05E9\u05D9, \u05D9\u05D9\u05D0\u05D5\u05E9 \u05D0\u05D5 \u05E0\u05E4\u05D9\u05DC\u05D4 - \u05D7\u05D6\u05D5\u05E8 \u05E2\u05DC \u05D4\u05DE\u05D9\u05DC\u05D9\u05DD "\u05D0\u05D9\u05DF \u05E9\u05D5\u05DD \u05D9\u05D0\u05D5\u05E9 \u05D1\u05E2\u05D5\u05DC\u05DD \u05DB\u05DC\u05DC" \u05DB\u05DE\u05E0\u05D8\u05E8\u05D4 \u05D0\u05DE\u05D9\u05EA\u05D9\u05EA.'
  },
  {
    id: 2,
    text: '"\u05DE\u05B4\u05E6\u05B0\u05D5\u05B8\u05D4 \u05D2\u05B0\u05BC\u05D3\u05D5\u05B9\u05DC\u05B8\u05D4 \u05DC\u05B4\u05D4\u05B0\u05D9\u05D5\u05B9\u05EA \u05D1\u05B0\u05BC\u05E9\u05B4\u05C2\u05DE\u05B0\u05D7\u05B8\u05D4 \u05EA\u05B8\u05BC\u05DE\u05B4\u05D9\u05D3"',
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05EA\u05D5\u05E8\u05D4 \u05DB\u05F4\u05D3",
    explanation: '\u05D6\u05D5\u05D4\u05D9 \u05D4\u05EA\u05D5\u05E8\u05D4 \u05D4\u05DE\u05D4\u05E4\u05DB\u05E0\u05D9\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05E2\u05DC \u05D4\u05E9\u05DE\u05D7\u05D4, \u05E9\u05D4\u05E4\u05DB\u05D4 \u05DC\u05E1\u05D9\u05E1\u05DE\u05D4 \u05E9\u05DC \u05DB\u05DC \u05D1\u05E8\u05E1\u05DC\u05D1. \u05D4\u05E9\u05DE\u05D7\u05D4 \u05D0\u05D9\u05E0\u05D4 "\u05EA\u05D7\u05D5\u05E9\u05D4 \u05E0\u05D7\u05DE\u05D3\u05D4" - \u05D6\u05D5 \u05DE\u05E6\u05D5\u05D5\u05D4 \u05DE\u05DE\u05E9 \u05DE\u05D3\u05D0\u05D5\u05E8\u05D9\u05D9\u05EA\u05D0!',
    theme: "\u05E9\u05DE\u05D7\u05D4 \u05DB\u05D9\u05E1\u05D5\u05D3 \u05D4\u05E2\u05D1\u05D5\u05D3\u05D4",
    practicalApplication: '\u05DB\u05E9\u05D0\u05EA\u05D4 \u05E2\u05E6\u05D5\u05D1 \u05D0\u05D5 \u05DE\u05D3\u05D5\u05DB\u05D0 - \u05D4\u05EA\u05D7\u05DC "\u05DC\u05D4\u05E2\u05DE\u05D9\u05D3 \u05E4\u05E0\u05D9\u05DD" \u05E9\u05E9\u05DE\u05D7 (\u05E9\u05D9\u05E8, \u05E8\u05D9\u05E7\u05D5\u05D3 \u05E7\u05D8\u05DF, \u05D7\u05D9\u05D5\u05DA). \u05EA\u05D5\u05DA \u05D6\u05DE\u05DF \u05E7\u05E6\u05E8 \u05D4\u05E9\u05DE\u05D7\u05D4 \u05D4\u05DE\u05DC\u05D0\u05DB\u05D5\u05EA\u05D9\u05EA \u05EA\u05D4\u05E4\u05DA \u05DC\u05D8\u05D1\u05E2\u05D9\u05EA.'
  },
  {
    id: 3,
    text: '\u05E2"\u05E4 \u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5: "\u05DB\u05DC \u05D4\u05E2\u05D5\u05DC\u05DD \u05DB\u05D5\u05DC\u05D5 \u05D2\u05E9\u05E8 \u05E6\u05E8 \u05DE\u05D0\u05D3, \u05D5\u05D4\u05E2\u05D9\u05E7\u05E8 \u05DC\u05D0 \u05DC\u05E4\u05D7\u05D3 \u05DB\u05DC\u05DC"',
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05EA\u05D5\u05E8\u05D4 \u05DE\u05F4\u05D7",
    explanation: '\u05D6\u05D5\u05D4\u05D9 \u05D0\u05D5\u05DC\u05D9 \u05D4\u05DE\u05E9\u05D7\u05D4 \u05D4\u05E4\u05E1\u05D9\u05DB\u05D5\u05DC\u05D5\u05D2\u05D9\u05EA-\u05E8\u05D5\u05D7\u05E0\u05D9\u05EA \u05D4\u05E2\u05DE\u05D5\u05E7\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF. \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D2\u05DC\u05D4 \u05DB\u05D0\u05DF \u05D0\u05EA \u05E1\u05D5\u05D3 \u05D4\u05D7\u05D9\u05D9\u05DD \u05D4\u05D0\u05E0\u05D5\u05E9\u05D9\u05D9\u05DD: \u05DB\u05DC \u05D4\u05D7\u05D9\u05D9\u05DD \u05D4\u05DD "\u05D2\u05E9\u05E8 \u05E6\u05E8 \u05DE\u05D0\u05D3 \u05DE\u05D0\u05D3".',
    theme: "\u05D4\u05EA\u05DE\u05D5\u05D3\u05D3\u05D5\u05EA \u05E2\u05DD \u05D7\u05D9\u05D9 \u05D4\u05D9\u05D5\u05DE\u05D9\u05D5\u05DD",
    practicalApplication: "\u05D1\u05DB\u05DC \u05DE\u05E6\u05D1 \u05DE\u05DC\u05D7\u05D9\u05E5 \u05D0\u05D5 \u05E7\u05E9\u05D4 - \u05D6\u05DB\u05D5\u05E8 \u05E9\u05D4\u05E4\u05D7\u05D3 \u05D4\u05D5\u05D0 \u05D4\u05D0\u05D5\u05D9\u05D1, \u05DC\u05D0 \u05D4\u05DE\u05E6\u05D1 \u05E2\u05E6\u05DE\u05D5. \u05E2\u05D1\u05D5\u05E8 \u05DC\u05DE\u05E6\u05D1 \u05E9\u05DC \u05E9\u05DE\u05D7\u05D4 \u05D5\u05D1\u05D9\u05D8\u05D7\u05D5\u05DF."
  }
];
var breslovPractices = [
  {
    title: "\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA \u05D9\u05D5\u05DE\u05D9\u05EA - \u05E9\u05E2\u05D4 \u05E2\u05DD \u05D4\u05D1\u05D5\u05E8\u05D0",
    description: "\u05E9\u05E2\u05D4 \u05DE\u05D3\u05D9 \u05D9\u05D5\u05DD \u05DC\u05E9\u05D9\u05D7\u05D4 \u05D0\u05D9\u05E9\u05D9\u05EA \u05E2\u05DD \u05D4'",
    content: '"\u05D3\u05E2! \u05DB\u05E9\u05D4\u05D0\u05D3\u05DD \u05DE\u05EA\u05E4\u05DC\u05DC \u05D1\u05E9\u05D3\u05D4, \u05D0\u05D6\u05D9 \u05DB\u05DC \u05D4\u05E2\u05E9\u05D1\u05D9\u05DD \u05DB\u05D5\u05DC\u05DD \u05D1\u05D0\u05D9\u05DD \u05D1\u05EA\u05D5\u05DA \u05D4\u05EA\u05E4\u05D9\u05DC\u05D4 \u05D5\u05DE\u05E1\u05D9\u05D9\u05E2\u05D9\u05DD \u05DC\u05D5 \u05D5\u05E0\u05D5\u05EA\u05E0\u05D9\u05DD \u05DC\u05D5 \u05DB\u05D7 \u05D1\u05EA\u05E4\u05D9\u05DC\u05EA\u05D5"',
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05EA\u05D5\u05E8\u05D4 \u05D9\u05F4\u05D0",
    practicalGuide: "\u05D1\u05D7\u05E8 \u05DE\u05E7\u05D5\u05DD \u05E9\u05E7\u05D8 \u05D1\u05D1\u05D9\u05EA, \u05D1\u05EA\u05D7\u05D9\u05DC\u05D4 5-10 \u05D3\u05E7\u05D5\u05EA \u05D1\u05D9\u05D5\u05DD, \u05D3\u05D1\u05E8 \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05D0\u05D5 \u05D1\u05E9\u05E4\u05D4 \u05E9\u05DC\u05DA, \u05E4\u05EA\u05D7 \u05D0\u05EA \u05D4\u05DC\u05D1 \u05DB\u05DE\u05D5 \u05E2\u05DD \u05D7\u05D1\u05E8 \u05E7\u05E8\u05D5\u05D1."
  },
  {
    title: "\u05D0\u05DE\u05D9\u05E8\u05EA \u05EA\u05D4\u05D9\u05DC\u05D9\u05DD - \u05EA\u05E8\u05D5\u05E4\u05EA \u05D4\u05E0\u05E9\u05DE\u05D4",
    description: "\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD \u05DB\u05EA\u05E8\u05D5\u05E4\u05D4 \u05DC\u05E0\u05E4\u05E9 \u05D5\u05DC\u05D2\u05D5\u05E3",
    content: '\u05E2"\u05E4 \u05D3\u05D1\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5: \u05D4\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD \u05D4\u05DD \u05E1\u05D2\u05D5\u05DC\u05D4 \u05E0\u05E4\u05DC\u05D0\u05D4 \u05DC\u05DB\u05DC \u05D3\u05D1\u05E8, \u05D4\u05DF \u05DC\u05E0\u05E4\u05E9 \u05D4\u05DF \u05DC\u05D2\u05D5\u05E3. \u05DE\u05D9 \u05E9\u05D0\u05D5\u05DE\u05E8 \u05EA\u05D4\u05D9\u05DC\u05D9\u05DD \u05D1\u05DB\u05D5\u05D5\u05E0\u05D4 \u05DE\u05EA\u05E7\u05DF \u05E0\u05D6\u05E7\u05D9\u05DD \u05D2\u05D3\u05D5\u05DC\u05D9\u05DD \u05D1\u05E0\u05E9\u05DE\u05EA\u05D5',
    source: '\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E8"\u05DF \u05D0\u05D5\u05EA \u05DE\u05D3',
    practicalGuide: "\u05D0\u05DE\u05D5\u05E8 \u05DE\u05D6\u05DE\u05D5\u05E8\u05D9\u05DD \u05D9\u05D3\u05D5\u05E2\u05D9\u05DD \u05D1\u05DB\u05D5\u05D5\u05E0\u05D4 (\u05EA\u05D4\u05D9\u05DC\u05D9\u05DD \u05DB, \u05DB\u05D2, \u05DE\u05D1), \u05D4\u05EA\u05E8\u05DB\u05D6 \u05D1\u05DE\u05E9\u05DE\u05E2\u05D5\u05EA \u05D4\u05DE\u05D9\u05DC\u05D9\u05DD."
  },
  {
    title: "\u05E9\u05DE\u05D7\u05D4 \u05EA\u05DE\u05D9\u05D3 - \u05DE\u05E6\u05D5\u05D4 \u05D2\u05D3\u05D5\u05DC\u05D4",
    description: "\u05DC\u05E9\u05DE\u05D5\u05D7 \u05D1\u05DB\u05DC \u05DE\u05E6\u05D5\u05D4 \u05D5\u05D1\u05DB\u05DC \u05E8\u05D2\u05E2",
    content: '"\u05DE\u05B4\u05E6\u05B0\u05D5\u05B8\u05D4 \u05D2\u05B0\u05BC\u05D3\u05D5\u05B9\u05DC\u05B8\u05D4 \u05DC\u05B4\u05D4\u05B0\u05D9\u05D5\u05B9\u05EA \u05D1\u05B0\u05BC\u05E9\u05B4\u05C2\u05DE\u05B0\u05D7\u05B8\u05D4 \u05EA\u05B8\u05BC\u05DE\u05B4\u05D9\u05D3"',
    source: "\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05F4\u05DF \u05EA\u05E0\u05D9\u05E0\u05D0, \u05EA\u05D5\u05E8\u05D4 \u05DB\u05F4\u05D3",
    practicalGuide: "\u05DE\u05E6\u05D0 \u05D3\u05D1\u05E8 \u05D0\u05D7\u05D3 \u05D7\u05D9\u05D5\u05D1\u05D9 \u05D1\u05DB\u05DC \u05D9\u05D5\u05DD, \u05EA\u05D5\u05D3\u05D4 \u05DC\u05D4' \u05E2\u05DC \u05D4\u05D8\u05D5\u05D1 \u05D4\u05E7\u05D8\u05DF \u05E9\u05D9\u05E9 \u05DC\u05DA, \u05E2\u05E9\u05D4 \u05D3\u05D1\u05E8\u05D9\u05DD \u05E9\u05DE\u05E9\u05DE\u05D7\u05D9\u05DD \u05D0\u05D5\u05EA\u05DA \u05D1\u05E7\u05D3\u05D5\u05E9\u05D4."
  }
];
var siteInformation = {
  name: "\u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9 - HaEsh Sheli",
  description: '\u05D4\u05D0\u05EA\u05E8 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC \u05D1\u05E2\u05D5\u05DC\u05DD \u05DC\u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9\u05D9\u05DD \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D6\u05E6"\u05DC',
  mission: "\u05D4\u05E4\u05E6\u05EA \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D1\u05E8\u05D7\u05D1\u05D9 \u05D4\u05E2\u05D5\u05DC\u05DD \u05D1\u05D0\u05DE\u05E6\u05E2\u05D5\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD \u05D0\u05D9\u05DB\u05D5\u05EA\u05D9\u05D9\u05DD \u05D5\u05DE\u05E9\u05DC\u05D5\u05D7\u05D9\u05DD \u05DE\u05D4\u05D9\u05E8\u05D9\u05DD",
  slogan: "\u05E8\u05E7 \u05EA\u05E0\u05D5 \u05DC\u05D9 \u05D0\u05EA \u05DC\u05D9\u05D1\u05DB\u05DD \u05D5\u05D0\u05D5\u05DC\u05D9\u05DA \u05D0\u05EA\u05DB\u05DD \u05D1\u05D3\u05E8\u05DA \u05D7\u05D3\u05E9\u05D4.. (\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF)",
  mainCategories: [
    "\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9\u05E0\u05D5",
    "\u05EA\u05E4\u05D9\u05DC\u05D5\u05EA",
    "\u05DE\u05DB\u05EA\u05D1\u05D9\u05DD \u05D5\u05DB\u05EA\u05D1\u05D9\u05DD",
    "\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05D5\u05DE\u05E2\u05E9\u05D9\u05D5\u05EA",
    "\u05DE\u05D5\u05E1\u05E8 \u05D5\u05D4\u05D3\u05E8\u05DB\u05D4",
    "\u05D4\u05EA\u05D1\u05D5\u05D3\u05D3\u05D5\u05EA \u05D5\u05EA\u05E4\u05D9\u05DC\u05D4"
  ],
  specialties: [
    "\u05E1\u05E4\u05E8\u05D9\u05DD \u05D1\u05D0\u05D9\u05DB\u05D5\u05EA \u05D4\u05D3\u05E4\u05E1\u05D4 \u05DE\u05E2\u05D5\u05DC\u05D4",
    "\u05DB\u05E8\u05D9\u05DB\u05D5\u05EA \u05DE\u05D2\u05D5\u05D5\u05E0\u05D5\u05EA - \u05E2\u05D5\u05E8, \u05E1\u05E7\u05D0\u05D9, \u05D3\u05DE\u05D5\u05D9 \u05E2\u05D5\u05E8",
    "\u05D2\u05D3\u05DC\u05D9\u05DD \u05E9\u05D5\u05E0\u05D9\u05DD - \u05E7\u05D8\u05DF, \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9, \u05D2\u05D3\u05D5\u05DC, \u05E2\u05E0\u05E7",
    "\u05DE\u05E9\u05DC\u05D5\u05D7\u05D9\u05DD \u05DC\u05DB\u05DC \u05D4\u05E2\u05D5\u05DC\u05DD",
    "\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05D1\u05E8\u05DE\u05D4 \u05D2\u05D1\u05D5\u05D4\u05D4",
    "\u05D9\u05D9\u05E2\u05D5\u05E5 \u05D0\u05D9\u05E9\u05D9 \u05DC\u05D1\u05D7\u05D9\u05E8\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD"
  ],
  languages: ["\u05E2\u05D1\u05E8\u05D9\u05EA", "\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA", "\u05E6\u05E8\u05E4\u05EA\u05D9\u05EA", "\u05E1\u05E4\u05E8\u05D3\u05D9\u05EA", "\u05E8\u05D5\u05E1\u05D9\u05EA"],
  contact: {
    email: "support@haesh-sheli.co.il",
    phone: "+972-2-123-4567"
  }
};
function buildChatContext() {
  const breslovBooks = Object.values(realBreslovProducts).map((product) => ({
    id: product.id,
    name: product.name,
    nameEnglish: product.nameEnglish,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    author: product.author,
    publisher: product.publisher,
    language: product.language,
    pages: product.pages,
    features: product.features,
    tags: product.tags,
    variants: (product.variants || []).map((variant) => ({
      format: variant.format,
      binding: variant.binding,
      size: variant.size,
      price: variant.price,
      inStock: variant.inStock
    }))
  }));
  return {
    breslovBooks,
    rabbiNachmanTeachings,
    dailyQuotes,
    breslovPractices,
    downloadableBooks: breslovDownloadBooks,
    siteInformation
  };
}
function createSystemPrompt() {
  const context = buildChatContext();
  return `\u05D0\u05EA\u05D4 \u05E2\u05D5\u05D6\u05E8 AI \u05DE\u05E7\u05E6\u05D5\u05E2\u05D9 \u05D5\u05DE\u05D5\u05DE\u05D7\u05D4 \u05DC\u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D5\u05DC\u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1. \u05D0\u05EA\u05D4 \u05DE\u05D9\u05D9\u05E6\u05D2 \u05D0\u05EA \u05D4\u05D0\u05EA\u05E8 "\u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9" (HaEsh Sheli) - \u05D4\u05D0\u05EA\u05E8 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC \u05D1\u05E2\u05D5\u05DC\u05DD \u05DC\u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9\u05D9\u05DD.

## \u05EA\u05E4\u05E7\u05D9\u05D3\u05DA:
- \u05DC\u05E2\u05E0\u05D5\u05EA \u05E2\u05DC \u05E9\u05D0\u05DC\u05D5\u05EA \u05E2\u05DC \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1 \u05D5\u05E2\u05DC \u05E1\u05E4\u05E8\u05D9\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD
- \u05DC\u05D4\u05DE\u05DC\u05D9\u05E5 \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9\u05DD \u05DE\u05EA\u05D0\u05D9\u05DE\u05D9\u05DD \u05D1\u05D4\u05EA\u05D0\u05DD \u05DC\u05E6\u05E8\u05DB\u05D9 \u05D4\u05DC\u05E7\u05D5\u05D7
- \u05DC\u05E1\u05E4\u05E7 \u05DE\u05D9\u05D3\u05E2 \u05DE\u05D3\u05D5\u05D9\u05E7 \u05E2\u05DC \u05D4\u05DE\u05D5\u05E6\u05E8\u05D9\u05DD \u05D1\u05D0\u05EA\u05E8 - \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD, \u05D2\u05D3\u05DC\u05D9\u05DD, \u05DB\u05E8\u05D9\u05DB\u05D5\u05EA
- \u05DC\u05D7\u05DC\u05D5\u05E7 \u05D7\u05DB\u05DE\u05D4 \u05D5\u05E6\u05D9\u05D8\u05D5\u05D8\u05D9\u05DD \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9\u05D9\u05DD \u05DE\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF
- \u05DC\u05E2\u05D6\u05D5\u05E8 \u05D1\u05D1\u05D7\u05D9\u05E8\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD \u05DC\u05E7\u05E8\u05D9\u05D0\u05D4 \u05D0\u05D5 \u05DC\u05DE\u05EA\u05E0\u05D4
- \u05DC\u05E2\u05E0\u05D5\u05EA \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05D1\u05E2\u05D9\u05E7\u05E8, \u05D0\u05DA \u05D9\u05DB\u05D5\u05DC \u05D2\u05DD \u05D1\u05D0\u05E0\u05D2\u05DC\u05D9\u05EA, \u05E6\u05E8\u05E4\u05EA\u05D9\u05EA, \u05E1\u05E4\u05E8\u05D3\u05D9\u05EA \u05D5\u05E8\u05D5\u05E1\u05D9\u05EA

## \u05D4\u05E7\u05D5\u05E0\u05D8\u05E7\u05E1\u05D8 \u05E9\u05DC\u05DA:

### \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD \u05D1\u05D0\u05EA\u05E8:
${context.breslovBooks.map(
    (book) => `**${book.name}** (${book.nameEnglish})
  - \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4: ${book.category}
  - \u05EA\u05D9\u05D0\u05D5\u05E8: ${book.description}
  - \u05E2\u05DE\u05D5\u05D3\u05D9\u05DD: ${book.pages}
  - \u05EA\u05DB\u05D5\u05E0\u05D5\u05EA: ${book.features?.join(", ")}
  - \u05D6\u05DE\u05D9\u05DF \u05D1\u05D2\u05D3\u05DC\u05D9\u05DD \u05D5\u05DB\u05E8\u05D9\u05DB\u05D5\u05EA: ${book.variants?.map((v) => `${v.format} ${v.size} (${v.price}\u20AA)`).join(", ")}`
  ).join("\n\n")}

### \u05EA\u05D5\u05E8\u05D5\u05EA \u05D5\u05D0\u05DE\u05E8\u05D5\u05EA \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9\u05D5\u05EA \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF:
${context.rabbiNachmanTeachings.map(
    (teaching) => `**${teaching.title}**
  \u05E6\u05D9\u05D8\u05D5\u05D8: ${teaching.content}
  \u05DE\u05E7\u05D5\u05E8: ${teaching.source}
  \u05D4\u05E1\u05D1\u05E8: ${teaching.description}
  \u05E0\u05D5\u05E9\u05D0: ${teaching.theme}`
  ).join("\n\n")}

### \u05E6\u05D9\u05D8\u05D5\u05D8\u05D9\u05DD \u05D9\u05D5\u05DE\u05D9\u05D9\u05DD:
${context.dailyQuotes.map(
    (quote) => `"${quote.text}"
  \u05DE\u05E7\u05D5\u05E8: ${quote.source}
  \u05D4\u05E1\u05D1\u05E8: ${quote.explanation}
  \u05D9\u05D9\u05E9\u05D5\u05DD \u05DE\u05E2\u05E9\u05D9: ${quote.practicalApplication}`
  ).join("\n\n")}

### \u05E1\u05E4\u05E8\u05D9\u05DD \u05D1\u05D7\u05D9\u05E0\u05DD \u05DC\u05D4\u05D5\u05E8\u05D3\u05D4:
${context.downloadableBooks.slice(0, 10).map(
    (book) => `**${book.title}** (${book.titleEnglish})
  \u05EA\u05D9\u05D0\u05D5\u05E8: ${book.description}
  \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4: ${book.category}
  \u05E2\u05DE\u05D5\u05D3\u05D9\u05DD: ${book.pages}`
  ).join("\n\n")}

## \u05DB\u05DC\u05DC\u05D9\u05DD \u05D7\u05E9\u05D5\u05D1\u05D9\u05DD:
1. **\u05EA\u05DE\u05D9\u05D3** \u05D4\u05E9\u05EA\u05DE\u05E9 \u05D1\u05DE\u05D9\u05D3\u05E2 \u05D4\u05D0\u05D5\u05EA\u05E0\u05D8\u05D9 \u05DE\u05D4\u05E7\u05D5\u05E0\u05D8\u05E7\u05E1\u05D8 \u05DC\u05E2\u05D9\u05DC
2. \u05DB\u05E9\u05DE\u05D6\u05DB\u05D9\u05E8 \u05E1\u05E4\u05E8 - \u05E6\u05D9\u05D9\u05DF \u05D0\u05EA \u05D4\u05DE\u05D7\u05D9\u05E8 \u05D4\u05D0\u05DE\u05D9\u05EA\u05D9 \u05D5\u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05D6\u05DE\u05D9\u05E0\u05D5\u05EA
3. \u05DB\u05E9\u05DE\u05E6\u05D9\u05D2 \u05E6\u05D9\u05D8\u05D5\u05D8 \u05DE\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF - \u05EA\u05DE\u05D9\u05D3 \u05E6\u05D9\u05D9\u05DF \u05D0\u05EA \u05D4\u05DE\u05E7\u05D5\u05E8 \u05D4\u05DE\u05D3\u05D5\u05D9\u05E7
4. \u05D3\u05D1\u05E8 \u05D1\u05DB\u05D1\u05D5\u05D3 \u05D5\u05D1\u05D0\u05D4\u05D1\u05D4 \u05E2\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05D5\u05EA\u05D5\u05E8\u05EA\u05D5
5. \u05D0\u05DD \u05E9\u05D5\u05D0\u05DC\u05D9\u05DD \u05E2\u05DC \u05D3\u05D1\u05E8 \u05E9\u05DC\u05D0 \u05D1\u05E7\u05D5\u05E0\u05D8\u05E7\u05E1\u05D8 - \u05D0\u05DE\u05E8 \u05E9\u05EA\u05D1\u05D3\u05D5\u05E7 \u05D5\u05EA\u05D7\u05D6\u05D5\u05E8
6. \u05E2\u05D5\u05D3\u05D3 \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DC\u05E7\u05E0\u05D5\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD \u05D0\u05D9\u05DB\u05D5\u05EA\u05D9\u05D9\u05DD \u05D1\u05DE\u05E7\u05D5\u05DD \u05DC\u05D4\u05E1\u05EA\u05E4\u05E7 \u05E8\u05E7 \u05D1\u05D4\u05D5\u05E8\u05D3\u05D5\u05EA
7. \u05EA\u05DF \u05E2\u05E6\u05D5\u05EA \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA \u05DC\u05E2\u05D1\u05D5\u05D3\u05EA \u05D4' \u05E2\u05DC \u05E4\u05D9 \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF

\u05D0\u05EA\u05D4 \u05DB\u05D0\u05DF \u05DB\u05D3\u05D9 \u05DC\u05E2\u05D6\u05D5\u05E8 \u05DC\u05D0\u05E0\u05E9\u05D9\u05DD \u05DC\u05D4\u05EA\u05D7\u05D1\u05E8 \u05DC\u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05D4\u05E7\u05D3\u05D5\u05E9\u05D4 \u05D5\u05DC\u05DE\u05E6\u05D5\u05D0 \u05D0\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D9\u05DD \u05DC\u05D4\u05DD.`;
}
function searchRelevantContent(query) {
  const context = buildChatContext();
  const lowerQuery = query.toLowerCase();
  let relevantContent = "";
  const relevantBooks = context.breslovBooks.filter(
    (book) => book.name.includes(query) || book.nameEnglish?.toLowerCase().includes(lowerQuery) || book.description?.toLowerCase().includes(lowerQuery) || book.category?.toLowerCase().includes(lowerQuery) || book.tags?.some((tag) => tag.includes(query))
  );
  if (relevantBooks.length > 0) {
    relevantContent += `

\u05E1\u05E4\u05E8\u05D9\u05DD \u05E8\u05DC\u05D5\u05D5\u05E0\u05D8\u05D9\u05D9\u05DD:
${relevantBooks.map(
      (book) => `${book.name}: ${book.description} (${book.variants?.[0]?.price}\u20AA)`
    ).join("\n")}`;
  }
  const relevantTeachings = context.rabbiNachmanTeachings.filter(
    (teaching) => teaching.title.includes(query) || teaching.content.includes(query) || teaching.description?.includes(query) || teaching.theme?.includes(query)
  );
  if (relevantTeachings.length > 0) {
    relevantContent += `

\u05EA\u05D5\u05E8\u05D5\u05EA \u05E8\u05DC\u05D5\u05D5\u05E0\u05D8\u05D9\u05D5\u05EA:
${relevantTeachings.map(
      (teaching) => `${teaching.title}: ${teaching.content} (${teaching.source})`
    ).join("\n")}`;
  }
  return relevantContent;
}

// server/geminiService.ts
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
async function chatWithGemini(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        response: "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.",
        error: "GEMINI_API_KEY not configured"
      };
    }
    const systemPrompt = createSystemPrompt();
    let contextualInfo = "";
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }
    const conversationContents = [];
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach((msg) => {
        conversationContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
    }
    const userMessage = contextualInfo ? `${request.message}

\u05DE\u05D9\u05D3\u05E2 \u05E8\u05DC\u05D5\u05D5\u05E0\u05D8\u05D9 \u05E0\u05D5\u05E1\u05E3: ${contextualInfo}` : request.message;
    conversationContents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 2048
      },
      contents: conversationContents
    });
    const responseText = response.text || "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05DC\u05D0 \u05D4\u05E6\u05DC\u05D7\u05EA\u05D9 \u05DC\u05E2\u05D1\u05D3 \u05D0\u05EA \u05D4\u05E9\u05D0\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.";
    return {
      response: responseText,
      conversationId: generateConversationId()
    };
  } catch (error) {
    console.error("Gemini chat error:", error);
    let errorMessage = "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E2\u05D9\u05D1\u05D5\u05D3 \u05D4\u05E9\u05D0\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05E8\u05D2\u05E2.";
    if (error.message?.includes("API_KEY")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.";
    } else if (error.message?.includes("quota") || error.message?.includes("limit")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05E2\u05DE\u05D5\u05E1\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D5 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05DB\u05DE\u05D4 \u05D3\u05E7\u05D5\u05EA.";
    } else if (error.message?.includes("safety")) {
      errorMessage = "\u05D4\u05E9\u05D0\u05DC\u05D4 \u05DC\u05D0 \u05E2\u05D1\u05E8\u05D4 \u05D0\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D7 \u05E9\u05D5\u05D1 \u05D1\u05E6\u05D5\u05E8\u05D4 \u05E9\u05D5\u05E0\u05D4.";
    }
    return {
      response: errorMessage,
      error: error.message
    };
  }
}
async function* chatWithGeminiStream(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      yield "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.";
      return;
    }
    const systemPrompt = createSystemPrompt();
    let contextualInfo = "";
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }
    const conversationContents = [];
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach((msg) => {
        conversationContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
    }
    const userMessage = contextualInfo ? `${request.message}

\u05DE\u05D9\u05D3\u05E2 \u05E8\u05DC\u05D5\u05D5\u05E0\u05D8\u05D9 \u05E0\u05D5\u05E1\u05E3: ${contextualInfo}` : request.message;
    conversationContents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 2048
      },
      contents: conversationContents
    });
    for await (const chunk of stream) {
      const text2 = chunk.text;
      if (text2) {
        yield text2;
      }
    }
  } catch (error) {
    console.error("Gemini streaming error:", error);
    let errorMessage = "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E2\u05D9\u05D1\u05D5\u05D3 \u05D4\u05E9\u05D0\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05E8\u05D2\u05E2.";
    if (error.message?.includes("API_KEY")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.";
    } else if (error.message?.includes("quota") || error.message?.includes("limit")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05E2\u05DE\u05D5\u05E1\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D5 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05DB\u05DE\u05D4 \u05D3\u05E7\u05D5\u05EA.";
    }
    yield errorMessage;
  }
}
async function checkGeminiConnection() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        connected: false,
        error: "GEMINI_API_KEY not configured"
      };
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "\u05E9\u05DC\u05D5\u05DD, \u05D6\u05D4 \u05E8\u05E7 \u05D1\u05D3\u05D9\u05E7\u05D4. \u05E2\u05E0\u05D4 \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05D1\u05E7\u05E6\u05E8\u05D4."
    });
    if (response.text) {
      return {
        connected: true,
        model: "gemini-2.5-pro"
      };
    } else {
      return {
        connected: false,
        error: "No response from Gemini API"
      };
    }
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
}
function generateConversationId() {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
async function analyzeUserSentiment(message) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return { sentiment: "neutral", confidence: 0 };
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            sentiment: { type: "string", enum: ["positive", "neutral", "negative"] },
            confidence: { type: "number", minimum: 0, maximum: 1 }
          },
          required: ["sentiment", "confidence"]
        }
      },
      contents: `\u05E0\u05EA\u05D7 \u05D0\u05EA \u05D4\u05E1\u05E0\u05D8\u05D9\u05DE\u05E0\u05D8 \u05E9\u05DC \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D4\u05D1\u05D0\u05D4 \u05D5\u05D3\u05E8\u05D2 \u05D1\u05D9\u05DF positive/neutral/negative \u05E2\u05DD \u05E8\u05DE\u05EA \u05D1\u05D9\u05D8\u05D7\u05D5\u05DF 0-1:
      
      "${message}"`
    });
    if (response.text) {
      const result = JSON.parse(response.text);
      return {
        sentiment: result.sentiment || "neutral",
        confidence: result.confidence || 0.5
      };
    }
    return { sentiment: "neutral", confidence: 0.5 };
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    return { sentiment: "neutral", confidence: 0 };
  }
}

// server/openaiService.ts
var OPENROUTER_API_URL = "https://openrouter.ai/api/v1";
var MODEL_NAME = "openai/gpt-4o-mini";
async function chatWithOpenAI(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        response: "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.",
        error: "OPENAI_API_KEY not configured"
      };
    }
    const systemPrompt = createSystemPrompt();
    let contextualInfo = "";
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach((msg) => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }
    const userMessage = contextualInfo ? `${request.message}

\u05DE\u05D9\u05D3\u05E2 \u05E8\u05DC\u05D5\u05D5\u05E0\u05D8\u05D9 \u05E0\u05D5\u05E1\u05E3: ${contextualInfo}` : request.message;
    messages.push({
      role: "user",
      content: userMessage
    });
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
        stream: false
      })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05DC\u05D0 \u05D4\u05E6\u05DC\u05D7\u05EA\u05D9 \u05DC\u05E2\u05D1\u05D3 \u05D0\u05EA \u05D4\u05E9\u05D0\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.";
    return {
      response: responseText,
      conversationId: generateConversationId2()
    };
  } catch (error) {
    console.error("OpenAI chat error:", error);
    let errorMessage = "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E2\u05D9\u05D1\u05D5\u05D3 \u05D4\u05E9\u05D0\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05E8\u05D2\u05E2.";
    if (error.message?.includes("API_KEY") || error.message?.includes("401")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.";
    } else if (error.message?.includes("quota") || error.message?.includes("limit") || error.message?.includes("429")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05E2\u05DE\u05D5\u05E1\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D5 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05DB\u05DE\u05D4 \u05D3\u05E7\u05D5\u05EA.";
    } else if (error.message?.includes("safety") || error.message?.includes("content_policy")) {
      errorMessage = "\u05D4\u05E9\u05D0\u05DC\u05D4 \u05DC\u05D0 \u05E2\u05D1\u05E8\u05D4 \u05D0\u05EA \u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D7 \u05E9\u05D5\u05D1 \u05D1\u05E6\u05D5\u05E8\u05D4 \u05E9\u05D5\u05E0\u05D4.";
    }
    return {
      response: errorMessage,
      error: error.message
    };
  }
}
async function* chatWithOpenAIStream(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      yield "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.";
      return;
    }
    const systemPrompt = createSystemPrompt();
    let contextualInfo = "";
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach((msg) => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }
    const userMessage = contextualInfo ? `${request.message}

\u05DE\u05D9\u05D3\u05E2 \u05E8\u05DC\u05D5\u05D5\u05E0\u05D8\u05D9 \u05E0\u05D5\u05E1\u05E3: ${contextualInfo}` : request.message;
    messages.push({
      role: "user",
      content: userMessage
    });
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
        stream: true
      })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch (e) {
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("OpenAI streaming error:", error);
    let errorMessage = "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E2\u05D9\u05D1\u05D5\u05D3 \u05D4\u05E9\u05D0\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05E8\u05D2\u05E2.";
    if (error.message?.includes("API_KEY") || error.message?.includes("401")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.";
    } else if (error.message?.includes("quota") || error.message?.includes("limit") || error.message?.includes("429")) {
      errorMessage = "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05E2\u05DE\u05D5\u05E1\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D5 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05DB\u05DE\u05D4 \u05D3\u05E7\u05D5\u05EA.";
    }
    yield errorMessage;
  }
}
async function checkOpenAIConnection() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        connected: false,
        error: "OPENAI_API_KEY not configured"
      };
    }
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "user",
            content: "\u05E9\u05DC\u05D5\u05DD, \u05D6\u05D4 \u05E8\u05E7 \u05D1\u05D3\u05D9\u05E7\u05D4. \u05E2\u05E0\u05D4 \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA \u05D1\u05E7\u05E6\u05E8\u05D4."
          }
        ],
        max_tokens: 50
      })
    });
    if (response.ok) {
      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content;
      if (responseText) {
        return {
          connected: true,
          model: MODEL_NAME
        };
      } else {
        return {
          connected: false,
          error: "No response from OpenAI API"
        };
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      return {
        connected: false,
        error: `API Error: ${response.status} - ${JSON.stringify(errorData)}`
      };
    }
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
}
function generateConversationId2() {
  return `openai_conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
async function analyzeUserSentimentOpenAI(message) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return { sentiment: "neutral", confidence: 0 };
    }
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: "You are a sentiment analysis system. Respond only with valid JSON containing 'sentiment' (positive/neutral/negative) and 'confidence' (0-1)."
          },
          {
            role: "user",
            content: `\u05E0\u05EA\u05D7 \u05D0\u05EA \u05D4\u05E1\u05E0\u05D8\u05D9\u05DE\u05E0\u05D8 \u05E9\u05DC \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05D4\u05D1\u05D0\u05D4 \u05D4\u05D7\u05D6\u05E8 \u05E8\u05E7 JSON \u05E2\u05DD sentiment (positive/neutral/negative) \u05D5-confidence (0-1): "${message}"`
          }
        ],
        max_tokens: 100,
        temperature: 0.3
      })
    });
    if (response.ok) {
      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content;
      if (responseText) {
        try {
          const result = JSON.parse(responseText);
          return {
            sentiment: result.sentiment || "neutral",
            confidence: result.confidence || 0.5
          };
        } catch (parseError) {
          console.error("Failed to parse sentiment response:", parseError);
        }
      }
    }
    return { sentiment: "neutral", confidence: 0.5 };
  } catch (error) {
    console.error("OpenAI Sentiment analysis error:", error);
    return { sentiment: "neutral", confidence: 0 };
  }
}

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
var hasReplitDomains = !!process.env.REPLIT_DOMAINS;
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  if (!hasReplitDomains) {
    console.warn("\u26A0\uFE0F  REPLIT_DOMAINS not set - Auth disabled (local mode)");
    return;
  }
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  if (!hasReplitDomains) {
    return next();
  }
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/routes.ts
var stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  const attachedAssetsPath = path.resolve(process.cwd(), "attached_assets");
  app2.use("/attached_assets", express.static(attachedAssetsPath, {
    setHeaders: (res, filePath) => {
      res.setHeader("Cache-Control", "public, max-age=31536000");
      if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        res.setHeader("Content-Type", "image/jpeg");
      } else if (filePath.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      }
    }
  }));
  app2.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await storage.getAllSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Error fetching subscription plans: " + error.message });
    }
  });
  app2.get("/api/subscription-plans/horat-keva", async (req, res) => {
    try {
      const plan = await storage.getSubscriptionPlan("horat_keva_99");
      if (!plan) {
        return res.status(404).json({ message: "HoRaat Keva plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Error fetching HoRaat Keva plan: " + error.message });
    }
  });
  app2.get("/api/stripe-status", (req, res) => {
    const isConfigured = !!(stripe && process.env.STRIPE_SECRET_KEY);
    res.json({
      configured: isConfigured,
      message: isConfigured ? "Stripe is properly configured" : "Stripe configuration incomplete. Contact support for subscription services.",
      missingConfig: {
        secret_key: !process.env.STRIPE_SECRET_KEY,
        price_id: !process.env.STRIPE_PRICE_ID,
        webhook_secret: !process.env.STRIPE_WEBHOOK_SECRET,
        public_key_needed: "Check VITE_STRIPE_PUBLIC_KEY on frontend"
      }
    });
  });
  app2.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({
        message: "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.",
        messageEn: "Payment system is currently unavailable. Please contact customer service.",
        contactEmail: "support@haesh-sheli.co.il",
        contactPhone: "+972-2-123-4567",
        configured: false
      });
    }
    try {
      const {
        cart,
        shippingAddress,
        billingAddress,
        shippingMethod = "standard",
        email,
        couponCode
      } = req.body;
      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ message: "Cart is required and cannot be empty" });
      }
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!shippingAddress) {
        return res.status(400).json({ message: "Shipping address is required" });
      }
      const validatedCartItems = [];
      let subtotal = 0;
      for (const item of cart) {
        if (!item.productId || !item.variantId || !item.quantity || item.quantity < 1) {
          return res.status(400).json({
            message: "Invalid cart item: missing productId, variantId, or invalid quantity"
          });
        }
        const productVariant = await storage.getProductVariant(item.productId, item.variantId);
        if (!productVariant) {
          return res.status(400).json({
            message: `Product or variant not found: ${item.productId}/${item.variantId}`
          });
        }
        const { product, variant } = productVariant;
        if (!product.isActive) {
          return res.status(400).json({
            message: `Product is not available: ${product.name}`
          });
        }
        if (!variant.inStock) {
          return res.status(400).json({
            message: `Variant is out of stock: ${product.name} - ${variant.format}`
          });
        }
        if (variant.stockQuantity && item.quantity > variant.stockQuantity) {
          return res.status(400).json({
            message: `Insufficient stock for ${product.name} - ${variant.format}. Available: ${variant.stockQuantity}, Requested: ${item.quantity}`
          });
        }
        const serverPrice = variant.price;
        const itemTotal = serverPrice * item.quantity;
        subtotal += itemTotal;
        validatedCartItems.push({
          productId: item.productId,
          variantId: item.variantId,
          productName: product.name,
          productNameEnglish: product.nameEnglish,
          variantDetails: `${variant.format} - ${variant.size}${variant.volumes > 1 ? ` (${variant.volumes} \u05DB\u05E8\u05DB\u05D9\u05DD)` : ""}`,
          quantity: item.quantity,
          unitPrice: serverPrice,
          // Server-side price
          totalPrice: itemTotal,
          product,
          variant
        });
      }
      const user = req.isAuthenticated() ? req.user : null;
      const isSubscriber = user?.isSubscriber || false;
      const subscriberDiscount = isSubscriber ? Math.round(subtotal * 0.05) : 0;
      let couponDiscount = 0;
      let appliedCoupon = null;
      if (couponCode && typeof couponCode === "string") {
        const coupon = await storage.getCouponByCode(couponCode.toUpperCase());
        if (coupon && coupon.isActive && (!coupon.expiresAt || new Date(coupon.expiresAt) >= /* @__PURE__ */ new Date()) && (!coupon.maxUses || coupon.usedCount < coupon.maxUses) && (!coupon.minOrderValue || subtotal >= coupon.minOrderValue)) {
          if (coupon.discountType === "percentage") {
            couponDiscount = Math.round(subtotal * coupon.discountValue / 100);
          } else {
            couponDiscount = coupon.discountValue;
          }
          appliedCoupon = coupon;
          await storage.incrementCouponUsage(coupon.id);
        }
      }
      const shippingResult = await storage.calculateShipping(subtotal, "IL");
      const shippingAmount = shippingResult?.cost || 3e3;
      const totalDiscount = subscriberDiscount + couponDiscount;
      const subtotalAfterDiscount = subtotal - totalDiscount;
      const vatRate = 0.17;
      const vatAmount = Math.round(subtotalAfterDiscount * vatRate);
      const totalAmount = subtotalAfterDiscount + vatAmount + shippingAmount;
      let customerId = user?.stripeCustomerId;
      if (user && !customerId) {
        const customer = await stripe.customers.create({
          email,
          name: shippingAddress.fullName,
          address: {
            line1: shippingAddress.addressLine1,
            line2: shippingAddress.addressLine2,
            city: shippingAddress.city,
            state: shippingAddress.region,
            postal_code: shippingAddress.postalCode,
            country: shippingAddress.country
          },
          phone: shippingAddress.phone,
          metadata: {
            userId: user.id
          }
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(user.id, customerId);
      }
      const order = await storage.createOrder({
        userId: user?.id || null,
        email,
        status: "pending",
        subtotal,
        vatAmount,
        shippingAmount,
        discountAmount: totalDiscount,
        totalAmount,
        shippingMethod,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        paymentMethod: "stripe",
        stripePaymentIntentId: null,
        stripeChargeId: null,
        paymentStatus: "pending",
        trackingNumber: null,
        estimatedDelivery: null,
        deliveredAt: null,
        customerNotes: null,
        adminNotes: null
      });
      for (const item of validatedCartItems) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          variantId: item.variantId,
          productName: item.productName,
          productNameEnglish: item.productNameEnglish || null,
          variantDetails: item.variantDetails,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          // Server-side validated price
          totalPrice: item.totalPrice
          // Server-side calculated total
        });
      }
      const idempotencyKey = `order-${order.id}`;
      const paymentIntentParams = {
        amount: totalAmount,
        // Already in agorot (Israeli cents)
        currency: "ils",
        // Task 81: ILS currency verified
        // Task 82: Payment methods enabled via PaymentElement
        // Supported: card, bit (Israeli instant payment), google_pay, apple_pay
        metadata: {
          orderId: order.id,
          isSubscriber: isSubscriber.toString(),
          subscriberDiscount: subscriberDiscount.toString(),
          couponCode: appliedCoupon?.code || "",
          couponDiscount: couponDiscount.toString()
        },
        description: `Order ${order.id} - Breslov Books`,
        receipt_email: email
      };
      if (customerId) {
        paymentIntentParams.customer = customerId;
      }
      const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams, {
        idempotencyKey
      });
      await storage.updateOrder(order.id, {
        stripePaymentIntentId: paymentIntent.id
      });
      await storage.createPaymentTransaction({
        orderId: order.id,
        provider: "stripe",
        providerTransactionId: paymentIntent.id,
        providerCustomerId: customerId || null,
        amount: totalAmount,
        currency: "ILS",
        status: "pending",
        failureCode: null,
        failureMessage: null,
        refundAmount: 0,
        refundReason: null,
        refundedAt: null,
        metadata: {
          validatedCartItems: validatedCartItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice
          })),
          shippingMethod,
          isSubscriber
        }
      });
      res.json({
        clientSecret: paymentIntent.client_secret,
        orderId: order.id,
        orderSummary: {
          subtotal,
          subscriberDiscount,
          couponDiscount,
          discount: totalDiscount,
          vatAmount,
          shippingAmount,
          totalAmount,
          currency: "ILS",
          appliedCoupon: appliedCoupon ? {
            code: appliedCoupon.code,
            discountType: appliedCoupon.discountType,
            discountValue: appliedCoupon.discountValue
          } : null
        }
      });
    } catch (error) {
      console.error("Payment intent creation error:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });
  app2.post("/api/coupons/validate", async (req, res) => {
    try {
      const { code, subtotal } = req.body;
      if (!code || typeof code !== "string") {
        return res.status(400).json({ message: "Coupon code is required" });
      }
      const coupon = await storage.getCouponByCode(code.toUpperCase());
      if (!coupon) {
        return res.status(404).json({ message: "\u05E7\u05D5\u05D3 \u05E7\u05D5\u05E4\u05D5\u05DF \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF", messageEn: "Invalid coupon code" });
      }
      if (!coupon.isActive) {
        return res.status(400).json({ message: "\u05D4\u05E7\u05D5\u05E4\u05D5\u05DF \u05D0\u05D9\u05E0\u05D5 \u05E4\u05E2\u05D9\u05DC", messageEn: "Coupon is inactive" });
      }
      if (coupon.expiresAt && new Date(coupon.expiresAt) < /* @__PURE__ */ new Date()) {
        return res.status(400).json({ message: "\u05D4\u05E7\u05D5\u05E4\u05D5\u05DF \u05E4\u05D2 \u05EA\u05D5\u05E7\u05E3", messageEn: "Coupon has expired" });
      }
      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
        return res.status(400).json({ message: "\u05D4\u05E7\u05D5\u05E4\u05D5\u05DF \u05E0\u05D5\u05E6\u05DC \u05D1\u05DE\u05DC\u05D5\u05D0\u05D5", messageEn: "Coupon has reached maximum uses" });
      }
      if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
        const minOrderDisplay = (coupon.minOrderValue / 100).toFixed(2);
        return res.status(400).json({
          message: `\u05D4\u05D6\u05DE\u05E0\u05D4 \u05DE\u05D9\u05E0\u05D9\u05DE\u05DC\u05D9\u05EA: \u20AA${minOrderDisplay}`,
          messageEn: `Minimum order: \u20AA${minOrderDisplay}`
        });
      }
      let discountAmount = 0;
      if (coupon.discountType === "percentage") {
        discountAmount = Math.round(subtotal * coupon.discountValue / 100);
      } else {
        discountAmount = coupon.discountValue;
      }
      res.json({
        valid: true,
        coupon: {
          code: coupon.code,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          discountAmount
        },
        message: "\u05E7\u05D5\u05D3 \u05E7\u05D5\u05E4\u05D5\u05DF \u05EA\u05E7\u05D9\u05DF!",
        messageEn: "Coupon code valid!"
      });
    } catch (error) {
      console.error("Coupon validation error:", error);
      res.status(500).json({ message: "Error validating coupon: " + error.message });
    }
  });
  app2.get("/api/coupons", async (req, res) => {
    try {
      const coupons2 = await storage.getAllCoupons();
      res.json(coupons2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching coupons: " + error.message });
    }
  });
  app2.get("/api/shipping-rates", async (req, res) => {
    try {
      const { country = "IL", subtotal } = req.query;
      const rates = await storage.getShippingRates(country);
      const ratesWithCosts = rates.map((rate) => {
        const cost = subtotal && rate.freeShippingThreshold && parseInt(subtotal) >= rate.freeShippingThreshold ? 0 : rate.baseRate;
        return {
          ...rate,
          calculatedCost: cost,
          isFreeShipping: cost === 0
        };
      });
      res.json(ratesWithCosts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching shipping rates: " + error.message });
    }
  });
  app2.get("/api/orders/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await storage.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (req.isAuthenticated() && order.userId && order.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      const orderItems3 = await storage.getOrderItems(orderId);
      const paymentTransactions3 = await storage.getPaymentTransactionsByOrder(orderId);
      res.json({
        order,
        items: orderItems3,
        transactions: paymentTransactions3
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching order: " + error.message });
    }
  });
  app2.post("/api/create-subscription", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({
        message: "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.",
        messageEn: "Payment system is currently unavailable. Please contact customer service.",
        contactEmail: "support@haesh-sheli.co.il",
        contactPhone: "+972-2-123-4567",
        configured: false
      });
    }
    if (!process.env.STRIPE_PRICE_ID) {
      return res.status(503).json({
        message: "\u05EA\u05D5\u05DB\u05E0\u05D9\u05EA \u05D4\u05DE\u05E0\u05D5\u05D9 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.",
        messageEn: "Subscription plan is currently unavailable. Please contact customer service.",
        contactEmail: "support@haesh-sheli.co.il",
        configured: false
      });
    }
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const { email, name } = req.body;
    const user = req.user;
    try {
      if (user.stripeSubscriptionId) {
        const subscription2 = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        if (subscription2.status === "active" || subscription2.status === "trialing") {
          return res.json({
            message: "User already has an active subscription",
            subscriptionId: subscription2.id,
            status: subscription2.status
          });
        }
      }
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: email || user.email,
          name: name || user.username,
          metadata: {
            userId: user.id
          }
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(user.id, customerId);
      }
      const priceId = process.env.STRIPE_PRICE_ID || "price_horat_keva_99_ils";
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId
        }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription"
        },
        expand: ["latest_invoice.payment_intent"]
      });
      await storage.updateUserStripeInfo(user.id, customerId, subscription.id);
      await storage.updateUserSubscriptionStatus(
        user.id,
        subscription.status,
        /* @__PURE__ */ new Date(),
        void 0
      );
      await storage.createSubscriptionHistory({
        userId: user.id,
        subscriptionId: subscription.id,
        eventType: "created",
        stripeEventId: null,
        eventData: { priceId, currency: "ils" }
      });
      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
        status: subscription.status
      });
    } catch (error) {
      console.error("Subscription creation error:", error);
      res.status(500).json({ message: "Error creating subscription: " + error.message });
    }
  });
  app2.post("/api/cancel-subscription", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({
        message: "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DC\u05D1\u05D9\u05D8\u05D5\u05DC \u05D4\u05DE\u05E0\u05D5\u05D9.",
        messageEn: "Payment system is currently unavailable. Please contact customer service to cancel subscription.",
        contactEmail: "support@haesh-sheli.co.il",
        contactPhone: "+972-2-123-4567",
        configured: false
      });
    }
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const user = req.user;
    try {
      if (!user.stripeSubscriptionId) {
        return res.status(400).json({ message: "No active subscription found" });
      }
      const subscription = await stripe.subscriptions.cancel(user.stripeSubscriptionId);
      await storage.updateUserSubscriptionStatus(
        user.id,
        "canceled",
        user.subscriptionStartDate || void 0,
        /* @__PURE__ */ new Date()
      );
      await storage.createSubscriptionHistory({
        userId: user.id,
        subscriptionId: subscription.id,
        eventType: "canceled",
        stripeEventId: null,
        eventData: { canceledAt: /* @__PURE__ */ new Date() }
      });
      res.json({
        message: "Subscription canceled successfully",
        subscription: {
          id: subscription.id,
          status: subscription.status,
          canceledAt: subscription.canceled_at
        }
      });
    } catch (error) {
      console.error("Subscription cancellation error:", error);
      res.status(500).json({ message: "Error canceling subscription: " + error.message });
    }
  });
  app2.get("/api/user/subscription", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    try {
      const user = req.user;
      const subscriptionHistory3 = await storage.getSubscriptionHistoryByUser(user.id);
      let stripeSubscription = null;
      if (stripe && user.stripeSubscriptionId) {
        try {
          stripeSubscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        } catch (error) {
          console.warn("Could not retrieve Stripe subscription:", error);
        }
      }
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isSubscriber: user.isSubscriber,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionStartDate: user.subscriptionStartDate,
          subscriptionEndDate: user.subscriptionEndDate,
          subscriptionPlanId: user.subscriptionPlanId
        },
        stripeSubscription,
        history: subscriptionHistory3
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching subscription status: " + error.message });
    }
  });
  app2.post("/api/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
    if (!stripe) {
      return res.status(503).send("Stripe not configured");
    }
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn("Stripe webhook secret not configured, skipping signature verification");
    }
    let event;
    try {
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        event = JSON.parse(req.body.toString());
      }
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
      switch (event.type) {
        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          const orderId = paymentIntent.metadata.orderId;
          if (orderId) {
            await storage.updateOrder(orderId, {
              paymentStatus: "succeeded",
              status: "processing",
              stripeChargeId: paymentIntent.latest_charge
            });
            const transactions = await storage.getPaymentTransactionsByOrder(orderId);
            const transaction = transactions.find((t) => t.providerTransactionId === paymentIntent.id);
            if (transaction) {
              await storage.updatePaymentTransaction(transaction.id, {
                status: "succeeded"
              });
            }
            try {
              const order = await storage.getOrder(orderId);
              const orderItems3 = await storage.getOrderItems(orderId);
              if (order && orderItems3.length > 0) {
                const isSubscriber = paymentIntent.metadata.isSubscriber === "true";
                await sendOrderConfirmation({
                  orderId: order.id,
                  customerName: order.shippingAddress?.fullName || "\u05DC\u05E7\u05D5\u05D7 \u05D9\u05E7\u05E8",
                  email: order.email,
                  items: orderItems3.map((item) => ({
                    name: item.productName,
                    nameEnglish: item.productNameEnglish || void 0,
                    quantity: item.quantity,
                    price: item.unitPrice,
                    variant: item.variantDetails
                  })),
                  shippingAddress: order.shippingAddress,
                  orderSummary: {
                    subtotal: order.subtotal,
                    discount: order.discountAmount,
                    vatAmount: order.vatAmount,
                    shippingAmount: order.shippingAmount,
                    totalAmount: order.totalAmount,
                    currency: "ILS"
                  },
                  isSubscriber
                });
                console.log(`Order confirmation email sent for order ${orderId}`);
              }
            } catch (emailError) {
              console.error(`Failed to send confirmation email for order ${orderId}:`, emailError);
            }
            console.log(`Payment succeeded for order ${orderId}`);
          }
          break;
        }
        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object;
          const orderId = paymentIntent.metadata.orderId;
          if (orderId) {
            await storage.updateOrder(orderId, {
              paymentStatus: "failed"
            });
            const transactions = await storage.getPaymentTransactionsByOrder(orderId);
            const transaction = transactions.find((t) => t.providerTransactionId === paymentIntent.id);
            if (transaction) {
              await storage.updatePaymentTransaction(transaction.id, {
                status: "failed",
                failureCode: paymentIntent.last_payment_error?.code,
                failureMessage: paymentIntent.last_payment_error?.message
              });
            }
            console.log(`Payment failed for order ${orderId}`);
          }
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      res.json({ received: true });
    } catch (error) {
      console.error("Error handling webhook:", error);
      res.status(500).json({ error: "Webhook handler failed" });
    }
  });
  app2.get("/api/chat/status", async (req, res) => {
    try {
      const status = await checkGeminiConnection();
      res.json({
        ...status,
        message: status.connected ? "\u05E6'\u05D0\u05D8 \u05E2\u05DD \u05DE\u05D5\u05DE\u05D7\u05D4 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05D6\u05DE\u05D9\u05DF - \u05E9\u05D0\u05DC \u05DB\u05DC \u05E9\u05D0\u05DC\u05D4 \u05E2\u05DC \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF!" : "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.",
        features: [
          "\u05DE\u05D5\u05DE\u05D7\u05D4 \u05DC\u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
          "\u05DE\u05D9\u05D3\u05E2 \u05E2\u05DC \u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05D1\u05D0\u05EA\u05E8",
          "\u05E6\u05D9\u05D8\u05D5\u05D8\u05D9\u05DD \u05D5\u05EA\u05D5\u05E8\u05D5\u05EA \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9\u05D5\u05EA",
          "\u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05D0\u05D9\u05E9\u05D9\u05D5\u05EA \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9\u05DD",
          "\u05EA\u05DE\u05D9\u05DB\u05D4 \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA, \u05D0\u05E0\u05D2\u05DC\u05D9\u05EA, \u05E6\u05E8\u05E4\u05EA\u05D9\u05EA \u05D5\u05E2\u05D5\u05D3"
        ]
      });
    } catch (error) {
      res.status(500).json({
        connected: false,
        error: "Status check failed",
        message: "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA."
      });
    }
  });
  app2.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({
          error: "Message is required",
          message: "\u05D0\u05E0\u05D0 \u05DB\u05EA\u05D1 \u05E9\u05D0\u05DC\u05D4 \u05D0\u05D5 \u05D4\u05D5\u05D3\u05E2\u05D4."
        });
      }
      const sentiment = await analyzeUserSentiment(message);
      const chatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };
      const response = await chatWithGemini(chatRequest);
      if (req.isAuthenticated() && response.conversationId) {
        console.log(`Chat session for user ${req.user.id}: ${response.conversationId}, sentiment: ${sentiment.sentiment}`);
      }
      res.json({
        ...response,
        sentiment,
        timestamp: /* @__PURE__ */ new Date(),
        userId: req.isAuthenticated() ? req.user.id : null
      });
    } catch (error) {
      console.error("Chat endpoint error:", error);
      res.status(500).json({
        error: "Chat failed",
        response: "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05E8\u05D2\u05E2.",
        message: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05E4\u05E0\u05D9\u05DE\u05D9\u05EA \u05D1\u05E9\u05E8\u05EA \u05D4\u05E6'\u05D0\u05D8."
      });
    }
  });
  app2.post("/api/chat/stream", async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({
          error: "Message is required",
          message: "\u05D0\u05E0\u05D0 \u05DB\u05EA\u05D1 \u05E9\u05D0\u05DC\u05D4 \u05D0\u05D5 \u05D4\u05D5\u05D3\u05E2\u05D4."
        });
      }
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Cache-Control");
      const chatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };
      const streamGenerator = chatWithGeminiStream(chatRequest);
      for await (const chunk of streamGenerator) {
        if (chunk && chunk.trim().length > 0) {
          res.write(chunk);
        }
      }
      res.end();
    } catch (error) {
      console.error("Streaming chat error:", error);
      if (!res.headersSent) {
        res.status(500).json({
          error: "Streaming chat failed",
          message: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05D9\u05E8\u05D5\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D4\u05D6\u05D5\u05E8\u05DD."
        });
      } else {
        res.write("\n\n\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E2\u05D9\u05D1\u05D5\u05D3 \u05D4\u05E9\u05D0\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.");
        res.end();
      }
    }
  });
  app2.post("/api/chat/save-conversation", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({
          error: "Authentication required",
          message: "\u05E0\u05D3\u05E8\u05E9\u05EA \u05D4\u05D6\u05D3\u05D4\u05D5\u05EA \u05DC\u05E9\u05DE\u05D9\u05E8\u05EA \u05E9\u05D9\u05D7\u05D5\u05EA."
        });
      }
      const { conversationId, messages, title } = req.body;
      if (!conversationId || !messages || !Array.isArray(messages)) {
        return res.status(400).json({
          error: "Invalid conversation data",
          message: "\u05E0\u05EA\u05D5\u05E0\u05D9 \u05E9\u05D9\u05D7\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D9\u05DD."
        });
      }
      res.json({
        success: true,
        message: "\u05D4\u05E9\u05D9\u05D7\u05D4 \u05E0\u05E9\u05DE\u05E8\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4.",
        conversationId,
        savedAt: /* @__PURE__ */ new Date()
      });
    } catch (error) {
      console.error("Save conversation error:", error);
      res.status(500).json({
        error: "Failed to save conversation",
        message: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05DE\u05D9\u05E8\u05EA \u05D4\u05E9\u05D9\u05D7\u05D4."
      });
    }
  });
  app2.post("/api/chat/book-recommendations", async (req, res) => {
    try {
      const { interests, level, language = "hebrew" } = req.body;
      const recommendationPrompt = `\u05D1\u05D4\u05EA\u05D1\u05E1\u05E1 \u05E2\u05DC \u05D4\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05E9\u05DE\u05E2\u05E0\u05D9\u05D9\u05E0\u05D9\u05DD \u05D0\u05D5\u05EA\u05D9: ${interests}, \u05D5\u05E8\u05DE\u05EA \u05D4\u05DC\u05D9\u05DE\u05D5\u05D3 \u05E9\u05DC\u05D9: ${level}, \u05EA\u05DF \u05DC\u05D9 3-5 \u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05DE\u05DE\u05D5\u05E7\u05D3\u05D5\u05EA \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05DE\u05D4\u05E7\u05D8\u05DC\u05D5\u05D2 \u05E9\u05DC \u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9. \u05DB\u05DC\u05D5\u05DC \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD \u05D5\u05EA\u05D9\u05D0\u05D5\u05E8\u05D9\u05DD \u05E7\u05E6\u05E8\u05D9\u05DD.`;
      const chatRequest = {
        message: recommendationPrompt,
        useRAG: true
      };
      const response = await chatWithGemini(chatRequest);
      res.json({
        recommendations: response.response,
        basedOn: { interests, level, language },
        timestamp: /* @__PURE__ */ new Date()
      });
    } catch (error) {
      console.error("Book recommendations error:", error);
      res.status(500).json({
        error: "Failed to get recommendations",
        message: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D1\u05DC\u05EA \u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD."
      });
    }
  });
  app2.get("/api/openai/status", async (req, res) => {
    try {
      const status = await checkOpenAIConnection();
      res.json({
        ...status,
        message: status.connected ? "\u05E6'\u05D0\u05D8 \u05E2\u05DD ChatGPT 4o-mini \u05D6\u05DE\u05D9\u05DF - \u05E9\u05D0\u05DC \u05DB\u05DC \u05E9\u05D0\u05DC\u05D4 \u05E2\u05DC \u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF!" : "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05E2\u05DD OpenAI \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA.",
        features: [
          "ChatGPT 4o-mini (OpenAI \u05D3\u05E8\u05DA Open Router)",
          "\u05DE\u05D5\u05DE\u05D7\u05D4 \u05DC\u05EA\u05D5\u05E8\u05EA \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1",
          "\u05DE\u05D9\u05D3\u05E2 \u05E2\u05DC \u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05D1\u05D0\u05EA\u05E8",
          "\u05E6\u05D9\u05D8\u05D5\u05D8\u05D9\u05DD \u05D5\u05EA\u05D5\u05E8\u05D5\u05EA \u05D0\u05D5\u05EA\u05E0\u05D8\u05D9\u05D5\u05EA",
          "\u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05D0\u05D9\u05E9\u05D9\u05D5\u05EA \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9\u05DD",
          "\u05EA\u05DE\u05D9\u05DB\u05D4 \u05D1\u05E2\u05D1\u05E8\u05D9\u05EA, \u05D0\u05E0\u05D2\u05DC\u05D9\u05EA, \u05E6\u05E8\u05E4\u05EA\u05D9\u05EA \u05D5\u05E2\u05D5\u05D3"
        ]
      });
    } catch (error) {
      res.status(500).json({
        connected: false,
        error: "OpenAI status check failed",
        message: "\u05DE\u05E2\u05E8\u05DB\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05E2\u05DD OpenAI \u05D0\u05D9\u05E0\u05D4 \u05D6\u05DE\u05D9\u05E0\u05D4 \u05DB\u05E8\u05D2\u05E2. \u05D0\u05E0\u05D0 \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05E2\u05DD \u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA."
      });
    }
  });
  app2.post("/api/openai/chat", async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({
          error: "Message is required",
          message: "\u05D0\u05E0\u05D0 \u05DB\u05EA\u05D1 \u05E9\u05D0\u05DC\u05D4 \u05D0\u05D5 \u05D4\u05D5\u05D3\u05E2\u05D4."
        });
      }
      const sentiment = await analyzeUserSentimentOpenAI(message);
      const chatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };
      const response = await chatWithOpenAI(chatRequest);
      if (req.isAuthenticated() && response.conversationId) {
        console.log(`OpenAI Chat session for user ${req.user.id}: ${response.conversationId}, sentiment: ${sentiment.sentiment}`);
      }
      res.json({
        ...response,
        sentiment,
        timestamp: /* @__PURE__ */ new Date(),
        userId: req.isAuthenticated() ? req.user.id : null,
        provider: "openai"
      });
    } catch (error) {
      console.error("OpenAI Chat endpoint error:", error);
      res.status(500).json({
        error: "OpenAI Chat failed",
        response: "\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA OpenAI. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1 \u05D1\u05E2\u05D5\u05D3 \u05E8\u05D2\u05E2.",
        message: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05E4\u05E0\u05D9\u05DE\u05D9\u05EA \u05D1\u05E9\u05E8\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05E2\u05DD OpenAI."
      });
    }
  });
  app2.post("/api/openai/stream", async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({
          error: "Message is required",
          message: "\u05D0\u05E0\u05D0 \u05DB\u05EA\u05D1 \u05E9\u05D0\u05DC\u05D4 \u05D0\u05D5 \u05D4\u05D5\u05D3\u05E2\u05D4."
        });
      }
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Cache-Control");
      const chatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };
      const streamGenerator = chatWithOpenAIStream(chatRequest);
      for await (const chunk of streamGenerator) {
        if (chunk && chunk.trim().length > 0) {
          res.write(chunk);
        }
      }
      res.end();
    } catch (error) {
      console.error("OpenAI Streaming chat error:", error);
      if (!res.headersSent) {
        res.status(500).json({
          error: "OpenAI Streaming chat failed",
          message: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E9\u05D9\u05E8\u05D5\u05EA \u05D4\u05E6'\u05D0\u05D8 \u05D4\u05D6\u05D5\u05E8\u05DD \u05E2\u05DD OpenAI."
        });
      } else {
        res.write("\n\n\u05DE\u05E6\u05D8\u05E2\u05E8, \u05D0\u05D9\u05E8\u05E2\u05D4 \u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA OpenAI. \u05D0\u05E0\u05D0 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.");
        res.end();
      }
    }
  });
  app2.post("/api/openai/book-recommendations", async (req, res) => {
    try {
      const { interests, level, language = "hebrew" } = req.body;
      const recommendationPrompt = `\u05D1\u05D4\u05EA\u05D1\u05E1\u05E1 \u05E2\u05DC \u05D4\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05E9\u05DE\u05E2\u05E0\u05D9\u05D9\u05E0\u05D9\u05DD \u05D0\u05D5\u05EA\u05D9: ${interests}, \u05D5\u05E8\u05DE\u05EA \u05D4\u05DC\u05D9\u05DE\u05D5\u05D3 \u05E9\u05DC\u05D9: ${level}, \u05EA\u05DF \u05DC\u05D9 3-5 \u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05DE\u05DE\u05D5\u05E7\u05D3\u05D5\u05EA \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05DE\u05D4\u05E7\u05D8\u05DC\u05D5\u05D2 \u05E9\u05DC \u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9. \u05DB\u05DC\u05D5\u05DC \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD \u05D5\u05EA\u05D9\u05D0\u05D5\u05E8\u05D9\u05DD \u05E7\u05E6\u05E8\u05D9\u05DD. \u05D4\u05E9\u05EA\u05DE\u05E9 \u05D1\u05D9\u05D3\u05E2 \u05E9\u05DC\u05DA \u05E2\u05DC \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1 \u05D4\u05DE\u05D5\u05EA\u05D0\u05DE\u05D9\u05DD \u05DC\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05E9\u05DC\u05D9.`;
      const chatRequest = {
        message: recommendationPrompt,
        useRAG: true
      };
      const response = await chatWithOpenAI(chatRequest);
      res.json({
        recommendations: response.response,
        basedOn: { interests, level, language },
        timestamp: /* @__PURE__ */ new Date(),
        provider: "openai"
      });
    } catch (error) {
      console.error("OpenAI Book recommendations error:", error);
      res.status(500).json({
        error: "Failed to get OpenAI recommendations",
        message: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D1\u05DC\u05EA \u05D4\u05DE\u05DC\u05E6\u05D5\u05EA \u05E1\u05E4\u05E8\u05D9\u05DD \u05DE-OpenAI."
      });
    }
  });
  app2.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
    return app2._router.handle(
      Object.assign(req, { url: "/api/stripe-webhook", originalUrl: "/api/webhooks/stripe" }),
      res,
      () => {
      }
    );
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import compression from "vite-plugin-compression";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : [],
    // Gzip compression for production
    ...process.env.NODE_ENV === "production" ? [
      compression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 1024
      }),
      compression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024
      })
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Optimizations for Lighthouse
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      }
    },
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1e3,
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          // React vendor chunk
          "react-vendor": ["react", "react-dom", "react-hook-form"],
          // Radix UI chunks - grouped by functionality
          "radix-ui-overlay": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-popover",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-hover-card"
          ],
          "radix-ui-forms": [
            "@radix-ui/react-select",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch",
            "@radix-ui/react-label"
          ],
          "radix-ui-navigation": [
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-menubar",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-tabs"
          ],
          "radix-ui-misc": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-avatar",
            "@radix-ui/react-progress",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
            "@radix-ui/react-toast"
          ],
          // Other heavy vendors
          "query-vendor": ["@tanstack/react-query"],
          "router-vendor": ["wouter"],
          "ui-vendor": ["lucide-react", "framer-motion"],
          "stripe-vendor": ["@stripe/stripe-js", "@stripe/react-stripe-js"],
          "chart-vendor": ["recharts"]
        },
        // Optimize chunk file names
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    }
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5080", 10);
  const host = process.env.HOST || "127.0.0.1";
  server.listen(port, host, () => {
    log(`serving on http://${host}:${port}`);
  });
})();
