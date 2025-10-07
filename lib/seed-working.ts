import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding with existing models...')

  // 1. Seed Agents (existing model)
  console.log('Seeding agents...')
  const agents = [
    {
      id: 'agent-1',
      agentId: '004',
      name: 'HENG KIMHONG',
      role: 'Real Estate Agent Supervisor',
      email: 'hengkimhong1803@email.com',
      phone: '+855 96 4444 027',
      bio: 'With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.',
      avatar: '/images/agents/heng-kimhong.html',
      specialties: ['Luxury Properties', 'Investment Consulting', 'Property Management', 'Team Leadership'],
      languages: ['English', 'Khmer', 'Chinese'],
      experience: 8,
      propertiesSold: 180,
      rating: 4.9,
      isActive: true
    },
    {
      id: 'agent-2',
      agentId: '003',
      name: 'VIN SOLYVAY',
      role: 'Real Estate Agent',
      email: 'vinsolyvay@gmail.com',
      phone: '+855 98 261 801',
      bio: 'Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.',
      avatar: '/images/agents/vin-solyvay.html',
      specialties: ['Residential Properties', 'First-time Buyers', 'Market Analysis', 'Client Relations'],
      languages: ['English', 'Khmer'],
      experience: 5,
      propertiesSold: 85,
      rating: 4.8,
      isActive: true
    },
    {
      id: 'agent-3',
      agentId: '008',
      name: 'HENG RITA',
      role: 'Real Estate Agent',
      email: 'hengrita@vstvagent.com',
      phone: '+855 12 345 6789',
      bio: 'Heng Rita is a dedicated real estate professional with a passion for helping clients find their perfect home. Her attention to detail and excellent customer service make her a trusted advisor in the Cambodian property market.',
      avatar: '/images/agents/Heng-Rita.jpg',
      specialties: ['Residential Sales', 'Property Rentals', 'Client Relations', 'Market Research'],
      languages: ['English', 'Khmer'],
      experience: 6,
      propertiesSold: 120,
      rating: 4.9,
      isActive: true
    }
  ]

  for (const agent of agents) {
    await prisma.agent.upsert({
      where: { id: agent.id },
      update: {},
      create: agent
    })
  }

  // 2. Seed Properties (existing model)
  console.log('Seeding properties...')
  const properties = [
    {
      id: 'property-1',
      title: 'Luxury Condo in BKK1',
      description: 'This stunning luxury condo in the heart of BKK1 offers modern living with premium amenities.',
      price: 1200,
      priceType: 'rent',
      propertyType: 'condo',
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      location: 'BKK1, Phnom Penh',
      address: 'Street 123, Building ABC, BKK1, Phnom Penh, Cambodia',
      latitude: 11.5564,
      longitude: 104.9282,
      images: [
        '/images/properties/featured/luxury-condo-bkk1.jpg',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Swimming Pool', 'Fitness Center', 'Parking', '24/7 Security'],
      isFeatured: true,
      agentId: 'agent-1'
    },
    {
      id: 'property-2',
      title: 'Modern Apartment in Toul Kork',
      description: 'Comfortable and modern apartment in a prime location with excellent amenities.',
      price: 800,
      priceType: 'rent',
      propertyType: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      location: 'Toul Kork, Phnom Penh',
      address: 'Street 456, Building DEF, Toul Kork, Phnom Penh, Cambodia',
      latitude: 11.5700,
      longitude: 104.8900,
      images: [
        '/images/properties/featured/modern-apartment-toul-kork.jpg',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Balcony', 'Security', 'WiFi'],
      isFeatured: true,
      agentId: 'agent-2'
    },
    {
      id: 'property-3',
      title: 'Premium Villa for Sale',
      description: 'Exclusive villa in Sen Sok with modern amenities and spacious living areas.',
      price: 250000,
      priceType: 'sale',
      propertyType: 'villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      location: 'Sen Sok, Phnom Penh',
      address: 'Street 789, Villa Complex, Sen Sok, Phnom Penh, Cambodia',
      latitude: 11.6000,
      longitude: 104.9000,
      images: [
        '/images/properties/featured/premium-villa-sen-sok.jpg',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Garden', 'Garage', 'Pool', 'Security'],
      isFeatured: true,
      agentId: 'agent-3'
    }
  ]

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property
    })
  }

  // 3. Seed Services (existing model)
  console.log('Seeding services...')
  const services = [
    {
      id: 'service-1',
      title: 'Property Sales',
      description: 'Find your dream home with our extensive collection of properties for sale across Cambodia.',
      icon: 'Home',
      features: [
        'Luxury condos and apartments',
        'Family houses and villas',
        'Commercial properties',
        'Land and development plots',
        'Investment opportunities'
      ]
    },
    {
      id: 'service-2',
      title: 'Property Rental',
      description: 'Discover comfortable rental properties that suit your lifestyle and budget.',
      icon: 'Building',
      features: [
        'Furnished and unfurnished options',
        'Short-term and long-term rentals',
        'Student accommodations',
        'Corporate housing',
        'Luxury rentals'
      ]
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: service
    })
  }

  console.log('Database seeding completed successfully!')
  console.log('Note: New models (HeroSlide, CompanyInfo) need Prisma client regeneration')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
