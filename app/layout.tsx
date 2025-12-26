

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import React from "react";
import FloatingCTA from "@/components/cta/floating-cta";
import MobileStickyCTA from "@/components/cta/mobile-sticky-cta";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/components/i18n/language-provider";

function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL
  if (fromEnv) return fromEnv

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) return `https://${vercelUrl}`

  return "http://localhost:3000"
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: siteConfig.companyName,
  description: `${siteConfig.companyName} - Your trusted real estate partner in Cambodia. Message us on Telegram for fast options.`,
  keywords: `${siteConfig.companyName}, real estate, Cambodia, Phnom Penh, property, condo, apartment, villa, land, rental, sale`,
  authors: [{ name: siteConfig.companyName }],
  icons: {
    icon: "/images/company/VSTV.png",
    apple: "/images/company/VSTV.png",
  },
  openGraph: {
    title: `${siteConfig.companyName} - Real Estate in Cambodia`,
    description: `${siteConfig.companyName} - Message us on Telegram for fast options.`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/company/VSTV.png",
        width: 1200,
        height: 630,
        alt: "VSTV AGENT (CAMBODIA) CO., LTD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} - Real Estate in Cambodia`,
    description: `${siteConfig.companyName} - Message us on Telegram for fast options.`,
    images: ["/images/company/VSTV.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <FloatingCTA />
          <MobileStickyCTA />
        </LanguageProvider>
      </body>
    </html>
  );
}
