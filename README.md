# VSTV Agent - Real Estate Platform

A modern, responsive real estate platform built with Next.js, Prisma, and Supabase for VSTV AGENT (CAMBODIA) CO., LTD.

## Features

- 🏠 **Property Listings**: Browse properties with advanced filtering and search
- 👥 **Agent Profiles**: Detailed agent information and contact options
- 🏢 **Services**: Comprehensive real estate services
- 📱 **Responsive Design**: Mobile-first design with modern UI/UX
- 🗺️ **Map Integration**: Google Maps integration for property locations
- 📧 **Contact Forms**: Professional contact and inquiry forms
- ⚡ **Performance**: Optimized for speed and SEO

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Backend**: Supabase

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vstv-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vstv_agent"

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

5. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed the database
npm run db:seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
vstv-agent/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── agents/            # Agents pages
│   ├── contact/           # Contact page
│   ├── properties/        # Properties pages
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── agents/           # Agent-related components
│   ├── forms/            # Form components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── properties/       # Property-related components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── database.ts       # Database connection
│   ├── prisma.ts         # Prisma client
│   ├── seed.ts           # Database seeding
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma schema
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── hooks/                # Custom React hooks
```

## Database Schema

The application uses the following main entities:

- **Property**: Real estate listings with details, images, and features
- **Agent**: Real estate agents with contact information and specialties
- **Service**: Company services and offerings
- **Contact**: Contact form submissions
- **Company**: Company information and settings

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `DATABASE_URL`: Your production PostgreSQL connection string
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run db:generate`: Generate Prisma client
- `npm run db:push`: Push schema to database
- `npm run db:migrate`: Run database migrations
- `npm run db:seed`: Seed database with sample data
- `npm run db:studio`: Open Prisma Studio

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software owned by VSTV AGENT (CAMBODIA) CO., LTD.

## Support

For support, email info@vstvagent.com or contact us through our website.
