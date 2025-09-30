import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const unit = await prisma.unit.findUnique({
      where: { id }
    })

    if (!unit) {
      return NextResponse.json(
        { error: 'Unit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(unit)
  } catch (error) {
    console.error('Error fetching unit:', error)
    return NextResponse.json(
      { error: 'Failed to fetch unit' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { unitNo, price, roomType, handleBy, remarks, status } = body

    // Validate required fields
    if (!unitNo || !price || !roomType || !handleBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const unit = await prisma.unit.update({
      where: { id },
      data: {
        unitNo,
        price: parseFloat(price),
        roomType,
        handleBy,
        remarks: remarks || null,
        status: status || 'available'
      }
    })

    return NextResponse.json(unit)
  } catch (error) {
    console.error('Error updating unit:', error)
    return NextResponse.json(
      { error: 'Failed to update unit' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.unit.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Unit deleted successfully' })
  } catch (error) {
    console.error('Error deleting unit:', error)
    return NextResponse.json(
      { error: 'Failed to delete unit' },
      { status: 500 }
    )
  }
}
