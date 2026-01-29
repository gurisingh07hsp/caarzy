import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Youtube } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Top Informational Bar */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Top 1 Americas */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🏆</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Top 1 Americas</h3>
                <p className="text-gray-400 text-sm">Largest Auto portal</p>
              </div>
            </div>

            {/* Car Sold */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🏷️</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Car Sold</h3>
                <p className="text-gray-400 text-sm">Every 5 minute</p>
              </div>
            </div>

            {/* Offers */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">%</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Offers</h3>
                <p className="text-gray-400 text-sm">Stay updated pay less</p>
              </div>
            </div>

            {/* Decode the right car */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">⚖️</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Decode the right car</h3>
                <p className="text-gray-400 text-sm">Find your perfect match</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Navigation and Newsletter */}
      <div className="border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Auto Decar */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">About Caarzy</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Compare Listings</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Dealer Listings</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Sale Agents</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact us</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog List</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">FAQs</Link></li>
              </ul>
            </div>

            {/* Popular used car */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Popular used car</h4>
              <ul className="space-y-2 text-sm">
                {['KIA','Ford','Hyundai','Fiat','Toyota','Land Rover','Mercedes Benz'].map((brand)=>(
                  <li key={brand}><Link href={`/brand/${brand.toLowerCase().replace(/\s+/, ' ')}`} className="text-gray-400 hover:text-white">{brand}</Link></li>
                ))}
              </ul>
            </div>

            {/* Other */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Other</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">How it work</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Terms and Conditions</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Copyrights</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Help center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Car sales trends</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Personal loan</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Stay on top of the latest car trends, tips, and tricks for selling your car.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="w-full main-bg-color text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* Logo */}
            <div className="flex items-center mb-4 sm:mb-0">
              <Image src={'/caarzylogo.png'} alt='logo' width={150} height={50} className='md:w-[150px] md:h-[50px] w-[120px] h-[70px] object-contain' />
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © 2024 Caarzy. All rights reserved
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <Link href="https://www.facebook.com/caarzyofficial/" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                <span className="text-white text-sm font-bold">f</span>
              </Link>
              <Link href="https://www.linkedin.com/company/caarzyofficial/" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                <span className="text-white text-sm font-bold">in</span>
              </Link>
              <Link href="https://www.youtube.com/@Caarzyofficial" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                <Youtube size={18} />
              </Link>
              <Link href="https://www.instagram.com/caarzyofficial/" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                <span className="text-white text-sm">📷</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}




