import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Users, Award, TrendingUp, MapPin, Phone, Mail } from 'lucide-react'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

export const metadata = {
  title: `About - ${siteConfig.companyName}`,
  description: `Learn about ${siteConfig.companyName} and how we help clients find the right home faster.`,
}

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in honest communication and transparent dealings with all our clients, building long-lasting relationships based on trust."
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description: "Our clients' needs and satisfaction are at the heart of everything we do. We listen, understand, and deliver personalized solutions."
  },
  {
    icon: Award,
    title: "Excellence & Quality",
    description: "We maintain the highest standards of service quality and continuously strive for excellence in all our real estate services."
  },
  {
    icon: TrendingUp,
    title: "Innovation & Growth",
    description: "We embrace innovation and stay ahead of market trends to provide cutting-edge solutions and maximize our clients' investments."
  }
]

const milestones = [
  {
    year: "2014",
    title: "Company Founded",
    description: "VSTV Agent was established with a vision to revolutionize real estate services in Cambodia."
  },
  {
    year: "2016",
    title: "Team Expansion",
    description: "Grew our team to 10+ experienced agents and opened our main office in Phnom Penh."
  },
  {
    year: "2018",
    title: "500+ Properties Sold",
    description: "Reached a major milestone of helping 500+ clients find their dream properties."
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched our online platform and mobile app to enhance client experience."
  },
  {
    year: "2022",
    title: "1000+ Happy Clients",
    description: "Celebrated serving over 1000 satisfied clients across Cambodia."
  },
  {
    year: "2024",
    title: "Market Leadership",
    description: "Established as one of Cambodia's leading real estate agencies with 1000+ properties sold."
  }
]

const teamStats = [
  { number: "10+", label: "Years of Experience" },
  { number: "1000+", label: "Properties Sold" },
  { number: "500+", label: "Happy Clients" },
  { number: "15+", label: "Expert Agents" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              About VSTV Agent
            </h1>
            <p className="mt-3 text-base leading-7 text-gray-600 sm:mt-4 sm:text-lg sm:leading-8">
              Your trusted partner in Cambodia's real estate market
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Company Story */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
                Our Story
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                <p>
                  Founded in 2014, VSTV Agent (CAMBODIA) CO., LTD has grown from a small real estate agency to one of Cambodia's most trusted property consultants. Our journey began with a simple mission: to help people find their perfect homes and make smart real estate investments.
                </p>
                <p>
                  Over the years, we have built a reputation for excellence, integrity, and personalized service. Our team of experienced agents understands the unique needs of both local and international clients, providing expert guidance through every step of the property journey.
                </p>
                <p>
                  Today, we are proud to have helped over 1000 clients find their dream properties and have facilitated the sale of more than 1000 properties across Cambodia. Our commitment to quality and client satisfaction continues to drive our growth and success.
                </p>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <Image
                src="/images/company/VSTV.png"
                alt="VSTV Agent Office"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional real estate services that help our clients achieve their property goals while maintaining the highest standards of integrity, professionalism, and customer satisfaction. We strive to be the most trusted real estate partner in Cambodia.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To be Cambodia's leading real estate agency, recognized for our innovation, expertise, and commitment to excellence. We envision a future where every property transaction is seamless, transparent, and beneficial for all parties involved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="mb-24 bg-blue-600 rounded-2xl">
          <div className="px-6 py-16 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our Impact by Numbers
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                A decade of excellence in Cambodian real estate
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Journey
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Key milestones in our company's growth
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-24">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit Our Office</h3>
                  <p className="text-sm text-gray-600">
                    TV‑Tower 1, Floor 7th, Room 706C<br />
                    Street/Road No. 32 St. Lu Uy, 13<br />
                    Kroal Kor Village, Sangkat Kilometre 6<br />
                    Khan Russei Keo, Phnom Penh, Cambodia
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-sm text-gray-600">
                    <a href={getCallHref()} className="font-semibold text-gray-900 hover:underline">
                      {siteConfig.phoneNumber}
                    </a>
                    <br />
                    {siteConfig.business.officeHours ?? 'Message anytime on Telegram'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-sm text-gray-600">
                    vstvacc@gmail.com<br />
                    We respond within 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl">
          <div className="px-6 py-16 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Work with Us?
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                Let us help you find your dream property or maximize your real estate investment
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact Us Today
                  </Link>
                </Button>
                {siteConfig.featureFlags.listings ? (
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                    <Link href="/properties">
                      Browse Properties
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                    <Link href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}>
                      Message on Telegram
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

