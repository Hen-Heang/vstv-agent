// Direct agent data insertion for Supabase
const agentsData = [
  {
    id: "004",
    name: "HENG KIMHONG",
    email: "hengkimhong1803@email.com",
    phone: "+855 96 4444 027",
    telegram: "0889832306",
    position: "Real Estate Agent Supervisor",
    bio: "With extensive experience in the Cambodian real estate market, Heng Kimhong specializes in luxury properties and investment opportunities. As a supervisor, he leads a team of dedicated agents and has helped hundreds of clients find their dream homes and maximize their investment returns.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background_image: "/images/company/VSTV-BG.png",
    specialties: ["Luxury Properties", "Investment Consulting", "Property Management", "Team Leadership"],
    languages: ["English", "Khmer", "Chinese"],
    experience_years: 8,
    properties_sold: 180,
    rating: 4.9,
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "Team Management Certified"],
    achievements: ["Top Performer 2023", "Team Leadership Award 2022", "Sales Excellence Award 2021"],
    location: "Phnom Penh",
    is_active: true
  },
  {
    id: "003",
    name: "VIN SOLYVAY",
    email: "vinsolyvay@gmail.com",
    phone: "+855 98 261 801",
    telegram: "098261801",
    position: "Real Estate Agent",
    bio: "Vin Solyvay brings fresh perspective and dedication to the Cambodian real estate market. With a focus on client satisfaction and market expertise, he helps both local and international clients navigate the property landscape with confidence.",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background_image: "/images/company/VSTV-BG.png",
    specialties: ["Residential Properties", "First-time Buyers", "Market Analysis", "Client Relations"],
    languages: ["English", "Khmer"],
    experience_years: 5,
    properties_sold: 85,
    rating: 4.8,
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist"],
    achievements: ["Rising Star 2023", "Client Satisfaction Award 2022"],
    location: "Phnom Penh",
    is_active: true
  },
  {
    id: "008",
    name: "HENG RITA",
    email: "rytavsv168@gmail.com",
    phone: "098-261-808",
    telegram: "assistant_vstv168",
    position: "Senior Real Estate Agent",
    bio: "Heng Rita is a senior real estate professional with deep knowledge of the Cambodian property market. She specializes in luxury residential properties and has built strong relationships with both local and international clients.",
    avatar_url: "/images/agents/Heng-Rita.jpg",
    background_image: "/images/company/VSTV-BG.png",
    specialties: ["Luxury Residential", "International Clients", "Property Investment", "Market Trends"],
    languages: ["English", "Khmer", "Chinese"],
    experience_years: 7,
    properties_sold: 120,
    rating: 4.9,
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "International Property Certified"],
    achievements: ["Senior Agent Excellence 2023", "International Client Award 2022", "Sales Excellence Award 2021"],
    location: "Phnom Penh",
    is_active: true
  },
  {
    id: "009",
    name: "PENG HOUNANG",
    email: "Penghounang111@gmail.com",
    phone: "+855 93 76 51 11",
    telegram: "093765111",
    position: "Real Estate Agent Manager",
    bio: "Peng Hounang serves as a Real Estate Agent Manager, bringing strategic leadership and extensive market knowledge to the team. His management experience combined with deep property expertise makes him an invaluable asset to both clients and colleagues.",
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background_image: "/images/company/VSTV-BG.png",
    specialties: ["Strategic Planning", "Team Management", "Commercial Properties", "Investment Analysis"],
    languages: ["English", "Khmer", "Chinese"],
    experience_years: 10,
    properties_sold: 200,
    rating: 4.9,
    education: "Master's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "Management Certified"],
    achievements: ["Manager Excellence 2023", "Team Leadership Award 2022", "Strategic Planning Award 2021"],
    location: "Phnom Penh",
    is_active: true
  },
  {
    id: "0010",
    name: "NHEM SAMI",
    email: "nhemsami@gmail.com",
    phone: "+855 10 773 523",
    telegram: "010773523",
    position: "Real Estate Agent",
    bio: "Nhem Sami is a dedicated real estate professional committed to helping clients find their perfect property. With a focus on residential properties and excellent customer service, he ensures every client receives personalized attention.",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background_image: "/images/company/VSTV-BG.png",
    specialties: ["Residential Properties", "Customer Service", "Property Tours", "Market Research"],
    languages: ["English", "Khmer"],
    experience_years: 4,
    properties_sold: 65,
    rating: 4.7,
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Customer Service Certified"],
    achievements: ["Customer Service Excellence 2023", "Rising Star Award 2022"],
    location: "Phnom Penh",
    is_active: true
  },
  {
    id: "005",
    name: "KHUN SINDIKA",
    email: "khunsingdika@gmail.com",
    phone: "+855 96 616 1180",
    telegram: "0966161180",
    position: "Real Estate Agent",
    bio: "Khun Sindika is a professional real estate agent with a passion for helping clients navigate the property market. Her attention to detail and commitment to excellence make her a trusted advisor for property transactions.",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background_image: "/images/company/VSTV-BG.png",
    specialties: ["Residential Properties", "Property Valuation", "Client Relations", "Market Analysis"],
    languages: ["English", "Khmer"],
    experience_years: 6,
    properties_sold: 95,
    rating: 4.8,
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Valuation Specialist"],
    achievements: ["Valuation Excellence 2023", "Client Relations Award 2022"],
    location: "Phnom Penh",
    is_active: true
  },
  {
    id: "007",
    name: "OEURN CHET",
    email: "chetvstv@gmail.com",
    phone: "098-261-807",
    telegram: "Salevstv007",
    position: "Real Estate Agent Supervisor",
    bio: "Oeurn Chet serves as a Real Estate Agent Supervisor, combining leadership skills with extensive property market knowledge. His supervisory role allows him to guide both clients and team members toward successful property transactions.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background_image: "/images/company/VSTV-BG.png",
    specialties: ["Team Leadership", "Luxury Properties", "Investment Consulting", "Client Management"],
    languages: ["English", "Khmer", "Chinese"],
    experience_years: 9,
    properties_sold: 160,
    rating: 4.9,
    education: "Bachelor's in Business Administration",
    certifications: ["Licensed Real Estate Agent", "Property Investment Specialist", "Leadership Certified"],
    achievements: ["Supervisory Excellence 2023", "Team Leadership Award 2022", "Sales Excellence Award 2021"],
    location: "Phnom Penh",
    is_active: true
  }
];

// Generate SQL INSERT statements
function generateInsertSQL() {
  let sql = '-- Insert agents data\n';
  
  agentsData.forEach(agent => {
    sql += `INSERT INTO agents (\n`;
    sql += `  id, name, email, phone, telegram, position, bio, avatar_url, background_image,\n`;
    sql += `  specialties, languages, experience_years, properties_sold, rating,\n`;
    sql += `  education, certifications, achievements, location, is_active\n`;
    sql += `) VALUES (\n`;
    sql += `  '${agent.id}',\n`;
    sql += `  '${agent.name}',\n`;
    sql += `  '${agent.email}',\n`;
    sql += `  '${agent.phone}',\n`;
    sql += `  '${agent.telegram}',\n`;
    sql += `  '${agent.position}',\n`;
    sql += `  '${agent.bio.replace(/'/g, "''")}',\n`;
    sql += `  '${agent.avatar_url}',\n`;
    sql += `  '${agent.background_image}',\n`;
    sql += `  ARRAY[${agent.specialties.map(s => `'${s.replace(/'/g, "''")}'`).join(', ')}],\n`;
    sql += `  ARRAY[${agent.languages.map(l => `'${l.replace(/'/g, "''")}'`).join(', ')}],\n`;
    sql += `  ${agent.experience_years},\n`;
    sql += `  ${agent.properties_sold},\n`;
    sql += `  ${agent.rating},\n`;
    sql += `  '${agent.education.replace(/'/g, "''")}',\n`;
    sql += `  ARRAY[${agent.certifications.map(c => `'${c.replace(/'/g, "''")}'`).join(', ')}],\n`;
    sql += `  ARRAY[${agent.achievements.map(a => `'${a.replace(/'/g, "''")}'`).join(', ')}],\n`;
    sql += `  '${agent.location}',\n`;
    sql += `  ${agent.is_active}\n`;
    sql += `);\n\n`;
  });
  
  return sql;
}

console.log('📝 SQL INSERT statements for agents:');
console.log('=====================================');
console.log(generateInsertSQL());
