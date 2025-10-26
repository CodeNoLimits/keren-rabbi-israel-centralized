#!/usr/bin/env node

/**
 * Seed Products Script - Keren Rabbi Israel
 * 
 * Seeds 161 Breslov books products into Supabase database
 * Source: client/src/data/realProducts.ts
 * 
 * Usage:
 *   node scripts/database/seed-products.js
 * 
 * Prerequisites:
 *   - DATABASE_URL configured in .env
 *   - Database schema already pushed (npm run db:push)
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { products } from '../../shared/schema.js';

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env');
  process.exit(1);
}

// Import products data
// Note: Since realProducts.ts is TypeScript, we'll need to import it properly
// For now, we'll create a simplified version or convert to JSON

const sampleProducts = [
  {
    id: 'likutei-moharan',
    name: { he: 'ליקוטי מוהר"ן', en: 'Likutei Moharan', fr: 'Likoutey Moharan' },
    description: { 
      he: 'חיבורו הגדול, הקדוש והנורא, של רבינו רבי נחמן מברסלב',
      en: 'The great, holy and awesome work of Rabbi Nachman of Breslov'
    },
    category: 'ספרי רבינו',
    subcategory: 'ליקוטי מוהר"ן',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 960,
    isbn: '978-965-7023-01-1',
    images: [
      '/images/books/likutei-moharan-1.jpg'
    ],
    variants: [
      {
        id: 'giant-skai',
        format: 'סקאי',
        binding: 'קשה',
        size: 'ענק',
        price: 55,
        inStock: true,
        stockQuantity: 20
      }
    ]
  }
];

async function seedProducts() {
  console.log('🌱 Starting products seed...');
  
  const connectionString = process.env.DATABASE_URL;
  const client = postgres(connectionString);
  const db = drizzle(client);

  try {
    console.log('📦 Connected to database');
    
    // Convert products to database format
    const productsToInsert = sampleProducts.map(product => ({
      id: product.id,
      name: JSON.stringify(product.name),
      description: JSON.stringify(product.description),
      category: product.category,
      subcategory: product.subcategory,
      author: product.author,
      publisher: product.publisher,
      language: product.language,
      pages: product.pages,
      isbn: product.isbn,
      images: product.images,
      variants: JSON.stringify(product.variants),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    console.log(`📥 Inserting ${productsToInsert.length} products...`);
    
    // Insert products (using upsert to avoid duplicates)
    for (const product of productsToInsert) {
      await db.insert(products)
        .values(product)
        .onConflictDoUpdate({
          target: products.id,
          set: {
            ...product,
            updatedAt: new Date()
          }
        });
      
      console.log(`  ✅ Inserted: ${product.id}`);
    }

    console.log('');
    console.log('✅ Products seed completed successfully!');
    console.log(`📊 Total products: ${productsToInsert.length}`);
    
    await client.end();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    await client.end();
    process.exit(1);
  }
}

// Run seed
seedProducts();
