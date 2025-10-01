import PropertyDetail from '@/components/properties/property-detail'

const demoProperty = {
  id: "1",
  title: "Luxury Condo in BKK1",
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

export default function PropertyDemoPage() {
  return <PropertyDetail property={demoProperty} />
}
