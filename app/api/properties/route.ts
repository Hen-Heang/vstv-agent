import { NextResponse } from 'next/server'
import { getAgentById, listAvailableProperties, upsertProperty } from '@/lib/static-store'
import type { Property } from '@/lib/static-store'

export async function GET() {
  try {
    return NextResponse.json(listAvailableProperties())
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

    const id = globalThis.crypto?.randomUUID?.() ?? `property-${Date.now()}`
    const now = new Date().toISOString()
    const agent = getAgentById(agentId)

    const property: Property = {
      id,
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
      availabilityDate: availabilityDate ? new Date(availabilityDate).toISOString() : now,
      commissionRate: commissionRate ? Number(commissionRate) : null,
      specialConditions: specialConditions || [],
      createdAt: now,
      updatedAt: now,
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
    }

    upsertProperty(property)

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}
