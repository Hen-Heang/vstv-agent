import { NextResponse } from 'next/server'
import { listAvailableProperties } from '@/lib/static-store'

export async function GET() {
  try {
    const featured = listAvailableProperties()
      .filter((property) => property.isFeatured)
      .slice(0, 6)

    return NextResponse.json(featured)
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured properties' },
      { status: 500 }
    )
  }
}
