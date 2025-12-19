import { NextResponse } from 'next/server'
import { listActiveHeroSlides } from '@/lib/static-store'

export async function GET() {
  try {
    return NextResponse.json(listActiveHeroSlides())
  } catch (error) {
    console.error('Error fetching hero slides:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero slides' },
      { status: 500 }
    )
  }
}
