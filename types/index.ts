// Mock types for build - will be replaced with actual Prisma types when database is set up
export interface Property {
  id: string
  title: string
  description: string
  price: number
  property_type: string
  listing_type: string
  bedrooms?: number
  bathrooms?: number
  area_sqm?: number
  location: string
  address?: string
  district?: string
  city: string
  images: string[]
  features: string[]
  amenities: string[]
  status: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  name: string
  email: string
  phone?: string
  telegram?: string
  position?: string
  bio?: string
  avatar_url?: string
  specialties: string[]
  languages: string[]
  experience_years: number
  properties_sold: number
  rating: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description?: string
  icon?: string
  features: string[]
  pricing_info?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  property_id?: string
  agent_id?: string
  status: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  description: string
  address: string
  phone: string
  email: string
  website?: string
  logo_url?: string
  created_at: string
  updated_at: string
}

export interface PropertyWithAgent extends Property {
  agent: Agent
}

export interface FeaturedProperty extends Property {
  agent: Pick<Agent, 'id' | 'name' | 'phone' | 'telegram'>
}

export interface PropertyFilters {
  priceType?: 'rent' | 'sale'
  propertyType?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  minArea?: number
  maxArea?: number
}

export interface SearchParams {
  page?: number
  limit?: number
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc'
  search?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  subject?: string
}

export interface HeroSection {
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  backgroundImage: string
}

export interface WhyChooseUsItem {
  icon: string
  title: string
  description: string
}

export interface NavigationItem {
  name: string
  href: string
  current?: boolean
}
