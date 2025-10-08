import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    const { data: heroSlides, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching hero slides:', error)
      return NextResponse.json(
        { error: 'Failed to fetch hero slides from database' },
        { status: 500 }
      )
    }

    return NextResponse.json(heroSlides || [])
  } catch (error) {
    console.error('Error fetching hero slides:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero slides' },
      { status: 500 }
    )
  }
}
