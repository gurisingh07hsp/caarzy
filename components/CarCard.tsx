'use client';

import React from 'react';
import { Car } from '@/types/Car';

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export function CarCard({ car, onClick }: CarCardProps) {
  // Default values for missing fields
  const isFeatured = car.isFeatured ?? false;
  const isSold = car.isSold ?? false;
  const year = car.year ?? 2022;
  const imageCount = car.imageCount ?? 5;
  const originalPrice = car.originalPrice;

    return (
        <div onClick={() => onClick(car)} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
      {/* Image Section with Badges */}
      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isFeatured && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Featured
            </span>
          )}
          {isSold && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Sold
            </span>
          )}
        </div>
        
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
            📷 {imageCount}
          </span>
          <span className="bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {year}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category */}
        <p className="text-orange-500 text-sm font-medium mb-2">{car.category}</p>
        
        {/* Car Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">{car.brand} {car.name}</h3>
        
        {/* Specifications */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">🛣️</span>
            <span>{car.mileage} km</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">⛽</span>
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">⚙️</span>
            <span>{car.transmission}</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-orange-600 font-bold text-xl">₹{(car.price / 100000).toFixed(2)}L</span>
            {originalPrice && (
              <span className="text-gray-400 text-sm line-through">₹{(originalPrice / 100000).toFixed(2)}L</span>
            )}
          </div>
        </div>
        
        {/* View Button - Full Width */}
            <button
              onClick={(e) => { e.stopPropagation(); onClick(car); }}
              className="w-full bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View car
            </button>
      </div>
    </div>
  );
}




