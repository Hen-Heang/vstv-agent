import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Building, Users, Award, TrendingUp } from 'lucide-react'

const companyStats = [
  {
    icon: Building,
    title: "Properties Managed",
    value: "1000+",
    description: "Successfully sold and rented properties across Cambodia"
  },
  {
    icon: Users,
    title: "Happy Clients",
    value: "500+",
    description: "Satisfied customers who trust our services"
  },
  {
    icon: Award,
    title: "Years of Experience",
    value: "10+",
    description: "Dedicated service in the Cambodian real estate market"
  },
  {
    icon: TrendingUp,
    title: "Market Growth",
    value: "25%",
    description: "Annual growth in property transactions"
  }
]

export default function CompanyShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Company Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-16 rounded-lg overflow-hidden shadow-lg bg-white p-2">
              <Image
                src="/images/company/VSTV.png"
                alt="VSTV Agent Logo"
                width={80}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            VSTV AGENT (CAMBODIA) CO., LTD
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted real estate partner in Cambodia. We specialize in helping clients find their dream properties with expert guidance and personalized service.
          </p>
        </div>

        {/* Company Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image
                src="/images/company/CSTV-Cover-24-06-25.jpg"
                alt="VSTV Agent Company"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Professional Real Estate Services</h3>
                <p className="text-lg opacity-90">Serving Cambodia with excellence since 2014</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold-100 mb-4">
                  <stat.icon className="h-8 w-8 text-brand-red-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h4>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Values */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Commitment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Properties</h4>
              <p className="text-gray-600">We carefully select and verify every property to ensure the highest standards.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Trusted Service</h4>
              <p className="text-gray-600">Building long-term relationships through honest and transparent dealings.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Market Expertise</h4>
              <p className="text-gray-600">Deep knowledge of the Cambodian real estate market and trends.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

