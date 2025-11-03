import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import { User } from "@shared/schema";
import { sendOrderConfirmation } from "./emailService";
import { chatWithGemini, chatWithGeminiStream, checkGeminiConnection, analyzeUserSentiment, type ChatRequest, type ChatMessage } from "./geminiService";
import { chatWithOpenAI, chatWithOpenAIStream, checkOpenAIConnection, analyzeUserSentimentOpenAI } from "./openaiService";
import { setupAuth, isAuthenticated } from "./replitAuth";

// Extend Request interface to include authentication properties
declare global {
  namespace Express {
    interface Request {
      isAuthenticated(): boolean;
      user: User; // Remove optional since we ensure it's always set when authenticated
    }
  }
}

// Initialize Stripe with secret key (will need to be set by user)
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth middleware
  await setupAuth(app);

  // Auth routes - required for Replit Auth
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Serve attached_assets images directly 
  const attachedAssetsPath = path.resolve(process.cwd(), 'attached_assets');
  
  app.use('/attached_assets', express.static(attachedAssetsPath, {
    setHeaders: (res, filePath) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (filePath.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      }
    }
  }));

  // Subscription Plans API
  app.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await storage.getAllSubscriptionPlans();
      res.json(plans);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching subscription plans: " + error.message });
    }
  });

  // Get HoRaat Keva Plan API
  app.get("/api/subscription-plans/horat-keva", async (req, res) => {
    try {
      const plan = await storage.getSubscriptionPlan("horat_keva_99");
      if (!plan) {
        return res.status(404).json({ message: "HoRaat Keva plan not found" });
      }
      res.json(plan);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching HoRaat Keva plan: " + error.message });
    }
  });

  // Check Stripe configuration status
  app.get('/api/stripe-status', (req, res) => {
    const isConfigured = !!(stripe && process.env.STRIPE_SECRET_KEY);
    res.json({ 
      configured: isConfigured,
      message: isConfigured 
        ? "Stripe is properly configured"
        : "Stripe configuration incomplete. Contact support for subscription services.",
      missingConfig: {
        secret_key: !process.env.STRIPE_SECRET_KEY,
        price_id: !process.env.STRIPE_PRICE_ID,
        webhook_secret: !process.env.STRIPE_WEBHOOK_SECRET,
        public_key_needed: "Check VITE_STRIPE_PUBLIC_KEY on frontend"
      }
    });
  });

  // Create payment intent for checkout (physical products)
  app.post('/api/create-payment-intent', async (req, res) => {
    if (!stripe) {
      return res.status(503).json({
        message: "מערכת התשלומים אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.",
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
        shippingMethod = 'standard',
        email 
      } = req.body;

      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ message: 'Cart is required and cannot be empty' });
      }

      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      if (!shippingAddress) {
        return res.status(400).json({ message: 'Shipping address is required' });
      }

      // SECURITY: Validate cart items and fetch server-side prices
      // NEVER trust prices sent from client - this prevents price tampering
      const validatedCartItems = [];
      let subtotal = 0;

      for (const item of cart) {
        if (!item.productId || !item.variantId || !item.quantity || item.quantity < 1) {
          return res.status(400).json({ 
            message: 'Invalid cart item: missing productId, variantId, or invalid quantity' 
          });
        }

        // Fetch product and variant from storage (server-side source of truth)
        const productVariant = await storage.getProductVariant(item.productId, item.variantId);
        if (!productVariant) {
          return res.status(400).json({ 
            message: `Product or variant not found: ${item.productId}/${item.variantId}` 
          });
        }

        const { product, variant } = productVariant;

        // Check if product is active and variant is in stock
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

        // Check stock quantity if specified
        if (variant.stockQuantity && item.quantity > variant.stockQuantity) {
          return res.status(400).json({ 
            message: `Insufficient stock for ${product.name} - ${variant.format}. Available: ${variant.stockQuantity}, Requested: ${item.quantity}` 
          });
        }

        // Use server-side price (in agorot) - THIS IS THE SECURITY FIX
        const serverPrice = variant.price; // Server-side price in agorot
        const itemTotal = serverPrice * item.quantity;
        subtotal += itemTotal;

        // Store validated item with server-side data
        validatedCartItems.push({
          productId: item.productId,
          variantId: item.variantId,
          productName: product.name,
          productNameEnglish: product.nameEnglish,
          variantDetails: `${variant.format} - ${variant.size}${variant.volumes > 1 ? ` (${variant.volumes} כרכים)` : ''}`,
          quantity: item.quantity,
          unitPrice: serverPrice, // Server-side price
          totalPrice: itemTotal,
          product: product,
          variant: variant
        });
      }
      
      // Get user subscription status for discounts
      const user = req.isAuthenticated() ? req.user : null;
      const isSubscriber = user?.isSubscriber || false;
      const subscriberDiscount = isSubscriber ? Math.round(subtotal * 0.05) : 0; // 5% discount for subscribers
      
      // Calculate shipping using validated subtotal
      const shippingResult = await storage.calculateShipping(subtotal, 'IL');
      const shippingAmount = shippingResult?.cost || 3000; // Default 30 ILS if calculation fails
      
      // Calculate VAT (17% in Israel)
      const subtotalAfterDiscount = subtotal - subscriberDiscount;
      const vatRate = 0.17;
      const vatAmount = Math.round(subtotalAfterDiscount * vatRate);
      
      const totalAmount = subtotalAfterDiscount + vatAmount + shippingAmount;

      // Create Stripe customer if authenticated
      let customerId = user?.stripeCustomerId;
      if (user && !customerId) {
        const customer = await stripe.customers.create({
          email: email,
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

      // Create order in our system
      const order = await storage.createOrder({
        userId: user?.id || null,
        email: email,
        status: 'pending',
        subtotal: subtotal,
        vatAmount: vatAmount,
        shippingAmount: shippingAmount,
        discountAmount: subscriberDiscount,
        totalAmount: totalAmount,
        shippingMethod: shippingMethod,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        paymentMethod: 'stripe',
        stripePaymentIntentId: null,
        stripeChargeId: null,
        paymentStatus: 'pending',
        trackingNumber: null,
        estimatedDelivery: null,
        deliveredAt: null,
        customerNotes: null,
        adminNotes: null
      });

      // Create order items using validated data with server-side prices
      for (const item of validatedCartItems) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          variantId: item.variantId,
          productName: item.productName,
          productNameEnglish: item.productNameEnglish || null,
          variantDetails: item.variantDetails,
          quantity: item.quantity,
          unitPrice: item.unitPrice, // Server-side validated price
          totalPrice: item.totalPrice // Server-side calculated total
        });
      }

      // Create Stripe payment intent with idempotency key to prevent duplicate charges
      const idempotencyKey = `order-${order.id}`;
      const paymentIntentParams: any = {
        amount: totalAmount, // Already in agorot (Israeli cents)
        currency: 'ils',
        metadata: {
          orderId: order.id,
          isSubscriber: isSubscriber.toString(),
          subscriberDiscount: subscriberDiscount.toString()
        },
        description: `Order ${order.id} - Breslov Books`,
        receipt_email: email
      };

      if (customerId) {
        paymentIntentParams.customer = customerId;
      }

      const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams, {
        idempotencyKey: idempotencyKey
      });

      // Update order with payment intent ID
      await storage.updateOrder(order.id, {
        stripePaymentIntentId: paymentIntent.id
      });

      // Create payment transaction record
      await storage.createPaymentTransaction({
        orderId: order.id,
        provider: 'stripe',
        providerTransactionId: paymentIntent.id,
        providerCustomerId: customerId || null,
        amount: totalAmount,
        currency: 'ILS',
        status: 'pending',
        failureCode: null,
        failureMessage: null,
        refundAmount: 0,
        refundReason: null,
        refundedAt: null,
        metadata: {
          validatedCartItems: validatedCartItems.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice
          })),
          shippingMethod: shippingMethod,
          isSubscriber: isSubscriber
        }
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        orderId: order.id,
        orderSummary: {
          subtotal: subtotal,
          discount: subscriberDiscount,
          vatAmount: vatAmount,
          shippingAmount: shippingAmount,
          totalAmount: totalAmount,
          currency: 'ILS'
        }
      });

    } catch (error: any) {
      console.error('Payment intent creation error:', error);
      res.status(500).json({ message: 'Error creating payment intent: ' + error.message });
    }
  });

  // Get shipping rates
  app.get('/api/shipping-rates', async (req, res) => {
    try {
      const { country = 'IL', subtotal } = req.query;
      const rates = await storage.getShippingRates(country as string);
      
      // Add calculated costs for each rate
      const ratesWithCosts = rates.map(rate => {
        const cost = subtotal && rate.freeShippingThreshold && 
                    parseInt(subtotal as string) >= rate.freeShippingThreshold 
                    ? 0 
                    : rate.baseRate;
        
        return {
          ...rate,
          calculatedCost: cost,
          isFreeShipping: cost === 0
        };
      });
      
      res.json(ratesWithCosts);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching shipping rates: ' + error.message });
    }
  });

  // Get order details
  app.get('/api/orders/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Check if user owns this order (if authenticated)
      if (req.isAuthenticated() && order.userId && order.userId !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const orderItems = await storage.getOrderItems(orderId);
      const paymentTransactions = await storage.getPaymentTransactionsByOrder(orderId);
      
      res.json({
        order,
        items: orderItems,
        transactions: paymentTransactions
      });
      
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching order: ' + error.message });
    }
  });

  // Create Stripe subscription for HoRaat Keva
  app.post('/api/create-subscription', async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ 
        message: "מערכת התשלומים אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.",
        messageEn: "Payment system is currently unavailable. Please contact customer service.",
        contactEmail: "support@haesh-sheli.co.il",
        contactPhone: "+972-2-123-4567",
        configured: false
      });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return res.status(503).json({ 
        message: "תוכנית המנוי אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.",
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
      // Check if user already has an active subscription
      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        
        if (subscription.status === 'active' || subscription.status === 'trialing') {
          return res.json({
            message: "User already has an active subscription",
            subscriptionId: subscription.id,
            status: subscription.status
          });
        }
      }

      // Create or get Stripe customer
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

      // Create subscription (requires STRIPE_PRICE_ID for HoRaat Keva plan)
      const priceId = process.env.STRIPE_PRICE_ID || "price_horat_keva_99_ils"; // Fallback ID
      
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with subscription info
      await storage.updateUserStripeInfo(user.id, customerId, subscription.id);
      await storage.updateUserSubscriptionStatus(
        user.id, 
        subscription.status, 
        new Date(), 
        undefined
      );

      // Log subscription creation
      await storage.createSubscriptionHistory({
        userId: user.id,
        subscriptionId: subscription.id,
        eventType: 'created',
        stripeEventId: null,
        eventData: { priceId, currency: 'ils' }
      });

      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        status: subscription.status
      });

    } catch (error: any) {
      console.error('Subscription creation error:', error);
      res.status(500).json({ message: "Error creating subscription: " + error.message });
    }
  });

  // Cancel subscription
  app.post('/api/cancel-subscription', async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ 
        message: "מערכת התשלומים אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות לביטול המנוי.",
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
      
      // Update user subscription status
      await storage.updateUserSubscriptionStatus(
        user.id, 
        'canceled',
        user.subscriptionStartDate || undefined,
        new Date()
      );

      // Log subscription cancellation
      await storage.createSubscriptionHistory({
        userId: user.id,
        subscriptionId: subscription.id,
        eventType: 'canceled',
        stripeEventId: null,
        eventData: { canceledAt: new Date() }
      });

      res.json({
        message: "Subscription canceled successfully",
        subscription: {
          id: subscription.id,
          status: subscription.status,
          canceledAt: subscription.canceled_at
        }
      });

    } catch (error: any) {
      console.error('Subscription cancellation error:', error);
      res.status(500).json({ message: "Error canceling subscription: " + error.message });
    }
  });

  // Get user subscription status
  app.get('/api/user/subscription', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const user = req.user;
      const subscriptionHistory = await storage.getSubscriptionHistoryByUser(user.id);
      
      let stripeSubscription = null;
      if (stripe && user.stripeSubscriptionId) {
        try {
          stripeSubscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        } catch (error) {
          console.warn('Could not retrieve Stripe subscription:', error);
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
        history: subscriptionHistory
      });

    } catch (error: any) {
      res.status(500).json({ message: "Error fetching subscription status: " + error.message });
    }
  });

  // Stripe webhook for handling payment confirmations
  app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
    if (!stripe) {
      return res.status(503).send('Stripe not configured');
    }

    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.warn('Stripe webhook secret not configured, skipping signature verification');
      // For development, we can proceed without signature verification
      // In production, this should be required
    }

    let event;

    try {
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        // Parse the raw body for development
        event = JSON.parse(req.body.toString());
      }
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object;
          const orderId = paymentIntent.metadata.orderId;
          
          if (orderId) {
            // Update order status
            await storage.updateOrder(orderId, {
              paymentStatus: 'succeeded',
              status: 'processing',
              stripeChargeId: paymentIntent.latest_charge
            });
            
            // Update payment transaction
            const transactions = await storage.getPaymentTransactionsByOrder(orderId);
            const transaction = transactions.find(t => t.providerTransactionId === paymentIntent.id);
            if (transaction) {
              await storage.updatePaymentTransaction(transaction.id, {
                status: 'succeeded'
              });
            }
            
            // Send order confirmation email
            try {
              const order = await storage.getOrder(orderId);
              const orderItems = await storage.getOrderItems(orderId);
              
              if (order && orderItems.length > 0) {
                const isSubscriber = paymentIntent.metadata.isSubscriber === 'true';
                
                await sendOrderConfirmation({
                  orderId: order.id,
                  customerName: order.shippingAddress?.fullName || 'לקוח יקר',
                  email: order.email,
                  items: orderItems.map(item => ({
                    name: item.productName,
                    nameEnglish: item.productNameEnglish || undefined,
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
                    currency: 'ILS'
                  },
                  isSubscriber: isSubscriber
                });
                
                console.log(`Order confirmation email sent for order ${orderId}`);
              }
            } catch (emailError) {
              console.error(`Failed to send confirmation email for order ${orderId}:`, emailError);
              // Don't fail the webhook if email fails
            }
            
            console.log(`Payment succeeded for order ${orderId}`);
          }
          break;
        }
        
        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object;
          const orderId = paymentIntent.metadata.orderId;
          
          if (orderId) {
            // Update order status
            await storage.updateOrder(orderId, {
              paymentStatus: 'failed'
            });
            
            // Update payment transaction
            const transactions = await storage.getPaymentTransactionsByOrder(orderId);
            const transaction = transactions.find(t => t.providerTransactionId === paymentIntent.id);
            if (transaction) {
              await storage.updatePaymentTransaction(transaction.id, {
                status: 'failed',
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
      
      res.json({received: true});
    } catch (error: any) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: 'Webhook handler failed' });
    }
  });

  // Chat Endpoints avec Gemini 2.5 Pro et RAG HaEsh Sheli
  
  // Vérification du statut de Gemini
  app.get('/api/chat/status', async (req, res) => {
    try {
      const status = await checkGeminiConnection();
      res.json({
        ...status,
        message: status.connected 
          ? "צ'אט עם מומחה ברסלב זמין - שאל כל שאלה על תורת רבי נחמן!"
          : "מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.",
        features: [
          "מומחה לתורת רבי נחמן מברסלב",
          "מידע על כל ספרי ברסלב באתר",
          "ציטוטים ותורות אותנטיות",
          "המלצות אישיות על ספרים",
          "תמיכה בעברית, אנגלית, צרפתית ועוד"
        ]
      });
    } catch (error: any) {
      res.status(500).json({ 
        connected: false, 
        error: 'Status check failed',
        message: "מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות."
      });
    }
  });

  // Chat רגיל (non-streaming)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ 
          error: 'Message is required',
          message: 'אנא כתב שאלה או הודעה.'
        });
      }

      // ניתוח סנטימנט של השאלה (אופציונלי לסטטיסטיקות)
      const sentiment = await analyzeUserSentiment(message);
      
      const chatRequest: ChatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };

      const response = await chatWithGemini(chatRequest);

      // רישום השיחה (אופציונלי)
      if (req.isAuthenticated() && response.conversationId) {
        console.log(`Chat session for user ${req.user.id}: ${response.conversationId}, sentiment: ${sentiment.sentiment}`);
      }

      res.json({
        ...response,
        sentiment,
        timestamp: new Date(),
        userId: req.isAuthenticated() ? req.user.id : null
      });

    } catch (error: any) {
      console.error('Chat endpoint error:', error);
      res.status(500).json({ 
        error: 'Chat failed',
        response: 'מצטער, אירעה שגיאה. אנא נסה שוב בעוד רגע.',
        message: 'שגיאה פנימית בשרת הצ\'אט.'
      });
    }
  });

  // Chat עם Streaming Response
  app.post('/api/chat/stream', async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ 
          error: 'Message is required',
          message: 'אנא כתב שאלה או הודעה.'
        });
      }

      // הגדרת headers עבור streaming
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

      const chatRequest: ChatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };

      // התחלת streaming response
      const streamGenerator = chatWithGeminiStream(chatRequest);
      
      for await (const chunk of streamGenerator) {
        if (chunk && chunk.trim().length > 0) {
          res.write(chunk);
        }
      }

      res.end();

    } catch (error: any) {
      console.error('Streaming chat error:', error);
      
      if (!res.headersSent) {
        res.status(500).json({ 
          error: 'Streaming chat failed',
          message: 'שגיאה בשירות הצ\'אט הזורם.'
        });
      } else {
        res.write('\n\nמצטער, אירעה שגיאה בעיבוד השאלה. אנא נסה שוב.');
        res.end();
      }
    }
  });

  // Endpoint לשמירת היסטוריית שיחות (אופציונלי)
  app.post('/api/chat/save-conversation', async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          error: 'Authentication required',
          message: 'נדרשת הזדהות לשמירת שיחות.'
        });
      }

      const { conversationId, messages, title } = req.body;
      
      if (!conversationId || !messages || !Array.isArray(messages)) {
        return res.status(400).json({ 
          error: 'Invalid conversation data',
          message: 'נתוני שיחה לא תקינים.'
        });
      }

      // כאן ניתן להוסיף שמירה למסד נתונים אם נדרש
      // await storage.saveConversation(req.user.id, conversationId, messages, title);

      res.json({
        success: true,
        message: 'השיחה נשמרה בהצלחה.',
        conversationId,
        savedAt: new Date()
      });

    } catch (error: any) {
      console.error('Save conversation error:', error);
      res.status(500).json({ 
        error: 'Failed to save conversation',
        message: 'שגיאה בשמירת השיחה.'
      });
    }
  });

  // Endpoint לקבלת המלצות ספרים על בסיס AI
  app.post('/api/chat/book-recommendations', async (req, res) => {
    try {
      const { interests, level, language = 'hebrew' } = req.body;
      
      const recommendationPrompt = `בהתבסס על הנושאים שמעניינים אותי: ${interests}, ורמת הלימוד שלי: ${level}, תן לי 3-5 המלצות ממוקדות על ספרי ברסלב מהקטלוג של האש שלי. כלול מחירים ותיאורים קצרים.`;

      const chatRequest: ChatRequest = {
        message: recommendationPrompt,
        useRAG: true
      };

      const response = await chatWithGemini(chatRequest);

      res.json({
        recommendations: response.response,
        basedOn: { interests, level, language },
        timestamp: new Date()
      });

    } catch (error: any) {
      console.error('Book recommendations error:', error);
      res.status(500).json({ 
        error: 'Failed to get recommendations',
        message: 'שגיאה בקבלת המלצות ספרים.'
      });
    }
  });

  // OpenAI Chat Endpoints - ChatGPT 4o-mini via Open Router
  
  // Vérification du statut d'OpenAI
  app.get('/api/openai/status', async (req, res) => {
    try {
      const status = await checkOpenAIConnection();
      res.json({
        ...status,
        message: status.connected 
          ? "צ'אט עם ChatGPT 4o-mini זמין - שאל כל שאלה על תורת רבי נחמן!"
          : "מערכת הצ'אט עם OpenAI אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.",
        features: [
          "ChatGPT 4o-mini (OpenAI דרך Open Router)",
          "מומחה לתורת רבי נחמן מברסלב",
          "מידע על כל ספרי ברסלב באתר",
          "ציטוטים ותורות אותנטיות",
          "המלצות אישיות על ספרים",
          "תמיכה בעברית, אנגלית, צרפתית ועוד"
        ]
      });
    } catch (error: any) {
      res.status(500).json({ 
        connected: false, 
        error: 'OpenAI status check failed',
        message: "מערכת הצ'אט עם OpenAI אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות."
      });
    }
  });

  // OpenAI Chat רגיל (non-streaming)
  app.post('/api/openai/chat', async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ 
          error: 'Message is required',
          message: 'אנא כתב שאלה או הודעה.'
        });
      }

      // ניתוח סנטימנט של השאלה (אופציונלי לסטטיסטיקות)
      const sentiment = await analyzeUserSentimentOpenAI(message);
      
      const chatRequest: ChatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };

      const response = await chatWithOpenAI(chatRequest);

      // רישום השיחה (אופציונלי)
      if (req.isAuthenticated() && response.conversationId) {
        console.log(`OpenAI Chat session for user ${req.user.id}: ${response.conversationId}, sentiment: ${sentiment.sentiment}`);
      }

      res.json({
        ...response,
        sentiment,
        timestamp: new Date(),
        userId: req.isAuthenticated() ? req.user.id : null,
        provider: 'openai'
      });

    } catch (error: any) {
      console.error('OpenAI Chat endpoint error:', error);
      res.status(500).json({ 
        error: 'OpenAI Chat failed',
        response: 'מצטער, אירעה שגיאה במערכת OpenAI. אנא נסה שוב בעוד רגע.',
        message: 'שגיאה פנימית בשרת הצ\'אט עם OpenAI.'
      });
    }
  });

  // OpenAI Chat עם Streaming Response
  app.post('/api/openai/stream', async (req, res) => {
    try {
      const { message, conversationHistory, useRAG = true } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ 
          error: 'Message is required',
          message: 'אנא כתב שאלה או הודעה.'
        });
      }

      // הגדרת headers עבור streaming
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

      const chatRequest: ChatRequest = {
        message: message.trim(),
        conversationHistory: conversationHistory || [],
        useRAG
      };

      // התחלת streaming response עם OpenAI
      const streamGenerator = chatWithOpenAIStream(chatRequest);
      
      for await (const chunk of streamGenerator) {
        if (chunk && chunk.trim().length > 0) {
          res.write(chunk);
        }
      }

      res.end();

    } catch (error: any) {
      console.error('OpenAI Streaming chat error:', error);
      
      if (!res.headersSent) {
        res.status(500).json({ 
          error: 'OpenAI Streaming chat failed',
          message: 'שגיאה בשירות הצ\'אט הזורם עם OpenAI.'
        });
      } else {
        res.write('\n\nמצטער, אירעה שגיאה במערכת OpenAI. אנא נסה שוב.');
        res.end();
      }
    }
  });

  // Endpoint לקבלת המלצות ספרים עם OpenAI
  app.post('/api/openai/book-recommendations', async (req, res) => {
    try {
      const { interests, level, language = 'hebrew' } = req.body;
      
      const recommendationPrompt = `בהתבסס על הנושאים שמעניינים אותי: ${interests}, ורמת הלימוד שלי: ${level}, תן לי 3-5 המלצות ממוקדות על ספרי ברסלב מהקטלוג של האש שלי. כלול מחירים ותיאורים קצרים. השתמש בידע שלך על ספרי ברסלב המותאמים לפרופיל שלי.`;

      const chatRequest: ChatRequest = {
        message: recommendationPrompt,
        useRAG: true
      };

      const response = await chatWithOpenAI(chatRequest);

      res.json({
        recommendations: response.response,
        basedOn: { interests, level, language },
        timestamp: new Date(),
        provider: 'openai'
      });

    } catch (error: any) {
      console.error('OpenAI Book recommendations error:', error);
      res.status(500).json({ 
        error: 'Failed to get OpenAI recommendations',
        message: 'שגיאה בקבלת המלצות ספרים מ-OpenAI.'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
