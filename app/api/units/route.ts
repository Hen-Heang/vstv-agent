import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    const units = await prisma.unit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(units)
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

    const unit = await prisma.unit.create({
      data: {
        unitNo,
        price: parseFloat(price),
        roomType,
        handleBy,
        remarks: remarks || null,
        status: status || 'available'
      }
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
