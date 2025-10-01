'use client'

import ContactForm from '@/components/forms/contact-form'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast'

export default function ContactDemoPage() {
  const { toasts, removeToast } = useToast()

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Form Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Interactive contact form with client validation, Supabase integration, and toast notifications.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <ContactForm 
                  title="Send us a Message"
                  subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
                />
              </div>

              {/* Features List */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Form Features
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Client-side validation</strong> with real-time error messages</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Supabase integration</strong> for data storage</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Toast notifications</strong> for success/error feedback</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Form clearing</strong> after successful submission</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Disabled state</strong> while submitting</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Keyboard navigation</strong> support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Accessibility</strong> with ARIA labels</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Mobile responsive</strong> design</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Validation Rules
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>Name:</strong> 2-50 characters required</div>
                    <div><strong>Email:</strong> Valid email format required</div>
                    <div><strong>Phone:</strong> Valid phone number format required</div>
                    <div><strong>Message:</strong> 10-1000 characters required</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Database Schema
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-700">
                    <div>contacts table:</div>
                    <div className="ml-4 mt-2 space-y-1">
                      <div>• id (uuid, primary key)</div>
                      <div>• name (text)</div>
                      <div>• email (text)</div>
                      <div>• phone (text)</div>
                      <div>• message (text)</div>
                      <div>• created_at (timestamp)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  )
}
