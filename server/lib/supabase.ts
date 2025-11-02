// ===========================================
// KEREN LOTTERY - Supabase Client (Server-side)
// Marqueur: 555
// ===========================================

import { createClient } from '@supabase/supabase-js';

// Configuration Supabase côté serveur
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Supabase credentials not configured. Lottery features will be disabled.');
  console.warn('   Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) environment variables.');
}

// Client Supabase côté serveur (avec service role key pour bypass RLS si nécessaire)
export const supa = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Types pour la loterie
export interface LotteryEntry {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  source: 'form' | 'shopify';
  subscription_contract_id?: string;
  order_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Draw {
  id: string;
  draw_name: string;
  scheduled_at?: string;
  executed_at?: string;
  winner_entry_id?: string;
  seed?: string;
  details?: Record<string, any>;
}

export interface Donor {
  id: string;
  email?: string;
  full_name?: string;
  phone?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  donor_id?: string;
  shopify_customer_id?: string;
  shopify_contract_id?: string;
  status: 'active' | 'paused' | 'cancelled';
  amount_cents: number;
  currency: string;
  started_at: string;
  updated_at: string;
}

// Helper functions
export async function getLotteryEntries() {
  if (!supa) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supa
    .from('lottery_entries')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as LotteryEntry[];
}

export async function getLotteryEntryById(id: string) {
  if (!supa) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supa
    .from('lottery_entries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as LotteryEntry;
}

export async function createLotteryEntry(entry: Partial<LotteryEntry>) {
  if (!supa) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supa
    .from('lottery_entries')
    .insert([entry])
    .select()
    .single();
  
  if (error) throw error;
  return data as LotteryEntry;
}

export async function getDraws() {
  if (!supa) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supa
    .from('draws')
    .select('*, winner_entry:lottery_entries(*)')
    .order('executed_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createDraw(draw: Partial<Draw>) {
  if (!supa) {
    throw new Error('Supabase not configured');
  }
  const { data, error } = await supa
    .from('draws')
    .insert([draw])
    .select()
    .single();
  
  if (error) throw error;
  return data as Draw;
}

export default supa;
