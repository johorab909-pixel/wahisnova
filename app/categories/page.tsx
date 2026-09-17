'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { 
  Globe, Code, Cpu, Palette, Puzzle, PenTool, 
  BookOpen, MoreHorizontal, Music, Video, Package,
  Loader2
} from 'lucide-react';

interface Category {
  name: string;
  count: number;
  icon: any;
  color: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        if (response.data.success) {
          const cats = response.data.data.categories;
          
          const iconMap: any = {
            'templates': Globe,
            'software': Cpu,
            'ebooks': BookOpen,
            'graphics': Palette,
            'music': Music,
            'videos': Video,
            'courses': BookOpen,
            'plugins': Puzzle,
            'themes': PenTool,
            'other': MoreHorizontal,
          };
          
          const colorMap: any = {
            'templates': 'from-blue-500 to-indigo-600',
            'software': 'from-purple-500 to-violet-600',
            'ebooks': 'from-green-500 to-teal-600',
            'graphics': 'from-pink-500 to-rose-600',
            'music': 'from-orange-500 to-red-600',
            'videos': 'from-cyan-500 to-blue-600',
            'courses': 'from-yellow-500 to-amber-600',
            'plugins': 'from-red-500 to-pink-600',
            'themes': 'from-indigo-500 to-purple-600',
            'other': 'from-gray-500 to-slate-600',
          };
          
          setCategories(cats.map((cat: any) => ({
            name: cat.name,
            count: cat.count,
            icon: iconMap[cat.name] || Package,
            color: colorMap[cat.name] || 'from-gray-500 to-slate-600'
          })));
        }
      } catch (error) {
        console.error('Categories error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Browse Categories</h1>
          <p className="text-white/80">Find the perfect product for your needs</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  href={`/digital-products?category=${category.name}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Icon className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 capitalize">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} products</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}