/**
 * UI/UX notes: Modernized home layout with subtle parallax, richer shadows/gradients,
 * reusable in-view animations, and shimmer image loading while keeping everything static + lightweight.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'
import { Icons } from '@/components/shared/icons'
import FindPropertyQuiz from '@/components/quiz/find-property-quiz'
import AgentCard from '@/components/agents/agent-card'
import MotionInView from '@/components/ui/motion-in-view'
import ShimmerImage from '@/components/ui/shimmer-image'
import CountUp from '@/components/ui/count-up'

const areas = ['BKK1', 'BKK2', 'Toul Kork', 'Sen Sok', 'Boeung Keng Kang', 'Chamkarmon', 'Chroy Changvar', 'Russian Market', 'TTP', 'Diamond Island']
function MotionSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function MarketingHome() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const heroBgY = useTransform(scrollY, [0, 700], [0, 80])
  const heroBgScale = useTransform(scrollY, [0, 700], [1.04, 1.12])
  const social = siteConfig.social
  const showcaseImages = [
    { src: '/images/properties/featured/luxury-condo-bkk1.jpg', label: 'Luxury condo • BKK1' },
    { src: '/images/properties/featured/modern-apartment-toul-kork.jpg', label: 'Modern apartment • Toul Kork' },
    { src: '/images/properties/featured/high-end-condo-river-view.jpg', label: 'River view • Tonle Bassac' },
    { src: '/images/properties/featured/premium-villa-sen-sok.jpg', label: 'Premium villa • Sen Sok' },
    { src: '/images/properties/featured/cozy-studio-city-center.jpg', label: 'Cozy studio • City center' },
    { src: '/images/properties/featured/spacious-family-house.jpg', label: 'Family house • Chroy Changvar' },
  ]

  const followLinks = [
    social.facebook ? { name: 'Facebook', href: social.facebook, icon: Icons.Facebook } : null,
    social.tiktok ? { name: 'TikTok', href: social.tiktok, icon: Icons.MessageCircle } : null,
    social.khmer24 ? { name: 'Khmer24', href: social.khmer24, icon: Icons.MessageSquare } : null,
  ].filter(Boolean) as Array<{ name: string; href: string; icon: React.ComponentType<{ className?: string; size?: number }> }>

  const popularRequests = [
    { area: 'BKK1', budget: '$700-$1,200 / month', type: 'Condo / Apartment', intent: 'Rent' as const },
    { area: 'Toul Kork', budget: '$350-$650 / month', type: 'Apartment', intent: 'Rent' as const },
    { area: 'Sen Sok', budget: '$500-$900 / month', type: 'Condo / Apartment', intent: 'Rent' as const },
    { area: 'Russian Market', budget: '$600-$1,000 / month', type: 'Apartment', intent: 'Rent' as const },
    { area: 'Boeung Keng Kang', budget: '$900-$1,600 / month', type: 'Condo', intent: 'Rent' as const },
    { area: 'Chroy Changvar', budget: '$900-$1,800', type: 'Villa / Borey', intent: 'Buy' as const },
  ]

  const agents = [
    {
      id: 'agent-1',
      name: 'John Doe',
      position: 'Senior Property Consultant',
      email: 'vstvacc@gmail.com',
      phone: siteConfig.phoneNumber,
      telegram: 'assistant_vstv168',
      avatar_url: '/images/agents/john-doe.jpg',
      bio: 'Focused on matching buyers and renters with verified options in Phnom Penh.',
      experience_years: 7,
      specialties: ['BKK1', 'Toul Kork', 'Russian Market', 'Condo'],
      languages: ['English', 'Khmer'],
      properties_sold: 200,
      rating: 4.9,
      location: siteConfig.business.location,
    },
    {
      id: 'agent-2',
      name: 'Sarah Wilson',
      position: 'Rental & Relocation Specialist',
      email: 'vstvacc@gmail.com',
      phone: siteConfig.phoneNumber,
      telegram: 'assistant_vstv168',
      avatar_url: '/images/agents/sarah-wilson.jpg',
      bio: 'Helps expats and locals rent faster with clear advice and quick viewings.',
      experience_years: 5,
      specialties: ['BKK2', 'BKK1', 'Sen Sok', 'Apartment'],
      languages: ['English', 'Khmer'],
      properties_sold: 140,
      rating: 4.8,
      location: siteConfig.business.location,
    },
    {
      id: 'agent-3',
      name: 'Mike Johnson',
      position: 'Investment & Sales Advisor',
      email: 'vstvacc@gmail.com',
      phone: siteConfig.phoneNumber,
      telegram: 'assistant_vstv168',
      avatar_url: '/images/agents/mike-johnson.jpg',
      bio: 'Supports buyers with negotiation, ROI-focused options, and closing guidance.',
      experience_years: 8,
      specialties: ['Boeung Keng Kang', 'Chroy Changvar', 'Villa', 'Condo'],
      languages: ['English', 'Khmer'],
      properties_sold: 260,
      rating: 4.9,
      location: siteConfig.business.location,
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-secondary-50 to-white">
        <div className="absolute inset-0">
          {shouldReduceMotion ? (
            <Image
              src="/images/backgrounds/hero-phnom-penh.jpg"
              alt="Phnom Penh skyline"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <motion.div className="absolute inset-0" style={{ y: heroBgY, scale: heroBgScale }}>
              <ShimmerImage
                src="/images/backgrounds/hero-phnom-penh.jpg"
                alt="Phnom Penh skyline"
                fill
                priority
                className="object-cover"
                sizes="100vw"
                wrapperClassName="absolute inset-0"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-white/70 to-white" />
          <div className="absolute inset-0 bg-hero-radial" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.02),transparent,rgba(2,6,23,0.02))]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex max-w-full flex-wrap items-center rounded-full bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700 ring-1 ring-brand-primary-600/10">
                Fast options via Telegram • Phnom Penh & nearby
              </p>
              <h1 className="mt-4 max-w-[22ch] text-3xl font-bold tracking-tight text-gray-900 text-balance sm:max-w-none sm:text-5xl break-words">
                Find the right home faster in Cambodia.
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Tell us your budget and preferred area. We'll send curated options quickly — no forms, no waiting.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#229ED9] px-6 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:shadow-lift hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#229ED9]/40 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:w-auto"
                >
                  <Icons.Telegram className="h-5 w-5" />
                  Message on Telegram
                </a>
                <a
                  href={getCallHref()}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold text-gray-900 shadow-ring transition-all duration-200 hover:shadow-soft hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-600/25 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:w-auto"
                >
                  <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
                  Call now
                </a>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-gray-600 sm:flex sm:flex-row sm:flex-wrap sm:items-center">
                <div className="inline-flex items-center gap-2">
                  <Icons.MapPin className="h-4 w-4 flex-shrink-0 text-brand-primary-700" />
                  <span className="min-w-0 truncate sm:whitespace-nowrap">{siteConfig.business.location ?? 'Phnom Penh, Cambodia'}</span>
                </div>
                <div className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
                <div className="flex items-start gap-2">
                  <Icons.Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-primary-700" />
                  <div className="min-w-0">
                    <a href={getCallHref()} className="font-semibold tabular-nums text-gray-900 hover:underline break-all">
                      {siteConfig.phoneNumber}
                    </a>
                    <div className="text-xs text-gray-500 sm:inline sm:pl-2 sm:text-sm">
                      {siteConfig.business.officeHours ?? 'Message anytime'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
                {['Verified options', 'Fast response', 'Local expertise'].map((text) => (
                  <div key={text} className="rounded-2xl border border-black/5 bg-white/70 p-4 text-sm font-semibold text-gray-800 shadow-soft backdrop-blur">
                    {text}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: 'Clients served', value: siteConfig.stats.clientsCount, suffix: '+' },
                  { label: 'Deals supported', value: siteConfig.stats.dealsCount, suffix: '+' },
                  { label: 'Years experience', value: siteConfig.stats.yearsExperience, suffix: '+' },
                ].map((item, idx) => (
                  <MotionInView
                    key={item.label}
                    delay={0.05 * idx}
                    className="rounded-2xl border border-black/5 bg-white/70 p-3 text-center shadow-soft backdrop-blur sm:p-4"
                  >
                    <div className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                      <CountUp value={item.value} suffix={item.suffix} />
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-gray-600 sm:text-xs">{item.label}</div>
                  </MotionInView>
                ))}
              </div>

              {/* Mobile: show the example homes scroller (desktop version lives in the right column) */}
              <div className="mt-6 rounded-2xl border border-black/5 bg-white/70 p-4 shadow-soft backdrop-blur md:hidden">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-gray-900">Example homes</div>
                    <div className="mt-1 text-xs text-gray-600">Tap any photo to request similar options.</div>
                  </div>
                  <a
                    href={getTelegramHref('Hi VSTV Agent, please send me some example properties for my budget and preferred area.')}
                    className="text-xs font-semibold text-brand-primary-700 hover:text-brand-primary-800"
                  >
                    Ask for options
                  </a>
                </div>

                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 pr-4 [-webkit-overflow-scrolling:touch] snap-x snap-mandatory">
                  {showcaseImages.map((img) => (
                    <a
                      key={img.src}
                      href={getTelegramHref(`Hi VSTV Agent, I like this style: ${img.label}. Please send similar options.`)}
                      className="group relative h-28 w-40 flex-none snap-start overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-ring transition-transform duration-200 active:scale-[0.98]"
                      aria-label={`Request similar properties (example: ${img.label})`}
                    >
                      <ShimmerImage
                        src={img.src}
                        alt={img.label}
                        fill
                        sizes="176px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        wrapperClassName="absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold text-white">{img.label}</div>
                      <div className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-900 opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100">
                        Request
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-brand-primary-600 to-brand-secondary-900 p-[1px] shadow-xl shadow-black/10">
                <div className="rounded-3xl bg-white p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Conversion-first</p>
                      <p className="mt-2 text-lg font-bold text-gray-900">Message us. Get options.</p>
                      <p className="mt-1 text-sm text-gray-600">Best for TikTok / Facebook leads.</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary-50 text-brand-primary-700">
                      <Icons.MessageCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      'Budget + area',
                      'We send 10–20 options',
                      'Visit and close the deal',
                    ].map((row, idx) => (
                      <div key={row} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-gray-50 px-4 py-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary-600 text-xs font-bold text-white">
                          {idx + 1}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{row}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-black/5 bg-gray-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-gray-900">Example homes</div>
                        <div className="mt-1 text-xs text-gray-600">Tap any photo to request similar options.</div>
                      </div>
                      <a
                        href={getTelegramHref('Hi VSTV Agent, please send me some example properties for my budget and preferred area.')}
                        className="text-xs font-semibold text-brand-primary-700 hover:text-brand-primary-800"
                      >
                        Ask for options
                      </a>
                    </div>

                    <div className="mt-4 lg:hidden">
                      <div className="flex gap-3 overflow-x-auto pb-2 pr-4 [-webkit-overflow-scrolling:touch] snap-x snap-mandatory">
                        {showcaseImages.map((img) => (
                          <a
                            key={img.src}
                            href={getTelegramHref(`Hi VSTV Agent, I like this style: ${img.label}. Please send similar options.`)}
                            className="group relative h-28 w-40 flex-none snap-start overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-ring transition-transform duration-200 active:scale-[0.98] sm:w-44 md:h-32 md:w-52 lg:w-56"
                            aria-label={`Request similar properties (example: ${img.label})`}
                          >
                            <ShimmerImage
                              src={img.src}
                              alt={img.label}
                              fill
                              sizes="176px"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              wrapperClassName="absolute inset-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold text-white">{img.label}</div>
                            <div className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-900 opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100">
                              Request
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="vstv-pausable mt-4 hidden lg:grid grid-cols-2 gap-3">
                      {[0, 1].map((col) => (
                        <div key={col} className="h-[320px] overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                          <div className={col === 0 ? 'vstv-marquee-y space-y-3 p-3' : 'vstv-marquee-y-reverse space-y-3 p-3'}>
                            {showcaseImages.concat(showcaseImages).map((img, idx) => (
                              <a
                                key={`${img.src}-${idx}`}
                                href={getTelegramHref(`Hi VSTV Agent, I like this style: ${img.label}. Please send similar options.`)}
                                className="group relative block h-28 overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-ring transition-transform duration-200 hover:-translate-y-[1px] hover:shadow-soft"
                                aria-label={`Request similar properties (example: ${img.label})`}
                              >
                                <ShimmerImage
                                  src={img.src}
                                  alt={img.label}
                                  fill
                                  sizes="(min-width: 1024px) 220px, 50vw"
                                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                  wrapperClassName="absolute inset-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold text-white">{img.label}</div>
                                <div className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-900 opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100">
                                  Request
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 text-xs text-gray-500">
                    Prefer Khmer? Send a message in Khmer — we’ll reply.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      {/* <MotionSection id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">How It Works</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            Simple steps. Fast results.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Send budget + location', desc: 'Tell us what you want and your timeline.' },
            { title: 'We send options fast', desc: 'We curate the best matches for you.' },
            { title: 'Visit & close the deal', desc: 'We arrange viewings and support negotiation.' },
          ].map((item) => (
            <MotionInView key={item.title} className="group rounded-2xl border border-black/5 bg-white p-6 shadow-ring transition-all duration-200 hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <div className="text-base font-bold text-gray-900">{item.title}</div>
              <div className="mt-2 text-sm text-gray-600">{item.desc}</div>
            </MotionInView>
          ))}
        </div>
      </MotionSection> */}

      {/* Why clients trust us */}
      <MotionSection className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Why Clients Trust Us</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              A simple, professional process that reduces risk and saves time.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Verified options first', desc: 'We focus on clean, realistic options that match your budget.' },
              { title: 'Fast Telegram replies', desc: 'Send your request and get options quickly.' },
              { title: 'Clear, honest guidance', desc: 'We explain pricing, deposits, and steps before you visit.' },
              { title: 'Bilingual support', desc: 'English + Khmer support for smoother communication.' },
            ].map((item, idx) => (
              <MotionInView
                key={item.title}
                delay={0.05 * idx}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-ring transition-all duration-200 hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="text-base font-bold text-gray-900">{item.title}</div>
                <div className="mt-2 text-sm text-gray-600">{item.desc}</div>
              </MotionInView>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Areas */}
      <MotionSection className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Areas We Cover</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            Tap an area to message us instantly.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {areas.map((area) => (
            <a
              key={area}
              href={getTelegramHref(`Hi VSTV Agent, I'm interested in properties in ${area}.`)}
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-ring transition-all duration-200 hover:-translate-y-[1px] hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-600/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              aria-label={`Ask about properties in ${area} on Telegram`}
            >
              {area}
              <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Icons.ArrowRight className="h-4 w-4 text-gray-500" />
              </span>
            </a>
          ))}
        </div>
      </MotionSection>

      {/* Popular requests */}
      <MotionSection className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Popular Property Requests</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Tap a request to send it to Telegram - we'll reply with matching options.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularRequests.map((req, idx) => {
              const message = `Hi VSTV Agent, I want to ${req.intent.toLowerCase()}. Area: ${req.area}. Budget: ${req.budget}. Type: ${req.type}. Please send options.`
              return (
                <MotionInView
                  key={`${req.intent}-${req.area}-${req.type}`}
                  delay={0.04 * idx}
                  className="group rounded-2xl border border-black/5 bg-white p-6 shadow-ring transition-all duration-200 hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{req.intent}</div>
                      <div className="mt-1 text-base font-bold text-gray-900">{req.area}</div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary-50 text-brand-primary-700">
                      <Icons.Property className="h-5 w-5" />
                    </div>
                  </div>
                  <dl className="mt-4 grid gap-2 text-sm">
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                      <dt className="text-gray-600">Budget</dt>
                      <dd className="font-semibold text-gray-900">{req.budget}</dd>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                      <dt className="text-gray-600">Type</dt>
                      <dd className="font-semibold text-gray-900">{req.type}</dd>
                    </div>
                  </dl>
                  <a
                    href={getTelegramHref(message)}
                    className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#229ED9] px-4 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:brightness-110 hover:shadow-lift hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#229ED9]/40 motion-reduce:transition-none motion-reduce:hover:scale-100"
                    aria-label={`Send request to Telegram: ${req.intent} in ${req.area}`}
                  >
                    <Icons.Telegram className="h-5 w-5" />
                    Send to Telegram
                  </a>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Quick reply on Telegram
                    </span>
                    <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">Tap to request</span>
                  </div>
                </MotionInView>
              )
            })}
          </div>
        </div>
      </MotionSection>

      {/* Quiz */}
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <FindPropertyQuiz areas={areas.slice(0, 8)} />
      </div>

      {/* Agents */}
      <MotionSection className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Talk to an Agent</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            Choose an agent and message on Telegram for fast options.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, idx) => (
            <MotionInView key={agent.id} delay={0.06 * idx}>
              <AgentCard agent={agent} />
            </MotionInView>
          ))}
        </div>
      </MotionSection>

      {/* Follow us */}
      {followLinks.length > 0 && (
        <MotionSection className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Follow Us</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                See new posts and updates from {siteConfig.companyName}.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {followLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-transform duration-200 hover:-translate-y-[1px] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* Final CTA */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-brand-primary-600 to-brand-secondary-900 p-[1px] shadow-xl shadow-black/10">
            <div className="rounded-3xl bg-white px-6 py-10 sm:px-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Ready to get options?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                    Message us your budget + area and we'll respond fast.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-5 text-sm font-semibold text-white shadow-sm"
                  >
                    <Icons.Telegram className="h-5 w-5" />
                    Message on Telegram
                  </a>
                  <a
                    href={getCallHref()}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-gray-900 shadow-sm"
                  >
                    <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
                    Call now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
