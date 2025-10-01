'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Icons } from '@/components/shared/icons'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Units', href: '/units' },
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
      href: 'https://t.me/assistant_vstv168',
      icon: Icons.Telegram,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/vstvagent',
      icon: Icons.Facebook,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/vstvagent',
      icon: Icons.Instagram,
      color: 'hover:text-pink-500'
    },
  ],
}

const contactInfo = {
  phones: [
    '098-261-807 / 098-261-808',
    '098-261-901 / 012-261-807',
    '098-261-806'
  ],
  email: 'vstvacc@gmail.com',
  address: {
    building: 'TV‑Tower 1, Floor 7th, Room 706C',
    street: 'Street/Road No. 32 St. Lu Uy, 13',
    village: 'Kroal Kor Village, Sangkat Kilometre 6',
    city: 'Khan Russei Keo, Phnom Penh, Cambodia'
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden" aria-labelledby="footer-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-24 xl:pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="xl:grid xl:grid-cols-3 xl:gap-8"
        >
          {/* Company Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 group">
              <div className="relative h-10 w-16 sm:h-12 sm:w-20 rounded-xl overflow-hidden bg-gradient-to-br from-brand-secondary-50 via-brand-secondary-100 to-brand-secondary-200 p-2 shadow-lg group-hover:shadow-xl group-hover:shadow-brand-secondary-200/50 transition-all duration-300 ring-1 ring-brand-secondary-200/50 group-hover:ring-brand-secondary-300/70">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <Image
                  src="/images/company/VSTV.png"
                  alt="VSTV Agent Logo"
                  width={80}
                  height={48}
                  className="relative w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-primary-300 transition-colors duration-300 tracking-tight">VSTV Agent</span>
                <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 -mt-0.5 tracking-wide uppercase transition-colors duration-300">Real Estate</span>
              </div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm leading-6 text-gray-300 max-w-md"
            >
              Your trusted real estate partner in Cambodia. We help you find your dream property with expert guidance and personalized service.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex space-x-4 sm:space-x-6"
            >
              {navigation.social.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item.href} 
                    className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-400 ${item.color} transition-all duration-300 hover:border-brand-primary-500/50 hover:bg-brand-primary-500/10 hover:shadow-lg hover:shadow-brand-primary-500/20`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation and Services Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:mt-16 xl:col-span-2 xl:mt-0"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* Navigation Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-semibold leading-6 text-white mb-4 sm:mb-6">Navigation</h3>
                <ul role="list" className="space-y-3 sm:space-y-4">
                  {navigation.main.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        href={item.href} 
                        className="group flex items-center text-sm leading-6 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-brand-primary-500 rounded-full mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Services Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 sm:mt-0"
              >
                <h3 className="text-sm font-semibold leading-6 text-white mb-4 sm:mb-6">Services</h3>
                <ul role="list" className="space-y-3 sm:space-y-4">
                  {navigation.services.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        href={item.href} 
                        className="group flex items-center text-sm leading-6 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-brand-primary-500 rounded-full mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-0"
            >
              <h3 className="text-sm font-semibold leading-6 text-white mb-4 sm:mb-6">Contact Info</h3>
              <div className="space-y-4 sm:space-y-6">
                {/* Phone Numbers */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-primary-500/20 flex items-center justify-center group-hover:bg-brand-primary-500/30 transition-colors duration-300">
                    <Icons.Phone className="h-4 w-4 text-brand-primary-400" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 space-y-1">
                    {contactInfo.phones.map((phone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="hover:text-white transition-colors duration-300"
                      >
                        {phone}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-primary-500/20 flex items-center justify-center group-hover:bg-brand-primary-500/30 transition-colors duration-300">
                    <Icons.Mail className="h-4 w-4 text-brand-primary-400" />
                  </div>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors duration-300 break-all"
                  >
                    {contactInfo.email}
                  </a>
                </motion.div>

                {/* Address */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-primary-500/20 flex items-center justify-center group-hover:bg-brand-primary-500/30 transition-colors duration-300">
                    <Icons.MapPin className="h-4 w-4 text-brand-primary-400" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 space-y-1">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.0 }}
                      viewport={{ once: true }}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {contactInfo.address.building}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.1 }}
                      viewport={{ once: true }}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {contactInfo.address.street}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.2 }}
                      viewport={{ once: true }}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {contactInfo.address.village}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.3 }}
                      viewport={{ once: true }}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {contactInfo.address.city}
                    </motion.div>
                    </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-white/10 pt-6 sm:mt-16 sm:pt-8 lg:mt-20 xl:mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <p className="text-xs leading-5 text-gray-400 text-center sm:text-left">
              &copy; {currentYear} VSTV AGENT (CAMBODIA) CO., LTD. All rights reserved.
            </p>
            <div className="flex items-center justify-center sm:justify-end space-x-6 text-xs text-gray-500">
              <span>Made with ❤️ in Cambodia</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

