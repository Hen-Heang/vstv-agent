import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Fallback agents data for when database is not available
const fallbackAgents = [
  {
    id: "004",
    name: "HENG KIMHONG",
    position: "Real Estate Agent Supervisor",
    email: "hengkimhong1803@email.com",
    phone: "+855 96 4444 027",
    telegram: "0889832306",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.",
    experience_years: 8,
    specialties: ["Luxury Properties", "Investment Consulting", "Property Management", "Team Leadership"],
    languages: ["English", "Khmer", "Chinese"],
    properties_sold: 180,
    rating: 4.9
  },
  {
    id: "003",
    name: "VIN SOLYVAY",
    position: "Real Estate Agent",
    email: "vinsolyvay@gmail.com",
    phone: "+855 98 261 801",
    telegram: "098261801",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.",
    experience_years: 5,
    specialties: ["Residential Properties", "First-time Buyers", "Market Analysis", "Client Relations"],
    languages: ["English", "Khmer"],
    properties_sold: 85,
    rating: 4.8
  },
  {
    id: "008",
    name: "HENG RITA",
    position: "Senior Real Estate Agent",
    email: "rytavsv168@gmail.com",
    phone: "+855 98 261 808",
    telegram: "098261808",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Heng Rita is a senior real estate professional with deep knowledge of the Cambodian property market. She specializes in luxury residential properties and has built strong relationships with both local and international clients.",
    experience_years: 7,
    specialties: ["Luxury Residential", "International Clients", "Property Investment", "Market Trends"],
    languages: ["English", "Khmer", "Chinese"],
    properties_sold: 120,
    rating: 4.9
  },
  {
    id: "009",
    name: "PENG HOUNANG",
    position: "Real Estate Agent Manager",
    email: "Penghounang111@gmail.com",
    phone: "+855 93 76 51 11",
    telegram: "093765111",
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Peng Hounang serves as a Real Estate Agent Manager, bringing strategic leadership and extensive market knowledge to the team. His management experience combined with deep property expertise makes him an invaluable asset to both clients and colleagues.",
    experience_years: 10,
    specialties: ["Strategic Planning", "Team Management", "Commercial Properties", "Investment Analysis"],
    languages: ["English", "Khmer", "Chinese"],
    properties_sold: 200,
    rating: 4.9
  },
  {
    id: "0010",
    name: "NHEM SAMI",
    position: "Real Estate Agent",
    email: "nhemsami@gmail.com",
    phone: "+855 10 773 523",
    telegram: "010773523",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Nhem Sami is a dedicated real estate professional committed to helping clients find their perfect property. With a focus on residential properties and excellent customer service, he ensures every client receives personalized attention.",
    experience_years: 4,
    specialties: ["Residential Properties", "Customer Service", "Property Tours", "Market Research"],
    languages: ["English", "Khmer"],
    properties_sold: 65,
    rating: 4.7
  },
  {
    id: "005",
    name: "KHUN SINDIKA",
    position: "Real Estate Agent",
    email: "khunsingdika@gmail.com",
    phone: "+855 96 616 1180",
    telegram: "0966161180",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Khun Sindika is a professional real estate agent with a passion for helping clients navigate the property market. Her attention to detail and commitment to excellence make her a trusted advisor for property transactions.",
    experience_years: 6,
    specialties: ["Residential Properties", "Property Valuation", "Client Relations", "Market Analysis"],
    languages: ["English", "Khmer"],
    properties_sold: 95,
    rating: 4.8
  },
  {
    id: "007",
    name: "OEURN CHET",
    position: "Real Estate Agent Supervisor",
    email: "chetvstv@gmail.com",
    phone: "+855 98 261 807",
    telegram: "098261807",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Oeurn Chet serves as a Real Estate Agent Supervisor, combining leadership skills with extensive property market knowledge. His supervisory role allows him to guide both clients and team members toward successful property transactions.",
    experience_years: 9,
    specialties: ["Team Leadership", "Luxury Properties", "Investment Consulting", "Client Management"],
    languages: ["English", "Khmer", "Chinese"],
    properties_sold: 160,
    rating: 4.9
  }
]

export const metadata = {
  title: 'Our Agents - VSTV Agent',
  description: 'Meet our experienced real estate agents who can help you find your perfect property in Cambodia',
}


export default async function AgentsPage() {
  let agents = fallbackAgents
  
  try {
    const { data: agentsData, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true })
    
    if (!error && agentsData) {
      agents = agentsData
    }
  } catch (error) {
    console.error('Error fetching agents:', error)
    // Use fallback data
  }

  // Sort agents by position hierarchy
  const positionOrder = {
    'Real Estate Agent Manager': 1,
    'Real Estate Agent Supervisor': 2,
    'Senior Real Estate Agent': 3,
    'Real Estate Agent': 4
  }

  agents.sort((a, b) => {
    const aOrder = positionOrder[a.position as keyof typeof positionOrder] || 5
    const bOrder = positionOrder[b.position as keyof typeof positionOrder] || 5
    return aOrder - bOrder
  })
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Agents
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Meet our experienced real estate professionals who are here to help you
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Agents Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg">
              {/* Agent Image Header */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={agent.avatar_url}
                        alt={agent.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 text-white">
                      <h3 className="font-bold text-lg">{agent.name}</h3>
                      <p className="text-blue-100 text-sm">{agent.position}</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">{agent.rating}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{agent.properties_sold}</div>
                    <div className="text-xs text-gray-500">Properties Sold</div>
                  </div>
                </div>
                
                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{agent.bio}</p>
                
                {/* Experience and Location */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{agent.experience_years}</div>
                    <div className="text-xs text-gray-500">Years Experience</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center text-blue-600 mb-1">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="text-xs text-gray-500">Phnom Penh</div>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {agent.specialties.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{agent.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href={`/agents/${agent.id}`}>
                      View Full Profile
                    </Link>
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-50">
                      <a href={`tel:${agent.phone}`} className="flex items-center justify-center">
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-50">
                      <a href={`https://t.me/${agent.telegram}`} className="flex items-center justify-center">
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-50">
                      <a href={`mailto:${agent.email}`} className="flex items-center justify-center">
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-24 bg-white rounded-2xl shadow-sm">
          <div className="px-6 py-16 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Team by Numbers
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Experience and results that speak for themselves
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">49+</div>
                <div className="text-sm text-gray-600">Years Combined Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">905+</div>
                <div className="text-sm text-gray-600">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">700+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-blue-600 rounded-2xl">
          <div className="px-6 py-16 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Work with Our Team?
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                Contact any of our agents today to start your property journey
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <Link href="/properties">
                    Browse Properties
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

