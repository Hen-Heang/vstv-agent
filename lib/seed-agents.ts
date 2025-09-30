import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const agentsData = [
  {
    agentId: "004",
    name: "HENG KIMHONG",
    role: "Real Estate Agent Supervisor",
    email: "hengkimhong1803@email.com",
    phone: "+855 96 4444 027",
    telegram: "0889832306",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.",
    experience: 8,
    specialties: ["Luxury Properties", "Investment Consulting", "Property Management", "Team Leadership"],
    languages: ["English", "Khmer", "Chinese"],
    location: "Phnom Penh",
    propertiesSold: 180,
    rating: 4.9,
    joinedDate: new Date("2016-03-15"),
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "Team Management Certified"],
    achievements: ["Top Performer 2023", "Team Leadership Award 2022", "Sales Excellence Award 2021"]
  },
  {
    agentId: "003",
    name: "VIN SOLYVAY",
    role: "Real Estate Agent",
    email: "vinsolyvay@gmail.com",
    phone: "+855 98 261 801",
    telegram: "098261801",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.",
    experience: 5,
    specialties: ["Residential Properties", "First-time Buyers", "Market Analysis", "Client Relations"],
    languages: ["English", "Khmer"],
    location: "Phnom Penh",
    propertiesSold: 85,
    rating: 4.8,
    joinedDate: new Date("2019-06-10"),
    education: "Bachelor's in Economics",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist"],
    achievements: ["Rising Star 2023", "Client Satisfaction Award 2022", "New Agent Excellence 2021"]
  },
  {
    agentId: "008",
    name: "HENG RITA",
    role: "Senior Real Estate Agent",
    email: "rytavsv168@gmail.com",
    phone: "+855 98 261 808",
    telegram: "098261808",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Heng Rita is a senior real estate professional with deep knowledge of the Cambodian property market. She specializes in luxury residential properties and has built strong relationships with both local and international clients.",
    experience: 7,
    specialties: ["Luxury Residential", "International Clients", "Property Investment", "Market Trends"],
    languages: ["English", "Khmer", "Chinese"],
    location: "Phnom Penh",
    propertiesSold: 120,
    rating: 4.9,
    joinedDate: new Date("2017-08-20"),
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "International Property Certified"],
    achievements: ["Senior Agent Excellence 2023", "International Client Award 2022", "Sales Excellence Award 2021"]
  },
  {
    agentId: "009",
    name: "PENG HOUNANG",
    role: "Real Estate Agent Manager",
    email: "Penghounang111@gmail.com",
    phone: "+855 93 76 51 11",
    telegram: "093765111",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Peng Hounang serves as a Real Estate Agent Manager, bringing strategic leadership and extensive market knowledge to the team. His management experience combined with deep property expertise makes him an invaluable asset to both clients and colleagues.",
    experience: 10,
    specialties: ["Strategic Planning", "Team Management", "Commercial Properties", "Investment Analysis"],
    languages: ["English", "Khmer", "Chinese"],
    location: "Phnom Penh",
    propertiesSold: 200,
    rating: 4.9,
    joinedDate: new Date("2014-02-15"),
    education: "Master's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Management Certified", "Team Leadership Certified"],
    achievements: ["Management Excellence 2023", "Strategic Leadership Award 2022", "Top Performer 2021"]
  },
  {
    agentId: "0010",
    name: "NHEM SAMI",
    role: "Real Estate Agent",
    email: "nhemsami@gmail.com",
    phone: "+855 10 773 523",
    telegram: "010773523",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Nhem Sami is a dedicated real estate professional committed to helping clients find their perfect property. With a focus on residential properties and excellent customer service, he ensures every client receives personalized attention.",
    experience: 4,
    specialties: ["Residential Properties", "Customer Service", "Property Tours", "Market Research"],
    languages: ["English", "Khmer"],
    location: "Phnom Penh",
    propertiesSold: 65,
    rating: 4.7,
    joinedDate: new Date("2020-09-12"),
    education: "Bachelor's in Marketing",
    certifications: ["Licensed Real Estate Agent", "Customer Service Certified"],
    achievements: ["Customer Service Excellence 2023", "New Agent Achievement 2022", "Client Satisfaction Award 2021"]
  },
  {
    agentId: "005",
    name: "KHUN SINDIKA",
    role: "Real Estate Agent",
    email: "khunsingdika@gmail.com",
    phone: "+855 96 616 1180",
    telegram: "0966161180",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Khun Sindika is a professional real estate agent with a passion for helping clients navigate the property market. Her attention to detail and commitment to excellence make her a trusted advisor for property transactions.",
    experience: 6,
    specialties: ["Residential Properties", "Property Valuation", "Client Relations", "Market Analysis"],
    languages: ["English", "Khmer"],
    location: "Phnom Penh",
    propertiesSold: 95,
    rating: 4.8,
    joinedDate: new Date("2018-04-18"),
    education: "Bachelor's in Economics",
    certifications: ["Licensed Real Estate Agent", "Property Valuation Certified"],
    achievements: ["Professional Excellence 2023", "Client Relations Award 2022", "Sales Achievement 2021"]
  },
  {
    agentId: "007",
    name: "OEURN CHET",
    role: "Real Estate Agent Supervisor",
    email: "chetvstv@gmail.com",
    phone: "+855 98 261 807",
    telegram: "098261807",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Oeurn Chet serves as a Real Estate Agent Supervisor, combining leadership skills with extensive property market knowledge. His supervisory role allows him to guide both clients and team members toward successful property transactions.",
    experience: 9,
    specialties: ["Team Leadership", "Luxury Properties", "Investment Consulting", "Client Management"],
    languages: ["English", "Khmer", "Chinese"],
    location: "Phnom Penh",
    propertiesSold: 160,
    rating: 4.9,
    joinedDate: new Date("2015-11-25"),
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "Leadership Certified"],
    achievements: ["Supervisory Excellence 2023", "Team Leadership Award 2022", "Sales Excellence Award 2021"]
  }
]

export async function seedAgents() {
  console.log('🌱 Seeding agents...')
  
  try {
    // Clear existing agents
    await prisma.agent.deleteMany()
    console.log('✅ Cleared existing agents')
    
    // Create agents
    for (const agentData of agentsData) {
      await prisma.agent.create({
        data: agentData
      })
      console.log(`✅ Created agent: ${agentData.name} (ID: ${agentData.agentId})`)
    }
    
    console.log('🎉 All agents seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding agents:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  seedAgents()
    .then(() => {
      console.log('✅ Agent seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Agent seeding failed:', error)
      process.exit(1)
    })
}
