import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '@/components/shared/icons'
import { getCallHref, getTelegramHref, siteConfig } from '@/config/site'

export const metadata = {
  title: `Agents - ${siteConfig.companyName}`,
  description: `Meet the team at ${siteConfig.companyName}. Contact us via Telegram or phone.`,
}

type AgentCard = {
  name: string
  role: string
  languages: string[]
  specialties: string[]
  imageSrc?: string
}

const agents: AgentCard[] = [
  {
    name: 'VSTV Agent Team',
    role: 'Client Support',
    languages: ['Khmer', 'English'],
    specialties: ['Rent & Buy guidance', 'Area matching', 'Fast options'],
    imageSrc: '/images/company/VSTV.png',
  },
  {
    name: 'Sales Support',
    role: 'Property Sales',
    languages: ['Khmer', 'English'],
    specialties: ['Condos', 'Villas', 'Land'],
  },
  {
    name: 'Rental Support',
    role: 'Property Rental',
    languages: ['Khmer', 'English'],
    specialties: ['Apartments', 'Condo rentals', 'Short/Long term'],
  },
]

export default function AgentsPage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Agents
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            Message us on Telegram with your budget + area for the fastest response.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.name} className="overflow-hidden border-black/5 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                    {agent.imageSrc ? (
                      <Image src={agent.imageSrc} alt={agent.name} fill className="object-contain p-2" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-brand-primary-50 text-brand-primary-700">
                        <Icons.User className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-900">{agent.name}</div>
                    <div className="text-sm font-semibold text-gray-600">{agent.role}</div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Languages</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {agent.languages.map((lang) => (
                      <div key={lang} className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold text-gray-900">
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Specialties</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {agent.specialties.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={getTelegramHref('Hi VSTV Agent, I want to talk to an agent. Budget: ____. Area: ____.')}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 text-sm font-semibold text-white shadow-sm"
                    aria-label="Chat with an agent on Telegram"
                  >
                    <Icons.Telegram className="h-5 w-5" />
                    Telegram
                  </a>
                  <a
                    href={getCallHref()}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-gray-900 shadow-sm"
                    aria-label="Call us"
                  >
                    <Icons.Phone className="h-5 w-5 text-brand-primary-700" />
                    Call
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="text-sm font-semibold text-gray-900">Prefer to start now?</div>
          <div className="mt-2 text-sm text-gray-600">
            Tell us your intent (rent/buy), budget, and area. We’ll send matching options fast.
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-gray-900 shadow-sm"
            >
              Take the Home Quiz
            </Link>
            <a
              href={getTelegramHref(siteConfig.telegramPrefillBaseMessage)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#229ED9] px-4 text-sm font-semibold text-white shadow-sm"
              aria-label="Chat on Telegram"
            >
              Message on Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

