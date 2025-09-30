import { prisma } from './database'

const sampleUnits = [
  {
    unitNo: "ANATA/1212B",
    price: 295.00,
    roomType: "Studio Room",
    handleBy: "Rita",
    remarks: "Floor 5",
    status: "available"
  },
  {
    unitNo: "Agile Sky Residence/A34",
    price: 650.00,
    roomType: "One bedroom",
    handleBy: "KA",
    remarks: "",
    status: "available"
  },
  {
    unitNo: "Arthur residence Tonlebasac",
    price: 300.00,
    roomType: "Studio Room",
    handleBy: "Sale006 VSTV",
    remarks: "",
    status: "available"
  },
  {
    unitNo: "Arakawa/D1918",
    price: 31900.00,
    roomType: "Loft Condo",
    handleBy: "Hong",
    remarks: "Resell",
    status: "sold"
  },
  {
    unitNo: "Condo L Tower",
    price: 400.00,
    roomType: "Two bedroom",
    handleBy: "Nora",
    remarks: "Available 18.08.2025",
    status: "available"
  },
  {
    unitNo: "Borey Sen Sok/524",
    price: 360.00,
    roomType: "One-Two Bedroom",
    handleBy: "Vannaram",
    remarks: "",
    status: "negotiate"
  },
  {
    unitNo: "Morgan/3317",
    price: 400.00,
    roomType: "Studio Room",
    handleBy: "Rita",
    remarks: "Negotiate",
    status: "negotiate"
  },
  {
    unitNo: "Macha Condo & Resident",
    price: 600.00,
    roomType: "Two bedroom",
    handleBy: "Rita",
    remarks: "",
    status: "available"
  },
  {
    unitNo: "Newly-built Apartment",
    price: 590.00,
    roomType: "One bedroom",
    handleBy: "Sale006 VSTV",
    remarks: "",
    status: "available"
  },
  {
    unitNo: "Pinnacle/1816",
    price: 260.00,
    roomType: "Studio Room",
    handleBy: "Vannaram",
    remarks: "",
    status: "available"
  }
]

export async function seedUnits() {
  try {
    console.log('Seeding units...')
    
    // Clear existing units
    await prisma.unit.deleteMany({})
    
    // Create sample units
    for (const unit of sampleUnits) {
      await prisma.unit.create({
        data: unit
      })
    }
    
    console.log(`Successfully seeded ${sampleUnits.length} units`)
  } catch (error) {
    console.error('Error seeding units:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  seedUnits()
    .then(() => {
      console.log('Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}
