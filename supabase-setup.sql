-- 🗄️ CONFIGURATION AUTOMATIQUE SUPABASE
-- Exécuter dans Supabase SQL Editor

-- Activation des extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Table des livres (Books)
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_hebrew TEXT,
  title_english TEXT,
  title_french TEXT,
  title_spanish TEXT,
  title_russian TEXT,
  author TEXT NOT NULL,
  author_hebrew TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  original_price DECIMAL(10,2),
  discount_percentage INTEGER DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'breslov',
  subcategory TEXT,
  language TEXT DEFAULT 'he',
  available_languages TEXT[] DEFAULT ARRAY['he'],
  image_url TEXT,
  image_urls TEXT[],
  description TEXT,
  description_hebrew TEXT,
  description_english TEXT,
  description_french TEXT,
  description_spanish TEXT,
  description_russian TEXT,
  stock_quantity INTEGER DEFAULT 0,
  isbn TEXT UNIQUE,
  publisher TEXT DEFAULT 'Keren Rabbi Israel',
  publication_date DATE,
  pages INTEGER,
  weight_grams INTEGER,
  dimensions_cm TEXT, -- "20x14x2"
  binding_type TEXT DEFAULT 'paperback', -- paperback, hardcover, leather
  is_featured BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_new_release BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 5.00,
  review_count INTEGER DEFAULT 0,
  tags TEXT[],
  search_vector TSVECTOR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_hebrew TEXT NOT NULL,
  name_english TEXT,
  name_french TEXT,
  name_spanish TEXT,
  name_russian TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_category_id UUID REFERENCES categories(id),
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commandes (Orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT,
  user_phone TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'ILS',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  payment_reference TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  shipping_method TEXT DEFAULT 'standard',
  tracking_number TEXT,
  notes TEXT,
  language TEXT DEFAULT 'he',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des éléments de commande (Order Items)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des avis (Reviews)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'he',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des utilisateurs newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  language TEXT DEFAULT 'he',
  interests TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS books_category_idx ON books(category);
CREATE INDEX IF NOT EXISTS books_language_idx ON books(language);
CREATE INDEX IF NOT EXISTS books_featured_idx ON books(is_featured);
CREATE INDEX IF NOT EXISTS books_price_idx ON books(price);
CREATE INDEX IF NOT EXISTS books_created_at_idx ON books(created_at);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_user_email_idx ON orders(user_email);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at);

-- Index de recherche full-text
CREATE INDEX IF NOT EXISTS books_search_idx ON books USING GIN(search_vector);

-- Fonction de mise à jour du search_vector
CREATE OR REPLACE FUNCTION update_book_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('hebrew', COALESCE(NEW.title_hebrew, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.title_english, NEW.title, '')), 'A') ||
    setweight(to_tsvector('hebrew', COALESCE(NEW.description_hebrew, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description_english, NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.author, '')), 'A') ||
    setweight(to_tsvector('english', array_to_string(NEW.tags, ' ')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement le search_vector
CREATE TRIGGER books_search_vector_trigger
  BEFORE INSERT OR UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_book_search_vector();

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER books_updated_at_trigger
  BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER orders_updated_at_trigger
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertion des catégories par défaut
INSERT INTO categories (name, name_hebrew, name_english, name_french, name_spanish, name_russian, slug) VALUES
('Breslov Torah', 'תורת ברסלב', 'Breslov Torah', 'Torah Breslov', 'Torá Breslov', 'Тора Браслав', 'breslov-torah'),
('Likutey Moharan', 'ליקוטי מוהר"ן', 'Likutey Moharan', 'Likouté Moharan', 'Likutey Moharan', 'Ликутей Моаран', 'likutey-moharan'),
('Stories', 'סיפורים', 'Stories', 'Histoires', 'Historias', 'Рассказы', 'stories'),
('Prayers', 'תפילות', 'Prayers', 'Prières', 'Oraciones', 'Молитвы', 'prayers'),
('Halacha', 'הלכה', 'Jewish Law', 'Loi Juive', 'Ley Judía', 'Еврейский Закон', 'halacha'),
('Biography', 'ביוגרפיה', 'Biography', 'Biographie', 'Biografía', 'Биография', 'biography')
ON CONFLICT (slug) DO NOTHING;

-- Insertion des livres d'exemple (données de base)
INSERT INTO books (
  title, title_hebrew, title_english, title_french, title_spanish, title_russian,
  author, author_hebrew, price, original_price, category, subcategory,
  description, description_hebrew, description_english, description_french, description_spanish, description_russian,
  stock_quantity, isbn, pages, is_featured, is_bestseller, rating, tags, available_languages
) VALUES 
(
  'ליקוטי מוהר"ן חלק א', 'ליקוטי מוהר"ן חלק א', 'Likutey Moharan Volume I', 
  'Likouté Moharan Volume I', 'Likutey Moharan Volumen I', 'Ликутей Моаран Том I',
  'Rabbi Nachman of Breslov', 'רבי נחמן מברסלב', 89.90, 120.00, 'breslov-torah', 'likutey-moharan',
  'עיקר ספרי רבי נחמן מברסלב', 'עיקר ספרי רבי נחמן מברסלv - ליקוטי מוהר"ן חלק ראשון',
  'The main book of Rabbi Nachman of Breslov - Likutey Moharan Part One',
  'Le livre principal du Rabbi Nachman de Breslov - Likouté Moharan Première Partie',
  'El libro principal del Rabino Nachman de Breslov - Likutey Moharan Primera Parte',
  'Основная книга Рабби Нахмана из Браслав - Ликутей Моаран Часть Первая',
  50, '978-965-7146-01-1', 856, TRUE, TRUE, 5.00, 
  ARRAY['torah', 'chassidut', 'breslov', 'likutey moharan'],
  ARRAY['he', 'en', 'fr', 'es', 'ru']
),
(
  'ספורי מעשיות', 'ספורי מעשיות', 'Sippurei Maasiyot (The Tales)', 
  'Sippouré Maassiyot (Les Contes)', 'Sippurei Maasiyot (Los Cuentos)', 'Сипурей Маасийот (Сказки)',
  'Rabbi Nachman of Breslov', 'רבי נחמן מברסלב', 65.00, 85.00, 'stories', NULL,
  '13 סיפורים מופלאים מרבי נחמן', 'שלושה עשר סיפורים מופלאים של רבי נחמן מברסלב',
  'Thirteen wonderful stories by Rabbi Nachman of Breslov',
  'Treize histoires merveilleuses du Rabbi Nachman de Breslov',
  'Trece historias maravillosas del Rabino Nachman de Breslov',
  'Тринадцать удивительных историй Рабби Нахмана из Браслав',
  75, '978-965-7146-02-8', 340, TRUE, TRUE, 4.95,
  ARRAY['stories', 'tales', 'chassidut', 'breslov'],
  ARRAY['he', 'en', 'fr', 'es', 'ru']
),
(
  'ליקוטי תפילות', 'ליקוטי תפילות', 'Likutey Tefilot (Collected Prayers)', 
  'Likouté Tefilot (Prières Collectées)', 'Likutey Tefilot (Oraciones Recopiladas)', 'Ликутей Тфилот (Собрание Молитв)',
  'Rabbi Nathan of Breslov', 'רבי נתן מברסלב', 75.00, 95.00, 'prayers', NULL,
  'תפילות על פי ליקוטי מוהר"ן', 'תפילות מיוסדות על תורות רבי נחמן מליקוטי מוהר"ן',
  'Prayers based on the teachings of Likutey Moharan',
  'Prières basées sur les enseignements de Likouté Moharan',
  'Oraciones basadas en las enseñanzas de Likutey Moharan',
  'Молитвы, основанные на учениях Ликутей Моаран',
  40, '978-965-7146-03-5', 520, TRUE, FALSE, 4.90,
  ARRAY['prayers', 'tefilot', 'breslov', 'rabbi nathan'],
  ARRAY['he', 'en', 'fr', 'es', 'ru']
);

-- Génération automatique des numéros de commande
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'HAS-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('order_number_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

CREATE TRIGGER orders_order_number_trigger
  BEFORE INSERT ON orders
  FOR EACH ROW 
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();

-- RLS (Row Level Security) pour sécurité basique
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour lecture publique
CREATE POLICY "Public books access" ON books FOR SELECT USING (true);
CREATE POLICY "Public categories access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public reviews access" ON reviews FOR SELECT USING (is_approved = true);

-- Fonction de recherche de livres
CREATE OR REPLACE FUNCTION search_books(
  search_term TEXT DEFAULT '',
  category_filter TEXT DEFAULT NULL,
  language_filter TEXT DEFAULT NULL,
  min_price DECIMAL DEFAULT NULL,
  max_price DECIMAL DEFAULT NULL,
  limit_count INTEGER DEFAULT 20,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  title_hebrew TEXT,
  author TEXT,
  price DECIMAL,
  image_url TEXT,
  rating DECIMAL,
  review_count INTEGER,
  is_featured BOOLEAN,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    b.title,
    b.title_hebrew,
    b.author,
    b.price,
    b.image_url,
    b.rating,
    b.review_count,
    b.is_featured,
    CASE 
      WHEN search_term = '' THEN 1.0
      ELSE ts_rank(b.search_vector, plainto_tsquery('hebrew', search_term)) +
           ts_rank(b.search_vector, plainto_tsquery('english', search_term))
    END as rank
  FROM books b
  WHERE 
    (search_term = '' OR b.search_vector @@ plainto_tsquery('hebrew', search_term) OR b.search_vector @@ plainto_tsquery('english', search_term))
    AND (category_filter IS NULL OR b.category = category_filter)
    AND (language_filter IS NULL OR language_filter = ANY(b.available_languages))
    AND (min_price IS NULL OR b.price >= min_price)
    AND (max_price IS NULL OR b.price <= max_price)
    AND b.stock_quantity > 0
  ORDER BY 
    b.is_featured DESC,
    rank DESC,
    b.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Vue pour statistiques simples
CREATE OR REPLACE VIEW book_stats AS
SELECT 
  COUNT(*) as total_books,
  COUNT(CASE WHEN is_featured THEN 1 END) as featured_books,
  COUNT(CASE WHEN is_bestseller THEN 1 END) as bestsellers,
  AVG(price) as average_price,
  COUNT(DISTINCT category) as total_categories,
  COUNT(DISTINCT language) as total_languages
FROM books;

COMMENT ON TABLE books IS 'Catalogue complet des livres Breslov';
COMMENT ON TABLE categories IS 'Catégories et sous-catégories des livres';
COMMENT ON TABLE orders IS 'Commandes clients';
COMMENT ON TABLE order_items IS 'Détail des articles commandés';
COMMENT ON TABLE reviews IS 'Avis et évaluations clients';
COMMENT ON FUNCTION search_books IS 'Recherche avancée avec filtres multiples';

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '🎉 Base de données Supabase configurée avec succès!';
  RAISE NOTICE '📚 % livres initiaux insérés', (SELECT COUNT(*) FROM books);
  RAISE NOTICE '🏷️ % catégories créées', (SELECT COUNT(*) FROM categories);
  RAISE NOTICE '🔍 Recherche full-text activée';
  RAISE NOTICE '🛡️ Sécurité RLS configurée';
END $$;