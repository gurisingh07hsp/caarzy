'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';
import { 
  LayoutDashboard, 
  Car as CarIcon, 
  Heart, 
  MessageSquare, 
  Package, 
  User, 
  Plus,
  LogOut,
  FileText,
  BarChart3,
  Settings,
  List
} from 'lucide-react';
import { AdminPanel } from './AdminPanel';
import { BlogAdmin } from './BlogAdmin';
import { cn } from '@/lib/utils';

interface AdminDashboardProps {
  cars: Car[];
  blogs: BlogPost[];
  onAddCar: (car: Car) => void;
  onUpdateCar: (car: Car) => void;
  onDeleteCar: (id: string) => void;
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
}

type AdminPage = 'dashboard' | 'cars' | 'blogs' | 'favorites' | 'reviews' | 'profile' | 'add-car';

export function AdminDashboard({ 
  cars, 
  blogs, 
  onAddCar, 
  onUpdateCar, 
  onDeleteCar, 
  onAddBlog, 
  onUpdateBlog, 
  onDeleteBlog
}: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cars', label: 'My Cars', icon: List },
    { id: 'blogs', label: 'My Blogs', icon: FileText },
    { id: 'favorites', label: 'My Favorites', icon: Heart },
    { id: 'reviews', label: 'My Reviews', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'add-car', label: 'Add Car', icon: Plus },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview cars={cars} blogs={blogs} />;
      case 'cars':
        return (
          <AdminPanel
            cars={cars}
            blogs={blogs}
            onAddCar={onAddCar}
            onUpdateCar={onUpdateCar}
            onDeleteCar={onDeleteCar}
            onAddBlog={onAddBlog}
            onUpdateBlog={onUpdateBlog}
            onDeleteBlog={onDeleteBlog}
          />
        );
      case 'blogs':
        return (
          <BlogAdmin
            blogs={blogs}
            onAddBlog={onAddBlog}
            onUpdateBlog={onUpdateBlog}
            onDeleteBlog={onDeleteBlog}
          />
        );
      case 'add-car':
        return (
          <AdminPanel
            cars={cars}
            blogs={blogs}
            onAddCar={onAddCar}
            onUpdateCar={onUpdateCar}
            onDeleteCar={onDeleteCar}
            onAddBlog={onAddBlog}
            onUpdateBlog={onUpdateBlog}
            onDeleteBlog={onDeleteBlog}
          />
        );
      default:
        return <ComingSoon page={currentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <div className="bg-orange-500 p-2 rounded-lg mr-3">
              <CarIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AutoDeal</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Home
            </Link>
            <button className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Buy Car
            </button>
            <Link href="/about" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Register / Login</span>
            <button
              onClick={() => setCurrentPage('blogs')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              Manage Blogs
            </button>
            <button
              onClick={() => setCurrentPage('add-car')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <CarIcon className="h-4 w-4 mr-2" />
              Add Car
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col fixed left-0 top-16 bottom-0">
        {/* Menu Label */}
        <div className="px-6 py-6">
          <span className="text-gray-400 text-sm font-medium">Menu</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id as AdminPage)}
                  className={cn(
                    "w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200",
                    currentPage === item.id
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <Link
            href="/"
            className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 mt-16">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function DashboardOverview({ cars, blogs }: { cars: Car[]; blogs: BlogPost[] }) {
  const stats = [
    { label: 'Total Cars', value: cars.length, icon: CarIcon, color: 'bg-blue-500' },
    { label: 'Blog Posts', value: blogs.length, icon: FileText, color: 'bg-green-500' },
    { label: 'Latest Models', value: cars.filter(car => car.isLatest).length, icon: BarChart3, color: 'bg-orange-500' },
    { label: 'Categories', value: new Set(cars.map(car => car.category)).size, icon: Settings, color: 'bg-purple-500' },
  ];

  const recentCars = cars.slice(-5);
  const recentBlogs = blogs.slice(-3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Cars */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Cars</h3>
          <div className="space-y-4">
            {recentCars.map((car) => (
              <div key={car.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-900">{car.brand} {car.name}</p>
                  <p className="text-sm text-gray-600">₹{(car.price / 100000).toFixed(1)}L</p>
                </div>
                {car.isLatest && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Latest
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Blog Posts</h3>
          <div className="space-y-4">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 line-clamp-2">{blog.title}</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span>{blog.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ page }: { page: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="text-gray-400 text-6xl mb-4">🚧</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
      <p className="text-gray-600">
        The {page.replace('-', ' ')} section is under development and will be available soon.
      </p>
    </div>
  );
}