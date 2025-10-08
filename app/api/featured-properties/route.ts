import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not configured, returning demo data')
      const demoFeaturedProperties = [
        {
          id: 'demo-1',
          title: 'Modern Apartment in Phnom Penh',
          description: 'Beautiful modern apartment with city views',
          price: 1200,
          priceType: 'rent',
          propertyType: 'apartment',
          bedrooms: 2,
          bathrooms: 2,
          area: 85,
          location: 'Phnom Penh',
          address: '123 Main Street, Phnom Penh',
          latitude: 11.5564,
          longitude: 104.9282,
          images: ['/images/properties/featured/modern-apartment-toul-kork.jpg'],
          features: ['Air Conditioning', 'Balcony', 'Parking'],
          isFeatured: true,
          isAvailable: true,
          availabilityInfo: 'Available Now',
          availabilityDate: new Date().toISOString(),
          commissionRate: 2.5,
          specialConditions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          agentId: 'demo-agent-1',
          agent: {
            id: 'demo-agent-1',
            name: 'John Doe',
            phone: '+855 12 345 678',
            avatar: '/images/agents/john-doe.jpg'
          }
        },
        {
          id: 'demo-2',
          title: 'Luxury Villa with Pool',
          description: 'Spacious villa with private pool and garden',
          price: 2500,
          priceType: 'rent',
          propertyType: 'villa',
          bedrooms: 4,
          bathrooms: 3,
          area: 200,
          location: 'Phnom Penh',
          address: '456 Villa Street, Phnom Penh',
          latitude: 11.5564,
          longitude: 104.9282,
          images: ['/images/properties/featured/premium-villa-sen-sok.jpg'],
          features: ['Swimming Pool', 'Garden', 'Parking', 'Security'],
          isFeatured: true,
          isAvailable: true,
          availabilityInfo: 'Available September 2024',
          availabilityDate: new Date('2024-09-01').toISOString(),
          commissionRate: 3.0,
          specialConditions: ['Exclude Management Fee'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          agentId: 'demo-agent-2',
          agent: {
            id: 'demo-agent-2',
            name: 'Jane Smith',
            phone: '+855 12 345 679',
            avatar: '/images/agents/jane-smith.jpg'
          }
        }
      ]
      return NextResponse.json(demoFeaturedProperties)
    }

    const featuredProperties = await prisma.property.findMany({
      where: {
        isFeatured: true,
        isAvailable: true
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6 // Limit to 6 featured properties
    })

    return NextResponse.json(featuredProperties)
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    
    // If it's a database connection error, return demo data
    if (error instanceof Error && error.message.includes('DATABASE_URL')) {
      console.log('Database connection error, returning demo data')
      const demoFeaturedProperties = [
        {
          id: 'demo-1',
          title: 'Modern Apartment in Phnom Penh',
          description: 'Beautiful modern apartment with city views',
          price: 1200,
          priceType: 'rent',
          propertyType: 'apartment',
          bedrooms: 2,
          bathrooms: 2,
          area: 85,
          location: 'Phnom Penh',
          address: '123 Main Street, Phnom Penh',
          latitude: 11.5564,
          longitude: 104.9282,
          images: ['/images/properties/featured/modern-apartment-toul-kork.jpg'],
          features: ['Air Conditioning', 'Balcony', 'Parking'],
          isFeatured: true,
          isAvailable: true,
          availabilityInfo: 'Available Now',
          availabilityDate: new Date().toISOString(),
          commissionRate: 2.5,
          specialConditions: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          agentId: 'demo-agent-1',
          agent: {
            id: 'demo-agent-1',
            name: 'John Doe',
            phone: '+855 12 345 678',
            avatar: '/images/agents/john-doe.jpg'
          }
        },
        {
          id: 'demo-2',
          title: 'Luxury Villa with Pool',
          description: 'Spacious villa with private pool and garden',
          price: 2500,
          priceType: 'rent',
          propertyType: 'villa',
          bedrooms: 4,
          bathrooms: 3,
          area: 200,
          location: 'Phnom Penh',
          address: '456 Villa Street, Phnom Penh',
          latitude: 11.5564,
          longitude: 104.9282,
          images: ['/images/properties/featured/premium-villa-sen-sok.jpg'],
          features: ['Swimming Pool', 'Garden', 'Parking', 'Security'],
          isFeatured: true,
          isAvailable: true,
          availabilityInfo: 'Available September 2024',
          availabilityDate: new Date('2024-09-01').toISOString(),
          commissionRate: 3.0,
          specialConditions: ['Exclude Management Fee'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          agentId: 'demo-agent-2',
          agent: {
            id: 'demo-agent-2',
            name: 'Jane Smith',
            phone: '+855 12 345 679',
            avatar: '/images/agents/jane-smith.jpg'
          }
        }
      ]
      return NextResponse.json(demoFeaturedProperties)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch featured properties' },
      { status: 500 }
    )
  }
}
