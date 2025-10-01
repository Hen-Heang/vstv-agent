import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not configured, returning demo data')
      const demoUnits = [
        {
          id: 'demo-1',
          unitNo: 'ANATA/1212B',
          price: 1200,
          roomType: 'Studio Room',
          handleBy: 'Rita',
          remarks: 'Floor 5',
          status: 'available',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'demo-2',
          unitNo: 'Morgan/3317',
          price: 1500,
          roomType: 'One bedroom',
          handleBy: 'KA',
          remarks: 'Available 18.08.2025',
          status: 'available',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'demo-3',
          unitNo: 'Sale006/001',
          price: 2000,
          roomType: 'Two bedroom',
          handleBy: 'Sale006 VSTV',
          remarks: 'Negotiate',
          status: 'negotiate',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      return NextResponse.json(demoUnits)
    }

    const units = await prisma.unit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Convert Decimal to number for JSON serialization
    const serializedUnits = units.map(unit => ({
      ...unit,
      price: Number(unit.price)
    }))
    
    return NextResponse.json(serializedUnits)
  } catch (error) {
    console.error('Error fetching units:', error)
    
    // If it's a database connection error, return demo data
    if (error instanceof Error && error.message.includes('DATABASE_URL')) {
      console.log('Database connection error, returning demo data')
      const demoUnits = [
        {
          id: 'demo-1',
          unitNo: 'ANATA/1212B',
          price: 1200,
          roomType: 'Studio Room',
          handleBy: 'Rita',
          remarks: 'Floor 5',
          status: 'available',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'demo-2',
          unitNo: 'Morgan/3317',
          price: 1500,
          roomType: 'One bedroom',
          handleBy: 'KA',
          remarks: 'Available 18.08.2025',
          status: 'available',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'demo-3',
          unitNo: 'Sale006/001',
          price: 2000,
          roomType: 'Two bedroom',
          handleBy: 'Sale006 VSTV',
          remarks: 'Negotiate',
          status: 'negotiate',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      return NextResponse.json(demoUnits)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch units' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not configured. Please set up DATABASE_URL environment variable.' },
        { status: 503 }
      )
    }

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

    // Convert Decimal to number for JSON serialization
    const serializedUnit = {
      ...unit,
      price: Number(unit.price)
    }

    return NextResponse.json(serializedUnit, { status: 201 })
  } catch (error) {
    console.error('Error creating unit:', error)
    return NextResponse.json(
      { error: 'Failed to create unit' },
      { status: 500 }
    )
  }
}
