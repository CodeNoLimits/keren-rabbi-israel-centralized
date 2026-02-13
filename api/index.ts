/**
 * Vercel Serverless Function Handler
 *
 * Wraps the Express app for deployment as a Vercel serverless function.
 * Vercel's @vercel/node builder handles TypeScript compilation.
 * Path aliases resolved via api/tsconfig.json.
 */
import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();

// Parse JSON bodies for all routes except Stripe webhooks (need raw body)
app.use((req, res, next) => {
  if (req.path === '/api/stripe-webhook' || req.path === '/api/webhooks/stripe') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: false }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// Initialize routes once (persists across warm invocations in same container)
let initPromise: Promise<void> | null = null;

function ensureInit() {
  if (!initPromise) {
    initPromise = registerRoutes(app).then(() => {
      console.log("Vercel: Express routes initialized");
    }).catch((err) => {
      console.error("Vercel: Route initialization failed:", err);
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

export default async function handler(req: any, res: any) {
  await ensureInit();
  return app(req, res);
}
