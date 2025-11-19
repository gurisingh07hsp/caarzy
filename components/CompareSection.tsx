'use client';

import React from 'react';
import { Car } from '@/types/Car';

interface ComparisonPair {
  leftCar: Car;
  rightCar: Car;
}

interface CompareSectionProps {
  comparisons: ComparisonPair[];
}

export function CompareSection({ comparisons }: CompareSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
        Compare to buy the right car
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {comparisons.map((comparison, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Image Comparison Section */}
            <div className="relative aspect-video bg-gray-100">
              {/* Left Car Image */}
              <div className="absolute inset-0 w-1/2">
                {/* <img
                  src={comparison.leftCar.images[0]}
                  alt={comparison.leftCar.name}
                  className="w-full h-full object-cover"
                /> */}
              </div>
              
              {/* Right Car Image */}
              <div className="absolute inset-0 right-0 w-1/2">
                {/* <img
                  src={comparison.rightCar.images[0]}
                  alt={comparison.rightCar.name}
                  className="w-full h-full object-cover"
                /> */}
              </div>
              
              {/* VS Badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-sm">VS</span>
                </div>
              </div>
            </div>

            {/* Car Details Section */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Car Details */}
                <div>
                  {/* <p className="text-sm text-gray-500 mb-1">{comparison.leftCar.brand}</p> */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {/* {comparison.leftCar.brand} {comparison.leftCar.name} */}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {/* ₹{(comparison.leftCar.price / 100000).toFixed(2)}L */}
                  </p>
                </div>

                {/* Right Car Details */}
                <div>
                  {/* <p className="text-sm text-gray-500 mb-1">{comparison.rightCar.brand}</p> */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {/* {comparison.rightCar.brand} {comparison.rightCar.name} */}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {/* ₹{(comparison.rightCar.price / 100000).toFixed(2)}L */}
                  </p>
                </div>
              </div>

              {/* Compare Button */}
              <button className="w-full mt-6 bg-white border-2 border-orange-500 text-orange-500 font-semibold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors">
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
