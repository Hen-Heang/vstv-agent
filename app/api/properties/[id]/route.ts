import { NextResponse } from 'next/server'
import { getAgentById, getPropertyById, upsertProperty, deleteProperty } from '@/lib/static-store'
import type { Property } from '@/lib/static-store'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const property = getPropertyById(id)

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

    const existingProperty = getPropertyById(id)

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    const agent = getAgentById(agentId)
    const updatedAt = new Date().toISOString()

    const property: Property = {
      ...existingProperty,
      title,
      description: description || '',
      price: Number(price),
      priceType,
      propertyType,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      area: area ? Number(area) : null,
      location,
      address: address || location,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      images: images || [],
      features: features || [],
      isFeatured: Boolean(isFeatured),
      isAvailable: Boolean(isAvailable),
      availabilityInfo: availabilityInfo || '',
      availabilityDate: availabilityDate ? new Date(availabilityDate).toISOString() : existingProperty.availabilityDate,
      commissionRate: commissionRate ? Number(commissionRate) : null,
      specialConditions: specialConditions || [],
      agentId,
      agent: agent
        ? {
            id: agent.id,
            name: agent.name,
            agentId: agent.id,
            phone: agent.phone,
            avatar: agent.avatar_url || null,
          }
        : undefined,
      updatedAt,
    }

    upsertProperty(property)

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
    const existingProperty = getPropertyById(id)

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    deleteProperty(id)

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

