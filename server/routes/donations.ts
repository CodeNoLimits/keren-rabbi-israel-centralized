import { Express } from "express";
import { db } from "../db";
import { donations, lotteryDraws, lotteryEntries } from "@shared/schema";
import { eq, and, gte, lte } from "drizzle-orm";

// PayPal SDK setup
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox'; // 'sandbox' or 'live'
const PAYPAL_API_BASE = PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Create PayPal order
async function createPayPalOrder(amount: number, currency: string = 'ILS') {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: (amount / 100).toFixed(2), // Convert agorot to shekels
        },
        description: 'Donation to Rabbi Israel Dov Odesser Foundation',
      }],
      application_context: {
        brand_name: 'Keren Rabbi Israel',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.FRONTEND_URL || 'http://localhost:5000'}/donate/success`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5000'}/donate/cancel`,
      },
    }),
  });

  const data = await response.json();
  return data;
}

// Capture PayPal payment
async function capturePayPalPayment(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
}

// Get active lottery draw
async function getActiveLotteryDraw() {
  if (!db) return null;

  const now = new Date();
  const activeDraws = await db
    .select()
    .from(lotteryDraws)
    .where(
      and(
        eq(lotteryDraws.status, 'active'),
        lte(lotteryDraws.startDate, now),
        gte(lotteryDraws.endDate, now)
      )
    )
    .limit(1);

  return activeDraws[0] || null;
}

// Create lottery entry for donation
async function createLotteryEntry(donationData: any, drawId: string) {
  if (!db) return null;

  const numberOfTickets = Math.floor(donationData.amount / 1800); // 1 ticket per 18 shekels

  const [entry] = await db
    .insert(lotteryEntries)
    .values({
      drawId,
      userId: donationData.userId,
      email: donationData.email,
      fullName: donationData.fullName,
      phone: donationData.phone,
      donationId: donationData.donationId,
      donationAmount: donationData.amount,
      numberOfTickets,
      isActive: true,
      isWinner: false,
    })
    .returning();

  return entry;
}

export function registerDonationRoutes(app: Express) {
  // Create donation and PayPal order
  app.post("/api/donations/create", async (req, res) => {
    try {
      const { amount, currency, donorInfo, participateInLottery, paymentMethod } = req.body;

      if (!amount || amount < 1800) { // Minimum 18 shekels
        return res.status(400).json({ error: "Minimum donation is 18 ₪" });
      }

      if (!donorInfo.fullName || !donorInfo.email) {
        return res.status(400).json({ error: "Full name and email are required" });
      }

      // Check if database is available
      if (!db) {
        return res.status(503).json({
          error: "Database not available. Please try again later.",
        });
      }

      // Get active lottery draw if participating
      let activeDraw = null;
      if (participateInLottery) {
        activeDraw = await getActiveLotteryDraw();
      }

      // Create donation record
      const [donation] = await db
        .insert(donations)
        .values({
          email: donorInfo.email,
          fullName: donorInfo.fullName,
          phone: donorInfo.phone || null,
          amount,
          currency: currency || 'ILS',
          donationType: 'one_time',
          paymentMethod,
          paymentProvider: paymentMethod === 'paypal' ? 'paypal' : 'stripe',
          paymentStatus: 'pending',
          participateInLottery,
          lotteryDrawId: activeDraw?.id || null,
          lotteryEntryCreated: false,
          taxDeductible: true,
        })
        .returning();

      if (paymentMethod === 'paypal') {
        // Create PayPal order
        const paypalOrder = await createPayPalOrder(amount, currency);

        if (paypalOrder.id) {
          // Update donation with PayPal order ID
          await db
            .update(donations)
            .set({
              providerTransactionId: paypalOrder.id,
            })
            .where(eq(donations.id, donation.id));

          // Get approval URL
          const approvalUrl = paypalOrder.links.find(
            (link: any) => link.rel === 'approve'
          )?.href;

          return res.json({
            donationId: donation.id,
            paypalOrderId: paypalOrder.id,
            approvalUrl,
          });
        } else {
          return res.status(500).json({ error: "Failed to create PayPal order" });
        }
      } else {
        // For Stripe or other payment methods
        return res.json({
          donationId: donation.id,
          // Add Stripe setup here if needed
        });
      }
    } catch (error) {
      console.error("Donation creation error:", error);
      return res.status(500).json({ error: "Failed to create donation" });
    }
  });

  // Complete donation after PayPal payment
  app.post("/api/donations/complete-paypal", async (req, res) => {
    try {
      const { orderId, donationId } = req.body;

      if (!db) {
        return res.status(503).json({ error: "Database not available" });
      }

      // Capture PayPal payment
      const captureData = await capturePayPalPayment(orderId);

      if (captureData.status === 'COMPLETED') {
        // Update donation status
        await db
          .update(donations)
          .set({
            paymentStatus: 'completed',
          })
          .where(eq(donations.id, donationId));

        // Get donation details
        const [donation] = await db
          .select()
          .from(donations)
          .where(eq(donations.id, donationId));

        // Create lottery entry if applicable
        if (donation.participateInLottery && donation.lotteryDrawId) {
          await createLotteryEntry(
            {
              ...donation,
              donationId: donation.id,
            },
            donation.lotteryDrawId
          );

          // Update donation to mark lottery entry as created
          await db
            .update(donations)
            .set({
              lotteryEntryCreated: true,
            })
            .where(eq(donations.id, donationId));
        }

        return res.json({
          success: true,
          message: "Donation completed successfully",
        });
      } else {
        return res.status(400).json({ error: "Payment not completed" });
      }
    } catch (error) {
      console.error("Donation completion error:", error);
      return res.status(500).json({ error: "Failed to complete donation" });
    }
  });

  // Get active lottery draw info
  app.get("/api/lottery/active", async (req, res) => {
    try {
      if (!db) {
        return res.status(503).json({ error: "Database not available" });
      }

      const activeDraw = await getActiveLotteryDraw();

      if (!activeDraw) {
        return res.json({ activeDraw: null });
      }

      // Get total entries for this draw
      const entries = await db
        .select()
        .from(lotteryEntries)
        .where(eq(lotteryEntries.drawId, activeDraw.id));

      const totalTickets = entries.reduce(
        (sum, entry) => sum + (entry.numberOfTickets || 1),
        0
      );

      return res.json({
        activeDraw: {
          ...activeDraw,
          totalEntries: entries.length,
          totalTickets,
        },
      });
    } catch (error) {
      console.error("Error fetching active lottery:", error);
      return res.status(500).json({ error: "Failed to fetch lottery info" });
    }
  });

  // Get user's lottery entries
  app.get("/api/lottery/my-entries", async (req, res) => {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      if (!db) {
        return res.status(503).json({ error: "Database not available" });
      }

      const entries = await db
        .select()
        .from(lotteryEntries)
        .where(eq(lotteryEntries.email, email as string));

      return res.json({ entries });
    } catch (error) {
      console.error("Error fetching lottery entries:", error);
      return res.status(500).json({ error: "Failed to fetch entries" });
    }
  });
}
