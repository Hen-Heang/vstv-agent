'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'
import { Icons } from '@/components/shared/icons'
import FindPropertyQuiz from '@/components/quiz/find-property-quiz'

const areas = ['BKK1', 'BKK2', 'Toul Kork', 'Sen Sok', 'Boeung Keng Kang', 'Chamkarmon', 'Chroy Changvar', 'Russian Market', 'TTP', 'Diamond Island']
const propertyTypes = ['Condo', 'Apartment', 'Villa', 'Borey', 'Office', 'Land']

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

function useCountUp(target: number) {
  const shouldReduceMotion = useReducedMotion()
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, shouldReduceMotion])

  return value
}

function Stat({ label, value }: { label: string; value: number }) {
  const n = useCountUp(value)
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <div className="text-3xl font-bold tracking-tight text-gray-900">{n.toLocaleString()}</div>
      <div className="mt-1 text-sm font-semibold text-gray-600">{label}</div>
    </div>
  )
}

export default function MarketingHome() {
  const shouldReduceMotion = useReducedMotion()
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
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.02 }}
              animate={{ scale: [1.02, 1.08, 1.02] }}
              transition={{ duration: 26, ease: 'easeInOut', repeat: Infinity }}
            >
              <Image
                src="/images/backgrounds/hero-phnom-penh.jpg"
                alt="Phnom Penh skyline"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-white/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.10),_transparent_45%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex max-w-full flex-wrap items-center rounded-full bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700 ring-1 ring-brand-primary-600/10">
                Fast options via Telegram • Phnom Penh & nearby
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl break-words">
                Find the right home faster in Cambodia.
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                Tell us your budget and preferred area. We’ll send curated options quickly — no forms, no waiting.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
                  className="inline-flex h-11 basis-[calc(50%-0.375rem)] flex-1 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100"
                >
                  <Icons.Telegram className="h-5 w-5" />
                  Telegram
                </a>
                <a
                  href={getCallHref()}
                  className="inline-flex h-11 basis-[calc(50%-0.375rem)] flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-gray-900 shadow-sm transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100"
                >
                  <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
                  Call
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {['Verified options', 'Fast response', 'Local expertise'].map((text) => (
                  <div key={text} className="rounded-2xl border border-black/5 bg-white/70 p-4 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur">
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
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
                        <div className="text-sm font-bold text-gray-900">Recent listings</div>
                        <div className="mt-1 text-xs text-gray-600">Scroll or hover to pause.</div>
                      </div>
                      <Link href="/properties" className="text-xs font-semibold text-brand-primary-700 hover:text-brand-primary-800">
                        View all
                      </Link>
                    </div>

                    <div className="mt-4 lg:hidden">
                      <div className="flex gap-3 overflow-x-auto pb-2 pr-4 [-webkit-overflow-scrolling:touch]">
                        {showcaseImages.map((img) => (
                          <Link
                            key={img.src}
                            href="/properties"
                            className="group relative h-28 w-44 flex-none overflow-hidden rounded-2xl ring-1 ring-black/5"
                            aria-label={`Open properties (example: ${img.label})`}
                          >
                            <Image
                              src={img.src}
                              alt={img.label}
                              fill
                              sizes="176px"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold text-white">{img.label}</div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="vstv-pausable mt-4 hidden lg:grid grid-cols-2 gap-3">
                      {[0, 1].map((col) => (
                        <div key={col} className="h-[320px] overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                          <div className={col === 0 ? 'vstv-marquee-y space-y-3 p-3' : 'vstv-marquee-y-reverse space-y-3 p-3'}>
                            {showcaseImages.concat(showcaseImages).map((img, idx) => (
                              <Link
                                key={`${img.src}-${idx}`}
                                href="/properties"
                                className="group relative block h-28 overflow-hidden rounded-2xl ring-1 ring-black/5"
                                aria-label={`Open properties (example: ${img.label})`}
                              >
                                <Image
                                  src={img.src}
                                  alt={img.label}
                                  fill
                                  sizes="(min-width: 1024px) 220px, 50vw"
                                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold text-white">{img.label}</div>
                              </Link>
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
      <MotionSection id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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
            <div key={item.title} className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <div className="text-base font-bold text-gray-900">{item.title}</div>
              <div className="mt-2 text-sm text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Why choose us */}
      <MotionSection className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Why Choose Us</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Designed for speed, trust, and clarity.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Fast response', desc: 'We reply quickly on Telegram.' },
              { title: 'Local experience', desc: 'We know the best buildings and areas.' },
              { title: 'Verified options', desc: 'We filter out low-quality listings.' },
              { title: 'Clear guidance', desc: 'Transparent advice on pricing and contracts.' },
              { title: 'Investor-friendly', desc: 'We can suggest ROI-focused options.' },
              { title: 'After-viewing support', desc: 'We help you close the deal with confidence.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="text-base font-bold text-gray-900">{item.title}</div>
                <div className="mt-2 text-sm text-gray-600">{item.desc}</div>
              </div>
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
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-transform duration-200 hover:-translate-y-[1px] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              aria-label={`Ask about properties in ${area} on Telegram`}
            >
              {area}
            </a>
          ))}
        </div>
      </MotionSection>

      {/* Property types */}
      <MotionSection className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Property Types</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Condo, villa, land — we handle it.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {propertyTypes.map((type) => (
              <div key={type} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-gray-900">{type}</div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary-50 text-brand-primary-700">
                    <Icons.Property className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Send your budget and preferred area — we’ll reply with options.
                </p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Social proof */}
      <MotionSection className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Social Proof</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            Real results, consistent delivery.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Happy clients" value={siteConfig.stats.clientsCount} />
          <Stat label="Deals closed" value={siteConfig.stats.dealsCount} />
          <Stat label="Years experience" value={siteConfig.stats.yearsExperience} />
        </div>
      </MotionSection>

      {/* Quiz */}
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <FindPropertyQuiz areas={areas.slice(0, 8)} />
      </div>

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
                    Message us your budget + area and we’ll respond fast.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-5 text-sm font-semibold text-white shadow-sm"
                  >
                    <Icons.Telegram className="h-5 w-5" />
                    Telegram
                  </a>
                  <a
                    href={getCallHref()}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-gray-900 shadow-sm"
                  >
                    <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
                    Call
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
