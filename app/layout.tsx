import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VSTV AGENT (CAMBODIA) CO., LTD - Find Your Dream Property in Cambodia",
  description: "VSTV AGENT (CAMBODIA) CO., LTD - Your trusted real estate partner for property sales and rentals in Cambodia. Expert guidance for apartments, condos, villas, and land investments.",
  keywords: "VSTV Agent, real estate, Cambodia, property, apartment, condo, villa, land, sales, rental, Phnom Penh, real estate agent Cambodia",
  authors: [{ name: "VSTV AGENT (CAMBODIA) CO., LTD" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "VSTV AGENT (CAMBODIA) CO., LTD - Find Your Dream Property in Cambodia",
    description: "Your trusted real estate partner for property sales and rentals in Cambodia",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/company/CSTV-Cover-24-06-25.jpg",
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
    images: ["/images/company/CSTV-Cover-24-06-25.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
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

