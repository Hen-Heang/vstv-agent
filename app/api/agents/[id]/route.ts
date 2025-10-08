import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error || !agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(agent)
  } catch (error) {
    console.error('Error fetching agent:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

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

    // Check if agent exists
    const { data: existingAgent, error: fetchError } = await supabase
      .from('agents')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError || !existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Update agent
    const updateData = {
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
      location: location || null
    }

    const { data: updatedAgent, error: updateError } = await (supabase as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .from('agents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating agent:', updateError)
      return NextResponse.json(
        { error: 'Failed to update agent' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedAgent)
  } catch (error) {
    console.error('Error updating agent:', error)
    return NextResponse.json(
      { error: 'Failed to update agent' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    // Check if agent exists
    const { data: existingAgent, error: fetchError } = await supabase
      .from('agents')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError || !existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Soft delete by setting is_active to false
    const { error: updateError } = await (supabase as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .from('agents')
      .update({ is_active: false })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating agent:', updateError)
      return NextResponse.json(
        { error: 'Failed to delete agent' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Agent deleted successfully' })
  } catch (error) {
    console.error('Error deleting agent:', error)
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    )
  }
}