import { NextRequest, NextResponse } from 'next/server'
import { deactivateAgent, getAgentById, upsertAgent } from '@/lib/static-store'
import type { Agent } from '@/types/agent'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const agent = getAgentById(id)

    if (!agent || !agent.is_active) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ ...agent, agentId: agent.id })
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

    const existingAgent = getAgentById(id)

    if (!existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    const updatedAgent: Agent = {
      ...existingAgent,
      name,
      email,
      phone,
      telegram: telegram || '',
      position: position || '',
      avatar_url: avatar_url || '',
      bio: bio || '',
      experience_years: experience_years || 0,
      specialties: specialties || [],
      languages: languages || [],
      rating: rating || 0,
      properties_sold: properties_sold || 0,
      education: education || '',
      certifications: certifications || [],
      achievements: achievements || [],
      location: location || 'Phnom Penh',
      updated_at: new Date().toISOString(),
    }

    upsertAgent(updatedAgent)

    return NextResponse.json({ ...updatedAgent, agentId: updatedAgent.id })
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
    
    const existingAgent = getAgentById(id)

    if (!existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    deactivateAgent(id)

    return NextResponse.json({ message: 'Agent deleted successfully' })
  } catch (error) {
    console.error('Error deleting agent:', error)
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    )
  }
}
