import AnimatedHeroSection from '@/components/home/animated-hero-section'
import FeaturedListings from '@/components/home/featured-listings'
import CompanyShowcase from '@/components/home/company-showcase'
import WhyChooseUs from '@/components/home/why-choose-us'
import ScheduleVisit from '@/components/home/schedule-visit'

export default function Home() {
  return (
    <>
      <AnimatedHeroSection />
      <FeaturedListings />
      <CompanyShowcase />
      <WhyChooseUs />
      <ScheduleVisit />
    </>
  )
}

