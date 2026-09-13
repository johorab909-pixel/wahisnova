'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Types
type UserRole = 'admin' | 'vendor' | 'customer';
type VendorType = 'digital_products' | 'website_demo' | 'both';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  vendorType?: VendorType;
  isApprovedVendor: boolean;
  commissionRate: number;
  totalSales: number;
  totalEarnings: number;
  pendingEarnings: number;
  withdrawnEarnings: number; // ✅ থাকতে হবে
  totalProducts: number; // ✅ থাকতে হবে
  pendingIncome: number;       // ✅ Add
  pendingWithdrawal: number;   // ✅ Add
  isBanned: boolean;         // ✅ Add
  isActive: boolean;          // ✅ Add
  totalWebsiteDemos: number;
  activeProducts: number;
  activeWebsiteDemos: number;
  pendingProducts: number;
  pendingWebsiteDemos: number;
  averageRating?: number;
  totalReviews?: number;
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  isCustomer: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  vendorType?: VendorType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get user from cookie on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const userCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('wahisnova_user='));
        
        if (userCookie) {
          const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
          setUser(userData);
          await refreshUser();
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await axios.get('/api/auth/me');
      
      if (response.data.success) {
        setUser(response.data.data.user);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setUser(null);
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: email.toLowerCase().trim(),
        password
      });

      if (response.data.success) {
        setUser(response.data.data.user);
        
        if (response.data.data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (response.data.data.user.role === 'vendor') {
          router.push('/vendor/dashboard');
        } else {
          router.push('/');
        }
        
        toast.success('Login successful!');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }, [router]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await axios.post('/api/auth/register', {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password,
        role: data.role,
        vendorType: data.vendorType
      });

      if (response.data.success) {
        setUser(response.data.data.user);
        
        toast.success('Registration successful!');
        
        if (response.data.data.user.role === 'vendor') {
          router.push('/vendor/dashboard');
        } else {
          router.push('/');
        }
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setUser(null);
    router.push('/login');
    toast.success('Logged out successfully');
  }, [router]);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isVendor = user?.role === 'vendor';
  const isCustomer = user?.role === 'customer';

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    isVendor,
    isCustomer,
    login,
    register,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}