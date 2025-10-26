/**
 * NEW FEATURES API ROUTES
 * Routes incrémentales pour Site Keren Rabbi Israel
 *
 * Endpoints:
 * - Newsletter subscription
 * - Product reviews
 * - Shiurim (audio teachings)
 * - User wishlist
 */

import { Router } from "express";
import { z } from "zod";
import { db } from "./db";
import {
  newsletterSubscribers,
  insertNewsletterSubscriberSchema,
  productReviews,
  insertProductReviewSchema,
  shiurim,
  insertShiurSchema,
  userWishlist,
  insertUserWishlistSchema,
  type NewsletterSubscriber,
  type ProductReview,
  type Shiur,
  type UserWishlist
} from "../shared/schema";
import { eq, and, desc, sql, count } from "drizzle-orm";

const router = Router();

// ============================================
// NEWSLETTER ENDPOINTS
// ============================================

/**
 * POST /api/newsletter
 * Subscribe to newsletter
 * Body: { email: string, language?: 'he' | 'fr' | 'en' }
 */
router.post("/newsletter", async (req, res) => {
  try {
    const data = insertNewsletterSubscriberSchema.parse(req.body);

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, data.email))
      .limit(1);

    if (existing.length > 0) {
      if (existing[0].isActive) {
        return res.status(400).json({
          success: false,
          error: "Cet email est déjà inscrit à la newsletter"
        });
      } else {
        // Reactivate subscription
        await db
          .update(newsletterSubscribers)
          .set({ isActive: true, unsubscribedAt: null })
          .where(eq(newsletterSubscribers.email, data.email));

        return res.json({
          success: true,
          message: "Abonnement réactivé avec succès !"
        });
      }
    }

    // Create new subscription
    await db.insert(newsletterSubscribers).values(data);

    res.json({
      success: true,
      message: "Merci pour votre inscription !"
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Données invalides",
        details: error.errors
      });
    }

    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'inscription"
    });
  }
});

/**
 * DELETE /api/newsletter/:email
 * Unsubscribe from newsletter
 */
router.delete("/newsletter/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const result = await db
      .update(newsletterSubscribers)
      .set({ isActive: false, unsubscribedAt: new Date() })
      .where(eq(newsletterSubscribers.email, email));

    res.json({
      success: true,
      message: "Désinscription réussie"
    });

  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la désinscription"
    });
  }
});

// ============================================
// PRODUCT REVIEWS ENDPOINTS
// ============================================

/**
 * GET /api/reviews/:productId
 * Get reviews for a product with pagination
 * Query params: ?page=1&limit=10
 */
router.get("/reviews/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const offset = (page - 1) * limit;

    // Get reviews with pagination
    const reviews = await db
      .select()
      .from(productReviews)
      .where(
        and(
          eq(productReviews.productId, productId),
          eq(productReviews.isApproved, true) // Only show approved reviews
        )
      )
      .orderBy(desc(productReviews.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalResult = await db
      .select({ count: count() })
      .from(productReviews)
      .where(
        and(
          eq(productReviews.productId, productId),
          eq(productReviews.isApproved, true)
        )
      );

    const total = totalResult[0]?.count || 0;

    // Calculate average rating and distribution
    const allReviews = await db
      .select()
      .from(productReviews)
      .where(
        and(
          eq(productReviews.productId, productId),
          eq(productReviews.isApproved, true)
        )
      );

    const averageRating = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;

    const distribution = {
      5: allReviews.filter(r => r.rating === 5).length,
      4: allReviews.filter(r => r.rating === 4).length,
      3: allReviews.filter(r => r.rating === 3).length,
      2: allReviews.filter(r => r.rating === 2).length,
      1: allReviews.filter(r => r.rating === 1).length,
    };

    res.json({
      success: true,
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: allReviews.length,
        distribution,
      },
    });

  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des avis"
    });
  }
});

/**
 * POST /api/reviews
 * Submit a new product review
 * Body: { productId, rating, comment?, userName?, userEmail?, photos? }
 */
router.post("/reviews", async (req, res) => {
  try {
    const data = insertProductReviewSchema.parse(req.body);

    // Insert review (will need admin approval)
    const [review] = await db
      .insert(productReviews)
      .values({
        ...data,
        isApproved: false, // Requires moderation
      })
      .returning();

    res.json({
      success: true,
      message: "Merci pour votre avis ! Il sera publié après modération.",
      review,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Données invalides",
        details: error.errors
      });
    }

    console.error("Create review error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la soumission de l'avis"
    });
  }
});

// ============================================
// SHIURIM (AUDIO TEACHINGS) ENDPOINTS
// ============================================

/**
 * GET /api/shiurim
 * Get shiurim with filters and pagination
 * Query params: ?language=he&rabbi=&series=&page=1&limit=20
 */
router.get("/shiurim", async (req, res) => {
  try {
    const language = req.query.language as string;
    const rabbi = req.query.rabbi as string;
    const series = req.query.series as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    const offset = (page - 1) * limit;

    // Build query with filters
    let query = db.select().from(shiurim).where(eq(shiurim.isActive, true));

    const conditions = [eq(shiurim.isActive, true)];

    if (language) {
      conditions.push(eq(shiurim.language, language as any));
    }
    if (rabbi) {
      conditions.push(eq(shiurim.rabbi, rabbi));
    }
    if (series) {
      conditions.push(eq(shiurim.series, series));
    }

    const shiurimList = await db
      .select()
      .from(shiurim)
      .where(and(...conditions))
      .orderBy(desc(shiurim.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalResult = await db
      .select({ count: count() })
      .from(shiurim)
      .where(and(...conditions));

    const total = totalResult[0]?.count || 0;

    res.json({
      success: true,
      shiurim: shiurimList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("Get shiurim error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des shiurim"
    });
  }
});

/**
 * GET /api/shiurim/:id
 * Get single shiur by ID
 */
router.get("/shiurim/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [shiur] = await db
      .select()
      .from(shiurim)
      .where(eq(shiurim.id, id))
      .limit(1);

    if (!shiur) {
      return res.status(404).json({
        success: false,
        error: "Shiur non trouvé"
      });
    }

    // Increment play count
    await db
      .update(shiurim)
      .set({ playCount: sql`${shiurim.playCount} + 1` })
      .where(eq(shiurim.id, id));

    res.json({
      success: true,
      shiur,
    });

  } catch (error) {
    console.error("Get shiur error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération du shiur"
    });
  }
});

/**
 * POST /api/shiurim/:id/download
 * Track shiur download
 */
router.post("/shiurim/:id/download", async (req, res) => {
  try {
    const { id } = req.params;

    await db
      .update(shiurim)
      .set({ downloadCount: sql`${shiurim.downloadCount} + 1` })
      .where(eq(shiurim.id, id));

    res.json({ success: true });

  } catch (error) {
    console.error("Track download error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors du tracking"
    });
  }
});

// ============================================
// WISHLIST ENDPOINTS
// ============================================

/**
 * GET /api/wishlist/:userId
 * Get user's wishlist
 */
router.get("/wishlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await db
      .select()
      .from(userWishlist)
      .where(eq(userWishlist.userId, userId))
      .orderBy(desc(userWishlist.addedAt));

    res.json({
      success: true,
      wishlist: wishlistItems,
      count: wishlistItems.length,
    });

  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de la wishlist"
    });
  }
});

/**
 * POST /api/wishlist
 * Add product to wishlist
 * Body: { userId, productId, variantId?, notes? }
 */
router.post("/wishlist", async (req, res) => {
  try {
    const data = insertUserWishlistSchema.parse(req.body);

    // Check if already in wishlist
    const existing = await db
      .select()
      .from(userWishlist)
      .where(
        and(
          eq(userWishlist.userId, data.userId),
          eq(userWishlist.productId, data.productId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Ce produit est déjà dans votre wishlist"
      });
    }

    const [item] = await db
      .insert(userWishlist)
      .values(data)
      .returning();

    res.json({
      success: true,
      message: "Produit ajouté à votre wishlist",
      item,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Données invalides",
        details: error.errors
      });
    }

    console.error("Add to wishlist error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'ajout à la wishlist"
    });
  }
});

/**
 * DELETE /api/wishlist/:userId/:productId
 * Remove product from wishlist
 */
router.delete("/wishlist/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    await db
      .delete(userWishlist)
      .where(
        and(
          eq(userWishlist.userId, userId),
          eq(userWishlist.productId, productId)
        )
      );

    res.json({
      success: true,
      message: "Produit retiré de la wishlist",
    });

  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la suppression"
    });
  }
});

export default router;
