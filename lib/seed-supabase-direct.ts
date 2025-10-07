// Simple script to add data directly to Supabase
// Run this with: npm run db:seed:supabase-direct

const SUPABASE_URL = 'https://stofwehocrbkrjphogiy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0b2Z3ZWhvY3Jia3JqcGhvZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI4MDAsImV4cCI6MjA1MDU0ODgwMH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'

async function seedSupabase() {
  console.log('🌱 Starting Supabase direct seeding...')

  try {
    // 1. Add Services
    console.log('Adding services...')
    const servicesResponse = await fetch(`${SUPABASE_URL}/rest/v1/services`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify([
        {
          id: 'service-1',
          title: 'Property Sales',
          description: 'Find your dream home with our extensive collection of properties for sale across Cambodia.',
          icon: 'Home',
          features: ['Luxury condos and apartments', 'Family houses and villas', 'Commercial properties', 'Land and development plots', 'Investment opportunities'],
          is_active: true
        },
        {
          id: 'service-2',
          title: 'Property Rental',
          description: 'Discover comfortable rental properties that suit your lifestyle and budget.',
          icon: 'Building',
          features: ['Furnished and unfurnished options', 'Short-term and long-term rentals', 'Student accommodations', 'Corporate housing', 'Luxury rentals'],
          is_active: true
        }
      ])
    })

    if (servicesResponse.ok) {
      console.log('✅ Services added successfully')
    } else {
      console.log('⚠️ Services may already exist or failed to add')
    }

    // 2. Add Agents
    console.log('Adding agents...')
    const agentsResponse = await fetch(`${SUPABASE_URL}/rest/v1/agents`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify([
        {
          id: 'agent-1',
          agent_id: '004',
          name: 'HENG KIMHONG',
          role: 'Real Estate Agent Supervisor',
          email: 'hengkimhong1803@email.com',
          phone: '+855 96 4444 027',
          bio: 'With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities.',
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
          bio: 'Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market.',
          avatar: '/images/agents/vin-solyvay.html',
          specialties: ['Residential Properties', 'First-time Buyers', 'Market Analysis', 'Client Relations'],
          languages: ['English', 'Khmer'],
          experience: 5,
          properties_sold: 85,
          rating: 4.8,
          is_active: true
        }
      ])
    })

    if (agentsResponse.ok) {
      console.log('✅ Agents added successfully')
    } else {
      console.log('⚠️ Agents may already exist or failed to add')
    }

    // 3. Add Properties
    console.log('Adding properties...')
    const propertiesResponse = await fetch(`${SUPABASE_URL}/rest/v1/properties`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify([
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
          images: ['/images/properties/featured/luxury-condo-bkk1.jpg'],
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
          images: ['/images/properties/featured/modern-apartment-toul-kork.jpg'],
          features: ['Balcony', 'Security', 'WiFi'],
          is_featured: true,
          is_available: true,
          agent_id: 'agent-2'
        }
      ])
    })

    if (propertiesResponse.ok) {
      console.log('✅ Properties added successfully')
    } else {
      console.log('⚠️ Properties may already exist or failed to add')
    }

    console.log('🎉 Supabase seeding completed!')
    console.log('📊 Check your Supabase dashboard to see the data')

  } catch (error) {
    console.error('❌ Error seeding Supabase:', error)
  }
}

seedSupabase()
