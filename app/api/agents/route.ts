import { NextRequest, NextResponse } from 'next/server'
import { listActiveAgents } from '@/lib/static-store'

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
  return NextResponse.json(
    { error: 'This API is read-only. Agent data is static.' },
    { status: 405 }
  )
}
