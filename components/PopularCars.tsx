'use client';
import { Model } from '@/types/Car';
import { CarCard } from './CarCard';

interface PopularCarsProps {
  cars: Model[];
}

export function PopularCars({cars}: PopularCarsProps) {
      // Show a selection of cars (prefer latest, but fallback to all)
      const popularCars = cars.filter((car) => car.category === 'Popular Cars');
      const list = popularCars.length ? popularCars : cars;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="md:text-2xl text-lg font-bold text-slate-900 font-sans">Popular Cars</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((car,index) => (
          <CarCard key={index} car={car}/>
        ))}
      </div>
    </section>
  );
}




