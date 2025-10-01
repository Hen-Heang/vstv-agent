import { Metadata } from 'next'
import PropertyDetail from '@/components/properties/property-detail'

interface PropertyPageProps {
  params: Promise<{
    id: string
  }>
}

// This would typically fetch from your database
const getProperty = async (id: string) => {
  // Mock data - replace with actual database query
  return {
    id,
    title: "Luxury Condo in BKK1 - Premium Living in Phnom Penh",
    price: 1200,
    priceType: "rent" as const,
    location: "BKK1, Phnom Penh",
    address: "123 Street 271, BKK1, Phnom Penh, Cambodia",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parking: 1,
    yearBuilt: 2020,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "This stunning luxury condo in the heart of BKK1 offers modern living with premium amenities. Featuring floor-to-ceiling windows, high-end finishes, and a prime location near embassies and international schools. Perfect for expats and professionals seeking comfort and convenience in Phnom Penh's most prestigious district.",
    features: [
      "Floor-to-ceiling windows",
      "High-end finishes", 
      "Modern kitchen with island",
      "Master suite with walk-in closet",
      "Private balcony",
      "Air conditioning throughout",
      "Hardwood floors",
      "Built-in wardrobes"
    ],
    amenities: ["WiFi", "Security", "Garden", "Gym", "Café"],
    agent: {
      id: "004",
      name: "HENG KIMHONG",
      phone: "+855 96 4444 027",
      email: "hengkimhong1803@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9
    },
    coordinates: {
      lat: 11.5564,
      lng: 104.9282
    },
    pdfUrl: "/property-brochure.pdf",
    virtualTourUrl: "https://example.com/virtual-tour"
  }
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params
  const property = await getProperty(id)
  
  const title = `${property.title} | VSTV Agent - Real Estate Cambodia`
  const description = `${property.description} Located in ${property.location}. ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, ${property.area} sq ft. ${property.priceType === 'rent' ? `Rent: $${property.price}/month` : `Sale: $${property.price.toLocaleString()}`}`
  
  return {
    title,
    description,
    keywords: [
      'real estate Cambodia',
      'property Phnom Penh',
      'condo BKK1',
      'luxury apartment',
      'rent Phnom Penh',
      'property for sale',
      'VSTV Agent',
      property.location,
      property.priceType,
      `${property.bedrooms} bedroom`,
      `${property.bathrooms} bathroom`
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: 'VSTV Agent',
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [property.images[0]],
    },
    alternates: {
      canonical: `/property/${id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params
  const property = await getProperty(id)
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": property.title,
            "description": property.description,
            "url": `/property/${id}`,
            "image": property.images,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": property.address,
              "addressLocality": property.location,
              "addressCountry": "Cambodia"
            },
            "geo": property.coordinates ? {
              "@type": "GeoCoordinates",
              "latitude": property.coordinates.lat,
              "longitude": property.coordinates.lng
            } : undefined,
            "offers": {
              "@type": "Offer",
              "price": property.price,
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "validFrom": new Date().toISOString()
            },
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property.area,
              "unitCode": "SQF"
            },
            "numberOfRooms": property.bedrooms,
            "numberOfBathroomsTotal": property.bathrooms,
            "numberOfBedrooms": property.bedrooms,
            "yearBuilt": property.yearBuilt,
            "amenityFeature": property.amenities.map(amenity => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity
            })),
            "broker": {
              "@type": "RealEstateAgent",
              "name": property.agent.name,
              "email": property.agent.email,
              "telephone": property.agent.phone,
              "image": property.agent.avatar
            }
          })
        }}
      />
      
      <PropertyDetail property={property} />
    </>
  )
}
