import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true,
            email: true,
            bio: true,
            specialties: true,
            languages: true,
            experience: true,
            rating: true
          }
        }
      }
    })

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    })

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    const property = await prisma.property.update({
      where: { id },
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

    return NextResponse.json(property)
  } catch (error) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    })

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    await prisma.property.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Property deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    )
  }
}

