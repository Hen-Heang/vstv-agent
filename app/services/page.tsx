import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, Building, Users, TrendingUp, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Our Services - VSTV Agent',
  description: 'Comprehensive real estate services including property sales, rentals, management, and investment consulting',
}

const services = [
  {
    id: 1,
    title: "Property Sales",
    icon: Home,
    description: "Find your dream home with our extensive collection of properties for sale across Cambodia.",
    features: [
      "Luxury condos and apartments",
      "Family houses and villas",
      "Commercial properties",
      "Land and development plots",
      "Investment opportunities"
    ],
    cta: "Browse Properties for Sale",
    href: "/properties?type=sale"
  },
  {
    id: 2,
    title: "Property Rental",
    icon: Building,
    description: "Discover comfortable rental properties that suit your lifestyle and budget.",
    features: [
      "Furnished and unfurnished options",
      "Short-term and long-term rentals",
      "Student accommodations",
      "Corporate housing",
      "Luxury rentals"
    ],
    cta: "Browse Rental Properties",
    href: "/properties?type=rent"
  },
  {
    id: 3,
    title: "Property Management",
    icon: Shield,
    description: "Professional property management services to maximize your investment returns.",
    features: [
      "Tenant screening and placement",
      "Rent collection and accounting",
      "Property maintenance",
      "Legal compliance",
      "Financial reporting"
    ],
    cta: "Learn More",
    href: "/contact"
  },
  {
    id: 4,
    title: "Investment Consulting",
    icon: TrendingUp,
    description: "Expert advice on real estate investments and market opportunities in Cambodia.",
    features: [
      "Market analysis and trends",
      "Investment strategy planning",
      "ROI calculations",
      "Risk assessment",
      "Portfolio diversification"
    ],
    cta: "Get Consultation",
    href: "/contact"
  }
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Investor",
    content: "VSTV Agent helped me find the perfect investment property. Their market knowledge and professional service exceeded my expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Expat Resident",
    content: "As a newcomer to Cambodia, I was overwhelmed by the property market. The team at VSTV Agent guided me through every step.",
    rating: 5
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full">
                  <Link href={service.href}>
                    {service.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Our Services */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We're committed to providing exceptional service and results
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Expert Team</h3>
              <p className="mt-2 text-sm text-gray-600">
                Our experienced agents have deep knowledge of the Cambodian real estate market
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-sm text-gray-600">
                We're always available to answer your questions and provide assistance
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Trusted & Reliable</h3>
              <p className="mt-2 text-sm text-gray-600">
                Licensed and certified professionals with a proven track record
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-blue-600 rounded-2xl">
          <div className="px-6 py-16 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                Contact our team today to discuss your real estate needs
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact an Agent
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

