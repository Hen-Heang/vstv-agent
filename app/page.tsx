import HeroSection from '@/components/home/hero-section'
import PropertySearchSection from '@/components/home/property-search-section'
import FeaturedListings from '@/components/home/featured-listings'
import CompanyShowcase from '@/components/home/company-showcase'
import WhyChooseUs from '@/components/home/why-choose-us'
import ScheduleVisit from '@/components/home/schedule-visit'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PropertySearchSection />
      <FeaturedListings />
      <CompanyShowcase />
      <WhyChooseUs />
      <ScheduleVisit />
    </>
  )
}

