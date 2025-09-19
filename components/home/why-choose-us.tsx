import { Shield, Users, Clock, Award } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: "Verified Listings",
    description: "All our properties are thoroughly verified and inspected to ensure quality and authenticity."
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Our experienced real estate professionals provide personalized guidance throughout your journey."
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "We respond to all inquiries within 24 hours and provide quick property viewing arrangements."
  },
  {
    icon: Award,
    title: "Years of Experience",
    description: "With over 10 years in the Cambodian real estate market, we understand local trends and opportunities."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We're committed to providing exceptional service and helping you find the perfect property
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <feature.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

