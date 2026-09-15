'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer'; // আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী ফুটারের পাথ মিলিয়ে নেবেন
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag,
  Bookmark
} from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // ব্লগ ক্যাটাগরি লিস্ট
  const categories = ['All', 'Web Development', 'Design', 'UI/UX', 'Business', 'Tips & Tricks'];

  // ব্লগ পোস্ট ডাটা (এখানে আপনার কাস্টম ছবির পাথগুলো বসিয়ে নেবেন)
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Web Development Trends to Watch in 2026',
      excerpt: 'Explore the cutting-edge technologies, frameworks, and design practices shaping the future of modern web development this year.',
      category: 'Web Development',
      author: 'Nazmus Sakib',
      authorImage: '/team/sakib.jpg',
      date: 'June 10, 2026',
      readTime: '5 min read',
      image: '/blog/trend-2026.jpg', // public/blog/ ফোল্ডারে আপনার কাস্টম ছবি রাখবেন
      featured: true,
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS: Tips for Clean and Scalable UI',
      excerpt: 'Learn how to write maintainable utility-first CSS code, structure your components effectively, and speed up your design workflow.',
      category: 'Design',
      author: 'John Doe',
      authorImage: '/team/john.jpg',
      date: 'June 5, 2026',
      readTime: '4 min read',
      image: '/blog/tailwind-tips.jpg',
      featured: false,
    },
    {
      id: 3,
      title: 'UI/UX Best Practices for High-Converting Digital Marketplaces',
      excerpt: 'Discover key user experience strategies that reduce bounce rates and turn casual visitors into loyal customers on digital stores.',
      category: 'UI/UX',
      author: 'Sarah Khan',
      authorImage: '/team/sarah.jpg',
      date: 'May 28, 2026',
      readTime: '6 min read',
      image: '/blog/ui-ux-guide.jpg',
      featured: false,
    },
    {
      id: 4,
      title: 'How to Scale Your Digital Products Business Globally',
      excerpt: 'A comprehensive guide for creators looking to distribute templates, scripts, and software to an international audience.',
      category: 'Business',
      author: 'Nazmus Sakib',
      authorImage: '/team/sakib.jpg',
      date: 'May 20, 2026',
      readTime: '7 min read',
      image: '/blog/scale-business.jpg',
      featured: false,
    },
    {
      id: 5,
      title: 'Essential VS Code Extensions Every Developer Needs in 2026',
      excerpt: 'Boost your daily productivity with these must-have code extensions, themes, and automation tools for Visual Studio Code.',
      category: 'Tips & Tricks',
      author: 'Alex Smith',
      authorImage: '/team/alex.jpg',
      date: 'May 14, 2026',
      readTime: '3 min read',
      image: '/blog/vscode-ext.jpg',
      featured: false,
    },
    {
      id: 6,
      title: 'Optimizing Next.js Applications for Lightning-Fast Performance',
      excerpt: 'Practical techniques for image optimization, server-side caching, and reducing JavaScript payload in Next.js apps.',
      category: 'Web Development',
      author: 'John Doe',
      authorImage: '/team/john.jpg',
      date: 'May 02, 2026',
      readTime: '8 min read',
      image: '/blog/nextjs-perf.jpg',
      featured: false,
    },
  ];

  // ক্যাটাগরি এবং সার্চ কুয়েরি অনুযায়ী পোস্ট ফিল্টার করা
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ফিচারড পোস্ট বের করা
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* Blog Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0f2c] via-indigo-950 to-purple-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-indigo-300 uppercase bg-indigo-900/60 rounded-full border border-indigo-700/50">
              Our Journal & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Latest News, Articles & <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Tutorials</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              Discover expert advice, technical breakdowns, and industry updates to level up your web development and design skills.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm sm:text-base shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-8 bg-gray-50 border-b border-gray-100 sticky top-0 z-20 backdrop-blur-md bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          
          {/* Featured Post */}
          {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
            <div className="mb-16">
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                Featured Article
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Featured Custom Image */}
                <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[350px] bg-gray-100 overflow-hidden">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug hover:text-indigo-600 transition-colors">
                      <Link href={`#`}>{featuredPost.title}</Link>
                    </h2>
                    
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 relative overflow-hidden">
                        <Image src={featuredPost.authorImage} alt={featuredPost.author} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{featuredPost.author}</h4>
                        <p className="text-xs text-gray-500">{featuredPost.date}</p>
                      </div>
                    </div>

                    <Link 
                      href={`#`} 
                      className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/30"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            </h2>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg mb-2">No articles found matching your criteria.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Custom Blog Post Image */}
                      <div className="relative h-52 bg-gray-100 overflow-hidden">
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-indigo-700 text-xs font-semibold rounded-full shadow-sm z-10">
                          {post.category}
                        </span>
                      </div>

                      {/* Content Box */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" /> {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          <Link href={`#`}>{post.title}</Link>
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Author & Read More Footer */}
                    <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto pt-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-200 relative overflow-hidden">
                          <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                        </div>
                        <span className="text-xs font-semibold text-gray-800 truncate max-w-[110px]">{post.author}</span>
                      </div>

                      <Link 
                        href={`#`} 
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Box */}
          <div className="mt-20 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-indigo-100 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Get the latest web development tips, new digital templates, and exclusive insights delivered directly to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white flex-grow text-sm"
              />
              <button 
                type="submit"
                className="px-6 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-md text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer Component Added */}
      <Footer />

    </div>
  );
}