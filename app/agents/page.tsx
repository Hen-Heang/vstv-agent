import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Mail, Award, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Our Agents - VSTV Agent',
  description: 'Meet our experienced real estate agents who can help you find your perfect property in Cambodia',
}

const agents = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Real Estate Agent",
    email: "john@vstvagent.com",
    phone: "+855 12 345 6789",
    telegram: "@johndoe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "With over 8 years of experience in the Cambodian real estate market, John specializes in luxury properties and investment opportunities. He has helped hundreds of clients find their dream homes and maximize their investment returns.",
    experience: 8,
    specialties: ["Luxury Properties", "Investment Consulting", "Property Management"],
    languages: ["English", "Khmer", "Chinese"],
    location: "Phnom Penh",
    propertiesSold: 150,
    rating: 4.9
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Real Estate Specialist",
    email: "jane@vstvagent.com",
    phone: "+855 12 345 6788",
    telegram: "@janesmith",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Jane brings 6 years of expertise in residential and commercial properties. She is known for her attention to detail and excellent customer service, making the property buying process smooth and stress-free.",
    experience: 6,
    specialties: ["Residential Sales", "Commercial Properties", "First-time Buyers"],
    languages: ["English", "Khmer", "Thai"],
    location: "Phnom Penh",
    propertiesSold: 120,
    rating: 4.8
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Property Investment Advisor",
    email: "mike@vstvagent.com",
    phone: "+855 12 345 6787",
    telegram: "@mikejohnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Mike is our investment specialist with 10 years of experience in real estate investment and market analysis. He helps clients identify profitable investment opportunities and build successful property portfolios.",
    experience: 10,
    specialties: ["Investment Properties", "Market Analysis", "Portfolio Management"],
    languages: ["English", "Khmer", "Vietnamese"],
    location: "Phnom Penh",
    propertiesSold: 200,
    rating: 4.9
  },
  {
    id: 4,
    name: "Sarah Wilson",
    role: "Rental Specialist",
    email: "sarah@vstvagent.com",
    phone: "+855 12 345 6786",
    telegram: "@sarahwilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Sarah specializes in rental properties and has helped hundreds of expats and locals find their perfect rental home. She understands the unique needs of different tenant types and provides personalized service.",
    experience: 5,
    specialties: ["Rental Properties", "Expat Services", "Property Management"],
    languages: ["English", "Khmer", "French"],
    location: "Phnom Penh",
    propertiesSold: 180,
    rating: 4.7
  }
]

export default function AgentsPage() {
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                    <p className="text-blue-600 font-medium">{agent.role}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
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
                        <span className="ml-2 text-sm text-gray-600">
                          {agent.rating} ({agent.propertiesSold} properties)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{agent.bio}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                    <p className="text-sm text-gray-600">{agent.experience} years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {agent.location}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link href={`/agents/${agent.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${agent.phone}`} className="flex items-center justify-center">
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://t.me/${agent.telegram}`} className="flex items-center justify-center">
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
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
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">29+</div>
                <div className="text-sm text-gray-600">Years Combined Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">650+</div>
                <div className="text-sm text-gray-600">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
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
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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

