// Temporary mock implementation for build
// TODO: Implement with actual Supabase integration

// Mock types
type Property = Record<string, unknown>
type Agent = Record<string, unknown>
type Service = Record<string, unknown>
type ContactInquiry = Record<string, unknown>

// Properties
export async function getProperties(_filters?: {
  property_type?: string
  listing_type?: string
  min_price?: number
  max_price?: number
  bedrooms?: number
  location?: string
  featured?: boolean
}) {
  return [] as Property[]
}

export async function getPropertyById(_id: string) {
  return null as Property | null
}

export async function getFeaturedProperties(limit = 6) {
  return [] as Property[]
}

// Agents
export async function getAgents() {
  return [] as Agent[]
}

export async function getAgentById(_id: string) {
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
export async function trackPropertyView(propertyId: string, _ipAddress?: string, _userAgent?: string) {
  // Mock implementation
  console.log('Tracking property view:', propertyId)
}

// Search Properties
export async function searchProperties(_searchTerm: string) {
  return [] as Property[]
}