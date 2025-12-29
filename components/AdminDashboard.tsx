'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, Model } from '@/types/Car';
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
  List,
  Menu,
  X
} from 'lucide-react';
import { AdminPanel } from './AdminPanel';
import { BlogAdmin } from './BlogAdmin';
import { cn } from '@/lib/utils';
import AdminComparePage from './AdminComparePage';

interface AdminDashboardProps {
  cars: Car[];
  models: Model[];
  comparisons: any;
  blogs: BlogPost[];
  onAddCar: (car: Car) => void;
  onUpdateCar: (car: Model) => void;
  onDeleteCar: (id: string) => void;
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
}

type AdminPage = 'dashboard' | 'cars' | 'compare cars' | 'blogs' | 'favorites' | 'reviews' | 'profile' | 'add-car';

export function AdminDashboard({ 
  cars,
  models, 
  comparisons,
  blogs, 
  onAddCar, 
  onUpdateCar, 
  onDeleteCar, 
  onAddBlog, 
  onUpdateBlog, 
  onDeleteBlog
}: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-car', label: 'Add Car', icon: Plus },
    // { id: 'cars', label: 'My Cars', icon: List },
    { id: 'compare cars', label: 'Compare Cars', icon: Package},
    { id: 'blogs', label: 'My Blogs', icon: FileText },
    // { id: 'favorites', label: 'My Favorites', icon: Heart },
    // { id: 'reviews', label: 'My Reviews', icon: MessageSquare },
    // { id: 'profile', label: 'My Profile', icon: User },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview models={models} blogs={blogs} />;
      case 'cars':
        return (
          <AdminPanel
            models={models}
            cars={cars}
          />
        );
      case 'compare cars':
        return (
          <AdminComparePage 
            models={models}
            comparisons={comparisons} />
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
            models={models}
            cars={cars}
          />
        );
      default:
        return <ComingSoon page={currentPage} />;
    }
  };

  return (
    <div>
      <div onClick={()=> setIsMenuOpen(true)} className='lg:hidden block ms-5 py-1'>
        <Menu/>
      </div>
    <div className="h-[92vh] bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white lg:flex flex-col hidden">
        
        <div className="px-6 py-6">
          <span className="text-gray-400 text-sm font-medium">Menu</span>
        </div>

        
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

      {isMenuOpen && (
      <div className="w-64 bg-gray-800 text-white flex flex-col lg:hidden z-30 absolute h-[93%]">
        
        <div className="px-6 py-6 flex justify-between">
          <span className="text-gray-400 text-sm font-medium">Menu</span>
          <X onClick={()=> setIsMenuOpen(false)}/>
        </div>

        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {setCurrentPage(item.id as AdminPage); setIsMenuOpen(false)}}
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
      )}


      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
    </div>
  );
}

function DashboardOverview({ models, blogs }: { models: Model[]; blogs: BlogPost[] }) {
  const stats = [
    { label: 'Total Cars', value: models.length, icon: CarIcon, color: 'bg-blue-500' },
    { label: 'Blog Posts', value: blogs.length, icon: FileText, color: 'bg-green-500' },
    { label: 'Latest Models', value: models.filter(car => car?.isLatest).length, icon: BarChart3, color: 'bg-orange-500' },
    { label: 'Categories', value: new Set(models.map(car => car.category)).size, icon: Settings, color: 'bg-purple-500' },
  ];

  const recentCars = models.slice(-5);
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
              <div key={car._id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <img
                  src={car.images[0]}
                  alt={car.modelName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-900">{car.brand} {car.modelName}</p>
                  {/* <p className="text-sm text-gray-600">₹{(car?.variant[0]?.price / 100000).toFixed(1)}L</p> */}
                </div>
                {/* {car.isLatest && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Latest
                  </span>
                )} */}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Blog Posts</h3>
          <div className="space-y-4">
            {recentBlogs.map((blog) => (
              <div key={blog._id} className="p-3 bg-gray-50 rounded-lg">
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