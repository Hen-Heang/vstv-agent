// Temporary mock implementation for build
// TODO: Implement with actual Supabase integration

import { listAvailableProperties } from '@/lib/static-store'

// Mock types
type Property = Record<string, unknown>
type Agent = Record<string, unknown>
type Service = Record<string, unknown>
type ContactInquiry = Record<string, unknown>

// Properties
export async function getProperties(filters?: {
  property_type?: string
  listing_type?: string
  min_price?: number
  max_price?: number
  bedrooms?: number
  location?: string
  featured?: boolean
}) {
  // TODO: Implement actual filtering logic
  console.log('Getting properties with filters:', filters)
  return [] as Property[]
}

export async function getPropertyById(id: string) {
  // TODO: Implement actual property retrieval
  console.log('Getting property by ID:', id)
  return null as Property | null
}

export async function getFeaturedProperties(limit = 6) {
  // TODO: Implement actual featured properties retrieval
  console.log('Getting featured properties with limit:', limit)
  return [] as Property[]
}

// Agents
export async function getAgents() {
  return [] as Agent[]
}

export async function getAgentById(id: string) {
  // TODO: Implement actual agent retrieval
  console.log('Getting agent by ID:', id)
  return null as Agent | null
}

// Services
export async function getServices() {
  return [] as Service[]
}

// Contact Inquiries
export async function createContactInquiry(inquiry: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  property_id?: string
  agent_id?: string
}) {
  return inquiry as ContactInquiry
}

// Property Views
export async function trackPropertyView(propertyId: string, ipAddress?: string, userAgent?: string) {
  // Mock implementation
  console.log('Tracking property view:', propertyId, 'from IP:', ipAddress, 'User Agent:', userAgent)
}

// Search Properties
export async function searchProperties(searchTerm: string) {
  const term = searchTerm.trim()
  if (!term) return [] as Property[]

  const normalized = term.toLowerCase().replace(/\s+/g, ' ')
  const properties = listAvailableProperties()

  const matches = properties.filter((property) => {
    const haystack = [
      property.title,
      property.description,
      property.location,
      property.address,
      property.propertyType,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalized)
  })

  return matches as unknown as Property[]
}
