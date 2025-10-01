import { Button } from '@/components/ui/button'
import { Calendar, Phone, MessageCircle } from 'lucide-react'

export default function ScheduleVisit() {
  return (
      <section className="relative py-24 bg-gradient-to-r from-yellow-600 via-amber-500 to-red-600 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Schedule a Visit Today
          </h2>
          <p className="mt-4 text-lg leading-8 text-blue-100">
            Ready to find your dream property? Contact us now to schedule a viewing or get expert advice.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+855123456789" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <a href="https://t.me/vstvagent" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Telegram
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <a href="/contact" className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Contact Form
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

