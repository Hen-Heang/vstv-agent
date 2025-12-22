import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Award, Calendar, Star } from 'lucide-react'
import AgentDetailActions from '@/components/agents/agent-detail-actions'
import { Icons } from '@/components/shared/icons'
import { getAgentById } from '@/lib/static-store'
import type { Agent } from '@/types/agent'
import { toMailtoHref, toTelegramHref, toTelHref } from '@/utils/contact-links'
import { siteConfig } from '@/config/site'

const siteTelegramHandle = (() => {
  try {
    const url = new URL(siteConfig.telegramUrl)
    return url.pathname.replace(/^\/+/, '').trim()
  } catch {
    return ''
  }
})()

const fallbackAgents = {

  "007": {
    id: "007",
    name: "OEURN CHET",
    position: "Real Estate Agent Supervisor",
    email: "chetvstv@gmail.com",
    phone: siteConfig.phoneNumber,
    telegram: siteTelegramHandle,
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Oeurn Chet serves as a Real Estate Agent Supervisor, combining leadership skills with extensive property market knowledge. His supervisory role allows him to guide both clients and team members toward successful property transactions.",
    experience_years: 9,
    specialties: ["Team Leadership", "Luxury Properties", "Investment Consulting", "Client Management"],
    languages: ["English", "Khmer", "Chinese"],
    properties_sold: 160,
    rating: 4.9,
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "Leadership Certified"],
    achievements: ["Supervisory Excellence 2023", "Team Leadership Award 2022", "Sales Excellence Award 2021"],
    created_at: "2015-11-25T00:00:00Z"
  }
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

export async function generateMetadata({ params }: AgentDetailPageProps) {
  const { id } = await params
  
  const agent = getAgentById(id) || fallbackAgents[id as keyof typeof fallbackAgents] 
  
  return {
    title: `${agent.name} - VSTV Agent`,
    description: agent.bio || `Meet ${agent.name}, a ${agent.position} at VSTV Agent.`,
  }
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { id } = await params
  
  const agent: Agent | null = getAgentById(id)

  if (!agent || !agent.is_active) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
          <p className="text-gray-600 mb-8">The agent you're looking for doesn't exist or has been removed.</p>
          <Link href="/agents" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Agents
          </Link>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
          <p className="text-gray-600 mb-8">The agent you're looking for doesn't exist or has been removed.</p>
          <Link href="/agents" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Agents
          </Link>
        </div>
      </div>
    )
  }

  const telHref = toTelHref(agent.phone)
  const telegramHref = toTelegramHref(agent.telegram)
  const mailtoHref = toMailtoHref(agent.email)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 sm:space-x-4 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-1 sm:mx-2">/</span>
                  <Link href="/agents" className="text-gray-400 hover:text-gray-500">
                    Agents
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-1 sm:mx-2">/</span>
                  <span className="text-gray-900 font-medium truncate">{agent.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 lg:px-8">
        <AgentDetailActions agent={agent} />
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Agent Profile */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <Image
                    src={agent.avatar_url}
                    alt={agent.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {agent.name}
                    </CardTitle>
                    <p className="text-lg sm:text-xl text-blue-600 font-medium mb-2">{agent.position}</p>
                    <p className="text-sm text-gray-600 mb-4">Agent ID: {agent.id}</p>
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-center mb-4 space-y-2 sm:space-y-0">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                              i < Math.floor(agent.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-xs sm:text-sm text-gray-600">
                          {agent.rating} ({agent.properties_sold} properties sold)
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start text-gray-600">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      <span className="text-sm sm:text-base">Phnom Penh</span>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{agent.experience_years} years in real estate</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Joined VSTV Agent in {agent.created_at ? new Date(agent.created_at).getFullYear() : '2016'}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{agent.properties_sold} properties sold</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Education & Certifications</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{agent.education || 'Not specified'}</p>
                      {agent.certifications && agent.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start">
                          <Award className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {agent.specialties && agent.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base text-gray-700">{specialty}</span>
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
                  {agent.achievements && agent.achievements.map((achievement, index) => (
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

            {siteConfig.featureFlags.listings ? (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockProperties.map((property) => (
                      <Link key={property.id} href={`/properties/${property.id}`} className="group block">
                        <div className="relative h-40 sm:h-48 mb-3">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {property.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">{property.location}</p>
                        <p className="text-xs sm:text-sm font-medium text-blue-600">
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
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Listings are available via Telegram. Send your budget + area and we’ll share options.
                  </p>
                </CardContent>
              </Card>
            )}
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
                      <a href={telHref} className="text-sm text-blue-600 hover:underline break-words">
                        {agent.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icons.Telegram className="h-5 w-5 text-[#229ED9]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Telegram</p>
                      <a href={telegramHref} className="text-sm text-blue-600 hover:underline break-words">
                        {agent.telegram}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a href={mailtoHref} className="text-sm text-blue-600 hover:underline break-words">
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full">
                    <a href={telHref} className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-[#229ED9]/30 text-[#229ED9] hover:bg-[#229ED9]/10 hover:text-[#1d8abf]"
                  >
                    <a href={telegramHref} className="flex items-center justify-center">
                      <Icons.Telegram className="h-4 w-4 mr-2" />
                      Telegram
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <a href={mailtoHref} className="flex items-center justify-center">
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
                  {agent.languages && agent.languages.map((language, index) => (
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
