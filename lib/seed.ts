import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create agents
  /*
  const agent1 = await prisma.agent.upsert({
    where: { email: 'john@vstvagent.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@vstvagent.com',
      phone: '+855 12 345 6789',
      telegram: '@johndoe',
      bio: 'With over 8 years of experience in the Cambodian real estate market, John specializes in luxury properties and investment opportunities.',
      experience: 8,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  })

  const agent2 = await prisma.agent.upsert({
    where: { email: 'jane@vstvagent.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@vstvagent.com',
      phone: '+855 12 345 6788',
      telegram: '@janesmith',
      bio: 'Jane brings 6 years of expertise in residential and commercial properties. She is known for her attention to detail and excellent customer service.',
      experience: 6,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  })
  */

  // Create properties
  /*
  const property1 = await prisma.property.upsert({
    where: { id: 'property-1' },
    update: {},
    create: {
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
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Swimming Pool', 'Fitness Center', 'Parking', '24/7 Security'],
      isFeatured: true,
      agentId: agent1.id,
    },
  })
  */

  /*
  const property2 = await prisma.property.upsert({
    where: { id: 'property-2' },
    update: {},
    create: {
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
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Balcony', 'Security', 'WiFi'],
      isFeatured: true,
      agentId: agent2.id,
    },
  })
  */

  // Create services
  /*
  const service1 = await prisma.service.upsert({
    where: { id: 'service-1' },
    update: {},
    create: {
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
      ],
    },
  })
  */

  /*
  const service2 = await prisma.service.upsert({
    where: { id: 'service-2' },
    update: {},
    create: {
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
      ],
    },
  })
  */

  // Create company info
  /*
  const company = await prisma.company.upsert({
    where: { id: 'company-1' },
    update: {},
    create: {
      id: 'company-1',
      name: 'VSTV AGENT (CAMBODIA) CO., LTD',
      description: 'Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.',
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
    },
  })
  */

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
