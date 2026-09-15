'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer'; // আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী ফুটারের সঠিক পাথটি এখানে দিয়ে নেবেন
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle2,
  Headphones,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

export default function AboutPage() {
  
  // টিম মেম্বারদের ডাটা (এখানে আপনি ছবি, নাম, পদবী ও কন্টাক্ট পরিবর্তন করে নিতে পারবেন)
  const teamMembers = [
    {
      name: 'Nazmus Sakib',
      role: 'Founder & CEO',
      phone: '+880 1700-000001',
      email: 'sakib@wahisnova.com',
      image: '/team/sakib.jpg', // public/team/sakib.jpg ফোল্ডারে ছবিটি রাখবেন
    },
    {
      name: 'John Doe',
      role: 'Lead Developer',
      phone: '+880 1800-000002',
      email: 'john@wahisnova.com',
      image: '/team/john.jpg',
    },
    {
      name: 'Sarah Khan',
      role: 'UI/UX Designer',
      phone: '+880 1900-000003',
      email: 'sarah@wahisnova.com',
      image: '/team/sarah.jpg',
    },
    {
      name: 'Alex Smith',
      role: 'Support Manager',
      phone: '+880 1500-000004',
      email: 'support@wahisnova.com',
      image: '/team/alex.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0f2c] via-indigo-950 to-purple-950 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-300 uppercase bg-indigo-900/60 rounded-full border border-indigo-700/50">
              About Wahisnova
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Empowering Creators & <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Digital Innovators</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Wahisnova is the ultimate premium digital marketplace connecting talented creators with buyers worldwide for top-tier website templates, scripts, and digital assets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/digital-products"
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-indigo-600 mb-1">10K+</h3>
              <p className="text-sm text-gray-600 font-medium">Active Users</p>
            </div>
            <div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-indigo-600 mb-1">500+</h3>
              <p className="text-sm text-gray-600 font-medium">Digital Assets</p>
            </div>
            <div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-indigo-600 mb-1">99%</h3>
              <p className="text-sm text-gray-600 font-medium">Customer Satisfaction</p>
            </div>
            <div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-indigo-600 mb-1">24/7</h3>
              <p className="text-sm text-gray-600 font-medium">Dedicated Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Mission */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider block mb-2">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                Making quality digital creation accessible and secure for everyone.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded with a vision to streamline how digital products and website templates are bought and sold, Wahisnova provides a robust, reliable, and high-performance marketplace platform. 
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you are an independent developer looking to showcase your website demos or a business owner searching for high-converting templates, we bridge the gap with seamless transactions and guaranteed security.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Verified & secure digital product downloads
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Hand-crafted website templates & demos
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" /> Empowering global vendors with fair revenue models
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl p-2 shadow-2xl">
                <div className="bg-white rounded-[22px] p-8 lg:p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Wahisnova?</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    We prioritize quality over quantity. Every product listed on our marketplace undergoes strict review standards to ensure top-notch performance.
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">01</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Instant Access</h4>
                        <p className="text-xs text-gray-500">Get instant download links right after your purchase is completed.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">02</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Verified Vendors</h4>
                        <p className="text-xs text-gray-500">All our marketplace vendors are vetted professionals in the tech industry.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider block mb-2">Our Experts</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Dedicated Team</h2>
            <p className="text-gray-600">The passionate minds behind Wahisnova working tirelessly to bring you the best digital experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center p-6 text-center group"
              >
                {/* Team Member Image */}
                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-indigo-50 group-hover:border-indigo-600 transition-colors bg-gray-200">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full mb-4">
                  {member.role}
                </span>

                {/* Contact Info */}
                <div className="w-full border-t border-gray-100 pt-4 space-y-2 text-left">
                  <a 
                    href={`tel:${member.phone}`} 
                    className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span className="truncate">{member.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider block mb-2">Our Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
            <p className="text-gray-600">We adhere to high standards of transparency, innovation, and customer support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Transactions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your payments and user data are protected with industry-standard encryption protocols ensuring complete safety.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">High Performance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All templates and assets are optimized for modern web performance, speed, and mobile responsiveness.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our support team and creators are always ready to assist you with installation, setup, and troubleshooting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Explore Our Marketplace?</h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of developers and creators building amazing projects with Wahisnova today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/register?vendor=true"
              className="px-8 py-3.5 bg-indigo-900/40 text-white font-semibold rounded-xl hover:bg-indigo-900/60 border border-white/20 transition-all"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Component Added */}
      <Footer />

    </div>
  );
}