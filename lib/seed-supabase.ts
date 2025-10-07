import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://stofwehocrbkrjphogiy.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0b2Z3ZWhvY3Jia3JqcGhvZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI4MDAsImV4cCI6MjA1MDU0ODgwMH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  console.log('Starting Supabase database seeding...')

  try {
    // 1. Seed Agents
    console.log('Seeding agents...')
    const agents = [
      {
        id: 'agent-1',
        agent_id: '004',
        name: 'HENG KIMHONG',
        role: 'Real Estate Agent Supervisor',
        email: 'hengkimhong1803@email.com',
        phone: '+855 96 4444 027',
        bio: 'With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.',
        avatar: '/images/agents/heng-kimhong.html',
        specialties: ['Luxury Properties', 'Investment Consulting', 'Property Management', 'Team Leadership'],
        languages: ['English', 'Khmer', 'Chinese'],
        experience: 8,
        properties_sold: 180,
        rating: 4.9,
        is_active: true
      },
      {
        id: 'agent-2',
        agent_id: '003',
        name: 'VIN SOLYVAY',
        role: 'Real Estate Agent',
        email: 'vinsolyvay@gmail.com',
        phone: '+855 98 261 801',
        bio: 'Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.',
        avatar: '/images/agents/vin-solyvay.html',
        specialties: ['Residential Properties', 'First-time Buyers', 'Market Analysis', 'Client Relations'],
        languages: ['English', 'Khmer'],
        experience: 5,
        properties_sold: 85,
        rating: 4.8,
        is_active: true
      },
      {
        id: 'agent-3',
        agent_id: '008',
        name: 'HENG RITA',
        role: 'Real Estate Agent',
        email: 'hengrita@vstvagent.com',
        phone: '+855 12 345 6789',
        bio: 'Heng Rita is a dedicated real estate professional with a passion for helping clients find their perfect home. Her attention to detail and excellent customer service make her a trusted advisor in the Cambodian property market.',
        avatar: '/images/agents/Heng-Rita.jpg',
        specialties: ['Residential Sales', 'Property Rentals', 'Client Relations', 'Market Research'],
        languages: ['English', 'Khmer'],
        experience: 6,
        properties_sold: 120,
        rating: 4.9,
        is_active: true
      }
    ]

    for (const agent of agents) {
      const { error } = await supabase
        .from('agents')
        .upsert(agent, { onConflict: 'id' })
      
      if (error) {
        console.error('Error inserting agent:', error)
      } else {
        console.log(`✅ Agent ${agent.name} inserted successfully`)
      }
    }

    // 2. Seed Services
    console.log('Seeding services...')
    const services = [
      {
        id: 'service-1',
        title: 'Property Sales',
        description: 'Find your dream home with our extensive collection of properties for sale across Cambodia.',
        icon: 'Home',
        features: [
          'Luxury condos and apartments',
          'Family houses and villas',
          'Commercial properties',
          'Land and development plots',
          'Investment opportunities'
        ],
        is_active: true
      },
      {
        id: 'service-2',
        title: 'Property Rental',
        description: 'Discover comfortable rental properties that suit your lifestyle and budget.',
        icon: 'Building',
        features: [
          'Furnished and unfurnished options',
          'Short-term and long-term rentals',
          'Student accommodations',
          'Corporate housing',
          'Luxury rentals'
        ],
        is_active: true
      },
      {
        id: 'service-3',
        title: 'Property Management',
        description: 'Professional property management services to maximize your investment returns.',
        icon: 'Settings',
        features: [
          'Tenant screening and management',
          'Rent collection and accounting',
          'Property maintenance coordination',
          'Legal compliance assistance',
          'Financial reporting'
        ],
        is_active: true
      },
      {
        id: 'service-4',
        title: 'Investment Consulting',
        description: 'Expert guidance for real estate investments in Cambodia\'s growing market.',
        icon: 'TrendingUp',
        features: [
          'Market analysis and trends',
          'Investment opportunity assessment',
          'Risk evaluation',
          'ROI projections',
          'Portfolio diversification advice'
        ],
        is_active: true
      }
    ]

    for (const service of services) {
      const { error } = await supabase
        .from('services')
        .upsert(service, { onConflict: 'id' })
      
      if (error) {
        console.error('Error inserting service:', error)
      } else {
        console.log(`✅ Service ${service.title} inserted successfully`)
      }
    }

    // 3. Seed Properties
    console.log('Seeding properties...')
    const properties = [
      {
        id: 'property-1',
        title: 'Luxury Condo in BKK1',
        description: 'This stunning luxury condo in the heart of BKK1 offers modern living with premium amenities.',
        price: 1200,
        price_type: 'rent',
        property_type: 'condo',
        bedrooms: 2,
        bathrooms: 2,
        area: 85,
        location: 'BKK1, Phnom Penh',
        address: 'Street 123, Building ABC, BKK1, Phnom Penh, Cambodia',
        latitude: 11.5564,
        longitude: 104.9282,
        images: [
          '/images/properties/featured/luxury-condo-bkk1.jpg',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        features: ['Swimming Pool', 'Fitness Center', 'Parking', '24/7 Security'],
        is_featured: true,
        is_available: true,
        agent_id: 'agent-1'
      },
      {
        id: 'property-2',
        title: 'Modern Apartment in Toul Kork',
        description: 'Comfortable and modern apartment in a prime location with excellent amenities.',
        price: 800,
        price_type: 'rent',
        property_type: 'apartment',
        bedrooms: 1,
        bathrooms: 1,
        area: 65,
        location: 'Toul Kork, Phnom Penh',
        address: 'Street 456, Building DEF, Toul Kork, Phnom Penh, Cambodia',
        latitude: 11.5700,
        longitude: 104.8900,
        images: [
          '/images/properties/featured/modern-apartment-toul-kork.jpg',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        features: ['Balcony', 'Security', 'WiFi'],
        is_featured: true,
        is_available: true,
        agent_id: 'agent-2'
      },
      {
        id: 'property-3',
        title: 'Premium Villa for Sale',
        description: 'Exclusive villa in Sen Sok with modern amenities and spacious living areas.',
        price: 250000,
        price_type: 'sale',
        property_type: 'villa',
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        location: 'Sen Sok, Phnom Penh',
        address: 'Street 789, Villa Complex, Sen Sok, Phnom Penh, Cambodia',
        latitude: 11.6000,
        longitude: 104.9000,
        images: [
          '/images/properties/featured/premium-villa-sen-sok.jpg',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        features: ['Garden', 'Garage', 'Pool', 'Security'],
        is_featured: true,
        is_available: true,
        agent_id: 'agent-3'
      }
    ]

    for (const property of properties) {
      const { error } = await supabase
        .from('properties')
        .upsert(property, { onConflict: 'id' })
      
      if (error) {
        console.error('Error inserting property:', error)
      } else {
        console.log(`✅ Property ${property.title} inserted successfully`)
      }
    }

    console.log('🎉 Supabase database seeding completed successfully!')
    console.log('✅ Agents, Services, and Properties have been seeded')
    
  } catch (error) {
    console.error('❌ Error during Supabase seeding:', error)
  }
}

main()
