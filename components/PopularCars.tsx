'use client';

import React from 'react';
import { Car } from '@/types/Car';
import { CarCard } from './CarCard';

interface PopularCarsProps {
  cars: Car[];
  onCarClick: (car: Car) => void;
}

export function PopularCars({ cars, onCarClick }: PopularCarsProps) {
      // Show a selection of cars (prefer latest, but fallback to all)
      const latestCars = cars.filter((car) => car.isLatest);
      const list = latestCars.length ? latestCars : cars;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-sans">Popular Cars</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((car) => (
          <CarCard key={car.id} car={car} onClick={onCarClick} />
        ))}
      </div>
    </section>
  );
}




