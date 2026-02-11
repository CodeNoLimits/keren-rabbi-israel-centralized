import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Make DATABASE_URL optional - if not provided, user features will be disabled
// but the site will still work for browsing products
let _pool: any = null;
let _db: any = null;

if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not set - User authentication features will be disabled");
  console.warn("⚠️  Product browsing and store features will work normally");
} else {
  _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  _db = drizzle({ client: _pool, schema });
}

export const pool = _pool;
export const db = _db;
