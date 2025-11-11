'use client';

import React from 'react';
import { Car } from '@/types/Car';

interface UpcomingCarsProps {
  cars: Car[];
}

export function UpcomingCars({ cars}: UpcomingCarsProps) {
  const upcoming = cars
    .filter((c) => {
      const d = new Date(c.launchDate).getTime();
      return !isNaN(d) && d > Date.now();
    })
    .slice(0, 8);

  if (upcoming.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-sans">Upcoming Cars</h2>
        <span className="text-sm text-gray-500">{upcoming.length} models</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {upcoming.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
          >
            <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                Upcoming
              </span>
              <span className="absolute top-3 right-3 bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {new Date(car.launchDate).toLocaleDateString()}
              </span>
            </div>
            <div className="p-4">
              <p className="text-purple-700 text-sm font-medium mb-1">{car.category}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{car.brand} {car.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{car.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-900 font-semibold">Expected: ₹{(car.price/100000).toFixed(2)}L</span>
                <button
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


