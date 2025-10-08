// Agent type definition for the application
export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  telegram: string
  position: string
  bio: string
  avatar_url: string
  background_image: string
  specialties: string[]
  languages: string[]
  experience_years: number
  properties_sold: number
  rating: number
  education: string
  certifications: string[]
  achievements: string[]
  location: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Supabase database agent type (what comes from the database)
export interface SupabaseAgent {
  id: string
  name: string
  email: string
  phone: string | null
  telegram: string | null
  position: string | null
  bio: string | null
  avatar_url: string | null
  background_image: string | null
  specialties: string[]
  languages: string[]
  experience_years: number
  properties_sold: number
  rating: number
  education: string | null
  certifications: string[]
  achievements: string[]
  location: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}
