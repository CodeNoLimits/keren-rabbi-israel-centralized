import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://votre-projet.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'votre-cle-anon'

// Client Supabase configuré
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  realtime: {
    enabled: false // Désactivé pour économiser les ressources
  }
})

// Types TypeScript pour la base de données
export interface Book {
  id: string
  title: string
  title_hebrew?: string
  title_english?: string
  title_french?: string
  title_spanish?: string
  title_russian?: string
  author: string
  author_hebrew?: string
  price: number
  original_price?: number
  discount_percentage?: number
  category: string
  subcategory?: string
  language: string
  available_languages: string[]
  image_url?: string
  image_urls?: string[]
  description?: string
  description_hebrew?: string
  description_english?: string
  description_french?: string
  description_spanish?: string
  description_russian?: string
  stock_quantity: number
  isbn?: string
  publisher: string
  publication_date?: string
  pages?: number
  weight_grams?: number
  dimensions_cm?: string
  binding_type: string
  is_featured: boolean
  is_bestseller: boolean
  is_new_release: boolean
  rating: number
  review_count: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  name_hebrew: string
  name_english?: string
  name_french?: string
  name_spanish?: string
  name_russian?: string
  slug: string
  description?: string
  parent_category_id?: string
  image_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Order {
  id: string
  order_number: string
  user_email: string
  user_name?: string
  user_phone?: string
  total_amount: number
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  currency: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method?: string
  payment_reference?: string
  shipping_address: {
    name: string
    street: string
    city: string
    postal_code: string
    country: string
    phone?: string
  }
  billing_address?: {
    name: string
    street: string
    city: string
    postal_code: string
    country: string
  }
  shipping_method: string
  tracking_number?: string
  notes?: string
  language: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  book_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  book?: Book
}

export interface Review {
  id: string
  book_id: string
  user_name: string
  user_email?: string
  rating: number
  title?: string
  comment?: string
  is_verified_purchase: boolean
  is_approved: boolean
  language: string
  created_at: string
}

// Services API pour les livres
export const bookService = {
  // Récupérer tous les livres avec pagination
  async getBooks(options: {
    page?: number
    limit?: number
    category?: string
    language?: string
    search?: string
    featured?: boolean
  } = {}) {
    let query = supabase
      .from('books')
      .select('*')
      .gt('stock_quantity', 0)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (options.category) {
      query = query.eq('category', options.category)
    }

    if (options.language) {
      query = query.contains('available_languages', [options.language])
    }

    if (options.featured) {
      query = query.eq('is_featured', true)
    }

    if (options.search) {
      query = query.or(
        `title.ilike.%${options.search}%,` +
        `title_hebrew.ilike.%${options.search}%,` +
        `author.ilike.%${options.search}%,` +
        `description.ilike.%${options.search}%`
      )
    }

    const page = options.page || 1
    const limit = options.limit || 12
    const from = (page - 1) * limit
    const to = from + limit - 1

    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('Erreur lors du chargement des livres:', error)
      throw error
    }

    return {
      books: data as Book[],
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit)
    }
  },

  // Récupérer un livre par ID
  async getBookById(id: string) {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erreur lors du chargement du livre:', error)
      throw error
    }

    return data as Book
  },

  // Recherche avancée avec la fonction PostgreSQL
  async searchBooks(options: {
    search?: string
    category?: string
    language?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
    offset?: number
  } = {}) {
    const { data, error } = await supabase.rpc('search_books', {
      search_term: options.search || '',
      category_filter: options.category || null,
      language_filter: options.language || null,
      min_price: options.minPrice || null,
      max_price: options.maxPrice || null,
      limit_count: options.limit || 20,
      offset_count: options.offset || 0
    })

    if (error) {
      console.error('Erreur lors de la recherche:', error)
      throw error
    }

    return data as Book[]
  },

  // Récupérer les livres en vedette
  async getFeaturedBooks(limit: number = 8) {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('is_featured', true)
      .gt('stock_quantity', 0)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erreur lors du chargement des livres vedettes:', error)
      throw error
    }

    return data as Book[]
  },

  // Récupérer les bestsellers
  async getBestsellers(limit: number = 6) {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('is_bestseller', true)
      .gt('stock_quantity', 0)
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erreur lors du chargement des bestsellers:', error)
      throw error
    }

    return data as Book[]
  }
}

// Services API pour les catégories
export const categoryService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Erreur lors du chargement des catégories:', error)
      throw error
    }

    return data as Category[]
  },

  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Erreur lors du chargement de la catégorie:', error)
      throw error
    }

    return data as Category
  }
}

// Services API pour les commandes
export const orderService = {
  async createOrder(orderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la création de la commande:', error)
      throw error
    }

    return data as Order
  },

  async createOrderItems(orderItems: Omit<OrderItem, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select()

    if (error) {
      console.error('Erreur lors de la création des éléments de commande:', error)
      throw error
    }

    return data as OrderItem[]
  },

  async getOrderByNumber(orderNumber: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          book:books (*)
        )
      `)
      .eq('order_number', orderNumber)
      .single()

    if (error) {
      console.error('Erreur lors du chargement de la commande:', error)
      throw error
    }

    return data
  }
}

// Services API pour les avis
export const reviewService = {
  async getBookReviews(bookId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('book_id', bookId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur lors du chargement des avis:', error)
      throw error
    }

    return data as Review[]
  },

  async createReview(reviewData: Omit<Review, 'id' | 'is_approved' | 'created_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la création de l\'avis:', error)
      throw error
    }

    return data as Review
  }
}

// Service newsletter
export const newsletterService = {
  async subscribe(email: string, name?: string, language: string = 'he') {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, name, language }])
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de l\'inscription à la newsletter:', error)
      throw error
    }

    return data
  }
}

// Statistiques
export const statsService = {
  async getBookStats() {
    const { data, error } = await supabase
      .from('book_stats')
      .select('*')
      .single()

    if (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
      throw error
    }

    return data
  }
}

export default supabase