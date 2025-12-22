import AgentCard from '@/components/agents/agent-card'
import { siteConfig } from '@/config/site'

const demoAgents = [

  {
    id: "007",
    name: "OEURN CHET",
    position: "Real Estate Agent Supervisor",
    email: "chetvstv@gmail.com",
    phone: siteConfig.phoneNumber,
    telegram: "",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Oeurn Chet serves as a Real Estate Agent Supervisor, combining leadership skills with extensive property market knowledge. His supervisory role allows him to guide both clients and team members toward successful property transactions.",
    experience_years: 9,
    specialties: ["Team Leadership", "Luxury Properties", "Investment Consulting", "Client Management"],
    languages: ["English", "Khmer", "Chinese"],
    properties_sold: 160,
    rating: 4.9,
    location: "Phnom Penh"
  }
]

export default function AgentsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Agent Card Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive agent cards with contact dialogs, keyboard navigation, and accessibility features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demoAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Features Demonstrated
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Round avatar with hover animations</li>
              <li>• Star ratings and property count</li>
              <li>• Specialties and languages tags</li>
              <li>• Contact dialog with multiple options</li>
              <li>• Keyboard navigation support</li>
              <li>• Accessible labels and ARIA attributes</li>
              <li>• Mobile-first responsive design</li>
              <li>• Framer Motion animations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
