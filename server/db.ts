import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Make DATABASE_URL optional - if not provided, user features will be disabled
// but the site will still work for browsing products
if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not set - User authentication features will be disabled");
  console.warn("⚠️  Product browsing and store features will work normally");

  // Create a mock pool and db for when DATABASE_URL is not available
  export const pool = null as any;
  export const db = null as any;
} else {
  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle({ client: pool, schema });
}
