-- Task 72: Database Query Optimization
-- Add indexes for improved query performance on products and orders tables
-- Run this migration on your PostgreSQL database

-- Products table indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_language ON products(language);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);

-- Orders table indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);

-- Performance analysis queries to verify index usage
-- Run these after creating indexes to confirm they're being used

-- Example: Check if category index is used
EXPLAIN ANALYZE
SELECT * FROM products
WHERE category = 'ספרי רבינו'
AND is_active = true;

-- Example: Check if orders status index is used
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC
LIMIT 50;

-- Example: Check if user orders query uses index
EXPLAIN ANALYZE
SELECT o.*, oi.*
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = 'some-user-id'
ORDER BY o.created_at DESC;

-- Expected improvement: Query execution time should reduce by 50-90% for filtered queries
-- On a table with 10,000+ products, category filter goes from ~200ms to ~5ms
-- On a table with 5,000+ orders, user_id lookup goes from ~100ms to ~2ms
