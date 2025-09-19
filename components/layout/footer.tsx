import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Our Services', href: '/services' },
    { name: 'Agents', href: '/agents' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Property Sales', href: '/services#sales' },
    { name: 'Property Rental', href: '/services#rental' },
    { name: 'Property Management', href: '/services#management' },
    { name: 'Investment Consulting', href: '/services#consulting' },
  ],
  social: [
    {
      name: 'Telegram',
      href: 'https://t.me/vsv168cambodia',
      icon: MessageCircle,
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/vstvagent',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/vstvagent',
      icon: Instagram,
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-24 xl:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-8 w-12 sm:h-10 sm:w-16 rounded overflow-hidden">
                <Image
                  src="/images/company/VSTV.png"
                  alt="VSTV Agent Logo"
                  width={64}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">VSTV Agent</span>
            </div>
            <p className="text-sm leading-6 text-gray-300 max-w-md">
              Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              {navigation.social.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:mt-16 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
                <ul role="list" className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 sm:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 sm:mt-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Contact Info</h3>
                <ul role="list" className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  <li className="flex items-start space-x-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs sm:text-sm text-gray-300">
                      <div>098-261-807 / 098-261-808</div>
                      <div>098-261-901 / 012-261-807</div>
                      <div>098-261-806</div>
                    </div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-300 break-all">vstvacc@gmail.com</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-300">
                      TV‑Tower 1, Floor 7th, Room 706C<br />
                      Street/Road No. 32 St. Lu Uy, 13<br />
                      Kroal Kor Village, Sangkat Kilometre 6<br />
                      Khan Russei Keo, Phnom Penh, Cambodia
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 sm:mt-16 sm:pt-8 lg:mt-20 xl:mt-24">
          <p className="text-xs leading-5 text-gray-400 text-center sm:text-left">
            &copy; 2024 VSTV AGENT (CAMBODIA) CO., LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

