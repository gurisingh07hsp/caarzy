'use client';

import React from 'react';

interface AdvertisementSectionProps {
  className?: string;
}

export function AdvertisementSection({ className = '' }: AdvertisementSectionProps) {
  return (
    <section className={`bg-gray-50 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Advertisement Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            {/* Ad Label */}
            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-4">
              Advertisement
            </div>
            
            {/* Landscape Ad Placeholder */}
            <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden">
              {/* Desktop Ad - Leaderboard (728x90) */}
              <div className="hidden md:block">
                <div className="w-full h-[90px] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-lg font-bold mb-1">728 × 90</div>
                    <div className="text-sm opacity-90">Leaderboard Ad Space</div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Ad - Mobile Leaderboard (320x50) */}
              <div className="md:hidden">
                <div className="w-full h-[50px] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-sm font-bold mb-1">320 × 50</div>
                    <div className="text-xs opacity-90">Mobile Ad</div>
                  </div>
                </div>
              </div>
              
              {/* Ad Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-2">Your Ad Here</div>
                  <div className="text-sm opacity-90">Perfect for car dealerships, insurance, financing</div>
                  <div className="mt-3">
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ad Specifications */}
            <div className="mt-4 text-xs text-gray-500">
              <div className="flex justify-center gap-4">
                <span>Desktop: 728×90px</span>
                <span>Mobile: 320×50px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
