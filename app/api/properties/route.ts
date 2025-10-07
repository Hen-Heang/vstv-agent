import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {
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
      }
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      title,
      description,
      price,
      priceType,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      location,
      address,
      latitude,
      longitude,
      images,
      features,
      isFeatured,
      isAvailable,
      availabilityInfo,
      availabilityDate,
      commissionRate,
      specialConditions,
      agentId
    } = body

    // Validate required fields
    if (!title || !price || !priceType || !propertyType || !location || !agentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: Number(price),
        priceType,
        propertyType,
        bedrooms: bedrooms ? Number(bedrooms) : null,
        bathrooms: bathrooms ? Number(bathrooms) : null,
        area: area ? Number(area) : null,
        location,
        address,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
        images: images || [],
        features: features || [],
        isFeatured: Boolean(isFeatured),
        isAvailable: Boolean(isAvailable),
        availabilityInfo,
        availabilityDate: availabilityDate ? new Date(availabilityDate) : null,
        commissionRate: commissionRate ? Number(commissionRate) : null,
        specialConditions: specialConditions || [],
        agentId
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
      }
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}
