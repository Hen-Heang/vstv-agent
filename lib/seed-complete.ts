import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting complete database seeding...')

  // 1. Seed Company Information
  console.log('Seeding company information...')
  // TODO: Uncomment after running 'npx prisma generate'
  /*
  await prisma.companyInfo.upsert({
    where: { id: 'company-info-1' },
    update: {},
    create: {
      id: 'company-info-1',
      name: 'VSTV AGENT (CAMBODIA) CO., LTD',
      description: 'Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.',
      logo: '/images/company/VSTV.png',
      backgroundImage: '/images/company/VSTV-BG.png',
      mission: 'To provide exceptional real estate services that help our clients achieve their property goals while maintaining the highest standards of integrity, professionalism, and customer satisfaction.',
      vision: 'To be Cambodia\'s leading real estate agency, recognized for our innovation, expertise, and commitment to excellence.',
      values: ['Trust & Transparency', 'Client-First Approach', 'Excellence & Quality', 'Innovation & Growth'],
      address: 'Street 123, Building ABC, Phnom Penh, Cambodia',
      phone: '+855 12 345 6789',
      email: 'info@vstvagent.com',
      website: 'https://vstvagent.com',
      socialMedia: {
        telegram: '@vstvagent',
        facebook: 'https://facebook.com/vstvagent',
        instagram: 'https://instagram.com/vstvagent'
      },
      stats: {
        propertiesManaged: '1000+',
        happyClients: '500+',
        yearsExperience: '10+',
        marketGrowth: '25%'
      }
    }
  })
  */

  // 2. Seed Hero Slides
  console.log('Seeding hero slides...')
  // TODO: Uncomment after running 'npx prisma generate'
  /*
  const heroSlidesData = [
    {
      id: 'hero-slide-1',
      title: "Find Your Dream Property in Cambodia",
      subtitle: "Discover premium condos, luxury apartments, and exclusive villas in Cambodia's most desirable locations with expert guidance.",
      backgroundImage: "/images/company/VSTV-BG.png",
      cta: "Explore Properties",
      ctaSecondary: "Contact Agent",
      ctaLink: "/properties",
      ctaSecondaryLink: "/contact",
      order: 1
    },
    {
      id: 'hero-slide-2',
      title: "Premium Properties in Prime Locations",
      subtitle: "From BKK1 luxury condos to Sen Sok family homes, find your perfect property with Cambodia's trusted real estate experts.",
      backgroundImage: "/images/properties/featured/luxury-condo-bkk1.jpg",
      cta: "View Listings",
      ctaSecondary: "Schedule Tour",
      ctaLink: "/properties",
      ctaSecondaryLink: "/contact",
      order: 2
    },
    {
      id: 'hero-slide-3',
      title: "Meet Our Expert Agents",
      subtitle: "Professional real estate agents with extensive experience in the Cambodian market. Let our experts guide you to your perfect property.",
      backgroundImage: "/images/agents/Heng-Rita.jpg",
      cta: "Meet Our Agents",
      ctaSecondary: "Contact Agent",
      ctaLink: "/agents",
      ctaSecondaryLink: "/agents/008",
      order: 3
    },
    {
      id: 'hero-slide-4',
      title: "Smart Real Estate Investments",
      subtitle: "Maximize your returns with strategic property investments. Expert guidance for both local and international investors.",
      backgroundImage: "/images/properties/featured/premium-villa-sen-sok.jpg",
      cta: "Investment Guide",
      ctaSecondary: "Free Consultation",
      ctaLink: "/services",
      ctaSecondaryLink: "/contact",
      order: 4
    },
    {
      id: 'hero-slide-5',
      title: "VSTV Agent - Your Trusted Partner",
      subtitle: "Leading real estate agency in Cambodia with years of experience helping clients find their perfect properties.",
      backgroundImage: "/images/company/VSTV-BG.png",
      cta: "About Us",
      ctaSecondary: "Our Services",
      ctaLink: "/about",
      ctaSecondaryLink: "/services",
      order: 5
    }
  ]
  */

  // TODO: Uncomment after running 'npx prisma generate'
  /*
  for (const slide of heroSlidesData) {
    await prisma.heroSlide.upsert({
      where: { id: slide.id },
      update: {},
      create: slide
    })
  }
  */

  // 3. Seed Agents
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

  // 4. Seed Properties
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
    },
    {
      id: 'property-4',
      title: 'Cozy Studio in City Center',
      description: 'Perfect studio apartment in the heart of the city with modern amenities.',
      price: 500,
      priceType: 'rent',
      propertyType: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      location: 'City Center, Phnom Penh',
      address: 'Street 101, Building GHI, City Center, Phnom Penh, Cambodia',
      latitude: 11.5500,
      longitude: 104.9200,
      images: [
        '/images/properties/featured/cozy-studio-city-center.jpg',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Furnished', 'WiFi', 'Security'],
      isFeatured: false,
      agentId: 'agent-1'
    },
    {
      id: 'property-5',
      title: 'Spacious Family House',
      description: 'Beautiful family home with garden and parking in a quiet neighborhood.',
      price: 180000,
      priceType: 'sale',
      propertyType: 'house',
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      location: 'Chroy Changvar, Phnom Penh',
      address: 'Street 202, Residential Area, Chroy Changvar, Phnom Penh, Cambodia',
      latitude: 11.5800,
      longitude: 104.9500,
      images: [
        '/images/properties/featured/spacious-family-house.jpg',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Garden', 'Parking', 'Security', 'Balcony'],
      isFeatured: false,
      agentId: 'agent-2'
    },
    {
      id: 'property-6',
      title: 'High-End Condo with River View',
      description: 'Luxury condo with stunning river views and premium amenities.',
      price: 2000,
      priceType: 'rent',
      propertyType: 'condo',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      location: 'Tonle Bassac, Phnom Penh',
      address: 'Street 303, River View Tower, Tonle Bassac, Phnom Penh, Cambodia',
      latitude: 11.5400,
      longitude: 104.9300,
      images: [
        '/images/properties/featured/high-end-condo-river-view.jpg',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['River View', 'Pool', 'Gym', 'Concierge', 'Parking'],
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

  // 5. Seed Services
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
    },
    {
      id: 'service-3',
      title: 'Property Management',
      description: 'Professional property management services to maximize your investment returns.',
      icon: 'Settings',
      features: [
        'Tenant screening and management',
        'Rent collection and accounting',
        'Property maintenance coordination',
        'Legal compliance assistance',
        'Financial reporting'
      ]
    },
    {
      id: 'service-4',
      title: 'Investment Consulting',
      description: 'Expert guidance for real estate investments in Cambodia\'s growing market.',
      icon: 'TrendingUp',
      features: [
        'Market analysis and trends',
        'Investment opportunity assessment',
        'Risk evaluation',
        'ROI projections',
        'Portfolio diversification advice'
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
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
