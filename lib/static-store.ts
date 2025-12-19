import type { Agent } from '@/types/agent'

export type HeroSlide = {
  id: string
  title: string
  subtitle: string
  background_image: string
  cta: string
  cta_secondary: string
  cta_link?: string
  cta_secondary_link?: string
  is_active: boolean
  order: number
}

export type Property = {
  id: string
  title: string
  description: string
  price: number
  priceType: 'rent' | 'sale'
  propertyType: string
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  location: string
  address: string
  latitude: number | null
  longitude: number | null
  images: string[]
  features: string[]
  isFeatured: boolean
  isAvailable: boolean
  availabilityInfo: string
  availabilityDate: string
  commissionRate: number | null
  specialConditions: string[]
  createdAt: string
  updatedAt: string
  agentId: string
  agent?: {
    id: string
    name: string
    agentId: string
    phone: string | null
    avatar: string | null
  }
}

export type ContactInquiry = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export type Unit = {
  id: string
  unitNo: string
  price: number
  roomType: string
  handleBy: string
  remarks: string | null
  status: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const nowIso = () => new Date().toISOString()

let agents: Agent[] = [
  {
    id: '004',
    name: 'HENG KIMHONG',
    email: 'hengkimhong1803@email.com',
    phone: '+855 96 4444 027',
    telegram: '0889832306',
    position: 'Real Estate Agent Supervisor',
    bio: 'With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.',
    avatar_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    background_image: '/images/company/VSTV-BG.png',
    specialties: ['Luxury Properties', 'Investment Consulting', 'Property Management', 'Team Leadership'],
    languages: ['English', 'Khmer', 'Chinese'],
    experience_years: 8,
    properties_sold: 180,
    rating: 4.9,
    education: "Bachelor's in Business Administration",
    certifications: ['Licensed Real Estate Agent', 'Property Investment Specialist', 'Team Management Certified'],
    achievements: ['Top Performer 2023', 'Team Leadership Award 2022', 'Sales Excellence Award 2021'],
    location: 'Phnom Penh',
    is_active: true,
    created_at: new Date('2016-03-15').toISOString(),
    updated_at: nowIso(),
  },
  {
    id: '003',
    name: 'VIN SOLYVAY',
    email: 'vinsolyvay@gmail.com',
    phone: '+855 98 261 801',
    telegram: '098261801',
    position: 'Real Estate Agent',
    bio: 'Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.',
    avatar_url:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    background_image: '/images/company/VSTV-BG.png',
    specialties: ['Residential Properties', 'First-time Buyers', 'Market Analysis', 'Client Relations'],
    languages: ['English', 'Khmer'],
    experience_years: 5,
    properties_sold: 85,
    rating: 4.8,
    education: "Bachelor's in Economics",
    certifications: ['Licensed Real Estate Agent', 'Property Investment Specialist'],
    achievements: ['Rising Star 2023', 'Client Satisfaction Award 2022', 'New Agent Excellence 2021'],
    location: 'Phnom Penh',
    is_active: true,
    created_at: new Date('2019-06-10').toISOString(),
    updated_at: nowIso(),
  },
  {
    id: '008',
    name: 'HENG RITA',
    email: 'rytavsv168@gmail.com',
    phone: '098-261-808',
    telegram: 'assistant_vstv168',
    position: 'Senior Real Estate Agent',
    bio: 'Heng Rita is a senior real estate professional with deep knowledge of the Cambodian property market. She specializes in luxury residential properties and has built strong relationships with both local and international clients.',
    avatar_url:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    background_image: '/images/company/VSTV-BG.png',
    specialties: ['Luxury Residential', 'International Clients', 'Property Investment', 'Market Trends'],
    languages: ['English', 'Khmer', 'Chinese'],
    experience_years: 7,
    properties_sold: 120,
    rating: 4.9,
    education: "Bachelor's in Business Administration",
    certifications: ['Licensed Real Estate Agent', 'Property Investment Specialist', 'International Property Certified'],
    achievements: ['Senior Agent Excellence 2023', 'International Client Award 2022', 'Sales Excellence Award 2021'],
    location: 'Phnom Penh',
    is_active: true,
    created_at: new Date('2017-08-20').toISOString(),
    updated_at: nowIso(),
  },
  {
    id: '009',
    name: 'PENG HOUNANG',
    email: 'Penghounang111@gmail.com',
    phone: '+855 93 76 51 11',
    telegram: '093765111',
    position: 'Real Estate Agent Manager',
    bio: 'Peng Hounang serves as a Real Estate Agent Manager, bringing strategic leadership and extensive market knowledge to the team. His management experience combined with deep property expertise makes him an invaluable asset to both clients and colleagues.',
    avatar_url:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    background_image: '/images/company/VSTV-BG.png',
    specialties: ['Strategic Planning', 'Team Management', 'Commercial Properties', 'Investment Analysis'],
    languages: ['English', 'Khmer', 'Chinese'],
    experience_years: 10,
    properties_sold: 200,
    rating: 4.9,
    education: "Master's in Business Administration",
    certifications: ['Licensed Real Estate Agent', 'Property Management Certified', 'Team Leadership Certified'],
    achievements: ['Management Excellence 2023', 'Strategic Leadership Award 2022', 'Top Performer 2021'],
    location: 'Phnom Penh',
    is_active: true,
    created_at: new Date('2014-02-15').toISOString(),
    updated_at: nowIso(),
  },
  {
    id: '010',
    name: 'NHEM SAMI',
    email: 'nhemsami@gmail.com',
    phone: '+855 10 773 523',
    telegram: '010773523',
    position: 'Real Estate Agent',
    bio: 'Nhem Sami is a dedicated real estate professional committed to helping clients find their perfect property. With a focus on residential properties and excellent customer service, he ensures every client receives personalized attention.',
    avatar_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    background_image: '/images/company/VSTV-BG.png',
    specialties: ['Residential Properties', 'Customer Service', 'Property Tours', 'Market Research'],
    languages: ['English', 'Khmer'],
    experience_years: 4,
    properties_sold: 65,
    rating: 4.7,
    education: "Bachelor's in Marketing",
    certifications: ['Licensed Real Estate Agent', 'Customer Service Certified'],
    achievements: ['Customer Service Excellence 2023', 'New Agent Achievement 2022', 'Client Satisfaction Award 2021'],
    location: 'Phnom Penh',
    is_active: true,
    created_at: new Date('2020-09-12').toISOString(),
    updated_at: nowIso(),
  },
  {
    id: '005',
    name: 'KHUN SINDIKA',
    email: 'khunsingdika@gmail.com',
    phone: '+855 96 616 1180',
    telegram: '0966161180',
    position: 'Real Estate Agent',
    bio: 'Khun Sindika is a professional real estate agent with a passion for helping clients navigate the property market. Her attention to detail and commitment to excellence make her a trusted advisor for property transactions.',
    avatar_url:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    background_image: '/images/company/VSTV-BG.png',
    specialties: ['Residential Properties', 'Property Valuation', 'Client Relations', 'Market Analysis'],
    languages: ['English', 'Khmer'],
    experience_years: 6,
    properties_sold: 95,
    rating: 4.8,
    education: "Bachelor's in Economics",
    certifications: ['Licensed Real Estate Agent', 'Property Valuation Certified'],
    achievements: ['Professional Excellence 2023', 'Client Relations Award 2022', 'Sales Achievement 2021'],
    location: 'Phnom Penh',
    is_active: true,
    created_at: new Date('2018-04-18').toISOString(),
    updated_at: nowIso(),
  },
  {
    id: '007',
    name: 'OEURN CHET',
    email: 'chetvstv@gmail.com',
    phone: '098-261-807',
    telegram: 'Salevstv007',
    position: 'Real Estate Agent Supervisor',
    bio: 'Oeurn Chet serves as a Real Estate Agent Supervisor, combining leadership skills with extensive property market knowledge. His supervisory role allows him to guide both clients and team members toward successful property transactions.',
    avatar_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    background_image: '/images/company/VSTV-BG.png',
    specialties: ['Team Leadership', 'Luxury Properties', 'Investment Consulting', 'Client Management'],
    languages: ['English', 'Khmer', 'Chinese'],
    experience_years: 9,
    properties_sold: 160,
    rating: 4.9,
    education: "Bachelor's in Business Administration",
    certifications: ['Licensed Real Estate Agent', 'Property Investment Specialist', 'Leadership Certified'],
    achievements: ['Supervisory Excellence 2023', 'Team Leadership Award 2022', 'Sales Excellence Award 2021'],
    location: 'Phnom Penh',
    is_active: true,
    created_at: new Date('2015-11-25').toISOString(),
    updated_at: nowIso(),
  },
]

let properties: Property[] = [
  {
    id: 'property-1',
    title: 'Luxury Condo in BKK1',
    description: 'Modern condo with premium amenities in the heart of BKK1.',
    price: 1200,
    priceType: 'rent',
    propertyType: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    location: 'BKK1, Phnom Penh',
    address: 'BKK1, Phnom Penh, Cambodia',
    latitude: 11.5564,
    longitude: 104.9282,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'],
    features: ['Pool', 'Gym', 'Parking', 'Security'],
    isFeatured: true,
    isAvailable: true,
    availabilityInfo: 'Available Now',
    availabilityDate: nowIso(),
    commissionRate: 2.5,
    specialConditions: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
    agentId: '004',
    agent: {
      id: '004',
      name: 'HENG KIMHONG',
      agentId: '004',
      phone: '+855 96 4444 027',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 'property-2',
    title: 'Modern Apartment in Toul Kork',
    description: 'Cozy apartment perfect for professionals, close to cafes and shops.',
    price: 800,
    priceType: 'rent',
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    location: 'Toul Kork, Phnom Penh',
    address: 'Toul Kork, Phnom Penh, Cambodia',
    latitude: 11.5696,
    longitude: 104.9001,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'],
    features: ['Balcony', 'Security', 'WiFi'],
    isFeatured: true,
    isAvailable: true,
    availabilityInfo: 'Available Now',
    availabilityDate: nowIso(),
    commissionRate: 2.5,
    specialConditions: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
    agentId: '003',
    agent: {
      id: '003',
      name: 'VIN SOLYVAY',
      agentId: '003',
      phone: '+855 98 261 801',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
  {
    id: 'property-3',
    title: 'Premium Villa for Sale',
    description: 'Spacious villa with garden and pool, ideal for families.',
    price: 250000,
    priceType: 'sale',
    propertyType: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    location: 'Sen Sok, Phnom Penh',
    address: 'Sen Sok, Phnom Penh, Cambodia',
    latitude: 11.584,
    longitude: 104.879,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'],
    features: ['Garden', 'Garage', 'Pool'],
    isFeatured: false,
    isAvailable: true,
    availabilityInfo: 'Available Now',
    availabilityDate: nowIso(),
    commissionRate: 3.0,
    specialConditions: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
    agentId: '008',
    agent: {
      id: '008',
      name: 'HENG RITA',
      agentId: '008',
      phone: '098-261-808',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
  },
]

let heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Find Your Perfect Home',
    subtitle: 'Discover premium properties across Phnom Penh with trusted local experts.',
    background_image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    cta: 'Browse Properties',
    cta_secondary: 'Meet Our Agents',
    cta_link: '/properties',
    cta_secondary_link: '/agents',
    is_active: true,
    order: 1,
  },
  {
    id: 'slide-2',
    title: 'Luxury Living, Made Simple',
    subtitle: 'Handpicked condos, apartments, and villas with transparent guidance.',
    background_image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    cta: 'View Featured Listings',
    cta_secondary: 'Contact Us',
    cta_link: '/properties',
    cta_secondary_link: '/contact',
    is_active: true,
    order: 2,
  },
  {
    id: 'slide-3',
    title: 'Invest With Confidence',
    subtitle: 'Market insights and negotiation support from experienced professionals.',
    background_image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
    cta: 'Explore Areas',
    cta_secondary: 'Get In Touch',
    cta_link: '/properties',
    cta_secondary_link: '/contact',
    is_active: true,
    order: 3,
  },
]

let units: Unit[] = [
  {
    id: 'demo-1',
    unitNo: 'ANATA/1212B',
    price: 1200,
    roomType: 'Studio Room',
    handleBy: 'Rita',
    remarks: 'Floor 5',
    status: 'available',
    isActive: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  },
  {
    id: 'demo-2',
    unitNo: 'Morgan/3317',
    price: 1500,
    roomType: 'One bedroom',
    handleBy: 'KA',
    remarks: 'Available 18.08.2025',
    status: 'available',
    isActive: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  },
  {
    id: 'demo-3',
    unitNo: 'Sale006/001',
    price: 2000,
    roomType: 'Two bedroom',
    handleBy: 'Sale006 VSTV',
    remarks: 'Negotiate',
    status: 'negotiate',
    isActive: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  },
]

let contactInquiries: ContactInquiry[] = []

export function listAgents() {
  return agents.slice()
}

export function listActiveAgents() {
  return agents.filter((agent) => agent.is_active)
}

export function getAgentById(id: string) {
  return agents.find((agent) => agent.id === id) ?? null
}

export function upsertAgent(next: Agent) {
  const index = agents.findIndex((a) => a.id === next.id)
  if (index === -1) {
    agents = [next, ...agents]
    return next
  }
  agents = agents.map((a, i) => (i === index ? next : a))
  return next
}

export function deactivateAgent(id: string) {
  const agent = getAgentById(id)
  if (!agent) return null
  const next: Agent = { ...agent, is_active: false, updated_at: nowIso() }
  return upsertAgent(next)
}

export function listProperties() {
  return properties.slice()
}

export function listAvailableProperties() {
  return properties.filter((property) => property.isAvailable)
}

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id) ?? null
}

export function upsertProperty(next: Property) {
  const index = properties.findIndex((p) => p.id === next.id)
  if (index === -1) {
    properties = [next, ...properties]
    return next
  }
  properties = properties.map((p, i) => (i === index ? next : p))
  return next
}

export function deleteProperty(id: string) {
  const existing = getPropertyById(id)
  if (!existing) return null
  properties = properties.filter((p) => p.id !== id)
  return existing
}

export function listHeroSlides() {
  return heroSlides.slice().sort((a, b) => a.order - b.order)
}

export function listActiveHeroSlides() {
  return heroSlides
    .filter((slide) => slide.is_active)
    .slice()
    .sort((a, b) => a.order - b.order)
}

export function createContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>) {
  const created: ContactInquiry = {
    id: globalThis.crypto?.randomUUID?.() ?? `contact-${Date.now()}`,
    createdAt: nowIso(),
    ...inquiry,
  }
  contactInquiries = [created, ...contactInquiries]
  return created
}

export function listUnits() {
  return units.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getUnitById(id: string) {
  return units.find((unit) => unit.id === id) ?? null
}

export function createUnit(input: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = nowIso()
  const unit: Unit = {
    id: globalThis.crypto?.randomUUID?.() ?? `unit-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    ...input,
  }
  units = [unit, ...units]
  return unit
}

export function updateUnit(id: string, patch: Partial<Omit<Unit, 'id' | 'createdAt'>>) {
  const existing = getUnitById(id)
  if (!existing) return null
  const next: Unit = {
    ...existing,
    ...patch,
    updatedAt: nowIso(),
  }
  units = units.map((u) => (u.id === id ? next : u))
  return next
}

export function deleteUnit(id: string) {
  const existing = getUnitById(id)
  if (!existing) return null
  units = units.filter((unit) => unit.id !== id)
  return existing
}
