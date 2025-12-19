import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "VSTV Agent",
  description: "VSTV AGENT (CAMBODIA) CO., LTD - Your trusted real estate partner for property sales and rentals in Cambodia. Expert guidance for apartments, condos, villas, and land investments.",
  keywords: "VSTV Agent, real estate, Cambodia, property, apartment, condo, villa, land, sales, rental, Phnom Penh, real estate agent Cambodia",
  authors: [{ name: "VSTV AGENT (CAMBODIA) CO., LTD" }],
  icons: {
    icon: "/images/company/VSTV.png",
    apple: "/images/company/VSTV.png",
  },
  openGraph: {
    title: "VSTV AGENT (CAMBODIA) CO., LTD - Find Your Dream Property in Cambodia",
    description: "Your trusted real estate partner for property sales and rentals in Cambodia",
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
    title: "VSTV AGENT (CAMBODIA) CO., LTD - Find Your Dream Property in Cambodia",
    description: "Your trusted real estate partner for property sales and rentals in Cambodia",
    images: ["/images/company/VSTV.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

