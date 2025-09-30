// import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Mail, MapPin, Award, Calendar, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Fallback agent data for when database is not available
const fallbackAgent = {
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
  rating: 4.9,
  education: "Bachelor's in Business Administration",
  certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "Team Management Certified"],
  achievements: ["Top Performer 2023", "Team Leadership Award 2022", "Sales Excellence Award 2021"],
  created_at: "2016-03-15T00:00:00Z"
}


const mockProperties = [
  {
    id: 1,
    title: "Luxury Condo in BKK1",
    price: 1200,
    priceType: "rent",
    location: "BKK1, Phnom Penh",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Premium Villa for Sale",
    price: 250000,
    priceType: "sale",
    location: "Sen Sok, Phnom Penh",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Modern Apartment in Toul Kork",
    price: 800,
    priceType: "rent",
    location: "Toul Kork, Phnom Penh",
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
]

const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Investor",
    content: "John helped me find the perfect investment property. His market knowledge and professional service exceeded my expectations. I highly recommend him to anyone looking to invest in Cambodian real estate.",
    rating: 5,
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Expat Resident",
    content: "As a newcomer to Cambodia, I was overwhelmed by the property market. John guided me through every step of the process and made it stress-free. He's truly a professional.",
    rating: 5,
    date: "2024-02-20"
  }
]

interface AgentDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ }: AgentDetailPageProps) {
  // For now, always use fallback data for metadata to avoid TypeScript issues
  // This will be updated when the database is properly configured
  return {
    title: `${fallbackAgent.name} - VSTV Agent`,
    description: fallbackAgent.bio || `Meet ${fallbackAgent.name}, a ${fallbackAgent.position} at VSTV Agent.`,
  }
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { id } = await params
  
  let agent = fallbackAgent
  
  try {
    const { data: agentData, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()
    
    if (!error && agentData) {
      agent = agentData
    }
  } catch (error) {
    console.error('Error fetching agent:', error)
    // Use fallback data
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <Link href="/agents" className="text-gray-400 hover:text-gray-500">
                    Agents
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-900 font-medium">{agent.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Agent Profile */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-start space-x-6">
                  <Image
                    src={agent.avatar_url}
                    alt={agent.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {agent.name}
                    </CardTitle>
                    <p className="text-xl text-blue-600 font-medium mb-2">{agent.position}</p>
                    <p className="text-sm text-gray-600 mb-4">Agent ID: {agent.id}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(agent.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {agent.rating} ({agent.properties_sold} properties sold)
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>Phnom Penh</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">{agent.bio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Experience & Qualifications */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Experience & Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600">{agent.experience_years} years in real estate</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600">Joined VSTV Agent in {new Date(agent.created_at).getFullYear()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600">{agent.properties_sold} properties sold</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Education & Certifications</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{agent.education}</p>
                      {agent.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center">
                          <Award className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-600">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agent.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agent.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Client Testimonials */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Client Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-l-4 border-blue-600 pl-4">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-3">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role} • {new Date(testimonial.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockProperties.map((property) => (
                    <Link key={property.id} href={`/properties/${property.id}`} className="group">
                      <div className="relative h-48 mb-3">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {property.title}
                      </h4>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <p className="text-sm font-medium text-blue-600">
                        {property.priceType === 'rent' ? `$${property.price}/month` : `$${property.price.toLocaleString()}`}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/properties">
                      View All Properties
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a href={`tel:${agent.phone}`} className="text-sm text-blue-600 hover:underline">
                        {agent.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Telegram</p>
                      <a href={`https://t.me/${agent.telegram}`} className="text-sm text-blue-600 hover:underline">
                        {agent.telegram}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a href={`mailto:${agent.email}`} className="text-sm text-blue-600 hover:underline">
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full">
                    <a href={`tel:${agent.phone}`} className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <a href={`https://t.me/${agent.telegram}`} className="flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Telegram
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <a href={`mailto:${agent.email}`} className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
