import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json(
        { error: 'Failed to fetch properties from database' },
        { status: 500 }
      )
    }

    return NextResponse.json(properties || [])
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
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

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

    const { data: property, error } = await supabase
      .from('properties')
      .insert({
        title,
        description: description || null,
        price: Number(price),
        price_type: priceType,
        property_type: propertyType,
        bedrooms: bedrooms ? Number(bedrooms) : null,
        bathrooms: bathrooms ? Number(bathrooms) : null,
        area: area ? Number(area) : null,
        location,
        address: address || null,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
        images: images || [],
        features: features || [],
        is_featured: Boolean(isFeatured),
        is_available: Boolean(isAvailable),
        availability_info: availabilityInfo || null,
        availability_date: availabilityDate ? new Date(availabilityDate).toISOString() : null,
        commission_rate: commissionRate ? Number(commissionRate) : null,
        special_conditions: specialConditions || [],
        agent_id: agentId
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .select('*')
      .single()

    if (error) {
      console.error('Error creating property:', error)
      return NextResponse.json(
        { error: 'Failed to create property in database' },
        { status: 500 }
      )
    }

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}
