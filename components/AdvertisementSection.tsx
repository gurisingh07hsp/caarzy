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
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
              {/* Desktop Ad - Leaderboard (728x90) */}
              <div className="hidden md:block">
                <div className="w-full h-56 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">Your Ad Here</div>
                    <div className="text-sm opacity-90">Perfect for car dealerships, insurance, financing</div>
                    <div className="text-lg font-bold">728 × 90</div>
                    <div className="text-sm opacity-90">Leaderboard Ad Space</div>
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
