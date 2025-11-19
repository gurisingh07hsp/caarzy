'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function HeroSection({ searchTerm, onSearchChange }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState('new');
  const [searchBy, setSearchBy] = useState('budget');
  const [budget, setBudget] = useState('');
  const [brand, setBrand] = useState('');
  const [bodyType, setBodyType] = useState('');

  return (
    <div className="relative bg-white">
      {/* Hero Background */}
      <div className="relative h-[600px] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left Side - Search Form */}
            <div className="bg-white lg:block hidden rounded-2xl shadow-2xl p-8 max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find your right car</h2>
              
              {/* Tab Selection */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                    activeTab === 'new'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  New Car
                </button>
                <button
                  onClick={() => setActiveTab('used')}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                    activeTab === 'used'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Used Car
                </button>
              </div>

              {/* Search Options */}
              <div className="flex space-x-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="searchBy"
                    value="budget"
                    checked={searchBy === 'budget'}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700 font-medium">By Budget</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="searchBy"
                    value="brand"
                    checked={searchBy === 'brand'}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700 font-medium">By Brand</span>
                </label>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {searchBy === 'budget' ? (
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select Budget</option>
                      <option value="0-5">Under ₹5 Lakh</option>
                      <option value="5-10">₹5-10 Lakh</option>
                      <option value="10-20">₹10-20 Lakh</option>
                      <option value="20-50">₹20-50 Lakh</option>
                      <option value="50+">Above ₹50 Lakh</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select Brand</option>
                      <option value="hyundai">Hyundai</option>
                      <option value="maruti">Maruti Suzuki</option>
                      <option value="honda">Honda</option>
                      <option value="toyota">Toyota</option>
                      <option value="tata">Tata</option>
                      <option value="mahindra">Mahindra</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                )}

                <div className="relative">
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">All Vehicle Types</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg transition-colors">
                  Search
                </button>

                <button className="w-full text-orange-500 hover:text-orange-600 font-medium transition-colors flex items-center justify-center">
                  Advanced Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Side - Promotional Content */}
            <div className="text-white">
              <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
                Featured
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AutoDeal Premium Collection
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                Discover exclusive deals on premium vehicles with verified history, 
                comprehensive warranties, and instant financing options.
              </p>
              
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Car Body Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="md:text-3xl text-2xl text-center font-bold text-gray-900">Popular Car Makes & Body Types</h2>
            {/* <div className="flex space-x-6">
              <button className="text-gray-600 hover:text-orange-500 font-medium transition-colors flex items-center">
                Car makes
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-orange-500 font-medium transition-colors flex items-center">
                Car body types
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="text-orange-500 font-medium flex items-center">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div> */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Coupe', count: '1 Car', image: '/coupelogo.webp' },
              { name: 'MVP', count: '0 Cars', image: '/mvplogo.webp' },
              { name: 'Sedan', count: '1 Car', image: '/sedanlogo.webp' },
              { name: 'Hatchback', count: '2 Cars', image: '/hatchbacklogo.webp' },
              { name: 'SUV', count: '1 Car', image: '/suvlogo.webp' },
              { name: 'Pickup Truck', count: '1 Car', image: '/pickup-trucklogo.webp' }
            ].map((type, index) => (
              <div key={index} className="rounded-xl bg-white p-2 text-center transition-shadow cursor-pointer">
                <div className="w-full mx-auto mb-2 bg-[#fff7f0] rounded-lg overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className="w-full h-16 object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.count}</p>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}