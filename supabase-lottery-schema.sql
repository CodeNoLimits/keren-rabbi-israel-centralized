-- ===========================================
-- KEREN LOTTERY - Schema Supabase
-- Marqueur: 555
-- ===========================================
-- Exécuter dans Supabase SQL Editor

-- Activation des extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Donateurs (profil étendu optionnel)
CREATE TABLE IF NOT EXISTS donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions (mappées aux contracts Shopify)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES donors(id) ON DELETE SET NULL,
  shopify_customer_id TEXT,
  shopify_contract_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('active','paused','cancelled')) DEFAULT 'active',
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'ILS',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entrées loterie (1 par paiement initial ou par abonnement actif)
CREATE TABLE IF NOT EXISTS lottery_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  source TEXT,             -- 'form' | 'shopify'
  subscription_contract_id TEXT, -- si via Shopify Subscriptions
  order_id TEXT,           -- si via commande
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_email_per_source UNIQUE(email, source) -- Permet le même email via form ET shopify, mais pas 2x form
);

-- Tirages
CREATE TABLE IF NOT EXISTS draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_name TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  winner_entry_id UUID REFERENCES lottery_entries(id),
  seed TEXT,                -- pour audit
  details JSONB
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_lottery_entries_email ON lottery_entries(email);
CREATE INDEX IF NOT EXISTS idx_lottery_entries_source ON lottery_entries(source);
CREATE INDEX IF NOT EXISTS idx_lottery_entries_created_at ON lottery_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_contract_id ON subscriptions(shopify_contract_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_draws_executed_at ON draws(executed_at);

-- RLS (Row Level Security) pour sécurité
ALTER TABLE lottery_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS - Lecture publique pour lottery_entries (pour affichage nombre participants)
CREATE POLICY "Public can view lottery entries count" ON lottery_entries
  FOR SELECT USING (true);

-- Politiques RLS - Insertion publique pour lottery_entries (formulaire)
CREATE POLICY "Public can insert lottery entries" ON lottery_entries
  FOR INSERT WITH CHECK (true);

-- Politiques RLS - Admin uniquement pour draws
CREATE POLICY "Admin can manage draws" ON draws
  FOR ALL USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'admin'
    OR current_setting('app.settings.admin_mode', true) = 'true'
  );

-- Fonction pour obtenir le nombre total de participants
CREATE OR REPLACE FUNCTION get_lottery_entries_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM lottery_entries);
END;
$$ LANGUAGE plpgsql;

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '🎯 Schema Loterie Keren configuré avec succès!';
  RAISE NOTICE '📊 Tables créées: donors, subscriptions, lottery_entries, draws';
  RAISE NOTICE '🔍 Index créés pour performance';
  RAISE NOTICE '🛡️ RLS configuré pour sécurité';
END $$;
