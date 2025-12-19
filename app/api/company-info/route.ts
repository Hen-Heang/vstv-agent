import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const demoCompanyInfo = {
      id: 'demo-1',
      name: 'VSTV Real Estate',
      description: 'Leading real estate agency in Phnom Penh, Cambodia',
      logo: '/images/company/VSTV.png',
      backgroundImage: '/images/company/VSTV-BG.png',
      mission: 'To help our clients find their perfect home and make their real estate dreams come true',
      vision: 'To be the most trusted and successful real estate agency in Cambodia',
      values: ['Integrity', 'Excellence', 'Customer Focus', 'Innovation'],
      address:
        'Tower 1, Floor 7, Room 706C, Street/Road No. 32 St. Lu Uy, 13, Kroal Kor Village, Sangkat Kilometre 6, Khan Russei Keo, Phnom Penh, Cambodia',
      phone: '+855 23 123 456',
      email: 'info@vstv.com',
      website: 'https://vstv.com',
      socialMedia: {
        facebook: 'https://www.facebook.com/share/1BL2cw4au3/?mibextid=wwXIfr',
        instagram: 'https://instagram.com/vstv',
        linkedin: 'https://linkedin.com/company/vstv',
      },
      stats: {
        propertiesSold: 500,
        happyClients: 1000,
        yearsExperience: 10,
        teamMembers: 25,
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(demoCompanyInfo)
  } catch (error) {
    console.error('Error fetching company info:', error)
    return NextResponse.json({ error: 'Failed to fetch company information' }, { status: 500 })
  }
}

