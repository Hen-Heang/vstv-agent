import { NextRequest, NextResponse } from 'next/server'
import { listUnits } from '@/lib/static-store'

export async function GET() {
  try {
    return NextResponse.json(listUnits())
  } catch (error) {
    console.error('Error fetching units:', error)
    return NextResponse.json(
      { error: 'Failed to fetch units' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'This API is read-only. Use the admin pages which save to localStorage.' },
    { status: 405 }
  )
}
