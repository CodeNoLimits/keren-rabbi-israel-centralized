import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, json, boolean, timestamp, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - REQUIRED for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table - Updated for Replit Auth compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Keep default for migration compatibility
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
  subscriptionStatus: text("subscription_status").$type<'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid' | null>(),
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  subscriptionPlanId: text("subscription_plan_id").default("horat_keva_99"),
  isSubscriber: boolean("is_subscriber").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Replit Auth types
export type UpsertUser = typeof users.$inferInsert;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Subscription plans table
export const subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  nameHebrew: text("name_hebrew").notNull(),
  description: text("description").notNull(),
  descriptionHebrew: text("description_hebrew").notNull(),
  price: integer("price").notNull(), // in agorot (shekels * 100)
  currency: text("currency").notNull().default("ILS"),
  intervalType: text("interval_type").$type<'month' | 'year'>().notNull().default('month'),
  intervalCount: integer("interval_count").notNull().default(1),
  stripePriceId: text("stripe_price_id").unique(),
  features: json("features").$type<string[]>(),
  featuresHebrew: json("features_hebrew").$type<string[]>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

// Subscription history table for tracking subscription events
export const subscriptionHistory = pgTable("subscription_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  subscriptionId: text("subscription_id").notNull(),
  eventType: text("event_type").$type<'created' | 'activated' | 'canceled' | 'renewed' | 'failed' | 'past_due'>().notNull(),
  stripeEventId: text("stripe_event_id").unique(),
  eventData: json("event_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriptionHistorySchema = createInsertSchema(subscriptionHistory);
export type InsertSubscriptionHistory = z.infer<typeof insertSubscriptionHistorySchema>;
export type SubscriptionHistory = typeof subscriptionHistory.$inferSelect;

// Products table for real Breslov books data
export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  nameEnglish: text("name_english"),
  nameFrench: text("name_french"),
  nameSpanish: text("name_spanish"),
  nameRussian: text("name_russian"),
  description: text("description").notNull(),
  descriptionEnglish: text("description_english"),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  author: text("author").default("רבי נחמן מברסלב"),
  publisher: text("publisher").default("קרן רבי ישראל"),
  language: text("language").default("עברית"),
  pages: integer("pages"),
  isbn: text("isbn"),
  images: json("images").$type<string[]>(),
  variants: json("variants").$type<ProductVariant[]>(),
  features: json("features").$type<string[]>(),
  tags: json("tags").$type<string[]>(),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
});

export interface ProductVariant {
  id: string;
  format: string; // סקאי, עור, דמוי עור, למנציה
  binding: string; // רך, קשה
  size: string; // קטן, בינוני, גדול, ענק
  dimensions: string; // 12*8, 17*12, 24*17, 32*22
  volumes: number; // מספר כרכים
  price: number; // מחיר בשקלים
  originalPrice?: number;
  inStock: boolean;
  stockQuantity?: number;
}

export const insertProductSchema = createInsertSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Downloads table for real PDF links
export const downloads = pgTable("downloads", {
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
  isActive: boolean("is_active").default(true),
});

export const insertDownloadSchema = createInsertSchema(downloads);
export type InsertDownload = z.infer<typeof insertDownloadSchema>;
export type Download = typeof downloads.$inferSelect;

// Orders table for checkout system
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  email: text("email").notNull(),
  status: text("status").$type<'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled' | 'refunded'>().default('pending'),
  
  // Order totals (in agorot - Israeli cents)
  subtotal: integer("subtotal").notNull(), // Before taxes and shipping
  vatAmount: integer("vat_amount").notNull(), // 17% VAT in Israel
  shippingAmount: integer("shipping_amount").notNull(),
  discountAmount: integer("discount_amount").default(0), // Subscriber discount, coupons, etc.
  totalAmount: integer("total_amount").notNull(), // Final amount charged
  
  // Shipping information
  shippingMethod: text("shipping_method").notNull(), // standard, express, pickup
  shippingAddress: json("shipping_address").$type<ShippingAddress>(),
  billingAddress: json("billing_address").$type<ShippingAddress>(),
  
  // Payment information
  paymentMethod: text("payment_method").notNull(), // stripe, paypal, cash_on_delivery
  stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
  stripeChargeId: text("stripe_charge_id").unique(),
  paymentStatus: text("payment_status").$type<'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled'>().default('pending'),
  
  // Order tracking
  trackingNumber: text("tracking_number"),
  estimatedDelivery: timestamp("estimated_delivery"),
  deliveredAt: timestamp("delivered_at"),
  
  // Customer notes
  customerNotes: text("customer_notes"),
  adminNotes: text("admin_notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export interface ShippingAddress {
  fullName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string; // State/Province
  postalCode: string;
  country: string;
  phone: string;
}

export const insertOrderSchema = createInsertSchema(orders);
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items table
export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id),
  productId: varchar("product_id").notNull(),
  variantId: text("variant_id").notNull(),
  
  // Product details at time of order (for historical accuracy)
  productName: text("product_name").notNull(),
  productNameEnglish: text("product_name_english"),
  variantDetails: json("variant_details").$type<ProductVariant>(),
  
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(), // Price per item in agorot
  totalPrice: integer("total_price").notNull(), // quantity * unitPrice
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems);
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Payment transactions table for tracking all payment attempts
export const paymentTransactions = pgTable("payment_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id),
  
  // Payment provider details
  provider: text("provider").notNull(), // stripe, paypal, etc.
  providerTransactionId: text("provider_transaction_id").unique(),
  providerCustomerId: text("provider_customer_id"),
  
  // Transaction details
  amount: integer("amount").notNull(), // in agorot
  currency: text("currency").default("ILS"),
  status: text("status").$type<'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled' | 'refunded'>().notNull(),
  
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPaymentTransactionSchema = createInsertSchema(paymentTransactions);
export type InsertPaymentTransaction = z.infer<typeof insertPaymentTransactionSchema>;
export type PaymentTransaction = typeof paymentTransactions.$inferSelect;

// Shipping rates table for calculating shipping costs
export const shippingRates = pgTable("shipping_rates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameHebrew: text("name_hebrew").notNull(),
  description: text("description"),
  descriptionHebrew: text("description_hebrew"),
  
  // Geographic coverage
  country: text("country").notNull().default("IL"), // Israel by default
  regions: json("regions").$type<string[]>(), // Specific regions/cities if applicable
  
  // Rate calculation
  baseRate: integer("base_rate").notNull(), // Base shipping cost in agorot
  freeShippingThreshold: integer("free_shipping_threshold"), // Minimum order value for free shipping
  
  // Delivery timeframe
  estimatedDaysMin: integer("estimated_days_min").default(1),
  estimatedDaysMax: integer("estimated_days_max").default(7),
  
  // Weight/size restrictions
  maxWeight: integer("max_weight"), // in grams
  maxDimensions: text("max_dimensions"), // e.g., "30x20x15cm"
  
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertShippingRateSchema = createInsertSchema(shippingRates);
export type InsertShippingRate = z.infer<typeof insertShippingRateSchema>;
export type ShippingRate = typeof shippingRates.$inferSelect;
