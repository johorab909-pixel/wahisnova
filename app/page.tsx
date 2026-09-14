'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Shield, 
  Lock, 
  Zap, 
  Headphones,
  Globe,
  Code,
  Cpu,
  Palette,
  PenTool,
  ChevronRight,
  Users,
  Download,
  ThumbsUp,
  Send,
  CheckCircle
} from 'lucide-react';
import HomeCategories from '@/components/home/HomeCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PopularProducts from '@/components/home/PopularProducts';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const steps = [
    { number: 1, title: 'Create Account', description: 'Sign up for free in minutes' },
    { number: 2, title: 'Browse Products', description: 'Find the perfect product' },
    { number: 3, title: 'Make Purchase', description: 'Secure payment & delivery' },
    { number: 4, title: 'Download & Enjoy', description: 'Access your files instantly' },
  ];

  const testimonials = [
    { name: 'John Smith', role: 'Web Developer', quote: 'Wahisnova has been a game-changer for my business. The quality of products is outstanding!', avatar: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { name: 'Sarah Johnson', role: 'Graphic Designer', quote: 'I found amazing templates that saved me hours of work. Highly recommended!', avatar: 'bg-gradient-to-br from-green-500 to-teal-600' },
    { name: 'Mike Wilson', role: 'Entrepreneur', quote: 'The website demos are exactly what I needed. Up and running in no time!', avatar: 'bg-gradient-to-br from-orange-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0a0f2c] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Buy & Sell{' '}
              <span className="text-yellow-400">Digital Products</span>{' '}
              & Websites
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-xl mx-auto">
              Discover premium digital assets, website templates, and ready-to-use solutions from talented creators worldwide.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-6">
              <div className="flex gap-2 bg-white rounded-xl p-1.5">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, websites..."
                    className="w-full pl-9 pr-3 py-2.5 text-gray-800 rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <button type="submit" className="px-4 sm:px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Search
                </button>
              </div>
            </form>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/digital-products" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-1.5">
                Explore Products <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/website-demos" className="px-5 py-2.5 border-2 border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10">
                Browse Websites
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Trusted</p>
                  <p className="text-[10px] text-gray-400">Verified sellers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Secure</p>
                  <p className="text-[10px] text-gray-400">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Instant</p>
                  <p className="text-[10px] text-gray-400">Quick delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">24/7</p>
                  <p className="text-[10px] text-gray-400">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <HomeCategories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Popular Products */}
      <PopularProducts />

      {/* Stats */}
      <section className="bg-[#0a0f2c] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="w-7 h-7 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">10K+</p>
              <p className="text-xs text-gray-400">Users</p>
            </div>
            <div className="text-center">
              <Globe className="w-7 h-7 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">5K+</p>
              <p className="text-xs text-gray-400">Products</p>
            </div>
            <div className="text-center">
              <Download className="w-7 h-7 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">2K+</p>
              <p className="text-xs text-gray-400">Downloads</p>
            </div>
            <div className="text-center">
              <ThumbsUp className="w-7 h-7 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-xs text-gray-400">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 ${t.avatar} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0a0f2c] py-12">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <Send className="w-10 h-10 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
          <p className="text-sm text-gray-400 mb-5">
            Subscribe for new products and exclusive deals.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}