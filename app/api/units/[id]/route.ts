import { NextRequest, NextResponse } from 'next/server'
import { deleteUnit, getUnitById, updateUnit } from '@/lib/static-store'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const unit = getUnitById(id)

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

    const unit = updateUnit(id, {
      unitNo,
      price: typeof price === 'number' ? price : parseFloat(price),
      roomType,
      handleBy,
      remarks: remarks || null,
      status: status || 'available',
    })

    if (!unit) {
      return NextResponse.json({ error: 'Unit not found' }, { status: 404 })
    }

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

    const deleted = deleteUnit(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Unit not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Unit deleted successfully' })
  } catch (error) {
    console.error('Error deleting unit:', error)
    return NextResponse.json(
      { error: 'Failed to delete unit' },
      { status: 500 }
    )
  }
}
