import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching agents:', error)
      return NextResponse.json(
        { error: 'Failed to fetch agents from database' },
        { status: 500 }
      )
    }

    return NextResponse.json(agents || [])
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    
    const {
      name,
      position,
      email,
      phone,
      telegram,
      avatar_url,
      bio,
      experience_years,
      specialties,
      languages,
      properties_sold,
      rating,
      education,
      certifications,
      achievements,
      location
    } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone' },
        { status: 400 }
      )
    }

    const { data: newAgent, error } = await supabase
      .from('agents')
      .insert({
        name,
        position: position || null,
        email,
        phone,
        telegram: telegram || null,
        avatar_url: avatar_url || null,
        bio: bio || null,
        experience_years: experience_years || 0,
        specialties: specialties || [],
        languages: languages || [],
        rating: rating || 0,
        properties_sold: properties_sold || 0,
        education: education || null,
        certifications: certifications || [],
        achievements: achievements || [],
        location: location || null,
        is_active: true
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .select()
      .single()

    if (error) {
      console.error('Error creating agent:', error)
      return NextResponse.json(
        { error: 'Failed to create agent in database' },
        { status: 500 }
      )
    }

    return NextResponse.json(newAgent, { status: 201 })
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    )
  }
}