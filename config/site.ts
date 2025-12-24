/**
 * UI/UX notes: Centralized brand/business info for consistent trust cues (location, hours, contact).
 */

import { toTelHref, toTelegramPrefillHref } from '@/utils/contact-links'

export type SiteSocialLinks = Partial<{
  facebook: string
  tiktok: string
  khmer24: string
}>

export type SiteConfig = {
  companyName: string
  phoneNumber: string
  telegramUrl: string
  telegramPrefillBaseMessage: string
  social: SiteSocialLinks
  business: Partial<{
    officeHours: string
    location: string
  }>
  stats: {
    clientsCount: number
    dealsCount: number
    yearsExperience: number
  }
  featureFlags: {
    listings: boolean
  }
}

export const siteConfig: SiteConfig = {
  companyName: 'VSTV Agent',
  phoneNumber: '+85598261807',
  telegramUrl: 'https://t.me/assistant_vstv168',
  telegramPrefillBaseMessage: 'Hi VSTV Agent, I want to ask about a property.',
  social: {
    facebook: 'https://www.facebook.com/share/1BL2cw4au3/?mibextid=wwXIfr',
    tiktok: '',
    khmer24: '',
  },
  business: {
    officeHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
    location: 'Phnom Penh, Cambodia',
  },
  stats: {
    clientsCount: 1000,
    dealsCount: 800,
    yearsExperience: 7,
  },
  featureFlags: {
    listings: false,
  },
}

export function getCallHref() {
  return toTelHref(siteConfig.phoneNumber)
}

export function getTelegramHref(message?: string) {
  if (!message) return siteConfig.telegramUrl
  return toTelegramPrefillHref(siteConfig.telegramUrl, message)
}
