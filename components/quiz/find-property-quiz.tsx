/**
 * UI/UX notes: Keeps quiz logic static/lightweight while improving conversion with a clear final Telegram handoff CTA.
 */

'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { getTelegramHref, siteConfig } from '@/config/site'

type Intent = 'Rent' | 'Buy'
type Budget = '< $300' | '$300–$600' | '$600–$1000' | '$1000+'

const intents: Intent[] = ['Rent', 'Buy']
const budgets: Budget[] = ['< $300', '$300–$600', '$600–$1000', '$1000+']

export default function FindPropertyQuiz({
  areas,
}: {
  areas: string[]
}) {
  const shouldReduceMotion = useReducedMotion()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [intent, setIntent] = useState<Intent | null>(null)
  const [budget, setBudget] = useState<Budget | null>(null)
  const [area, setArea] = useState<string | null>(null)

  const canGoNext = (next: 2 | 3) => {
    if (next === 2) return !!intent
    if (next === 3) return !!intent && !!budget
    return false
  }

  const summary = useMemo(() => {
    if (!intent || !budget || !area) return null
    return { intent, budget, area }
  }, [intent, budget, area])

  const telegramHref = useMemo(() => {
    if (!summary) return getTelegramHref(siteConfig.telegramPrefillBaseMessage)
    const message = `Hi VSTV Agent, I want to ${summary.intent}. Budget: ${summary.budget}. Area: ${summary.area}. Please send options.`
    return getTelegramHref(message)
  }, [summary])

  const Section = shouldReduceMotion ? 'section' : motion.section

  return (
    <Section
      {...(shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 14 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            viewport: { once: true, amount: 0.2 },
          })}
      className="rounded-3xl bg-gradient-to-br from-brand-primary-600 via-brand-primary-700 to-brand-secondary-900 p-[1px] shadow-xl shadow-black/10"
    >
      <div className="rounded-3xl bg-white px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary-700">
              Quick Quiz
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Find Your Property
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Answer 3 quick questions and we’ll send matching options fast.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span className={cn('h-2 w-2 rounded-full', step >= 1 ? 'bg-brand-primary-600' : 'bg-gray-200')} />
            <span className={cn('h-2 w-2 rounded-full', step >= 2 ? 'bg-brand-primary-600' : 'bg-gray-200')} />
            <span className={cn('h-2 w-2 rounded-full', step >= 3 ? 'bg-brand-primary-600' : 'bg-gray-200')} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {step === 1 && (
              <div className="rounded-2xl border border-black/5 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900">Step 1 — Intent</h3>
                <p className="mt-1 text-sm text-gray-600">Are you looking to rent or buy?</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {intents.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setIntent(value)}
                      className={cn(
                        'h-12 rounded-xl border px-4 text-sm font-semibold transition-all duration-200 motion-reduce:transition-none',
                        intent === value
                          ? 'border-brand-primary-600 bg-brand-primary-50 text-brand-primary-800 shadow-sm'
                          : 'border-black/10 bg-white text-gray-900 hover:-translate-y-[1px] hover:shadow-sm motion-reduce:hover:translate-y-0'
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    disabled={!canGoNext(2)}
                    onClick={() => setStep(2)}
                    className="h-11 flex-1 rounded-xl bg-brand-primary-600 px-4 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-2xl border border-black/5 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900">Step 2 — Budget</h3>
                <p className="mt-1 text-sm text-gray-600">Choose your monthly budget.</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {budgets.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setBudget(value)}
                      className={cn(
                        'h-12 rounded-xl border px-4 text-sm font-semibold transition-all duration-200 motion-reduce:transition-none',
                        budget === value
                          ? 'border-brand-primary-600 bg-brand-primary-50 text-brand-primary-800 shadow-sm'
                          : 'border-black/10 bg-white text-gray-900 hover:-translate-y-[1px] hover:shadow-sm motion-reduce:hover:translate-y-0'
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-gray-900"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!canGoNext(3)}
                    onClick={() => setStep(3)}
                    className="h-11 flex-1 rounded-xl bg-brand-primary-600 px-4 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-2xl border border-black/5 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900">Step 3 — Area</h3>
                <p className="mt-1 text-sm text-gray-600">Pick one area you prefer.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {areas.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setArea(value)}
                      className={cn(
                        'h-10 rounded-full border px-4 text-sm font-semibold transition-all duration-200 motion-reduce:transition-none',
                        area === value
                          ? 'border-brand-primary-600 bg-brand-primary-50 text-brand-primary-800'
                          : 'border-black/10 bg-white text-gray-900 hover:-translate-y-[1px] hover:shadow-sm motion-reduce:hover:translate-y-0'
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-gray-900"
                  >
                    Back
                  </button>
                  <a
                    href={telegramHref}
                    aria-label="Send quiz details to Telegram"
                    className={cn(
                      'flex h-11 flex-1 items-center justify-center rounded-xl bg-[#229ED9] px-4 text-sm font-semibold text-white shadow-sm transition-opacity duration-200 motion-reduce:transition-none',
                      !summary ? 'pointer-events-none opacity-50' : 'hover:opacity-95'
                    )}
                  >
                    Send my request to Telegram
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Your Summary</h3>
              <p className="mt-1 text-sm text-gray-600">We’ll use this to send better options.</p>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <dt className="text-gray-600">Intent</dt>
                  <dd className="font-semibold text-gray-900">{intent ?? '—'}</dd>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <dt className="text-gray-600">Budget</dt>
                  <dd className="font-semibold text-gray-900">{budget ?? '—'}</dd>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <dt className="text-gray-600">Area</dt>
                  <dd className="font-semibold text-gray-900">{area ?? '—'}</dd>
                </div>
              </dl>

              <div className="mt-6 rounded-xl bg-brand-secondary-50 p-4 text-sm text-brand-secondary-900">
                Tip: The more specific your area and budget, the faster we can send options.
              </div>

              <a
                href={telegramHref}
                aria-label="Send my request to Telegram"
                className={cn(
                  'mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 text-sm font-semibold text-white shadow-sm transition-opacity duration-200 motion-reduce:transition-none',
                  !summary ? 'pointer-events-none opacity-50' : 'hover:opacity-95'
                )}
              >
                Send my request to Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
