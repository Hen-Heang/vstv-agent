import React from 'react'
import { siteConfig } from '@/config/site'
import ComingSoon from '@/components/marketing/coming-soon'

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  if (!siteConfig.featureFlags.listings) {
    return <ComingSoon title="Properties" description="Listings are available via Telegram." />
  }

  return <>{children}</>
}

