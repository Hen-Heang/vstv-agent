import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    const featuredProperties = await prisma.property.findMany({
      where: {
        isFeatured: true,
        isAvailable: true
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            phone: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6 // Limit to 6 featured properties
    })

    return NextResponse.json(featuredProperties)
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured properties' },
      { status: 500 }
    )
  }
}
