import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not configured, returning demo data')
      const demoCompanyInfo = {
        id: 'demo-1',
        name: 'VSTV Real Estate',
        description: 'Leading real estate agency in Phnom Penh, Cambodia',
        logo: '/images/company/VSTV.png',
        backgroundImage: '/images/company/VSTV-BG.png',
        mission: 'To help our clients find their perfect home and make their real estate dreams come true',
        vision: 'To be the most trusted and successful real estate agency in Cambodia',
        values: ['Integrity', 'Excellence', 'Customer Focus', 'Innovation'],
        address: 'TV‑Tower 1, Floor 7th, Room 706C, Street/Road No. 32 St. Lu Uy, 13, Kroal Kor Village, Sangkat Kilometre 6, Khan Russei Keo, Phnom Penh, Cambodia',
        phone: '+855 23 123 456',
        email: 'info@vstv.com',
        website: 'https://vstv.com',
        socialMedia: {
          facebook: 'https://www.facebook.com/share/1BL2cw4au3/?mibextid=wwXIfr',
          instagram: 'https://instagram.com/vstv',
          linkedin: 'https://linkedin.com/company/vstv'
        },
        stats: {
          propertiesSold: 500,
          happyClients: 1000,
          yearsExperience: 10,
          teamMembers: 25
        },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return NextResponse.json(demoCompanyInfo)
    }

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
    
    // If it's a database connection error, return demo data
    if (error instanceof Error && error.message.includes('DATABASE_URL')) {
      console.log('Database connection error, returning demo data')
      const demoCompanyInfo = {
        id: 'demo-1',
        name: 'VSTV Real Estate',
        description: 'Leading real estate agency in Phnom Penh, Cambodia',
        logo: '/images/company/VSTV.png',
        backgroundImage: '/images/company/VSTV-BG.png',
        mission: 'To help our clients find their perfect home and make their real estate dreams come true',
        vision: 'To be the most trusted and successful real estate agency in Cambodia',
        values: ['Integrity', 'Excellence', 'Customer Focus', 'Innovation'],
        address: 'TV‑Tower 1, Floor 7th, Room 706C, Street/Road No. 32 St. Lu Uy, 13, Kroal Kor Village, Sangkat Kilometre 6, Khan Russei Keo, Phnom Penh, Cambodia',
        phone: '+855 23 123 456',
        email: 'info@vstv.com',
        website: 'https://vstv.com',
        socialMedia: {
          facebook: 'https://www.facebook.com/share/1BL2cw4au3/?mibextid=wwXIfr',
          instagram: 'https://instagram.com/vstv',
          linkedin: 'https://linkedin.com/company/vstv'
        },
        stats: {
          propertiesSold: 500,
          happyClients: 1000,
          yearsExperience: 10,
          teamMembers: 25
        },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return NextResponse.json(demoCompanyInfo)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch company information' },
      { status: 500 }
    )
  }
}
