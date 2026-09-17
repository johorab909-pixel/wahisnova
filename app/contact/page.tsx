'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer'; // আপনার ফুটারের সঠিক পাথ নিশ্চিত করুন
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
  Headphones
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0f2c] via-indigo-950 to-purple-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-indigo-300 uppercase bg-indigo-900/60 rounded-full border border-indigo-700/50">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              We&apos;d Love to <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Hear From You</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Have questions about our digital products, custom templates, or need technical assistance? Reach out to our team and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-20 relative z-20">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dhaka, Bangladesh<br />
                LCBS Dhaka Training Center Zone
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Support: support@wahisnova.com<br />
                Inquiries: info@wahisnova.com
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                +880 1700-000001<br />
                Mon - Sat (9:00 AM - 6:00 PM)
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Form & FAQ Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
              <div className="mb-8">
                <span className="text-indigo-600 font-semibold text-xs uppercase tracking-wider block mb-2">Send a Message</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ready to Start a Conversation?</h2>
              </div>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold">Message Sent Successfully!</h4>
                  <p className="text-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nazmus Sakib"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="sakib@wahisnova.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                    <textarea 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message details here..."
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-gray-50/50 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Working Hours</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Our customer support team is available during standard business hours to resolve your queries.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Monday - Friday:</span>
                    <span className="text-gray-900 font-semibold">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Saturday:</span>
                    <span className="text-gray-900 font-semibold">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span className="text-gray-600 font-medium">Sunday:</span>
                    <span className="text-red-500 font-semibold">Closed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-900 to-purple-950 p-8 rounded-3xl text-white">
                <div className="w-12 h-12 bg-white/10 text-indigo-300 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
                <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                  Check out our FAQ section or explore the digital templates documentation for instant troubleshooting guides.
                </p>
                <Link 
                  href="/faq" 
                  className="inline-block px-6 py-3 bg-white text-indigo-900 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-md"
                >
                  Visit FAQ Page
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}