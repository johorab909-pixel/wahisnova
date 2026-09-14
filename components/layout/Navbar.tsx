'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, isVendor, logout, loading } = useAuth();
  
  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // ✅ Hide navbar on vendor/admin pages
  const isDashboardPage = pathname.startsWith('/vendor') || pathname.startsWith('/admin');
  
  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  // Get dashboard link based on role
  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isVendor) return '/vendor/dashboard';
    return '/dashboard';
  };
  
  // ✅ If dashboard page, don't show navbar
  if (isDashboardPage) {
    return null;
  }
  
  return (
    <header className={`sticky top-0 z-50 transition-shadow ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center">
          <p className="font-medium">🚀 Welcome to Wahisnova Marketplace</p>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-xs opacity-90">Digital Products & Website Demos</span>
          </div>
        </div>
      </div>
      
      {/* Main navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md group-hover:shadow-lg transition-shadow">
                W
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Wahisnova
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/digital-products" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/digital-products' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Digital Products
              </Link>
              <Link 
                href="/website-demos" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/website-demos' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Website Demos
              </Link>
              <Link 
                href="/categories" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/categories' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Categories
              </Link>
              
              {isVendor && (
                <Link 
                  href="/vendor/dashboard" 
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith('/vendor') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  Vendor Dashboard
                </Link>
              )}
              
              {isAdmin && (
                <Link 
                  href="/admin/dashboard" 
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith('/admin') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Auth buttons */}
              {!loading && (
                <>
                  {isAuthenticated ? (
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {getUserInitials()}
                        </div>
                        <span className="hidden sm:block text-sm font-medium text-gray-700">
                          {user?.name?.split(' ')[0]}
                        </span>
                        <svg 
                          className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* User dropdown */}
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                              user?.role === 'admin' ? 'bg-red-100 text-red-700' :
                              user?.role === 'vendor' ? 'bg-green-100 text-green-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                            </span>
                          </div>
                          
                          <Link
                            href={getDashboardLink()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            📊 Dashboard
                          </Link>
                          
                          {isVendor && (
                            <Link
                              href="/vendor/products/upload"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              📦 Upload Product
                            </Link>
                          )}
                          
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            👤 Profile Settings
                          </Link>
                          
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            📋 My Orders
                          </Link>
                          
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              🚪 Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="hidden sm:flex items-center gap-2">
                      <Link
                        href="/login"
                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md hover:shadow-lg"
                      >
                        Sign Up Free
                      </Link>
                    </div>
                  )}
                </>
              )}
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          {isSearchOpen && (
            <div className="pb-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link href="/" className="block py-2.5 text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
              <Link href="/digital-products" className="block py-2.5 text-gray-700 hover:text-indigo-600 font-medium">Digital Products</Link>
              <Link href="/website-demos" className="block py-2.5 text-gray-700 hover:text-indigo-600 font-medium">Website Demos</Link>
              <Link href="/categories" className="block py-2.5 text-gray-700 hover:text-indigo-600 font-medium">Categories</Link>
              
              {isVendor && (
                <Link href="/vendor/dashboard" className="block py-2.5 text-gray-700 hover:text-indigo-600 font-medium">Vendor Dashboard</Link>
              )}
              
              {isAdmin && (
                <Link href="/admin/dashboard" className="block py-2.5 text-gray-700 hover:text-indigo-600 font-medium">Admin Dashboard</Link>
              )}
              
              {!isAuthenticated ? (
                <div className="pt-3 space-y-2 border-t border-gray-200">
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center px-4 py-2.5 text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg font-medium"
                  >
                    Sign Up Free
                  </Link>
                </div>
              ) : (
                <div className="pt-3 space-y-1 border-t border-gray-200">
                  <Link href={getDashboardLink()} className="block py-2.5 text-gray-700 font-medium">Dashboard</Link>
                  <Link href="/orders" className="block py-2.5 text-gray-700 font-medium">My Orders</Link>
                  <Link href="/profile" className="block py-2.5 text-gray-700 font-medium">Profile Settings</Link>
                  <button onClick={handleLogout} className="block w-full text-left py-2.5 text-red-600 font-medium">Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}