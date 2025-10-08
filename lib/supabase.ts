import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create Supabase client if both URL and key are properly configured
export const supabase = supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 50
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null
