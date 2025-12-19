'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Building, Users, Award, TrendingUp } from 'lucide-react'

interface CompanyInfo {
  id: string
  name: string
  description: string | null
  logo: string | null
  backgroundImage: string | null
  mission: string | null
  vision: string | null
  values: string[]
  address: string | null
  phone: string | null
  email: string | null
  website: string | null
  socialMedia: {
    telegram?: string
    facebook?: string
    instagram?: string
  } | null
  stats: {
    propertiesManaged?: string
    happyClients?: string
    yearsExperience?: string
    marketGrowth?: string
  } | null
}

const companyStatsIcons = {
  propertiesManaged: Building,
  happyClients: Users,
  yearsExperience: Award,
  marketGrowth: TrendingUp
}

export default function CompanyShowcase() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch('/api/company-info')
        if (response.ok) {
          const info = await response.json()
          setCompanyInfo(info)
        } else {
          // Fallback to static company data
          console.log('Using fallback company info')
          setCompanyInfo({
            id: 'company-1',
            name: 'VSTV AGENT (CAMBODIA) CO., LTD',
            description: 'Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.',
            logo: '/images/company/VSTV.png',
            backgroundImage: '/images/company/VSTV-BG.png',
            mission: 'To provide exceptional real estate services that help our clients achieve their property goals while maintaining the highest standards of integrity, professionalism, and customer satisfaction.',
            vision: 'To be Cambodia\'s leading real estate agency, recognized for our innovation, expertise, and commitment to excellence.',
            values: ['Trust & Transparency', 'Client-First Approach', 'Excellence & Quality', 'Innovation & Growth'],
            address: 'Street 123, Building ABC, Phnom Penh, Cambodia',
            phone: '+855 12 345 6789',
            email: 'info@vstvagent.com',
            website: 'https://vstvagent.com',
            socialMedia: {
              telegram: '@vstvagent',
              facebook: 'https://www.facebook.com/share/1BL2cw4au3/?mibextid=wwXIfr',
              instagram: 'https://instagram.com/vstvagent'
            },
            stats: {
              propertiesManaged: '1000+',
              happyClients: '500+',
              yearsExperience: '10+',
              marketGrowth: '25%'
            }
          })
        }
      } catch (error) {
        console.error('Error fetching company info:', error)
        setCompanyInfo({
          id: 'company-1',
          name: 'VSTV AGENT (CAMBODIA) CO., LTD',
          description: 'Your trusted real estate partner in Cambodia.',
          logo: '/images/company/VSTV.png',
          backgroundImage: '/images/company/VSTV-BG.png',
          mission: 'To provide exceptional real estate services.',
          vision: 'To be Cambodia\'s leading real estate agency.',
          values: ['Trust & Transparency', 'Client-First Approach', 'Excellence & Quality'],
          address: 'Street 123, Building ABC, Phnom Penh, Cambodia',
          phone: '+855 12 345 6789',
          email: 'info@vstvagent.com',
          website: 'https://vstvagent.com',
          socialMedia: {
            telegram: '@vstvagent',
            facebook: 'https://facebook.com/vstvagent',
            instagram: 'https://instagram.com/vstvagent'
          },
          stats: {
            propertiesManaged: '1000+',
            happyClients: '500+',
            yearsExperience: '10+',
            marketGrowth: '25%'
          }
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanyInfo()
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading company information...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!companyInfo) {
    return (
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Company information not available.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Company Header */}
        <div className="text-center mb-12 sm:mb-16">
          {companyInfo.logo && (
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden shadow-lg bg-white p-2">
                <Image
                  src={companyInfo.logo}
                  alt={`${companyInfo.name} Logo`}
                  width={80}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-3 sm:mb-4">
            {companyInfo.name}
          </h2>
          {companyInfo.description && (
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              {companyInfo.description}
            </p>
          )}
        </div>

        {/* Company Image */}
        {companyInfo.backgroundImage && (
          <div className="mb-12 sm:mb-16">
            <Card className="overflow-hidden">
              <div className="relative h-48 sm:h-64 md:h-96">
                <Image
                  src={companyInfo.backgroundImage}
                  alt={`${companyInfo.name} Company`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Professional Real Estate Services</h3>
                  <p className="text-sm sm:text-base md:text-lg opacity-90">Serving Cambodia with excellence since 2014</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Company Stats */}
        {companyInfo.stats && (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(companyInfo.stats).map(([key, value], index) => {
              const IconComponent = companyStatsIcons[key as keyof typeof companyStatsIcons]
              const statTitles = {
                propertiesManaged: "Properties Managed",
                happyClients: "Happy Clients", 
                yearsExperience: "Years of Experience",
                marketGrowth: "Market Growth"
              }
              const statDescriptions = {
                propertiesManaged: "Successfully sold and rented properties across Cambodia",
                happyClients: "Satisfied customers who trust our services",
                yearsExperience: "Dedicated service in the Cambodian real estate market", 
                marketGrowth: "Annual growth in property transactions"
              }
              
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-brand-gold-100 mb-3 sm:mb-4">
                      {IconComponent && <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-brand-red-500" />}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{String(value)}</h3>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{statTitles[key as keyof typeof statTitles]}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{statDescriptions[key as keyof typeof statDescriptions]}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Company Values */}
        {companyInfo.values && companyInfo.values.length > 0 && (
          <div className="mt-12 sm:mt-16 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Our Commitment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {companyInfo.values.map((value, index) => {
                const valueIcons = ['🏠', '🤝', '📈']
                const valueDescriptions = [
                  'We carefully select and verify every property to ensure the highest standards.',
                  'Building long-term relationships through honest and transparent dealings.',
                  'Deep knowledge of the Cambodian real estate market and trends.'
                ]
                
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <span className="text-xl sm:text-2xl">{valueIcons[index] || '⭐'}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{value}</h4>
                    <p className="text-sm sm:text-base text-gray-600">{valueDescriptions[index] || 'Our commitment to excellence.'}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

