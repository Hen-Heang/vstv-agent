import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        agentId: true,
        name: true,
        role: true,
        email: true,
        phone: true,
        avatar: true,
        specialties: true,
        languages: true,
        experience: true,
        rating: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(agents)
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}