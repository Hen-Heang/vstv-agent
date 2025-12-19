import { NextRequest, NextResponse } from 'next/server'
import { createUnit, listUnits } from '@/lib/static-store'

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
  try {
    const body = await request.json()
    const { unitNo, price, roomType, handleBy, remarks, status } = body

    // Validate required fields
    if (!unitNo || !price || !roomType || !handleBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const unit = createUnit({
      unitNo,
      price: typeof price === 'number' ? price : parseFloat(price),
      roomType,
      handleBy,
      remarks: remarks || null,
      status: status || 'available',
      isActive: true,
    })

    return NextResponse.json(unit, { status: 201 })
  } catch (error) {
    console.error('Error creating unit:', error)
    return NextResponse.json(
      { error: 'Failed to create unit' },
      { status: 500 }
    )
  }
}
