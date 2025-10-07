import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    const companyInfo = await prisma.companyInfo.findFirst({
      where: {
        isActive: true
      }
    })

    if (!companyInfo) {
      return NextResponse.json(
        { error: 'Company information not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(companyInfo)
  } catch (error) {
    console.error('Error fetching company info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company information' },
      { status: 500 }
    )
  }
}
