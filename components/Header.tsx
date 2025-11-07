'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, Search, Menu, X, Heart, User } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-orange-500 p-2 rounded-lg mr-3">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              AutoDeal
            </h1>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Home
            </Link>
            
            <Link
              href="#"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Buy Car
            </Link>
            
            <Link
              href="/about"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Blog
            </Link>
            
            <Link
              href="/contact"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="h-5 w-5" />
              <span className="font-medium">Register / Login</span>
            </div>
            <Link
              href="/admin"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Car className="h-4 w-4 mr-2" />
              Add Car
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 text-left font-medium text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-left font-medium text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-left font-medium text-gray-700 hover:text-orange-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2 text-left bg-orange-500 text-white rounded-lg font-medium mx-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Add Car
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}