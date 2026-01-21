import React from 'react'
import { Model } from '@/types/Car';
import { CarCard } from './CarCard';

interface ElectricCarsProps {
  cars: Model[];
}
const ElectricCars = ({cars}: ElectricCarsProps) => {
    const electricCars = cars.filter((car) => car.category === 'Electric Cars');
    const list = electricCars
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="md:text-2xl text-lg font-bold text-slate-900 font-sans">Electric Cars</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {list.map((car,index) => (
                <CarCard key={index} car={car}/>
              ))}
            </div>
        </section>
    </div>
  )
}

export default ElectricCars
