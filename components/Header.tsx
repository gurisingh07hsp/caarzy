'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';
import { useUser } from '@/context/UserContext';
import {Menu, X, User, LogOut } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const {isLoggedIn, user, logout} = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={'/caarzylogo.png'} alt='logo' width={150} height={50} className='md:w-[150px] md:h-[50px] w-[120px] h-[70px] object-contain' />
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#e8151f] font-medium transition-colors"
            >
              Home
            </Link>          
            <Link
              href="/blog"
              className="text-gray-700 hover:text-[#e8151f] font-medium transition-colors"
            >
              Blog
            </Link>
            
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#e8151f] font-medium transition-colors"
            >
              Contact
            </Link>
            <div className="relative group">

            <div
              className="text-gray-700 cursor-pointer hover:text-[#e8151f] font-medium transition-colors"
            >
              Cars
               {/* <img src="/dropdown.svg" className="w-6" alt="" /> */}
            </div>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-2">
                    <li>
                      <Link href="/cars/popular-cars" className="block px-4 py-2 hover:bg-gray-100">
                        Popular Cars
                      </Link>
                    </li>
                    <li>
                      <Link href="/cars/upcoming-cars" className="block px-4 py-2 hover:bg-gray-100">
                        Upcoming Cars
                      </Link>
                    </li>
                    <li>
                      <Link href="/cars/electric-cars" className="block px-4 py-2 hover:bg-gray-100">
                        Electric Cars
                      </Link>
                    </li>
                  </ul>
                </div>
          </div>
              <div className="relative group">

            <div
              className="text-gray-700 cursor-pointer hover:text-[#e8151f] font-medium transition-colors"
            >
              Popular Brands
               {/* <img src="/dropdown.svg" className="w-6" alt="" /> */}
            </div>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-2">
                    <li>
                      <Link href="/brand/maruti-suzuki" className="block px-4 py-2 hover:bg-gray-100">
                        Maruti Suzuki
                      </Link>
                    </li>
                    <li>
                      <Link href="/brand/toyota" className="block px-4 py-2 hover:bg-gray-100">
                        Toyota
                      </Link>
                    </li>
                    <li>
                      <Link href="/brand/hyundai" className="block px-4 py-2 hover:bg-gray-100">
                        Hyundai
                      </Link>
                    </li>
                    <li>
                      <Link href="/brand/kia" className="block px-4 py-2 hover:bg-gray-100">
                        Kia
                      </Link>
                    </li>
                    <li>
                      <Link href="/brand/tata" className="block px-4 py-2 hover:bg-gray-100">
                        Tata
                      </Link>
                    </li>
                    <li>
                      <Link href="/brand/mahindra" className="block px-4 py-2 hover:bg-gray-100">
                        Mahindra
                      </Link>
                    </li>
                  </ul>
                </div>
          </div>
            {isLoggedIn && user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-[#e8151f] font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <Search className="h-5 w-5" />
            </button> */}
            {/* <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button> */}
            {isLoggedIn ? (
              <button className='border min-w-44 flex items-center gap-2 py-1 px-2 rounded-lg'>
                <div className='w-8 h-8 rounded-full border flex justify-center items-center'>
                  <User className='w-5 h-5'/>
                </div>
                <div>
                  <p>{user?.username}</p>
                </div>
              </button>
            ) : (
              <button onClick={()=>setIsAuthModalOpen(true)} className="bg-black px-5 py-2 text-white rounded-3xl">
                <span className="font-medium">Sign In</span>
            </button>
            )}

            {isLoggedIn && 
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              Logout
              <LogOut className="h-4 w-4 ms-1" />
            </button>}
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
          <div className="md:hidden min-h-[100vh] border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 text-left font-medium text-gray-700 hover:text-[#e8151f] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-left font-medium text-gray-700 hover:text-[#e8151f] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-left font-medium text-gray-700 hover:text-[#e8151f] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
          <div className="relative group">

            <div
              className="px-4 py-2 text-gray-700 cursor-pointer hover:text-[#e8151f] font-medium transition-colors"
            >
              Cars
               {/* <img src="/dropdown.svg" className="w-6" alt="" /> */}
            </div>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-2">
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/cars/popular-cars" className="block px-4 py-2 hover:bg-gray-100">
                        Popular Cars
                      </Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/cars/upcoming-cars" className="block px-4 py-2 hover:bg-gray-100">
                        Upcoming Cars
                      </Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/cars/electric-cars" className="block px-4 py-2 hover:bg-gray-100">
                        Electric Cars
                      </Link>
                    </li>
                  </ul>
                </div>
          </div>
           <div className="relative group">

            <div
              className="px-4 py-2 text-gray-700 cursor-pointer hover:text-[#e8151f] font-medium transition-colors"
            >
              Popular Brands
               {/* <img src="/dropdown.svg" className="w-6" alt="" /> */}
            </div>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-2">
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/brand/maruti-suzuki" className="block px-4 py-2 hover:bg-gray-100">
                        Maruti Suzuki
                      </Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/brand/toyota" className="block px-4 py-2 hover:bg-gray-100">
                        Toyota
                      </Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/brand/hyundai" className="block px-4 py-2 hover:bg-gray-100">
                        Hyundai
                      </Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/brand/kia" className="block px-4 py-2 hover:bg-gray-100">
                        Kia
                      </Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/brand/tata" className="block px-4 py-2 hover:bg-gray-100">
                        Tata
                      </Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/brand/mahindra" className="block px-4 py-2 hover:bg-gray-100">
                        Mahindra
                      </Link>
                    </li>
                  </ul>
                </div>
          </div>
              {isLoggedIn && user?.role === 'admin' && (
              <Link
                href="/admin"
                className="text-gray-700 hover:[#e8151f] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}

              {isLoggedIn ? (
              <button onClick={()=> setIsMobileMenuOpen(false)} className='w-44 flex items-center gap-2 py-1 px-2 rounded-lg'>
                <div className='w-8 h-8 rounded-full border flex justify-center items-center'>
                  <User className='w-5 h-5'/>
                </div>
                <div>
                  <p>{user?.username}</p>
                </div>
              </button>
            ) : (
              <button onClick={()=>{setIsAuthModalOpen(true); setIsMobileMenuOpen(false)}} className="px-4 py-2 text-left font-medium text-gray-700 hover:text-orange-500 transition-colors">
                <span className="font-medium">Register / Login</span>
            </button>
            )}

              {isLoggedIn && 
                <button
                  onClick={()=>{logout(); setIsMobileMenuOpen(false)}}
                  className="bg-red-600 w-28 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  Logout
                  <LogOut className="h-4 w-4 ms-1" />
                </button>}
            </div>
          </div>
        )}
      </div>
      {isAuthModalOpen && <AuthModal closeModal={setIsAuthModalOpen}/>}
    </header>
  );
}