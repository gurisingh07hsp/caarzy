'use client';

import React from 'react';
import { Car } from '@/types/Car';
import { useRouter } from 'next/navigation';

// interface ComparisonPair {
//   leftCar: Car;
//   rightCar: Car;
// }

interface CompareSectionProps {
  comparisons: any;
}

export function CompareSection({ comparisons }: CompareSectionProps) {
  const router = useRouter();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 py-4">
      <h2 className="md:text-3xl text-lg text font-bold text-gray-900 mb-4">
        Compare to buy the right car
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {comparisons.map((comparison: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Image Comparison Section */}
            <div className="relative bg-gray-100 grid grid-cols-2 border">
              {/* Left Car Image */}
              <div>
                <img
                  src={comparison.car1.images[0]}
                  alt={comparison.car1.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* <div className='h-full w-1 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div> */}
              {/* Right Car Image */}
              <div>
                <img
                  src={comparison.car2.images[0]}
                  alt={comparison.car2.name}
                  className="w-full h-full object-contain"
                />
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
                  <p className="text-sm text-gray-500 mb-1">{comparison.car1.brand}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {comparison.car1.modelName}
                  </h3>
                  {/* <p className="text-lg font-semibold text-gray-900">
                    ₹{(comparison.car1.price as any / 100000).toFixed(2)}L
                  </p> */}
                </div>

                {/* Right Car Details */}
                <div className='text-end'>
                  <p className="text-sm text-gray-500 mb-1">{comparison.car2.brand}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {comparison.car2.modelName}
                  </h3>
                  {/* <p className="text-lg font-semibold text-gray-900">
                    ₹{(comparison.car2.price as any / 100000).toFixed(2)}L
                  </p> */}
                </div>
              </div>

              {/* Compare Button */}
              <button
                onClick={()=> router.push(`/compare/${comparison.car1.modelName.replace(/\s+/, '-')}-and-${comparison.car2.modelName}`)}
               className="w-full mt-6 bg-white border-2 border-[#e8151f] main-text-color font-semibold py-3 px-4 rounded-lg hover:bg-red-50 transition-colors">
                {comparison.car1.modelName} Vs {comparison.car2.modelName}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
