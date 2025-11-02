import { 
  type User, 
  type InsertUser,
  type UpsertUser, 
  type Product,
  type InsertProduct,
  type SubscriptionPlan,
  type InsertSubscriptionPlan,
  type SubscriptionHistory,
  type InsertSubscriptionHistory,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type PaymentTransaction,
  type InsertPaymentTransaction,
  type ShippingRate,
  type InsertShippingRate,
  type ProductVariant,
  type ShippingAddress,
  users,
  subscriptionPlans,
  subscriptionHistory,
  products,
  orders,
  orderItems,
  paymentTransactions,
  shippingRates
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  // REQUIRED for Replit Auth
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Subscription user methods
  updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  updateUserSubscriptionStatus(id: string, status: string, startDate?: Date, endDate?: Date): Promise<User>;
  setUserAsSubscriber(id: string, isSubscriber: boolean): Promise<User>;
  
  // Product methods
  getProduct(id: string): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  getActiveProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product>;
  getProductVariant(productId: string, variantId: string): Promise<{product: Product, variant: any} | null>;
  
  // Subscription plans methods
  getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined>;
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;
  
  // Subscription history methods
  createSubscriptionHistory(history: InsertSubscriptionHistory): Promise<SubscriptionHistory>;
  getSubscriptionHistoryByUser(userId: string): Promise<SubscriptionHistory[]>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  updateOrder(id: string, updates: Partial<Order>): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
  
  // Order items methods
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  
  // Payment transaction methods
  createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction>;
  getPaymentTransactionsByOrder(orderId: string): Promise<PaymentTransaction[]>;
  updatePaymentTransaction(id: string, updates: Partial<PaymentTransaction>): Promise<PaymentTransaction>;
  
  // Shipping rates methods
  getShippingRates(country?: string): Promise<ShippingRate[]>;
  createShippingRate(rate: InsertShippingRate): Promise<ShippingRate>;
  calculateShipping(subtotal: number, country: string, weight?: number): Promise<{ rate: ShippingRate; cost: number } | null>;
}

// Database storage implementation using PostgreSQL - UPDATED for Replit Auth
export class DatabaseStorage implements IStorage {
  // In-memory Maps for fast data access (temporary storage until DB is ready)
  private subscriptionPlans: Map<string, SubscriptionPlan> = new Map();
  private products: Map<string, Product> = new Map();
  private shippingRates: Map<string, ShippingRate> = new Map();
  private subscriptionHistory: Map<string, SubscriptionHistory> = new Map();
  private orders: Map<string, Order> = new Map();
  private orderItems: Map<string, OrderItem> = new Map();
  private paymentTransactions: Map<string, PaymentTransaction> = new Map();

  constructor() {
    // Initialize default data in database on first run
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    // This will be run once to seed the database with default data
    try {
      // Check if data already exists, if not seed it
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

  private initializeDefaultPlans() {
    // Basic HoRaat Keva Plan - 99₪
    const horatKevaBasic: SubscriptionPlan = {
      id: "horat_keva_99",
      name: "HoRaat Keva Basic",
      nameHebrew: "הוראת קבע בסיסי",
      description: "Monthly subscription with access to all digital books and 5% discount on physical books",
      descriptionHebrew: "מנוי חודשי עם גישה לכל הספרים הדיגיטליים ו-5% הנחה על ספרים פיזיים",
      price: 9900, // 99 shekels in agorot
      currency: "ILS",
      intervalType: "month",
      intervalCount: 1,
      stripePriceId: null,
      features: [
        "Free access to all digital books",
        "5% discount on all physical orders",
        "Premium member status",
        "Early access to new releases"
      ] as string[],
      featuresHebrew: [
        "גישה חופשית לכל הספרים הדיגיטליים",
        "5% הנחה על כל ההזמנות הפיזיות", 
        "סטטוס חבר פרימיום",
        "גישה מוקדמת לשחרורים חדשים"
      ] as string[],
      isActive: true,
      createdAt: new Date()
    };

    // Silver HoRaat Keva Plan - 299₪
    const horatKevaSilver: SubscriptionPlan = {
      id: "horat_keva_299",
      name: "HoRaat Keva Silver",
      nameHebrew: "הוראת קבע - מנוי כסף",
      description: "Monthly subscription with 10% discount and preferential shipping rates for dedicated supporters",
      descriptionHebrew: "מנוי חודשי עם 10% הנחה ותעריפי משלוח מועדפים לתומכים מסורים",
      price: 29900, // 299 shekels in agorot
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
      ] as string[],
      featuresHebrew: [
        "גישה מלאה לכל הספרים הדיגיטליים",
        "10% הנחה על כל הזמנות הספרים הפיזיים",
        "תעריפי משלוח מועדפים בישראל",
        "שירות לקוחות מועדף",
        "עלון רוחני חודשי",
        "קבלה להקלה במס על תרומות"
      ] as string[],
      isActive: true,
      createdAt: new Date()
    };

    // Gold HoRaat Keva Plan - 499₪
    const horatKevaGold: SubscriptionPlan = {
      id: "horat_keva_499",
      name: "HoRaat Keva Gold",
      nameHebrew: "הוראת קבע - מנוי זהב",
      description: "Premium monthly subscription with free shipping once per month in Israel and 10% discount",
      descriptionHebrew: "מנוי חודשי מתקדם עם משלוח חינם פעם בחודש בישראל ו-10% הנחה",
      price: 49900, // 499 shekels in agorot
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
      ] as string[],
      featuresHebrew: [
        "גישה מלאה לכל הספרים הדיגיטליים",
        "10% הנחה על כל הזמנות הספרים הפיזיים",
        "משלוח חינם בישראל פעם בחודש",
        "מעמד תומך זהב",
        "שירות לקוחות מועדף",
        "עלון רוחני חודשי",
        "תכנים בלעדיים מעולם ברסלב",
        "קבלה להקלה במס על תרומות"
      ] as string[],
      isActive: true,
      createdAt: new Date()
    };

    // Platinum HoRaat Keva Plan - 999₪
    const horatKevaPlatinum: SubscriptionPlan = {
      id: "horat_keva_999",
      name: "HoRaat Keva Platinum",
      nameHebrew: "הוראת קבע - מנוי פלטינום",
      description: "Ultimate monthly subscription with free shipping 3x per month, complimentary books and 20% discount",
      descriptionHebrew: "מנוי חודשי מעולה עם משלוח חינם 3 פעמים בחודש, ספרים במתנה ו-20% הנחה",
      price: 99900, // 999 shekels in agorot
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
      ] as string[],
      featuresHebrew: [
        "גישה מלאה לכל הספרים הדיגיטליים",
        "20% הנחה על כל הזמנות הספרים הפיזיים",
        "משלוח חינם בישראל עד 3 פעמים בחודש",
        "בחירת ספר חודשית במתנה",
        "מעמד תומך פלטינום",
        "שירות לקוחות VIP",
        "עלון רוחני חודשי",
        "תכנים ושיעורים בלעדיים מעולם ברסלב",
        "תעודת ברכה אישית",
        "הכרה שנתית ברשימת התומכים",
        "קבלה להקלה במס על תרומות"
      ] as string[],
      isActive: true,
      createdAt: new Date()
    };
    
    this.subscriptionPlans.set(horatKevaBasic.id, horatKevaBasic);
    this.subscriptionPlans.set(horatKevaSilver.id, horatKevaSilver);
    this.subscriptionPlans.set(horatKevaGold.id, horatKevaGold);
    this.subscriptionPlans.set(horatKevaPlatinum.id, horatKevaPlatinum);
  }

  private initializeDefaultShippingRates() {
    const israelStandard: ShippingRate = {
      id: "israel_standard",
      name: "Standard Shipping (Israel)",
      nameHebrew: "משלוח רגיל (ישראל)",
      description: "Standard delivery within Israel",
      descriptionHebrew: "משלוח רגיל בתוך ישראל",
      country: "IL",
      regions: null,
      baseRate: 3000, // 30 shekels in agorot
      freeShippingThreshold: 39900, // 399 shekels - matches the free shipping threshold from UI
      estimatedDaysMin: 3,
      estimatedDaysMax: 7,
      maxWeight: null,
      maxDimensions: null,
      isActive: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const israelExpress: ShippingRate = {
      id: "israel_express",
      name: "Express Shipping (Israel)",
      nameHebrew: "משלוח מהיר (ישראל)",
      description: "Express delivery within Israel",
      descriptionHebrew: "משלוח מהיר בתוך ישראל",
      country: "IL",
      regions: null,
      baseRate: 4500, // 45 shekels in agorot
      freeShippingThreshold: 59900, // 599 shekels for express
      estimatedDaysMin: 1,
      estimatedDaysMax: 3,
      maxWeight: null,
      maxDimensions: null,
      isActive: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.shippingRates.set(israelStandard.id, israelStandard);
    this.shippingRates.set(israelExpress.id, israelExpress);
  }

  private initializeDefaultProducts() {
    // Import and load real product data
    // Since we can't directly import the frontend file in the backend,
    // we'll inline some key products for now - this could be moved to a shared location
    const products = [
      {
        id: 'likutei-moharan',
        name: 'ליקוטי מוהר"ן',
        nameEnglish: 'Likutei Moharan',
        nameFrench: null,
        nameSpanish: null,
        nameRussian: null,
        description: 'חיבורו הגדול, הקדוש והנורא, של רבינו רבי נחמן מברסלב. מכיל מאות "תורות" - מאמרי קודש שנאמרו על ידי רבינו בשבתות, בחגים ובמועדים שונים.',
        descriptionEnglish: 'The great, holy and awesome work of our teacher Rabbi Nachman of Breslov. Contains hundreds of "teachings" - holy discourses given by Rabbenu on Sabbaths, holidays and various occasions.',
        category: 'ספרי רבינו',
        subcategory: 'ליקוטי מוהר"ן',
        author: 'רבי נחמן מברסלב',
        publisher: 'קרן רבי ישראל',
        language: 'עברית',
        pages: 960,
        isbn: '978-965-7023-01-1',
        images: [
          '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
          '/attached_assets/ליקוטי מוהרן 1_1757278339720.jpg'
        ],
        variants: [
          {
            id: 'giant-skai-with-commentaries',
            format: 'סקאי עם מפרשים',
            binding: 'קשה',
            size: 'ענק',
            dimensions: '32*22',
            volumes: 1,
            price: 9500, // Convert to agorot (95 * 100)
            inStock: true,
            stockQuantity: 15
          },
          {
            id: 'giant-skai',
            format: 'סקאי',
            binding: 'קשה',
            size: 'ענק',
            dimensions: '32*22',
            volumes: 1,
            price: 5500, // Convert to agorot (55 * 100)
            inStock: true,
            stockQuantity: 20
          },
          {
            id: 'large-skai',
            format: 'סקאי',
            binding: 'קשה',
            size: 'גדול',
            dimensions: '24*17',
            volumes: 1,
            price: 3500, // Convert to agorot (35 * 100)
            inStock: true,
            stockQuantity: 40
          }
        ],
        features: [
          'חיבורו הגדול של רבי נחמן',
          'מאות תורות קדושות',
          'נדפס עוד בחיי רבינו'
        ],
        tags: ['ליקוטי מוהר"ן', 'תורות', 'רבי נחמן'],
        isActive: true,
        isFeatured: true
      },
      {
        id: 'likutei-tefilot',
        name: 'ליקוטי תפילות',
        nameEnglish: 'Likutei Tefilot',
        nameFrench: null,
        nameSpanish: null,
        nameRussian: null,
        description: 'תפילותיו הנפלאות של רבי נתן, שחוברו על בסיס תורות רבי נחמן מליקוטי מוהר"ן.',
        descriptionEnglish: 'The wonderful prayers of Rabbi Nathan, composed based on Rabbi Nachman\'s teachings from Likutei Moharan.',
        category: 'תפילות',
        subcategory: 'ליקוטי תפילות',
        author: 'רבי נתן מברסלב',
        publisher: 'קרן רבי ישראל',
        language: 'עברית',
        pages: 1152,
        isbn: '978-965-7023-12-7',
        images: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg'
        ],
        variants: [
          {
            id: 'large-skai',
            format: 'סקאי',
            binding: 'קשה',
            size: 'גדול',
            dimensions: '24*17',
            volumes: 1,
            price: 4000, // Convert to agorot (40 * 100)
            inStock: true,
            stockQuantity: 35
          },
          {
            id: 'medium-skai',
            format: 'סקאי',
            binding: 'קשה',
            size: 'בינוני',
            dimensions: '17*12',
            volumes: 1,
            price: 3500, // Convert to agorot (35 * 100)
            inStock: true,
            stockQuantity: 40
          }
        ],
        features: [
          'תפילות מיוסדות על תורות רבי נחמן',
          'חיבורו הנפלא של רבי נתן'
        ],
        tags: ['תפילות', 'רבי נתן', 'ליקוטי תפילות'],
        isActive: true,
        isFeatured: true
      }
    ];

    // Convert products to proper Product type and store them
    products.forEach(productData => {
      const product: Product = productData as Product;
      this.products.set(product.id, product);
    });
  }

  // Product methods
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getActiveProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isActive);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isActive && product.isFeatured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => 
      product.isActive && product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      ...insertProduct,
      nameEnglish: insertProduct.nameEnglish || null,
      nameFrench: insertProduct.nameFrench || null,
      nameSpanish: insertProduct.nameSpanish || null,
      nameRussian: insertProduct.nameRussian || null,
      descriptionEnglish: insertProduct.descriptionEnglish || null,
      subcategory: insertProduct.subcategory || null,
      author: insertProduct.author || 'רבי נחמן מברסלב',
      publisher: insertProduct.publisher || 'קרן רבי ישראל',
      language: insertProduct.language || 'עברית',
      pages: insertProduct.pages || null,
      isbn: insertProduct.isbn || null,
      images: Array.isArray(insertProduct.images) ? insertProduct.images as string[] : null,
      variants: Array.isArray(insertProduct.variants) ? insertProduct.variants as ProductVariant[] : null,
      features: Array.isArray(insertProduct.features) ? insertProduct.features as string[] : null,
      tags: Array.isArray(insertProduct.tags) ? insertProduct.tags as string[] : null,
      isActive: insertProduct.isActive !== false,
      isFeatured: insertProduct.isFeatured || false
    };
    this.products.set(product.id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async getProductVariant(productId: string, variantId: string): Promise<{product: Product, variant: any} | null> {
    const product = await this.getProduct(productId);
    if (!product || !product.variants) {
      return null;
    }
    
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) {
      return null;
    }
    
    return { product, variant };
  }

  // User methods - Database implementation for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    if (!db) {
      console.warn("Database not available - getUser skipped");
      return undefined;
    }
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0] || undefined;
    } catch (error) {
      console.error("Error fetching user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) {
      console.warn("Database not available - getUserByUsername skipped");
      return undefined;
    }
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0] || undefined;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db) {
      console.warn("Database not available - getUserByEmail skipped");
      return undefined;
    }
    try {
      const result = await db.select().from(users).where(eq(users.email, email));
      return result[0] || undefined;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) {
      throw new Error("Database not available. Cannot create user.");
    }
    try {
      const result = await db.insert(users).values({
        ...insertUser,
        email: insertUser.email || null,
        subscriptionPlanId: "horat_keva_99",
        isSubscriber: false,
      }).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    try {
      const result = await db
        .update(users)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      
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
  async upsertUser(userData: UpsertUser): Promise<User> {
    try {
      const result = await db
        .insert(users)
        .values(userData)
        .onConflictDoUpdate({
          target: users.id,
          set: {
            ...userData,
            updatedAt: new Date(),
          },
        })
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error upserting user:", error);
      throw error;
    }
  }

  // Subscription user methods
  async updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User> {
    return this.updateUser(id, {
      stripeCustomerId,
      stripeSubscriptionId: stripeSubscriptionId || null
    });
  }

  async updateUserSubscriptionStatus(id: string, status: string, startDate?: Date, endDate?: Date): Promise<User> {
    const updates: Partial<User> = {
      subscriptionStatus: status as any,
      isSubscriber: status === 'active' || status === 'trialing'
    };
    
    if (startDate) updates.subscriptionStartDate = startDate;
    if (endDate) updates.subscriptionEndDate = endDate;
    
    return this.updateUser(id, updates);
  }

  async setUserAsSubscriber(id: string, isSubscriber: boolean): Promise<User> {
    return this.updateUser(id, { isSubscriber });
  }

  // Subscription plans methods
  async getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined> {
    return this.subscriptionPlans.get(id);
  }

  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlans.values()).filter(plan => plan.isActive);
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const id = plan.id || randomUUID();
    const subscriptionPlan: SubscriptionPlan = { 
      ...plan, 
      id,
      currency: plan.currency || "ILS", // Handle undefined -> default currency
      intervalType: (plan.intervalType || "month") as "month" | "year", // Handle undefined -> default interval
      intervalCount: plan.intervalCount ?? 1, // Handle undefined -> default count of 1
      stripePriceId: plan.stripePriceId || null, // Handle undefined -> null conversion
      features: Array.isArray(plan.features) ? plan.features as string[] : null,
      featuresHebrew: Array.isArray(plan.featuresHebrew) ? plan.featuresHebrew as string[] : null,
      isActive: plan.isActive !== false,
      createdAt: new Date()
    };
    this.subscriptionPlans.set(id, subscriptionPlan);
    return subscriptionPlan;
  }

  // Subscription history methods
  async createSubscriptionHistory(history: InsertSubscriptionHistory): Promise<SubscriptionHistory> {
    const id = randomUUID();
    const subscriptionHistoryRecord: SubscriptionHistory = {
      ...history,
      id,
      eventType: history.eventType as 'created' | 'activated' | 'canceled' | 'renewed' | 'failed' | 'past_due', // Type assertion for enum
      stripeEventId: history.stripeEventId || null, // Handle undefined -> null conversion
      eventData: history.eventData || null, // Handle undefined -> null conversion
      createdAt: new Date()
    };
    this.subscriptionHistory.set(id, subscriptionHistoryRecord);
    return subscriptionHistoryRecord;
  }

  async getSubscriptionHistoryByUser(userId: string): Promise<SubscriptionHistory[]> {
    return Array.from(this.subscriptionHistory.values())
      .filter(history => history.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      userId: insertOrder.userId || null,
      status: (insertOrder.status || 'pending') as 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled' | 'refunded',
      discountAmount: insertOrder.discountAmount || 0,
      paymentStatus: (insertOrder.paymentStatus || 'pending') as 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled',
      stripePaymentIntentId: insertOrder.stripePaymentIntentId || null,
      stripeChargeId: insertOrder.stripeChargeId || null,
      shippingAddress: insertOrder.shippingAddress as ShippingAddress | null,
      billingAddress: insertOrder.billingAddress as ShippingAddress | null,
      trackingNumber: insertOrder.trackingNumber || null,
      estimatedDelivery: insertOrder.estimatedDelivery || null,
      deliveredAt: insertOrder.deliveredAt || null,
      customerNotes: insertOrder.customerNotes || null,
      adminNotes: insertOrder.adminNotes || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    const updatedOrder = { ...order, ...updates, updatedAt: new Date() };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    return this.updateOrder(id, { status: status as any });
  }

  // Order items methods
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = {
      ...insertOrderItem,
      id,
      productNameEnglish: insertOrderItem.productNameEnglish || null,
      variantDetails: insertOrderItem.variantDetails as ProductVariant | null,
      createdAt: new Date()
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  // Payment transaction methods
  async createPaymentTransaction(insertTransaction: InsertPaymentTransaction): Promise<PaymentTransaction> {
    const id = randomUUID();
    const transaction: PaymentTransaction = {
      ...insertTransaction,
      id,
      providerTransactionId: insertTransaction.providerTransactionId || null,
      providerCustomerId: insertTransaction.providerCustomerId || null,
      currency: insertTransaction.currency || 'ILS',
      status: insertTransaction.status as 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled' | 'refunded',
      failureCode: insertTransaction.failureCode || null,
      failureMessage: insertTransaction.failureMessage || null,
      refundAmount: insertTransaction.refundAmount || 0,
      refundReason: insertTransaction.refundReason || null,
      refundedAt: insertTransaction.refundedAt || null,
      metadata: insertTransaction.metadata as any,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.paymentTransactions.set(id, transaction);
    return transaction;
  }

  async getPaymentTransactionsByOrder(orderId: string): Promise<PaymentTransaction[]> {
    return Array.from(this.paymentTransactions.values())
      .filter(transaction => transaction.orderId === orderId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updatePaymentTransaction(id: string, updates: Partial<PaymentTransaction>): Promise<PaymentTransaction> {
    const transaction = this.paymentTransactions.get(id);
    if (!transaction) {
      throw new Error(`Payment transaction with id ${id} not found`);
    }
    const updatedTransaction = { ...transaction, ...updates, updatedAt: new Date() };
    this.paymentTransactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  // Shipping rates methods
  async getShippingRates(country: string = 'IL'): Promise<ShippingRate[]> {
    return Array.from(this.shippingRates.values())
      .filter(rate => rate.isActive && rate.country === country)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async createShippingRate(insertRate: InsertShippingRate): Promise<ShippingRate> {
    const id = randomUUID();
    const rate: ShippingRate = {
      ...insertRate,
      id,
      description: insertRate.description || null,
      descriptionHebrew: insertRate.descriptionHebrew || null,
      country: insertRate.country || 'IL',
      regions: Array.isArray(insertRate.regions) ? insertRate.regions as string[] : null,
      freeShippingThreshold: insertRate.freeShippingThreshold || null,
      estimatedDaysMin: insertRate.estimatedDaysMin || 1,
      estimatedDaysMax: insertRate.estimatedDaysMax || 7,
      maxWeight: insertRate.maxWeight || null,
      maxDimensions: insertRate.maxDimensions || null,
      isActive: insertRate.isActive !== false,
      sortOrder: insertRate.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.shippingRates.set(id, rate);
    return rate;
  }

  async calculateShipping(subtotal: number, country: string = 'IL', weight?: number): Promise<{ rate: ShippingRate; cost: number } | null> {
    const rates = await this.getShippingRates(country);
    
    // Find the first applicable shipping rate
    for (const rate of rates) {
      // Check if subtotal qualifies for free shipping
      if (rate.freeShippingThreshold && subtotal >= rate.freeShippingThreshold) {
        return { rate, cost: 0 };
      }
      
      // Check weight limits if specified
      if (weight && rate.maxWeight && weight > rate.maxWeight) {
        continue;
      }
      
      // Return the base rate for this shipping method
      return { rate, cost: rate.baseRate };
    }
    
    return null; // No applicable shipping rate found
  }
}

export const storage = new DatabaseStorage();
