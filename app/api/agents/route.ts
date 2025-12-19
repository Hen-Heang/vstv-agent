import { NextRequest, NextResponse } from 'next/server'
import { listActiveAgents, upsertAgent } from '@/lib/static-store'
import type { Agent } from '@/types/agent'

export async function GET() {
  try {
    const agents = listActiveAgents().map((agent) => ({
      ...agent,
      agentId: agent.id,
    }))
    return NextResponse.json(agents)
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

    const id = globalThis.crypto?.randomUUID?.() ?? `agent-${Date.now()}`
    const now = new Date().toISOString()

    const newAgent: Agent = {
      id,
      name,
      email,
      phone,
      telegram: telegram || '',
      position: position || '',
      bio: bio || '',
      avatar_url: avatar_url || '',
      background_image: '/images/company/VSTV-BG.png',
      specialties: specialties || [],
      languages: languages || [],
      experience_years: experience_years || 0,
      properties_sold: properties_sold || 0,
      rating: rating || 0,
      education: education || '',
      certifications: certifications || [],
      achievements: achievements || [],
      location: location || 'Phnom Penh',
      is_active: true,
      created_at: now,
      updated_at: now,
    }

    upsertAgent(newAgent)

    return NextResponse.json(
      {
        ...newAgent,
        agentId: newAgent.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    )
  }
}
