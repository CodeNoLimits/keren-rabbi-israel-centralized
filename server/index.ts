// Charger les variables d'environnement depuis .env
import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  // Use NODE_ENV to determine mode (Render sets this to "production")
  const isDevelopment = process.env.NODE_ENV !== "production";
  
  if (isDevelopment) {
    await setupVite(app, server);
    log("🔧 Development mode - Vite HMR enabled");
  } else {
    serveStatic(app);
    log("🚀 Production mode - Serving static files");
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Render.com requires using process.env.PORT
  // Default to 5000 for local development
  const port = parseInt(process.env.PORT || '5000', 10);
  const host = isDevelopment ? "localhost" : "0.0.0.0";

  // Use standard listen format for Render.com compatibility
  server.listen(port, host, () => {
    log(`🚀 Server running on ${host}:${port}`);
    log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    if (!isDevelopment) {
      log(`✅ Production mode - serving from dist/public`);
    }
  });

  // Handle server errors
  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      log(`❌ Port ${port} is already in use`);
      process.exit(1);
    } else {
      log(`❌ Server error: ${error.message}`);
      throw error;
    }
  });
})();
