import { NextResponse } from 'next/server'
import { listAvailableProperties } from '@/lib/static-store'

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

export async function POST() {
  return NextResponse.json(
    { error: 'This API is read-only. Use the admin pages which save to localStorage.' },
    { status: 405 }
  )
}
